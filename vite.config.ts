import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src')
        }
    },
    define: {
        __BASE_URL__: JSON.stringify("http://localhost:8080/api")
    }
})
