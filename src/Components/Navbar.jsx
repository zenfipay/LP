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

// Lazy load the Menu component
const Menu = lazy(() => import('./ui/Menu'))

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuresHover, setFeaturesHover] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const menuButtonRef = useRef(null)
  const navRef = useRef(null)
  const hideTimeoutRef = useRef(null)
  const showTimeoutRef = useRef(null)
  const isOpeningMenu = useRef(false)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
    }
  }, [])

  // Optimized scroll handler
  useEffect(() => {
    let animationFrameId = null
    
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        animationFrameId = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDelta = currentScrollY - lastScrollY.current
          
          // Ignore tiny scroll movements (< 3px) to prevent flickering
          if (Math.abs(scrollDelta) < 3) {
            ticking.current = false
            return
          }
          
          const scrollingDown = scrollDelta > 0
          
          // Clear any pending timeouts
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
          if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
          
          if (scrollingDown && currentScrollY > 200) {
            // Only hide if user is intentionally scrolling down
            hideTimeoutRef.current = setTimeout(() => {
              setIsVisible(false)
            }, 100)
          } else if (!scrollingDown) {
            // Show immediately when scrolling up
            setIsVisible(true)
          }
          
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // FIXED: Optimized menu handler with immediate response
  const handleMenuOpen = useCallback(() => {
    // Prevent double clicks
    if (isOpeningMenu.current) return
    
    isOpeningMenu.current = true
    
    // Immediate visual feedback
    if (menuButtonRef.current) {
      menuButtonRef.current.style.transform = 'scale(0.95)'
      setTimeout(() => {
        if (menuButtonRef.current) {
          menuButtonRef.current.style.transform = ''
        }
      }, 150)
    }
    
    // Open menu immediately
    setMenuOpen(true)
    
    // Reset flag after a reasonable time
    setTimeout(() => {
      isOpeningMenu.current = false
    }, 500)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // Optimized body scroll lock
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Preload menu icon for faster response
  useEffect(() => {
    const img = new Image()
    img.src = '/icons/menu.svg'
  }, [])

  // Memoize the menu button with immediate feedback
  const menuButton = useMemo(() => (
    <button
      ref={menuButtonRef}
      onClick={handleMenuOpen}
      className="text-white p-2 rounded-lg active:scale-95 transition-transform duration-100"
      aria-label="Open menu"
      aria-expanded={menuOpen}
      aria-haspopup="true"
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
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
          display: 'block'
        }}
      />
    </button>
  ), [handleMenuOpen, menuOpen])

  // Handle dropdown
  const dropdownStyle = useMemo(() => {
    if (!featuresHover) return { display: 'none', opacity: 0, pointerEvents: 'none' }
    
    return {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      pointerEvents: 'auto'
    }
  }, [featuresHover])

  // Feature items
  const featureItems = useMemo(() => (
    features.map((feature) => (
      <div
        key={feature.title}
        className="flex flex-col gap-1 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200"
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
        className={`fixed top-5 z-50 w-full px-4 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ 
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* DARKER Glass effect navbar - improved contrast */}
        <div 
          className="flex justify-start mx-auto lg:w-10/11 p-3"
          style={{
            // DARKER background for better contrast
            background: 'rgba(10, 10, 20, 0.75)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: `
              0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
            `,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="relative z-20 w-full flex justify-between items-center">
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
            
            {/* Desktop Links */}
            <ul className="relative z-20 hidden lg:flex items-center gap-8 text-white text-[15px]">
              <li 
                className="relative"
                onMouseEnter={() => setFeaturesHover(true)}
                onMouseLeave={() => setFeaturesHover(false)}
              >
                <button className="cursor-pointer px-2 py-1 hover:text-blue-300 transition-colors duration-200">
                  Features
                </button>
              </li>
              <li>
                <Link 
                  to="/frequentlyaskedquestions"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li className="text-gray-300 cursor-not-allowed">Blog</li>
              <li>
                <a 
                  href="mailto:support@zenfipay.com" 
                  aria-label="Send an email to ZenFiPay support"
                  className="hover:text-blue-300 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Buttons */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <div className="block lg:hidden">
                {menuButton}
              </div>

              {/* Menu Component */}
              <Suspense fallback={null}>
                <Menu open={menuOpen} onClose={handleMenuClose} />
              </Suspense>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center gap-4 ml-4">
                <Button
                  className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
                  size="lg"
                >
                  Sign in
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  size="lg"
                  onClick={() => {window.open("https://zenfipay.zohobookings.com/#/4757755000000049052", "_blank")}}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Features Dropdown */}
      {featuresHover && (
        <div
          onMouseEnter={() => setFeaturesHover(true)}
          onMouseLeave={() => setFeaturesHover(false)}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40"
          style={dropdownStyle}
        >
          <div 
            className="bg-white flex items-center gap-4 p-4 border border-gray-200 rounded-2xl min-w-75 shadow-xl"
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
