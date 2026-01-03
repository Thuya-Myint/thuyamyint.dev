// app/layout.tsx
import Header from "@/components/Headers";
import "./globals.css";
import { AppProvider } from "@/context/AppProvider";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

// 1. Configure Google Font (Quicksand)
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

// 2. Define full metadata with OG/Twitter
export const metadata: Metadata = {
  title: "Thuya Myint – Developer Portfolio",
  description: "Welcome to my portfolio and projects showcase.",
  icons: {
    icon: "/t.png", // favicon
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply font variable */}
      <body className={`${quicksand.variable} antialiased`}>
        <AppProvider>
          <Header />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
