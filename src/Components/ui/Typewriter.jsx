import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function TypewriterLoop({
  texts = [],
  typingSpeed = 0.1,   // seconds per character
  deletingSpeed = 0.05, // seconds per character
  pause = 0.5           // pause after typing or deleting
}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!texts.length) return;

    const tl = gsap.timeline({
      repeat: -1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        once: true
      }
    });

    texts.forEach((word) => {
      // 1️⃣ Type each character one by one
      for (let i = 1; i <= word.length; i++) {
        tl.to(textRef.current, {
          text: word.substring(0, i),
          duration: typingSpeed,
          ease: "none"
        });
      }

      // 2️⃣ Pause after typing full word
      tl.to({}, { duration: pause });

      // 3️⃣ Delete each character one by one
      for (let i = word.length; i >= 0; i--) {
        tl.to(textRef.current, {
          text: word.substring(0, i),
          duration: deletingSpeed,
          ease: "none"
        });
      }

      // 4️⃣ Pause after deletion
      tl.to({}, { duration: pause });
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [texts, typingSpeed, deletingSpeed, pause]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-1/2 text-center flex justify-center items-center">
      <span
        ref={textRef}
        className="bg-linear-to-b from-[#99EC64] via-[#014DFF] to-[#000000] bg-clip-text text-transparent text-[48px] font-inter font-normal leading-[100%] whitespace-nowrap"
      />
      <span className="bg-linear-to-b from-[#99EC64] via-[#014DFF] to-[#000000] bg-clip-text text-transparent text-3xl font-inter font-normal  ml-1 animate-caret-blink">|</span>
    </div>
  );
}





// bg-linear-to-b from-[#99EC64] via-[#014DFF] to-[#000000] bg-clip-text text-transparent text-[48px] font-inter font-normal leading-[100%] whitespace-nowrap