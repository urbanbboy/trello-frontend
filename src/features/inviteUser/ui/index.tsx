import { Dispatch, FC, SetStateAction } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui/Dialog";
import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { FormInput } from "@/shared/ui/FormInput";
import { InviteUserSchema } from "../model/schema";
import { useInviteMutation } from "@/entities/User/model/api";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { InviteUserResponseError, InviteUserResponseSuccess } from "../model/types";
import { OctagonAlert, UserRoundPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";


interface Props {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    boardId: string;
}

const InviteUserForm: FC<Props> = ({ open, onOpenChange, boardId }) => {
    const [invite, { isLoading }] = useInviteMutation()
    const { handleSubmit, register, formState: { errors } } = useForm<Yup.InferType<typeof InviteUserSchema>>({
        resolver: yupResolver(InviteUserSchema)
    })

    const onSubmit = async (data: Yup.InferType<typeof InviteUserSchema>) => {
        await invite({
            ...data,
            boardId,
        })
            .unwrap()
            .then((data: InviteUserResponseSuccess) => {
                toast(data.message)
                onOpenChange(false)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as InviteUserResponseError;
                toast.error(data.message)
            })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger>
                <Button variant={'primary'} size={'inline'} className="flex gap-0.5">
                    <UserRoundPlus />
                    <span className="hidden md:flex">Пригласить</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-black dark:text-white">
                        Приглашение
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-1">
                        <FormInput
                            id={"email"}
                            placeholder="Email"
                            label="Почта пользователя"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <Tooltip>
                            <TooltipTrigger className="flex items-end mb-2">
                                <OctagonAlert className="text-destructive" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <h4>Обратите внимание:</h4>
                                <ul className="list-disc list-inside w-full max-w-md">
                                    <li>
                                        Если у указанного пользователя уже имеется аккаунт в системе, он будет добавлен в качестве участника доски.
                                    </li>
                                    <li>
                                        Если аккаунта нет, на указанный адрес электронной почты будет отправлено приглашение для регистрации, после чего пользователь будет автоматически добавлен к доске.
                                    </li>
                                </ul>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="w-50"
                            variant={'primary'}
                        >
                            {isLoading ? <ButtonLoader text={'Приглашение'} /> : <>Пригласить</>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteUserForm