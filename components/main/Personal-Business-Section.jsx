import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    Tabs,
    TabsTrigger,
    TabsList,
    TabsContent
} from "../ui/tabs.jsx"
import RequestDemo from "../CalendlyMorphBtn.jsx"
import { Button } from "../ui/button.jsx"

export default function PersonalBusiness() {

    const [ activeTab, setActiveTab ] = useState("personal")

    const sliderVariants = {
        initial: { x:50, opacity:0 },
        animate: { x:0, opacity:1 },
        exit: { x:-50, opacity: 0}
    }


    return (
        <section className="bg-white h-screen px-4 py-10">

            {/* CONTENT */}
            <div
                className="bg-[#F6F6F6] rounded-[24px] pt-10"

            >
                {/* MY TABS */}
                <div className="flex flex-col justify-center items-center">
                    <div className="relative bg-white w-78.25 h-12 mx-auto rounded-full border border-[#F5F5F5] p-1">

                        {/* SLIDIND INDICATOR */}
                        <div
                            className={`absolute top-1 left-1 z-10 bg-[#20195F] w-[calc(50%-4px)] h-9 border-[0.5px] border-[#101010] rounded-full transition-transform duration-300 ease-out
                            ${activeTab === "business" ? "translate-x-full" : "translate-x-0"}
                            `}
                        />

                        {/* BUTTONS */}
                        <div className="relative z-10 flex h-full">
                            <button
                                className={`w-1/2 h-9.5 relative select-none inline-flex items-center justify-center px-6 rounded-full text-[15px] font-inter font-semibold ${activeTab === "personal" ? " text-white" : "bg-transparent text-[#999999] " }`}
                                onClick={() => setActiveTab("personal")}
                            >
                                Personal
                            </button>
                            <button
                                className={`w-1/2 h-9.5 relative select-none inline-flex items-center justify-center px-6 rounded-full text-[15px] font-inter font-semibold ${activeTab === "business" ? " text-white" : " bg-transparent text-[#999999] " }`}
                                onClick={() => setActiveTab("business")}
                            >
                                Business
                            </button>
                        </div>
                    </div>
                    <AnimatePresence mode="wait" className="">
                        <div className="w-78.25 pt-10.25">
                            {activeTab === "personal" && (
                                <motion.div 
                                    key="personal"
                                    initial={{ x:-8, opacity:0 }}
                                    animate={{ x:0, opacity:1 }}
                                    exit={{ x:-8, opacity:0 }}
                                    transition={{ duration:0.18, ease:"easeOut" }}
                                    className=""
                                >
                                    {/* TEXT */}
                                    <div className="space-y-10">
                                        {/* TEXT */}
                                        <div className="space-y-5">
                                            <h3 className="">Use Stablecoins in everyday life</h3>
                                            <p className="">
                                                Zenfipay let's individuals send, receive, and spend stablecoins easily, whether paying locally or moving money across borders.
                                            </p>
                                        </div>

                                        {/* IMAGES */}
                                        <div className="">
                                            <figure className="flex items-center gap-1">
                                                <img src="/icons/appleIcon.svg" alt="apple store icon" className="w-13" />
                                                <img src="/icons/playStoreIcon.svg" alt="google store icon" className="w-13" />
                                            </figure>
                                            <img src="/images/linktree.png" alt="zenfipay linktree" className="w-10 hidden lg:block" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "business" && (
                                <motion.div 
                                    key="business"
                                    initial={{ x:8, opacity:0 }}
                                    animate={{ x:0, opacity:1 }}
                                    exit={{ x:8, opacity:0 }}
                                    transition={{ duration:0.18, ease:"easeOut" }}
                                    className=""
                                >
                                    Tab for business section
                                </motion.div>
                            )}
                        </div>
                    </AnimatePresence>

                </div>


            </div>

        </section>
    )
}