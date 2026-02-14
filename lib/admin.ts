import { fetchContent, saveContent } from './storage'

export interface HeroContent {
  title: string
  subtitle: string
  primaryCTA: string
  secondaryCTA: string
}

export interface HeaderContent {
  logo: string
  logoImage?: string
  navigation: { label: string; href: string }[]
}

export interface FooterContent {
  companyName: string
  logo: string
  logoImage?: string
  description: string
  sections: {
    title: string
    links: { name: string; href: string; external?: boolean }[]
  }[]
  socialLinks: { name: string; href: string; icon: string }[]
  copyright: string
  statusText: string
  showStatus: boolean
  madeByText: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
  image: string
  uploadedImage?: string
  stats: string[]
}

export interface AIFeature {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  color: string
  enabled: boolean
}

export interface FAQ {
  id: string
  question: string
  answer: string
  enabled: boolean
}

export interface DownloadItem {
  id: string
  platform: string
  version: string
  url: string
  size: string
  enabled: boolean
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
}

export interface CTAContent {
  title: string
  subtitle: string
  primaryButton: string
  secondaryButton: string
}

export interface VideoTutorial {
  id: string
  title: string
  duration: string
  rating: number
  videoId: string
  startTime: number
  description: string
  topics: string[]
  enabled: boolean
}

export interface TechnicalSpec {
  id: string
  category: string
  items: { label: string; value: string }[]
  enabled: boolean
}

export interface UserGuideContent {
  title: string
  subtitle: string
  sections: UserGuideSection[]
  proTips: ProTip[]
}

export interface UserGuideSection {
  id: string
  title: string
  description: string
  icon: string
  subsections: UserGuideSubsection[]
  enabled: boolean
}

export interface UserGuideSubsection {
  title: string
  steps: string[]
}

export interface ProTip {
  id: string
  icon: string
  title: string
  description: string
  enabled: boolean
}

export interface PricingTier {
  id: string
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted: boolean
  enabled: boolean
  buttonText: string
  buttonLink: string
}

export interface DownloadSectionContent {
  title: string
  description: string
}

export interface FeaturesSectionContent {
  title: string
  subtitle: string
}

export interface BenefitsSectionContent {
  title: string
  subtitle: string
}

export interface HowItWorksStep {
  id: string
  number: number
  icon: string
  title: string
  description: string
  details: string[]
  enabled: boolean
}

export interface HowItWorksContent {
  title: string
  subtitle: string
  ctaText: string
  ctaButtonText: string
  steps: HowItWorksStep[]
}

export interface TechStackItem {
  name: string
  version: string
  description: string
}

export interface TechStack {
  id: string
  category: string
  icon: string
  technologies: TechStackItem[]
  enabled: boolean
}

export interface SystemRequirement {
  id: string
  platform: string
  specs: { label: string; value: string }[]
}

export interface SupportedInverter {
  id: string
  brand: string
  models: string
  protocol: string
  status: string
  enabled: boolean
}

export interface TechnicalSpecsContent {
  title: string
  subtitle: string
  techStack: TechStack[]
  systemRequirements: SystemRequirement[]
  supportedInverters: SupportedInverter[]
  architecture: ArchitectureLayer[]
  networkPorts: NetworkPort[]
}

export interface ArchitectureLayer {
  id: string
  layer: string
  icon: string
  components: string[]
  enabled: boolean
}

export interface NetworkPort {
  id: string
  port: string
  description: string
  enabled: boolean
}

export interface InstallationContent {
  title: string
  subtitle: string
  platforms: InstallationPlatform[]
  stats: InstallationStat[]
}

export interface InstallationPlatform {
  id: string
  name: string
  steps: string[]
  requirements: string[]
  enabled: boolean
}

export interface InstallationStat {
  id: string
  value: string
  label: string
  enabled: boolean
}

export interface APIEndpoint {
  id: string
  category: string
  method: string
  path: string
  description: string
  request?: string
  response?: string
  parameters?: string
  enabled: boolean
}

export interface APIDocsContent {
  title: string
  subtitle: string
  tabs: string[]
  endpoints: APIEndpoint[]
}

export interface CommunityLink {
  id: string
  icon: string
  title: string
  description: string
  items: string[]
  enabled: boolean
}

export interface CommunityContent {
  title: string
  subtitle: string
  links: CommunityLink[]
  ctaTitle: string
  ctaSubtitle: string
}

export interface ComparisonFeature {
  id: string
  name: string
  traditional: string | boolean
  ha: string | boolean
  solar: string | boolean
  enabled: boolean
}

