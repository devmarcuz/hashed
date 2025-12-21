import React, { useRef, useEffect, useState } from "react";
import "@/styles/SparkSection.css";
import NoiseEffect from "./NoiseEffect";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const SparkSection = () => {
  const sparkSectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const bottomControls = useAnimation();
  const txtControls = useAnimation();
  const fireControls = useAnimation();

  useEffect(() => {
    if (!sparkSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            bottomControls.start({ y: 0, opacity: 1 }).then(() => {
              txtControls.start({ y: 0, opacity: 1 }).then(() => {
                fireControls.start({ scale: 1, opacity: 1 });
              });
            });
          } else {
            setIsInView(false);
            fireControls.start({ scale: 0, opacity: 0 });
            txtControls.start({ y: 30, opacity: 0 });
            bottomControls.start({ y: 100, opacity: 0 });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(sparkSectionRef.current);

    return () => observer.disconnect();
  }, [bottomControls, txtControls, fireControls]);

  return (
    <div className="spark-section" ref={sparkSectionRef}>
      <motion.div
        className="bottom-content"
        initial={{ y: 100, opacity: 0 }}
        animate={bottomControls}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bottom-img">
          <Image
            src="/svgs/treehouse.svg"
            alt=""
            width={690.7005004882812}
            height={313}
            className="tree-house-img"
            priority
            fetchPriority="high"
            quality={100}
            unoptimized
          />

          <Image
            src="/svgs/heart_pin.svg"
            alt=""
            width={83.80799865722656}
            height={104}
            className="heart-img"
            priority
            fetchPriority="high"
            quality={100}
            unoptimized
          />
        </div>
      </motion.div>

      <NoiseEffect />

      <section>
        <div className="top-content">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={fireControls}
            transition={{ duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }}
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

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="txt"
              initial={{ y: 30, opacity: 0 }}
              animate={txtControls}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
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
              initial={{ y: 30, opacity: 0 }}
              animate={txtControls}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
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
              initial={{ y: 30, opacity: 0 }}
              animate={txtControls}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
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
