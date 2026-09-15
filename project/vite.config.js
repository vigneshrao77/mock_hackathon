import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAuthRequest } from './src/server/authHandler.ts';
import { handleCurriculumRequest } from './src/server/curriculumHandler.ts';

function serverApiPlugin() {
  return {
    name: 'server-api-plugin',
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
        if (req.url?.startsWith('/api/curriculum')) {
          try {
            const handled = await handleCurriculumRequest(req, res);
            if (handled) return;
          } catch (err) {
            console.error('Curriculum middleware error:', err);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), serverApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
