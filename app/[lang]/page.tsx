import HomePage from "@/components/home/home-page"
import { pageMetadata } from "@/lib/seo"

export function generateMetadata({ params }: { params: { lang: "en" | "de" } }) {
  return pageMetadata(params.lang, "home")
}

export default function Page() {
  return <HomePage />
}
