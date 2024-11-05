import { useRefreshMutation } from "@/entities/User/model/api"
import { Routing } from "./providers/router"
import { useEffect } from "react"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { userActions } from "@/entities/User"
import { USER } from "@/shared/constants/User"
import { Loader } from "@/shared/ui/Loader"

function App() {
    const [getUser, { isLoading, isSuccess }] = useRefreshMutation()
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

    if (!isLoading && isSuccess) {
        return (
            <>
                <Routing />
            </>
        )
    }
}

export default App
