import { Title, Text, Group, Breadcrumbs, Anchor } from '@mantine/core'

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
  action?: React.ReactNode
}

export function PageHeader({ title, subtitle, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumbs && (
        <Breadcrumbs mb={8}>
          {breadcrumbs.map((bc, i) => (
            <Anchor key={i} size="xs" c="dimmed" href={bc.href}>
              {bc.label}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}
      <Group justify="space-between" align="flex-end" wrap="wrap">
        <div>
          <Title order={3} fw={700}>{title}</Title>
          {subtitle && <Text size="sm" c="dimmed" mt={4}>{subtitle}</Text>}
        </div>
        {action}
      </Group>
    </div>
  )
}
