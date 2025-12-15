"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import JoinWaitlistBtn from "./JoinWaitlistBtn";
import "@/styles/Header.css";
import Link from "next/link";

const Header = () => {
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
            <Image
              src="/svgs/logo-frame-1.svg"
              alt=""
              width={126}
              height={56}
            />
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
