import { useState, useEffect, useRef, useCallback, Suspense, lazy, useMemo } from "react"
import GlassSurface from "./ui/GlassSurface"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

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
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const menuButtonRef = useRef(null)
  const isOpeningMenu = useRef(false)
  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  const scrollTimeout = useRef(null)

  // SIMPLIFIED: Remove page readiness detection for better performance
  useEffect(() => {
    // Cleanup function
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  // HIGHLY OPTIMIZED scroll handler - Minimal calculations
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY > lastScrollY.current
        
        // SIMPLE THRESHOLD CHECK - minimal calculations
        if (scrollingDown && currentScrollY > 100) {
          setIsVisible(false)
        } else if (!scrollingDown) {
          setIsVisible(true)
        }
        
        lastScrollY.current = currentScrollY
        ticking.current = false
      }
    }

    // Ultra-light throttling - better than requestAnimationFrame for scroll
    const throttledScroll = () => {
      if (ticking.current) return
      
      ticking.current = true
      handleScroll()
      
      // Throttle to ~30fps for scroll (smoother than 60fps for this use case)
      setTimeout(() => {
        ticking.current = false
      }, 32) // ~30fps
    }

    // Use passive: true for better scroll performance
    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  // Optimized menu handlers
  const handleMenuOpen = useCallback(() => {
    if (isOpeningMenu.current) return
    
    isOpeningMenu.current = true
    setMenuOpen(true)
    
    // Reset flag after reasonable time
    setTimeout(() => {
      isOpeningMenu.current = false
    }, 300)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // Prevent body scroll when menu is open - SIMPLIFIED
  useEffect(() => {
    if (menuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  // Memoize the menu button
  const menuButton = useMemo(() => (
    <button
      ref={menuButtonRef}
      onClick={handleMenuOpen}
      className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg active:scale-95"
      aria-label="Open menu"
      aria-expanded={menuOpen}
      aria-haspopup="true"
      disabled={isOpeningMenu.current}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform 0.1s ease'
      }}
    >
      <img 
        src="/icons/menu.svg" 
        alt="Menu icon" 
        width={24}
        height={24}
        loading="eager"
        decoding="async"
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />
    </button>
  ), [handleMenuOpen, menuOpen, isOpeningMenu.current])

  // Handle dropdown animation with CSS instead of Framer Motion
  const dropdownStyle = useMemo(() => {
    if (!featuresHover) return { display: 'none' }
    
    return {
      transform: 'translateY(0)',
      opacity: 1,
      transition: 'opacity 0.15s ease-out, transform 0.15s ease-out'
    }
  }, [featuresHover])

  // Simplified feature items without staggered animations
  const featureItems = useMemo(() => (
    features.map((feature, index) => (
      <div
        key={feature.title}
        className="flex flex-col gap-1 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 cursor-pointer"
        style={{
          animationDelay: `${index * 20}ms`,
          animationFillMode: 'both'
        }}
      >
        <h6 className="text-[#20195F] text-[14px] leading-tight font-semibold">
          {feature.title}
        </h6>
        <p className="font-normal text-[11px] text-[#636363] leading-tight">
          {feature.sub}
        </p>
      </div>
    ))
  ), [])

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-5 z-20 w-full ${
          isVisible ? "translate-y-0" : "-translate-y-24"
        }`}
        style={{ 
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        {/* TEST: Try removing GlassSurface temporarily to see if it's the culprit */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex justify-start mx-auto lg:w-10/11 p-3">
        {/* <GlassSurface
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
        > */}
          <div className="relative z-20 w-full flex px-2 justify-between items-center">
            <Link to="/" aria-label="Zenfipay homepage">
              <img 
                src='/icons/logo.svg' 
                alt="zenfipay logo" 
                loading="eager" // Changed from lazy for above-fold content
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
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li className="cursor-not-allowed text-gray-400">Blog</li>
              <li>
                <a 
                  href="mailto:support@zenfipay.com" 
                  aria-label="Send an email to ZenFiPay support"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* BUTTONS */}
            <div className="flex items-center">
              {/* FOR MOBILE */}
              <div className="block lg:hidden">
                {menuButton}
              </div>

              {/* Menu Component - Lazy loaded with Suspense */}
              <Suspense fallback={null}>
                <Menu open={menuOpen} onClose={handleMenuClose} />
              </Suspense>

              {/* FOR WEB */}
              <div className="hidden lg:flex items-center gap-4 ml-4">
                <Button
                  className="bg-[#2B2B2B] text-white hover:bg-[#3B3B3B] transition-colors duration-200"
                  size="lg"
                >
                  Sign in
                </Button>
                <Button
                  className="bg-[#014DFF] text-white hover:bg-[#0155FF] transition-colors duration-200"
                  size="lg"
                  onClick={() => {window.open("https://zenfipay.zohobookings.com/#/4757755000000049052", "_blank")}}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        {/* </GlassSurface> */}
        </div>
      </nav>

      {/* DROPDOWN - SIMPLIFIED without Framer Motion */}
      {featuresHover && (
        <div
          ref={dropdownRef}
          onMouseEnter={() => setFeaturesHover(true)}
          onMouseLeave={() => setFeaturesHover(false)}
          className="fixed top-22.5 left-1/2 -translate-x-1/2 z-30"
          style={dropdownStyle}
        >
          <div className="bg-white flex items-center gap-4 p-4 border-[0.5px] border-[#100B40]/20 rounded-2xl min-w-75 shadow-xl">
            <div className="flex-shrink-0">
              <img 
                src="/icons/coinDrop.svg" 
                alt="coin drop image" 
                width={60}
                height={60}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="flex flex-col gap-3">
              {featureItems}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
