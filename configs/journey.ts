export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
}

export const journeyData: JourneyItem[] = [
  {
    year: "2021",
    title: "The Beginning",
    description: "My journey in computer science began in 2021, driven by a strong and genuine fascination with how systems work and how software is built from first principles.",
    details: "Started with AutoCAD (2D, 3D, and isometric design), developing precision and technical discipline. Realized my true passion lay in programming and system design.",
    tags: ["AutoCAD", "Logic", "Systems"]
  },
  {
    year: "2022",
    title: "Low-Level Foundations",
    description: "Focused on algorithms and data structures using the C programming language. Learning C forced me to understand memory, control flow, and performance at a low level.",
    details: "Strengthened logical thinking and problem-solving skills. Began studying Japanese with a long-term goal of working in a Japanese technical environment.",
    tags: ["C", "Data Structures", "Algorithms", "Japanese"]
  },
  {
    year: "2023",
    title: "Certification & Core IT",
    description: "Entered the ITPEC certification track and prepared for the Information Technology Passport (IP) exam.",
    details: "Continued studying algorithms in C++ and strengthened understanding of systems architecture, networking, and security. Successfully passed the IP examination.",
    tags: ["C++", "Networking", "Security", "ITPEC IP"]
  },
  {
    year: "2024",
    title: "Advancing to FE & Web",
    description: "Advanced to the ITPEC Fundamental Engineer (FE) level. Deepened algorithmic knowledge and expanded into web development.",
    details: "Built desktop applications using Java GUI. Learned HTML, CSS, JavaScript, and PHP. Passed JLPT N2 and the ITPEC FE examination in October 2024.",
    tags: ["Java", "JavaScript", "PHP", "JLPT N2", "ITPEC FE"]
  },
  {
    year: "2024 - 2025",
    title: "Full-Stack Developer @ NexaCore",
    description: "Worked as a Full-Stack Developer at NexaCore IT Solution in Myanmar, contributing to real production systems.",
    details: "Developed frontend and backend using React, React Native, Redux, Node.js, Express, and MongoDB. Gained hands-on experience with GCP deployment and operations.",
    tags: ["React", "Node.js", "MongoDB", "GCP", "Redux"]
  },
  {
    year: "2025 - Present",
    title: "Japan & Cloud-Native Focus",
    description: "Moved to Japan as a language school student while continuing to work part-time and actively write code.",
    details: "Shifted focus toward modern, scalable, cloud-native architectures. Mastering Next.js, Go, AWS, Docker, Kubernetes, and Terraform.",
    tags: ["Next.js", "Go", "AWS", "Docker", "Kubernetes", "Terraform"]
  }
];
