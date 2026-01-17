"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Handle initial load and hash changes
    const timeoutId = setTimeout(handleScroll, 500); // Give it some time to render

    window.addEventListener("hashchange", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [pathname]);

  return null;
}
