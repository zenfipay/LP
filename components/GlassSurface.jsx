/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);

    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDark;
};

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "normal",
  className = "",
  style = {}
}) => {
  const uniqueId = useRef(
    Math.random().toString(36).slice(2)
  ).current;

  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const isDarkMode = useDarkMode();
  const [svgSupported, setSvgSupported] = useState(false);

  const supportsSVGFilters = () => {
    if (typeof window === "undefined") return false;

    const isWebkit =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) return false;

    const div = document.createElement("div");
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== "";
  };

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const w = rect?.width || 400;
    const h = rect?.height || 200;
    const edge = Math.min(w, h) * (borderWidth * 0.5);

    const svg = `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="black"/>
        <rect width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${redGradId})"/>
        <rect width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${blueGradId})"
          style="mix-blend-mode:${mixBlendMode}"/>
        <rect x="${edge}" y="${edge}"
          width="${w - edge * 2}" height="${h - edge * 2}"
          rx="${borderRadius}"
          fill="hsl(0 0% ${brightness}% / ${opacity})"
          style="filter:blur(${blur}px)"/>
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  };

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  useEffect(() => {
    updateDisplacementMap();

    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      ref.current?.setAttribute(
        "scale",
        (distortionScale + offset).toString()
      );
      ref.current?.setAttribute("xChannelSelector", xChannel);
      ref.current?.setAttribute("yChannelSelector", yChannel);
    });

    gaussianBlurRef.current?.setAttribute(
      "stdDeviation",
      displace.toString()
    );
  }, [
    borderRadius,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateDisplacementMap);
    });

    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const containerStyles = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius,
    background: isDarkMode
      ? `rgba(0,0,0,${backgroundOpacity})`
      : `rgba(255,255,255,${backgroundOpacity})`,
    backdropFilter: svgSupported
      ? `url(#${filterId}) saturate(${saturation})`
      : "blur(12px) saturate(1.8)",
    WebkitBackdropFilter: "blur(12px) saturate(1.8)"
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={containerStyles}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feImage
              ref={feImageRef}
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" />
            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" />
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" />
            <feGaussianBlur ref={gaussianBlurRef} />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
