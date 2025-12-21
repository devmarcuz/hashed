/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/Home.css";
import PageLoad from "@/components/PageLoad";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MainSection from "@/components/Main";
import SparkSection from "@/components/SparkSection";
import BuildingConnection from "@/components/BuildingConnection";
import Footer from "@/components/Footer";
import JoinWaitlistFormModal from "@/components/JoinWaitlistFormModal";
import { ModalProvider } from "@/contexts/ModalContext";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
    __afterMenuClose?: (() => void) | undefined;
  }
}

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<string>("hero");

  const heroRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;
    window.__afterMenuClose = undefined;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return (lenis as any).scroll as number;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(refreshTimer);
      lenis.destroy();
      try {
        if (window.__lenis === lenis) {
          window.__lenis = undefined;
        }
      } catch {}
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    if (showLoader) return;

    const checkCurrentSection = () => {
      const headerHeight = 100;

      const scrollableSections = [
        { ref: mainRef, name: "main" },
        { ref: sparkRef, name: "spark" },
        { ref: buildingRef, name: "building" },
        { ref: footerRef, name: "footer" },
      ];

      for (let i = 0; i < scrollableSections.length; i++) {
        const section = scrollableSections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();

          if (rect.top <= headerHeight && rect.bottom > headerHeight) {
            setCurrentSection(section.name);
            return;
          }
        }
      }

      setCurrentSection("hero");
    };

    checkCurrentSection();

    const handleScroll = () => {
      requestAnimationFrame(checkCurrentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showLoader]);

  return (
    <ModalProvider>
      <div className="home-page">
        {showLoader && <PageLoad onDone={() => setShowLoader(false)} />}
        <JoinWaitlistFormModal />
        {!showLoader && (
          <main className="scroll-container">
            <Header currentSection={currentSection} />
            <div ref={heroRef}>
              <HeroSection />
            </div>
            <div className="main-containers">
              <div className="overlapped-sections">
                <div ref={mainRef}>
                  <MainSection />
                </div>
                <div ref={sparkRef}>
                  <SparkSection />
                </div>
              </div>
              <div ref={buildingRef}>
                <BuildingConnection />
              </div>
              <div ref={footerRef}>
                <Footer />
              </div>
            </div>
          </main>
        )}
      </div>
    </ModalProvider>
  );
}
