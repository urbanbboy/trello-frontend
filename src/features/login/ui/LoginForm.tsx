import { RouteNames } from "@/app/providers/router/routeConfig"
import { LoginSchema } from "@/entities/User"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { PasswordInput } from "@/shared/ui/PasswordInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import * as Yup from 'yup'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Yup.InferType<typeof LoginSchema>>({
        resolver: yupResolver(LoginSchema)
    })

    const onSubmit = async (data: Yup.InferType<typeof LoginSchema>) => {
        try {
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white p-6 rounded-sm shadow-lg w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl text-center mb-4 text-gray-800">Авторизация</h2>
                <div>
                    <div className="font-medium pb-1">Имя пользователя</div>
                    <Input
                        {...register('email')}
                        type="text"
                        placeholder="Введите ваше имя"
                    />
                    <div className="text-red-600">{errors.email?.message}</div>
                </div>
                <div>
                    <div className="font-medium pb-1 mt-4">Пароль</div>
                    <PasswordInput
                        {...register('password')}
                        type="password"
                        placeholder="Введите ваш пароль"
                    />
                    <div className="text-red-600">{errors.password?.message}</div>
                </div>

                <Button type="submit" className="mt-4">
                    Войти
                </Button>
            </form>
            <div className="flex items-center justify-evenly w-full mt-4">
                <p>
                    Нет учетной записи?
                </p>
                <Link to={RouteNames.REGISTER_PAGE} className="text-blue-600">
                    Зарегистрироваться
                </Link>
            </div>
        </div>
    )
}

export default LoginForm