export interface ComparisonContent {
  title: string
  subtitle: string
  features: ComparisonFeature[]
  bottomTitle: string
  bottomSubtitle: string
}

export interface AIFeaturesSectionContent {
  title: string
  subtitle: string
  badgeText: string
  performanceTitle: string
  learningTitle: string
  academicTitle: string
  academicDescription: string
  performanceMetrics: Array<{
    label: string
    value: string
    description: string
  }>
  learningPhases: Array<{
    phase: string
    title: string
    days: string
    confidence: string
    activities: string[]
  }>
  academicPoints: Array<{
    title: string
    description: string
  }>
}

const defaultHeroContent: HeroContent = {
  title: 'AI-Powered Solar Energy Management for Every Platform',
  subtitle: 'Cross-platform desktop app with intelligent battery charging optimization using advanced AI. Available for Windows, macOS, Linux, and as a Home Assistant add-on. Achieve up to 12.7% cost reduction with dynamic pricing.',
  primaryCTA: 'Download for Free',
  secondaryCTA: 'See It In Action'
}

const defaultHeaderContent: HeaderContent = {
  logo: 'SolarAutopilot',
  navigation: [
    { label: 'Features', href: '/#features' },
    { label: 'AI System', href: '/#ai-features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'API', href: '/#api' },
    { label: 'Download', href: '/#download' }
  ]
}

const defaultFooterContent: FooterContent = {
  companyName: 'SolarAutopilot',
  logo: 'S',
  description: 'Intelligent solar energy management powered by AI. Save money, reduce your carbon footprint, and optimize your solar system with academic-backed algorithms.',
  sections: [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Download', href: '/#download' },
        { name: 'User Guide', href: '/#user-guide' },
        { name: 'Roadmap', href: '/roadmap' },
        { name: 'Changelog', href: '/changelog' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Getting Started', href: '/#user-guide' },
        { name: 'API Docs', href: '/#api' },
        { name: 'GitHub', href: 'https://github.com/solarautopilot', external: true },
        { name: 'Community Forum', href: '/community' },
        { name: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Contact', href: '/contact' }
      ]
    }
  ],
  socialLinks: [
    { name: 'GitHub', href: 'https://github.com/solarautopilot', icon: 'Github' },
    { name: 'Discord', href: 'https://discord.gg/solarautopilot', icon: 'MessageCircle' },
    { name: 'Twitter', href: 'https://twitter.com/solarautopilot', icon: 'Twitter' },
    { name: 'YouTube', href: 'https://youtube.com/@solarautopilot', icon: 'Youtube' },
    { name: 'Email', href: 'mailto:hello@solarautopilot.com', icon: 'Mail' }
  ],
  copyright: '© 2024 SolarAutopilot. Open Source MIT License.',
  statusText: 'All systems operational',
  showStatus: true,
  madeByText: 'Made with ❤️ by the community'
}

const defaultFeatures: Feature[] = [
  {
    id: '1',
    title: 'Real-Time Dashboard',
    description: 'Monitor your solar system with live data visualization and comprehensive analytics for all your energy metrics.',
    image: '/images/dashboard.png',
    icon: 'monitor',
    enabled: true,
    stats: ['Live monitoring', 'Data visualization', 'Energy analytics']
  },
  {
    id: '2',
    title: 'AI Optimization Engine',
    description: 'Advanced AI learns from your patterns and optimizes battery charging for maximum savings and efficiency.',
    image: '/images/ai.png',
    icon: 'brain',
    enabled: true,
    stats: ['Smart learning', 'Auto optimization', '12.7% cost savings']
  }
]

const defaultAIFeatures: AIFeature[] = [
  {
    id: '1',
    title: 'Solar Generation Forecasting',
    description: 'AI learns from historical patterns without weather APIs',
    icon: 'brain',
    features: ['Pattern-based learning from InfluxDB data', 'Astronomical calculations for sun position', 'Seasonal adaptation and trend detection', '85%+ accuracy for next-day predictions'],
    color: 'from-yellow-500 to-orange-500',
    enabled: true
  },
  {
    id: '2',
    title: 'Load Forecasting',
    description: 'Predicts household consumption patterns',
    icon: 'trending-up',
    features: ['Time-based consumption analysis', 'Weekend vs weekday pattern detection', 'Seasonal heating/cooling adaptation', '90%+ accuracy for load prediction'],
    color: 'from-blue-500 to-cyan-500',
    enabled: true
  },
  {
    id: '3',
    title: 'Intelligent Charging Strategy',
    description: 'Deep Q-Network reinforcement learning optimizer',
    icon: 'zap',
    features: ['12.7% cost improvement vs fixed tariffs', 'Multi-objective optimization', 'Dynamic pricing integration', 'Battery health consideration'],
    color: 'from-green-500 to-emerald-500',
    enabled: true
  },
  {
    id: '4',
    title: 'Pattern Detection',
    description: 'Unsupervised learning for energy patterns',
    icon: 'target',
    features: ['Daily pattern clustering (k-means)', 'Weather pattern inference', 'Seasonal transition detection', 'Anomaly detection and alerts'],
    color: 'from-purple-500 to-pink-500',
    enabled: true
  }
]

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How does the AI system work without weather APIs?',
    answer: 'Our AI uses pattern-based learning from your historical InfluxDB data combined with astronomical calculations for sun position. It learns seasonal patterns and adapts to your specific location and conditions.',
    enabled: true
  },
  {
    id: '2',
    question: 'What accuracy can I expect from the predictions?',
    answer: 'Solar generation forecasting achieves 85%+ accuracy for next-day predictions, while load forecasting reaches 90%+ accuracy. The system improves over time as it learns your specific patterns.',
    enabled: true
  },
  {
    id: '3',
    question: 'How much can I save with the intelligent charging?',
    answer: 'Users typically see 12.7% cost improvement compared to fixed tariff systems. The Deep Q-Network reinforcement learning optimizer considers dynamic pricing, battery health, and your consumption patterns.',
    enabled: true
  },
  {
    id: '4',
    question: 'What inverters are supported?',
    answer: 'SolarAutopilot supports Deye, Sunsynk, and Growatt inverters with more being added regularly. The system works with any inverter that provides data to InfluxDB.',
    enabled: true
  },
  {
    id: '5',
    question: 'How long does it take for the AI to learn my patterns?',
    answer: 'Initial training takes 1-7 days, active learning continues for 8-30 days, optimization occurs from day 31-90, and maintenance mode begins after 90 days with 95%+ confidence.',
    enabled: true
  }
]

