import { useState, useEffect } from 'react'
import { Grid, Card, Text, Group, TextInput, Button, Stack, Avatar, Paper, Skeleton } from '@mantine/core'
import { IconSend, IconMessage } from '@tabler/icons-react'
import { PageHeader } from '../../components/PageHeader'
import { mockApi } from '../../services/mockApi'
import { useAuth } from '../../context/AuthContext'
import type { Conversation, Message, Student } from '../../types'

export default function TeacherChat() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [activeConv, setActiveConv] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(true)

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
    setMessages((prev) => [...prev, msg])
    setInputText('')
  }

  if (loading) return <Skeleton height={400} />

  const getStudentName = (studentId: string) => students.find((s) => s.id === studentId)?.name || 'Student'

  return (
    <div>
      <PageHeader title="Teacher Messages" subtitle="Direct communication with enrolled students" />

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder padding="sm" radius="md">
            <Text fw={600} size="sm" p="xs">Conversations</Text>
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
    </div>
  )
}
