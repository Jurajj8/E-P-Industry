import HomePage from "@/components/home/home-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("sk", "home")

export default function Page() {
  return <HomePage />
}
