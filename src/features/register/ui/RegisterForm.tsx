import { RouteNames } from "@/app/providers/router/routeConfig"
import { RegisterSchema, useAuth } from "@/entities/User"
import { useRegisterMutation } from "@/entities/User/model/api"
import { RegisterResponseError } from "@/entities/User/model/types"
import { Button } from "@/shared/ui/Button"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { Input } from "@/shared/ui/Input"
import { PasswordInput } from "@/shared/ui/PasswordInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import * as Yup from 'yup'

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Yup.InferType<typeof RegisterSchema>>({
        resolver: yupResolver(RegisterSchema)
    })
    const navigate = useNavigate()
    const userAuth = useAuth()
    const [registerUser, { isLoading }] = useRegisterMutation()

    const onSubmit = async (data: Yup.InferType<typeof RegisterSchema>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...userData } = data
        await registerUser(userData)
            .unwrap()
            .then((data) => {
                userAuth.login(data)
                navigate(RouteNames.BOARDS_PAGE)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as RegisterResponseError;
                toast.error(data.message)
            })
    }

    return (
        <div className="bg-white dark:bg-slate-200 p-6 mx-3 rounded-sm shadow-lg w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl text-center mb-4 text-gray-800">Регистрация</h2>
                <div>
                    <div className="font-medium pb-1">Почта</div>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="Введите почту"
                    />
                    <div className="text-red-600 text-xs">{errors.email?.message}</div>
                </div>
                <div>
                    <div className="font-medium pb-1">Имя пользователя</div>
                    <Input
                        {...register('username')}
                        type="text"
                        placeholder="Введите ваше имя"
                    />
                    <div className="text-red-600 text-xs">{errors.username?.message}</div>
                </div>
                <div className="pb-2">
                    <div className="font-medium pb-1 mt-1">Пароль</div>
                    <PasswordInput
                        {...register('password')}
                        type="password"
                        placeholder="Создайте пароль"
                    />
                    <div className="text-red-600 text-xs">{errors.password?.message}</div>
                </div>
                <div>
                    <PasswordInput
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="Подтвердите пароль"
                    />
                    <div className="text-red-600 text-xs">{errors.confirmPassword?.message}</div>
                </div>

                <Button type="submit" className="mt-4">
                    {isLoading ? <ButtonLoader text="Регистрация" /> : <>Зарегистрироваться</>}
                </Button>
            </form>
            <div className="flex items-center justify-center w-full mt-4">
                <p>
                    Есть учетная запись?
                </p>
                <Link to={RouteNames.LOGIN_PAGE} className="text-blue-600 pl-2">Войти</Link>
            </div>
        </div>
    )
}

export default RegisterForm