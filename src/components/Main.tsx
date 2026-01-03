import "@/styles/Main.css";
import NoiseEffect from "./NoiseEffect";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import StrokeCross from "./StrokeCross";

const MainSection = () => {
  const topContentRef = useRef(null);
  const imageRef = useRef(null);
  const secondContentRef = useRef(null);
  const sectionRef = useRef(null);
  const matchImgRef = useRef(null);
  const firstTxtRef = useRef(null);
  const secondTxtRef = useRef(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const [secondContentReady, setSecondContentReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const topContentInView = useInView(topContentRef, {
    once: false,
    margin: "-100px",
  });

  const imageInView = useInView(imageRef, {
    once: true,
    margin: "-100px",
  });

  const mainSectionInView = useInView(mainSectionRef, {
    once: false,
    amount: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.6]);

  const getYTransform = () => {
    if (windowWidth <= 575) {
      return [0, -210];
    } else if (windowWidth <= 768) {
      return [0, -230];
    } else if (windowWidth <= 991) {
      return [0, -270];
    } else {
      return [0, -270];
    }
  };

  const imageY = useTransform(scrollYProgress, [0.2, 0.5], getYTransform());

  const getXTransform = () => {
    if (windowWidth <= 575) {
      return [0, 50];
    } else if (windowWidth <= 768) {
      return [0, 100];
    } else if (windowWidth <= 991) {
      return [0, 150];
    } else {
      return [0, 300];
    }
  };

  const imageX = useTransform(scrollYProgress, [0.2, 0.5], getXTransform());

  const secondContentOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.52],
    [0, 1]
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = secondContentOpacity.on("change", (latest) => {
      if (latest >= 0.99 && !secondContentReady && mainSectionInView) {
        setTimeout(() => {
          setSecondContentReady(true);
        }, 200);
      } else if ((latest < 0.99 || !mainSectionInView) && secondContentReady) {
        setSecondContentReady(false);
      }
    });

    return () => unsubscribe();
  }, [secondContentOpacity, secondContentReady, mainSectionInView]);

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
              src="/images/peoplevibe.png"
              alt="people vibe"
              width={566.499267578125}
              height={487.6204833984375}
              className="people-img"
              priority
              fetchPriority="high"
              quality={100}
              unoptimized
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
                    secondContentReady && mainSectionInView
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
                    src="/images/findamatch.png"
                    alt="people vibe"
                    width={225}
                    height={405}
                    className="match-img"
                    priority
                    fetchPriority="high"
                    quality={100}
                    unoptimized
                  />

                  <Image
                    src="/svgs/findamatchtxt.svg"
                    alt=""
                    width={115}
                    height={84}
                    className="match-img-txt"
                    priority
                    fetchPriority="high"
                    quality={100}
                    unoptimized
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
                    secondContentReady && mainSectionInView
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
                  fetchPriority="high"
                  quality={100}
                  unoptimized
                />
              </motion.div>

              <div className="txt-container">
                <div style={{ overflow: "hidden" }} className="svg">
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={
                      secondContentReady && mainSectionInView
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
                      secondContentReady && mainSectionInView
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
