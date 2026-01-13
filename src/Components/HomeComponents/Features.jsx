import { useRef, useEffect } from "react";
import SplitTextHeader from "../ui/SplitTextHeader";
import SplitParagraph from "../ui/SplitTextParagraph";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TypewriterText from "../ui/Typewriter";
import { Button } from "../ui/button";
import PaymentAnimation from "../ui/PaymentAnimation";
import { Scroll } from "lucide-react";

gsap.registerPlugin(ScrollTrigger)

export default function Features() {

    const imageRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                {y: -200 },
                {
                    y: 0,
                    ease: "easeIn",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "+=500",
                        scrub: 2,
                        // markers: true
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className="bg-white w-full mx-auto px-4 lg:px-23.5 py-20 lg:py-40 space-y-10">

            <SplitTextHeader
                text="Built for real-world businesses."
                className="w-69.25 lg:w-73.5 font-neue font-medium text-[24px] lg:text-[36px] leading-[100%]"
            />

            {/* MOBILE */}
            <div className="flex flex-col gap-5 lg:flex-row">

                {/* FIRST */}
                <div className="bg-[#101010] w-full lg:w-5/12 lg:h-120 rounded-3xl overflow-hidden">
                    {/* TEXT */}
                    <div className="w-71 lg:w-84.5 flex flex-col gap-5 mx-auto pt-10.25 lg:mt-11.25 text-white">
                        <SplitTextHeader
                            text="No changes to your workflow"
                            className="w-56.5 lg:w-62.25 font-inter font-medium text-[20px] lg:text-[24px] leading-[100%]"
                        />
                        <SplitParagraph
                            text="Zenfipay fits into your existing checkout process, so you dont't need to change how your business operates."
                            className="w-full lg:w-83.75 text-[#999999] text-[14px] leading-[100%] tracking-[0.5px]"
                        />
                    </div>

                    {/* REGSTER */}
                    <motion.figure 
                        className="pt-17"
                    >
                        <img src="/icons/zregister.svg" alt="zenfipay register" className="relative top-17 right-26 scale-150" />
                    </motion.figure>
                </div>

                {/* SECOND */}
                <div className="w-full lg:w-4/12 rounded-3xl overflow-hidden space-y-5">
                    {/* TYPEWRITER */}
                    <div className="relative h-34.25 lg:h-80.75 rounded-3xl overflow-hidden">
                        <TypewriterText 
                            texts={["supermarkets", "retail stores", "restaurants", "hotels", "auto dealers", "and others"]}
                        />
                        <figure className="relative lg:-bottom-40">
                            <img src="/icons/dotsBlue.svg" alt="dots" className="scale-200 lg:scale-250 origin-center" />
                        </figure>
                    </div>

                    {/* REQUEST DEMO BUTTON CONTAINER */}
                    <div className="hidden lg:flex bg-[#ECFFD9] h-34.25 rounded-3xl justify-center items-center">
                        <Button className="text-[#014DFF]">Request a demo</Button>
                    </div>
                </div>

                {/* THIRD */}
                <div ref={sectionRef} className="relative bg-[#FFF0E0] w-full lg:w-3/12 h-114.25 lg:h-120 flex flex-col justify-center items-center rounded-3xl overflow-hidden">

                    <img 
                        ref={imageRef} 
                        src="/images/iPhoneCanvas.png" 
                        alt="iphone canvas displaying zenfipay successful payment screen" 
                        className="absolute bottom-56.5 w-[85%] mx-auto will-change-transform" 
                        
                    />
                    {/* <PaymentAnimation /> */}
                    <div 
                        className="w-full flex flex-col justify-center items-center"
                    >

                        {/* TEXT */}
                        <div 
                            className="relative top-40 w-4/6  space-y-3"
                        >
                            <SplitTextHeader 
                                text="Get Paid in Seconds"
                                className="text-[20px] leading-[100%] tracking-normal"
                            />
                            <SplitParagraph 
                                text="Payments settle in less than five seconds, giving you fast access to your funds."
                                className=" text-[#7D7D7D] text-[14px] leading-[100%] tracking-[0.5px]"
                            />
                                
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}