import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAuthRequest } from './src/server/authHandler.ts';
import { handleCurriculumRequest } from './src/server/curriculumHandler.ts';
import { handleEvaluationRequest } from './src/server/evaluationHandler.ts';
import { handleChatRequest } from './src/server/chatHandler.ts';
import { Server } from 'socket.io';

function serverApiPlugin() {
  let io;
  return {
    name: 'server-api-plugin',
    configureServer(server) {
      if (server.httpServer) {
        io = new Server(server.httpServer, {
          cors: { origin: '*' }
        });
        io.on('connection', (socket) => {
          socket.on('join', (userId) => {
            socket.join(userId);
          });
        });
      }
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/auth/') || req.url?.startsWith('/api/profile')) {
          try {
            const handled = await handleAuthRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('Auth middleware error:', err);
          }
        }
        if (req.url?.startsWith('/api/curriculum')) {
          try {
            const handled = await handleCurriculumRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('Curriculum middleware error:', err);
          }
        }
        if (req.url?.startsWith('/api/chat') || req.url?.startsWith('/api/users')) {
          try {
            const handled = await handleChatRequest(req, res, io);
            if (handled) return;
          } catch (err) {
            console.error('Chat middleware error:', err);
          }
        }
        next();
      });
    },
  };
}

function evaluationApiPlugin() {
  return {
    name: 'evaluation-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/evaluation/')) {
          try {
            const handled = await handleEvaluationRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('Evaluation middleware error:', err);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), serverApiPlugin(), evaluationApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
