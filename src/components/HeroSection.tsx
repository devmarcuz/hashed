import "@/styles/HeroSection.css";
import NoiseEffect from "./NoiseEffect";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import StrokeMoments from "./StrokeMoments";
import { useSectionContext } from "@/app/page";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useSectionContext();

  // Animate bottom-arts: fade in AND slide up on enter, reverse on exit
  const scrollY_bottomArts = useTransform(scrollY, [0, 400], [0, 60]);
  const scrollOpacity_bottomArts = useTransform(scrollY, [0, 400], [1, 0]);

  const smoothY_bottomArts = useSpring(scrollY_bottomArts, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothOpacity_bottomArts = useSpring(scrollOpacity_bottomArts, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Animate content elements (h2 and StrokeMoments)
  const scrollY_contentItems = useTransform(scrollY, [0, 400], [0, 60]);
  const scrollOpacity_contentItems = useTransform(scrollY, [0, 400], [1, 0]);

  const smoothY_contentItems = useSpring(scrollY_contentItems, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothOpacity_contentItems = useSpring(scrollOpacity_contentItems, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Observer to detect when section is at the top (behind header)
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if section is intersecting with the top of viewport
          if (entry.isIntersecting && entry.boundingClientRect.top <= 100) {
            setActiveSection("hero");
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: "-80px 0px 0px 0px", // Offset for header height
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="hero-section" ref={sectionRef}>
      <NoiseEffect />

      <section>
        <div className="content">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={
                hasAnimated
                  ? {
                      y: smoothY_contentItems,
                      opacity: smoothOpacity_contentItems,
                    }
                  : {}
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.5,
              }}
            >
              meet <span>through</span>
            </motion.h2>
          </div>

          <motion.div
            style={
              hasAnimated
                ? {
                    y: smoothY_contentItems,
                    opacity: smoothOpacity_contentItems,
                  }
                : {}
            }
            className="stroke-wrapper"
          >
            <StrokeMoments />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={
            hasAnimated
              ? { y: smoothY_bottomArts, opacity: smoothOpacity_bottomArts }
              : {}
          }
          transition={{
            duration: 1.4,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.5,
          }}
          className="bottom-arts"
        >
          <Image
            src="/svgs/art-1.svg"
            alt=""
            width={274.5553894042969}
            height={200}
            priority
            loading="eager"
          />
          <Image
            src="/svgs/art-2.svg"
            alt=""
            width={185.5410614013672}
            height={200}
            priority
            loading="eager"
          />
          <Image
            src="/svgs/art-3.svg"
            alt=""
            width={208.0063018798828}
            height={200}
            priority
            loading="eager"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
