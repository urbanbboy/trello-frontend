import { object, ref, string } from "yup";

export const LoginSchema = object({
    email: string().required("Заполните поле").email(),
    password: string().min(4, "Пароль должен быть не меньше 4 символов").required("Заполните поле")
})

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const RegisterSchema = object({
    email: string().email().required("Заполните поле").matches(emailRegExp, "Неверный адрес электронной почты"),
    username: string().required("Заполните поле"),
    password: string().min(4, "Пароль должен быть не меньше 4 символов").required("Заполните поле"),
    confirmPassword: string().min(4, "Пароль должен быть не меньше 4 символов").oneOf([ref("password")], "Пароли не соответствуют").transform(value => (value === "" ? undefined : value)).optional(),
})

export const InviteRegisterSchema = object({
    email: string().email().required("Заполните поле").matches(emailRegExp, "Неверный адрес электронной почты"),
    username: string().required("Заполните поле"),
    password: string().min(4, "Пароль должен быть не меньше 4 символов").required("Заполните поле"),
    confirmPassword: string().min(4, "Пароль должен быть не меньше 4 символов").oneOf([ref("password")], "Пароли не соответствуют").transform(value => (value === "" ? undefined : value)).optional(),
    token: string().notRequired(),
})