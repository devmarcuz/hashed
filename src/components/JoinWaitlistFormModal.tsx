import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/JoinWaitlistFormModal.css";
import Image from "next/image";
import StrokeMoments from "./StrokeMoments";
import Toast from "./Toast";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const ageDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName.trim()) {
      showToast("Please enter your first name", "error");
      return;
    }

    if (!email.trim()) {
      showToast("Please enter your email", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (!selectedAge) {
      showToast("Please select your age range", "error");
      return;
    }

    if (!selectedCountry) {
      showToast("Please select your country", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://app.amiyoo.com/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_AMIYOO_API_KEY || "",
        },
        body: JSON.stringify({
          first_name: firstName,
          email: email,
          age_range: selectedAge.replace(/\s/g, ""),
          country: selectedCountry.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || "Failed to join waitlist", "error");
        return;
      }

      showToast("Successfully joined the waitlist! 🎉", "success");

      setTimeout(() => {
        setFirstName("");
        setEmail("");
        setSelectedAge("");
        setSelectedCountry(null);
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error joining waitlist:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const formSection = formRef.current;
    if (!formSection) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = formSection;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        return;
      }

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
    <>
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
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={toast.isVisible}
              onClose={hideToast}
            />
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
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="img-container">
                  <Image
                    src="/svgs/modal-img.svg"
                    alt=""
                    width={376}
                    height={184}
                    priority
                    quality={100}
                    unoptimized // For SVGs, this prevents Next.js optimization that can cause delays
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
                    <label htmlFor="firstName">First name</label>
                    <div className="input">
                      <ProfileIcon />
                      <input
                        id="firstName"
                        type="text"
                        placeholder="john doe"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <div className="input">
                      <MessageIcon />
                      <input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="field" ref={ageDropdownRef}>
                    <label htmlFor="ageRange">Age range</label>
                    <div className="input">
                      <GearIcon />

                      <div
                        className="wrap"
                        onClick={() =>
                          !isSubmitting && setShowAgeDropdown(!showAgeDropdown)
                        }
                        style={{
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                      >
                        <p
                          style={{ color: selectedAge ? "#4e4e4e" : "#9f9f9f" }}
                        >
                          {selectedAge || "select age"}
                        </p>
                        <ToggleIcon />
                      </div>
                    </div>

                    {showAgeDropdown && !isSubmitting && (
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
                    <label htmlFor="country">Country</label>
                    <div className="input">
                      <GlobeIcon />

                      <div
                        className="wrap"
                        onClick={() =>
                          !isSubmitting &&
                          setShowCountryDropdown(!showCountryDropdown)
                        }
                        style={{
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
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

                    {showCountryDropdown && !isSubmitting && (
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

                  <div className="scroll-padding"></div>
                </div>

                <div className="button-wrap">
                  <button
                    type="submit"
                    className="submit-btn-wrapper"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.6 : 1 }}
                  >
                    <div className={`submit-btn`}>
                      <p>{isSubmitting ? "Joining..." : "Join waitlist"}</p>
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
              </form>
              <div className="close-btn" onClick={closeModal}>
                <CloseIcon />
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JoinWaitlistFormModal;
