import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { userActions } from "./slice"
import { LoginResponseSuccess } from "./types"
import { useSelector } from "react-redux"
import { getCurrentUser } from "./selectors"
import { USER } from "@/shared/constants/User"

export const useAuth = () => {
    const dispatch = useAppDispatch()

    const login = (data: LoginResponseSuccess) => {
        dispatch(userActions.setUser(data.user))
        localStorage.setItem(USER.ACCESS_TOKEN, data.accessToken)
    }

    const currentUser = useSelector(getCurrentUser)

    return {
        login,
        currentUser
    }
}