"use client"

import { useState, useEffect, useCallback, useRef, useSyncExternalStore, memo } from "react"
import Image from "next/image"
import { BsX, BsImages } from "react-icons/bs"
import { useApp } from "@/context/AppProvider"
import { createPortal } from "react-dom"
import ProgressiveImage from "@/components/ProgressiveImage"

type Project = {
  title: string
  description?: string
  image: string[]
  stacks?: string[]
  detail?: string
}

const ProjectCard = memo(function ProjectCard({
  project,
  onOpen
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  const { t } = useApp()
  const handleClick = useCallback(() => {
    onOpen(project)
  }, [project, onOpen])

  return (
    <button
      onClick={handleClick}
      className="group text-left flex flex-col rounded-2xl overflow-hidden bg-linear-to-br from-white/15 to-black/30  hover:border-green-400/40 transition"
    >
      <div className="relative w-full h-44">
        <Image
          src={`${project.image[0]}?c_fill,w_400,h_300,f_webp,q_auto`}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-black/70 px-2 py-1 rounded-full">
          <BsImages />
          {project.image.length}
        </div>
      </div>

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
  )
})

const ModalImage = memo(function ModalImage({ img, index }: { img: string; index: number }) {
  return (
    <div className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 relative">
      <ProgressiveImage
        src={img}
        alt={`Project image ${index + 1}`}
        width={600}
        height={800}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-auto object-contain"
        loading="lazy"
      />
    </div>
  )
})

const ProjectModal = memo(function ProjectModal({
  project,
  onClose
}: {
  project: Project
  onClose: () => void
}) {
  const { t } = useApp()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  if (!mounted) return null

  return createPortal((
    <div
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/75 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="mx-auto mt-12 max-w-6xl rounded-3xl border border-white/10 bg-[#0b0e14]/95 px-4 py-6 shadow-2xl shadow-black/50 sm:mt-16 sm:px-8 sm:py-8">
        <div className="flex items-center justify-between mb-6 mt-20">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h2 id="project-modal-title" className="text-xl text-green-400">
                {t(project.title)}
              </h2>
              <button
                onClick={onClose}
                ref={closeButtonRef}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                aria-label={t("close")}
              >
                <BsX className="text-2xl" />
              </button>
            </div>

            {project.description && (
              <p className="mt-2 text-sm text-white/50 max-w-3xl">
                {t(project.description)}
              </p>
            )}
            {project.detail && (
              <p className="mt-2 text-sm text-white/50 max-w-3xl">
                {t(project.detail)}
              </p>
            )}

            {project.stacks && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stacks.map((stack, idx) => (
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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {project.image.map((img, i) => (
            <ModalImage key={i} img={img} index={i} />
          ))}
        </div>
      </div>
    </div>
  ), document.body)
})

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const { t } = useApp()
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const handleOpenProject = useCallback((project: Project) => {
    setActiveProject(project)
  }, [])

  const handleCloseProject = useCallback(() => {
    setActiveProject(null)
  }, [])

  return (
    <>
      <section id="projects" className="px-4 sm:px-6  ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl border-l-4 border-green-400 pl-3">
            {t("projects")}
          </h1>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={handleCloseProject}
        />
      )}
    </>
  )
}
