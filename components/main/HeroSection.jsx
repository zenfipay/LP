import SplitTextHeader from "../SplitText";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import HeroGradient from "../HeroGradient";
import RequestDemo from "../CalendlyMorphBtn";

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
                    <div className="space-y-5">
                        <SplitTextHeader />
                        <motion.p
                            initial={{ opacity:0, x:-20 }}
                            animate={{ opacity:1, x:0 }}
                            transition={{ duration:1, ease:"easeIn", delay:0.3 }}
                            className="font-inter text-[#B0B7C7] text-[13px] lg:text-[15px] leading-[100%] tracking-[0.5]"
                        >
                            Bringing stablecoin payment into everyday purchases. Accept, send, & settle stablecoin payments instantly
                        </motion.p>
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

                    <motion.img 
                        initial={{ opacity:0, y:-200 }}
                        animate={{ opacity:1, y:0 }}
                        transition={{ duration:1, ease:"easeIn" }}
                        src="/icons/zcoin.svg" 
                        alt=" zenfipay coin icon" 
                        className="hidden lg:block absolute top-10 w-24 transition animate-bounce " 
                        
                    />

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
