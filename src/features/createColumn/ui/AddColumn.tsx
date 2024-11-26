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
}

export const AddColumn: FC<Props> = ({ isLoading, formVisible, setFormVisible, addColumn }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Yup.InferType<typeof CreateColumnSchema>>({
        resolver: yupResolver(CreateColumnSchema)
    })

    const onCloseForm = () => {
        reset()
        setFormVisible(false)
    }

    return (
        <>
            {formVisible
                ? <form onSubmit={handleSubmit(addColumn)} className="border rounded-md p-2 bg-white">
                    <Input
                        autoFocus
                        placeholder="Название колонки"
                        {...register("title")}
                        className="h-8"
                    />
                    <div className="text-red-600 text-xs mb-2">{errors.title?.message}</div>
                    <div className="flex gap-1">
                        <Button type="submit">
                            {isLoading ? <ButtonLoader text="Создание" /> : <>Создать</>}
                        </Button>
                        <Button onClick={onCloseForm} type="button" className="border-slate-200 bg-transparent hover:bg-slate-300 flex-1">
                            <X className="text-slate-600" />
                        </Button>
                    </div>
                </form>
                : <Button onClick={() => setFormVisible(true)} disabled={isLoading} className="w-72 h-12">
                    <div className="flex justify-center">
                        <Plus /> Добавить
                    </div>
                </Button>
            }
        </>

    )
}
