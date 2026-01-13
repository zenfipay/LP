import AnimatedCheckmark from "./AnimatedCheckmark";



export default function PaymentAnimation() {

    return (
        <div className="">
            <div className="flex">
                <figure className="">
                    <img src="/images/iPhoneCanvas.png" alt="iphone image/canvas" className="w-[50%]" />
                </figure>
                <div className="flex flex-col justify-center">
                    <AnimatedCheckmark />
                    {/* CHECKMARK TEXT */}
                    <div className="text-center">
                        <p className="font-neue text-[18px]">Payment done!</p>
                        <p className="text-[#7D7D7D] text-[13px] leading-[100%] tracking-[0.5px]">You've paid N20,000 to Ikeja City mall Shoprite Supermarket</p>
                    </div>
                </div>
            </div>
        </div>
    )
}