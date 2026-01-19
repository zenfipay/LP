import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import SplitTextHeader from "../ui/SplitTextHeader"
import SplitParagraph from "../ui/SplitTextParagraph"
import RequestDemo from "../ui/CalendlyMorphBtn"

export default function PersonalBusiness() {

    const [ activeTab, setActiveTab ] = useState("personal")


    return (
        <section className="bg-white h-screen px-4 lg:px-23.5 py-10 overflow-hidden">

            {/* CONTENT */}
            <div
                className=" w-full max-h-fit bg-[#F6F6F6] flex flex-row rounded-[24px] pt-10 "

            >
                {/* MY TABS */}
                <div className="relative w-full lg:max-h-162.75 flex flex-col px-10 lg:px-22.5 overflow-hidden">
                    <div className="relative bg-white w-full lg:w-fit h-12 mx-auto lg:mx-0  rounded-full border border-[#F5F5F5] p-1">

                        {/* SLIDIND INDICATOR */}
                        <div
                            className={`absolute top-1 left-1 z-10 bg-[#20195F] w-[calc(50%-4px)] h-9 border-[0.5px] border-[#101010] rounded-full transition-transform duration-300 ease-out cursor-pointer
                            ${activeTab === "business" ? "translate-x-full" : "translate-x-0"}
                            `}
                        />

                        {/* BUTTONS */}
                        <div className="relative z-10 flex h-full">
                            <button
                                className={`w-1/2 h-9.5 relative select-none inline-flex items-center justify-center px-6 rounded-full text-[15px] font-inter font-semibold cursor-pointer ${activeTab === "personal" ? " text-white" : "bg-transparent text-[#999999] " }`}
                                onClick={() => setActiveTab("personal")}
                            >
                                Personal
                            </button>
                            <button
                                className={`w-1/2 h-9.5 relative select-none inline-flex items-center justify-center px-6 rounded-full text-[15px] font-inter font-semibold cursor-pointer ${activeTab === "business" ? " text-white" : " bg-transparent text-[#999999] " }`}
                                onClick={() => setActiveTab("business")}
                            >
                                Business
                            </button>
                        </div>
                    </div>
                    <AnimatePresence mode="wait" className="">
                        <div className="">
                            {activeTab === "personal" && (
                                <motion.div 
                                    key="personal"
                                    initial={{ x:-8, opacity:0 }}
                                    animate={{ x:0, opacity:1 }}
                                    exit={{ x:-8, opacity:0 }}
                                    transition={{ duration:0.18, ease:"easeOut" }}
                                    className="max-h-125 lg:min-h-256 lg:flex "
                                >
                                    {/* TEXT */}
                                    <div className="space-y-10 pt-10 lg:pt-21.25">
                                        {/* TEXT */}
                                        <div className=" space-y-5">
                                            <SplitTextHeader
                                                className="w-56.5 lg:w-102 font-neue font-medium text-[#101010] text-[28px] lg:text-[48px] leading-[100%] tracking-0"
                                                text="Use Stablecoins in everyday life"
                                            />
                                            <SplitParagraph 
                                                className="w-full lg:w-102 font-inter font-normal text-[13px] leading-[100%] text-[#7D7D7D]"
                                                text="Zenfipay lets individuals send, receive, and spend stablecoins easily, whether paying locally or moving money across borders."
                                            />
                                        </div>

                                        <RequestDemo />
                                    </div>

                                    {/* BIG BOY */}
                                    <motion.figure 
                                        initial={{ y:40 }}
                                        whileInView={{ y:0 }}
                                        transition={{ duration:0.5, ease:"easeIn" }}
                                        viewport={{ once: true, margin:"-64px" }}
                                        className="lg:pt-21.25"
                                    >
                                        <img src="/images/iPhone.png" alt="iphone zenfipay app mockup" className="relative top-25 lg:top-49 right-75 lg:right-100 scale-250 lg:scale-125 origin-left" />
                                    </motion.figure>
                                </motion.div>
                            )}

                            {activeTab === "business" && (
                                <motion.div 
                                    key="business"
                                    initial={{ x:8, opacity:0 }}
                                    animate={{ x:0, opacity:1 }}
                                    exit={{ x:8, opacity:0 }}
                                    transition={{ duration:0.18, ease:"easeOut" }}
                                    className="lg:flex "
                                >
                                    {/* TEXT */}
                                    <div className="space-y-10 pt-10 lg:pt-21.25">
                                        {/* TEXT */}
                                        <div className=" space-y-5">
                                            <SplitTextHeader
                                                className="w-56.5 lg:w-102 font-neue font-medium text-[#101010] text-[28px] lg:text-[48px] leading-[100%] tracking-0"
                                                text="Accept Stablecoin payments in-store"
                                            />
                                            <SplitParagraph 
                                                className="w-full lg:w-102 font-inter font-normal text-[13px] leading-[100%] text-[#7D7D7D]"
                                                text="Zenfipay helps physical businesses accept stablecoin payments from customers quickly and reliably"
                                            />
                                        </div>

                                        <RequestDemo />
                                    </div>

                                    {/* BIG BOY */}
                                    <motion.figure 
                                        initial={{ y:40 }}
                                        whileInView={{ y:0 }}
                                        transition={{ duration:0.5, ease:"easeIn" }}
                                        viewport={{ once: true, margin:"-64px" }}
                                        className="lg:pt-21.25"
                                    >
                                        <img src="/images/mac.png" alt="iphone zenfipay app mockup" className="relative top-10 lg:left-46 scale-125 origin-left" />
                                    </motion.figure>
                                </motion.div>
                            )}
                        </div>
                    </AnimatePresence>

                </div>


            </div>

        </section>
    )
}