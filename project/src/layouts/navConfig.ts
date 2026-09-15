import type { IconNode } from '@tabler/icons-react'
import {
  IconLayoutDashboard, IconBook, IconClipboardList, IconClipboardCheck,
  IconChartBar, IconTrophy, IconHeart, IconMessage, IconBell, IconUser,
  IconUsers, IconUserPlus, IconSchool, IconStethoscope,
  IconShield, IconChartDots, IconReport,
} from '@tabler/icons-react'
import type { UserRole } from '../types'

interface NavItem {
  label: string
  icon: IconNode
  path: string
}

export const navConfig: Record<UserRole, NavItem[]> = {
  student: [
    { label: 'Dashboard', icon: IconLayoutDashboard, path: '/student/dashboard' },
    { label: 'Subjects', icon: IconBook, path: '/student/subjects' },
    { label: 'Assessments', icon: IconClipboardCheck, path: '/student/assessments' },
    { label: 'Assignments', icon: IconClipboardList, path: '/student/assignments' },
    { label: 'Progress', icon: IconChartBar, path: '/student/progress' },
    { label: 'Leaderboard', icon: IconTrophy, path: '/student/leaderboard' },
    { label: 'Health', icon: IconHeart, path: '/student/health' },
    { label: 'Chat', icon: IconMessage, path: '/student/chat' },
    { label: 'Notifications', icon: IconBell, path: '/student/notifications' },
    { label: 'Profile', icon: IconUser, path: '/student/profile' },
  ],
  teacher: [
    { label: 'Dashboard', icon: IconLayoutDashboard, path: '/teacher/dashboard' },
    { label: 'Pending Registrations', icon: IconUserPlus, path: '/teacher/registrations' },
    { label: 'Students', icon: IconUsers, path: '/teacher/students' },
    { label: 'Subjects & Modules', icon: IconSchool, path: '/teacher/subjects' },
    { label: 'Assessments', icon: IconClipboardCheck, path: '/teacher/assessments' },
    { label: 'Assignments', icon: IconClipboardList, path: '/teacher/assignments' },
    { label: 'Health Checks', icon: IconStethoscope, path: '/teacher/health-checks' },
    // Progress tab removed per requirements — progress visible per-student in Students view
    { label: 'Chat', icon: IconMessage, path: '/teacher/chat' },
    { label: 'Notifications', icon: IconBell, path: '/teacher/notifications' },
    { label: 'Profile', icon: IconUser, path: '/teacher/profile' },
  ],
  admin: [
    { label: 'Dashboard', icon: IconLayoutDashboard, path: '/admin/dashboard' },
    { label: 'Students', icon: IconUsers, path: '/admin/students' },
    { label: 'Teachers', icon: IconSchool, path: '/admin/teachers' },
    { label: 'Admins', icon: IconShield, path: '/admin/admins' },
    // Programs removed — data model kept for referential integrity
    { label: 'Subjects', icon: IconBook, path: '/admin/subjects' },

    { label: 'Reports', icon: IconReport, path: '/admin/reports' },
    // Audit Logs removed — audit events now surface in Notifications (isAudit: true)
    { label: 'Notifications', icon: IconBell, path: '/admin/notifications' },
    { label: 'Profile', icon: IconUser, path: '/admin/profile' },
  ],
}
