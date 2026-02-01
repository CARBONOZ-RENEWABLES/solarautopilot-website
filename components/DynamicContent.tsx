'use client'
import { useContent } from '../src/lib/useContent'
import Hero from './Hero'
import FeaturesShowcase from './FeaturesShowcase'
import DownloadSection from './DownloadSection'

interface DynamicContentProps {
  pageSlug: string
}

export default function DynamicContent({ pageSlug }: DynamicContentProps) {
  const { data: pageData, loading } = useContent('pages', pageSlug)
  const { data: features } = useContent('features')
  const { data: downloads } = useContent('downloads')

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'hero':
        return <Hero key={index} />
      case 'features':
        return <FeaturesShowcase key={index} />
      case 'downloads':
        return <DownloadSection key={index} />
      default:
        return null
    }
  }

  return (
    <div>
      {(pageData as any)?.sections?.map(renderSection) || (
        <>
          <Hero />
          <FeaturesShowcase />
          <DownloadSection />
        </>
      )}
    </div>
  )
}