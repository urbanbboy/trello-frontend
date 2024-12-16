import { getExtension } from "@/shared/utils/getExtension";
import { mixed, object, string } from "yup";

const SUPPORTED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

export const EditUserSchema = object({
    email: string()
        .required("Email не может быть пустым")
        .email("Неверный формат email"),
    image: mixed<File>()
        .nullable()
        .test({
            message: "Укажите поддерживаемый тип файла",
            test: (file) => {
                if (!file) return true;
                const extension = getExtension(file.name);
                return SUPPORTED_FILE_TYPES.includes(extension);
            },
        })
        .test({
            message: `Файл слишком большой, максимум ${_MAX_FILE_SIZE_ / 1024 / 1024} MB`,
            test: (file) => {
                if (!file) return true; 
                return file.size <= _MAX_FILE_SIZE_;
            },
        }),
    username: string().required("Имя не может быть пустым"),
});
