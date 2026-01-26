#!/bin/bash

echo "🚀 Setting up SolarAutopilot CMS..."

# Create content directories
mkdir -p content/collections content/pages content/media

# Copy environment variables
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update with your credentials"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create initial admin user data
cat > content/collections/users.json << EOF
[
  {
    "id": "admin",
    "email": "admin@solarautopilot.com",
    "role": "admin",
    "password": "hashed-password-here"
  }
]
EOF

# Create initial settings
cat > content/collections/settings.json << EOF
{
  "siteName": "SolarAutopilot",
  "tagline": "AI-Powered Solar Energy Management",
  "contactEmail": "contact@solarautopilot.com",
  "socialLinks": {
    "twitter": "",
    "linkedin": ""
  }
}
EOF

echo "✅ CMS setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your credentials"
echo "2. Run 'npm run dev' to start development"
echo "3. Visit http://localhost:3000/admin to manage content"
echo ""