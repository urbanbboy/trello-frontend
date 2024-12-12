/* eslint-disable @typescript-eslint/no-explicit-any */
import { unsplash } from "@/shared/hooks/unsplash"
import { cn } from "@/shared/utils/classNames"
import { Check, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { defaultImages } from "@/shared/constants/Images"

interface Props {
    id: string;
}

export const FormPicker = ({ id }: Props) => {
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImageId, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9,
                })

                if (result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>)
                    setImages(newImages)
                } else {
                    console.error("Не удалось загрузить фото из unsplash")
                }
            } catch (error) {
                console.log(error)
                setImages(defaultImages)
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [])

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 my-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative overflow-hidden aspect-video group hover:opacity-75 transition bg-muted"
                        )}
                        onClick={() => {
                            setSelectedImageId(image.id)
                        }}
                    >
                        <input
                            type="radio"
                            id={id}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <img
                            src={image.urls.thumb}
                            alt="Unsplash iamge"
                            className="w-full h-full object-cover rounded-sm"
                        />
                        {selectedImageId === image.id && (
                            <div
                                className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center"
                            >
                                <Check className="text-white" size={30} />
                            </div>
                        )}
                        <div
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50"
                        >
                            {image.user.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
