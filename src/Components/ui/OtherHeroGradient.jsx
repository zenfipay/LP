import { motion } from "framer-motion"

export default function OtherHeroGradient() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative left-20 z-5 w-screen h-screen flex will-change-auto overflow-hidden"
        >
            <div className="absolute -top-174 left-[104.7px] md:left-[358.5px] lg:left-[671.03px] bg-linear-to-b from-[#014DFF] to-white w-[296.27px] h-[1255.29px] transform rotate-[-1.41deg] opacity-30 blur-[91.9px] mix-blend-lighten" />
            <div className=" absolute top-[-597.52px] left-[125.4px] md:left-[400.2px] lg:left-[750.36px] bg-linear-to-b from-[#014DFF] to-white w-[296.38px] h-[1254.07px] transform rotate-[-2.86deg] opacity-30 blur-[30px] mix-blend-lighten" />
            <div className="absolute -top-82.25 left-52 md:left-[528.1px] lg:left-[990.27px] bg-white w-[296.43px] h-318.5 transform opacity-80 blur-[74px] mix-blend-lighten" />
            <div className="absolute top-[-597.52px] left-[295.3px] md:left-[604.8px] lg:left-[1133.78px] bg-linear-to-b from-[#014DFF] to-white w-[296.27px] h-[1255.29px] transform rotate-[2.06deg] opacity-30 blur-[30px] mix-blend-lighten" />
        </motion.div>
    )
}