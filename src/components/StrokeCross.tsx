import { motion } from "framer-motion";
import { useState } from "react";

const StrokeCross = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotate: isHovered ? [0, 5, -5, 360] : 0,
      }}
      transition={{
        rotate: {
          duration: isHovered ? 0.6 : 0.3,
          ease: isHovered ? [0.4, 0, 0.2, 1] : "easeOut",
          times: isHovered ? [0, 0.1, 0.2, 1] : undefined,
        },
      }}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M119.566 24.5542L115.634 28.48L80.3467 63.7104L115.634 98.9409L119.566 102.867L102.867 119.566L98.9414 115.633L63.7109 80.3462L28.4805 115.633L24.5547 119.566L7.85547 102.867L11.7881 98.9409L47.0742 63.7104L11.7881 28.48L7.85547 24.5542L24.5547 7.85498L28.4805 11.7876L63.7109 47.0737L98.9414 11.7876L102.867 7.85498L119.566 24.5542Z"
        fill="#EF0000"
        stroke="white"
        strokeWidth="11.1045"
      />
    </motion.svg>
  );
};

export default StrokeCross;
