export type WorkExperience = {
  id: string;
  companyName: string;
  logoUrl: string;
  position: string;
  period: string;
  descriptionKey: string;
  website?: string;
  technologies?: string[];
};

export const workExperiences: WorkExperience[] = [
  {
    id: "nexa-core",
    companyName: "Nexa Core IT Solution",
    logoUrl: "https://res.cloudinary.com/dnqq3putc/image/upload/v1767880267/nexacore_rnm16h.jpg",
    position: "Full-Stack Developer",
    period: "2024 - Present",
    descriptionKey: "nexaCoreDescription",
    website: "https://nexacoreitsolution.com",
    technologies: ["Next.js", "Node.js", "Go", "AWS", "Docker", "PostgreSQL"],
  },
  // Add more work experiences here
];
