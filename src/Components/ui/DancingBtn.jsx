import SplitParagraph from "./SplitTextParagraph"

export default function DancingBtn() {
    return (
        <div className="bg-[#FAFAFA] w-fit h-11 flex items-center py-3 px-3.5 gap-4.75 border border-[#F6F6F6] rounded-lg">
            <SplitParagraph
                text="Scroll down"
                className="font-neue font-semibold text-[13px] leading-[100%]"
            />
            <div className="bg-[#99EC64] p-3 rounded-lg ">
                <img src="/icons/darr.svg" alt="icon" className="size-4 animate-bounce"/>
            </div>
        </div>
    )
}