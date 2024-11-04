import { LoginForm } from "@/features/login"

export const Login = () => {
    return (
        <div
            style={{ height: 'calc(100dvh - 80px)' }}
            className="flex items-center justify-center bg-gray-100"
        >
            <LoginForm />
        </div>
    )
}
