import {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiGo,
  SiMongodb,
  SiPostgresql,
  SiTerraform,
  SiGithubactions,
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiRabbitmq,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";


export const techStacks = [
  {
    id: "frontend",
    icons: [
      { icon: SiReact, color: "#61DAFB", label: "React" },
      { icon: SiNextdotjs, color: "#e5e7eb", label: "Next.js" },
    ],
    descriptionKey: "stackReact",
    additionalLibraries: [
      { text: "i18n", color: "#36d850" },
      { text: "TanStack Query", color: "#d77625" },
      { text: "Redux", color: "#764abc" },
      { text: "Recoil", color: "#42b3ff" },
    ],
  },

  {
    id: "backend",
    icons: [
      { icon: SiGo, color: "#00ADD8", label: "Go" },
      { icon: SiExpress, color: "#ffffff", label: "Node.js / Express" },
    ],
    descriptionKey: "stackBackend",
    additionalLibraries: [
      { text: "REST APIs", color: "#9ca3af" },
      { text: "Authentication", color: "#60a5fa" },
      { text: "State-based workflows", color: "#fbbf24" },
    ],
  },

  {
    id: "data",
    icons: [
      { icon: SiMongodb, color: "#47A248", label: "MongoDB" },
      { icon: SiPostgresql, color: "#336791", label: "PostgreSQL" },
    ],
    descriptionKey: "stackData",
    additionalLibraries: [
      { text: "Schema Design", color: "#34d399" },
      { text: "Index Optimization", color: "#f87171" },
    ],
  },

  {
    id: "infra",
    icons: [
      { icon: FaAws, color: "#FF9900", label: "AWS" },
      { icon: SiTerraform, color: "#7B42BC", label: "Terraform" },
      { icon: SiGithubactions, color: "#2088FF", label: "GitHub Actions" },
    ],
    descriptionKey: "stackInfra",
    additionalLibraries: [
      { text: "CI/CD", color: "#22c55e" },
      { text: "Containerized Deployments", color: "#38bdf8" },
      { text: "Infrastructure as Code", color: "#a78bfa" },
    ],
  },
  {
    id: "microservices",
    icons: [
      { icon: SiDocker, color: "#2496ED", label: "Docker" },
      { icon: SiKubernetes, color: "#326CE5", label: "Kubernetes" },
      { icon: SiNginx, color: "#009639", label: "NGINX" },
      { icon: SiRabbitmq, color: "#FF6600", label: "RabbitMQ" },
    ],
    descriptionKey: "stackMicroservices",
    additionalLibraries: [
      { text: "Service Discovery", color: "#22c55e" },
      { text: "API Gateway", color: "#38bdf8" },
      { text: "Event-Driven Architecture", color: "#f59e0b" },
      { text: "Inter-service Communication", color: "#a78bfa" },
    ],
  },
];