import { useEffect } from "react"
import { Routing } from "./providers/router"

function App() {
    useEffect(() => {
        if (!window.navigator.onLine) alert("Отсутствует интернет соединение")
    }, [])

    return (
        <>
            <Routing />
        </>
    )
}

export default App
