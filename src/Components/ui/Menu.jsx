import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { createPortal } from "react-dom"
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

export default function Menu({ open, onClose }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x:0 }}
          exit={{ x:"100%" }}
          transition={{ duration: 0.25, ease:"easeOut" }}
          className="fixed inset-0 z-50 bg-[#101010] px-2"
        >
            <div className="absolute top-9 right-6 w-full flex justify-between items-center px-2 left-1/2 -translate-x-1/2">
                <img src="/icons/logo.svg" alt='zenfipay logo' className="" />
                <button
                    onClick={onClose}
                    className=" text-white"
                >
                    <img src="/icons/close.svg" alt=" close icon" />
                </button>
            </div>

            <div className="flex flex-col items-start justify-center h-full gap-8 text-white">

                <div className="relative group w-fit ">

                    {/* TRIGGER */}
                    <div className="flex items-center gap-2 text-left  text-[36px] font-normal leading-[100%]">
                        Features 
                        <img 
                            src="/icons/darrWhite.svg" 
                            alt="down arrow" 
                            className="transition-transform duration-300 group-hover:rotate-180"
                        />
                    </div>

                    {/* DROPDOWN */}
                    
                    
                </div>
                <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{  }}
                className="w-full text-left"
                >
                <Link onClick={onClose} to="/frequentlyaskedquestions" className="text-[36px] font-normal leading-[100%]">
                    FAQs
                </Link>
                </motion.div>

                <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ }}
                className="w-full text-left "
                >
                <Link onClick={onClose} to="/blog" className="text-[36px] font-normal leading-[100%]">
                    Blog
                </Link>
                </motion.div>

                <motion.div
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ }}
                className="w-full text-left"
                >
                <Link onClick={onClose} to="/contact" className="text-[36px] font-inter font-normal leading-[100%]">
                    Contact
                </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-2 flex flex-col md:flex-row gap-2 left-1/2 -translate-x-1/2">
                <Button
                    className="bg-[#2B2B2B] w-screen md:w-1/2 font-neue font-medium text-[15px] leading-5 text-white"
                >
                    Sign in
                </Button>
                <Button
                    className="bg-[#014DFF] w-screen md:w-1/2 font-neue font-medium text-[15px] leading-5 text-white"
                >
                    Get started
                </Button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
