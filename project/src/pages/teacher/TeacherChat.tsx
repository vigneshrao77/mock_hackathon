import { useState, useEffect } from 'react'
import { Grid, Card, Text, Group, TextInput, Button, Stack, Avatar, Paper, Skeleton, ActionIcon, Modal } from '@mantine/core'
import { IconSend, IconMessage, IconPlus } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import { useSocket } from '../../context/SocketContext'
import type { Conversation, Message, Student } from '../../types'

export default function TeacherChat() {
  const { user } = useAuth()
  const { socket } = useSocket()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [activeConv, setActiveConv] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(true)
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [creatingChat, setCreatingChat] = useState(false)

  useEffect(() => {
    if (!user) return
    Promise.all([
      mockApi.getConversations(user.id),
      mockApi.getStudents(),
    ]).then(([convs, stus]) => {
      setConversations(convs)
      setStudents(stus)
      if (convs.length > 0) {
        setActiveConv(convs[0])
      }
      setLoading(false)
    })
  }, [user])

  useEffect(() => {
    if (!activeConv) return
    mockApi.getMessages(activeConv.id).then(setMessages)
  }, [activeConv])

  const handleSend = async () => {
    if (!inputText.trim() || !activeConv || !user) return
    const msg = await mockApi.sendMessage(activeConv.id, user.id, user.role, inputText)
    setMessages((prev) => {
      if (prev.find(m => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
    setInputText('')
  }

  useEffect(() => {
    if (!socket) return;
    
    const onNewMessage = (msg: Message) => {
      setMessages((prev) => {
        // Only append if it's for the currently active conversation
        if (activeConv && msg.conversationId === activeConv.id) {
          if (prev.find(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        }
        return prev;
      });
    };
    
    const onConversationUpdated = (conv: Conversation) => {
       setConversations((prev) => {
         const exists = prev.find(c => c.id === conv.id);
         if (exists) {
           return prev.map(c => c.id === conv.id ? { ...c, lastMessageAt: conv.lastMessageAt, unreadCount: conv.unreadCount } : c).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
         }
         return [conv, ...prev].sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
       });
    };

    socket.on('newMessage', onNewMessage);
    socket.on('conversationUpdated', onConversationUpdated);
    
    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('conversationUpdated', onConversationUpdated);
    };
  }, [socket, activeConv]);

  if (loading) return <Skeleton height={400} />

  const getStudentName = (studentId: string | any) => {
    if (typeof studentId === 'object' && studentId?.name) return studentId.name;
    return students.find((s) => s.id === studentId)?.name || 'Student'
  }

  const handleStartChat = async (studentId: string) => {
    setCreatingChat(true)
    try {
      const conv = await mockApi.createConversation(studentId)
      const convs = await mockApi.getConversations(user!.id, 'teacher')
      setConversations(convs)
      setActiveConv(conv)
      setNewChatOpen(false)
    } finally {
      setCreatingChat(false)
    }
  }

  return (
    <div>
      <PageHeader title="Teacher Messages" subtitle="Direct communication with enrolled students" />

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="sm" radius="md">
            <Group justify="space-between" p="xs">
              <Text fw={600} size="sm">Conversations</Text>
              <ActionIcon color="navy" variant="light" onClick={() => setNewChatOpen(true)}>
                <IconPlus size={18} />
              </ActionIcon>
            </Group>
            <Stack gap="xs">
              {conversations.map((c) => {
                const active = activeConv?.id === c.id
                return (
                  <Paper
                    key={c.id}
                    p="xs"
                    radius="sm"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: active ? '#eef2ff' : 'transparent',
                    }}
                    onClick={() => setActiveConv(c)}
                  >
                    <Group gap="xs">
                      <Avatar color="navy" radius="xl">{getStudentName(c.studentId).slice(0, 2)}</Avatar>
                      <div>
                        <Text size="sm" fw={600}>{getStudentName(c.studentId)}</Text>
                        <Text size="xs" c="dimmed">Last message recently</Text>
                      </div>
                    </Group>
                  </Paper>
                )
              })}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder padding="lg" radius="md">
            {activeConv ? (
              <Stack gap="md" style={{ height: 400 }}>
                <Group p="xs" style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <Text fw={600} size="sm">{getStudentName(activeConv.studentId)}</Text>
                </Group>

                <Stack gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
                  {messages.map((m) => {
                    const isMe = m.senderId === user?.id
                    return (
                      <Group key={m.id} justify={isMe ? 'flex-end' : 'flex-start'}>
                        <Paper
                          p="xs"
                          radius="md"
                          style={{
                            backgroundColor: isMe ? '#1e293b' : '#f1f5f9',
                            color: isMe ? '#ffffff' : '#0f172a',
                            maxWidth: '70%',
                          }}
                        >
                          <Text size="sm">{m.text}</Text>
                        </Paper>
                      </Group>
                    )
                  })}
                </Stack>

                <Group gap="xs">
                  <TextInput
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    style={{ flex: 1 }}
                  />
                  <Button color="navy" onClick={handleSend}>
                    <IconSend size={16} />
                  </Button>
                </Group>
              </Stack>
            ) : (
              <Text c="dimmed">Select a conversation to begin chat.</Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={newChatOpen} onClose={() => setNewChatOpen(false)} title="New Chat" centered>
        <Text size="sm" c="dimmed" mb="md">Select a student to start a conversation with.</Text>
        <Stack gap="sm">
          {(!students || students.length === 0) ? (
            <Text size="sm" c="dimmed">No students available.</Text>
          ) : students.map(student => (
            <Group key={student.id} justify="space-between" style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <Group gap="sm">
                <Avatar color="navy" radius="xl">{student.name.substring(0, 2)}</Avatar>
                <div>
                  <Text size="sm" fw={500}>{student.name}</Text>
                  <Text size="xs" c="dimmed">{student.email}</Text>
                </div>
              </Group>
              <Button size="xs" variant="light" color="navy" onClick={() => handleStartChat(student.id)} loading={creatingChat}>
                Message
              </Button>
            </Group>
          ))}
        </Stack>
      </Modal>
    </div>
  )
}
