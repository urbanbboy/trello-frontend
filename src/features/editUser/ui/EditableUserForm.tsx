import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { EditUserSchema } from "../model/schema"
import * as Yup from 'yup'
import { useAuth, userActions } from "@/entities/User"
import { FormInput } from "@/shared/ui/FormInput"
import { Button } from "@/shared/ui/Button"
import { Avatar, AvatarImage } from "@/shared/ui/Avatar"
import { useState } from "react"
import { useEditMutation } from "@/entities/User/model/api"
import { toast } from "sonner"
import { EditUserResponseError, User } from "@/entities/User/model/types"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

const EditableUserForm = () => {
    const { currentUser } = useAuth();
    const { handleSubmit, register, formState: { errors } } = useForm<Yup.InferType<typeof EditUserSchema>>({
        resolver: yupResolver(EditUserSchema),
    });
    const [edit, { isLoading }] = useEditMutation();
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<string | null>(currentUser?.image || null);

    const enableEditing = () => setIsEditing(true);
    const disableEditing = () => setIsEditing(false);

    const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/svg"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Разрешены только изображения (JPEG, PNG)");
            return;
        }

        const fileUrl = URL.createObjectURL(file);
        setImage(fileUrl);
    };

    const onSubmit = async (data: Yup.InferType<typeof EditUserSchema>) => {
        console.log("image: ", image)
        console.log(currentUser)
        await edit({ ...data, id: currentUser?.id })
            .unwrap()
            .then((data: User) => {
                dispatch(userActions.setUser(data));
                toast.success("Данные успешно обновлены");
                disableEditing();
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as EditUserResponseError;
                toast.error(data.message);
            })
    };

    return (
        <div className="w-full max-w-sm my-4 border rounded-md p-4 dark:border-none">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-3">
                    <Avatar className="m-auto w-44 h-44">
                        <AvatarImage
                            src={image || currentUser?.image}
                            alt={currentUser?.username || "User Avatar"}
                        />
                    </Avatar>
                    {isEditing && (
                        <input
                            type="file"
                            className="block"
                            accept="image/*"
                            onChange={onChangeImage}
                        />
                    )}
                    <FormInput
                        id="username"
                        defaultValue={currentUser?.username}
                        {...register("username")}
                        label="Имя пользователя"
                        placeholder="Имя пользователя"
                        error={errors.username?.message}
                        readOnly={!isEditing}
                    />
                    <FormInput
                        id="email"
                        defaultValue={currentUser?.email}
                        {...register("email")}
                        label="Почта"
                        placeholder="Почта пользователя"
                        error={errors.email?.message}
                        readOnly={!isEditing}
                    />
                    <div className="flex justify-end gap-x-4">
                        {isEditing &&
                            <>
                                <Button type="submit" variant="primary">
                                    {isLoading ? <ButtonLoader text="Сохранение" /> : "Сохранить"}
                                </Button>
                                <Button type="button" variant="secondary" onClick={disableEditing}>
                                    Отменить
                                </Button>
                            </>
                        }
                        {!isEditing && <Button type="button" variant="secondary" onClick={enableEditing}>
                            Изменить
                        </Button>}
                    </div>
                </div>
            </form>
        </div>
    );
};
export default EditableUserForm;