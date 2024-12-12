import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/Dialog";
import { Input } from "@/shared/ui/Input";
import { FormPicker } from "./FormPicker";
import { useTheme } from "@/app/providers/theme";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useCreateBoardMutation } from "@/entities/Board/model/api";
import { BoardCreateError } from "@/entities/Board/model/types";
import { toast } from "sonner";

interface Props {
    children: React.ReactNode;
    userId: string;
}

export const FormDialog = ({ children, userId }: Props) => {
    const [create, { isLoading }] = useCreateBoardMutation()
    const [open, setOpen] = useState(false)
    const { theme } = useTheme()


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;
        await create({
            name,
            image,
            owner: userId
        }).unwrap()
            .then(() => {
                setOpen(false)
                toast.success("Новая доска создана")
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as BoardCreateError
                toast.error(data.message)
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent theme={theme}>
                <DialogHeader>
                    <DialogTitle className="text-black dark:text-white">
                        Создать доску
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <FormPicker id={'image'} />
                    <Input
                        name="name"
                        id={'inputRef'}
                        type={'text'}
                        placeholder="Название доски"
                    />
                    <DialogFooter>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="w-50"
                            variant={'primary'}
                        >
                            {isLoading ? <ButtonLoader text={'Создание'} /> : <>Создать</>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
