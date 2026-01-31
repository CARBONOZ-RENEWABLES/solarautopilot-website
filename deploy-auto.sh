#!/bin/bash

# Quick Deployment Script for SolarAutopilot Website
# This script automates the deployment process

set -e

SERVER="192.168.160.98"
USER="localadmin"
REMOTE_PATH="/var/www/solarautopilot"

echo "🚀 SolarAutopilot Website Deployment"
echo "===================================="
echo ""

# Step 1: Build locally
echo "📦 Step 1: Building application..."
npm install
npm run build
echo "✅ Build complete!"
echo ""

# Step 2: Create remote directory
echo "📁 Step 2: Preparing server directory..."
ssh ${USER}@${SERVER} "sudo mkdir -p ${REMOTE_PATH} && sudo chown ${USER}:${USER} ${REMOTE_PATH}"
echo "✅ Directory ready!"
echo ""

# Step 3: Copy files
echo "📤 Step 3: Copying files to server..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  .next package.json package-lock.json public app components lib src ecosystem.config.js nginx.conf .env.production \
  ${USER}@${SERVER}:${REMOTE_PATH}/
echo "✅ Files copied!"
echo ""

# Step 4: Install dependencies and setup
echo "⚙️  Step 4: Installing dependencies on server..."
ssh ${USER}@${SERVER} << 'ENDSSH'
cd /var/www/solarautopilot
npm install --production

# Copy .env.production to .env
cp .env.production .env

# Setup Nginx if not already done
if [ ! -f /etc/nginx/sites-enabled/solarautopilot ]; then
  echo "Setting up Nginx..."
  sudo cp nginx.conf /etc/nginx/sites-available/solarautopilot
  sudo ln -s /etc/nginx/sites-available/solarautopilot /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl reload nginx
fi

# Start or restart with PM2
if pm2 list | grep -q "solarautopilot-website"; then
  echo "Restarting application..."
  pm2 restart solarautopilot-website
else
  echo "Starting application..."
  pm2 start ecosystem.config.js
  pm2 save
fi

echo "✅ Application deployed!"
ENDSSH

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "🌐 Website URL: http://${SERVER}"
echo ""
echo "📊 Check status:"
echo "   ssh ${USER}@${SERVER} 'pm2 status'"
echo ""
echo "📝 View logs:"
echo "   ssh ${USER}@${SERVER} 'pm2 logs solarautopilot-website'"
