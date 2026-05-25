import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/components/Hero";
import MetricsBanner from "@/components/MetricsBanner";
import About from "@/components/About";
import PhotoGallery from "@/components/PhotoGallery";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import Experience from "@/components/Experience";
import AiotLab from "@/components/AiotLab";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Hero />
      <MetricsBanner />
      <SectionDivider />
      <About />
      <PhotoGallery />
      <SectionDivider />
      <Education />
      <Certifications />
      <SectionDivider />
      <Projects />
      <TechMarquee />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <AiotLab />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Contact />
      <Footer />
    </>
  );
}

