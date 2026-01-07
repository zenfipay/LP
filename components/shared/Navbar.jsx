import { useState, useEffect } from "react"
import GlassSurface from "../GlassSurface"

export default function Navbar() {

    const [ isVisible, setIsVisible ] = useState(false)
    const [ lastScrollY, setLastScrollY ] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if( currentScrollY > lastScrollY && currentScrollY > 100 ) {
                setIsVisible(true)
            } else if ( currentScrollY < lastScrollY && currentScrollY < 130) {
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
            className={`sticky top-5 transition-transform duration-300 ease-in-out ${
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
                className="w-5/6 flex justify-start mx-auto p-4 border-[0.5px] border-red-900" 
            >
                <div className="w-full flex justify-start items-center gap-4">
                    <img src='/icons/logo.svg' alt="zenfipay logo" loading="lazy" className="w-fit" />
                    
                    {/* LINKS */}
                    <ul className="">

                    </ul>

                    {/* BUTTONS */}
                        {/* FOR MOBILE */}
                        <div className="">
                            <span>text</span>
                            <span>text</span>
                        </div>

                        {/* FOR WEB */}
                        <div className="hidden lg:flex items-center">
                            <button
                                className="bg-[#2B2B2B] w-23 h-11 p-6 rounded-full font-neue text-[15px]"
                            >
                                Sign in
                            </button>
                            <button
                                className="bg-[#014DFF] p-6 rounded-full"
                            >
                                Get started
                            </button>
                        </div>
                </div>
            </GlassSurface>
        </nav>
    )
}