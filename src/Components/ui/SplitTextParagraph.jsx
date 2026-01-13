import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SplitParagraph({
    text,
    as: Component = "p",
    className="",
    stagger="0.02",
    duration=1,
    delay = 0.2,
    y = 50,
    blur = 12,
    ease = "power3.out"
}) {

    const textRef = useRef(null)

    useGSAP(
        () => {
            if(!textRef.current) return;

            const split = new SplitText(textRef.current, {
                type: "words, lines",
            })

            gsap.fromTo(
                split.words,
                {
                    y,
                    opacity:0,
                    filter: `blur(${blur}px)`,
                },
                {
                    y:0,
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger,
                    duration,
                    delay,
                    ease,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        once: true,
                    }
                }
            );

            return () => split.revert()
        },
        { scope: textRef }
    );

    return (
        <>
            <Component
                aria-hidden
                ref={textRef}
                className={clsx(className)}
            >
                {text}
            </Component>

            {/* SCREEN READER FALLBACK */}
            <Component className="sr-only">
                {text}
            </Component>
        </>
    )
}