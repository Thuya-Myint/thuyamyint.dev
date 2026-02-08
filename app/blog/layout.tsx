import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thuya Myint – Blog",
  description: "Explore articles and insights on full-stack development, cloud-native architecture, and software engineering from Thuya Myint.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </main>
  );
}
