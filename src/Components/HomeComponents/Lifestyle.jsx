import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Lifestyle() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const leftCoinRef = useRef(null);
  const rightCoinRef = useRef(null);
  const flipWordRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        leftCoinRef.current,
        { 
            x: -200, 
            opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          ease: "expo.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            once: true
          }
        }
      );

      gsap.fromTo(
        rightCoinRef.current,
        { 
            x: 200, 
            opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          ease: "expo.out",
          duration: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            once: true
          }
        }
      );

      
      const flips = 5;

      const flipTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: true
        }
      });

      for (let i = 0; i < flips; i++) {
        flipTl.to(flipWordRef.current, {
          rotationX: "+=180",
          ease: "power1.inOut",
          duration: 1
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="">

      {/* MOBILE */}
      <div
        className="flex bg-[#99EC64] w-full h-screen lg:hidden items-center justify-center overflow-hidden"
      >
        <div
          className="relative w-fit"
        >
          <img
            src="/icons/leftCoin.svg"
            alt="zcoin"
          />

          <p className="font-neue font-medium text-[96px] lg:text-[128px] leading-[100%]">
            Crypto as a{" "}
            <span
              ref={flipWordRef}
              className="inline-block text-white transform-style-preserve-3d will-change-transform"
            >
              lifestyle
            </span>
          </p>

          <img
            src="/icons/rightCoin.svg"
            alt="zcoin"
            className="relative left-60 lg:left-200"
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div
        ref={sectionRef}
        className="hidden bg-[#99EC64] w-full h-screen lg:flex items-center justify-center"
      >
        <div
          ref={contentRef}
          className="relative w-fit perspective-distant"
        >
          <img
            src="/icons/leftCoin.svg"
            alt="zcoin"
            ref={leftCoinRef}
          />

          <p className="font-neue font-medium text-[96px] lg:text-[128px] leading-[100%]">
            Crypto as a{" "}
            <span
              ref={flipWordRef}
              className="inline-block text-white transform-style-preserve-3d will-change-transform"
            >
              lifestyle
            </span>
          </p>

          <img
            src="/icons/rightCoin.svg"
            alt="zcoin"
            ref={rightCoinRef}
            className="relative left-60 lg:left-200"
          />
        </div>
      </div>
      
    </section>
  );
}
