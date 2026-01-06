"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppProvider";
import { SiFacebook, SiGithub, SiLinkedin, SiLine } from "react-icons/si";
import { MdOutgoingMail, MdPhone } from "react-icons/md";


export default function HeroSectionAboutMe() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const { t } = useApp();
  const text = t("role");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedText("");
    setIndex(0);
  }, [text]);
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100); // typing speed (ms)

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

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
        <h2 className="font-mono text-lg text-green-300 bg-black/40 px-3 py-1 rounded border border-green-400/30">
          {displayedText}
          <span className="animate-pulse px-1 py-1 h-full bg-neutral-500/50"></span>
        </h2>
      </div>

      <p className="text-base text-white/80 leading-relaxed text-justify">
        {t("descriptionAboutMe")}
      </p>

      <p className="text-xs text-white/50">{t("stack")}</p>
      <div className="flex gap-2 flex-wrap ">
        <a
          href={"https://github.com/Thuya-Myint"}
          rel="noopener noreferrer"
          target="_blank"
          className="transition bg-linear-to-br from-black/10 rounded-lg hover:from-neutral-500 hover:shadow-xl shadow-white/20 hover:border-neutral-300 to-black border border-neutral-500 p-2">
          <SiGithub className="text-white/30" />
        </a>

        <a
          href={"https://www.linkedin.com/in/thuya-myint-28ba4639a/"}
          rel="noopener noreferrer"
          target="_blank"
          className="transition bg-linear-to-br from-blue-200/40 rounded-lg hover:from-blue-400 hover:shadow-xl shadow-blue-400/40 hover:border-neutral-300 to-black border border-neutral-500 p-2">
          <SiLinkedin className="text-blue-500" />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&to=thuyamyint2022@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition bg-linear-to-br from-green-200/40 rounded-lg hover:from-green-400 hover:shadow-xl shadow-green-300/40 hover:border-neutral-300 to-black border border-neutral-500 p-2">
          <MdOutgoingMail />
        </a>
        <a
          href="tel:+819070203415"
          aria-label="Call phone"
          title="Call"
          className="transition bg-linear-to-br from-red-200/40 to-black rounded-lg hover:from-red-300 hover:shadow-xl shadow-red-300/40 border border-neutral-500 p-2"
        >
          <MdPhone />
        </a>
        <a
          href={"https://www.facebook.com/thuya.myint.88143/"}
          rel="noopener noreferrer"
          target="_blank"
          className="transition bg-linear-to-br from-blue-500/50 rounded-lg hover:from-blue-700 hover:shadow-xl shadow-blue-400/40 hover:border-neutral-300 to-black border border-neutral-500 p-2">
          <SiFacebook className="text-blue-500" />
        </a>
        <a
          href="https://line.me/ti/p/shomyn0425"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on LINE"
          className="transition bg-linear-to-br from-green-200/40 rounded-lg hover:from-green-500 hover:shadow-xl shadow-green-300/40 hover:border-neutral-300 to-black border border-neutral-500 p-2"
        >
          <SiLine className="text-green-500" />
        </a>
      </div>
    </div >
  );
}
