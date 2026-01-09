"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BsX, BsImages } from "react-icons/bs"
import { useApp } from "@/context/AppProvider"

type Project = {
  title: string
  description?: string
  image: string[]
  stacks?: string[]
  detail?: string
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const { t } = useApp()
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [activeProject])

  return (
    <>
      {/* Section */}
      <section id="projects" className="px-4 sm:px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl border-l-4 border-green-400 pl-3">
            {t("projects")}
          </h1>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(project)}
                className="group text-left flex flex-col rounded-2xl overflow-hidden bg-linear-to-br from-white/15 to-black/30 border border-white/10 hover:border-green-400/40 transition"
              >
                {/* Preview Image */}
                <div className="relative w-full h-44 ">
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Image count */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-black/70 px-2 py-1 rounded-full">
                    <BsImages />
                    {project.image.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-green-400 font-semibold">
                    {t(project.title)}
                  </h2>

                  {project.description && (
                    <p className="text-sm text-white/40 mt-2 line-clamp-3">
                      {t(project.description)}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeProject && (
        <div className="fixed inset-0 overflow-auto bg-black/80 backdrop-blur-sm ">
          <div className="max-w-6xl mx-auto px-4 py-8 ">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 mt-20">
              <div className="w-full">
                <div className=" flex items-center justify-between">
                  <h2 className="text-xl text-green-400">
                    {t(activeProject.title)}
                  </h2>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="p-2 right-10 top-20 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    aria-label="Close"
                  >
                    <BsX className="text-2xl" />
                  </button>
                </div>

                {activeProject.description && (
                  <p className="mt-2 text-sm text-white/50 max-w-3xl">
                    {t(activeProject.description)}
                  </p>
                )}
                {activeProject.detail && (
                  <p className="mt-2 text-sm text-white/50 max-w-3xl">
                    {t(activeProject.detail)}
                  </p>
                )}

                {activeProject.stacks && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeProject.stacks.map((stack, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                )}
              </div>


            </div>

            {/* Gallery (Masonry) */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {activeProject.image.map((img, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={img}
                    alt={`Project image ${i + 1}`}
                    width={1200}
                    height={1600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}