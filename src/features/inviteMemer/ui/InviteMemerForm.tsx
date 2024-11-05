import { useTheme } from "@/app/providers/theme"
import { Button } from "@/shared/ui/Button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { InviteMemerSchema } from "../model/schema/Schema"


export const InviteMemerForm = () => {
    const { theme } = useTheme()
    const { register, handleSubmit, formState: { errors } } = useForm<Yup.InferType<typeof InviteMemerSchema>>({
        resolver: yupResolver(InviteMemerSchema)
    })

    const inviteMember = (data: Yup.InferType<typeof InviteMemerSchema>) => {
        console.log(data)
    }

    return (
        <DialogContent theme={theme} className="bg-white dark:bg-slate-700">
            <DialogHeader>
                <DialogTitle className="text-black dark:text-white">
                    Создать доску
                </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(inviteMember)}>
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Адрес электронной почты"
                />
                <div className="text-red-600">{errors.email?.message}</div>
                <DialogFooter>
                    <Button type="submit" className="w-50">Пригласить</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
