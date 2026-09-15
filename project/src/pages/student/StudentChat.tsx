import { useState, useEffect, useRef } from 'react'
import { Card, Text, Group, Stack, ThemeIcon, Box, Avatar, TextInput, Button, ScrollArea, Badge, Divider, ActionIcon, MediaQuery } from '@mantine/core'
import { useAuth } from '../../context/AuthContext'
import { mockApi } from '../../services/mockApi'
import { useAsync } from '../../hooks/useAsync'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState, EmptyState, ErrorState } from '../../components/States'
import { notifications } from '@mantine/notifications'
import {
  IconMessage2, IconSend, IconArrowLeft, IconCheck, IconChecks, IconUsers,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Conversation, Message } from '../../types'

export default function StudentChat() {
  const { user } = useAuth()
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState('')
  const [allMessages, setAllMessages] = useState<Message[]>([])
  const [sending, setSending] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: conversations, loading, error, refetch } = useAsync(
    () => mockApi.getConversations(user!.id, 'student'), [user?.id]
  )

  const loadMessages = async (conv: Conversation) => {
    setLoadingMessages(true)
    try {
      const msgs = await mockApi.getMessages(conv.id)
      setAllMessages(msgs)
      await mockApi.markConversationRead(conv.id)
      refetch()
    } catch {
      // ignore
    } finally {
      setLoadingMessages(false)
    }
  }

  useEffect(() => {
    if (selectedConv) {
      loadMessages(selectedConv)
    }
  }, [selectedConv?.id])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [allMessages])

  const handleSend = async () => {
    if (!messageText.trim() || !selectedConv) return
    setSending(true)
    try {
      const msg = await mockApi.sendMessage(selectedConv.id, user!.id, 'student', messageText)
      setAllMessages((prev) => [...prev, msg])
      setMessageText('')
      refetch()
    } catch {
      notifications.show({ message: 'Failed to send message', color: 'red', size: 'sm' })
    } finally {
      setSending(false)
    }
  }

  if (loading) return <LoadingState message="Loading conversations..." />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  const convs = conversations || []

  if (convs.length === 0) {
    return (
      <div>
        <PageHeader title="Messages" subtitle="Chat with your teachers" />
        <EmptyState
          icon={IconMessage2}
          title="No conversations"
          message="You don't have any conversations yet. Your teacher will message you soon."
        />
      </div>
    )
  }

  const getTeacherName = (conv: Conversation) => {
    // The teacher's name is derived from the conversation
    // We only have teacherId; use a fallback approach
    return 'Your Teacher'
  }

  const renderConversationList = () => (
    <Card withBorder padding={0} radius="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box p="md" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <Group gap="sm">
          <ThemeIcon size={32} radius="md" color="navy" variant="light">
            <IconUsers size={16} />
          </ThemeIcon>
          <Text fw={600} size="sm">Conversations</Text>
        </Group>
      </Box>
      <ScrollArea style={{ flex: 1 }}>
        <Stack gap={0}>
          {convs.map((conv) => {
            const isActive = selectedConv?.id === conv.id
            return (
              <Box
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: isActive ? '#eef2ff' : 'transparent',
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = '#f8fafc' }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <Group gap="sm" align="center">
                  <Avatar color="navy" variant="light" radius="xl" size="md">
                    {getTeacherName(conv).split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </Avatar>
                  <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between">
                      <Text size="sm" fw={600} lineClamp={1}>{getTeacherName(conv)}</Text>
                      <Text size="xs" c="dimmed">{dayjs(conv.lastMessageAt).format('MMM D')}</Text>
                    </Group>
                    <Group justify="space-between" align="center">
                      <Text size="xs" c="dimmed" lineClamp={1}>Tap to view conversation</Text>
                      {conv.unreadCount > 0 && (
                        <Badge variant="filled" color="navy" size="sm" circle>
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </Group>
                  </Stack>
                </Group>
              </Box>
            )
          })}
        </Stack>
      </ScrollArea>
    </Card>
  )

  const renderMessages = () => (
    <Card withBorder padding={0} radius="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {selectedConv ? (
        <>
          <Box p="md" style={{ borderBottom: '1px solid #e2e8f0' }}>
            <Group gap="sm" align="center">
              <Avatar color="navy" variant="light" radius="xl" size="md">
                {getTeacherName(selectedConv).split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </Avatar>
              <Stack gap={2}>
                <Text fw={600} size="sm">{getTeacherName(selectedConv)}</Text>
                <Text size="xs" c="dimmed">{dayjs(selectedConv.lastMessageAt).format('MMM D, h:mm A')}</Text>
              </Stack>
            </Group>
          </Box>

          <ScrollArea style={{ flex: 1 }} viewportRef={scrollRef}>
            <Box p="md">
              {loadingMessages ? (
                <Center><LoadingState message="Loading messages..." /></Center>
              ) : allMessages.length === 0 ? (
                <EmptyState icon={IconMessage2} title="No messages" message="Start the conversation!" />
              ) : (
                <Stack gap="sm">
                  {allMessages.map((msg) => {
                    const isMe = msg.senderId === user?.id
                    return (
                      <Group key={msg.id} justify={isMe ? 'flex-end' : 'flex-start'} align="flex-start" wrap="nowrap">
                        {!isMe && (
                          <Avatar color="navy" variant="light" radius="xl" size="sm">
                            {getTeacherName(selectedConv).split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </Avatar>
                        )}
                        <Box
                          style={{
                            maxWidth: '70%',
                            padding: '10px 14px',
                            borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            background: isMe ? '#4f46e5' : '#f1f5f9',
                            color: isMe ? 'white' : '#1e293b',
                          }}
                        >
                          <Text size="sm" style={{ lineHeight: 1.5 }}>{msg.text}</Text>
                          <Group gap={4} justify="flex-end" mt={4}>
                            <Text size="xs" style={{ color: isMe ? '#c7d2fe' : '#94a3b8' }}>
                              {dayjs(msg.sentAt).format('h:mm A')}
                            </Text>
                            {isMe && (msg.read ? <IconChecks size={12} color="#c7d2fe" /> : <IconCheck size={12} color="#c7d2fe" />)}
                          </Group>
                        </Box>
                      </Group>
                    )
                  })}
                </Stack>
              )}
            </Box>
          </ScrollArea>

          <Box p="md" style={{ borderTop: '1px solid #e2e8f0' }}>
            <Group gap="sm" align="flex-end">
              <TextInput
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.currentTarget.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                style={{ flex: 1 }}
                radius="xl"
              />
              <ActionIcon
                size={40}
                radius="xl"
                color="navy"
                variant="filled"
                onClick={handleSend}
                loading={sending}
                disabled={!messageText.trim()}
              >
                <IconSend size={18} />
              </ActionIcon>
            </Group>
          </Box>
        </>
      ) : (
        <Center style={{ height: '100%' }}>
          <Stack align="center" gap="sm">
            <ThemeIcon size={64} radius="xl" color="navy" variant="light">
              <IconMessage2 size={32} />
            </ThemeIcon>
            <Text fw={600} size="lg">Select a conversation</Text>
            <Text size="sm" c="dimmed">Choose a conversation from the list to start chatting</Text>
          </Stack>
        </Center>
      )}
    </Card>
  )

  return (
    <div>
      <PageHeader title="Messages" subtitle="Chat with your teachers" />

      {/* Desktop: split view, Mobile: show one panel */}
      <Box style={{ height: 'calc(100vh - 220px)', minHeight: 400 }}>
        <Box className="chat-desktop" style={{ display: 'flex', gap: 16, height: '100%' }}>
          <Box style={{ width: 320, flexShrink: 0 }}>{renderConversationList()}</Box>
          <Box style={{ flex: 1 }}>{renderMessages()}</Box>
        </Box>

        {/* Mobile layout */}
        <Box className="chat-mobile" style={{ display: 'none', height: '100%' }}>
          {selectedConv ? (
            <Stack gap={0} style={{ height: '100%' }}>
              <Button
                variant="subtle"
                size="xs"
                leftSection={<IconArrowLeft size={14} />}
                onClick={() => setSelectedConv(null)}
                mb="sm"
              >
                Back to conversations
              </Button>
              <Box style={{ flex: 1 }}>{renderMessages()}</Box>
            </Stack>
          ) : (
            renderConversationList()
          )}
        </Box>
      </Box>

      <style>{`
        @media (max-width: 768px) {
          .chat-desktop { display: none !important; }
          .chat-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}

function Center({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{children}</div>
}
