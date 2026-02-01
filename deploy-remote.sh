#!/bin/bash

set -e

echo "🚀 Deploying SolarAutopilot Website to 192.168.160.98..."

# Build the project
echo "📦 Building project..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz .next package.json package-lock.json ecosystem.config.js next.config.js public app components lib config prisma

# Copy files to remote server
echo "📤 Uploading files..."
sshpass -p 'Adgl5581' scp deploy.tar.gz localadmin@192.168.160.98:/home/localadmin/

# Copy .env.production
echo "📤 Uploading environment file..."
sshpass -p 'Adgl5581' scp .env.production localadmin@192.168.160.98:/home/localadmin/solarautopilot-website/

# Extract and setup on remote server
echo "🔧 Setting up on remote server..."
sshpass -p 'Adgl5581' ssh localadmin@192.168.160.98 << 'EOF'
cd /home/localadmin
tar -xzf deploy.tar.gz -C solarautopilot-website/
rm deploy.tar.gz
cd solarautopilot-website
npm install --production
pm2 restart solarautopilot-website
EOF

# Cleanup local deployment package
rm deploy.tar.gz

echo "✅ Deployment complete! Website running at http://192.168.160.98"
