import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { getFeaturedProjects } from "@/lib/content";

export default function Home() {
  const projects = getFeaturedProjects();

  return (
    <>
      <Hero />
      <About />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}
