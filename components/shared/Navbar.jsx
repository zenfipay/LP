import { useState, useEffect } from "react"
import GlassSurface from "../GlassSurface"
import { Button } from "../ui/button"

export default function Navbar() {

    const [ isVisible, setIsVisible ] = useState(false)
    const [ lastScrollY, setLastScrollY ] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if( currentScrollY > lastScrollY && currentScrollY > 100 ) {
                setIsVisible(true)
            } else if ( currentScrollY < lastScrollY && currentScrollY < 120) {
                setIsVisible(false)
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
            className={`fixed top-5 z-30 w-full transition-transform duration-500 ease-in-out ${
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
                    <img src='/icons/logo.svg' alt="zenfipay logo" loading="lazy" className="w-fit" />
                    
                    {/* LINKS */}
                    <ul className="hidden lg:flex items-center gap-2 text-white">
                        <li>Features</li>
                        <li>FAQs</li>
                        <li>Blog</li>
                        <li>Contact</li>

                    </ul>

                    {/* BUTTONS */}
                    <div className="">
                        {/* FOR MOBILE */}
                        <div className="block lg:hidden text-white">
                            <span>text</span>
                            <span>text</span>
                        </div>

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