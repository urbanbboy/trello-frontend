import { RouteNames } from "@/app/providers/router/routeConfig";
import { Button } from "@/shared/ui/Button"
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Activate = () => {
    const [isDisabled, setIsDisabled] = useState(false)
    const [countdown, setCountdown] = useState<number>(59);

    useEffect(() => {
        let timerInterval: string | number | NodeJS.Timeout | undefined;

        if (isDisabled) {
            timerInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [isDisabled]);

    const resendActivateLink = async () => {
        console.log('resended code')
        setIsDisabled(true)

        setTimeout(() => {
            setIsDisabled(false)
            setCountdown(60)
        }, 60000);

        

    }

    return (
        <div className="relative flex items-center justify-center bg-gray-100 dark:bg-slate-700 h-screen-minus-48">
            <div className="absolute top-4 left-10 flex items-center gap-x-1 bg-slate-200 dark:bg-slate-600 rounded-md px-2 py-1">
                <ArrowLeft size={20} />
                <Link to={RouteNames.REGISTER_PAGE}>Вернуться назад</Link>
            </div>
            <div className=" bg-gray-200 dark:bg-gray-600 px-4 py-2 rounded-md max-w-md text-center">
                <div className="text-black dark:text-slate-200">Пожалуйста, проверьте свою почту и подтвердите регистрацию, чтобы продолжить.</div>
                {isDisabled
                    ? <div className="mt-5 text-black dark:text-white">
                        <ButtonLoader text={"Повторный запрос"} />
                        0:{countdown > 10 ? countdown : `0${countdown}`}
                    </div >
                    : <Button
                        variant={'link'}
                        className="mt-2"
                        onClick={resendActivateLink}
                        disabled={isDisabled}
                    >
                        Отправить повторный запрос
                    </Button>
                }
            </div>

        </div>
    )
}

export default Activate