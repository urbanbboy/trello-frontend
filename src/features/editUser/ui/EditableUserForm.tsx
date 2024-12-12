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
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { EditUserResponseError, User } from "@/entities/User/model/types"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { useAppDispatch } from "@/shared/hooks/useAppDispatch"

const EditableUserForm = () => {
    const { currentUser } = useAuth()
    const { handleSubmit, register, formState: { errors } } = useForm<Yup.InferType<typeof EditUserSchema>>({
        resolver: yupResolver(EditUserSchema)
    })
    const [edit, { isLoading }] = useEditMutation()
    const dispatch = useAppDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState(currentUser?.image)

    const enableEditing = () => {
        setIsEditing(true)
    }


    const disableEditing = () => {
        setIsEditing(false)
    }

    const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setImage(files?.item(0)?.name);
        console.log(image)
    }

    const onSubmit = async (data: Yup.InferType<typeof EditUserSchema>) => {
        await edit({...data, id: currentUser?.id}).unwrap()
            .then((data: User) => {
                dispatch(userActions.setUser(data))
                toast.success("Данные успешно обновлены")
                disableEditing()
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as EditUserResponseError;
                toast.error(data.message)
            })
    }

    return (
        <div className="w-full max-w-sm my-4 border rounded-md p-4 dark:border-none">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-3">
                    <Avatar className="m-auto w-44 h-44">
                        <AvatarImage
                            src=""
                            alt={currentUser?.username}
                        />
                    </Avatar>
                    <input
                        type="file"
                        className={isEditing ? "hidden" : 'hidden'}
                        accept="/image/*"
                        onChange={onChangeImage}
                    />
                    <FormInput
                        id={'username'}
                        defaultValue={currentUser?.username}
                        {...register("username")}
                        label="Имя пользователя"
                        placeholder="Имя пользователя"
                        error={errors.username?.message}
                        readOnly={!isEditing}
                    />
                    <FormInput
                        id={'email'}
                        defaultValue={currentUser?.email}
                        {...register("email")}
                        label="Почтв"
                        placeholder="Почта пользователя"
                        error={errors.email?.message}
                        readOnly={!isEditing}
                    />
                    <div className="flex justify-end gap-x-4">
                        {isEditing && <>
                            <Button
                                type="submit"
                                variant={'primary'}
                            >
                                {isLoading ? <ButtonLoader text={"Сохранение"}/> : <>Сохранить</>}
                            </Button>
                            <Button
                                type="button"
                                variant={'secondary'}
                                onClick={disableEditing}
                            >
                                Отменить
                            </Button>
                        </>
                        }
                        {!isEditing && <Button
                            type="button"
                            variant={"secondary"}
                            onClick={enableEditing}
                        >
                            Изменить
                        </Button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}
export default EditableUserForm