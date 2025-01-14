import { object, string } from "yup";


export const InviteUserSchema = object({
    email: string()
        .required("Email не может быть пустым")
        .email("Неверный формат email"),
});
