import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


const personalQuestions = [
    {
        q: "What is Zenfipay",
        a:"Zenfipay is a payment platform that lets individuals use stablecoins for everyday, real-world payments. It allows you to pay in stores, send money, and spend stablecoins just like regular money",
    },
    {
        q: "Do I need a Zenfipay account to pay",
        a:"No. You can pay directly from your existing crypto wallet without signing up or creating a ZenfiPay account.",
    },
    {
        q: "Can I pay with stablecoins in physical stores",
        a:"Yes. At checkout, you simply scan a QR code and complete payment using supported stablecoins from your wallet.",
    },
    {
        q: "Which stablecoins are supported",
        a:"ZenfiPay supports major stablecoins like USDT and USDC on selected blockchain networks.",
    },
    {
        q: "How fast are payments",
        a:"Payments are confirmed in seconds, so you can complete checkout without waiting or delays.",
    },
    {
        q: "How do I know my payment is successful",
        a:"After payment, both you and the merchant receive a clear, human-readable confirmation that shows the payment status instantly.",
    },
    {
        q: "Can I earn rewards when I pay",
        a:"Yes. You earn Zen Points whenever you transact, which can be used toward future payments and benefits.",
    },
    {
        q: "Is Zenfipay secure for users",
        a:"Yes. Payments run through secure, verified transaction flows designed to protect your funds and payment data.",
    },
]

const businessQuestions = [
    {
        q: "What type of businesses can use Zenfipay",
        a:"ZenfiPay is built for physical businesses such as retail stores, supermarkets, restaurants, hotels, electronics stores, and service providers.",
    },
    {
        q: "Do I need to change my checkout process",
        a:"No. ZenfiPay fits into your existing checkout flow and requires little to no staff retraining.",
    },
    {
        q: "How do customers pay in my store",
        a:"Customers scan a QR code at checkout and pay using supported stablecoins from their own wallets.",
    },
    {
        q: "Can I manage multiple cashiers or branches",
        a:"Yes. You can manage staff roles, cashiers, and multiple locations from a single dashboard.",
    },
    {
        q: "How do I receive money",
        a:"Merchants receive stable, predictable settlements, with options for instant payouts or scheduled settlements.",
    },
    {
        q: "Are settlements fast",
        a:"Yes. Once a payment is confirmed, settlement happens in seconds.",
    },
    {
        q: "Can I receive payments in USD, GBP, or EUR",
        a:"Yes. ZenfiPay provides virtual foreign accounts that allow you to receive USD, GBP, and EUR.",
    },
    {
        q: "Can I convert between fiat and stablecoins",
        a:"Yes. ZenfiPay supports on-ramp and off-ramp services, as well as fiat-to-stablecoin and stablecoin-to-fiat swaps.",
    },
    {
        q: "Are exchange rates and fees transparent",
        a:"Yes. All exchange rates and fees are shown clearly before you complete any transaction.",
    },
    {
        q: "Is Zenfipay secure for businesses",
        a:"Yes. ZenfiPay uses secure infrastructure, verified payment flows, and clear proof of payment to protect merchants.",
    },
    {
        q: "Does Zenfipay follow regulations",
        a:"ZenfiPay operates within applicable regulatory frameworks in supported regions.",
    },
    {
        q: "Where is Zenfipay available",
        a:"ZenfiPay is launching in selected African markets, with plans to expand globally.",
    },
    {
        q: "How do businesses get started",
        a:"Businesses start with a demo-first onboarding process to understand how ZenfiPay works before going live.",
    },
]
export default function Questions() {


    const listRef = useRef(null)
    const [openIndex, setOpenIndex] = useState(null)

    useEffect(() => {
        const items = listRef.current.querySelectorAll("li")

        gsap.fromTo(items, 
            {
                opacity: 0,
                y: 40
            },
            {
                opacity:1,
                y:0,
                stagger:0.2,
                duration: 0.8,
                ease:"power2.out",
                scrollTrigger: {
                    trigger: listRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            }
        )

    }, [])

    const toggleAnswer = (index, answerElement) => {
        // Close all other answers
        const allAnswers = listRef.current.querySelectorAll('[data-answer]')
        allAnswers.forEach((answer, i) => {
            if (i !== index && answer.dataset.open === "true") {
                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                })
                answer.dataset.open = "false"
            }
        })

        // Toggle the clicked answer
        const isOpen = answerElement.dataset.open === "true"

        gsap.to(answerElement, {
            height: isOpen ? 0 : answerElement.scrollHeight,
            opacity: isOpen ? 0 : 1,
            duration: 0.4,
            ease: "power2.out"
        })

        answerElement.dataset.open = (!isOpen).toString()
        setOpenIndex(isOpen ? null : index)
    }


    return (
        <section className="bg-[#FAFAFA] w-full mx-auto px-4 lg:px-23.5 py-20 lg:py-40 space-y-10 lg:space-y-36">

            {/* PERSONAL QUESTIONS */}
            <div className="">
                <h3 className="font-neue font-medium text-[#014DFF] text-[20px] lg:text-[32px] leading-[100%]">Personal FAQs</h3>

                <div className="lg:w-full space-y-6 lg:space-y-12.5 pt-7 lg:pt-8">
                    {/* LIST */}
                    <ul ref={listRef} className="rounded-3xl overflow-hidden bg-white">
                        {personalQuestions.map((item, index) => (
                            <li key={index} className="py-7 px-6 border-b-[0.5px] border-[#DCE1EC]">
                                <button 
                                    onClick={(e) => toggleAnswer(index, e.currentTarget.nextElementSibling)}
                                    className="w-full flex justify-between items-center text-[20px] leading-[100%] text-left font-inter font-medium"
                                >
                                    <span className="w-3/4">{item.q}?</span>
                                    <img 
                                        src="/icons/plusIcon.svg" 
                                        alt="plus icon" 
                                        className={` ${openIndex === index ? "transform rotate-45 transition-transform" : "transition-transform"}`}
                                        
                                    />
                                </button>
                                {/* ANSWER */}
                                <div 
                                    data-answer
                                    className="w-3/4 font-inter font-medium text-[#636363] text-[14px] overflow-hidden h-0 opacity-0 mt-3" 
                                    data-open="false"
                                >
                                    {item.a}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* BUSINESS QUESTIONS */}
            <div className="">

                <h3 className="font-neue font-medium text-[#014DFF] text-[20px] lg:text-[32px] leading-[100%]">Business FAQs</h3>

                <div className="lg:w-full space-y-6 lg:space-y-12.5 pt-7 lg:pt-8">
                    {/* LIST */}
                    <ul ref={listRef} className="rounded-3xl overflow-hidden bg-white">
                        {personalQuestions.map((item, index) => (
                            <li key={index} className="py-7 px-6 border-b-[0.5px] border-[#DCE1EC]">
                                <button 
                                    onClick={(e) => toggleAnswer(index, e.currentTarget.nextElementSibling)}
                                    className="w-full flex justify-between items-center text-[20px] leading-[100%] text-left font-inter font-medium"
                                >
                                    <span className="w-3/4">{item.q}?</span>
                                    <img 
                                        src="/icons/plusIcon.svg" 
                                        alt="plus icon" 
                                        className={` ${openIndex === index ? "transform rotate-45 transition-transform" : "transition-transform"}`}
                                        
                                    />
                                </button>
                                {/* ANSWER */}
                                <div 
                                    data-answer
                                    className="w-3/4 font-inter font-medium text-[#636363] text-[14px] overflow-hidden h-0 opacity-0 mt-3" 
                                    data-open="false"
                                >
                                    {item.a}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
}