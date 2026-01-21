import { useState, useEffect, useRef, useCallback, Suspense, lazy } from "react"
import GlassSurface from "./ui/GlassSurface"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
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
    sub: "Receive stable, predictable payouts in seconds."
  },
  {
    title: "On & off-ramp",
    sub: "Convert between fiat and stablecoins smoothly."
  },
  {
    title: "Foreign virtual accounts",
    sub: "Receive USD, GHS, etc payments locally."
  },
]

// Lazy load the Menu component to prevent blocking main thread on initial load
const Menu = lazy(() => import('./ui/Menu'))

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuresHover, setFeaturesHover] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const menuButtonRef = useRef(null)

  // Mark initial load as complete after paint
  useEffect(() => {
    const handleInitialLoad = () => {
      setIsInitialLoad(false)
    }
    
    // Use requestAnimationFrame to ensure paint is complete
    const rafId = requestAnimationFrame(() => {
      // Small delay to ensure all critical resources are loaded
      setTimeout(handleInitialLoad, 300)
    })
    
    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Only hide navbar when scrolling down past 100px
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false)
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true)
          }
          
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        
        ticking.current = true
      }
    }

    // Use passive: true for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Optimized menu handlers with initial load consideration
  const handleMenuOpen = useCallback(() => {
    if (isInitialLoad) {
      // On initial load, defer to next animation frame to avoid paint competition
      requestAnimationFrame(() => {
        setMenuOpen(true)
      })
    } else {
      setMenuOpen(true)
    }
  }, [isInitialLoad])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // Prevent body scroll when menu is open with optimization
  useEffect(() => {
    if (menuOpen) {
      // Batch style changes
      requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px'
      })
    } else {
      requestAnimationFrame(() => {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
        document.body.style.paddingRight = ''
      })
    }
    
    return () => {
      requestAnimationFrame(() => {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
        document.body.style.paddingRight = ''
      })
    }
  }, [menuOpen])

  // Preload critical resources for better menu performance
  useEffect(() => {
    // Preload menu icon
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
    }
    
    preloadImage('/icons/menu.svg')
    
    // Preload any other critical menu resources
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Preload menu backdrop image if any
      })
    }
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-5 z-20 w-full transition-transform duration-500 ease-in-out will-change-transform transform-gpu ${
          isVisible ? "translate-y-0" : "-translate-y-24"
        }`}
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
          className="flex justify-start mx-auto drop-shadow-[#100B40]/5 drop-shadow-md lg:w-10/11" 
        >
          <div className="relative z-20 w-full flex px-2 justify-between items-center">
            <Link to="/" aria-label="Zenfipay homepage">
              <img 
                src='/icons/logo.svg' 
                alt="zenfipay logo" 
                loading="lazy" 
                className="w-fit" 
                width={120}
                height={40}
                decoding="async"
              />
            </Link>
            
            {/* LINKS */}
            <ul className="relative z-20 hidden lg:flex items-center gap-8 text-white text-[15px]">
              <li 
                className="relative"
                onMouseEnter={() => setFeaturesHover(true)}
                onMouseLeave={() => setFeaturesHover(false)}
              >
                <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1">
                  Features
                </button>
              </li>
              <li>
                <Link 
                  to="/frequentlyaskedquestions"
                  className="hover:text-blue-200 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li className="cursor-not-allowed text-gray-400">Blog</li>
              <li>
                <a 
                  href="mailto:support@zenfipay.com" 
                  aria-label="Send an email to ZenFiPay support"
                  className="hover:text-blue-200 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* BUTTONS */}
            <div className="flex items-center">
              {/* FOR MOBILE */}
              <div className="block lg:hidden">
                <button
                  ref={menuButtonRef}
                  onClick={handleMenuOpen}
                  className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-all active:scale-95 transform-gpu"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                >
                  <img 
                    src="/icons/menu.svg" 
                    alt="Menu icon" 
                    width={24}
                    height={24}
                    loading="eager"
                    decoding="async"
                    className="transform-gpu"
                  />
                </button>
              </div>

              {/* Menu Component - Lazy loaded with Suspense */}
              <Suspense fallback={null}>
                <Menu open={menuOpen} onClose={handleMenuClose} />
              </Suspense>

              {/* FOR WEB */}
              <div className="hidden lg:flex items-center gap-4 ml-4">
                <Button
                  className="bg-[#2B2B2B] text-white hover:bg-[#3B3B3B] transition-colors transform-gpu"
                  size="lg"
                >
                  Sign in
                </Button>
                <Button
                  className="bg-[#014DFF] text-white hover:bg-[#0155FF] transition-colors transform-gpu"
                  size="lg"
                  onClick={() => {window.open("https://zenfipay.zohobookings.com/#/4757755000000049052", "_blank")}}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={() => setFeaturesHover(true)}
            onMouseLeave={() => setFeaturesHover(false)}
            className="fixed top-22.5 left-1/2 -translate-x-1/2 z-30 transform-gpu will-change-transform"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="bg-white flex items-center gap-4 p-4 border-[0.5px] border-[#100B40]/20 rounded-2xl min-w-75 shadow-xl backdrop-blur-0">
              <div className="flex-shrink-0">
                <img 
                  src="/icons/coinDrop.svg" 
                  alt="coin drop image" 
                  width={60}
                  height={60}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.1 }}
                    className="flex flex-col gap-1 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 cursor-pointer transform-gpu"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <h6 className="text-[#20195F] text-[14px] leading-tight font-semibold">
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
