"use client";

import { useApp } from "@/context/AppProvider";
import { NAV_ITEMS, P_NAV } from "@/configs/navbar";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { SiTerraform } from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import tm from "@/assets/images/tm.webp";

import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const { t, locale, toggleLocale } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  // Intersection Observer for active section tracking on Home page
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: [0, 0.1, 0.5, 1.0],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["intro", "projects", "experiences"];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      setActiveSection("");
    };
  }, [pathname]);

  // Update sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;

      const activeBtn = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeBtn) {
        setIndicatorStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1,
        });
      } else {
        setIndicatorStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      }
    };

    const timeout = setTimeout(updateIndicator, 100);
    window.addEventListener("resize", updateIndicator);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname, activeSection, locale]);

  const handleNavClick = (href: string, scroll?: boolean) => {
    if (!scroll) {
      router.push(href);
      setHamburgerOpen(false);
      return;
    }

    if (pathname !== "/") {
      router.push(`/#${href}`);
    } else {
      const el = document.getElementById(href);
      if (el) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }

    setHamburgerOpen(false);
  };

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
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Logo */}
        <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => handleNavClick("/", false)}>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <VscTerminalBash className="text-4xl" />
        </div>

        {/* Desktop Nav with Sliding Indicator */}
        <nav ref={navRef} className="hidden lg:flex gap-2 items-center relative p-1 bg-white/5 rounded-xl border border-white/5">
          {/* Sliding Background Div */}
          <div
            className="absolute h-[calc(100%-8px)] bg-linear-to-r from-green-400 to-blue-500 rounded-lg transition-all duration-500 ease-in-out z-0 shadow-[0_0_20px_rgba(74,222,128,0.4)]"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
          />

          {NAV_ITEMS.map(({ label, href, icon: Icon, scroll }) => {
            const isActive =
              (pathname === href) ||
              (scroll && pathname === "/" && activeSection === href);

            return (
              <button
                key={label}
                data-active={isActive}
                onClick={() => handleNavClick(href, scroll)}
                className={`
                  group relative z-10 flex cursor-pointer items-center gap-2
                  px-5 py-2 text-sm transition-colors duration-500
                  rounded-lg
                  ${isActive ? "text-black font-bold" : "text-white/70 hover:text-white"}
                `}
              >
                <Icon
                  size={18}
                  className={`transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span>{t(label)}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden cursor-pointer lg:grid grid-cols-2 place-content-center gap-3">
          <div className="relative cursor-pointer" ref={modalRef}>
            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              aria-label="Toggle profile menu"
              className="
                w-10 h-10 rounded-full cursor-pointer overflow-hidden
                shadow-md animate-spin-slow
                hover:scale-110 transition
              "
            >
              <Image src={tm} alt="TM" className="cursor-pointer w-full h-full object-cover" />
            </button>

            {isModalOpen && (
              <div
                className="
                  absolute p-2 right-0 w-44 mt-2
                  rounded-xl bg-[#0b0e14]
                  border border-neutral-700 shadow-xl z-50
                "
              >
                {P_NAV.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsModalOpen(false)}
                    className="
                      flex items-center cursor-pointer gap-2 px-4 py-2 text-white
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

          <div
            onClick={toggleLocale}
            className="
              relative w-10 h-10 rounded-full cursor-pointer
              bg-neutral-700 text-white
              flex items-center justify-center
              overflow-hidden transition
            "
          >
            <span className={`absolute transition-all duration-300 ${locale === "jp" ? "top-2 opacity-100" : "-top-6 opacity-0"}`}>あ</span>
            <span className={`absolute transition-all duration-300 ${locale === "en" ? "bottom-2 opacity-100" : "-bottom-6 opacity-0"}`}>A</span>
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
            ${hamburgerOpen ? "rotate-180 text-blue-500 bg-white/20" : "text-neutral-300 bg-neutral-700"}
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
          px-8 bg-black/90 backdrop-blur-xl
          ${hamburgerOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex items-center gap-3 py-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
            <Image src={tm} alt="User profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm font-semibold">{t("title")}</span>
            <span className="text-xs text-neutral-300">{t("viewProfile")}</span>
          </div>
        </div>

        <nav className="flex flex-col items-start w-full gap-4 py-6 text-white">
          {[...NAV_ITEMS, ...P_NAV].map(({ label, href, icon: Icon, scroll }) => {
            const isActive =
              (pathname === href) ||
              (scroll && pathname === "/" && activeSection === href);

            return (
              <button
                key={label}
                onClick={() => handleNavClick(href, scroll)}
                className={`
                  flex items-center w-full gap-3
                  text-sm font-medium py-3 px-4 rounded-xl
                  transition-all duration-300
                  ${isActive ? "bg-linear-to-r from-green-400/20 to-blue-500/20 text-blue-400 border border-blue-500/30" : "hover:bg-white/5"}
                `}
              >
                <Icon size={18} className={isActive ? "text-blue-400" : ""} />
                {t(label)}
              </button>
            );
          })}
        </nav>

        <div
          onClick={() => {
            toggleLocale();
            setHamburgerOpen(false);
          }}
          className="relative mt-2 mb-8 w-full h-12 rounded-xl cursor-pointer bg-neutral-800 text-white flex items-center justify-center overflow-hidden transition"
        >
          <span className={`absolute transition-all duration-300 ${locale === "jp" ? "top-3 opacity-100" : "-top-6 opacity-0"}`}>日本語</span>
          <span className={`absolute transition-all duration-300 ${locale === "en" ? "bottom-3 opacity-100" : "-bottom-6 opacity-0"}`}>English</span>
        </div>
      </div>
    </header>
  );
}
