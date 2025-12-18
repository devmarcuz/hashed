import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/JoinWaitlistFormModal.css";
import Image from "next/image";
import StrokeMoments from "./StrokeMoments";
import {
  CloseIcon,
  GearIcon,
  GlobeIcon,
  MessageIcon,
  ProfileIcon,
  ToggleIcon,
} from "./Svgs";
import { countries as allCountries, type Country } from "@/data/countries";
import CountrySearchModal from "@/components/CountrySearchModal";
import { useModalContext } from "@/contexts/ModalContext";

const ageRanges = [
  "18 - 22",
  "23 - 27",
  "28 - 32",
  "33 - 37",
  "38 - 45",
  "46 - 55",
  "56+",
];

const JoinWaitlistFormModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");

  const ageDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  // Scroll handling for the form section
  useEffect(() => {
    const formSection = formRef.current;
    if (!formSection) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = formSection;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Prevent page scroll when scrolling inside the form
      if (
        (e.deltaY < 0 && isAtTop) || // Scrolling up at top
        (e.deltaY > 0 && isAtBottom) // Scrolling down at bottom
      ) {
        // Allow scroll to propagate only at boundaries
        return;
      }

      // Stop propagation to prevent page scroll
      e.stopPropagation();
    };

    formSection.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      formSection.removeEventListener("wheel", handleWheel);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ageDropdownRef.current &&
        !ageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAgeDropdown(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
        setCountryQuery("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAgeDropdown(false);
        setShowCountryDropdown(false);
        setCountryQuery("");
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  const countries = useMemo(() => {
    if (!countryQuery.trim()) return allCountries;
    const q = countryQuery.toLowerCase();
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [countryQuery]);

  const groupedCountries = useMemo(() => {
    const map = new Map<string, Country[]>();
    for (const c of countries) {
      const k = c.name[0].toUpperCase();
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(c);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [countries]);

  const handleAgeSelect = (age: string) => {
    setSelectedAge(age);
    setShowAgeDropdown(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="join-waitlist-section"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          <motion.section
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <div className="form-wrapper">
              <div className="img-container">
                <Image
                  src="/svgs/modal-img.svg"
                  alt=""
                  width={376}
                  height={184}
                  priority
                  loading="eager"
                />
              </div>

              <div className="content">
                <div className="txt">
                  <h2>
                    be the <span>first</span> to meet <span>through</span>
                  </h2>
                </div>

                <StrokeMoments color="#9B36F1" />

                <div className="txt">
                  <p>
                    Be among the first to try a dating experience built around
                    real moments and real energy.
                  </p>
                </div>
              </div>

              <div className="form" ref={formRef}>
                <div className="field">
                  <label htmlFor="">First name</label>
                  <div className="input">
                    <ProfileIcon />
                    <input
                      type="text"
                      placeholder="john doe"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="">Email</label>
                  <div className="input">
                    <MessageIcon />
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field" ref={ageDropdownRef}>
                  <label htmlFor="">Age range</label>
                  <div className="input">
                    <GearIcon />

                    <div
                      className="wrap"
                      onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                    >
                      <p style={{ color: selectedAge ? "#4e4e4e" : "#9f9f9f" }}>
                        {selectedAge || "select age"}
                      </p>
                      <ToggleIcon />
                    </div>
                  </div>

                  {showAgeDropdown && (
                    <div className="dropdown">
                      <div className="age-grid">
                        {ageRanges.map((age, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`age-option ${
                              selectedAge === age ? "selected" : ""
                            }`}
                            onClick={() => handleAgeSelect(age)}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="field" ref={countryDropdownRef}>
                  <label htmlFor="">Country</label>
                  <div className="input">
                    <GlobeIcon />

                    <div
                      className="wrap"
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                    >
                      <p
                        style={{
                          color: selectedCountry ? "#4e4e4e" : "#9f9f9f",
                        }}
                      >
                        {selectedCountry
                          ? selectedCountry.name
                          : "choose country"}
                      </p>
                      <ToggleIcon />
                    </div>
                  </div>

                  {showCountryDropdown && (
                    <div className="country-modal-wrapper">
                      <CountrySearchModal
                        query={countryQuery}
                        onQueryChange={setCountryQuery}
                        grouped={groupedCountries}
                        selected={selectedCountry ?? allCountries[0]}
                        onPick={(c) => {
                          setSelectedCountry(c);
                          setShowCountryDropdown(false);
                          setCountryQuery("");
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Empty space for scroll padding */}
                <div className="scroll-padding"></div>
              </div>

              <div className="button-wrap">
                <button type="submit" className="submit-btn-wrapper">
                  <div className={`submit-btn`}>
                    <p>Join waitlist</p>
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.56565 0.641601L11.6426 5.71852L6.56565 10.7954M10.9374 5.71852L0.642577 5.71852"
                        stroke="white"
                        strokeWidth="1.28333"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="close-btn" onClick={closeModal}>
              <CloseIcon />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinWaitlistFormModal;
