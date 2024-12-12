import { object, string } from "yup";

export const EditUserSchema = object({
    email: string().required("Email не может быть пустым").email(),
    // password: string().min(4, "Пароль должен быть не меньше 4 символов").required("Заполните поле")
    image: string(),
    username: string().required("Имя не может быть пустым"),
    birthDate: string()
})
