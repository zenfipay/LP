import SplitText from "../ui/SplitTextHeader";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import HeroGradient from "../ui/HeroGradient";
import RequestDemo from "../ui/CalendlyMorphBtn";
import SplitParagraph from "../ui/SplitTextParagraph";

export default function HeroSection() {

    return (
        <section className="relative max-h-screen bg-[#101010] overflow-hidden px-4">
            {/* GRADIENT */}
            <HeroGradient />

            {/* CONTENT */}
            <div className="absolute top-20 w-screen flex flex-col lg:flex-row lg:justify-between lg:px-18">
                
                {/* LEFT SIDE */}
                <div className="relative z-10 top-10 space-y-11">

                    {/* TEXT */}
                    <div className=" space-y-5">
                        <SplitText 
                            className="w-90.75 md:w-178 lg:h-[300px] text-white font-neue font-medium text-[48px] md:text-[90px] lg:text-[110px] leading-11.25 md:leading-17 lg:leading-25"
                            text="Stablecoin payments made simple."
                        />
                        <SplitParagraph
                            className="w-5/6 lg:w-123.5 font-inter text-[13px] md:text-[15px] text-[#B0B7C7] leading-[100%] tracking-[0.5px]"
                            text="Bringing stablecoin payment into everyday purchases. Accept, send, & settle stablecoin payments instantly"
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-row items-center gap-6">
                    
                        <RequestDemo />

                        

                        {/* APP ICONS AND DOWNLAOD TEXT */}
                        <div className="hidden lg:flex flex-row items-center gap-2">
                            <img src="/icons/appleIcon.svg" alt="apple icon" className="cursor-not-allowed" />
                            <img src="/icons/playStoreIcon.svg" alt="playStore icon" className="cursor-not-allowed" />
                            <hr className="bg-[#3F3F3F] w-5 border border-[#3F3F3F] transform -rotate-90" />
                            <span className="font-inter text-[15px] leading-[100%] text-white">App coming soon.</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative ">
                
                    <img src="/icons/zcoin.svg" alt="zenfipay coin icon" className="hidden lg:block absolute top-15" />

                    {/* MOBILE VIEW */}
                    <figure
                        className="pt-40 lg:pt-7"
                    >
                        <motion.img 
                            initial={{ opacity:0.5, y:40 }}
                            animate={{ opacity:1, y:0 }}
                            transition={{ duration:0.7, ease:"easeIn" }}
                            src="/icons/zmascot.svg" 
                            alt="zenfipay mascot" 
                            className="scale-150 origin-center lg:scale-100" 
                            fetchPriority="high"
                            decoding="async"
                        />
                    </figure>

                </div>
            </div>
            
        </section>
    )
}
