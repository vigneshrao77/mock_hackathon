import React from 'react';
import { Container, Paper, Title, Text, Button, Stack, Badge, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Container size="sm" py={50}>
      <Paper p="xl" radius="md" withBorder shadow="sm" bg="white">
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Title order={2} c="#0d3880">
              Admin Dashboard
            </Title>
            <Badge color="blue" variant="filled" size="lg">
              Admin
            </Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Welcome, <strong>{user?.name || 'Administrator'}</strong> ({user?.email || 'admin'}). This is a minimal placeholder dashboard.
          </Text>

          <Button
            variant="outline"
            color="red"
            onClick={handleLogout}
            style={{ alignSelf: 'flex-start' }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
