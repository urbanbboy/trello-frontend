import { Avatar } from "@/shared/ui/Avatar"

export const Header = () => {
    return (
        <header className="px-4 py-2 shadow-bottom">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/trello-icon.svg" alt="Logo" />
                    <span className="text-2xl">Trello</span>
                </div>
                <div>
                    <Avatar
                        img='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
                        alt="Colm Tiuite"
                    />
                </div>
            </div>
        </header>
    )
}