const defaultDownloads: DownloadItem[] = [
  {
    id: '1',
    platform: 'Windows x64',
    version: '1.2.0',
    url: 'https://github.com/CARBONOZ-RENEWABLES/solarautopilot/releases/download/v1.2.0/SolarAutopilot-1.2.0-win-x64.exe',
    size: '45MB',
    enabled: true
  },
  {
    id: '2',
    platform: 'Windows x86',
    version: '1.2.0',
    url: 'https://github.com/CARBONOZ-RENEWABLES/solarautopilot/releases/download/v1.2.0/SolarAutopilot-1.2.0-win-x86.exe',
    size: '42MB',
    enabled: true
  },
  {
    id: '3',
    platform: 'macOS Universal',
    version: '1.2.0',
    url: 'https://github.com/CARBONOZ-RENEWABLES/solarautopilot/releases/download/v1.2.0/SolarAutopilot-1.2.0-macos.dmg',
    size: '38MB',
    enabled: true
  },
  {
    id: '4',
    platform: 'Linux deb',
    version: '1.2.0',
    url: 'https://github.com/CARBONOZ-RENEWABLES/solarautopilot/releases/download/v1.2.0/SolarAutopilot-1.2.0-linux.deb',
    size: '35MB',
    enabled: true
  },
  {
    id: '5',
    platform: 'Linux AppImage',
    version: '1.2.0',
    url: 'https://github.com/CARBONOZ-RENEWABLES/solarautopilot/releases/download/v1.2.0/SolarAutopilot-1.2.0-linux.AppImage',
    size: '40MB',
    enabled: true
  },
  {
    id: '6',
    platform: 'Home Assistant Add-on',
    version: '1.2.0',
    url: 'https://github.com/CARBONOZ-RENEWABLES/solarautopilot-addon',
    size: 'Docker',
    enabled: true
  }
]

const defaultBenefits: Benefit[] = [
  {
    id: '1',
    title: 'AI-Powered Optimization',
    description: 'Advanced machine learning algorithms continuously optimize your solar energy production and consumption patterns across all platforms.',
    icon: 'brain',
    enabled: true
  },
  {
    id: '2',
    title: 'Cross-Platform Flexibility',
    description: 'Run on Windows, macOS, Linux, Home Assistant, or Docker. Choose the platform that fits your setup best.',
    icon: 'monitor',
    enabled: true
  },
  {
    id: '3',
    title: 'Privacy & Security',
    description: 'All processing happens locally on your hardware. Your energy data never leaves your network, ensuring complete privacy.',
    icon: 'shield',
    enabled: true
  },
  {
    id: '4',
    title: 'Real-Time Monitoring',
    description: 'Track energy production, consumption, and savings with detailed analytics and live dashboards on any device.',
    icon: 'activity',
    enabled: true
  },
  {
    id: '5',
    title: 'Cost Optimization',
    description: 'Achieve up to 12.7% cost reduction through intelligent battery charging and dynamic pricing integration.',
    icon: 'dollar-sign',
    enabled: true
  },
  {
    id: '6',
    title: 'CO2 Impact Tracking',
    description: 'Monitor your environmental impact and carbon savings with integration for marketable CO2 offsets.',
    icon: 'leaf',
    enabled: true
  }
]

