import { useState, useEffect } from "react"
import GlassSurface from "./ui/GlassSurface"
import { Button } from "./ui/button"
import {Link} from "react-router-dom"
import Menu from "./ui/Menu"
import { AnimatePresence, motion } from "framer-motion"

const features = [
  {
    title: "Stablecoin payments",
    sub: "Send, receive, and spend stablecoins with ease."
  },
  {
    title: "In-store QR payments",
    sub: "Accept payments instantly with simple QR codes."
  },
  {
    title: "Merchant settlement",
    sub: "Recive stable, predictable payouts in seconds."
  },
  {
    title: "On & off-ramp",
    sub: "Convert between fiat an stablecoins smoothly."
  },
  {
    title: "Foreign virtual accounts",
    sub: "Receive USD, GHS, etc payments locally."
  },
]

export default function Navbar() {

    const [ isVisible, setIsVisible ] = useState(true)
    const [ lastScrollY, setLastScrollY ] = useState(0)
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ featuresHover, setFeaturesHover ] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if(currentScrollY > lastScrollY) {
                setIsVisible(false)
            } else if(currentScrollY < lastScrollY) {
                setIsVisible(true)
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY]);


    return (
        <>
            <nav 
                className={`fixed top-5 z-20 w-full transition-transform duration-500 ease-in-out ${
                    isVisible ? " translate-y-0" : "-translate-y-24" }`}
            >
                <GlassSurface
                    width
                    height={60}
                    borderRadius={24}
                    displace={15}
                    distortionScale={-150}
                    redOffset={5}
                    greenOffset={15}
                    blueOffset={25}
                    brightness={60}
                    opacity={0.3}
                    padding={10}
                    className=" flex justify-start mx-auto drop-shadow-[#100B40]/5 drop-shadow-md lg:w-10/11" 
                >
                    <div className="relative z-20 w-full flex px-2 justify-between items-center">
                        <Link to="/">
                            <img src='/icons/logo.svg' alt="zenfipay logo" loading="lazy" className="w-fit" />
                        </Link>
                        
                        {/* LINKS */}
                        <ul className="relative z-20 hidden lg:flex items-center gap-8 text-white text-[15px]">
                            <li 
                                className="relative"
                                onMouseEnter={() => setFeaturesHover(true)}
                                onMouseLeave={() => setFeaturesHover(false)}
                            >
                                <button className="cursor-pointer">
                                    Features
                                </button>
                            </li>
                            <li>
                                <Link to="/frequentlyaskedquestions">
                                    FAQs
                                </Link>
                            </li>
                            <li className="cursor-not-allowed">Blog</li>
                            <li>
                                <a href="mailto:support@zenfipay.com" aria-label="Send an email to ZenFiPay support" className="">
                                    Contact
                                </a>
                            </li>

                        </ul>

                        {/* BUTTONS */}
                        <div className="">
                            {/* FOR MOBILE */}
                            <div className="block lg:hidden text-white">
                                <button
                                    className=""
                                    onClick={() => setMenuOpen(true)}
                                >
                                    <img src="/icons/menu.svg" alt="Menu icon" />
                                </button>
                                
                            </div>

                            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

                            {/* FOR WEB */}
                            <div className="hidden lg:flex items-center gap-4">
                                <Button
                                    className="bg-[#2B2B2B] text-white"
                                    size="lg"
                                >
                                    Sign in
                                </Button>
                                <Button
                                    className="bg-[#014DFF] text-white"
                                    size="lg"
                                >
                                    Get started
                                </Button>
                            </div>
                        </div>
                    </div>
                </GlassSurface>
            </nav>

            {/* DROPDOWN */}
            <AnimatePresence>
                {featuresHover && (
                    <motion.div
                        initial={{ scaleX:0 }}
                        animate={{ scaleX:1 }}
                        exit={{ scaleX:0 }}
                        transition={{ duration:0.3, ease:"easeInOut" }}
                        onMouseEnter={() => setFeaturesHover(true)}
                        onMouseLeave={() => setFeaturesHover(false)}
                        className="fixed top-22.5 left-1/2 -translate-x-1/2 z-30 origin-left"
                    >
                        <div className="bg-white flex items-center gap-4 p-4 border-[0.5px] border-[#100B40]/20 rounded-2xl min-w-75">
                            <div className="">
                                <img src="/icons/coinDrop.svg" alt="coin drop image" />
                            </div>
                            <div className="flex flex-col gap-4">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex flex-col gap-1 p-3 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <h6 className="text-[#20195F] text-[14px] leading-tight font-medium">
                                            {feature.title}
                                        </h6>
                                        <p className="font-normal text-[11px] text-[#636363] leading-tight">
                                            {feature.sub}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}