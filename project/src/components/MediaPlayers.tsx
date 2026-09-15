import { Stack, Text, Group, Button, Box } from '@mantine/core'
import { IconPlayerPlay, IconPlayerPause, IconMicrophone, IconVideo, IconRefresh } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'

export function VideoPlayer({ url, title }: { url?: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <Stack gap="sm">
      <Box
        style={{
          background: '#1e293b',
          borderRadius: 8,
          height: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {url ? (
          <video src={url} controls style={{ width: '100%', height: '100%', borderRadius: 8 }} />
        ) : (
          <Stack align="center" gap="sm">
            <IconPlayerPlay size={48} color="#64748b" />
            <Text size="sm" c="#94a3b8">{title}</Text>
            <Button variant="light" size="xs" leftSection={<IconPlayerPlay size={14} />} onClick={() => setPlaying((p) => !p)}>
              {playing ? 'Pause' : 'Play'}
            </Button>
          </Stack>
        )}
      </Box>
      <Text size="sm" c="dimmed">{title}</Text>
    </Stack>
  )
}

export function AudioPlayer({ url, title }: { url?: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 0 }
          return p + 2
        })
      }, 200)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [playing])

  return (
    <Stack gap="sm">
      <Group gap="sm" align="center">
        <Button
          variant="light"
          size="sm"
          onClick={() => setPlaying((p) => !p)}
          leftSection={playing ? <IconPlayerPause size={14} /> : <IconPlayerPlay size={14} />}
        >
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Box style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
          <Box style={{ width: `${progress}%`, height: '100%', background: '#4f46e5', transition: 'width 0.2s' }} />
        </Box>
        <Text size="xs" c="dimmed" style={{ minWidth: 40 }}>{Math.round(progress)}%</Text>
      </Group>
      <Text size="sm" c="dimmed">{title}</Text>
    </Stack>
  )
}

export function AudioRecorder({ onSubmit }: { onSubmit: () => void }) {
  const [recording, setRecording] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const [duration, setDuration] = useState(0)
  const timerRef = useRef<number | null>(null)

  const startRecording = () => {
    setRecording(true)
    setRecorded(false)
    setDuration(0)
    timerRef.current = window.setInterval(() => setDuration((d) => d + 1), 1000)
  }

  const stopRecording = () => {
    setRecording(false)
    setRecorded(true)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const reset = () => {
    setRecorded(false)
    setDuration(0)
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  return (
    <Stack gap="sm" align="center">
      <Box
        style={{
          width: 80, height: 80, borderRadius: '50%',
          background: recording ? '#fee2e2' : recorded ? '#dcfce7' : '#f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `3px solid ${recording ? '#ef4444' : recorded ? '#22c55e' : '#cbd5e1'}`,
        }}
      >
        <IconMicrophone size={32} color={recording ? '#ef4444' : '#64748b'} />
      </Box>
      <Text size="sm" fw={500}>
        {recording ? `Recording... ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` :
         recorded ? `Recorded: ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` :
         'Press to start recording'}
      </Text>
      <Group gap="sm">
        {!recording && !recorded && (
          <Button leftSection={<IconMicrophone size={14} />} onClick={startRecording}>Record Audio</Button>
        )}
        {recording && (
          <Button color="red" onClick={stopRecording}>Stop Recording</Button>
        )}
        {recorded && (
          <>
            <Button variant="light" leftSection={<IconRefresh size={14} />} onClick={reset}>Re-record</Button>
            <Button onClick={onSubmit}>Submit Recording</Button>
          </>
        )}
      </Group>
    </Stack>
  )
}

export function VideoRecorder({ onSubmit }: { onSubmit: () => void }) {
  const [recording, setRecording] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const [duration, setDuration] = useState(0)
  const timerRef = useRef<number | null>(null)

  const startRecording = () => {
    setRecording(true)
    setRecorded(false)
    setDuration(0)
    timerRef.current = window.setInterval(() => setDuration((d) => d + 1), 1000)
  }

  const stopRecording = () => {
    setRecording(false)
    setRecorded(true)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const reset = () => {
    setRecorded(false)
    setDuration(0)
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  return (
    <Stack gap="sm" align="center">
      <Box
        style={{
          width: '100%', maxWidth: 400, height: 240, borderRadius: 8,
          background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `3px solid ${recording ? '#ef4444' : recorded ? '#22c55e' : '#334155'}`,
        }}
      >
        <IconVideo size={48} color="#64748b" />
      </Box>
      <Text size="sm" fw={500}>
        {recording ? `Recording... ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` :
         recorded ? `Recorded: ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}` :
         'Press to start video recording'}
      </Text>
      <Group gap="sm">
        {!recording && !recorded && (
          <Button leftSection={<IconVideo size={14} />} onClick={startRecording}>Record Video</Button>
        )}
        {recording && (
          <Button color="red" onClick={stopRecording}>Stop Recording</Button>
        )}
        {recorded && (
          <>
            <Button variant="light" leftSection={<IconRefresh size={14} />} onClick={reset}>Re-record</Button>
            <Button onClick={onSubmit}>Submit Recording</Button>
          </>
        )}
      </Group>
    </Stack>
  )
}
