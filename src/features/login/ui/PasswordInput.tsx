import { Input, InputProps } from "@/shared/ui/Input"
import { Eye, EyeOff } from "lucide-react"
import { forwardRef, useState } from "react"

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
        const [visible, setVisible] = useState(false)

        const show = () => {
            setVisible(true);
        };
        const hide = () => {
            setVisible(false);
        };

        const onToggle = () => {
            if (visible) {
                hide();
            } else {
                show();
            }
        };

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    {...props}
                    type={!visible ? 'password' : 'text'}
                    placeholder={props.placeholder || 'Пароль'}
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-2 top-5 -translate-y-[50%] w-7 h-7"
                >
                    {!visible
                        ? <Eye />
                        : <EyeOff />
                    }
                </button>
            </div>
        )
    }
)
