import SplitTextHeader from "./ui/SplitTextHeader"
import RequestDemo from "./ui/CalendlyMorphBtn"

export default function DigitalCrypto() {
    return (
        <section className="bg-[#20195F] w-full h-fit px-4 py-5.5 lg:px-20 lg:py-24">

            <div className="h-fit bg-[#014DFF] py-17.25 px-4.5 lg:p-20 rounded-[36px]">
                <SplitTextHeader
                    text="Crypto is digital, spending is now physical"
                    className="w-81.75 lg:w-250 font-neue font-medium text-white text-[48px] lg:text-[110px] leading-13.75 lg:leading-[100%]"
                />

                <div className="flex items-center gap-5 pt-17.5">
                    <RequestDemo />

                    <div className="flex items-center gap-2">
                        <figure className="flex items-center gap-2.5">
                            <img src="/icons/appleIcon.svg" alt="apple icon" className=" cursor-not-allowed" />
                            <img src="/icons/playStoreIcon.svg" alt="playstore icon" className=" cursor-not-allowed" />
                        </figure>
                        <hr className="hidden lg:inline w-[0.5px] h-5 border border-white" />
                        <span className="hidden lg:inline font-inter font-normal text-white text-[14px] leading-[100%]">App coming soon!</span>
                    </div>
                </div>
            </div>
        </section>
    )
}