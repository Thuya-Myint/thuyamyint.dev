import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from "@/components/Headers";
import { AppProvider } from "@/context/AppProvider";
import "./globals.css";
import Footer from "@/components/Footer";

/* ================= FONT ================= */
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

/* ================= METADATA ================= */
export const metadata: Metadata = {
  title: "Thuya Myint – Developer Portfolio",
  description: "Welcome to my portfolio and projects showcase.",
  openGraph: {
    title: "Thuya Myint – Developer Portfolio",
    description: "Welcome to my portfolio and projects showcase.",
    url: "https://www.thuyamyint.dev",
    siteName: "Thuya Myint",
    type: "website",
    images: [
      {
        url: "https://www.thuyamyint.dev/assets/share.png",
        width: 1200,
        height: 630,
        alt: "Thuya Myint Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thuya Myint – Developer Portfolio",
    description: "Welcome to my portfolio and projects showcase.",
    images: ["https://www.thuyamyint.dev/assets/share.png"],
  },
};



/* ================= ROOT LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={quicksand.variable}>
      <body className="bg-black text-white antialiased">
        <AppProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <div>

            </div>
            {/* ================= BACKGROUND ================= */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />

              {/* Diagonal cinematic texture */}
              <div className="absolute inset-0 opacity-35 animate-diagonal-light">
                <div
                  className="absolute inset-[-50%]"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        135deg,
                        rgba(255,255,255,0.06) 0px,
                        rgba(255,255,255,0.06) 1px,
                        transparent 1px,
                        transparent 90px
                      )
                    `,
                  }}
                />
              </div>

              {/* ================= MOVING GLOW BUBBLES (UPDATED FOR MORE GLOW) ================= */}
              <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden">
                {/* Changes made for "more glow":
                    1. Increased size (w-72 -> w-80)
                    2. Increased color opacity (bg-emerald-500/20 -> bg-emerald-500/40)
                    3. Increased overall opacity (opacity-40 -> opacity-70)
                 */}

                {/* Green/Emerald Bubble */}
                <div className="absolute top-[20%] left-[15%] w-80 h-80 bg-white/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob" />

                {/* Blue/Cyan Bubble */}
                <div className="absolute top-[25%] right-[15%] w-80 h-80 bg-blue-600/60 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />

                {/* Teal/Bottom Bubble (Made this one significantly larger) */}
                <div className="absolute -bottom-32 left-[40%] w-[500px] h-[500px] bg-red-400/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />
              </div>

              {/* ================= CORNER LIGHT BUBBLES (EXISTING) ================= */}
              {/* Top-left — emerald */}
              <div className="absolute -top-64 -left-64 w-[520px] h-[520px] rounded-full bg-emerald-500/12 blur-[160px] animate-floatSlow will-change-transform" />

              {/* Bottom-right — cyan/blue */}
              <div className="absolute -bottom-72 -right-72 w-[600px] h-[600px] rounded-full bg-cyan-500/12 blur-[180px] animate-floatSlower will-change-transform" />

              {/* Bottom-left — subtle blue fill */}
              <div className="absolute -bottom-80 -left-80 w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-[200px] animate-floatSlow will-change-transform" />

              {/* Vignette (keeps focus center clean) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,0.7)_72%)]" />

              {/* Infra grid (very subtle) */}
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "72px 72px",
                }}
              />
            </div>

            {/* ================= CONTENT ================= */}
            <Header />
            <SpeedInsights />
            <main className="relative z-10">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
