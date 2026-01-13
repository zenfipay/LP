import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "relative select-none inline-flex items-center justify-center px-6 rounded-full text-[15px] font-inter font-semibold transition-transform duration-150 ease-[cubic bezier(.4,0,.2,1)] cursor-pointer active:translate-y-[1.5px] active:scale-[0.98] focus:outline-none after:content-[''] after:absolute after:inset-0 after:ring-2 after:ring-[#D4E3FF] after:rounded-full after:opacity-0 after:transition-opacity after:duration-[600ms] after:delay-[100ms] after:ease-[var(--ease)] active:after:opacity-100 active:after:duration-0",
  {
    variants: {
      variant: {
        default: "bg-white text-[#101010]",
      },
      size: {
        default: "h-[38px] py-2.5 text-[15px]",
        sm: "h-8 py-2 text-sm",
        lg: "h-[42px] text-[15px]"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)