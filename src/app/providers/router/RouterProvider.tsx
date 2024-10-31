import { FC, PropsWithChildren } from "react"
import { BrowserRouter } from "react-router-dom"

export const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}
