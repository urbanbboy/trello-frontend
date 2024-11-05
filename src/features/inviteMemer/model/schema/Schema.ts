
import { object, string } from "yup";

export const InviteMemerSchema = object({
    email: string().required("Заполните поле"),
})