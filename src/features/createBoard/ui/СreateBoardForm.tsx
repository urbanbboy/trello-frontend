import { useTheme } from "@/app/providers/theme"
import { Button } from "@/shared/ui/Button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { CreateBoardSchema } from "../model/schema/Schema"
import * as Yup from 'yup'


export const CreateBoardForm = () => {
    const { theme } = useTheme()
    const { register, handleSubmit, formState: { errors } } = useForm<Yup.InferType<typeof CreateBoardSchema>>({
        resolver: yupResolver(CreateBoardSchema)
    })

    const createBoard = (data: Yup.InferType<typeof CreateBoardSchema>) => {
        console.log(data)
    }

    return (
        <DialogContent theme={theme} className="bg-white dark:bg-slate-700">
            <DialogHeader>
                <DialogTitle className="text-black dark:text-white">
                    Создать доску
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(createBoard)}>
                <Input
                    { ...register("title") }
                    type="text"
                    placeholder="Название доски"
                />
                <div className="text-red-600">{errors.title?.message}</div>
                <DialogFooter>
                    <Button type="submit" className="w-50">Создать</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
