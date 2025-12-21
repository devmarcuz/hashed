import React, { useRef } from "react";
import "@/styles/BuildingConnection.css";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import NoiseEffect from "./NoiseEffect";

const BuildingConnection = () => {
  const buildImgRef = useRef(null);
  const firstTxtRef = useRef(null);
  const secondTxtRef = useRef(null);
  const thirdTxtRef = useRef(null);
  const buildingSectionRef = useRef<HTMLDivElement>(null);

  const buildImgInView = useInView(buildImgRef, {
    once: false,
    margin: "-100px",
  });

  const firstTxtInView = useInView(firstTxtRef, {
    once: false,
    margin: "-100px",
  });

  const secondTxtInView = useInView(secondTxtRef, {
    once: false,
    margin: "-100px",
  });

  const thirdTxtInView = useInView(thirdTxtRef, {
    once: false,
    margin: "-100px",
  });

  return (
    <div className="building-connection-section" ref={buildingSectionRef}>
      <NoiseEffect />

      <section>
        <div className="content">
          <div style={{ overflow: "hidden" }}>
            <motion.div
              ref={buildImgRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                buildImgInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.2,
              }}
            >
              <Image
                src="/svgs/build.svg"
                alt=""
                width={200}
                height={72}
                priority
                fetchPriority="high"
                quality={100}
                unoptimized
              />
            </motion.div>
          </div>

          <div>
            <motion.div
              className="txt"
              ref={firstTxtRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                firstTxtInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.4,
              }}
            >
              <p>
                Builiding connection doesn&apos;t need louder features… just a
                softer starting point.
              </p>
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="txt"
              ref={secondTxtRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                secondTxtInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.6,
              }}
            >
              <p>
                A space that lets you feel something before you even say a word,
                <br />
                where noticing someone comes naturally, and meeting them
                doesn&apos;t feel forced.
              </p>
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="txt"
              ref={thirdTxtRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                thirdTxtInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.8,
              }}
            >
              <p>Not a new way to talk, but a new way to feel.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildingConnection;
