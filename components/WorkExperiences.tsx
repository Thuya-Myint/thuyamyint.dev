"use client"
import { useApp } from "@/context/AppProvider"
import Image from "next/image"

export default function WorkExperiences() {
  const { t } = useApp()
  return (
    <div >
      <h1>{t("WorkExperiences")}</h1>
    </div>
  )
}