import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { RouterProvider } from './app/providers/router'
import { ThemeProvider } from './app/providers/theme'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider>
                <App />
            </RouterProvider>
        </ThemeProvider>
    </StrictMode>,
)
