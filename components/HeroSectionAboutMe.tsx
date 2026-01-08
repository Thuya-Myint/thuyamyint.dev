"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useApp } from "@/context/AppProvider";
import { SiFacebook, SiGithub, SiLinkedin, SiLine } from "react-icons/si";
import { MdOutgoingMail, MdPhone } from "react-icons/md";
import Image from "next/image";

type ContactItem = {
  id: string;
  href: string;
  className: string;
  icon: React.ReactNode;
  external?: boolean;
};

export default function HeroSectionAboutMe() {
  const { t } = useApp();

  /* ---------------- Safe Typing Effect ---------------- */
  // 1. Ensure text is a string, default to empty string if t() returns null/undefined
  const text = t("role") || "";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    // 2. CRITICAL FIX: Guard clause. 
    // If text is missing or index is out of bounds, stop.
    if (!text || index >= text.length) return;

    const timeout = setTimeout(() => {
      // 3. CRITICAL FIX: Safe access using charAt prevents undefined errors
      const nextChar = text.charAt(index);
      setDisplayedText((prev) => prev + nextChar);
      setIndex((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timeout);
  }, [index, text]);

  /* ---------------- Clicked Contact ---------------- */
  const [clickedContact, setClickedContact] = useState<string>("");

  const handleClick = useCallback((id: string) => {
    setClickedContact(id);
  }, []);

  /* ---------------- Contact Config ---------------- */
  const contacts: ContactItem[] = useMemo(
    () => [
      {
        id: "github",
        href: "https://github.com/Thuya-Myint",
        className:
          "bg-linear-to-br from-black/10 to-black shadow-white/20 hover:from-neutral-500 hover:shadow-xl",
        icon: <SiGithub className="text-white/30" />,
      },
      {
        id: "linkedin",
        href: "https://www.linkedin.com/in/thuya-myint-28ba4639a/",
        className:
          "bg-linear-to-br from-blue-200/40 to-black shadow-blue-400/40 hover:from-blue-400 hover:shadow-xl",
        icon: <SiLinkedin className="text-blue-500" />,
      },
      {
        id: "email",
        href: "https://mail.google.com/mail/?view=cm&to=thuyamyint2022@gmail.com",
        className:
          "bg-linear-to-br from-green-200/40 to-black shadow-green-300/40 hover:from-green-400 hover:shadow-xl",
        icon: <MdOutgoingMail className="text-green-400" />,
      },
      {
        id: "phone",
        href: "tel:+819070203415",
        className:
          "bg-linear-to-br from-red-200/40 to-black shadow-red-300/40 hover:from-red-300 hover:shadow-xl",
        icon: <MdPhone className="text-red-400" />,
        external: false, // Phone links usually stay in same context or trigger app
      },
      {
        id: "facebook",
        href: "https://www.facebook.com/thuya.myint.88143/",
        className:
          "bg-linear-to-br from-blue-500/50 to-black shadow-blue-400/40 hover:from-blue-700 hover:shadow-xl",
        icon: <SiFacebook className="text-blue-500" />,
      },
      {
        id: "line",
        href: "https://line.me/ti/p/shomyn0425",
        className:
          "bg-linear-to-br from-green-200/40 to-black shadow-green-300/40 hover:from-green-500 hover:shadow-xl",
        icon: <SiLine className="text-green-500" />,
      },
      {
        id: "nexa",
        href: "https://nexacoreitsolution.com/thuyamyint",
        className:
          "bg-linear-to-br from-purple-300/40 to-black shadow-purple-300/40 hover:from-purple-500 hover:shadow-xl",
        icon: (
          <Image
            src="https://res.cloudinary.com/dnqq3putc/image/upload/v1767749609/nexa_gsjaqw.png"
            alt="Nexa Core IT Solution"
            width={32}
            height={32}
          />
        ),
      },
    ],
    []
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="flex text-2xl flex-col lg:max-w-2xl w-full items-start font-quicksand gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-white">
        {t("greeting")}
        <span className="text-green-400">{" " + t("title")}</span>
      </h1>

      <p className="text-sm uppercase tracking-widest text-green-400/80">
        {t("tagline")}
      </p>

      <div className="w-fit flex items-center">
        {/* Added min-h to prevent layout shift during typing */}
        <h2 className="font-mono text-lg text-green-300 bg-black/40 px-3 py-1 rounded border border-green-400/30 min-h-[38px] flex items-center">
          {displayedText}
          <span className="animate-pulse px-1 py-1 h-5 w-2 ml-1 bg-neutral-500/50 inline-block" />
        </h2>
      </div>

      <p className="text-base text-white/80 leading-relaxed text-justify">
        {t("descriptionAboutMe")}
      </p>

      <p className="text-xs text-white/50">{t("stack")}</p>

      <div className="grid grid-cols-7 gap-2">
        {contacts.map(({ id, href, className, icon, external }) => {
          const isActive = clickedContact === id;

          // Determine target behavior
          const isExternal = external !== false; // Default to true if undefined

          return (
            <a
              key={id}
              href={href}
              // Force _blank for external to keep your app alive in the previous tab
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={() => handleClick(id)}
              className={`
                transition rounded-lg border border-neutral-500
                flex items-center justify-center p-1
                ${className}
                ${isActive ? "shadow-xl ring-1 ring-white/30" : ""}
              `}
            >
              {icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}