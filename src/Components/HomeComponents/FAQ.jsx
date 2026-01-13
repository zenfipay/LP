import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom"

const QuestionsAndAnswers = [
    {
        q: "What is Zenfipay",
        a: "ZenfiPay is a payment platform that lets individuals use stablecoins for everyday, real-world payments. It allows you to pay in stores, send money, and spend stablecoins just like regular money."
    },
    {
        q: "Do I need a Zenfipay account to pay",
        a:"No. You can pay directly from your existing crypto wallet without signing up or creating a ZenfiPay account.",
    },
    {
        q: "Can I pay with stablecoins at physical stores",
        a:"Yes. At checkout, you simply scan a QR code and complete payment using supported stablecoins from your wallet.",
    },
    {
        q: "Which stablecoins are supported",
        a:"ZenfiPay supports major stablecoins like USDT and USDC on selected blockchain networks.",
    },
    {
        q: "What type of businesses can support Zenfipay",
        a:"ZenfiPay is built for physical businesses such as retail stores, supermarkets, restaurants, hotels, electronics stores, and service providers..",
    },
    {
        q: "How do customers pay in my store",
        a:"Customers scan a QR code at checkout and pay using supported stablecoins from their own wallets.",
    },
]

gsap.registerPlugin(ScrollTrigger)

export default function FrequentlyAskedQuestions() {

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
        <section className="bg-[#FAFAFA] w-full min-h-screen p-4 lg:p-20 lg:flex lg:justify-between space-y-">

            {/* HEADER */}
            <div className="lg:w-[543px] space-y-2 lg:space-y-5">
                <h4 className="lg:w-91.75 font-neue font-medium text-[24px] lg:text-[36px] leading-[100%]">
                    Frequently asked questions
                </h4>
                <p className="lg:w-73.5 font-inter text-[#636363] text-[16px] lg:text-[16px] leading-[100%] tracking-[0.5px]">
                    Got a question about Zenfipay? we've got you covered.
                </p>
            </div>


            <div className="lg:w-3/6 space-y-6 lg:space-y-12.5 pt-7 lg:pt-0">
                {/* LIST */}
                <ul ref={listRef} className="rounded-3xl overflow-hidden bg-white">
                    {QuestionsAndAnswers.map((item, index) => (
                        <li key={index} className="py-7 px-6 border-b-[0.5px] border-[#DCE1EC]">
                            <button 
                                onClick={(e) => toggleAnswer(index, e.currentTarget.nextElementSibling)}
                                className="w-full flex justify-between items-center text-[20px] leading-[100%] text-left font-inter font-medium"
                            >
                                <span className="w-3/4">{item.q}</span>
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

                <Link to="/frequentlyaskedquestions" className="">
                    <span className="font-neue font-medium text-[#014DFF] text-[20px] lg:text-[32px] leading-[100%]">See more FAQs &rarr;</span>
                </Link>
            </div>

        </section>
    )
}