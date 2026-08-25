export type WorkExperience = {
  id: string;
  companyName: string;
  logoUrl: string;
  position: string;
  period: string;
  descriptionKey: string;
  focusKey: string;
  highlightKeys: string[];
  website?: string;
  profileUrl?: string;
  technologies?: string[];
};

export const workExperiences: WorkExperience[] = [
  {
    id: "nexa-core",
    companyName: "Nexa Core IT Solution",
    logoUrl: "https://res.cloudinary.com/dnqq3putc/image/upload/v1767880267/nexacore_rnm16h.jpg",
    position: "Full-Stack Developer",
    period: "aboveOneYear",
    descriptionKey: "nexaCoreDescription",
    focusKey: "nexaCoreFocus",
    highlightKeys: ["nexaCoreHighlight1", "nexaCoreHighlight2", "nexaCoreHighlight3"],
    website: "https://nexacoreitsolution.com",
    profileUrl: "https://nexacoreitsolution.com/thuyamyint",
    technologies: ["Next.js", "Node.js", "Go", "AWS", "Docker", "PostgreSQL"],
  },
  // Add more work experiences here
];
