"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/PageLoad.css";
import Image from "next/image";
import NoiseEffect from "./NoiseEffect";

type Props = { onDone?: () => void };

const TOTAL_DURATION = 4000;
const FRAME_TRANSITION_START = 500;
const FRAME_TRANSITION_DURATION = 1500;
const HOLD_DURATION = 1000;
const IMG_FADE_DURATION = 800;
const LOADER_FADE_DURATION = 200;

export default function PageLoad({ onDone }: Props) {
  const [show, setShow] = useState(true);
  const [frame1Opacity, setFrame1Opacity] = useState(1);
  const [frame2Opacity, setFrame2Opacity] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setFrame1Opacity(0);
      setFrame2Opacity(1);
    }, FRAME_TRANSITION_START);

    const imgFadeTimer = setTimeout(() => {
      setImgOpacity(0);
    }, FRAME_TRANSITION_START + FRAME_TRANSITION_DURATION + HOLD_DURATION);

    const exitTimer = setTimeout(() => {
      setShow(false);
    }, FRAME_TRANSITION_START + FRAME_TRANSITION_DURATION + HOLD_DURATION + IMG_FADE_DURATION * 0.9);

    const doneTimer = setTimeout(() => {
      onDone?.();
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(imgFadeTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: LOADER_FADE_DURATION / 1000,
            ease: "easeInOut",
          }}
        >
          <NoiseEffect />

          <motion.div
            className="relative"
            animate={{ opacity: imgOpacity }}
            transition={{
              duration: IMG_FADE_DURATION / 1000,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: frame2Opacity }}
              transition={{
                duration: FRAME_TRANSITION_DURATION / 1000,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/svgs/logo-frame-2.svg"
                alt="Logo Frame 2"
                width={140}
                height={62}
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: frame1Opacity }}
              transition={{
                duration: FRAME_TRANSITION_DURATION / 1000,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/svgs/logo-frame-1.svg"
                alt="Logo Frame 1"
                width={140}
                height={62}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
