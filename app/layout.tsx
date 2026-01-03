import Header from "@/components/Headers";
import "./globals.css";
import { AppProvider } from "@/context/AppProvider";
import type { Metadata } from "next";
// 1. Import the font loaders
import { Quicksand } from "next/font/google";

// 2. Configure Google Font (Quicksand)
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand", // Sets a CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thuyamyint",
  description: "Developer Portfolio",
  icons: {
    icon: "./tm.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 4. Apply the font variables to the body */}
      <body className={`${quicksand.variable}  antialiased`}>
        <AppProvider>
          <Header />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
