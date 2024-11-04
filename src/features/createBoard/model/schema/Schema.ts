
import { object, string } from "yup";

export const CreateBoardSchema = object({
    title: string().required("Заполните поле"),
})