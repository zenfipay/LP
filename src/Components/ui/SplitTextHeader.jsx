import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SplitTextHeader({
  text,
  as: Component = "h1",
  className = "",
  stagger = 0.05,
  duration = 1,
  y = 50,
  ease = "power3.out",
}) {
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(textRef.current, {
          type: "words, lines",
        });

        gsap.from(split.words, {
          y,
          opacity: 0,
          stagger,
          duration,
          ease,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        });

        return () => split.revert();
      });
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

      <Component className="sr-only">
        {text}
      </Component>
    </>
  );
}