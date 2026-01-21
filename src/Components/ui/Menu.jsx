import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { createPortal } from "react-dom"
import { useState } from "react"
import { Button } from "./button"

const menuVariants = {
  closed: {
    scaleX: 0,
    transition: {
      duration: 0.35,
      ease: "easeInOut"
    }
  },
  open: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      mass: 0.8
    }
  }
}

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

export default function Menu({ open, onClose }) {
  // State to track if features dropdown is open
  const [featuresOpen, setFeaturesOpen] = useState(false)

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-[#101010] px-2"
        >
          <div className="absolute top-9 right-6 w-full flex justify-between items-center px-2 left-1/2 -translate-x-1/2">
            <img src="/icons/logo.svg" alt='zenfipay logo' className="" />
            <button
              onClick={onClose}
              className="text-white"
            >
              <img src="/icons/close.svg" alt="close icon" />
            </button>
          </div>

          <div className="flex flex-col items-start justify-center h-full gap-8 text-white">

            <div className="relative w-full">
            
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="flex items-center gap-2 text-left text-[36px] font-normal leading-[100%] w-full cursor-pointer"
              >
                Features 
                <img 
                  src="/icons/darrWhite.svg" 
                  alt="down arrow" 
                  className={`transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#3F3F3F] w-fit flex flex-col gap-4 mt-2 p-3 border-[0.5px] border-[#3F3F3F] drop-shadow-sm drop-shadow-[#20195F] rounded-3xl">
                      {features.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex flex-col gap-3 p-3"
                        >
                          <h6 className="text-white text-[14px] leading-[100%] font-inter font-medium">
                            {feature.title}
                          </h6>
                          <p className="font-inter font-normal text-[11px] text-[#999999] leading-[100%]">
                            {feature.sub}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full text-left"
            >
              <Link onClick={onClose} to="/frequentlyaskedquestions" className="text-[36px] font-normal leading-[100%]">
                FAQs
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full text-left cursor-not-allowed"
            >
              {/* <Link onClick={onClose} to="/blog" className="text-[36px] font-normal leading-[100%]">
                Blog
              </Link> */}
              <span className="text-[36px] font-normal leading-[100%]">
                Blog
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full text-left"
            >
              <a 
                href="mailto:support@zenfipay.com" 
                onClick={(e) => {
                  onClose()
                }}
                className="text-[36px] font-inter font-normal leading-[100%]"
              >
                Contact
              </a>
            </motion.div>
          </div>

          <div className="absolute bottom-2 flex flex-col md:flex-row gap-2 left-1/2 -translate-x-1/2">
            <Button className="bg-[#2B2B2B] w-screen md:w-1/2 font-neue font-medium text-[15px] leading-5 text-white">
              Sign in
            </Button>
            <Button className="bg-[#014DFF] w-screen md:w-1/2 font-neue font-medium text-[15px] leading-5 text-white">
              Get started
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}