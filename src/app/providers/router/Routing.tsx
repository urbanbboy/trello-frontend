import { Route, Routes } from 'react-router-dom'
import { routeConfig } from './routeConfig'

export const Routing = () => {
    return (
        <Routes>
            {routeConfig.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    )
}
