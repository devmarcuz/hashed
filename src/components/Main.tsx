import "@/styles/Main.css";
import NoiseEffect from "./NoiseEffect";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import StrokeCross from "./StrokeCross";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionContext } from "@/app/page";

const MainSection = () => {
  const topContentRef = useRef(null);
  const imageRef = useRef(null);
  const secondContentRef = useRef(null);
  const sectionRef = useRef(null);
  const matchImgRef = useRef(null);
  const firstTxtRef = useRef(null);
  const roadPathRef = useRef(null);
  const secondTxtRef = useRef(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useSectionContext();
  const [secondContentReady, setSecondContentReady] = useState(false);

  const topContentInView = useInView(topContentRef, {
    once: false,
    margin: "-100px",
  });

  const imageInView = useInView(imageRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.6]);

  const imageY = useTransform(scrollYProgress, [0.2, 0.5], [0, -270]);

  const imageX = useTransform(scrollYProgress, [0.2, 0.5], [0, 300]);

  // Faster opacity transition
  const secondContentOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.52],
    [0, 1]
  );

  // Watch for when secondContentOpacity becomes 1
  useEffect(() => {
    const unsubscribe = secondContentOpacity.on("change", (latest) => {
      if (latest >= 0.99 && !secondContentReady) {
        setTimeout(() => {
          setSecondContentReady(true);
        }, 200); // Reduced to 0.2s delay
      } else if (latest < 0.99 && secondContentReady) {
        setSecondContentReady(false);
      }
    });

    return () => unsubscribe();
  }, [secondContentOpacity, secondContentReady]);

  // Observer for section detection
  useEffect(() => {
    if (!mainSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top <= 100) {
            setActiveSection("main");
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    observer.observe(mainSectionRef.current);

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (!mainSectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mainSectionRef.current,
        start: "bottom bottom",
        end: "+=150%",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        pinReparent: false,
        fastScrollEnd: true,
      });
    }, mainSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="main-section" ref={mainSectionRef}>
      <NoiseEffect />

      <section ref={sectionRef}>
        <div className="first-content">
          <div className="top-content" ref={topContentRef}>
            <div style={{ overflow: "hidden" }}>
              <motion.div
                className="txt"
                initial={{ y: 60, opacity: 0 }}
                animate={
                  topContentInView
                    ? { y: 0, opacity: 1 }
                    : { y: 60, opacity: 0 }
                }
                transition={{
                  duration: 1.4,
                  ease: [0.19, 1, 0.22, 1],
                  delay: 0.3,
                }}
              >
                <p>
                  We don&apos;t talk enough about the tiny things that bring
                  people together.
                </p>
              </motion.div>
            </div>

            <div style={{ overflow: "hidden" }}>
              <motion.div
                className="txt"
                initial={{ y: 60, opacity: 0 }}
                animate={
                  topContentInView
                    ? { y: 0, opacity: 1 }
                    : { y: 60, opacity: 0 }
                }
                transition={{
                  duration: 1.4,
                  ease: [0.19, 1, 0.22, 1],
                  delay: 0.6,
                }}
              >
                <p>
                  The quick glances. The shared reactions. The moments that feel
                  small at first… until they stay with you longer than you
                  expected.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            ref={imageRef}
            initial={{ y: 100, opacity: 0, scale: 0.7 }}
            animate={
              imageInView
                ? { y: 0, opacity: 1, scale: 1 }
                : { y: 100, opacity: 0, scale: 0.7 }
            }
            style={{
              scale: imageScale,
              y: imageY,
              x: imageX,
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5,
            }}
          >
            <Image
              src="/svgs/peoplevibe.svg"
              alt="people vibe"
              width={566.499267578125}
              height={487.6204833984375}
              className="people-img"
              priority
              loading="eager"
            />
          </motion.div>
        </div>

        <motion.div
          className="second-content"
          ref={secondContentRef}
          style={{
            minHeight: "100vh",
            opacity: secondContentOpacity,
          }}
        >
          <div className="top-contain">
            <div className="match-img-section">
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="match-img-contain"
                  ref={matchImgRef}
                  initial={{ y: 60, opacity: 0 }}
                  animate={
                    secondContentReady
                      ? { y: 0, opacity: 1 }
                      : { y: 60, opacity: 0 }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.1,
                  }}
                >
                  <Image
                    src="/svgs/findamatch.svg"
                    alt="people vibe"
                    width={225}
                    height={405}
                    className="match-img"
                    priority
                    loading="eager"
                  />

                  <Image
                    src="/svgs/findamatchtxt.svg"
                    alt=""
                    width={115}
                    height={84}
                    className="match-img-txt"
                    priority
                    loading="eager"
                  />
                </motion.div>
              </div>
            </div>

            <div className="content-path">
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  className="txt"
                  ref={firstTxtRef}
                  initial={{ y: 60, opacity: 0 }}
                  animate={
                    secondContentReady
                      ? { y: 0, opacity: 1 }
                      : { y: 60, opacity: 0 }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.3,
                  }}
                >
                  <p>
                    Somewhere along the way, meeting people became complicated
                    too curated, too intentional, too loud.
                  </p>
                </motion.div>
              </div>

              <motion.div className="img-road">
                <Image
                  src="/svgs/road_path.svg"
                  alt=""
                  width={1613.3328857421889}
                  height={39.99999618530277}
                  className="road-path"
                  priority
                  loading="eager"
                />
              </motion.div>

              <div className="txt-container">
                <div style={{ overflow: "hidden" }} className="svg">
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={
                      secondContentReady
                        ? { y: 0, opacity: 1 }
                        : { y: 60, opacity: 0 }
                    }
                    transition={{
                      duration: 1.4,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.5,
                    }}
                  >
                    <StrokeCross />
                  </motion.div>
                </div>

                <div style={{ overflow: "hidden" }}>
                  <motion.div
                    className="txt"
                    ref={secondTxtRef}
                    initial={{ y: 60, opacity: 0 }}
                    animate={
                      secondContentReady
                        ? { y: 0, opacity: 1 }
                        : { y: 60, opacity: 0 }
                    }
                    transition={{
                      duration: 1.4,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.7,
                    }}
                  >
                    <p>
                      But connection was never meant to feel like a checklist.
                      It grows quietly.
                      <br />
                      In those little fragments of everyday life that don&apos;t
                      look like much… until suddenly, they do.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MainSection;
