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
  const scrollPosition = useRef(0)

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

  // FIXED: Optimized menu handler with scroll position fix
  const handleMenuOpen = useCallback(() => {
    // Prevent double clicks
    if (isOpeningMenu.current) return
    
    // Store current scroll position BEFORE opening menu
    scrollPosition.current = window.scrollY
    
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

  // FIXED: Menu close handler with proper scroll restoration
  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
    
    // Restore scroll position AFTER menu animation completes
    setTimeout(() => {
      if (scrollPosition.current !== undefined) {
        // Use smooth scroll for better UX
        window.scrollTo({
          top: scrollPosition.current,
          behavior: 'smooth'
        })
      }
    }, 50) // Small delay to ensure menu is fully closed
  }, [])

  // Optimized body scroll lock - FIXED version
  useEffect(() => {
    if (menuOpen) {
      // Store scroll position
      scrollPosition.current = window.scrollY
      
      // Apply styles without affecting layout
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition.current}px`
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    } else {
      // Remove styles
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.height = ''
      
      // Scroll restoration is now handled in handleMenuClose
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.height = ''
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
        {/* IMPROVED Glass effect navbar - Better balance of transparency and contrast */}
        <div 
          className="flex justify-start mx-auto lg:w-10/11 p-3"
          style={{
            // Balanced color for glass effect - dark but transparent
            background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.85) 0%, rgba(20, 20, 40, 0.9) 100%)',
            backdropFilter: 'blur(20px) saturate(200%)',
            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.2),
              0 2px 8px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
            `,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            // Subtle gradient overlay for better readability
            position: 'relative'
          }}
        >
          {/* Optional: Add a subtle noise texture for better glass effect */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '24px',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
              opacity: 0.4,
              pointerEvents: 'none',
              mixBlendMode: 'overlay'
            }}
          />
          
          <div className="relative z-10 w-full flex justify-between items-center">
            <Link to="/" aria-label="Zenfipay homepage">
              <img 
                src='/icons/logo.svg' 
                alt="zenfipay logo" 
                loading="eager"
                className="w-fit" 
                width={120}
                height={40}
                decoding="async"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              />
            </Link>
            
            {/* Desktop Links */}
            <ul className="relative z-10 hidden lg:flex items-center gap-8 text-white text-[15px]">
              <li 
                className="relative"
                onMouseEnter={() => setFeaturesHover(true)}
                onMouseLeave={() => setFeaturesHover(false)}
              >
                <button 
                  className="cursor-pointer px-4 py-2 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Features
                </button>
              </li>
              <li>
                <Link 
                  to="/frequentlyaskedquestions"
                  className="px-4 py-2 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  FAQs
                </Link>
              </li>
              <li className="px-4 py-2 text-gray-300 cursor-not-allowed rounded-lg">
                Blog
              </li>
              <li>
                <a 
                  href="mailto:support@zenfipay.com" 
                  aria-label="Send an email to ZenFiPay support"
                  className="px-4 py-2 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
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
                  className="bg-white/10 text-white hover:bg-white/20 transition-all duration-200 border border-white/20 backdrop-blur-sm"
                  size="lg"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  Sign in
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 border border-blue-400/30"
                  size="lg"
                  onClick={() => {window.open("https://zenfipay.zohobookings.com/#/4757755000000049052", "_blank")}}
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
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
            className="bg-white/95 backdrop-blur-md flex items-center gap-4 p-6 border border-gray-300/50 rounded-2xl min-w-80 shadow-2xl"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)'
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
