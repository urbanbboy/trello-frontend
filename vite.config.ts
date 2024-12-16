import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer() as PluginOption
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src')
        }
    },
    define: {
        __LOCAL_BASE_URL__: JSON.stringify("http://localhost:8080/api"),
        __RENDER_BASE_URL__: JSON.stringify("https://trello-backend-sglq.onrender.com/api"),
        __UNSPLASH_API_KEY__: JSON.stringify('-OycfeGP9NPRcI2ln69mFnJLfj2-1BExAgarFqFJcQI'),
        _MAX_FILE_SIZE_: JSON.stringify(2000000)
    }
})