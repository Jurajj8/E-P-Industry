"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageLightboxProps {
  images: string[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  projectTitle: string
}

export default function ImageLightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  projectTitle,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onPrev()
          break
        case "ArrowRight":
          onNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-colors touch-manipulation"
          aria-label="Zatvoriť galériu"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-2 sm:left-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-colors touch-manipulation"
              aria-label="Predchádzajúci obrázok"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-2 sm:right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-colors touch-manipulation"
              aria-label="Ďalší obrázok"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}

        {/* Image */}
        <div
          className="relative max-w-full max-h-full w-full h-full flex items-center justify-center px-12 sm:px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${projectTitle} - obrázok ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Touch gestures for mobile */}
        <div className="absolute inset-0 flex">
          <div
            className="w-1/3 h-full"
            onClick={(e) => {
              e.stopPropagation()
              if (images.length > 1) onPrev()
            }}
          />
          <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()} />
          <div
            className="w-1/3 h-full"
            onClick={(e) => {
              e.stopPropagation()
              if (images.length > 1) onNext()
            }}
          />
        </div>
      </div>
    </div>
  )
}
