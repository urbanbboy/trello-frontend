import { Navigate, useLocation } from "react-router-dom"
import { RouteNames } from "./routeConfig"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { useRefreshMutation } from "@/entities/User/model/api"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { userActions } from "@/entities/User"
import { USER } from "@/shared/constants/User"
import { Loader } from "@/shared/ui/Loader"

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const [getUser, { isLoading, isSuccess, isError }] = useRefreshMutation()
    const { pathname } = useLocation()
    const dispatch = useAppDispatch()

    const [isTokenRefreshed, setIsTokenRefreshed] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem(USER.ACCESS_TOKEN)
        if (token && !isTokenRefreshed) {
            setIsTokenRefreshed(true)
            getUser()
                .unwrap()
                .then((data) => {
                    if (data) {
                        const { user, accessToken } = data
                        dispatch(userActions.setUser(user))
                        localStorage.setItem(USER.ACCESS_TOKEN, accessToken)
                    }
                })
        }
    }, [isTokenRefreshed, dispatch, getUser])

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        dispatch(userActions.logout())
        return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: pathname }} />
    }

    if (!isLoading && isSuccess) {
        return children
    }

    return null;
}
