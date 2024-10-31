import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { RouterProvider } from './app/providers/router/index.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider>
            <App />
        </RouterProvider>
    </StrictMode>,
)
