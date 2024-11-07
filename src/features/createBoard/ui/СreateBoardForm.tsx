import { useTheme } from "@/app/providers/theme"
import { Button } from "@/shared/ui/Button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { CreateBoardSchema } from "../model/schema/Schema"
import * as Yup from 'yup'
import { useCreateBoardMutation } from "@/entities/Board/model/api"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { useSelector } from "react-redux"
import { getCurrentUserId } from "@/entities/Board"
import { toast } from "sonner"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { BoardCreateError } from "@/entities/Board/model/types"


export const CreateBoardForm = () => {
    const { theme } = useTheme()
    const [create, { isLoading }] = useCreateBoardMutation()
    const userId = useSelector(getCurrentUserId)
    const { register, handleSubmit, formState: { errors } } = useForm<Yup.InferType<typeof CreateBoardSchema>>({
        resolver: yupResolver(CreateBoardSchema)
    })

    const createBoard = async (data: Yup.InferType<typeof CreateBoardSchema>) => {
        console.log(data)
        await create({
            ...data,
            owner: userId
        }).unwrap()
            .then(() => {
                toast.success("Новая доска создана")
                
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as BoardCreateError
                toast.error(data.message)
            })
    }

    // .catch((error: FetchBaseQueryError) => {
    //     const data = error.data as LoginResponseError;
    //     toast.error(data.message)
    // })

    return (
        <DialogContent theme={theme} className="bg-white dark:bg-slate-700">
            <DialogHeader>
                <DialogTitle className="text-black dark:text-white">
                    Создать доску
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(createBoard)}>
                <Input
                    {...register("name")}
                    type="text"
                    placeholder="Название доски"
                />
                <div className="text-red-600">{errors.name?.message}</div>
                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-50"
                    >
                        {isLoading ? <ButtonLoader/> : <>Создать</>}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
