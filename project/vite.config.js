import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAuthRequest } from './src/server/authHandler.ts';
import { handleEvaluationRequest } from './src/server/evaluationHandler.ts';

function authApiPlugin() {
  return {
    name: 'auth-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/auth/')) {
          try {
            const handled = await handleAuthRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('Auth middleware error:', err);
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
  plugins: [react(), authApiPlugin(), evaluationApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
