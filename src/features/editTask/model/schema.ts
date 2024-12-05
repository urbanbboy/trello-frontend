import { object, string } from "yup";

export const EditTaskSchema = object({
    title: string().required("Заполните поле"),
})