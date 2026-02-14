'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { Save, Plus, Trash2, Edit2, Upload } from 'lucide-react'
import { 
  HeroContent, HeaderContent, FooterContent, Feature, AIFeature, FAQ, DownloadItem, Benefit, CTAContent, VideoTutorial, FeaturesSectionContent, DownloadSectionContent, AIFeaturesSectionContent, BenefitsSectionContent, HowItWorksContent, TechnicalSpecsContent, InstallationContent, APIDocsContent, CommunityContent, ComparisonContent, UserGuideContent, PricingTier,
  getHeroContent, saveHeroContent,
  getHeaderContent, saveHeaderContent,
  getFooterContent, saveFooterContent,
  getFeatures, saveFeatures,
  getAIFeatures, saveAIFeatures,
  getFAQs, saveFAQs,
  getDownloads, saveDownloads,
  getBenefits, saveBenefits,
  getCTAContent, saveCTAContent,
  getVideoTutorials, saveVideoTutorials,
  getFeaturesSectionContent, saveFeaturesSectionContent,
  getDownloadSectionContent, saveDownloadSectionContent,
  getAIFeaturesSectionContent, saveAIFeaturesSectionContent,
  getBenefitsSectionContent, saveBenefitsSectionContent,
  getHowItWorksContent, saveHowItWorksContent,
  getTechnicalSpecsContent, saveTechnicalSpecsContent,
  getInstallationContent, saveInstallationContent,
  getAPIDocsContent, saveAPIDocsContent,
  getCommunityContent, saveCommunityContent,
  getComparisonContent, saveComparisonContent,
  getUserGuideContent, saveUserGuideContent,
  getPricingTiers, savePricingTiers
} from '@/lib/admin'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('hero')
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '', subtitle: '', primaryCTA: '', secondaryCTA: ''
  })
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    logo: '', navigation: []
  })
  const [footerContent, setFooterContent] = useState<FooterContent>({
    companyName: '', logo: '', description: '', sections: [], socialLinks: [], copyright: '', statusText: '', showStatus: false, madeByText: ''
  })
  const [features, setFeatures] = useState<Feature[]>([])
  const [aiFeatures, setAIFeatures] = useState<AIFeature[]>([])
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [downloads, setDownloads] = useState<DownloadItem[]>([])
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [benefitsSection, setBenefitsSection] = useState<BenefitsSectionContent>({
    title: '', subtitle: ''
  })
  const [ctaContent, setCTAContent] = useState<CTAContent>({
    title: '', subtitle: '', primaryButton: '', secondaryButton: ''
  })
  const [videoTutorials, setVideoTutorials] = useState<VideoTutorial[]>([])
  const [featuresSection, setFeaturesSection] = useState<FeaturesSectionContent>({
    title: '', subtitle: ''
  })
  const [downloadSection, setDownloadSection] = useState<DownloadSectionContent>({
    title: '', description: ''
  })
  const [aiSection, setAISection] = useState<AIFeaturesSectionContent>({
    title: '', subtitle: '', badgeText: '', performanceTitle: '', learningTitle: '', academicTitle: '', academicDescription: '',
    performanceMetrics: [], learningPhases: [], academicPoints: []
  })
  const [howItWorks, setHowItWorks] = useState<HowItWorksContent>({
    title: '', subtitle: '', ctaText: '', ctaButtonText: '', steps: []
  })
  const [technicalSpecs, setTechnicalSpecs] = useState<TechnicalSpecsContent>({
    title: '', subtitle: '', techStack: [], systemRequirements: [], supportedInverters: [], architecture: [], networkPorts: []
  })
  const [installation, setInstallation] = useState<InstallationContent>({
    title: '', subtitle: '', platforms: [], stats: []
  })
  const [userGuide, setUserGuide] = useState<UserGuideContent>({
    title: '', subtitle: '', sections: [], proTips: []
  })
  const [apiDocs, setAPIDocs] = useState<APIDocsContent>({
    title: '', subtitle: '', tabs: [], endpoints: []
  })
  const [community, setCommunity] = useState<CommunityContent>({
    title: '', subtitle: '', links: [], ctaTitle: '', ctaSubtitle: ''
  })
  const [comparison, setComparison] = useState<ComparisonContent>({
    title: '', subtitle: '', features: [], bottomTitle: '', bottomSubtitle: ''
  })
  const [saved, setSaved] = useState(false)
  const [dbDownloads, setDbDownloads] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [changelogs, setChangelogs] = useState([])
  const [roadmaps, setRoadmaps] = useState([])
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([])
  const [uploading, setUploading] = useState(false)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [editingChangelog, setEditingChangelog] = useState<any>(null)
  const [editingRoadmap, setEditingRoadmap] = useState<any>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (activeTab === 'dbDownloads' || activeTab === 'downloads') fetchDbDownloads()
    if (activeTab === 'blog') fetchBlogPosts()
    if (activeTab === 'changelog') fetchChangelogs()
    if (activeTab === 'roadmap') fetchRoadmaps()
  }, [activeTab])

  const fetchDbDownloads = async () => {
    const res = await fetch('/api/downloads')
    const data = await res.json()
    setDbDownloads(data)
  }

  const fetchBlogPosts = async () => {
    const res = await fetch('/api/blog')
    const data = await res.json()
    setBlogPosts(data)
  }

  const fetchChangelogs = async () => {
    const res = await fetch('/api/changelog')
    const data = await res.json()
    setChangelogs(data)
  }

  const fetchRoadmaps = async () => {
    const res = await fetch('/api/roadmap')
    const data = await res.json()
    setRoadmaps(data)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const platform = prompt('Platform (windows/macos/linux):')
    const version = prompt('Version (e.g., 2.1.0):')
    const checksum = prompt('Checksum (optional):')

    if (!platform || !version) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('platform', platform)
    formData.append('version', version)
    if (checksum) formData.append('checksum', checksum)

    await fetch('/api/downloads', {
      method: 'POST',
      body: formData,
    })

    setUploading(false)
    fetchDbDownloads()
  }

  const toggleDbDownload = async (id: string, enabled: boolean) => {
    await fetch('/api/downloads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, enabled: !enabled }),
    })
    fetchDbDownloads()
  }

  const deleteDbDownload = async (id: string) => {
    if (!confirm('Delete this download?')) return
    await fetch(`/api/downloads?id=${id}`, { method: 'DELETE' })
    fetchDbDownloads()
  }

  useEffect(() => {
    const loadContent = async () => {
      setHeroContent(await getHeroContent())
      setHeaderContent(await getHeaderContent())
      setFooterContent(await getFooterContent())
      setFeatures(await getFeatures())
      setAIFeatures(await getAIFeatures())
      setFAQs(await getFAQs())
      setDownloads(await getDownloads())
      setBenefits(await getBenefits())
      setBenefitsSection(await getBenefitsSectionContent())
      setCTAContent(await getCTAContent())
      setVideoTutorials(await getVideoTutorials())
      setFeaturesSection(await getFeaturesSectionContent())
      setDownloadSection(await getDownloadSectionContent())
      setAISection(await getAIFeaturesSectionContent())
      setHowItWorks(await getHowItWorksContent())
      setTechnicalSpecs(await getTechnicalSpecsContent())
      setInstallation(await getInstallationContent())
      setUserGuide(await getUserGuideContent())
      setAPIDocs(await getAPIDocsContent())
      setCommunity(await getCommunityContent())
      setComparison(await getComparisonContent())
      setPricingTiers(await getPricingTiers())
    }
    loadContent()
  }, [])

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const saveHero = () => {
    saveHeroContent(heroContent)
    showSaved()
  }

  const saveHeader = () => {
    saveHeaderContent(headerContent)
    showSaved()
  }

  const saveFooter = () => {
    saveFooterContent(footerContent)
    showSaved()
  }

  const saveFeaturesData = () => {
    saveFeatures(features)
    showSaved()
  }

  const addFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      title: 'New Feature',
      description: 'Feature description',
      icon: 'monitor',
      enabled: true,
      image: '/images/placeholder.png',
      stats: ['Stat 1', 'Stat 2', 'Stat 3']
    }
    setFeatures([...features, newFeature])
  }

  const deleteFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    setFeatures(features.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
          <div className="flex gap-4">
            <a href="/" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
              <Eye size={20} /> View Site
            </a>
            <button onClick={() => router.push('/api/auth/signout')} style={{ backgroundColor: '#DEAF0B' }} className="hover:bg-primary-dark text-dark px-4 py-2 rounded-lg font-medium transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-700 overflow-x-auto">
          {[
            {id: 'hero', label: 'Hero'}, 
            {id: 'header', label: 'Header'}, 
            {id: 'footer', label: 'Footer'}, 
            {id: 'features', label: 'Features'},
            {id: 'ai', label: 'AI Features'},
            {id: 'faq', label: 'FAQ'},
            {id: 'downloads', label: 'Downloads'},
            {id: 'benefits', label: 'Benefits'},
            {id: 'howItWorks', label: 'How It Works'},
            {id: 'installation', label: 'Installation'},
            {id: 'userGuide', label: 'User Guide'},
            {id: 'techSpecs', label: 'Tech Specs'},
            {id: 'apiDocs', label: 'API Docs'},
            {id: 'community', label: 'Community'},
            {id: 'comparison', label: 'Comparison'},
            {id: 'cta', label: 'Final CTA'},
            {id: 'videos', label: 'Video Tutorials'},
            {id: 'dbDownloads', label: 'File Manager'},
            {id: 'blog', label: 'Blog'},
            {id: 'changelog', label: 'Changelog'},
            {id: 'roadmap', label: 'Roadmap'},
            {id: 'pricing', label: 'Pricing'}
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Hero Section</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={heroContent.title}
                onChange={(e) => setHeroContent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Title"
              />
              <textarea
                value={heroContent.subtitle}
                onChange={(e) => setHeroContent(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={4}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Subtitle"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={heroContent.primaryCTA}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, primaryCTA: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Primary CTA"
                />
                <input
                  type="text"
                  value={heroContent.secondaryCTA}
                  onChange={(e) => setHeroContent(prev => ({ ...prev, secondaryCTA: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Secondary CTA"
                />
              </div>
              <button onClick={saveHero} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Header Tab */}
        {activeTab === 'header' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Header Content</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={headerContent.logo}
                  onChange={(e) => setHeaderContent(prev => ({ ...prev, logo: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Logo text (fallback)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Logo Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setHeaderContent(prev => ({ ...prev, logoImage: event.target?.result as string }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-primary file:text-dark hover:file:bg-primary-dark"
                />
                {headerContent.logoImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={headerContent.logoImage} alt="Logo preview" className="w-8 h-8 rounded" />
                    <button
                      onClick={() => setHeaderContent(prev => ({ ...prev, logoImage: undefined }))}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4 text-white">Navigation Links</h3>
                {headerContent.navigation.map((nav, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                    <input
                      type="text"
                      value={nav.label}
                      onChange={(e) => {
                        const newNav = [...headerContent.navigation]
                        newNav[index] = { ...nav, label: e.target.value }
                        setHeaderContent(prev => ({ ...prev, navigation: newNav }))
                      }}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Link label"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={nav.href}
                        onChange={(e) => {
                          const newNav = [...headerContent.navigation]
                          newNav[index] = { ...nav, href: e.target.value }
                          setHeaderContent(prev => ({ ...prev, navigation: newNav }))
                        }}
                        className="flex-1 p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                        placeholder="Link URL"
                      />
                      <button
                        onClick={() => {
                          const newNav = headerContent.navigation.filter((_, i) => i !== index)
                          setHeaderContent(prev => ({ ...prev, navigation: newNav }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm px-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newNav = [...(headerContent.navigation || [])]
                    newNav.push({ label: '', href: '' })
                    setHeaderContent(prev => ({ ...prev, navigation: newNav }))
                  }}
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  + Add Link
                </button>
              </div>
              <button onClick={saveHeader} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Header'}
              </button>
            </div>
          </div>
        )}

        {/* Footer Tab */}
        {activeTab === 'footer' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Footer Content</h2>
            <div className="space-y-6">
              {/* Brand Section */}
              <div className="border border-gray-600 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 text-white">Brand Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={footerContent.companyName}
                    onChange={(e) => setFooterContent(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Company name"
                  />
                  <input
                    type="text"
                    value={footerContent.logo}
                    onChange={(e) => setFooterContent(prev => ({ ...prev, logo: e.target.value }))}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Logo letter (fallback)"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-white">Logo Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          setFooterContent(prev => ({ ...prev, logoImage: event.target?.result as string }))
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-primary file:text-dark hover:file:bg-primary-dark"
                  />
                  {footerContent.logoImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={footerContent.logoImage} alt="Logo preview" className="w-8 h-8 rounded" />
                      <button
                        onClick={() => setFooterContent(prev => ({ ...prev, logoImage: undefined }))}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <textarea
                  value={footerContent.description}
                  onChange={(e) => setFooterContent(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mt-4"
                  placeholder="Company description"
                />
              </div>

              {/* Navigation Sections */}
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Navigation Sections</h3>
                  <button
                    onClick={() => {
                      const newSection = { title: 'New Section', links: [{ name: 'New Link', href: '#' }] }
                      setFooterContent(prev => ({ ...prev, sections: [...(prev.sections || []), newSection] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Section
                  </button>
                </div>
                {footerContent.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-500 rounded p-3 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...footerContent.sections]
                          newSections[sectionIndex] = { ...section, title: e.target.value }
                          setFooterContent(prev => ({ ...prev, sections: newSections }))
                        }}
                        className="flex-1 p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none mr-2"
                        placeholder="Section title"
                      />
                      <button
                        onClick={() => {
                          const newSections = footerContent.sections.filter((_, i) => i !== sectionIndex)
                          setFooterContent(prev => ({ ...prev, sections: newSections }))
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {section.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => {
                            const newSections = [...footerContent.sections]
                            newSections[sectionIndex].links[linkIndex] = { ...link, name: e.target.value }
                            setFooterContent(prev => ({ ...prev, sections: newSections }))
                          }}
                          className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                          placeholder="Link name"
                        />
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => {
                              const newSections = [...footerContent.sections]
                              newSections[sectionIndex].links[linkIndex] = { ...link, href: e.target.value }
                              setFooterContent(prev => ({ ...prev, sections: newSections }))
                            }}
                            className="flex-1 p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                            placeholder="Link URL"
                          />
                          <button
                            onClick={() => {
                              const newSections = [...footerContent.sections]
                              newSections[sectionIndex].links = section.links.filter((_, i) => i !== linkIndex)
                              setFooterContent(prev => ({ ...prev, sections: newSections }))
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSections = [...footerContent.sections]
                        newSections[sectionIndex].links.push({ name: 'New Link', href: '#' })
                        setFooterContent(prev => ({ ...prev, sections: newSections }))
                      }}
                      className="text-primary hover:text-primary-dark text-sm"
                    >
                      + Add Link
                    </button>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="border border-gray-600 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Social Media Links</h3>
                  <button
                    onClick={() => {
                      const newSocial = { name: 'New Platform', href: '#', icon: 'ExternalLink' }
                      setFooterContent(prev => ({ ...prev, socialLinks: [...prev.socialLinks, newSocial] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Social
                  </button>
                </div>
                {footerContent.socialLinks.map((social, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 mb-3">
                    <input
                      type="text"
                      value={social.name}
                      onChange={(e) => {
                        const newSocials = [...footerContent.socialLinks]
                        newSocials[index] = { ...social, name: e.target.value }
                        setFooterContent(prev => ({ ...prev, socialLinks: newSocials }))
                      }}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      placeholder="Platform name"
                    />
                    <input
                      type="text"
                      value={social.href}
                      onChange={(e) => {
                        const newSocials = [...footerContent.socialLinks]
                        newSocials[index] = { ...social, href: e.target.value }
                        setFooterContent(prev => ({ ...prev, socialLinks: newSocials }))
                      }}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      placeholder="URL"
                    />
                    <div className="flex gap-1">
                      <select
                        value={social.icon}
                        onChange={(e) => {
                          const newSocials = [...footerContent.socialLinks]
                          newSocials[index] = { ...social, icon: e.target.value }
                          setFooterContent(prev => ({ ...prev, socialLinks: newSocials }))
                        }}
                        className="flex-1 p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="Github">GitHub</option>
                        <option value="Twitter">Twitter</option>
                        <option value="MessageCircle">Discord</option>
                        <option value="Youtube">YouTube</option>
                        <option value="Mail">Email</option>
                        <option value="ExternalLink">External</option>
                      </select>
                      <button
                        onClick={() => {
                          const newSocials = footerContent.socialLinks.filter((_, i) => i !== index)
                          setFooterContent(prev => ({ ...prev, socialLinks: newSocials }))
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="border border-gray-600 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4 text-white">Bottom Section</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={footerContent.copyright}
                    onChange={(e) => setFooterContent(prev => ({ ...prev, copyright: e.target.value }))}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Copyright text"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={footerContent.statusText}
                      onChange={(e) => setFooterContent(prev => ({ ...prev, statusText: e.target.value }))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Status text"
                    />
                    <input
                      type="text"
                      value={footerContent.madeByText}
                      onChange={(e) => setFooterContent(prev => ({ ...prev, madeByText: e.target.value }))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Made by text"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={footerContent.showStatus}
                      onChange={(e) => setFooterContent(prev => ({ ...prev, showStatus: e.target.checked }))}
                      className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                    />
                    <span className="text-text-secondary">Show status indicator</span>
                  </label>
                </div>
              </div>

              <button onClick={saveFooter} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Footer'}
              </button>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Features</h2>
              <button onClick={addFeature} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> Add Feature
              </button>
            </div>
            
            {/* Section Header */}
            <div className="border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Section Header</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={featuresSection.title}
                  onChange={(e) => setFeaturesSection(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section title"
                />
                <input
                  type="text"
                  value={featuresSection.subtitle}
                  onChange={(e) => setFeaturesSection(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section subtitle"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Feature title"
                    />
                    <select
                      value={feature.icon}
                      onChange={(e) => updateFeature(feature.id, { icon: e.target.value })}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    >
                      <option value="monitor">Monitor</option>
                      <option value="brain">Brain</option>
                      <option value="activity">Activity</option>
                      <option value="smartphone">Smartphone</option>
                      <option value="zap">Zap</option>
                      <option value="shield">Shield</option>
                    </select>
                    <input
                      type="text"
                      value={feature.image}
                      onChange={(e) => updateFeature(feature.id, { image: e.target.value })}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Image URL (fallback)"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white">Feature Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            updateFeature(feature.id, { uploadedImage: event.target?.result as string })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-primary file:text-dark hover:file:bg-primary-dark"
                    />
                    {feature.uploadedImage && (
                      <div className="mt-2 flex items-center gap-2">
                        <img src={feature.uploadedImage} alt="Feature preview" className="w-16 h-16 rounded object-cover" />
                        <button
                          onClick={() => updateFeature(feature.id, { uploadedImage: undefined })}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                    rows={3}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="Feature description"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={feature.enabled}
                        onChange={(e) => updateFeature(feature.id, { enabled: e.target.checked })}
                        className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                      />
                      <span className="text-text-secondary">Enabled</span>
                    </label>
                    <button
                      onClick={() => deleteFeature(feature.id)}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => { saveFeatures(features); saveFeaturesSectionContent(featuresSection); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Features'}
              </button>
            </div>
          </div>
        )}
        {/* AI Features Tab */}
        {activeTab === 'ai' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">AI Features</h2>
              <button onClick={() => {
                const newFeature: AIFeature = {
                  id: Date.now().toString(),
                  title: 'New AI Feature',
                  description: 'Feature description',
                  icon: 'brain',
                  features: ['Feature 1', 'Feature 2'],
                  color: 'from-blue-500 to-cyan-500',
                  enabled: true
                }
                setAIFeatures([...aiFeatures, newFeature])
              }} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> Add AI Feature
              </button>
            </div>
            
            {/* Section Header */}
            <div className="border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Section Header</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={aiSection.badgeText}
                  onChange={(e) => setAISection(prev => ({ ...prev, badgeText: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Badge text"
                />
                <input
                  type="text"
                  value={aiSection.title}
                  onChange={(e) => setAISection(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section title"
                />
                <input
                  type="text"
                  value={aiSection.subtitle}
                  onChange={(e) => setAISection(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section subtitle"
                />
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Performance Metrics</h3>
              <input
                type="text"
                value={aiSection.performanceTitle}
                onChange={(e) => setAISection(prev => ({ ...prev, performanceTitle: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none mb-4"
                placeholder="Performance section title"
              />
              {aiSection.performanceMetrics?.map((metric, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-3">
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) => {
                      const newMetrics = [...(aiSection.performanceMetrics || [])]
                      newMetrics[index] = { ...metric, label: e.target.value }
                      setAISection(prev => ({ ...prev, performanceMetrics: newMetrics }))
                    }}
                    className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                    placeholder="Label"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => {
                      const newMetrics = [...(aiSection.performanceMetrics || [])]
                      newMetrics[index] = { ...metric, value: e.target.value }
                      setAISection(prev => ({ ...prev, performanceMetrics: newMetrics }))
                    }}
                    className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                    placeholder="Value"
                  />
                  <input
                    type="text"
                    value={metric.description}
                    onChange={(e) => {
                      const newMetrics = [...(aiSection.performanceMetrics || [])]
                      newMetrics[index] = { ...metric, description: e.target.value }
                      setAISection(prev => ({ ...prev, performanceMetrics: newMetrics }))
                    }}
                    className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
            
            {/* Academic Research */}
            <div className="border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Academic Research</h3>
              <input
                type="text"
                value={aiSection.academicTitle}
                onChange={(e) => setAISection(prev => ({ ...prev, academicTitle: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none mb-4"
                placeholder="Academic section title"
              />
              <textarea
                value={aiSection.academicDescription}
                onChange={(e) => setAISection(prev => ({ ...prev, academicDescription: e.target.value }))}
                rows={3}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                placeholder="Academic description"
              />
              {aiSection.academicPoints?.map((point, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 mb-3">
                  <input
                    type="text"
                    value={point.title}
                    onChange={(e) => {
                      const newPoints = [...(aiSection.academicPoints || [])]
                      newPoints[index] = { ...point, title: e.target.value }
                      setAISection(prev => ({ ...prev, academicPoints: newPoints }))
                    }}
                    className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                    placeholder="Point title"
                  />
                  <input
                    type="text"
                    value={point.description}
                    onChange={(e) => {
                      const newPoints = [...(aiSection.academicPoints || [])]
                      newPoints[index] = { ...point, description: e.target.value }
                      setAISection(prev => ({ ...prev, academicPoints: newPoints }))
                    }}
                    className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                    placeholder="Point description"
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {aiFeatures.map((feature) => (
                <div key={feature.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => setAIFeatures(aiFeatures.map(f => f.id === feature.id ? { ...f, title: e.target.value } : f))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="AI Feature title"
                    />
                    <select
                      value={feature.icon}
                      onChange={(e) => setAIFeatures(aiFeatures.map(f => f.id === feature.id ? { ...f, icon: e.target.value } : f))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    >
                      <option value="brain">Brain</option>
                      <option value="zap">Zap</option>
                      <option value="target">Target</option>
                      <option value="trending-up">Trending Up</option>
                    </select>
                    <input
                      type="text"
                      value={feature.color}
                      onChange={(e) => setAIFeatures(aiFeatures.map(f => f.id === feature.id ? { ...f, color: e.target.value } : f))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Gradient color (e.g., from-blue-500 to-cyan-500)"
                    />
                  </div>
                  <textarea
                    value={feature.description}
                    onChange={(e) => setAIFeatures(aiFeatures.map(f => f.id === feature.id ? { ...f, description: e.target.value } : f))}
                    rows={3}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="AI Feature description"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={feature.enabled}
                        onChange={(e) => setAIFeatures(aiFeatures.map(f => f.id === feature.id ? { ...f, enabled: e.target.checked } : f))}
                        className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                      />
                      <span className="text-text-secondary">Enabled</span>
                    </label>
                    <button
                      onClick={() => setAIFeatures(aiFeatures.filter(f => f.id !== feature.id))}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => { saveAIFeatures(aiFeatures); saveAIFeaturesSectionContent(aiSection); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save AI Features'}
              </button>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">FAQ</h2>
              <button onClick={() => {
                const newFAQ: FAQ = {
                  id: Date.now().toString(),
                  question: 'New Question',
                  answer: 'Answer here',
                  enabled: true
                }
                setFAQs([...faqs, newFAQ])
              }} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> Add FAQ
              </button>
            </div>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-600 rounded-lg p-4">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => setFAQs(faqs.map(f => f.id === faq.id ? { ...f, question: e.target.value } : f))}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none mb-4"
                    placeholder="Question"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => setFAQs(faqs.map(f => f.id === faq.id ? { ...f, answer: e.target.value } : f))}
                    rows={4}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="Answer"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={faq.enabled}
                        onChange={(e) => setFAQs(faqs.map(f => f.id === faq.id ? { ...f, enabled: e.target.checked } : f))}
                        className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                      />
                      <span className="text-text-secondary">Enabled</span>
                    </label>
                    <button
                      onClick={() => setFAQs(faqs.filter(f => f.id !== faq.id))}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => { saveFAQs(faqs); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save FAQs'}
              </button>
            </div>
          </div>
        )}

        {/* Downloads Tab - Connected to File Manager */}
        {activeTab === 'downloads' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Downloads (Connected to File Manager)</h2>
              <button onClick={() => setActiveTab('dbDownloads')} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Upload size={18} /> Go to File Manager
              </button>
            </div>
            
            <div className="border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Section Header</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={downloadSection.title}
                  onChange={(e) => setDownloadSection(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section title"
                />
                <textarea
                  value={downloadSection.description}
                  onChange={(e) => setDownloadSection(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                  placeholder="Section description"
                />
              </div>
            </div>
            
            <div className="bg-dark border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Files from Database ({dbDownloads.length})</h3>
              <div className="space-y-3">
                {dbDownloads.length === 0 ? (
                  <p className="text-text-secondary text-center py-8">No files uploaded yet. Go to File Manager to upload files.</p>
                ) : (
                  dbDownloads.map((file: any) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-dark-secondary rounded border border-gray-700">
                      <div>
                        <p className="font-medium">{file.platform} v{file.version}</p>
                        <p className="text-sm text-text-secondary">{file.filename} - {file.size}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs ${file.enabled ? 'bg-green-600' : 'bg-gray-600'}`}>
                        {file.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <button onClick={() => { saveDownloadSectionContent(downloadSection); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
            }`}>
              <Save size={18} /> {saved ? 'Saved!' : 'Save Section Content'}
            </button>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Benefits</h2>
              <button onClick={() => {
                const newBenefit: Benefit = {
                  id: Date.now().toString(),
                  title: 'New Benefit',
                  description: 'Benefit description',
                  icon: 'brain',
                  enabled: true
                }
                setBenefits([...benefits, newBenefit])
              }} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> Add Benefit
              </button>
            </div>
            
            {/* Section Header */}
            <div className="border border-gray-600 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-4 text-white">Section Header</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={benefitsSection.title}
                  onChange={(e) => setBenefitsSection(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section title"
                />
                <input
                  type="text"
                  value={benefitsSection.subtitle}
                  onChange={(e) => setBenefitsSection(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Section subtitle"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => setBenefits(benefits.map(b => b.id === benefit.id ? { ...b, title: e.target.value } : b))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Benefit title"
                    />
                    <select
                      value={benefit.icon}
                      onChange={(e) => setBenefits(benefits.map(b => b.id === benefit.id ? { ...b, icon: e.target.value } : b))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    >
                      <option value="brain">Brain</option>
                      <option value="monitor">Monitor</option>
                      <option value="shield">Shield</option>
                      <option value="activity">Activity</option>
                      <option value="dollar-sign">Dollar Sign</option>
                      <option value="leaf">Leaf</option>
                    </select>
                  </div>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => setBenefits(benefits.map(b => b.id === benefit.id ? { ...b, description: e.target.value } : b))}
                    rows={3}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="Benefit description"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={benefit.enabled}
                        onChange={(e) => setBenefits(benefits.map(b => b.id === benefit.id ? { ...b, enabled: e.target.checked } : b))}
                        className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                      />
                      <span className="text-text-secondary">Enabled</span>
                    </label>
                    <button
                      onClick={() => setBenefits(benefits.filter(b => b.id !== benefit.id))}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => { saveBenefits(benefits); saveBenefitsSectionContent(benefitsSection); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Benefits'}
              </button>
            </div>
          </div>
        )}
        {/* How It Works Tab */}
        {activeTab === 'howItWorks' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">How It Works Section</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={howItWorks.title}
                onChange={(e) => setHowItWorks(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Section title (use <span class='text-primary'>text</span> for highlighting)"
              />
              <textarea
                value={howItWorks.subtitle}
                onChange={(e) => setHowItWorks(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={3}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Section subtitle"
              />
              <input
                type="text"
                value={howItWorks.ctaText}
                onChange={(e) => setHowItWorks(prev => ({ ...prev, ctaText: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="CTA button text"
              />
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Steps</h3>
                  <button
                    onClick={() => {
                      const newStep = {
                        id: Date.now().toString(),
                        number: howItWorks.steps.length + 1,
                        icon: 'download',
                        title: 'New Step',
                        description: 'Step description',
                        details: ['Detail 1', 'Detail 2'],
                        enabled: true
                      }
                      setHowItWorks(prev => ({ ...prev, steps: [...(prev.steps || []), newStep] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Step
                  </button>
                </div>
                {howItWorks.steps.map((step, index) => (
                  <div key={step.id} className="border border-gray-600 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <input
                        type="number"
                        value={step.number}
                        onChange={(e) => {
                          const newSteps = [...howItWorks.steps]
                          newSteps[index] = { ...step, number: parseInt(e.target.value) }
                          setHowItWorks(prev => ({ ...prev, steps: newSteps }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Step number"
                      />
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...howItWorks.steps]
                          newSteps[index] = { ...step, title: e.target.value }
                          setHowItWorks(prev => ({ ...prev, steps: newSteps }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Step title"
                      />
                      <select
                        value={step.icon}
                        onChange={(e) => {
                          const newSteps = [...howItWorks.steps]
                          newSteps[index] = { ...step, icon: e.target.value }
                          setHowItWorks(prev => ({ ...prev, steps: newSteps }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="download">Download</option>
                        <option value="link">Link</option>
                        <option value="settings">Settings</option>
                        <option value="trending-up">Trending Up</option>
                        <option value="zap">Zap</option>
                        <option value="brain">Brain</option>
                      </select>
                    </div>
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...howItWorks.steps]
                        newSteps[index] = { ...step, description: e.target.value }
                        setHowItWorks(prev => ({ ...prev, steps: newSteps }))
                      }}
                      rows={2}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none resize-none mb-3 text-sm"
                      placeholder="Step description"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={step.enabled}
                          onChange={(e) => {
                            const newSteps = [...howItWorks.steps]
                            newSteps[index] = { ...step, enabled: e.target.checked }
                            setHowItWorks(prev => ({ ...prev, steps: newSteps }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newSteps = howItWorks.steps.filter((_, i) => i !== index)
                          setHowItWorks(prev => ({ ...prev, steps: newSteps }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => { saveHowItWorksContent(howItWorks); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save How It Works'}
              </button>
            </div>
          </div>
        )}

        {/* Technical Specs Tab */}
        {activeTab === 'techSpecs' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Technical Specifications</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={technicalSpecs.title}
                onChange={(e) => setTechnicalSpecs(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Section title (use <span class='text-primary'>text</span> for highlighting)"
              />
              <textarea
                value={technicalSpecs.subtitle}
                onChange={(e) => setTechnicalSpecs(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Section subtitle"
              />
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Supported Inverters</h3>
                  <button
                    onClick={() => {
                      const newInverter = {
                        id: Date.now().toString(),
                        brand: 'New Brand',
                        models: 'Model series',
                        protocol: 'Protocol',
                        status: 'Planned',
                        enabled: true
                      }
                      setTechnicalSpecs(prev => ({ ...prev, supportedInverters: [...prev.supportedInverters, newInverter] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Inverter
                  </button>
                </div>
                {technicalSpecs.supportedInverters?.map((inverter, index) => (
                  <div key={inverter.id} className="border border-gray-600 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={inverter.brand}
                        onChange={(e) => {
                          const newInverters = [...technicalSpecs.supportedInverters]
                          newInverters[index] = { ...inverter, brand: e.target.value }
                          setTechnicalSpecs(prev => ({ ...prev, supportedInverters: newInverters }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Brand name"
                      />
                      <input
                        type="text"
                        value={inverter.models}
                        onChange={(e) => {
                          const newInverters = [...technicalSpecs.supportedInverters]
                          newInverters[index] = { ...inverter, models: e.target.value }
                          setTechnicalSpecs(prev => ({ ...prev, supportedInverters: newInverters }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Models"
                      />
                      <input
                        type="text"
                        value={inverter.protocol}
                        onChange={(e) => {
                          const newInverters = [...technicalSpecs.supportedInverters]
                          newInverters[index] = { ...inverter, protocol: e.target.value }
                          setTechnicalSpecs(prev => ({ ...prev, supportedInverters: newInverters }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Protocol"
                      />
                      <select
                        value={inverter.status}
                        onChange={(e) => {
                          const newInverters = [...technicalSpecs.supportedInverters]
                          newInverters[index] = { ...inverter, status: e.target.value }
                          setTechnicalSpecs(prev => ({ ...prev, supportedInverters: newInverters }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="Full Support">Full Support</option>
                        <option value="Beta">Beta</option>
                        <option value="Planned">Planned</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={inverter.enabled}
                          onChange={(e) => {
                            const newInverters = [...technicalSpecs.supportedInverters]
                            newInverters[index] = { ...inverter, enabled: e.target.checked }
                            setTechnicalSpecs(prev => ({ ...prev, supportedInverters: newInverters }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newInverters = technicalSpecs.supportedInverters.filter((_, i) => i !== index)
                          setTechnicalSpecs(prev => ({ ...prev, supportedInverters: newInverters }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Network Ports</h3>
                  <button
                    onClick={() => {
                      const newPort = {
                        id: Date.now().toString(),
                        port: 'Port XXXX',
                        description: 'Service description',
                        enabled: true
                      }
                      setTechnicalSpecs(prev => ({ ...prev, networkPorts: [...(prev.networkPorts || []), newPort] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Port
                  </button>
                </div>
                {technicalSpecs.networkPorts?.map((port, index) => (
                  <div key={port.id} className="border border-gray-600 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={port.port}
                        onChange={(e) => {
                          const newPorts = [...(technicalSpecs.networkPorts || [])]
                          newPorts[index] = { ...port, port: e.target.value }
                          setTechnicalSpecs(prev => ({ ...prev, networkPorts: newPorts }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Port (e.g., Port 6789)"
                      />
                      <input
                        type="text"
                        value={port.description}
                        onChange={(e) => {
                          const newPorts = [...(technicalSpecs.networkPorts || [])]
                          newPorts[index] = { ...port, description: e.target.value }
                          setTechnicalSpecs(prev => ({ ...prev, networkPorts: newPorts }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Description"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={port.enabled}
                          onChange={(e) => {
                            const newPorts = [...(technicalSpecs.networkPorts || [])]
                            newPorts[index] = { ...port, enabled: e.target.checked }
                            setTechnicalSpecs(prev => ({ ...prev, networkPorts: newPorts }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newPorts = (technicalSpecs.networkPorts || []).filter((_, i) => i !== index)
                          setTechnicalSpecs(prev => ({ ...prev, networkPorts: newPorts }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => { saveTechnicalSpecsContent(technicalSpecs); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Technical Specs'}
              </button>
            </div>
          </div>
        )}

        {/* Installation Tab */}
        {activeTab === 'installation' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Installation Section</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={installation.title}
                onChange={(e) => setInstallation(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Section title"
              />
              <textarea
                value={installation.subtitle}
                onChange={(e) => setInstallation(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Section subtitle"
              />
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Installation Platforms</h3>
                  <button
                    onClick={() => {
                      const newPlatform = {
                        id: Date.now().toString(),
                        name: 'New Platform',
                        steps: ['Step 1'],
                        requirements: ['Requirement 1'],
                        enabled: true
                      }
                      setInstallation(prev => ({ ...prev, platforms: [...(prev.platforms || []), newPlatform] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Platform
                  </button>
                </div>
                {installation.platforms?.map((platform, pIndex) => (
                  <div key={platform.id} className="border border-gray-600 rounded-lg p-4 mb-4">
                    <input
                      type="text"
                      value={platform.name}
                      onChange={(e) => {
                        const newPlatforms = [...installation.platforms]
                        newPlatforms[pIndex] = { ...platform, name: e.target.value }
                        setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                      }}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm mb-3"
                      placeholder="Platform name"
                    />
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-white">Steps</label>
                        <button
                          onClick={() => {
                            const newPlatforms = [...installation.platforms]
                            newPlatforms[pIndex].steps.push('New step')
                            setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                          }}
                          className="text-primary hover:text-primary-dark text-xs"
                        >
                          + Add Step
                        </button>
                      </div>
                      {platform.steps.map((step, sIndex) => (
                        <div key={sIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => {
                              const newPlatforms = [...installation.platforms]
                              newPlatforms[pIndex].steps[sIndex] = e.target.value
                              setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                            }}
                            className="flex-1 p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-xs"
                            placeholder="Step description"
                          />
                          <button
                            onClick={() => {
                              const newPlatforms = [...installation.platforms]
                              newPlatforms[pIndex].steps = platform.steps.filter((_, i) => i !== sIndex)
                              setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-white">Requirements</label>
                        <button
                          onClick={() => {
                            const newPlatforms = [...installation.platforms]
                            newPlatforms[pIndex].requirements.push('New requirement')
                            setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                          }}
                          className="text-primary hover:text-primary-dark text-xs"
                        >
                          + Add Requirement
                        </button>
                      </div>
                      {platform.requirements.map((req, rIndex) => (
                        <div key={rIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => {
                              const newPlatforms = [...installation.platforms]
                              newPlatforms[pIndex].requirements[rIndex] = e.target.value
                              setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                            }}
                            className="flex-1 p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-xs"
                            placeholder="Requirement"
                          />
                          <button
                            onClick={() => {
                              const newPlatforms = [...installation.platforms]
                              newPlatforms[pIndex].requirements = platform.requirements.filter((_, i) => i !== rIndex)
                              setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                            }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={platform.enabled}
                          onChange={(e) => {
                            const newPlatforms = [...installation.platforms]
                            newPlatforms[pIndex] = { ...platform, enabled: e.target.checked }
                            setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newPlatforms = installation.platforms.filter((_, i) => i !== pIndex)
                          setInstallation(prev => ({ ...prev, platforms: newPlatforms }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Stats</h3>
                  <button
                    onClick={() => {
                      const newStat = {
                        id: Date.now().toString(),
                        value: '0',
                        label: 'Label',
                        enabled: true
                      }
                      setInstallation(prev => ({ ...prev, stats: [...(prev.stats || []), newStat] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Stat
                  </button>
                </div>
                {installation.stats?.map((stat, index) => (
                  <div key={stat.id} className="border border-gray-600 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...installation.stats]
                          newStats[index] = { ...stat, value: e.target.value }
                          setInstallation(prev => ({ ...prev, stats: newStats }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Value"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...installation.stats]
                          newStats[index] = { ...stat, label: e.target.value }
                          setInstallation(prev => ({ ...prev, stats: newStats }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Label"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={stat.enabled}
                          onChange={(e) => {
                            const newStats = [...installation.stats]
                            newStats[index] = { ...stat, enabled: e.target.checked }
                            setInstallation(prev => ({ ...prev, stats: newStats }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newStats = installation.stats.filter((_, i) => i !== index)
                          setInstallation(prev => ({ ...prev, stats: newStats }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => { saveInstallationContent(installation); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Installation'}
              </button>
            </div>
          </div>
        )}

        {/* User Guide Tab */}
        {activeTab === 'userGuide' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">User Guide Section</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={userGuide.title}
                onChange={(e) => setUserGuide(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Section title"
              />
              <textarea
                value={userGuide.subtitle}
                onChange={(e) => setUserGuide(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Section subtitle"
              />
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Guide Sections</h3>
                  <button
                    onClick={() => {
                      const newSection = {
                        id: Date.now().toString(),
                        title: 'New Section',
                        description: 'Section description',
                        icon: 'book',
                        subsections: [{ title: 'Subsection', steps: ['Step 1'] }],
                        enabled: true
                      }
                      setUserGuide(prev => ({ ...prev, sections: [...(prev.sections || []), newSection] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Section
                  </button>
                </div>
                {userGuide.sections?.map((section, sIndex) => (
                  <div key={section.id} className="border border-gray-600 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...userGuide.sections]
                          newSections[sIndex] = { ...section, title: e.target.value }
                          setUserGuide(prev => ({ ...prev, sections: newSections }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Section title"
                      />
                      <select
                        value={section.icon}
                        onChange={(e) => {
                          const newSections = [...userGuide.sections]
                          newSections[sIndex] = { ...section, icon: e.target.value }
                          setUserGuide(prev => ({ ...prev, sections: newSections }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="rocket">Rocket</option>
                        <option value="settings">Settings</option>
                        <option value="zap">Zap</option>
                        <option value="brain">Brain</option>
                        <option value="database">Database</option>
                        <option value="bell">Bell</option>
                        <option value="target">Target</option>
                        <option value="shield">Shield</option>
                      </select>
                    </div>
                    <textarea
                      value={section.description}
                      onChange={(e) => {
                        const newSections = [...userGuide.sections]
                        newSections[sIndex] = { ...section, description: e.target.value }
                        setUserGuide(prev => ({ ...prev, sections: newSections }))
                      }}
                      rows={2}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none resize-none text-sm mb-3"
                      placeholder="Section description"
                    />
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-white">Subsections</label>
                        <button
                          onClick={() => {
                            const newSections = [...userGuide.sections]
                            newSections[sIndex].subsections.push({ title: 'New Subsection', steps: ['Step 1'] })
                            setUserGuide(prev => ({ ...prev, sections: newSections }))
                          }}
                          className="text-primary hover:text-primary-dark text-xs"
                        >
                          + Add Subsection
                        </button>
                      </div>
                      {section.subsections.map((subsection, ssIndex) => (
                        <div key={ssIndex} className="border border-gray-500 rounded p-3 mb-2">
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={subsection.title}
                              onChange={(e) => {
                                const newSections = [...userGuide.sections]
                                newSections[sIndex].subsections[ssIndex].title = e.target.value
                                setUserGuide(prev => ({ ...prev, sections: newSections }))
                              }}
                              className="flex-1 p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-xs"
                              placeholder="Subsection title"
                            />
                            <button
                              onClick={() => {
                                const newSections = [...userGuide.sections]
                                newSections[sIndex].subsections = section.subsections.filter((_, i) => i !== ssIndex)
                                setUserGuide(prev => ({ ...prev, sections: newSections }))
                              }}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="text-xs text-gray-400">Steps</label>
                            <button
                              onClick={() => {
                                const newSections = [...userGuide.sections]
                                newSections[sIndex].subsections[ssIndex].steps.push('New step')
                                setUserGuide(prev => ({ ...prev, sections: newSections }))
                              }}
                              className="text-primary hover:text-primary-dark text-xs"
                            >
                              + Step
                            </button>
                          </div>
                          {subsection.steps.map((step, stIndex) => (
                            <div key={stIndex} className="flex gap-1 mb-1">
                              <input
                                type="text"
                                value={step}
                                onChange={(e) => {
                                  const newSections = [...userGuide.sections]
                                  newSections[sIndex].subsections[ssIndex].steps[stIndex] = e.target.value
                                  setUserGuide(prev => ({ ...prev, sections: newSections }))
                                }}
                                className="flex-1 p-1 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-xs"
                                placeholder="Step"
                              />
                              <button
                                onClick={() => {
                                  const newSections = [...userGuide.sections]
                                  newSections[sIndex].subsections[ssIndex].steps = subsection.steps.filter((_, i) => i !== stIndex)
                                  setUserGuide(prev => ({ ...prev, sections: newSections }))
                                }}
                                className="text-red-400 hover:text-red-300 p-1"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={section.enabled}
                          onChange={(e) => {
                            const newSections = [...userGuide.sections]
                            newSections[sIndex] = { ...section, enabled: e.target.checked }
                            setUserGuide(prev => ({ ...prev, sections: newSections }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newSections = userGuide.sections.filter((_, i) => i !== sIndex)
                          setUserGuide(prev => ({ ...prev, sections: newSections }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Pro Tips</h3>
                  <button
                    onClick={() => {
                      const newTip = {
                        id: Date.now().toString(),
                        icon: 'lightbulb',
                        title: 'New Tip',
                        description: 'Tip description',
                        enabled: true
                      }
                      setUserGuide(prev => ({ ...prev, proTips: [...(prev.proTips || []), newTip] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Tip
                  </button>
                </div>
                {userGuide.proTips?.map((tip, tIndex) => (
                  <div key={tip.id} className="border border-gray-600 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={tip.title}
                        onChange={(e) => {
                          const newTips = [...userGuide.proTips]
                          newTips[tIndex] = { ...tip, title: e.target.value }
                          setUserGuide(prev => ({ ...prev, proTips: newTips }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Tip title"
                      />
                      <select
                        value={tip.icon}
                        onChange={(e) => {
                          const newTips = [...userGuide.proTips]
                          newTips[tIndex] = { ...tip, icon: e.target.value }
                          setUserGuide(prev => ({ ...prev, proTips: newTips }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="lightbulb">Lightbulb</option>
                        <option value="bar-chart">Bar Chart</option>
                        <option value="zap">Zap</option>
                        <option value="battery">Battery</option>
                      </select>
                    </div>
                    <textarea
                      value={tip.description}
                      onChange={(e) => {
                        const newTips = [...userGuide.proTips]
                        newTips[tIndex] = { ...tip, description: e.target.value }
                        setUserGuide(prev => ({ ...prev, proTips: newTips }))
                      }}
                      rows={2}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none resize-none text-sm mb-2"
                      placeholder="Tip description"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tip.enabled}
                          onChange={(e) => {
                            const newTips = [...userGuide.proTips]
                            newTips[tIndex] = { ...tip, enabled: e.target.checked }
                            setUserGuide(prev => ({ ...prev, proTips: newTips }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newTips = userGuide.proTips.filter((_, i) => i !== tIndex)
                          setUserGuide(prev => ({ ...prev, proTips: newTips }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => { saveUserGuideContent(userGuide); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save User Guide'}
              </button>
            </div>
          </div>
        )}

        {/* API Docs Tab */}
        {activeTab === 'apiDocs' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">API Documentation</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={apiDocs.title}
                onChange={(e) => setAPIDocs(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Section title"
              />
              <textarea
                value={apiDocs.subtitle}
                onChange={(e) => setAPIDocs(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Section subtitle"
              />
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">API Endpoints</h3>
                  <button
                    onClick={() => {
                      const newEndpoint = {
                        id: Date.now().toString(),
                        category: 'System',
                        method: 'GET',
                        path: '/api/endpoint',
                        description: 'Endpoint description',
                        enabled: true
                      }
                      setAPIDocs(prev => ({ ...prev, endpoints: [...prev.endpoints, newEndpoint] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Endpoint
                  </button>
                </div>
                {apiDocs.endpoints?.map((endpoint, index) => (
                  <div key={endpoint.id} className="border border-gray-600 rounded-lg p-4 mb-3">
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <select
                        value={endpoint.method}
                        onChange={(e) => {
                          const newEndpoints = [...apiDocs.endpoints]
                          newEndpoints[index] = { ...endpoint, method: e.target.value }
                          setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                      <input
                        type="text"
                        value={endpoint.path}
                        onChange={(e) => {
                          const newEndpoints = [...apiDocs.endpoints]
                          newEndpoints[index] = { ...endpoint, path: e.target.value }
                          setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Path"
                      />
                      <input
                        type="text"
                        value={endpoint.category}
                        onChange={(e) => {
                          const newEndpoints = [...apiDocs.endpoints]
                          newEndpoints[index] = { ...endpoint, category: e.target.value }
                          setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Category"
                      />
                    </div>
                    <textarea
                      value={endpoint.description}
                      onChange={(e) => {
                        const newEndpoints = [...apiDocs.endpoints]
                        newEndpoints[index] = { ...endpoint, description: e.target.value }
                        setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                      }}
                      rows={2}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none resize-none text-sm mb-2"
                      placeholder="Description"
                    />
                    <textarea
                      value={endpoint.response || ''}
                      onChange={(e) => {
                        const newEndpoints = [...apiDocs.endpoints]
                        newEndpoints[index] = { ...endpoint, response: e.target.value }
                        setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                      }}
                      rows={3}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none resize-none text-sm mb-2"
                      placeholder="Response JSON (optional)"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={endpoint.enabled}
                          onChange={(e) => {
                            const newEndpoints = [...apiDocs.endpoints]
                            newEndpoints[index] = { ...endpoint, enabled: e.target.checked }
                            setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newEndpoints = apiDocs.endpoints.filter((_, i) => i !== index)
                          setAPIDocs(prev => ({ ...prev, endpoints: newEndpoints }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button onClick={() => { saveAPIDocsContent(apiDocs); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save API Docs'}
              </button>
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Community Section</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={community.title}
                onChange={(e) => setCommunity(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Title (use <span class='text-primary'>text</span>)"
              />
              <textarea
                value={community.subtitle}
                onChange={(e) => setCommunity(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Subtitle"
              />
              <input
                type="text"
                value={community.ctaTitle}
                onChange={(e) => setCommunity(prev => ({ ...prev, ctaTitle: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="CTA Title"
              />
              <textarea
                value={community.ctaSubtitle}
                onChange={(e) => setCommunity(prev => ({ ...prev, ctaSubtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="CTA Subtitle"
              />
              <button onClick={() => { saveCommunityContent(community); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Community'}
              </button>
            </div>
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Comparison Table</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={comparison.title}
                onChange={(e) => setComparison(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Title"
              />
              <textarea
                value={comparison.subtitle}
                onChange={(e) => setComparison(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Subtitle"
              />
              
              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Features</h3>
                  <button
                    onClick={() => {
                      const newFeature = {
                        id: Date.now().toString(),
                        name: 'New Feature',
                        traditional: false,
                        ha: false,
                        solar: true,
                        enabled: true
                      }
                      setComparison(prev => ({ ...prev, features: [...prev.features, newFeature] }))
                    }}
                    className="flex items-center gap-2 bg-primary text-dark px-3 py-1 rounded text-sm hover:bg-primary-dark"
                  >
                    <Plus size={14} /> Add Feature
                  </button>
                </div>
                {comparison.features?.map((feature, index) => (
                  <div key={feature.id} className="border border-gray-600 rounded-lg p-4 mb-3">
                    <input
                      type="text"
                      value={feature.name}
                      onChange={(e) => {
                        const newFeatures = [...comparison.features]
                        newFeatures[index] = { ...feature, name: e.target.value }
                        setComparison(prev => ({ ...prev, features: newFeatures }))
                      }}
                      className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm mb-2"
                      placeholder="Feature name"
                    />
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        value={String(feature.traditional)}
                        onChange={(e) => {
                          const newFeatures = [...comparison.features]
                          newFeatures[index] = { ...feature, traditional: e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value }
                          setComparison(prev => ({ ...prev, features: newFeatures }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Traditional"
                      />
                      <input
                        type="text"
                        value={String(feature.ha)}
                        onChange={(e) => {
                          const newFeatures = [...comparison.features]
                          newFeatures[index] = { ...feature, ha: e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value }
                          setComparison(prev => ({ ...prev, features: newFeatures }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="Home Assistant"
                      />
                      <input
                        type="text"
                        value={String(feature.solar)}
                        onChange={(e) => {
                          const newFeatures = [...comparison.features]
                          newFeatures[index] = { ...feature, solar: e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value }
                          setComparison(prev => ({ ...prev, features: newFeatures }))
                        }}
                        className="w-full p-2 bg-dark border border-gray-600 rounded text-white focus:border-primary focus:outline-none text-sm"
                        placeholder="SolarAutopilot"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={feature.enabled}
                          onChange={(e) => {
                            const newFeatures = [...comparison.features]
                            newFeatures[index] = { ...feature, enabled: e.target.checked }
                            setComparison(prev => ({ ...prev, features: newFeatures }))
                          }}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary text-sm">Enabled</span>
                      </label>
                      <button
                        onClick={() => {
                          const newFeatures = comparison.features.filter((_, i) => i !== index)
                          setComparison(prev => ({ ...prev, features: newFeatures }))
                        }}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <input
                type="text"
                value={comparison.bottomTitle}
                onChange={(e) => setComparison(prev => ({ ...prev, bottomTitle: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="Bottom Title"
              />
              <textarea
                value={comparison.bottomSubtitle}
                onChange={(e) => setComparison(prev => ({ ...prev, bottomSubtitle: e.target.value }))}
                rows={2}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="Bottom Subtitle"
              />
              
              <button onClick={() => { saveComparisonContent(comparison); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Comparison'}
              </button>
            </div>
          </div>
        )}

        {/* File Manager Tab */}
        {activeTab === 'dbDownloads' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">File Manager</h2>
              <label className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark cursor-pointer">
                <Upload size={18} />
                <span>{uploading ? 'Uploading...' : 'Upload File'}</span>
                <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
            
            {dbDownloads.length === 0 && (
              <div className="border border-primary/30 bg-primary/5 rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Upload size={20} className="text-primary" />
                  How to Add Downloads to Website
                </h3>
                <ol className="space-y-2 text-text-secondary text-sm">
                  <li className="flex gap-2"><span className="text-primary font-bold">1.</span> Click "Upload File" button above</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">2.</span> Enter platform name (e.g., Windows x64, macOS, Linux, Home Assistant)</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">3.</span> Enter version number (e.g., 2.1.0)</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">4.</span> Optionally add checksum for security verification</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">5.</span> Select installer file from your computer</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">6.</span> File will be uploaded and instantly appear on homepage</li>
                </ol>
                <p className="text-primary text-sm mt-4 font-medium">💡 Tip: Enable/disable files anytime without deleting them</p>
              </div>
            )}
            
            <div className="space-y-4">
              {dbDownloads.map((download: any) => (
                <div key={download.id} className="border border-gray-600 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{download.platform} - v{download.version}</h3>
                    <p className="text-text-secondary text-sm">{download.filename} ({download.size})</p>
                    <p className="text-xs text-text-secondary mt-1">Downloads: {download.downloads}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleDbDownload(download.id, download.enabled)}
                      className={`px-4 py-2 rounded ${download.enabled ? 'bg-green-600' : 'bg-gray-600'}`}
                    >
                      {download.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                    <button onClick={() => deleteDbDownload(download.id)} className="text-red-400 hover:text-red-300 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Blog Posts</h2>
              <button onClick={() => setEditingBlog({ title: '', slug: '', excerpt: '', content: '', tags: [], published: false })} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> New Post
              </button>
            </div>
            
            {editingBlog ? (
              <div className="border border-gray-600 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium mb-4 text-white">{editingBlog.id ? 'Edit Post' : 'New Post'}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Post title"
                  />
                  <input
                    type="text"
                    value={editingBlog.slug}
                    onChange={(e) => setEditingBlog({...editingBlog, slug: e.target.value})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Slug (URL-friendly)"
                  />
                  <textarea
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                    rows={2}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                    placeholder="Short excerpt"
                  />
                  <textarea
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                    rows={10}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none font-mono text-sm"
                    placeholder="Content (Markdown supported)"
                  />
                  <input
                    type="text"
                    value={editingBlog.coverImage || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, coverImage: e.target.value})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Cover image URL (optional)"
                  />
                  <input
                    type="text"
                    value={Array.isArray(editingBlog.tags) ? editingBlog.tags.join(', ') : ''}
                    onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Tags (comma-separated)"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingBlog.published}
                      onChange={(e) => setEditingBlog({...editingBlog, published: e.target.checked})}
                      className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                    />
                    <span className="text-white">Publish immediately</span>
                  </label>
                  <div className="flex gap-2">
                    <button onClick={async () => {
                      const method = editingBlog.id ? 'PUT' : 'POST'
                      await fetch('/api/blog', {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(editingBlog)
                      })
                      setEditingBlog(null)
                      fetchBlogPosts()
                      showSaved()
                    }} className="flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg hover:bg-primary-dark">
                      <Save size={18} /> {editingBlog.id ? 'Update' : 'Create'} Post
                    </button>
                    <button onClick={() => setEditingBlog(null)} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-4">
              {blogPosts.map((post: any) => (
                <div key={post.id} className="border border-gray-600 rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">{post.title}</h3>
                      <p className="text-text-secondary text-sm mt-1">{post.excerpt}</p>
                      <div className="flex gap-2 mt-3">
                        <span className={`px-2 py-1 rounded text-xs ${post.published ? 'bg-green-600' : 'bg-gray-600'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        {post.tags?.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingBlog(post)} className="text-text-secondary hover:text-white p-2">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={async () => {
                        if (confirm('Delete this post?')) {
                          await fetch(`/api/blog?id=${post.id}`, { method: 'DELETE' })
                          fetchBlogPosts()
                        }
                      }} className="text-red-400 hover:text-red-300 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Changelog Tab */}
        {activeTab === 'changelog' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Changelog</h2>
              <button onClick={() => setEditingChangelog({ version: '', title: '', releaseDate: new Date().toISOString().split('T')[0], type: 'feature', changes: [] })} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> New Entry
              </button>
            </div>
            
            {editingChangelog ? (
              <div className="border border-gray-600 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium mb-4 text-white">{editingChangelog.id ? 'Edit Entry' : 'New Entry'}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editingChangelog.version}
                      onChange={(e) => setEditingChangelog({...editingChangelog, version: e.target.value})}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Version (e.g., 2.1.0)"
                    />
                    <input
                      type="date"
                      value={editingChangelog.releaseDate}
                      onChange={(e) => setEditingChangelog({...editingChangelog, releaseDate: e.target.value})}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={editingChangelog.title}
                    onChange={(e) => setEditingChangelog({...editingChangelog, title: e.target.value})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Release title"
                  />
                  <select
                    value={editingChangelog.type}
                    onChange={(e) => setEditingChangelog({...editingChangelog, type: e.target.value})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  >
                    <option value="feature">Feature</option>
                    <option value="bugfix">Bug Fix</option>
                    <option value="security">Security</option>
                    <option value="performance">Performance</option>
                  </select>
                  <textarea
                    value={Array.isArray(editingChangelog.changes) ? editingChangelog.changes.join('\n') : ''}
                    onChange={(e) => setEditingChangelog({...editingChangelog, changes: e.target.value.split('\n').filter(Boolean)})}
                    rows={6}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none font-mono text-sm"
                    placeholder="Changes (one per line)"
                  />
                  <div className="flex gap-2">
                    <button onClick={async () => {
                      const method = editingChangelog.id ? 'PUT' : 'POST'
                      await fetch('/api/changelog', {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(editingChangelog)
                      })
                      setEditingChangelog(null)
                      fetchChangelogs()
                      showSaved()
                    }} className="flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg hover:bg-primary-dark">
                      <Save size={18} /> {editingChangelog.id ? 'Update' : 'Create'} Entry
                    </button>
                    <button onClick={() => setEditingChangelog(null)} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-4">
              {changelogs.map((log: any) => (
                <div key={log.id} className="border border-gray-600 rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-white">{log.version}</h3>
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded text-xs">{log.type}</span>
                      </div>
                      <p className="text-white font-medium">{log.title}</p>
                      <p className="text-text-secondary text-sm mt-1">{new Date(log.releaseDate).toLocaleDateString()}</p>
                      {log.changes && log.changes.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {log.changes.slice(0, 3).map((change: string, i: number) => (
                            <li key={i} className="text-text-secondary text-sm">• {change}</li>
                          ))}
                          {log.changes.length > 3 && <li className="text-text-secondary text-sm">• +{log.changes.length - 3} more...</li>}
                        </ul>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingChangelog(log)} className="text-text-secondary hover:text-white p-2">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={async () => {
                        if (confirm('Delete this changelog entry?')) {
                          await fetch(`/api/changelog?id=${log.id}`, { method: 'DELETE' })
                          fetchChangelogs()
                        }
                      }} className="text-red-400 hover:text-red-300 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Roadmap</h2>
              <button onClick={() => setEditingRoadmap({ title: '', description: '', status: 'planned', priority: 'medium', category: 'feature', targetDate: '' })} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> New Item
              </button>
            </div>
            
            {editingRoadmap ? (
              <div className="border border-gray-600 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium mb-4 text-white">{editingRoadmap.id ? 'Edit Item' : 'New Item'}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingRoadmap.title}
                    onChange={(e) => setEditingRoadmap({...editingRoadmap, title: e.target.value})}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    placeholder="Feature title"
                  />
                  <textarea
                    value={editingRoadmap.description}
                    onChange={(e) => setEditingRoadmap({...editingRoadmap, description: e.target.value})}
                    rows={3}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={editingRoadmap.status}
                      onChange={(e) => setEditingRoadmap({...editingRoadmap, status: e.target.value})}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <select
                      value={editingRoadmap.priority}
                      onChange={(e) => setEditingRoadmap({...editingRoadmap, priority: e.target.value})}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={editingRoadmap.category}
                      onChange={(e) => setEditingRoadmap({...editingRoadmap, category: e.target.value})}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                    >
                      <option value="feature">Feature</option>
                      <option value="improvement">Improvement</option>
                      <option value="bugfix">Bug Fix</option>
                      <option value="integration">Integration</option>
                    </select>
                    <input
                      type="date"
                      value={editingRoadmap.targetDate || ''}
                      onChange={(e) => setEditingRoadmap({...editingRoadmap, targetDate: e.target.value})}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Target date (optional)"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={async () => {
                      const method = editingRoadmap.id ? 'PUT' : 'POST'
                      await fetch('/api/roadmap', {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(editingRoadmap)
                      })
                      setEditingRoadmap(null)
                      fetchRoadmaps()
                      showSaved()
                    }} className="flex items-center gap-2 bg-primary text-dark px-6 py-3 rounded-lg hover:bg-primary-dark">
                      <Save size={18} /> {editingRoadmap.id ? 'Update' : 'Create'} Item
                    </button>
                    <button onClick={() => setEditingRoadmap(null)} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['planned', 'in-progress', 'completed'].map(status => (
                <div key={status} className="border border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4 capitalize">{status.replace('-', ' ')}</h3>
                  <div className="space-y-3">
                    {roadmaps.filter((item: any) => item.status === status).map((item: any) => (
                      <div key={item.id} className="bg-dark border border-gray-700 rounded-lg p-3 hover:border-primary transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white text-sm">{item.title}</h4>
                          <div className="flex gap-1">
                            <button onClick={() => setEditingRoadmap(item)} className="text-text-secondary hover:text-white p-1">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={async () => {
                              if (confirm('Delete this roadmap item?')) {
                                await fetch(`/api/roadmap?id=${item.id}`, { method: 'DELETE' })
                                fetchRoadmaps()
                              }
                            }} className="text-red-400 hover:text-red-300 p-1">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-text-secondary text-xs mb-2">{item.description}</p>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.priority === 'critical' ? 'bg-red-600' :
                            item.priority === 'high' ? 'bg-orange-600' :
                            item.priority === 'medium' ? 'bg-yellow-600' : 'bg-gray-600'
                          }`}>{item.priority}</span>
                          <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">{item.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Tutorials Tab */}
        {activeTab === 'videos' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Video Tutorials</h2>
              <button onClick={() => {
                const newTutorial: VideoTutorial = {
                  id: Date.now().toString(),
                  title: 'New Tutorial',
                  duration: '0:00',
                  rating: 5.0,
                  videoId: 'I76HPteaZuE',
                  startTime: 0,
                  description: 'Tutorial description',
                  topics: ['Topic 1'],
                  enabled: true
                }
                setVideoTutorials([...videoTutorials, newTutorial])
              }} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> Add Tutorial
              </button>
            </div>
            <div className="space-y-6">
              {videoTutorials.map((tutorial) => (
                <div key={tutorial.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={tutorial.title}
                      onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, title: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Tutorial title"
                    />
                    <input
                      type="text"
                      value={tutorial.duration}
                      onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, duration: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Duration (e.g., 5:32)"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={tutorial.videoId}
                      onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, videoId: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="YouTube Video ID"
                    />
                    <input
                      type="number"
                      value={tutorial.startTime}
                      onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, startTime: parseInt(e.target.value) } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Start time (seconds)"
                      min="0"
                    />
                    <input
                      type="number"
                      value={tutorial.rating}
                      onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, rating: parseFloat(e.target.value) } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Rating (1-5)"
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>
                  <textarea
                    value={tutorial.description}
                    onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, description: e.target.value } : t))}
                    rows={3}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="Tutorial description"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tutorial.enabled}
                        onChange={(e) => setVideoTutorials(videoTutorials.map(t => t.id === tutorial.id ? { ...t, enabled: e.target.checked } : t))}
                        className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                      />
                      <span className="text-text-secondary">Enabled</span>
                    </label>
                    <button
                      onClick={() => setVideoTutorials(videoTutorials.filter(t => t.id !== tutorial.id))}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => { saveVideoTutorials(videoTutorials); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Tutorials'}
              </button>
            </div>
          </div>
        )}
        {/* Final CTA Tab */}
        {activeTab === 'cta' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Final CTA Section</h2>
            <div className="space-y-6">
              <input
                type="text"
                value={ctaContent.title}
                onChange={(e) => setCTAContent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                placeholder="CTA Title"
              />
              <textarea
                value={ctaContent.subtitle}
                onChange={(e) => setCTAContent(prev => ({ ...prev, subtitle: e.target.value }))}
                rows={3}
                className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none"
                placeholder="CTA Subtitle"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={ctaContent.primaryButton}
                  onChange={(e) => setCTAContent(prev => ({ ...prev, primaryButton: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Primary Button"
                />
                <input
                  type="text"
                  value={ctaContent.secondaryButton}
                  onChange={(e) => setCTAContent(prev => ({ ...prev, secondaryButton: e.target.value }))}
                  className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                  placeholder="Secondary Button"
                />
              </div>
              <button onClick={() => { saveCTAContent(ctaContent); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save CTA'}
              </button>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="bg-dark-secondary rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary">Pricing Tiers</h2>
              <button onClick={() => {
                const newTier: PricingTier = {
                  id: Date.now().toString(),
                  name: 'New Plan',
                  price: '$0',
                  description: 'Plan description',
                  features: ['Feature 1', 'Feature 2'],
                  highlighted: false,
                  enabled: true,
                  buttonText: 'Get Started',
                  buttonLink: '/contact'
                }
                setPricingTiers([...pricingTiers, newTier])
              }} className="flex items-center gap-2 bg-primary text-dark px-4 py-2 rounded-lg hover:bg-primary-dark">
                <Plus size={18} /> Add Tier
              </button>
            </div>
            <div className="space-y-6">
              {pricingTiers.map((tier) => (
                <div key={tier.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, name: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Plan name"
                    />
                    <input
                      type="text"
                      value={tier.price}
                      onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, price: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Price (e.g., $9.99)"
                    />
                    <input
                      type="text"
                      value={tier.period || ''}
                      onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, period: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Period (e.g., /month)"
                    />
                  </div>
                  <textarea
                    value={tier.description}
                    onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, description: e.target.value } : t))}
                    rows={2}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="Description"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={tier.buttonText}
                      onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, buttonText: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Button text"
                    />
                    <input
                      type="text"
                      value={tier.buttonLink}
                      onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, buttonLink: e.target.value } : t))}
                      className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                      placeholder="Button link"
                    />
                  </div>
                  <textarea
                    value={tier.features.join('\n')}
                    onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, features: e.target.value.split('\n').filter(Boolean) } : t))}
                    rows={4}
                    className="w-full p-3 bg-dark border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none resize-none mb-4"
                    placeholder="Features (one per line)"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tier.enabled}
                          onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, enabled: e.target.checked } : t))}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary">Enabled</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tier.highlighted}
                          onChange={(e) => setPricingTiers(pricingTiers.map(t => t.id === tier.id ? { ...t, highlighted: e.target.checked } : t))}
                          className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-text-secondary">Highlighted</span>
                      </label>
                    </div>
                    <button
                      onClick={() => setPricingTiers(pricingTiers.filter(t => t.id !== tier.id))}
                      className="flex items-center gap-2 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => { savePricingTiers(pricingTiers); showSaved(); }} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                saved ? 'bg-green-600 text-white' : 'bg-primary text-dark hover:bg-primary-dark'
              }`}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Pricing'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}