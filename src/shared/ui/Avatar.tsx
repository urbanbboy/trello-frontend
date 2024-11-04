import * as RadixAvatar from "@radix-ui/react-avatar";
import { FC } from "react";

interface AvatarProps {
    img: string;
    alt: string;
}

export const Avatar: FC<AvatarProps> = ({ img, alt }) => {

    return (
        <RadixAvatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
            <RadixAvatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={img}
                alt={alt}
            />
            <RadixAvatar.Fallback
                className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium"
                delayMs={600}
            >
                {alt}
            </RadixAvatar.Fallback>
        </RadixAvatar.Root>
    )
}