const defaultBenefitsSection: BenefitsSectionContent = {
  title: 'Why Choose <span class="text-primary">SolarAutopilot</span>?',
  subtitle: 'Transform your solar energy system with intelligent automation and optimization'
}

const defaultHowItWorks: HowItWorksContent = {
  title: 'From Installation to Optimization in <span class="text-primary">Minutes</span>',
  subtitle: 'No complex configuration. No manual rules. Just intelligent optimization that works out of the box.',
  ctaText: 'Start Your 5-Minute Setup',
  ctaButtonText: 'Get Started Now',
  steps: [
    {
      id: '1',
      number: 1,
      icon: 'download',
      title: 'Install',
      description: 'Download for your platform with one-command installation and Docker support included.',
      details: ['Cross-platform binaries', 'Docker containers', 'Package managers'],
      enabled: true
    },
    {
      id: '2',
      number: 2,
      icon: 'link',
      title: 'Connect',
      description: 'Point to Solar Assistant and auto-discover all components with automatic entity mapping.',
      details: ['Auto-discovery', 'MQTT/REST API', 'Entity mapping'],
      enabled: true
    },
    {
      id: '3',
      number: 3,
      icon: 'settings',
      title: 'Configure',
      description: 'Add your Tibber API key, configure MQTT broker, set preferences, and enable AI engine.',
      details: ['MQTT broker setup', 'API integration', 'AI activation'],
      enabled: true
    },
    {
      id: '4',
      number: 4,
      icon: 'trending-up',
      title: 'Optimize',
      description: 'AI learns your patterns, makes smart decisions 24/7, and continuously improves performance.',
      details: ['Pattern learning', '24/7 operation', 'Continuous improvement'],
      enabled: true
    }
  ]
}

