// Forced HMR reload
"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useRef
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName = colors.name ?? "#fff";
  const colorDesignation = colors.designation ?? "#d4af37";
  const colorTestimony = colors.testimony ?? "#94a3b8";
  const fontSizeName = fontSizes.name ?? "1.875rem";
  const fontSizeDesignation = fontSizes.designation ?? "1rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay && testimonialsLength > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength, activeIndex]); // Reset interval when activeIndex changes

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    
    // Improved logic for 2 testimonials: only one can be "left" or "right"
    const isLeft = testimonialsLength > 1 && (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = testimonialsLength > 2 && (activeIndex + 1) % testimonialsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.5,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(25deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.5,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-25deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `scale(0.5)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Image Display */}
        <div className="relative w-full h-[400px] md:h-[500px] perspective-[1000px]" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="absolute inset-0 w-full h-full"
              style={getImageStyle(index)}
            >
              <motion.img
                src={testimonial.src}
                alt={testimonial.name}
                className="w-full h-full object-cover object-center rounded-[2rem] shadow-2xl border border-white/10"
                animate={index === activeIndex ? { y: [0, -8, 0] } : {}}
                transition={index === activeIndex ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
                whileHover={index === activeIndex ? { scale: 1.03 } : {}}
              />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center min-h-[380px] md:min-h-[450px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1, 
                  transition: { 
                    staggerChildren: 0.25,
                    delayChildren: 0.1
                  } 
                }
              }}
              className="flex flex-col relative"
            >
              {/* Name with Shine Effect & Mask Reveal */}
              <div className="relative overflow-hidden mb-2 rounded-lg">
                <motion.h3
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { 
                      y: 0, 
                      opacity: 1, 
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  className="font-black tracking-tight relative z-10"
                  style={{ color: colorName, fontSize: fontSizeName }}
                >
                  {activeTestimonial.name}
                </motion.h3>
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 4, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                />
              </div>
              
              {/* Designation with Staggered Reveal */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -15 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    transition: { duration: 0.8, ease: "easeOut" } 
                  }
                }}
                className="font-bold uppercase tracking-[0.2em] mb-8"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </motion.p>
              
              {/* Biography with Premium Word-by-Word Reveal */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { 
                      staggerChildren: 0.05, 
                      delayChildren: 0.4 
                    } 
                  }
                }}
                className="leading-relaxed italic text-justify relative"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {/* Decorative Quote Mark — repositioned to avoid overflow */}
                <span className="absolute -left-4 md:-left-8 -top-6 text-6xl md:text-7xl text-[#d4af37]/10 font-serif leading-none select-none pointer-events-none">“</span>
                
                {activeTestimonial.quote.split(/\s+/).map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { 
                        filter: "blur(8px)", 
                        opacity: 0, 
                        y: 10, 
                        scale: 0.95
                      },
                      visible: { 
                        filter: "blur(0px)", 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { 
                          duration: 0.7, 
                          ease: [0.215, 0.61, 0.355, 1] 
                        } 
                      }
                    }}
                    className="inline-block origin-bottom"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
