'use client'
import { useContent } from '../src/lib/useContent'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturesShowcase from '@/components/FeaturesShowcase'
import HowItWorks from '@/components/HowItWorks'
import Installation from '@/components/Installation'
import AIFeatures from '@/components/AIFeatures'
import TechnicalSpecs from '@/components/TechnicalSpecs'
import APIDocs from '@/components/APIDocs'
import Community from '@/components/Community'
import Comparison from '@/components/Comparison'
import UserGuide from '@/components/UserGuide'
import BenefitsSection from '@/components/BenefitsSection'
import DownloadSection from '@/components/DownloadSection'
import FAQ from '@/components/FAQ'
import VideoTutorials from '@/components/VideoTutorials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  const { data: pageData, loading } = useContent('pages', 'home')
  const { data: features } = useContent('features')
  const { data: downloads } = useContent('downloads')

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturesShowcase />
      <BenefitsSection />
      <HowItWorks />
      <Installation />
      <AIFeatures />
      <UserGuide />
      <APIDocs />
      <VideoTutorials />
      <FAQ />
      <Community />
      <Comparison />
      <DownloadSection />
      <TechnicalSpecs />
      <FinalCTA />
      <Footer />
    </main>
  )
}