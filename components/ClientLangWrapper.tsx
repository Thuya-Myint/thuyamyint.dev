"use client";

import { useApp } from "@/context/AppProvider";
import { ReactNode, useEffect, useState } from "react";

export default function ClientLangWrapper({ children }: { children: ReactNode }) {
    const { locale } = useApp();
    const [lang, setLang] = useState("en");

    useEffect(() => {
        setLang(locale);
        document.documentElement.lang = locale;
    }, [locale]);

    return <>{children}</>;
}