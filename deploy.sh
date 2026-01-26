#!/bin/bash

echo "🚀 Deploying SolarAutopilot Website..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Create production environment file if it doesn't exist
if [ ! -f ".env.production" ]; then
    echo "📝 Creating production environment file..."
    cat > .env.production << EOF
# Production Environment Variables
NEXT_PUBLIC_SITE_URL=https://solarautopilot.com
CLOUDFLARE_R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-production-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-production-secret-key
CLOUDFLARE_R2_BUCKET_NAME=solarautopilot-downloads
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
EOF
    echo "⚠️  Please update .env.production with your actual credentials"
fi

# Create robots.txt for production
echo "🤖 Creating robots.txt..."
cat > public/robots.txt << EOF
User-agent: *
Allow: /

Sitemap: https://solarautopilot.com/sitemap.xml
EOF

# Create sitemap.xml
echo "🗺️  Creating sitemap.xml..."
cat > public/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://solarautopilot.com</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://solarautopilot.com/admin</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
EOF

# Optimize images (if imagemin is available)
if command -v imagemin &> /dev/null; then
    echo "🖼️  Optimizing images..."
    imagemin public/images/* --out-dir=public/images/
fi

# Security headers for production
echo "🔒 Creating security headers..."
cat > public/_headers << EOF
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;

/api/*
  Cache-Control: no-cache, no-store, must-revalidate

/images/*
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
EOF

echo "✅ Deployment preparation complete!"
echo ""
echo "Next steps for production deployment:"
echo "1. Update .env.production with your actual credentials"
echo "2. Deploy to Vercel: vercel --prod"
echo "3. Or deploy to Netlify: netlify deploy --prod --dir=out"
echo "4. Configure your domain DNS settings"
echo "5. Set up SSL certificate (automatic with Vercel/Netlify)"
echo ""
echo "🎉 Your SolarAutopilot website is ready for production!"