const defaultTechnicalSpecs: TechnicalSpecsContent = {
  title: 'Technical <span class="text-primary">Specifications</span>',
  subtitle: 'Built on modern, scalable architecture with enterprise-grade reliability',
  techStack: [
    {
      id: '1',
      category: 'Backend',
      icon: 'server',
      technologies: [
        { name: 'Node.js', version: '14+', description: 'Runtime environment' },
        { name: 'Express.js', version: '4.21+', description: 'Web framework' },
        { name: 'MQTT', version: '4.2+', description: 'IoT messaging' },
        { name: 'WebSocket', version: '8.2+', description: 'Real-time communication' }
      ],
      enabled: true
    },
    {
      id: '2',
      category: 'Database',
      icon: 'database',
      technologies: [
        { name: 'InfluxDB', version: '2.x', description: 'Time-series data' },
        { name: 'MongoDB', version: 'Optional', description: 'Configuration storage' },
        { name: 'Redis', version: 'Optional', description: 'Caching layer' }
      ],
      enabled: true
    },
    {
      id: '3',
      category: 'Frontend',
      icon: 'globe',
      technologies: [
        { name: 'React', version: '18+', description: 'UI framework' },
        { name: 'Vite', version: '5+', description: 'Build tool' },
        { name: 'TailwindCSS', version: '3+', description: 'Styling' },
        { name: 'Chart.js', version: 'Latest', description: 'Data visualization' }
      ],
      enabled: true
    },
    {
      id: '4',
      category: 'AI/ML',
      icon: 'cpu',
      technologies: [
        { name: 'TensorFlow.js', version: 'Optional', description: 'Neural networks' },
        { name: 'Custom ML', version: 'Built-in', description: 'Pattern recognition' },
        { name: 'DQN', version: 'Custom', description: 'Reinforcement learning' },
        { name: 'K-means', version: 'Built-in', description: 'Clustering' }
      ],
      enabled: true
    }
  ],
  systemRequirements: [
    {
      id: '1',
      platform: 'Minimum',
      specs: [
        { label: 'CPU', value: '2 cores @ 1.5 GHz' },
        { label: 'RAM', value: '512 MB' },
        { label: 'Storage', value: '2 GB' },
        { label: 'Network', value: '10 Mbps' }
      ]
    },
    {
      id: '2',
      platform: 'Recommended',
      specs: [
        { label: 'CPU', value: '4 cores @ 2.0 GHz' },
        { label: 'RAM', value: '1 GB' },
        { label: 'Storage', value: '10 GB SSD' },
        { label: 'Network', value: '100 Mbps' }
      ]
    },
    {
      id: '3',
      platform: 'Optimal',
      specs: [
        { label: 'CPU', value: '4+ cores @ 2.5 GHz' },
        { label: 'RAM', value: '2 GB+' },
        { label: 'Storage', value: '20 GB SSD' },
        { label: 'Network', value: 'Gigabit' }
      ]
    }
  ],
  supportedInverters: [
    {
      id: '1',
      brand: 'Deye / Sunsynk',
      models: 'All hybrid models',
      protocol: 'Modbus TCP/RTU',
      status: 'Full Support',
      enabled: true
    },
    {
      id: '2',
      brand: 'Voltronic / Axpert',
      models: 'MPP Solar series',
      protocol: 'Serial/USB',
      status: 'Full Support',
      enabled: true
    },
    {
      id: '3',
      brand: 'Growatt',
      models: 'SPH/MIN series',
      protocol: 'Modbus TCP',
      status: 'Full Support',
      enabled: true
    },
    {
      id: '4',
      brand: 'SMA',
      models: 'Sunny Boy Storage',
      protocol: 'Modbus TCP',
      status: 'Beta',
      enabled: true
    },
    {
      id: '5',
      brand: 'Fronius',
      models: 'Symo Hybrid',
      protocol: 'Solar API',
      status: 'Planned',
      enabled: true
    },
    {
      id: '6',
      brand: 'Huawei',
      models: 'LUNA series',
      protocol: 'Modbus TCP',
      status: 'Planned',
      enabled: true
    }
  ],
  architecture: [
    {
      id: '1',
      layer: 'Data Collection',
      icon: 'network',
      components: ['MQTT Broker', 'Modbus Gateway', 'Tibber API', 'Sensor Network'],
      enabled: true
    },
    {
      id: '2',
      layer: 'Data Storage',
      icon: 'hard-drive',
      components: ['InfluxDB Time-Series', 'Configuration Store', 'Historical Archive'],
      enabled: true
    },
    {
      id: '3',
      layer: 'AI Processing',
      icon: 'cpu',
      components: ['Solar Predictor', 'Load Forecaster', 'Charging Optimizer', 'Pattern Detector'],
      enabled: true
    },
    {
      id: '4',
      layer: 'Control Layer',
      icon: 'zap',
      components: ['Inverter Control', 'Battery Management', 'Grid Interface', 'Safety Monitor'],
      enabled: true
    },
    {
      id: '5',
      layer: 'Presentation',
      icon: 'globe',
      components: ['Web Dashboard', 'REST API', 'WebSocket Server', 'Mobile Interface'],
      enabled: true
    },
    {
      id: '6',
      layer: 'Security',
      icon: 'shield',
      components: ['Authentication', 'SSL/TLS', 'Rate Limiting', 'Input Validation'],
      enabled: true
    }
  ],
  networkPorts: [
    {
      id: '1',
      port: 'Port 6789',
      description: 'Main web interface and API',
      enabled: true
    },
    {
      id: '2',
      port: 'Port 8086',
      description: 'InfluxDB time-series database',
      enabled: true
    },
    {
      id: '3',
      port: 'Port 8000',
      description: 'WebSocket real-time updates',
      enabled: true
    },
    {
      id: '4',
      port: 'Port 1883',
      description: 'MQTT broker (optional)',
      enabled: true
    }
  ]
}

const defaultCTA: CTAContent = {
  title: 'Ready to Optimize Your Solar System?',
  subtitle: 'Join thousands of users saving money with AI-powered solar management',
  primaryButton: 'Download Now',
  secondaryButton: 'View Documentation'
}

const defaultDownloadSection: DownloadSectionContent = {
  title: 'Download <span class="text-primary">SolarAutopilot</span>',
  description: 'Choose your platform and start optimizing in minutes. All downloads are free and require no registration. Available as desktop apps for Windows, macOS, Linux, and as a Home Assistant add-on.'
}

const defaultFeaturesSection: FeaturesSectionContent = {
  title: 'Experience <span class="text-primary">SolarAutopilot</span>',
  subtitle: 'See how our advanced features transform solar energy management'
}

