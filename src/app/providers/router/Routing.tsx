import { Route, Routes } from 'react-router-dom'
import { routeConfig } from './routeConfig'
import { ReactNode, Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader'
import { Sidebar } from '@/widgets/Sidebar';
import { Header } from '@/widgets/Header';

export const Routing = () => {

    const routeElement = (element: ReactNode, layout: boolean | "sidebar" | "header") => {

        if (layout == true) {
            return (
                <>
                    <Header />
                    <div className="flex m-4 gap-4">
                        <Sidebar />
                        <main className="flex-grow p-3 border rounded-lg">
                            {element}
                        </main>
                    </div>
                </>
            )
        }

        if (layout == "header") {
            return (
                <>
                    <Header />
                    {element}
                </>
            )
        }
    }

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {routeConfig.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            routeElement(route.element, route.layout)
                        }
                    />
                ))}
            </Routes>
        </Suspense>

    )
}
