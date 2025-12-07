import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages: usar nome do repositório como base
  // Para domínio customizado, usar base: '/'
  base: '/MediClinic/',

  plugins: [react()],

  build: {
    // Otimização para Core Web Vitals
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    // Gerar sourcemaps para debugging em produção
    sourcemap: false,
    // Diretório de saída
    outDir: 'dist'
  },

  server: {
    port: 3000,
    open: true
  },

  preview: {
    port: 4173,
    open: true
  }
})
