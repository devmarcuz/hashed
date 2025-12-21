import Image from "next/image";
import JoinWaitlistBtn from "./JoinWaitlistBtn";
import StrokeMoments from "./StrokeMoments";
import Link from "next/link";
import NoiseEffect from "./NoiseEffect";
import "@/styles/Footer.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const hugsImgRef = useRef(null);
  const btnRef = useRef(null);
  const firstTxtRef = useRef(null);
  const secondTxtRef = useRef(null);
  const momentsRef = useRef(null);
  const socialLinksRef = useRef(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);

  const hugsImgInView = useInView(hugsImgRef, {
    once: false,
    margin: "-50px",
  });

  const btnInView = useInView(btnRef, {
    once: false,
    margin: "-50px",
  });

  const firstTxtInView = useInView(firstTxtRef, {
    once: false,
    margin: "-50px",
  });

  const secondTxtInView = useInView(secondTxtRef, {
    once: false,
    margin: "-50px",
  });

  const momentsInView = useInView(momentsRef, {
    once: false,
    margin: "-50px",
  });

  const socialLinksInView = useInView(socialLinksRef, {
    once: false,
    margin: "-0px",
  });

  return (
    <div className="footer" ref={footerSectionRef}>
      <NoiseEffect />

      <section>
        <div className="top-content">
          <motion.div
            ref={hugsImgRef}
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={
              hugsImgInView
                ? { y: 0, opacity: 1, scale: 1 }
                : { y: 80, opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: 1.4,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.2,
            }}
          >
            <Image
              src="/svgs/hugs.svg"
              alt=""
              width={331.6358947753906}
              height={448}
              priority
              fetchPriority="high"
              quality={100}
              unoptimized
            />
          </motion.div>

          <motion.div
            ref={btnRef}
            initial={{ y: 60, opacity: 0 }}
            animate={btnInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.4,
            }}
          >
            <JoinWaitlistBtn className="background-red" />
          </motion.div>

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
                delay: 0.5,
              }}
            >
              <p>Something new is on the way.</p>
            </motion.div>
          </div>

          <div>
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
              <h2>
                don&apos;t <span>miss</span> the first
              </h2>
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              ref={momentsRef}
              initial={{ y: 60, opacity: 0 }}
              animate={
                momentsInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }
              }
              transition={{
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.7,
              }}
            >
              <StrokeMoments color="#29A053" />
            </motion.div>
          </div>
        </div>

        <div className="bottom-content">
          <motion.div
            ref={socialLinksRef}
            initial={{ y: 40, opacity: 0 }}
            animate={
              socialLinksInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }
            }
            transition={{
              duration: 1.2,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.8,
            }}
            style={{ display: "flex", gap: "inherit" }}
          >
            <Link href="/">
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.338 9.89622L20.6249 0.0484876L18.7438 0.180028L12.4184 8.73024L6.34878 1.04677L0 1.49072L9.17722 13.1109L1.53464 23.4371L3.41576 23.3056L10.0967 14.2753L16.5068 22.3902L22.8556 21.9462L13.338 9.89622ZM10.9733 13.0924L10.045 11.9365L2.65808 2.73834L5.54716 2.53632L11.5072 9.95965L12.4355 11.1156L20.1849 20.7657L17.2958 20.9677L10.9733 13.0924Z"
                  fill="#4E4E4E"
                />
              </svg>
            </Link>

            <Link href="/">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9561 5.61389C15.9346 5.30617 16.0362 5.0025 16.2386 4.76969C16.441 4.53688 16.7276 4.394 17.0353 4.37248C17.343 4.35096 17.6467 4.45257 17.8795 4.65495C18.1123 4.85733 18.2552 5.1439 18.2767 5.45162C18.2982 5.75935 18.1966 6.06302 17.9942 6.29583C17.7918 6.52864 17.5053 6.67152 17.1975 6.69304C16.8898 6.71456 16.5862 6.61295 16.3533 6.41057C16.1205 6.20819 15.9777 5.92162 15.9561 5.61389Z"
                  fill="#4E4E4E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3355 6.22887C9.87385 6.33108 8.51263 7.00976 7.55133 8.11561C6.59003 9.22146 6.1074 10.6639 6.20961 12.1256C6.31182 13.5873 6.9905 14.9485 8.09635 15.9098C9.2022 16.8711 10.6446 17.3537 12.1063 17.2515C13.568 17.1493 14.9292 16.4706 15.8905 15.3648C16.8519 14.2589 17.3345 12.8165 17.2323 11.3548C17.1301 9.89311 16.4514 8.53189 15.3455 7.57059C14.2397 6.60929 12.7972 6.12666 11.3355 6.22887ZM7.95003 12.0039C7.88009 11.0038 8.21032 10.0169 8.86805 9.26022C9.52578 8.50358 10.4571 8.03922 11.4573 7.96929C12.4574 7.89935 13.4443 8.22958 14.2009 8.88731C14.9576 9.54504 15.4219 10.4764 15.4918 11.4765C15.5618 12.4766 15.2316 13.4635 14.5738 14.2202C13.9161 14.9768 12.9847 15.4412 11.9846 15.5111C10.9845 15.581 9.99759 15.2508 9.24096 14.5931C8.48432 13.9354 8.01996 13.004 7.95003 12.0039Z"
                  fill="#4E4E4E"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.079 0.676866C12.9928 0.510704 8.90082 0.796847 4.87752 1.53008C2.56129 1.95438 0.804438 3.92527 0.694666 6.29051C0.502027 10.4368 0.79255 14.5915 1.56037 18.6707C1.99825 20.9976 4.01115 22.7049 6.36505 22.8027C10.4512 22.9679 14.5431 22.6817 18.5666 21.9494C20.8828 21.5251 22.6396 19.5542 22.7494 17.189C22.942 13.0427 22.6515 8.888 21.8837 4.80882C21.4458 2.48189 19.4329 0.774605 17.079 0.676866ZM5.19102 3.24543C9.0873 2.5354 13.0501 2.25829 17.0073 2.41915C18.5627 2.48528 19.8835 3.61601 20.1702 5.13268C20.9138 9.07793 21.1948 13.0964 21.0076 17.1068C20.9669 17.8617 20.6729 18.5809 20.173 19.1481C19.6732 19.7154 18.9968 20.0975 18.253 20.2329C14.3567 20.943 10.3939 21.2201 6.43668 21.0592C5.68127 21.0287 4.95821 20.7443 4.38432 20.2522C3.81042 19.76 3.41919 19.0888 3.27383 18.3468C2.53024 14.4016 2.24924 10.3831 2.43652 6.37275C2.47721 5.61781 2.77121 4.89864 3.27103 4.3314C3.77084 3.76416 4.44721 3.38081 5.19102 3.24543Z"
                  fill="#4E4E4E"
                />
              </svg>
            </Link>

            <Link href="/">
              <svg
                width="16"
                height="25"
                viewBox="0 0 16 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3045 5.18908L10.8318 5.43191C10.2046 5.47577 9.73133 6.01958 9.77523 6.64737L10.0539 10.6324L14.6626 10.3101L14.2943 14.7449L10.3613 15.0199L10.9241 23.0684L5.85562 23.4229L5.29281 15.3743L1.10855 15.6669L0.801744 11.2793L4.93171 10.9906L4.69482 6.82271L4.63441 6.06666C4.58654 5.4666 4.65806 4.863 4.84483 4.29074C5.03159 3.71848 5.3299 3.1889 5.72253 2.7326C6.11515 2.27629 6.5943 1.90232 7.13229 1.63227C7.67029 1.36222 8.25646 1.20146 8.85695 1.15926L13.9976 0.799795L14.3045 5.18908Z"
                  stroke="#4E4E4E"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link href="/">
              <svg
                width="21"
                height="25"
                viewBox="0 0 21 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5574 9.19137C19.5752 9.44549 19.3819 9.6691 19.1269 9.67416C17.7644 9.70104 16.4128 9.42696 15.1683 8.87148C14.8316 8.72091 14.435 8.97499 14.4608 9.34347L14.9112 15.7843C15.0056 17.1353 14.703 18.4845 14.0408 19.6659C13.3785 20.8472 12.3854 21.8093 11.1835 22.4336C9.98172 23.058 8.6236 23.3175 7.27625 23.1802C5.92889 23.0429 4.65104 22.5148 3.59987 21.6608C2.5487 20.8069 1.77005 19.6643 1.35968 18.3736C0.949321 17.0829 0.925142 15.7005 1.29012 14.3962C1.6551 13.092 2.39332 11.9229 3.41399 11.0327C4.43466 10.1425 5.69326 9.57 7.03499 9.38566C7.09501 9.37826 7.15591 9.38332 7.21389 9.40051C7.27187 9.41769 7.32569 9.44665 7.37197 9.48556C7.41826 9.52448 7.45604 9.57252 7.48293 9.62668C7.50982 9.68085 7.52526 9.73998 7.52829 9.80038L7.75445 13.0346C7.77222 13.2888 7.5786 13.5078 7.32969 13.5669C6.81451 13.6911 6.34556 13.9599 5.97812 14.3417C5.61069 14.7236 5.36008 15.2025 5.25587 15.7221C5.15165 16.2417 5.19816 16.7802 5.38991 17.2742C5.58166 17.7682 5.91067 18.1971 6.33813 18.5103C6.76559 18.8235 7.27369 19.008 7.80252 19.0419C8.33136 19.0759 8.85887 18.9579 9.32288 18.702C9.78689 18.446 10.168 18.0627 10.4214 17.5973C10.6748 17.1319 10.7898 16.6037 10.7528 16.0751L9.73511 1.52086C9.72654 1.39832 9.767 1.27739 9.84759 1.18468C9.92818 1.09198 10.0423 1.03508 10.1648 1.02651L13.3991 0.800348C13.5229 0.79486 13.6442 0.835701 13.7395 0.914895C13.8347 0.994089 13.897 1.10595 13.9142 1.22862C14.105 2.40472 14.702 3.47676 15.6013 4.25832C16.5006 5.03989 17.6454 5.48154 18.8366 5.5065C19.0924 5.51183 19.3146 5.70174 19.3324 5.95702L19.5574 9.19137Z"
                  stroke="#4E4E4E"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
