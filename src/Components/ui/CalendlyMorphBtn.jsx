import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./button";

export default function RequestDemo() {
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const timeline = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const openBookings = () => {
    const button = buttonRef.current;
    const overlay = overlayRef.current;
    if (!button || !overlay) return;

    const rect = button.getBoundingClientRect();

    document.body.style.overflow = "hidden";
    setIsLoaded(false);

    gsap.set(overlay, {
      display: "block",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: 9999,
    });

    timeline.current?.kill();
    timeline.current = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.inOut" },
      onComplete: () => setIsOpen(true),
    });

    timeline.current.to(overlay, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  };

  const closeBookings = () => {
    const button = buttonRef.current;
    const overlay = overlayRef.current;
    if (!button || !overlay) return;

    const rect = button.getBoundingClientRect();

    setIsOpen(false);

    timeline.current?.kill();
    timeline.current = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        document.body.style.overflow = "";
        setIsLoaded(false);
      },
    });

    timeline.current.to(overlay, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: 9999,
    });
  };

  return (
    <>
      <Button ref={buttonRef} onClick={openBookings} size="lg">
        Request a demo
      </Button>

      <div
        ref={overlayRef}
        className="fixed z-50 hidden overflow-hidden bg-white"
      >
        {isOpen && (
          <button
            onClick={closeBookings}
            className="absolute right-4 top-4 z-30 rounded-full bg-black px-4 py-2 text-white"
          >
            Close
          </button>
        )}

        {/* Loader overlays iframe */}
        {!isLoaded && isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/20 border-t-black" />
          </div>
        )}

        {/* Zoho iframe MUST be visible */}
        {isOpen && (
          <iframe
            src="https://zenfipay.zohobookings.com/#/4757755000000049052"
            className="h-full w-full"
            frameBorder="0"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
    </>
  );
}
