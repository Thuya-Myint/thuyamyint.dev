"use client"
import { useEffect, useRef, useState } from "react"
import { SiTerraform, SiGithubactions, SiMongodb, SiReact, SiNextdotjs, SiRedis } from "react-icons/si"
import { FaGolang } from "react-icons/fa6"
import { FaNodeJs } from "react-icons/fa6";

export default function PipelineShowCase() {

    const logs = [
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
    ]

    const [displayed, setDisplayed] = useState<string[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i < logs.length) {
                setDisplayed(prev => [...prev, logs[i]])
                i++
            } else {
                clearInterval(interval)
            }
        }, 900)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [displayed])

    return (
        <div className=" w-md  mx-auto mt-10">
            <div className="bg-[#0b0e14] border border-neutral-700/80 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">

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
                        <SiRedis size={14} title="Redis" />
                        <SiTerraform size={14} title="Terraform" />
                        <SiGithubactions size={14} title="GitHub Actions" />
                        <SiReact size={14} title="React" />
                        <SiNextdotjs size={14} title="Next.js" />
                        <FaNodeJs size={14} title="Node.js" />
                        <SiMongodb size={14} title="MongoDB" />
                        <FaGolang size={14} title="Go" />
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
                        overscrollBehavior: "none",
                        touchAction: "none",
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
    )
}