import { Route, Routes } from 'react-router-dom'
import { routeConfig } from './routeConfig'
import { Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader'

export const Routing = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                {routeConfig.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </Suspense>

    )
}
