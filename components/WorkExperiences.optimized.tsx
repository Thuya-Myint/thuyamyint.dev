"use client"

import { useApp } from "@/context/AppProvider"
import { BsArrowRightShort, BsArrowUpRight, BsX } from "react-icons/bs"
import Image from "next/image"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { workExperiences } from "@/configs/workExperiences"

type Experience = (typeof workExperiences)[number]

const ExperienceModal = memo(function ExperienceModal({
  experience,
  onClose,
}: {
  experience: Experience
  onClose: () => void
}) {
  const { t } = useApp()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="experience-modal-title"
    >
      <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-[#0b0e14]/95 p-6 shadow-2xl shadow-black/50 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green-400/70">
              {t("experienceDetails")}
            </p>
            <h2 id="experience-modal-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {experience.companyName}
            </h2>
            <p className="mt-2 text-sm text-white/50">
              {experience.position} · {t(experience.period)}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-xl bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <BsX className="text-2xl" />
          </button>
        </div>

        <p className="mt-8 leading-relaxed text-white/75">{t(experience.focusKey)}</p>

        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-green-400">
            {t("selectedContributions")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
            {experience.highlightKeys.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {experience.technologies && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-green-400">
              {t("technologies")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        )}

        {experience.website && (
          <a
            href={experience.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-300"
          >
            {t("viewWebSite")}
            <BsArrowUpRight />
          </a>
        )}
        {experience.profileUrl && (
          <a
            href={experience.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-green-400/30 px-4 py-2 text-sm font-semibold text-green-300 transition hover:border-green-400 hover:bg-green-400/10"
          >
            {t("viewProfile")}
            <BsArrowUpRight />
          </a>
        )}
      </div>
    </div>
  ), document.body)
})

const WorkExperiences = memo(function WorkExperiences() {
  const { t } = useApp()
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null)

  const handleClose = useCallback(() => setActiveExperience(null), [])

  return (
    <section id="experiences">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl border-l-4 border-green-400 pl-3">
          {t("workExperiences")}
        </h1>
        <h2 className="text-sm sm:text-base text-white/50 mt-2 max-w-2xl">
          {t("workExperiencesDescription")}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workExperiences.map((experience) => (
          <article
            key={experience.id}
            className="w-full bg-linear-to-br from-white/10 to-black/10 rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-40 sm:h-48">
              <Image
                src={`${experience.logoUrl}?c_fill,w_400,h_300,f_webp,q_auto`}
                alt={`${experience.companyName} logo`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={experience.id === "nexa-core"} // Prioritize the first one or specific ones
              />
            </div>

            <div className="p-5 flex flex-col h-full">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-green-400 font-semibold leading-tight">
                  {experience.companyName}
                </h1>
                <span className="text-xs whitespace-nowrap text-white bg-white/10 px-2 py-1 rounded-full">
                  {t(experience.period)}
                </span>
              </div>

              <p className="text-sm text-white/40 mt-4 leading-relaxed">
                {t(experience.descriptionKey)}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setActiveExperience(experience)}
                  aria-haspopup="dialog"
                  className="inline-flex items-center gap-2 rounded-lg border border-green-400/30 px-3 py-2 text-green-300 transition hover:border-green-400/70 hover:bg-green-400/10"
                >
                  {t("viewDetails")}
                  <BsArrowRightShort className="text-2xl" />
                </button>
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                    aria-label={`Visit ${experience.companyName} website`}
                  >
                    <BsArrowUpRight className="text-xl" />
                  </a>
                )}
                {experience.profileUrl && (
                  <a
                    href={experience.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-green-300/70 transition hover:bg-green-400/10 hover:text-green-300"
                    aria-label={`View ${experience.companyName} profile`}
                  >
                    <BsArrowUpRight className="text-xl" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeExperience && (
        <ExperienceModal experience={activeExperience} onClose={handleClose} />
      )}
    </section>
  )
})

export default WorkExperiences
