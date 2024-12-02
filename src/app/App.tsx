import { Routing } from "./providers/router"

function App() {
    if(!window.navigator.onLine) alert("Отсутствует интернет соединение")

    return (
        <>
            <Routing />
        </>
    )
}

export default App
