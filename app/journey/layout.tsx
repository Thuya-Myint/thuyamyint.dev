import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Journey",
  description: "A timeline of my professional experience, education, and key milestones in my career as a developer.",
};

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
