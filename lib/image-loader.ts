"use client"

// Cloudinary does the resizing; local files are served as-is.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://res.cloudinary.com/")) {
    const q = quality ? `q_${quality}` : "q_auto"
    return src.replace("/image/upload/", `/image/upload/f_auto,${q},c_limit,w_${width}/`)
  }
  return `${src}?w=${width}`
}
