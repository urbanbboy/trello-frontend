import { object, string } from "yup";

export const LoginSchema = object({
    username: string().required("Заполните поле"),
    password: string().min(4, "Пароль должен быть не меньше 4 символов").required("Заполните поле")
})