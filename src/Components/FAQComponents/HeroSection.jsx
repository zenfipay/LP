import { motion } from "framer-motion";
import SplitTextHeader from "../ui/SplitTextHeader";
import SplitParagraph from "../ui/SplitTextParagraph";
import OtherHeroGradient from "../ui/OtherHeroGradient";


export default function FAQHeroSection() {

    return (
        <section className="relative max-h-screen bg-white overflow-hidden px-4">

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
                        text="Frequently asked questions."
                    />
                    <SplitParagraph
                        className="lg:w-123.5 font-inter text-[13px] text-[#636363] leading-[100%] tracking-[0.5px]"
                        text="Find answers to common questions about payments, supported stablecoins, security, and how Zenfipay works for both customers and merchants."
                    />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-row items-center gap-6">
                
                    Button sha
                </div>
            </div>

            {/* RIGHT SIDE */}
                <motion.img 
                    initial={{ y:-100, opacity:0 }}
                    animate={{ y:0, opacity:1 }}
                    transition={{ duration:0.7, ease:"easeIn" }}
                    src="/icons/leftCoin.svg" 
                    alt="zenfipay coin icon" 
                    className=" scale-300 absolute top-120 right-100"

                />
        </div>

        </section>
    )
}