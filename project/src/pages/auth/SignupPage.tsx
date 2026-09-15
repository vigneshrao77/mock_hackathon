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
import {
  IconMail,
  IconLock,
  IconUser,
  IconAlertCircle,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'teacher' | 'student';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setServerError('');

    if (!name.trim()) {
      setNameError('Full Name is required');
      isValid = false;
    }

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
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setServerError(data.message || 'Failed to create account. Please try again.');
        return;
      }

      setSuccessMessage('Account created successfully');
    } catch {
      setServerError('An error occurred during sign up. Please try again.');
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
      <Container size="xs" style={{ width: '100%', maxWidth: '440px', margin: 0, padding: 0 }}>
        <Paper
          radius="md"
          p={{ base: 'xl', sm: 32 }}
          withBorder
          shadow="sm"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
          }}
        >
          {/* Header */}
          <Stack align="center" gap="xs" mb="lg">
            <Center
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                backgroundColor: '#0d3880',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(13, 56, 128, 0.2)',
              }}
            >
              <svg
                width="28"
                height="28"
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
                fontSize: '1.4rem',
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
              Create Your Account
            </Text>
          </Stack>

          {/* Error Message */}
          {serverError && (
            <Alert
              icon={<IconAlertCircle size={18} />}
              color="red"
              variant="light"
              radius="md"
              mb="md"
              styles={{ message: { fontWeight: 500 } }}
            >
              {serverError}
            </Alert>
          )}

          {/* Success Message & Redirect to Login */}
          {successMessage ? (
            <Stack gap="md" align="center" py="md">
              <Alert
                icon={<IconCheck size={18} />}
                color="teal"
                variant="light"
                radius="md"
                w="100%"
                styles={{ message: { fontWeight: 600 } }}
              >
                {successMessage}
              </Alert>

              <Text size="sm" c="#4a5568" ta="center">
                Your account has been registered. Please proceed to log in with your credentials.
              </Text>

              <Button
                fullWidth
                size="md"
                radius="sm"
                rightSection={<IconArrowRight size={16} />}
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: '#0d3880',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                Go to Login
              </Button>
            </Stack>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSubmit} noValidate>
              <Stack gap="sm">
                {/* Role Selection */}
                <Box>
                  <Text size="sm" fw={600} c="#2d3748" mb={6}>
                    Select Role <span style={{ color: '#e53e3e' }}>*</span>
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

                {/* Full Name */}
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                    if (nameError) setNameError('');
                  }}
                  error={nameError}
                  disabled={isLoading}
                  leftSection={<IconUser size={16} stroke={1.5} color="#718096" />}
                  required
                  radius="sm"
                  size="sm"
                  styles={{
                    label: { color: '#2d3748', fontWeight: 600, marginBottom: 4, fontSize: '0.85rem' },
                    input: { borderColor: '#cbd5e0' },
                  }}
                />

                {/* Email */}
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
                  size="sm"
                  styles={{
                    label: { color: '#2d3748', fontWeight: 600, marginBottom: 4, fontSize: '0.85rem' },
                    input: { borderColor: '#cbd5e0' },
                  }}
                />

                {/* Password */}
                <PasswordInput
                  label="Password"
                  placeholder="Create a password (min 6 characters)"
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
                  size="sm"
                  styles={{
                    label: { color: '#2d3748', fontWeight: 600, marginBottom: 4, fontSize: '0.85rem' },
                    input: { borderColor: '#cbd5e0' },
                  }}
                />

                {/* Confirm Password */}
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.currentTarget.value);
                    if (confirmPasswordError) setConfirmPasswordError('');
                  }}
                  error={confirmPasswordError}
                  disabled={isLoading}
                  leftSection={<IconLock size={16} stroke={1.5} color="#718096" />}
                  required
                  radius="sm"
                  size="sm"
                  styles={{
                    label: { color: '#2d3748', fontWeight: 600, marginBottom: 4, fontSize: '0.85rem' },
                    input: { borderColor: '#cbd5e0' },
                  }}
                />

                {/* Submit Button */}
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
                    marginTop: '10px',
                  }}
                >
                  Create Account
                </Button>

                {/* Link to Login */}
                <Text size="xs" ta="center" c="#718096" mt="xs">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: '#0d3880',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Log In
                  </Link>
                </Text>
              </Stack>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SignupPage;
