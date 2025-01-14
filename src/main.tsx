import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { RouterProvider } from './app/providers/router'
import { ThemeProvider } from './app/providers/theme'
import { StoreProvider } from './app/providers/store'
import { ToasterProvider } from './app/providers/toast/Toaster'
import { TooltipProvider } from './shared/ui/Tooltip.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToasterProvider />
        <ThemeProvider>
            <RouterProvider>
                <StoreProvider>
                    <TooltipProvider>
                        <App />
                    </TooltipProvider>
                </StoreProvider>
            </RouterProvider>
        </ThemeProvider>
    </StrictMode>,
)
