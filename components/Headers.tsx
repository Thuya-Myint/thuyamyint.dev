"use client";

import { useApp } from "@/context/AppProvider";
import { NAV_ITEMS, P_NAV } from "@/configs/navbar";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { SiTerraform } from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import tm from "@/assets/images/tm.webp";

export default function Header() {
  const { t, locale, toggleLocale } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header
      className={`
        fixed top-0 z-50 w-full
        backdrop-blur-md shadow-lg
        transition-all duration-300
        border-b border-neutral-600/40
        ${hamburgerOpen ? "bg-black/60" : "bg-black/10"}
      `}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-2 text-white">
          <h1 className="text-2xl font-bold font-quicksand">{t("title")}</h1>
          <VscTerminalBash size={20} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4 items-center">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="
                group flex items-center gap-1
                px-3 py-2 text-sm font-quicksand text-white
                transition-all duration-300
                hover:text-black
                hover:bg-linear-to-r hover:from-green-400 hover:to-blue-500
                rounded-lg
              "
            >
              <Icon
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>{t(label)}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:grid grid-cols-2 place-content-center gap-3">
          {/* TM Dropdown */}
          <div className="relative" ref={modalRef}>
            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              aria-label="Toggle profile menu"
              className="
                w-10 h-10 rounded-full overflow-hidden
                shadow-md animate-spin-slow
                hover:scale-110 transition
              "
            >
              <Image src={tm} alt="TM" className="w-full h-full object-cover" />
            </button>

            {isModalOpen && (
              <div
                className="
                  absolute p-2 right-0 w-44
                  rounded-xl bg-[#0b0e14]
                  border border-neutral-700 shadow-xl
                "
              >
                {P_NAV.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="
                      flex items-center gap-2 px-4 py-2 text-white
                      hover:text-black
                      hover:bg-linear-to-r hover:from-green-100 rounded-lg hover:to-blue-100
                      transition
                    "
                  >
                    <Icon size={18} />
                    {t(label)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Locale Switch (Desktop) */}
          <div
            onClick={toggleLocale}
            className="
              relative w-10 h-10 rounded-full cursor-pointer
              bg-neutral-700 text-white
              flex items-center justify-center
              overflow-hidden transition
            "
          >
            <span
              className={`absolute transition-all duration-300 ${locale === "jp" ? "top-2 opacity-100" : "-top-6 opacity-0"
                }`}
            >
              あ
            </span>
            <span
              className={`absolute transition-all duration-300 ${locale === "en" ? "bottom-2 opacity-100" : "-bottom-6 opacity-0"
                }`}
            >
              A
            </span>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setHamburgerOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className={`
            lg:hidden w-10 h-10 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${hamburgerOpen
              ? "rotate-180 text-blue-500 bg-white/20"
              : "text-neutral-300 bg-neutral-700"
            }
          `}
        >
          <SiTerraform size={20} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`
          lg:hidden overflow-hidden
          transition-all duration-300 ease-in-out
          px-8 bg-black/20
          ${hamburgerOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {/* Mobile User Profile */}
        <div className="flex items-center gap-3 py-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
            <Image
              src={tm}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col text-white">
            <span className="text-sm font-semibold">{t("title")}</span>
            <span className="text-xs text-neutral-300">{t("viewProfile")}</span>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="flex flex-col items-start w-full gap-4 py-4 text-white">
          {[...NAV_ITEMS, ...P_NAV].map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setHamburgerOpen(false)}
              className="
                flex items-center w-full gap-2
                text-sm font-medium py-2
                transition hover:text-blue-600
                active:bg-neutral-400 rounded-md px-2
              "
            >
              <Icon size={18} />
              {t(label)}
            </Link>
          ))}
        </nav>

        {/* Locale Switch (Mobile) */}
        <div
          onClick={() => {
            toggleLocale();
            setHamburgerOpen(false);
          }}
          className="
            relative mt-2 mb-4 w-full h-10
            rounded-full cursor-pointer
            bg-neutral-700 text-white
            flex items-center justify-center
            overflow-hidden transition
          "
        >
          <span
            className={`absolute transition-all duration-300 ${locale === "jp" ? "top-2 opacity-100" : "-top-6 opacity-0"
              }`}
          >
            日本語
          </span>
          <span
            className={`absolute transition-all duration-300 ${locale === "en" ? "bottom-2 opacity-100" : "-bottom-6 opacity-0"
              }`}
          >
            English
          </span>
        </div>
      </div>
    </header>
  );
}
