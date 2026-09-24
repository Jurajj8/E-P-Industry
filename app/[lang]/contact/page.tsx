import ContactPage from "@/components/contact/contact-page"
import { pageMetadata } from "@/lib/seo"

export function generateMetadata({ params }: { params: { lang: "en" | "de" } }) {
  return pageMetadata(params.lang, "contact")
}

export default function Page() {
  return <ContactPage />
}
