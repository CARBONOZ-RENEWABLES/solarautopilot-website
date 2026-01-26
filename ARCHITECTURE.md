# SolarAutopilot Website Architecture

## Folder Structure

```
solarautopilot-website/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (admin)/
│   │   │   └── admin/          # Payload CMS admin panel
│   │   ├── api/                # API routes
│   │   │   ├── downloads/      # Download tracking
│   │   │   └── uploads/        # File upload handlers
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── admin/              # Admin-specific components
│   │   ├── ui/                 # Reusable UI components
│   │   └── sections/           # Website sections
│   ├── lib/
│   │   ├── payload.config.ts   # Payload CMS configuration
│   │   ├── cloudflare.ts       # R2 storage client
│   │   └── utils.ts
│   └── types/                  # TypeScript definitions
├── content/                    # File-based content storage
│   ├── pages/
│   │   ├── home.json          # Homepage content
│   │   ├── features.json      # Features page
│   │   └── downloads.json     # Download page
│   ├── collections/
│   │   ├── features.json      # Feature items
│   │   ├── testimonials.json  # User testimonials
│   │   └── docs.json          # Documentation
│   └── media/                 # Local media references
├── public/
│   ├── images/                # Static images
│   └── icons/                 # App icons
├── payload.config.ts          # Payload CMS config
├── next.config.js
└── package.json
```

## Content Management Collections

### Pages Collection
```json
{
  "slug": "home",
  "title": "SolarAutopilot - AI Solar Management",
  "sections": [
    {
      "type": "hero",
      "title": "AI-Powered Solar Energy Management",
      "subtitle": "Optimize your solar system with intelligent automation",
      "cta": {
        "primary": "Download Now",
        "secondary": "View Demo"
      }
    }
  ]
}
```

### Features Collection
```json
{
  "id": "ai-optimization",
  "title": "AI Optimization Engine",
  "description": "Advanced machine learning algorithms optimize your solar energy usage",
  "icon": "brain",
  "benefits": ["12.7% cost savings", "Predictive analytics", "Smart automation"]
}
```

### Downloads Collection
```json
{
  "platform": "windows",
  "version": "2.1.0",
  "filename": "SolarAutopilot-2.1.0-win64.exe",
  "size": "45.2 MB",
  "downloadUrl": "https://downloads.solarautopilot.com/v2.1.0/windows/SolarAutopilot-2.1.0-win64.exe",
  "checksum": "sha256:abc123..."
}
```