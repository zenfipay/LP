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
  const isScrolling = useRef(false)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
    }
  }, [])

  // FIXED: Optimized scroll handler that prevents premature hiding
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const scrollDelta = currentScrollY - lastScrollY.current
          
          // Ignore tiny scroll movements (< 5px) to prevent flickering
          if (Math.abs(scrollDelta) < 5) {
            ticking.current = false
            return
          }
          
          const scrollingDown = scrollDelta > 0
          
          // Clear any pending timeouts
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
          if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
          
          if (scrollingDown && currentScrollY > 250) { // Increased threshold
            // Only hide if user is intentionally scrolling down
            hideTimeoutRef.current = setTimeout(() => {
              setIsVisible(false)
            }, 150) // Increased delay before hiding
          } else if (!scrollingDown) {
            // Show immediately when scrolling up, but with small delay for smoothness
            showTimeoutRef.current = setTimeout(() => {
              setIsVisible(true)
            }, 50)
          }
          
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
    }
  }, [])

  // Optimized menu handlers
  const handleMenuOpen = useCallback(() => {
    setMenuOpen(true)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // Store scroll position to restore later
      document.documentElement.style.scrollBehavior = 'auto'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = ''
    }
  }, [menuOpen])

  // Memoize the menu button
  const menuButton = useMemo(() => (
    <button
      ref={menuButtonRef}
      onClick={handleMenuOpen}
      className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
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
        {/* Glass effect navbar */}
        <div 
          className="flex justify-start mx-auto lg:w-10/11 p-3"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            boxShadow: '0 4px 6px -1px rgba(16, 11, 64, 0.05), 0 2px 4px -1px rgba(16, 11, 64, 0.03)',
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
                <button className="cursor-pointer px-2 py-1 hover:text-blue-200 transition-colors duration-200">
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
              <li className="text-gray-400 cursor-not-allowed">Blog</li>
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
