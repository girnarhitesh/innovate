import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (id.includes('antd') || id.includes('@ant-design')) {
            return 'vendor-antd'
          }
          if (id.includes('react-router') || id.includes('react-router-dom')) {
            return 'vendor-router'
          }
          if (id.includes('react-dom')) {
            return 'vendor-react-dom'
          }
          if (id.includes('react-icons')) {
            return 'vendor-icons'
          }
          if (id.includes('swiper')) {
            return 'vendor-swiper'
          }
          if (id.includes('/react/')) {
            return 'vendor-react'
          }

          return undefined
        },
      },
    },
  },
})
