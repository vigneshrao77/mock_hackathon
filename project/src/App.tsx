import { MantineProvider, AppShell } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { NavigationProgress } from '@mantine/nprogress'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { theme } from './theme'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import { AppLayout } from './layouts/AppLayout'
import './styles/responsive.css'

// Student pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentSubjects from './pages/student/StudentSubjects'
import StudentSubjectDetail from './pages/student/StudentSubjectDetail'
import StudentModuleDetail from './pages/student/StudentModuleDetail'
import StudentContentViewer from './pages/student/StudentContentViewer'
import StudentAssessments from './pages/student/StudentAssessments'
import StudentAssessmentPlayer from './pages/student/StudentAssessmentPlayer'
import StudentAssignments from './pages/student/StudentAssignments'
import StudentAssignmentDetail from './pages/student/StudentAssignmentDetail'
import StudentProgress from './pages/student/StudentProgress'
import StudentLeaderboard from './pages/student/StudentLeaderboard'
import StudentHealth from './pages/student/StudentHealth'
import StudentChat from './pages/student/StudentChat'
import StudentNotifications from './pages/student/StudentNotifications'
import StudentProfile from './pages/student/StudentProfile'

// Teacher pages
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherRegistrations from './pages/teacher/TeacherRegistrations'
import TeacherStudents from './pages/teacher/TeacherStudents'
import TeacherStudentDetail from './pages/teacher/TeacherStudentDetail'
import TeacherSubjects from './pages/teacher/TeacherSubjects'
import TeacherModuleDetail from './pages/teacher/TeacherModuleDetail'
import TeacherAssessments from './pages/teacher/TeacherAssessments'
import TeacherAssessmentCreate from './pages/teacher/TeacherAssessmentCreate'
import TeacherAssessmentDetail from './pages/teacher/TeacherAssessmentDetail'
import TeacherAssignments from './pages/teacher/TeacherAssignments'
import TeacherAssignmentCreate from './pages/teacher/TeacherAssignmentCreate'
import TeacherAssignmentDetail from './pages/teacher/TeacherAssignmentDetail'
import TeacherHealthChecks from './pages/teacher/TeacherHealthChecks'
// TeacherProgress removed — progress visible per-student in Students view
import TeacherChat from './pages/teacher/TeacherChat'
import TeacherNotifications from './pages/teacher/TeacherNotifications'
import TeacherProfile from './pages/teacher/TeacherProfile'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminTeachers from './pages/admin/AdminTeachers'
import AdminAdmins from './pages/admin/AdminAdmins'
// AdminPrograms removed — programs data model kept for referential integrity
import AdminSubjects from './pages/admin/AdminSubjects'

import AdminReports from './pages/admin/AdminReports'
// AdminAudit removed — audit events surface in Notifications (isAudit: true)
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminProfile from './pages/admin/AdminProfile'

// Auth pages
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

function AppRoutes() {
  const { user, role, loading } = useAuth()

  if (loading) {
    return null
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={`/${user.role || role}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={`/${user.role || role}/dashboard`} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/signup"
        element={
          user ? (
            <Navigate to={`/${user.role || role}/dashboard`} replace />
          ) : (
            <SignupPage />
          )
        }
      />

      {/* Student routes */}
      <Route path="/student/*" element={<AppLayout allowedRole="student"><StudentRoutes /></AppLayout>} />

      {/* Teacher routes */}
      <Route path="/teacher/*" element={<AppLayout allowedRole="teacher"><TeacherRoutes /></AppLayout>} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AppLayout allowedRole="admin"><AdminRoutes /></AppLayout>} />

      <Route
        path="*"
        element={
          user ? (
            <Navigate to={`/${user.role || role}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

function StudentRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="subjects" element={<StudentSubjects />} />
      <Route path="subjects/:id" element={<StudentSubjectDetail />} />
      <Route path="modules/:id" element={<StudentModuleDetail />} />
      <Route path="content/:id" element={<StudentContentViewer />} />
      <Route path="assessments" element={<StudentAssessments />} />
      <Route path="assessments/:id" element={<StudentAssessmentPlayer />} />
      <Route path="assignments" element={<StudentAssignments />} />
      <Route path="assignments/:id" element={<StudentAssignmentDetail />} />
      <Route path="progress" element={<StudentProgress />} />
      <Route path="leaderboard" element={<StudentLeaderboard />} />
      <Route path="health" element={<StudentHealth />} />
      <Route path="chat" element={<StudentChat />} />
      <Route path="notifications" element={<StudentNotifications />} />
      <Route path="profile" element={<StudentProfile />} />
    </Routes>
  )
}

function TeacherRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<TeacherDashboard />} />
      <Route path="registrations" element={<TeacherRegistrations />} />
      <Route path="students" element={<TeacherStudents />} />
      <Route path="students/:id" element={<TeacherStudentDetail />} />
      <Route path="subjects" element={<TeacherSubjects />} />
      <Route path="modules/:id" element={<TeacherModuleDetail />} />
      <Route path="assessments" element={<TeacherAssessments />} />
      <Route path="assessments/create" element={<TeacherAssessmentCreate />} />
      <Route path="assessments/:id" element={<TeacherAssessmentDetail />} />
      <Route path="assignments" element={<TeacherAssignments />} />
      <Route path="assignments/create" element={<TeacherAssignmentCreate />} />
      <Route path="assignments/:id" element={<TeacherAssignmentDetail />} />
      <Route path="health-checks" element={<TeacherHealthChecks />} />
      {/* Teacher progress route removed */}
      <Route path="chat" element={<TeacherChat />} />
      <Route path="notifications" element={<TeacherNotifications />} />
      <Route path="profile" element={<TeacherProfile />} />
    </Routes>
  )
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="students" element={<AdminStudents />} />
      <Route path="teachers" element={<AdminTeachers />} />
      <Route path="admins" element={<AdminAdmins />} />
      {/* programs route removed */}
      <Route path="subjects" element={<AdminSubjects />} />

      <Route path="reports" element={<AdminReports />} />
      {/* audit route removed — events appear in Notifications */}
      <Route path="notifications" element={<AdminNotifications />} />
      <Route path="profile" element={<AdminProfile />} />
    </Routes>
  )
}

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <NavigationProgress />
      <ModalsProvider>
        <BrowserRouter>
          <AuthProvider>
            <SocketProvider>
              <AppRoutes />
            </SocketProvider>
          </AuthProvider>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  )
}
