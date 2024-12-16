import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { userActions } from "./slice"
import { User } from "./types"
import { useSelector } from "react-redux"
import { getCurrentUser } from "./selectors"
// import { USER } from "@/shared/constants/User"

export const useUser = () => {
    const dispatch = useAppDispatch()

    const setUser = (data: User) => {
        dispatch(userActions.setUser(data))
        // localStorage.setItem(USER.ACCESS_TOKEN, data)
    }

    const currentUser = useSelector(getCurrentUser)

    return {
        setUser,
        currentUser,
    }
}