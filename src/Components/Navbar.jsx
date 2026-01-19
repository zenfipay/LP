import { useState, useEffect } from "react"
import GlassSurface from "./ui/GlassSurface"
import { Button } from "./ui/button"
import {Link} from "react-router-dom"
import Menu from "./ui/Menu"

export default function Navbar() {

    const [ isVisible, setIsVisible ] = useState(true)
    const [ lastScrollY, setLastScrollY ] = useState(0)
    const [ menuOpen, setMenuOpen ] = useState(false)

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
                opacity={0.57}
                padding={10}
                className=" flex justify-start mx-auto p-2 drop-shadow-[#100B40] drop-shadow-md lg:w-10/11" 
            >
                <div className="w-full flex justify-between items-center">
                    <Link to="/">
                        <img src='/icons/logo.svg' alt="zenfipay logo" loading="lazy" className="w-fit" />
                    </Link>
                    
                    {/* LINKS */}
                    <ul className="hidden lg:flex items-center gap-2 text-white">
                        <li>Features</li>
                        <li>
                            <Link to="/frequentlyaskedquestions">
                                FAQs
                            </Link>
                        </li>
                        <li>Blog</li>
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
    )
}