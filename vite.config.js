import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 개발 서버 포트 설정 (선택사항)
  },
  build: {
    outDir: 'dist', // 빌드 결과물 폴더명
  }
})
