import React, { useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Box,
  Stack,
  Alert,
  Center,
  SegmentedControl,
} from '@mantine/core';
import { IconMail, IconLock, IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export type UserRole = 'admin' | 'teacher' | 'student';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setServerError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!role || !['admin', 'teacher', 'student'].includes(role)) {
      setServerError('Please select a valid role (Admin, Teacher, or Student)');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role,
        }),
      });

      if (!response.ok) {
        setServerError('Invalid email, password, or role.');
        return;
      }

      const data = await response.json();

      if (data && data.token) {
        localStorage.setItem('token', data.token);
      }

      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        // Keep AuthContext in sync
        localStorage.setItem('diksha_auth', JSON.stringify({
          userId: data.user.id,
          role: data.user.role,
          name: data.user.name,
          email: data.user.email,
        }));
      }

      const targetRole = data?.user?.role || role;

      if (data && data.user) {
        setAuthUser(data.user);
      }

      setSuccessMessage('Login successful');

      setTimeout(() => {
        if (targetRole === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else if (targetRole === 'teacher') {
          navigate('/teacher/dashboard', { replace: true });
        } else {
          navigate('/student/dashboard', { replace: true });
        }
      }, 200);
    } catch {
      setServerError('Invalid email, password, or role.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f0f4f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
      }}
    >
      <Container size="xs" style={{ width: '100%', maxWidth: '420px', margin: 0, padding: 0 }}>
        <Paper
          radius="md"
          p={{ base: 'xl', sm: 36 }}
          withBorder
          shadow="sm"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
          }}
        >
          {/* Logo & Header */}
          <Stack align="center" gap="xs" mb="xl">
            <Center
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#0d3880',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(13, 56, 128, 0.2)',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 3 4 6 4s6-2 6-4v-5" />
              </svg>
            </Center>

            <Title
              order={2}
              style={{
                color: '#0d3880',
                fontWeight: 700,
                fontSize: '1.5rem',
                textAlign: 'center',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Diksha Foundation
            </Title>

            <Text
              size="sm"
              style={{
                color: '#4a5568',
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              Learning & Growth Platform
            </Text>
          </Stack>

          {/* Feedback Alerts */}
          {serverError && (
            <Alert
              icon={<IconAlertCircle size={18} />}
              color="red"
              variant="light"
              radius="md"
              mb="md"
              styles={{
                message: { fontWeight: 500 },
              }}
            >
              {serverError}
            </Alert>
          )}

          {successMessage && (
            <Alert
              icon={<IconCheck size={18} />}
              color="teal"
              variant="light"
              radius="md"
              mb="md"
              styles={{
                message: { fontWeight: 600 },
              }}
            >
              {successMessage}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <Stack gap="md">
              {/* Role Selection */}
              <Box>
                <Text size="sm" fw={600} c="#2d3748" mb={6}>
                  Role <span style={{ color: '#e53e3e' }}>*</span>
                </Text>
                <SegmentedControl
                  fullWidth
                  value={role}
                  onChange={(val) => setRole(val as UserRole)}
                  data={[
                    { label: 'Admin', value: 'admin' },
                    { label: 'Teacher', value: 'teacher' },
                    { label: 'Student', value: 'student' },
                  ]}
                  color="navy"
                  radius="sm"
                  size="sm"
                  disabled={isLoading}
                />
              </Box>

              <TextInput
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  if (emailError) setEmailError('');
                }}
                error={emailError}
                disabled={isLoading}
                leftSection={<IconMail size={16} stroke={1.5} color="#718096" />}
                required
                radius="sm"
                size="md"
                styles={{
                  label: {
                    color: '#2d3748',
                    fontWeight: 600,
                    marginBottom: 6,
                    fontSize: '0.875rem',
                  },
                  input: {
                    borderColor: '#cbd5e0',
                  },
                }}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  if (passwordError) setPasswordError('');
                }}
                error={passwordError}
                disabled={isLoading}
                leftSection={<IconLock size={16} stroke={1.5} color="#718096" />}
                required
                radius="sm"
                size="md"
                styles={{
                  label: {
                    color: '#2d3748',
                    fontWeight: 600,
                    marginBottom: 6,
                    fontSize: '0.875rem',
                  },
                  input: {
                    borderColor: '#cbd5e0',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                size="md"
                radius="sm"
                loading={isLoading}
                style={{
                  backgroundColor: '#0d3880',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginTop: '8px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                Login
              </Button>

              {/* Link to Signup */}
              <Text size="xs" ta="center" c="#718096" mt="xs">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{
                    color: '#0d3880',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
