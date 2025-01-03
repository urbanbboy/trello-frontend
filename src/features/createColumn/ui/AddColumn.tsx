import { Button } from "@/shared/ui/Button"
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { Input } from "@/shared/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, X } from "lucide-react"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from 'yup'
import { CreateColumnSchema } from "../model/schema";

interface Props {
    addColumn: SubmitHandler<{ title: string; }>;
    isLoading?: boolean;
    formVisible: boolean;
    setFormVisible: (visible: boolean) => void;
    isSuccess: boolean;
}

export const AddColumn: FC<Props> = ({ isLoading, formVisible, setFormVisible, addColumn }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Yup.InferType<typeof CreateColumnSchema>>({
        resolver: yupResolver(CreateColumnSchema)
    })

    const onCloseForm = () => {
        reset()
        setFormVisible(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Escape") {
            onCloseForm()
        }
    }

    return (
        <>
            {formVisible
                ? <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(addColumn)} className="border rounded-md p-2 bg-white dark:bg-slate-500 dark:border-none ">
                    <Input
                        autoFocus
                        placeholder="Название колонки"
                        {...register("title")}
                        className="h-8"
                    />
                    <div className="text-red-600 text-xs mb-2">{errors.title?.message}</div>
                    <div className="flex gap-1">
                        <Button type="submit" variant={'primary'} className="flex-1">
                            {isLoading ? <ButtonLoader text="Создание" /> : <>Создать</>}
                        </Button>
                        <Button onClick={onCloseForm} type="button" className="" variant={'transparent'}>
                            <X className="text-slate-600 dark:text-white/70" />
                        </Button>
                    </div>
                </form>
                : <Button onClick={() => setFormVisible(true)} disabled={isLoading} className="w-72 h-12" variant={'primary'}>
                    <div className="flex justify-center items-center">
                        <Plus /> <span>Добавить</span>
                    </div>
                </Button>
            }
        </>

    )
}
