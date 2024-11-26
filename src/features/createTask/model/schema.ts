
import { object, string } from "yup";

export const CreateTaskSchema = object({
    title: string().required("Заполните поле"),
})