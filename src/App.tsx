import '@mantine/core/styles.css';
import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';

const deepBlue: MantineColorsTuple = [
  '#ebf3ff',
  '#d6e4ff',
  '#adcbff',
  '#7faeff',
  '#5795fd',
  '#3d83fc',
  '#2f7afc',
  '#2067e1',
  '#0d3880',
  '#092b66',
];

const theme = createTheme({
  primaryColor: 'deepBlue',
  colors: {
    deepBlue,
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
