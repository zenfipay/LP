import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const currentYear = new Date().getFullYear()


const linkInfo = [
    {
        src: "/icons/linkedIn.svg",
        title: "LinkedIn",
        link: "https://www.linkedin.com/company/zenfipay/"
    },
    {
        src: "/icons/twitter.svg",
        title: "Twitter",
        link: "https://twitter.com/Zenfipay"
    },
    {
        src: "/icons/instagram.svg",
        title: "Instagram",
        link: "https://www.instagram.com/Zenfipay/"
    },
    {
        src: "/icons/facebook.svg",
        title: "Facebook",
        link: "https://web.facebook.com/zenfipay"
    },
]
export default function Footer() {

    const handleBackToTop = () => {
        window.scrollTo({
            top:0,
            behaviour: "smooth",
        })
    }

    return (
        <footer className="relative bg-[#101010] lg:max-w-screen h-124.75 lg:h-screen overflow-hidden">

            <div className="w-90.25 mx-auto space-y-11 pt-20 lg:pt-30">

                {/* IMAGE LINKS */}
                <ul className="flex gap-7.5 justify-center items-center">
                    {linkInfo.map((info) => (
                        <li key={info.title} className="bg-[#2B2B2B] size-12.5 flex justify-center items-center rounded-full">
                            <a href={info.link} target="_blank">
                                <img
                                    src={info.src}
                                    alt={info.title}
                                    className=""
                                />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* TEXT LINKS */}
                <div className="flex justify-center items-center gap-8">
                    <Link to="/terms" target="_blank">
                        <span className="font-inter font-normal text-white text-[14px] leading-[100%] tracking-[0.5px]">
                            Terms of service
                        </span>
                    </Link>
                    <Link to="/privacy" target="_blank">
                        <span className="font-inter font-normal text-white text-[14px] leading-[100%] tracking-[0.5px]">
                            Privacy policy
                        </span>
                    </Link>
                </div>
            </div>

            {/* STICKY TOP */}
            <motion.div 
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                transition={{ duration:0.7, ease:"easeIn" }}
                className="absolute z-20 bottom-7.5 lg:bottom-10 bg-[#101010] w-11/12 left-1/2 -translate-x-1/2  flex items-center justify-between py-2 px-3.5 rounded-2xl"
            >
                <p className="text-[#999999] text-[10px] lg:text-[13px] leading-[100%] font-inter font-normal">
                    Copyright &copy; {currentYear} Zenstack Technology Ltd.
                </p>

                <button 
                    onClick={handleBackToTop}
                    className="bg-[#99EC64] size-6 rounded-lg p-1 cursor-pointer"
                >
                    <img src="/icons/tarr.svg" alt="go back up" />
                </button>
            </motion.div>


            {/* ZENFIPAY */}
            <figure className="">
                <img src="/icons/Zenfipay.svg" alt="Zenfipay" className="absolute bottom-1 lg:-bottom-40 z-10 w-full mx-auto" />
            </figure>

        </footer>
    )
}