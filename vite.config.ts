import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { handleAuthRequest } from './src/server/authHandler.ts';

function authApiPlugin(): Plugin {
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), authApiPlugin()],
});
