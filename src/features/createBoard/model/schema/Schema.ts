
import { object, string } from "yup";

export const CreateBoardSchema = object({
    name: string().required("Заполните поле"),
})