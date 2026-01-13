import { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitTextHeader from "../ui/SplitTextHeader";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger)


export default function Everything() {

    const sectionRef = useRef(null)
    const leftTextRef = useRef(null)
    const rightTextRef = useRef(null)
    const pinnedLayerRef = useRef(null)
    const leftSideRef = useRef(null)
    const rightSideRef = useRef(null)

    




    return (
        <section ref={sectionRef} className="relative bg-white min-h-screen py-20 p-4 lg:px-20 space-y-6 lg:space-y-17.5">

            <SplitTextHeader
                text="Everything you need to move value, anywhere,"
                className="w-76.5 lg:w-123 text-[24px] lg:text-[36px] font-neue font-medium leading-[100%]"
            />

            <div className="relative w-full min-h-screen flex flex-col lg:flex-row gap-5">

                {/* LEFT SIDE */}
                <div ref={leftSideRef} className="w-full lg:w-4/12 space-y-5">

                    {/* LOCATION */}
                    <div className="h-[264.5px] bg-[#FAFAFA] pl-11.5 pr-17 py-8 space-y-15 border border-[#F6F6F6] rounded-3xl">
                        <figure className="">
                            <img src="/icons/tower.svg" alt="tower" />
                        </figure>

                        {/* TEXT */}
                        <div className="w-72.75 lg:w-62.25 flex flex-col gap-3">
                            <h5 className="text-[20px] leading-[100%]">Multi-location support</h5>
                            <p className="font-inter text-[#7D7D7D] text-[14px] leading-[100%]">
                                Manage payments across multiple stores or branches from a single merchant account.
                            </p>
                        </div>
                    </div>

                    {/* GLOBAL */}
                    <div className="h-[264.5px] bg-[#FAFAFA] pl-11.5 pr-17 py-8 space-y-15 border border-[#F6F6F6] rounded-3xl">
                        <figure className="">
                            <img src="/icons/coin.svg" alt="tower" />
                        </figure>

                        {/* TEXT */}
                        <div className="w-72.75 lg:w-62.25 flex flex-col gap-3">
                            <h5 className="text-[20px] leading-[100%]">Global accounts & currency exchange</h5>
                            <p className="font-inter text-[#7D7D7D] text-[14px] leading-[100%]">
                                Receive USD, GHS, and more through virtual accounts, and swap between fiat and stablecoins at clear rates.
                            </p>
                        </div>
                    </div>
                </div>


                {/* CENTER ANIMATION + ANIMATION REF */}
                <div ref={pinnedLayerRef} className="relative bg-[#20195F] w-full lg:w-4/12 h-137.25 rounded-3xl space-y-5 overflow-hidden">

                    
                    <div className="relative ">
                        <span ref={leftTextRef} className="absolute left-25 font-neue font-medium text-[#6008B9] text-[196.27px] leading-46">USDT</span>
                        <span ref={rightTextRef} className="absolute top-40 right-25 font-neue font-medium text-[#6008B9] text-[196.27px] leading-46">cNGN</span>
                    </div>

                    <img
                        src="/images/board.svg"
                        className="absolute scale-150 -bottom-20 right-11"
                    />

                    <Button className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#014DFF]">Request a demo</Button>

                </div>


                {/* RIGHT SIDE */}
                <div ref={rightSideRef} className=" lg:w-4/12 space-y-5">

                    {/* PROOF */}
                    <div className="h-[264.5px] bg-[#FAFAFA] pl-11.5 pr-17 py-8 space-y-15 border border-[#F6F6F6] rounded-3xl">
                        <figure className="">
                            <img src="/icons/receipt.svg" alt="tower" />
                        </figure>

                        {/* TEXT */}
                        <div className="w-72.75 lg:w-62.25 flex flex-col gap-3">
                            <h5 className="text-[20px] leading-[100%]">Clear proof of payment</h5>
                            <p className="font-inter text-[#7D7D7D] text-[14px] leading-[100%]">
                                Each transaction generates a simple confirmation that both staff & customers can instantly understand.
                            </p>
                        </div>
                    </div>

                    {/* SECURITY */}
                    <div className="h-[264.5px] bg-[#FAFAFA] pl-11.5 pr-17 py-8 space-y-15 border border-[#F6F6F6] rounded-3xl">
                        <figure className="">
                            <img src="/icons/padlock.svg" alt="tower" />
                        </figure>

                        {/* TEXT */}
                        <div className="w-72.75 lg:w-62.25 flex flex-col gap-3">
                            <h5 className="text-[20px] leading-[100%]">Payment Security</h5>
                            <p className="font-inter text-[#7D7D7D] text-[14px] leading-[100%]">
                                All payments are portected with modern security stadards and verified transaction flows.
                            </p>
                        </div>
                    </div>
                </div>


            </div>

            
        </section>



    )
}


