"use client"
import { useApp } from "@/context/AppProvider"
import { NAV_ITEMS, P_NAV } from '@/configs/navbar.config'
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
// Tech stack icons
import { SiReact, SiNextdotjs, SiExpress, SiGo, SiMongodb, SiPostgresql, SiTerraform, SiGithubactions } from "react-icons/si"
import { FaAws } from "react-icons/fa"
import tm from "@/assets/images/tm.webp"
import { VscTerminalBash } from "react-icons/vsc";
import { TbLanguage } from "react-icons/tb";

export default function Header() {
    const { t, locale, toggleLocale } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const techStack = [
        { icon: SiReact, color: "#61DAFB" },
        { icon: SiNextdotjs, color: "#FFFFFF9D" },
        { icon: SiExpress, color: "#FFFFFF" },
        { icon: SiGo, color: "#00ADD8" },
        { icon: SiMongodb, color: "#47A248" },
        { icon: SiPostgresql, color: "#71B0E3" },
        { icon: SiTerraform, color: "#7B42BC" },
        { icon: FaAws, color: "#FF9900" },
        { icon: SiGithubactions, color: "#2088FF" },
    ];

    return (
        <header className="flex justify-between items-center px-6 py-4 backdrop-blur-3xl backdrop-blur-md shadow-lg text-white fixed w-full z-50">
            {/* Left: Title + Tech Stack */}
            <div className="flex items-center gap-1">
                <h1 className="text-2xl font-bold font-quicksand relative">{t("title")}</h1>

                <VscTerminalBash size={20} />
                {/* Mini tech stack icons overlapping */}
                {/* <div className="flex -space-x-4 ml-2">
                    {techStack.map(({ icon: Icon, color }, idx) => (
                        <div
                            key={idx}
                            className="w-10 h-10 bg-neutral-600 border-4 border-black rounded-full flex items-center justify-center"
                            style={{ zIndex: techStack.length + idx }}
                        >
                            <Icon size={14} style={{ color }} />
                        </div>
                    ))}
                </div> */}
            </div>

            {/* Center Nav + Right TM */}

            {/* Center Navigation */}
            <nav className="flex gap-4 items-center">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex capitalize items-center gap-1 px-3 py-2 text-sm font-quicksand rounded-t-lg
                         hover:bg-linear-to-r hover:from-green-400 hover:to-blue-500 hover:text-black
                         transition-all duration-300 relative group"
                    >
                        <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative z-10">{t(label)}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-2">
                {/* Right: TM Logo with dropdown */}
                <div className="relative" ref={modalRef}>
                    <button
                        onClick={() => setIsModalOpen((prev) => !prev)}
                        className="w-8 h-8 rounded-full shadow-md
                       flex items-center justify-center font-bold text-sm select-none
                       animate-spin-slow hover:scale-110 hover:shadow-[0_0_15px_rgba(34,197,94,0.7)]
                       transition-all duration-300 overflow-hidden"
                    >
                        <Image src={tm} alt="TM" className="rounded-full w-8 h-8" />
                    </button>

                    {/* Dropdown modal under TM */}
                    {isModalOpen && (
                        <div

                            className="absolute right-0 mt-2 w-44 bg-[#0b0e14] border border-neutral-700 rounded-xl shadow-xl text-white z-50"
                        >
                            <ul className="flex flex-col">
                                {P_NAV.map(({ label, href, icon: Icon }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-black transition"
                                        >
                                            <Icon size={18} />
                                            <span>{t(label)}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="cursor-pointer md:flex hidden relative overflow-hidden text-lg text-white  hover:text-neutral-500 transition active:text-white active:border-4 border-white/30 bg-neutral-700 w-10 h-10 flex items-center justify-center rounded-full"
                    onClick={toggleLocale}
                >
                    <span className={`transition-all duration-500 absolute ${locale === "jp" ? "top-1.25 opacity-100" : "-top-6 opacity-0"}`}>あ</span>
                    <span className={`transition-all duration-500 absolute ${locale === "en" ? "bottom-1.25 opacity-100" : "-bottom-6 opacity-0"}`}>A</span>
                </div>
            </div>

        </header >
    )
}