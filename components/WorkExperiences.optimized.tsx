"use client"

import { useApp } from "@/context/AppProvider"
import { BsArrowRightShort } from "react-icons/bs"
import Image from "next/image"
import { memo } from "react"
import { workExperiences } from "@/configs/workExperiences"

const WorkExperiences = memo(function WorkExperiences() {
  const { t } = useApp()

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
          <div
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

              {experience.website && (
                <div className="mt-6 flex items-center justify-end gap-2 text-sm">
                  {t("viewWebSite")}
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-neutral-600 bg-linear-120 from-black/60 to-white/40 hover:from-black/30 transition"
                    aria-label={`Visit ${experience.companyName} website`}
                  >
                    <BsArrowRightShort className="text-2xl" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

export default WorkExperiences
