import { object, string } from "yup";

export const LoginSchema = object({
    email: string().required("Заполните поле"),
    password: string().min(4, "Пароль должен быть не меньше 4 символов").required("Заполните поле")
})