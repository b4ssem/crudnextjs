import { prisma } from '@/lib/prisma'
import Hero from '../components/portfolio/Hero'
import About from '../components/portfolio/About'
import Skills from '../components/portfolio/Skills'
import Projects from '../components/portfolio/Projects'
import Experiences from '../components/portfolio/Experiences'
import ContactForm from '../components/portfolio/ContactForm'
import Footer from '../components/portfolio/Footer'
import Navbar from '../components/portfolio/Navbar'

// Server Component : on lit directement Prisma côté serveur
export default async function PortfolioPage() {
  const about = await prisma.about.findFirst()
  const skills = await prisma.skill.findMany()
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  const experiences = await prisma.experience.findMany()
  const education = await prisma.education.findMany()

  return (
    <>
      <Navbar name={about?.name ?? 'Portfolio'} />
      <main>
        <Hero about={about} />
        <About about={about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experiences experiences={experiences} education={education} />
        <ContactForm />
      </main>
      <Footer name={about?.name ?? ''} />
    </>
  )
}