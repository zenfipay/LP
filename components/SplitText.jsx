import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export default function SplitTextHeader() {
  const textRef = useRef(null);

  useGSAP(() => {
    const split = new SplitText(textRef.current, {
      type: "chars",
    });

    gsap.from(split.chars, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
    });

    return () => split.revert();
  }, []);

  return (
    <>
        <h1 aria-hidden ref={textRef} className="min-h-33.75 font-neue font-medium text-5xl leading-11.25">
            Stablecoin payments made simple
        </h1>
        <h1 className="sr-only ">
        Stablecoin payments made simple
        </h1>
    </>
  );
}
