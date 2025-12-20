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

type SectionType = "hero" | "main" | "spark" | "building" | "footer";

interface SectionContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  registerSection: (section: SectionType, element: HTMLElement | null) => void;
}

export const SectionContext = createContext<SectionContextType>({
  activeSection: "hero",
  setActiveSection: () => {},
  registerSection: () => {},
});

export const useSectionContext = () => useContext(SectionContext);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
  const sectionRefsMap = useRef<Map<SectionType, HTMLElement>>(new Map());

  const registerSection = (
    section: SectionType,
    element: HTMLElement | null
  ) => {
    if (element) {
      sectionRefsMap.current.set(section, element);
    } else {
      sectionRefsMap.current.delete(section);
    }
  };

  // Global section detection observer
  useEffect(() => {
    const sections: SectionType[] = [
      "hero",
      "main",
      "spark",
      "building",
      "footer",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting sections in the header zone
        const intersectingSections = entries
          .filter(
            (entry) => entry.isIntersecting && entry.intersectionRatio > 0
          )
          .map(
            (entry) => entry.target.getAttribute("data-section") as SectionType
          )
          .filter(Boolean);

        // Set the active section to the first one (topmost in viewport)
        if (intersectingSections.length > 0) {
          setActiveSection(intersectingSections[0]);
        }
      },
      {
        rootMargin: "-1px 0px -99% 0px",
        threshold: [0, 0.1],
      }
    );

    // Observe all registered sections
    const observeSections = () => {
      sections.forEach((section) => {
        const element = sectionRefsMap.current.get(section);
        if (element) {
          observer.observe(element);
        }
      });
    };

    const timer = setTimeout(observeSections, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

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

  return (
    <ModalProvider>
      <SectionContext.Provider
        value={{
          activeSection,
          setActiveSection,
          registerSection,
        }}
      >
        <div className="home-page">
          {showLoader && <PageLoad onDone={() => setShowLoader(false)} />}
          <JoinWaitlistFormModal />
          {!showLoader && (
            <main className="scroll-container">
              <Header />
              <HeroSection />
              <div className="main-containers">
                <div className="overlapped-sections">
                  <MainSection />
                  <SparkSection />
                </div>
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
