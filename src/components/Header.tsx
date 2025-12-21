"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import JoinWaitlistBtn from "./JoinWaitlistBtn";
import "@/styles/Header.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const logoMap: Record<string, string> = {
  hero: "/svgs/logo-frame-1.svg",
  main: "/svgs/logo-frame-2.svg",
  spark: "/svgs/logo-frame-3.svg",
  building: "/svgs/logo-frame-1.svg",
  footer: "/svgs/logo-frame-1.svg",
};

interface HeaderProps {
  currentSection: string;
}

const Header = ({ currentSection }: HeaderProps) => {
  const [currentLogo, setCurrentLogo] = useState(logoMap.hero);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRedButton, setIsRedButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      const newLogo = logoMap[currentSection] || logoMap.hero;
      if (newLogo !== currentLogo) {
        setCurrentLogo(newLogo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, isInitialLoad]);

  useEffect(() => {
    if (currentSection === "spark") {
      setIsRedButton(true);
    } else {
      setIsRedButton(false);
    }
  }, [currentSection]);

  return (
    <div className="header">
      <div className="header-wrap">
        <Link href="/" style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.3,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLogo}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Image
                  src={currentLogo}
                  alt=""
                  width={126}
                  height={56}
                  priority
                  fetchPriority="high"
                  quality={100}
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.6,
          }}
        >
          <JoinWaitlistBtn className={isRedButton ? "background-red" : ""} />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
