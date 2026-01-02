"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import tm from "@/assets/images/thuyamyint.png";
import { useApp } from "@/context/AppProvider";

export default function HeroSectionAboutMe() {

    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const { t } = useApp()
    const text = t("role");
    useEffect(() => {
        setDisplayedText("");
        setIndex(0);
    }, [text]);
    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 80); // typing speed (ms)

            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <div className="flex text-2xl items-center font-quicksand gap-6">
            <Image
                src={tm}
                alt="Thuyamyint"
                className="rounded-full border-4 border-neutral-600/0 w-40 h-40 object-cover"
                priority
            />

            <div className="flex flex-col gap-4 max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                    {t("greeting")}<span className="text-green-400">{" " + t("title")}</span>
                </h1>

                <p className="text-sm uppercase tracking-widest text-green-400/80">
                    {t("tagline")}
                </p>

                <div className="w-fit flex items-center">
                    <h2 className="font-mono text-lg text-green-300 bg-black/40 px-3 py-1 rounded border border-green-400/30">
                        {displayedText}
                        <span className="animate-pulse px-1 py-1 h-full bg-neutral-500/50 -ml-2"></span>
                    </h2>
                </div>

                <p className="text-base text-white/80 leading-relaxed text-justify">
                    {t("descriptionAboutMe")}
                </p>

                <p className="text-xs text-white/50">
                    {t("stack")}
                </p>
            </div>
        </div>
    );
}