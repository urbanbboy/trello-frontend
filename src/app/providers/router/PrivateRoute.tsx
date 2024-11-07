// import { useAuth } from "@/entities/User"
import { Navigate, useLocation } from "react-router-dom"
import { RouteNames } from "./routeConfig"
import { FC, PropsWithChildren } from "react"

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const [getUser, { isLoading, isSuccess, isError }] = useRefreshMutation()
    // const { currentUser } = useAuth()
    const { pathname } = useLocation();
    const dispatch = useAppDispatch()

    useEffect(() => {
        getUser()
            .unwrap()
            .then((data) => {
                if (data) {
                    const { user, accessToken } = data
                    dispatch(userActions.setUser(user))
                    localStorage.setItem(USER.ACCESS_TOKEN, accessToken)
                }
            })
    }, [])

    if (isLoading) {
        return <Loader />
    }



    if (isError) {
        return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: pathname }} />
    }

    if (!isLoading && isSuccess) {
        return children
    }
}


import { useRefreshMutation } from "@/entities/User/model/api"
import { useEffect } from "react"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { userActions } from "@/entities/User"
import { USER } from "@/shared/constants/User"
import { Loader } from "@/shared/ui/Loader"
