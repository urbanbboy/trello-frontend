
import { object, string } from "yup";

export const CreateColumnSchema = object({
    title: string().required("Заполните поле"),
})