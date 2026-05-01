import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Contact from "@/components/sections/Contact";
import SectionDivider from "@/components/effects/SectionDivider";
import { getFeaturedProjects } from "@/lib/content";

export default function Home() {
  const projects = getFeaturedProjects();

  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects projects={projects} />
      <SectionDivider />
      <GitHubActivity />
      <SectionDivider />
      <Contact />
    </>
  );
}
