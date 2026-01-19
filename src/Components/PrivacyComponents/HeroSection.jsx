import { motion } from "framer-motion";
import SplitTextHeader from "../ui/SplitTextHeader";
import SplitParagraph from "../ui/SplitTextParagraph";
import OtherHeroGradient from "../ui/OtherHeroGradient";
import DancingBtn from "../ui/DancingBtn";


export default function PrivacyHeroSection() {

    return (
        <section className="relative h-142 lg:max-h-screen bg-white overflow-hidden px-4">

        {/* GRADIENT */}
        <OtherHeroGradient />

        {/* CONTENT */}
        <div className="absolute top-20 z-10 w-screen flex flex-col lg:flex-row lg:justify-between lg:px-18">

            {/* LEFT SIDE */}
            <div className="relative z-10 top-30 space-y-11">

                {/* TEXT */}
                <div className="relative space-y-5">
                    <SplitTextHeader 
                        className="w-90.25 lg:w-248.25 lg:h-fit  font-neue font-medium text-[48px] lg:text-[110px] leading-11.25 lg:leading-25"
                        text="Privacy policy."
                    />
                    <SplitParagraph
                        className="lg:w-123.5 font-inter text-[13px] text-[#636363] leading-[100%] tracking-[0.5px]"
                        text="Last Updated: 15th January, 2026"
                    />
                </div>

                {/* BUTTONS */}
                <DancingBtn />
            </div>

            {/* RIGHT SIDE */}
            <motion.img 
                initial={{ y:-100, opacity:0 }}
                animate={{ y:0, opacity:1 }}
                transition={{ duration:0.7, ease:"easeIn" }}
                src="/icons/otherCoin.svg" 
                alt="zenfipay coin icon" 
                className=" scale-100 lg:scale-200 absolute top-70 lg:top-50 right-10 lg:right-100"

            />
        </div>

        </section>
    )
}