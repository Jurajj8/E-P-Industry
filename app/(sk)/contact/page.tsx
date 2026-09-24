import ContactPage from "@/components/contact/contact-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("sk", "contact")

export default function Page() {
  return <ContactPage />
}
