"use client";
import { useEffect, useRef, useState } from "react";
import {
  SiTerraform,
  SiGithubactions,
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiRedis,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa6";
import { VscTerminalBash } from "react-icons/vsc";
const LOGS = [
  "$ initializing build sequence...",
  "› compiling front-end assets...",
  "› bundling server modules...",
  "› optimizing images & chunks...",
  "✔ build completed successfully",

  "",
  "$ git push origin main",
  "› authenticating...",
  "› syncing repository...",
  "✔ code pushed to GitHub",

  "",
  "$ terraform plan",
  "› analyzing infrastructure...",
  "› generating execution plan...",
  "✔ infrastructure plan ready",

  "",
  "$ terraform apply --auto-approve",
  "› provisioning compute...",
  "› networking configuration...",
  "› storage and IAM applied...",
  "✔ infrastructure deployed",

  "",
  "$ starting Redis...",
  "› connecting to cache layer...",
  "› enabling persistence...",
  "✔ redis ready",

  "",
  "$ deploying application to cloud...",
  "› spinning up containers...",
  "› registering health checks...",
  "› attaching load balancer...",
  "✔ application deployed",

  "",
  "🟢 SERVER STATUS: LIVE & STABLE",
];

export default function PipelineShowCase() {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < LOGS.length) {
        setDisplayed((prev) => [...prev, LOGS[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayed]);

  return (
    <div className="   mx-auto  relative cursor-pointer">
      <div className="w-full h-full flex items-center opacity-5 motion-safe:animate-[pulse_5s_ease-in-out_infinite] justify-center absolute">
        <VscTerminalBash className="text-white  " size={100} />
      </div>
      <div className="bg-[#0b0e14]   border border-neutral-700/80 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Top Bar */}
        <div className="px-4 py-3 flex items-center justify-between bg-[#111111] border-b border-neutral-800">
          {/* Left three dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Right tech icons */}
          <div className="flex items-center gap-2 text-gray-400">
            <SiRedis className="text-red-500" size={14} title="Redis" />
            <SiTerraform className="text-sky-800" size={14} title="Terraform" />
            <SiGithubactions
              className="text-blue-300"
              size={14}
              title="GitHub Actions"
            />
            <SiReact size={14} className="text-blue-600" title="React" />
            <SiNextdotjs
              size={14}
              className="text-neutral-500"
              title="Next.js"
            />
            <FaNodeJs size={14} className="text-green-300" title="Node.js" />
            <SiMongodb size={14} className="text-green-600" title="MongoDB" />
            <FaGolang size={14} className="text-blue-400" title="Go" />
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={containerRef}
          className="
            font-mono text-[13px] text-gray-200 p-4 leading-relaxed
            h-[40vh]
            overflow-hidden
          "
          style={{
            overscrollBehavior: "contain",
            touchAction: "pan-y",
          }}
        >
          {displayed.map((line, index) => (
            <div key={index} className="whitespace-pre">
              {line || <br />}
            </div>
          ))}

          {/* blinking cursor */}
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
