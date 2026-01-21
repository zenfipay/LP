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
  const scrollTimeout = useRef(null)
  const scrollDirection = useRef('up')

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  // ULTRA-OPTIMIZED scroll handler for iOS/Windows
  useEffect(() => {
    let lastKnownScrollPosition = 0
    let shouldUpdate = true
    
    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY
      
      if (shouldUpdate) {
        window.requestAnimationFrame(() => {
          const currentScrollY = lastKnownScrollPosition
          const scrollingDown = currentScrollY > lastScrollY.current
          
          // Only update if direction changed significantly
          if (scrollingDown !== (scrollDirection.current === 'down')) {
            scrollDirection.current = scrollingDown ? 'down' : 'up'
            
            // Add hysteresis to prevent flickering
            if (scrollingDown && currentScrollY > 150) { // Increased from 100
              setIsVisible(false)
            } else if (!scrollingDown && currentScrollY < 100) {
              setIsVisible(true)
            }
          }
          
          lastScrollY.current = currentScrollY
          shouldUpdate = true
        })
        
        shouldUpdate = false
      }
    }

    // Use passive: true for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Optimized menu handlers
  const handleMenuOpen = useCallback(() => {
    if (isOpeningMenu.current) return
    
    isOpeningMenu.current = true
    
    // Use microtask for immediate state update
    Promise.resolve().then(() => {
      setMenuOpen(true)
    })
    
    // Reset flag
    setTimeout(() => {
      isOpeningMenu.current = false
    }, 300)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // Optimized body scroll lock - LESS invasive
  useEffect(() => {
    if (menuOpen) {
      // Minimal style changes
      document.body.style.overflow = 'hidden'
      // Don't touch position/top to avoid layout thrashing
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Memoize the menu button
  const menuButton = useMemo(() => (
    <button
      ref={menuButtonRef}
      onClick={handleMenuOpen}
      className="text-white p-2 rounded-lg"
      aria-label="Open menu"
      aria-expanded={menuOpen}
      aria-haspopup="true"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        outline: 'none'
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
          pointerEvents: 'none'
        }}
      />
    </button>
  ), [handleMenuOpen, menuOpen])

  // Handle dropdown with performance in mind
  const dropdownStyle = useMemo(() => {
    if (!featuresHover) return { display: 'none', opacity: 0 }
    
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.2s ease, transform 0.2s ease'
    }
  }, [featuresHover])

  // Feature items with minimal animations
  const featureItems = useMemo(() => (
    features.map((feature) => (
      <div
        key={feature.title}
        className="flex flex-col gap-1 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
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
        // CRITICAL: Remove transition during scroll for iOS performance
        style={{ 
          transition: isVisible ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU layer
          contain: 'layout style paint', // Isolate for performance
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {/* OPTION 1: Use CSS backdrop-filter (lighter than GlassSurface) */}
        <div 
          className="flex justify-start mx-auto lg:w-10/11 p-3"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            boxShadow: '0 4px 6px -1px rgba(16, 11, 64, 0.05), 0 2px 4px -1px rgba(16, 11, 64, 0.03)',
            // Optimize for performance
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            isolation: 'isolate'
          }}
        >
          <div className="relative z-20 w-full flex px-2 justify-between items-center">
            <Link to="/" aria-label="Zenfipay homepage">
              <img 
                src='/icons/logo.svg' 
                alt="zenfipay logo" 
                loading="eager"
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
                <button className="cursor-pointer px-2 py-1">
                  Features
                </button>
              </li>
              <li>
                <Link 
                  to="/frequentlyaskedquestions"
                  className="hover:text-blue-200"
                >
                  FAQs
                </Link>
              </li>
              <li className="text-gray-400">Blog</li>
              <li>
                <a 
                  href="mailto:support@zenfipay.com" 
                  aria-label="Send an email to ZenFiPay support"
                  className="hover:text-blue-200"
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

              {/* Menu Component */}
              <Suspense fallback={null}>
                <Menu open={menuOpen} onClose={handleMenuClose} />
              </Suspense>

              {/* FOR WEB */}
              <div className="hidden lg:flex items-center gap-4 ml-4">
                <Button
                  className="bg-[#2B2B2B] text-white hover:bg-[#3B3B3B]"
                  size="lg"
                >
                  Sign in
                </Button>
                <Button
                  className="bg-[#014DFF] text-white hover:bg-[#0155FF]"
                  size="lg"
                  onClick={() => {window.open("https://zenfipay.zohobookings.com/#/4757755000000049052", "_blank")}}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* OPTION 2: If you MUST use GlassSurface, add these optimizations */}
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
          className="flex justify-start mx-auto lg:w-10/11"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            contain: 'layout style paint'
          }}
        >
          [same content as above]
        </GlassSurface> */}
      </nav>

      {/* DROPDOWN - Performance optimized */}
      {featuresHover && (
        <div
          onMouseEnter={() => setFeaturesHover(true)}
          onMouseLeave={() => setFeaturesHover(false)}
          className="fixed top-22.5 left-1/2 -translate-x-1/2 z-30"
          style={dropdownStyle}
        >
          <div 
            className="bg-white flex items-center gap-4 p-4 border-[0.5px] border-[#100B40]/20 rounded-2xl min-w-75 shadow-xl"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
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
              {featureItems}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
