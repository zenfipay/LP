import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export default function SplitTextHeader() {
  const textRef = useRef(null);

  useGSAP(() => {
    const split = new SplitText(textRef.current, {
      type: "words, lines",
    });

    gsap.from(split.words, {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out",
    });

    return () => split.revert();
  }, []);

  return (
    <>
        <h1 aria-hidden ref={textRef} className="font-neue font-medium text-white text-5xl leading-11.25 lg:w-178 lg:text-[110px] lg:leading-25">
            Stablecoin payments made simple.
        </h1>
        <h1 className="sr-only ">
            Stablecoin payments made simple
        </h1>
    </>
  );
}
