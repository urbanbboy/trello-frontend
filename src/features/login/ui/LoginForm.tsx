import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { RouteNames } from "@/app/providers/router/routeConfig"
import { LoginSchema, useAuth } from "@/entities/User"
import { useLoginMutation } from "@/entities/User/model/api"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { PasswordInput } from "@/shared/ui/PasswordInput"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import * as Yup from 'yup'
import { LoginResponseError } from "@/entities/User/model/types"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"

const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const userAuth = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm<Yup.InferType<typeof LoginSchema>>({
        resolver: yupResolver(LoginSchema)
    })

    const onSubmit = async (data: Yup.InferType<typeof LoginSchema>) => {
        await login(data)
            .unwrap()
            .then((data) => {
                userAuth.login(data)
                navigate(RouteNames.BOARDS_PAGE)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as LoginResponseError;
                toast.error(data.message)
            })
    }

    return (
        <div className="bg-white dark:bg-slate-200 p-6 mx-3 rounded-sm shadow-lg w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl text-center mb-4 text-gray-800">Авторизация</h2>
                <div>
                    <div className="font-medium pb-1">Почта</div>
                    <Input
                        {...register('email')}
                        type="text"
                        placeholder="Введите почту"
                    />
                    <div className="text-red-600 text-xs">{errors.email?.message}</div>
                </div>
                <div>
                    <div className="font-medium pb-1 mt-4">Пароль</div>
                    <PasswordInput
                        {...register('password')}
                        type="password"
                        placeholder="Введите ваш пароль"
                    />
                    <div className="text-red-600 text-xs">{errors.password?.message}</div>
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                    className="mt-4 w-full"
                    variant={'primary'}
                >
                    {isLoading ? <ButtonLoader text="Вход" /> : <>Войти</>}
                </Button>
            </form>
            <div className="flex items-center justify-evenly w-full mt-4">
                <p className="hidden sm:flex">
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