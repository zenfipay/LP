import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/button";

export default function RequestDemo() {
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const embedRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const timeline = useRef(null);
  const observer = useRef(null);

  // Load Zoho script once
  useEffect(() => {
    if (document.getElementById("zoho-bookings-script")) return;

    const script = document.createElement("script");
    script.id = "zoho-bookings-script";
    script.src = "https://bookings.zoho.com/portal-embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Observe iframe load (Zoho has no callback)
  useEffect(() => {
    if (!embedRef.current || isLoaded) return;

    observer.current = new MutationObserver(() => {
      const iframe = embedRef.current.querySelector("iframe");
      if (iframe) {
        iframe.onload = () => setIsLoaded(true);
      }
    });

    observer.current.observe(embedRef.current, {
      childList: true,
      subtree: true,
    });

    return () => observer.current?.disconnect();
  }, [isLoaded]);

  const openBookings = () => {
    const button = buttonRef.current;
    const overlay = overlayRef.current;
    if (!button || !overlay) return;

    const rect = button.getBoundingClientRect();

    document.body.style.overflow = "hidden";

    gsap.set(overlay, {
      display: "block",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: 9999,
    });

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

    timeline.current = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        document.body.style.overflow = "";
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
      {/* Trigger Button */}
      <Button
        ref={buttonRef}
        onClick={openBookings}
        size="lg"
      >
        Request a demo
      </Button>

      {/* Morph Overlay */}
      <div
        ref={overlayRef}
        className="fixed z-50 hidden overflow-hidden bg-white"
      >
        {/* Close Button */}
        {isOpen && (
          <button
            onClick={closeBookings}
            className="absolute right-4 top-4 z-20 rounded-full bg-black px-4 py-2 text-white"
          >
            Close
          </button>
        )}

        {/* Loader */}
        {!isLoaded && isOpen && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/20 border-t-black" />
          </div>
        )}

        {/* Cached Zoho Embed */}
        <div
          ref={embedRef}
          className={`h-full w-full transition-opacity duration-300 ${
            isOpen && isLoaded ? "opacity-100" : "opacity-0"
          }`}
          data-zohobookings
          data-portal-id="YOUR_PORTAL_ID"
          data-service-id="YOUR_SERVICE_ID"
          data-theme="light"
        />
      </div>
    </>
  );
}
