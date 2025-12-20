"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import JoinWaitlistBtn from "./JoinWaitlistBtn";
import "@/styles/Header.css";
import Link from "next/link";
import { useSectionContext } from "@/app/page";

const logoMap: Record<string, string> = {
  hero: "/svgs/logo-frame-1.svg",
  main: "/svgs/logo-frame-2.svg",
  // spark: "/svgs/logo-frame-3.svg",
  spark: "/svgs/logo-frame-1.svg",
  building: "/svgs/logo-frame-1.svg",
  footer: "/svgs/logo-frame-1.svg",
};

const Header = () => {
  const { activeSection } = useSectionContext();
  const logoSrc = logoMap[activeSection] || logoMap.hero;

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
            <motion.div
              key={logoSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src={logoSrc}
                alt=""
                width={126}
                height={56}
                priority
                loading="eager"
              />
            </motion.div>
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
          <JoinWaitlistBtn />
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
