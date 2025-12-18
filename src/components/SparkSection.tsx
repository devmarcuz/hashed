import React, { useRef, useEffect, useState } from "react";
import "@/styles/SparkSection.css";
import NoiseEffect from "./NoiseEffect";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useSectionContext } from "@/app/page";

const SparkSection = () => {
  const firstTxtRef = useRef(null);
  const secondTxtRef = useRef(null);
  const thirdTxtRef = useRef(null);
  const treeHouseRef = useRef(null);
  const heartPinRef = useRef(null);
  const sparkSectionRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useSectionContext();
  const [bottomContentReady, setBottomContentReady] = useState(false);

  const treeHouseInView = useInView(treeHouseRef, {
    once: false,
    margin: "-100px",
  });

  const heartPinInView = useInView(heartPinRef, {
    once: false,
    margin: "-100px",
  });

  // Trigger top content after bottom content animations complete
  useEffect(() => {
    if (treeHouseInView) {
      const timer = setTimeout(() => {
        setBottomContentReady(true);
      }, 1400); // Treehouse (1.4s) completes, then immediately trigger top content
      return () => clearTimeout(timer);
    }
    if (!treeHouseInView) {
      const timer = setTimeout(() => {
        setBottomContentReady(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [treeHouseInView]);

  // Observer for section detection
  useEffect(() => {
    if (!sparkSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.boundingClientRect.top <= 100) {
            setActiveSection("spark");
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 0.9, 1],
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    observer.observe(sparkSectionRef.current);

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="spark-section" ref={sparkSectionRef}>
      <div className="bottom-content">
        <div style={{ overflow: "hidden" }}>
          <motion.div
            ref={treeHouseRef}
            initial={{ y: 100, opacity: 0 }}
            animate={
              treeHouseInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
            }
            transition={{
              duration: 1.4,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.3,
            }}
          >
            <Image
              src="/svgs/treehouse.svg"
              alt=""
              width={690.7005004882812}
              height={313}
              className="tree-house-img"
              priority
              loading="eager"
            />
          </motion.div>
        </div>

        <Image
          src="/svgs/heart_pin.svg"
          alt=""
          width={83.80799865722656}
          height={104}
          className="heart-img"
          priority
          loading="eager"
        />
      </div>

      <NoiseEffect />

      <section>
        <div className="top-content">
          <div style={{ overflow: "hidden" }}>
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 40 }}
              animate={
                bottomContentReady
                  ? { scale: 1, opacity: 1, y: 0 }
                  : { scale: 0, opacity: 0, y: 40 }
              }
              transition={{
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0,
              }}
            >
              <Image
                src="/svgs/fire.svg"
                alt=""
                className="fire"
                width={35.96724319458008}
                height={56}
                priority
                loading="eager"
              />
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="txt"
              ref={firstTxtRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                bottomContentReady
                  ? { y: 0, opacity: 1 }
                  : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.1,
              }}
            >
              <p>
                Maybe the spark isn&apos;t found in long bios, algorithms, or
                perfectly crafted messages.
              </p>
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="txt"
              ref={secondTxtRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                bottomContentReady
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
                Maybe it&apos;s hidden in the unnoticed parts of your day, the
                kind you only recognize in hindsight.
              </p>
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="txt"
              ref={thirdTxtRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                bottomContentReady
                  ? { y: 0, opacity: 1 }
                  : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.5,
              }}
            >
              <p>
                And maybe that&apos;s where everything should begin again… In
                the moments we overlook, but never really forget.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SparkSection;
