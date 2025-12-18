/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
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

// Create context for active section
type SectionType = "hero" | "main" | "spark" | "building" | "footer";

interface SectionContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

export const SectionContext = createContext<SectionContextType>({
  activeSection: "hero",
  setActiveSection: () => {},
});

export const useSectionContext = () => useContext(SectionContext);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<SectionType>("hero");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set scroll restoration to manual
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;
    window.__afterMenuClose = undefined;

    // Setup ScrollTrigger proxy
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

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Start RAF loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger after a brief delay
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup
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

  return (
    <ModalProvider>
      <SectionContext.Provider value={{ activeSection, setActiveSection }}>
        <div className="home-page">
          {showLoader && <PageLoad onDone={() => setShowLoader(false)} />}
          <JoinWaitlistFormModal />
          {!showLoader && (
            <main className="scroll-container">
              <Header />
              <HeroSection />
              <div className="main-containers">
                <MainSection />
                <SparkSection />
                <BuildingConnection />
                <Footer />
              </div>
            </main>
          )}
        </div>
      </SectionContext.Provider>
    </ModalProvider>
  );
}