const defaultAIFeaturesSection: AIFeaturesSectionContent = {
  title: 'Academic-Grade <span class="text-primary">AI System</span>',
  subtitle: 'Advanced machine learning that learns your patterns and optimizes energy usage without external APIs',
  badgeText: 'AI-Powered Intelligence',
  performanceTitle: 'Performance <span class="text-primary">Metrics</span>',
  learningTitle: 'AI Learning <span class="text-primary">Process</span>',
  academicTitle: 'Based on <span class="text-primary">Academic Research</span>',
  academicDescription: 'Our AI system implements findings from peer-reviewed research: "Do dynamic electricity tariffs change the gains of residential PV-battery systems?"',
  performanceMetrics: [
    { label: 'Solar Accuracy', value: '85%+', description: 'Next-day prediction accuracy' },
    { label: 'Load Accuracy', value: '90%+', description: 'Consumption forecasting' },
    { label: 'Cost Savings', value: '12.7%', description: 'vs traditional systems' },
    { label: 'Learning Period', value: '30-90d', description: 'Optimal performance' }
  ],
  learningPhases: [
    {
      phase: 'Phase 1',
      title: 'Initial Training',
      days: 'Day 1-7',
      confidence: '30-50%',
      activities: [
        'Load historical data from InfluxDB',
        'Train solar predictor models',
        'Build load forecasting baseline',
        'Detect initial patterns'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Active Learning',
      days: 'Day 8-30',
      confidence: '50-80%',
      activities: [
        'Compare predictions vs outcomes',
        'Update model weights',
        'Improve pattern recognition',
        'Refine charging strategies'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Optimization',
      days: 'Day 31-90',
      confidence: '80-95%',
      activities: [
        'Fine-tune charging decisions',
        'Learn optimal timing patterns',
        'Maximize cost savings',
        'Seasonal adaptation'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Maintenance',
      days: 'Day 90+',
      confidence: '95%+',
      activities: [
        'Continuous incremental learning',
        'Performance monitoring',
        'Stable high performance',
        'Automatic adaptation'
      ]
    }
  ],
  academicPoints: [
    {
      title: 'Battery Optimization',
      description: 'Different strategies for small (≤15kWh), medium (15-20kWh), and large (>20kWh) batteries'
    },
    {
      title: 'Price Thresholds',
      description: 'Optimal charging at ≤8¢/kWh with 90.25% round-trip efficiency'
    },
    {
      title: 'Proven Results',
      description: '12.7% cost improvement validated through academic research'
    }
  ]
}

const defaultVideoTutorials: VideoTutorial[] = [
  {
    id: '1',
    title: 'Quick Start Guide',
    duration: '5:32',
    rating: 4.9,
    videoId: 'I76HPteaZuE',
    startTime: 6,
    description: 'Get SolarAutopilot running in under 6 minutes. From download to first optimization.',
    topics: ['Installation', 'Configuration', 'First Run'],
    enabled: true
  },
  {
    id: '2',
    title: 'AI Optimization Explained',
    duration: '8:15',
    rating: 4.8,
    videoId: 'I76HPteaZuE',
    startTime: 6,
    description: 'Deep dive into how the AI makes decisions and learns your energy patterns.',
    topics: ['AI Algorithm', 'Pattern Learning', 'Decision Making'],
    enabled: true
  },
  {
    id: '3',
    title: 'Advanced Configuration',
    duration: '12:45',
    rating: 4.9,
    videoId: 'I76HPteaZuE',
    startTime: 6,
    description: 'Customize SolarAutopilot for complex setups with multiple inverters and batteries.',
    topics: ['Multi-Inverter', 'Custom Rules', 'API Integration'],
    enabled: true
  }
]

const defaultInstallation: InstallationContent = {
  title: '<span class="text-primary">Installation</span> Guide',
  subtitle: 'Step-by-step instructions for installing SolarAutopilot on your preferred platform.',
  platforms: [
    {
      id: '1',
      name: 'Windows',
      steps: [
        'Visit GitHub Actions → Universal Builds workflow',
        'Download "windows-installers" artifact',
        'Extract ZIP and run the .exe installer',
        'If SmartScreen appears, click "More info" → "Run anyway"',
        'Launch from Start Menu or Desktop shortcut'
      ],
      requirements: [
        'Requires Windows 10 or later',
        'Automatic Docker integration if Docker is installed'
      ],
      enabled: true
    },
    {
      id: '2',
      name: 'macOS',
      steps: [
        'Visit GitHub Actions → Universal Builds workflow',
        'Download "macos-universal" artifact',
        'Extract ZIP and open the .dmg file',
        'Drag app to Applications folder',
        'Right-click app → "Open" (first time only for security)'
      ],
      requirements: [
        'Requires macOS 10.13 or later',
        'Universal binary (Intel + Apple Silicon)'
      ],
      enabled: true
    },
    {
      id: '3',
      name: 'Linux',
      steps: [
        'Visit GitHub Actions → Universal Builds workflow',
        'Download "linux-x64" or "linux-arm64-rpi" for Raspberry Pi',
        'Extract ZIP file',
        'Make AppImage executable: chmod +x *.AppImage',
        'Run the AppImage or install .deb package'
      ],
      requirements: [
        'Ubuntu 18.04+, Debian 10+',
        'ARM64 version available for Raspberry Pi'
      ],
      enabled: true
    },
    {
      id: '4',
      name: 'Home Assistant Add-on',
      steps: [
        'Open Home Assistant',
        'Navigate to Settings → Add-ons → Add-on Store',
        'Click the menu (⋮) → Repositories',
        'Add repository: https://github.com/CARBONOZ-RENEWABLES/solarautopilot-addon',
        'Find SolarAutopilot in the store and click Install'
      ],
      requirements: [
        'Home Assistant OS or Supervised',
        'Minimum 1GB RAM recommended'
      ],
      enabled: true
    },
    {
      id: '5',
      name: 'Docker Container',
      steps: [
        'Pull the image: docker pull ghcr.io/carbonoz-renewables/solarautopilot:latest',
        'Create a docker-compose.yml file with configuration',
        'Run: docker-compose up -d',
        'Access web interface at http://localhost:6789'
      ],
      requirements: [
        'Docker 20.10+ or Docker Compose',
        'Network access to inverter and MQTT broker'
      ],
      enabled: true
    }
  ],
  stats: [
    { id: '1', value: '5+', label: 'Platforms', enabled: true },
    { id: '2', value: 'Free', label: 'Download', enabled: true },
    { id: '3', value: '12.7%', label: 'Cost Savings', enabled: true },
    { id: '4', value: 'AI', label: 'Powered', enabled: true }
  ]
}

const defaultAPIDocs: APIDocsContent = {
  title: 'API <span class="text-primary">Documentation</span>',
  subtitle: 'Complete REST API and MQTT reference for integrating with SolarAutopilot',
  tabs: ['REST API', 'MQTT Topics', 'WebSocket', 'AI System'],
  endpoints: [
    {
      id: '1',
      category: 'AI System',
      method: 'GET',
      path: '/ai/status',
      description: 'Get current AI system status and confidence levels',
      response: '{\n  "enabled": true,\n  "confidence": 0.87\n}',
      enabled: true
    },
    {
      id: '2',
      category: 'System Data',
      method: 'GET',
      path: '/api/system/status',
      description: 'Get real-time system status',
      enabled: true
    }
  ]
}

const defaultCommunity: CommunityContent = {
  title: 'Join the <span class="text-primary">Community</span>',
  subtitle: 'Connect with users, get support, and contribute to the future of solar energy management',
  links: [
    { id: '1', icon: 'github', title: 'GitHub', description: 'Source code, issues, and contributions', items: ['Open Source', 'MIT License', 'Active Development'], enabled: true },
    { id: '2', icon: 'message-circle', title: 'Discord Community', description: 'Chat with users and developers', items: ['Real-time Chat', 'Support', 'Discussions'], enabled: true },
    { id: '3', icon: 'book-open', title: 'Documentation', description: 'Complete guides and tutorials', items: ['User Guides', 'API Docs', 'Examples'], enabled: true },
    { id: '4', icon: 'mail', title: 'Email Support', description: 'Direct support from the team', items: ['24-48h Response', 'Technical Help', 'Bug Reports'], enabled: true }
  ],
  ctaTitle: 'Be Part of the <span class="text-primary">Movement</span>',
  ctaSubtitle: 'Join thousands of users optimizing their solar systems with AI. Together, we\'re building a sustainable future powered by intelligent energy management.'
}

const defaultComparison: ComparisonContent = {
  title: '<span class="text-primary">SolarAutopilot</span> vs Traditional Systems',
  subtitle: 'See how SolarAutopilot\'s multi-platform approach compares to traditional solar management and Home Assistant-only solutions.',
  features: [
    { id: '1', name: 'Cross-Platform Support', traditional: false, ha: 'HA Only', solar: 'Desktop Apps + HA Add-on', enabled: true },
    { id: '2', name: 'AI Optimization', traditional: false, ha: false, solar: true, enabled: true },
    { id: '3', name: 'Cost Savings', traditional: '0%', ha: '~5%', solar: 'Up to 12.7%', enabled: true },
    { id: '4', name: 'Setup Time', traditional: 'Hours', ha: 'Hours', solar: '5 Minutes', enabled: true }
  ],
  bottomTitle: 'Why Choose <span class="text-primary">SolarAutopilot</span>?',
  bottomSubtitle: 'The only cross-platform solution that combines advanced AI optimization with zero-configuration setup. Run on any platform - start saving money in minutes, not hours.'
}

const defaultUserGuide: UserGuideContent = {
  title: 'Complete <span class="text-primary">User Guide</span>',
  subtitle: 'Step-by-step instructions to get the most out of SolarAutopilot',
  sections: [],
  proTips: []
}

export const getHeroContent = () => fetchContent('hero', defaultHeroContent)
export const saveHeroContent = (content: HeroContent) => saveContent('hero', content)

export const getHeaderContent = () => fetchContent('header', defaultHeaderContent)
export const saveHeaderContent = (content: HeaderContent) => saveContent('header', content)

export const getFooterContent = () => fetchContent('footer', defaultFooterContent)
export const saveFooterContent = (content: FooterContent) => saveContent('footer', content)

export const getFeatures = () => fetchContent('features', defaultFeatures)
export const saveFeatures = (features: Feature[]) => saveContent('features', features)

export const getAIFeatures = () => fetchContent('ai-features', defaultAIFeatures)
export const saveAIFeatures = (features: AIFeature[]) => saveContent('ai-features', features)

export const getFAQs = () => fetchContent('faqs', defaultFAQs)
export const saveFAQs = (faqs: FAQ[]) => saveContent('faqs', faqs)

export const getDownloads = () => fetchContent('downloads', defaultDownloads)
export const saveDownloads = (downloads: DownloadItem[]) => saveContent('downloads', downloads)

export const getBenefits = () => fetchContent('benefits', defaultBenefits)
export const saveBenefits = (benefits: Benefit[]) => saveContent('benefits', benefits)

export const getCTAContent = () => fetchContent('cta', defaultCTA)
export const saveCTAContent = (content: CTAContent) => saveContent('cta', content)

export const getVideoTutorials = () => fetchContent('video-tutorials', defaultVideoTutorials)
export const saveVideoTutorials = (tutorials: VideoTutorial[]) => saveContent('video-tutorials', tutorials)

export const getDownloadSectionContent = () => fetchContent('download-section', defaultDownloadSection)
export const saveDownloadSectionContent = (content: DownloadSectionContent) => saveContent('download-section', content)

export const getFeaturesSectionContent = () => fetchContent('features-section', defaultFeaturesSection)
export const saveFeaturesSectionContent = (content: FeaturesSectionContent) => saveContent('features-section', content)

export const getAIFeaturesSectionContent = () => fetchContent('ai-features-section', defaultAIFeaturesSection)
export const saveAIFeaturesSectionContent = (content: AIFeaturesSectionContent) => saveContent('ai-features-section', content)

export const getBenefitsSectionContent = () => fetchContent('benefits-section', defaultBenefitsSection)
export const saveBenefitsSectionContent = (content: BenefitsSectionContent) => saveContent('benefits-section', content)

export const getHowItWorksContent = () => fetchContent('how-it-works', defaultHowItWorks)
export const saveHowItWorksContent = (content: HowItWorksContent) => saveContent('how-it-works', content)

export const getTechnicalSpecsContent = () => fetchContent('technical-specs', defaultTechnicalSpecs)
export const saveTechnicalSpecsContent = (content: TechnicalSpecsContent) => saveContent('technical-specs', content)

export const getInstallationContent = () => fetchContent('installation', defaultInstallation)
export const saveInstallationContent = (content: InstallationContent) => saveContent('installation', content)

export const getAPIDocsContent = () => fetchContent('api-docs', defaultAPIDocs)
export const saveAPIDocsContent = (content: APIDocsContent) => saveContent('api-docs', content)

export const getCommunityContent = () => fetchContent('community', defaultCommunity)
export const saveCommunityContent = (content: CommunityContent) => saveContent('community', content)

export const getComparisonContent = () => fetchContent('comparison', defaultComparison)
export const saveComparisonContent = (content: ComparisonContent) => saveContent('comparison', content)

export const getUserGuideContent = () => fetchContent('user-guide', defaultUserGuide)
export const saveUserGuideContent = (content: UserGuideContent) => saveContent('user-guide', content)

export const getPricingTiers = () => fetchContent('pricing', [])
export const savePricingTiers = (tiers: PricingTier[]) => saveContent('pricing', tiers)
