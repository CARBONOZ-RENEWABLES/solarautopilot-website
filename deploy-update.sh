#!/bin/bash

set -e

echo "🚀 Updating SolarAutopilot Website on 192.168.160.98..."

# Build the project
echo "📦 Building project..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz .next package.json package-lock.json ecosystem.config.js next.config.js public app components lib config prisma

# Stop the running application
echo "⏸️  Stopping application..."
sshpass -p 'Adgl5581' ssh localadmin@192.168.160.98 'pm2 stop solarautopilot-website || true'

# Backup existing installation
echo "💾 Creating backup..."
sshpass -p 'Adgl5581' ssh localadmin@192.168.160.98 'cd /home/localadmin && cp -r solarautopilot-website solarautopilot-website-backup-$(date +%Y%m%d-%H%M%S) || true'

# Upload new files
echo "📤 Uploading files..."
sshpass -p 'Adgl5581' scp deploy.tar.gz localadmin@192.168.160.98:/home/localadmin/

# Copy .env.production
echo "📤 Uploading environment file..."
sshpass -p 'Adgl5581' scp .env.production localadmin@192.168.160.98:/home/localadmin/solarautopilot-website/

# Extract and update on remote server
echo "🔧 Updating on remote server..."
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

echo "✅ Deployment complete! Website updated at http://192.168.160.98"
