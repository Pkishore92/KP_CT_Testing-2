import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/KP_CT_Testing-2/',  // This matches your repository name
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
