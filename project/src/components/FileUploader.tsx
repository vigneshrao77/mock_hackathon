import { Group, Text, Progress, ActionIcon, Stack, Box } from '@mantine/core'
import { IconUpload, IconX, IconFile, IconPhoto, IconVideo, IconMusic } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { notifications } from '@mantine/notifications'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
}

interface FileUploaderProps {
  accept?: string
  multiple?: boolean
  onUpload: (files: { id: string; name: string; size: number; type: string }[]) => void
  label?: string
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return IconPhoto
  if (type.startsWith('video/')) return IconVideo
  if (type.startsWith('audio/')) return IconMusic
  return IconFile
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUploader({ accept = '*', multiple = true, onUpload, label = 'Upload files' }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
    }))
    setFiles((prev) => [...prev, ...newFiles])
    newFiles.forEach((f) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) => prev.map((p) => p.id === f.id ? { ...p, progress: 100 } : p))
          onUpload([{ id: f.id, name: f.name, size: f.size, type: f.type }])
          notifications.show({ message: `${f.name} uploaded`, color: 'green', size: 'sm' })
        } else {
          setFiles((prev) => prev.map((p) => p.id === f.id ? { ...p, progress } : p))
        }
      }, 200)
    })
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <Stack gap="sm">
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        style={{
          border: '2px dashed #cbd5e1',
          borderRadius: 8,
          padding: '24px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
      >
        <Group gap="xs" justify="center" c="dimmed">
          <IconUpload size={20} />
          <Text size="sm">{label} — click or drag files here</Text>
        </Group>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
      </Box>
      {files.map((f) => {
        const Icon = getFileIcon(f.type)
        return (
          <Group key={f.id} gap="sm" align="center">
            <Icon size={20} color="#64748b" />
            <Stack gap={2} style={{ flex: 1 }}>
              <Group justify="space-between">
                <Text size="xs" fw={500}>{f.name}</Text>
                <Text size="xs" c="dimmed">{formatSize(f.size)}</Text>
              </Group>
              {f.progress < 100 && <Progress value={f.progress} size="xs" color="blue" />}
            </Stack>
            <ActionIcon variant="subtle" color="red" onClick={() => removeFile(f.id)}>
              <IconX size={16} />
            </ActionIcon>
          </Group>
        )
      })}
    </Stack>
  )
}
