import { useEffect } from "react"
import { Routing } from "./providers/router"
import { toast } from "sonner"

function App() {
    useEffect(() => {
        if (!window.navigator.onLine) toast("Отсутствует интернет соединение")
    }, [])

    return (
        <>
            <Routing />
        </>
    )
}

export default App
