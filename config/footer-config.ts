export interface FooterConfig {
  brand: {
    name: string
    logo: string
    description: string
  }
  sections: Array<{
    title: string
    links: Array<{
      name: string
      href: string
      external?: boolean
    }>
  }>
  social: Array<{
    name: string
    href: string
    icon: string
  }>
  bottom: {
    copyright: string
    status: {
      text: string
      show: boolean
    }
    madeBy: string
  }
}

export const footerConfig: FooterConfig = {
  brand: {
    name: "SolarAutopilot",
    logo: "S",
    description: "Intelligent solar energy management powered by AI. Save money, reduce your carbon footprint, and optimize your solar system with academic-backed algorithms."
  },
  sections: [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Download", href: "#download" },
        { name: "Documentation", href: "/docs" },
        { name: "Roadmap", href: "/roadmap" },
        { name: "Changelog", href: "/changelog" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Getting Started", href: "/docs/getting-started" },
        { name: "API Docs", href: "/docs/api" },
        { name: "GitHub", href: "https://github.com/solarautopilot", external: true },
        { name: "Community Forum", href: "/community" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Contact", href: "/contact" }
      ]
    }
  ],
  social: [
    { name: "GitHub", href: "https://github.com/solarautopilot", icon: "Github" },
    { name: "Discord", href: "https://discord.gg/solarautopilot", icon: "MessageCircle" },
    { name: "Twitter", href: "https://twitter.com/solarautopilot", icon: "Twitter" },
    { name: "YouTube", href: "https://youtube.com/@solarautopilot", icon: "Youtube" },
    { name: "Email", href: "mailto:hello@solarautopilot.com", icon: "Mail" }
  ],
  bottom: {
    copyright: "© 2024 SolarAutopilot. Open Source MIT License.",
    status: {
      text: "All systems operational",
      show: true
    },
    madeBy: "Made with ❤️ by the community"
  }
}