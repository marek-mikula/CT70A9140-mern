import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        port: Number(process.env.FRONTEND_PORT) || 3000,
        proxy: {
            '/api': `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT || 8080}`
        }
    },
    plugins: [
        react(),
        tailwindcss(),
    ],
})
