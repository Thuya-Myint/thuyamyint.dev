import Header from "@/components/Headers";
import "./globals.css";
import { AppProvider } from "@/context/AppProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thuyamyint",
  description: "Developer Portfolio",
  icons: {

  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <Header />
          <main>
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}