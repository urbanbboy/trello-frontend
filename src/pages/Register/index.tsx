import { RegisterForm } from "@/features/register"
import { useSearchParams } from "react-router-dom"

const Register = () => {
    const [searchParams] = useSearchParams()
    const invitationToken = searchParams.get('token')

    return (
        <div className="flex items-center justify-center h-screen-minus-48 bg-gray-100 dark:bg-slate-700">
            <RegisterForm token={invitationToken} />
        </div>
    )
}

export default Register