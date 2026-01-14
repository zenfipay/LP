import { Button } from "./button"

export default function DancingBtn() {
    return (
        <div className="bg-[#FAFAFA] flex items-center py-3 px-3.5 gap-4.75 border border-[#F6F6F6]">
            <span className="font-neue font-medium text-[13px] leading-[100%]">
                Scroll down
            </span>
            <Button className="bg-[#99EC64] rounded-lg animate-bounce">
                <img src="/icons/barr.svg" alt="icon" />
            </Button>
        </div>
    )
}