import Hero from "@/components/home/hero"
import About from "@/components/home/about"
import Disciplines from "@/components/home/disciplines"
import CrewBuilder from "@/components/home/crew-builder"
import FieldArchive from "@/components/home/field-archive"
import Process from "@/components/home/process"
import Team from "@/components/home/team"
import Careers from "@/components/home/careers"
import TerminalRail from "@/components/site/terminal-rail"

export default function HomePage() {
  return (
    <>
      <TerminalRail />
      <Hero />
      <About />
      <Disciplines />
      <CrewBuilder />
      <FieldArchive />
      <Process />
      <Team />
      <Careers />
    </>
  )
}
