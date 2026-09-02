"use client"

import Image, { type ImageProps } from "next/image"
import { useMemo, useState } from "react"

type ProgressiveImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string
  alt: string
}

const addCloudinaryParams = (src: string, params: string) =>
  `${src}${src.includes("?") ? "&" : "?"}${params}`

export default function ProgressiveImage({ src, alt, className, onLoad, onError, ...props }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)
  const previewSrc = useMemo(
    () => addCloudinaryParams(src, "c_fill,w_48,h_48,q_10,f_webp,e_blur:1000"),
    [src],
  )
  const optimizedSrc = useMemo(
    () => addCloudinaryParams(src, "w_1200,q_auto,f_webp"),
    [src],
  )

  const handleLoad: NonNullable<ImageProps["onLoad"]> = (event) => {
    setLoaded(true)
    onLoad?.(event)
  }

  const handleError: NonNullable<ImageProps["onError"]> = (event) => {
    setLoaded(true)
    onError?.(event)
  }

  return (
    <span className="relative block h-full w-full overflow-hidden bg-white/5">
      <Image
        src={previewSrc}
        alt=""
        fill
        aria-hidden="true"
        sizes={props.sizes}
        className={`absolute inset-0 scale-105 object-cover blur-xl transition-opacity duration-500 motion-reduce:transition-none ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        {...props}
        src={optimizedSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
      />
    </span>
  )
}
