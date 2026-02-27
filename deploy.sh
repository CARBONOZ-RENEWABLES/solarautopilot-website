#!/bin/bash

# Deploy to production server
SERVER="localadmin@192.168.160.98"
DEPLOY_PATH="/var/www/solarautopilot"

echo "🚀 Deploying to production server..."

# Build locally
echo "📦 Building application..."
npm run build

# Push to GitHub
echo "📤 Pushing to GitHub..."
git add .
git commit -m "Update: MongoDB integration for image storage"
git push origin main

# SSH to server and deploy
echo "🔄 Updating server..."
ssh $SERVER << 'ENDSSH'
cd /var/www/solarautopilot

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Install MongoDB if not installed
if ! command -v mongod &> /dev/null; then
    echo "📥 Installing MongoDB..."
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod
fi

# Build application
npm run build

# Restart PM2
pm2 restart solarautopilot || pm2 start npm --name "solarautopilot" -- start

echo "✅ Deployment complete!"
ENDSSH

echo "✅ Done! Website updated at https://solarautopilot.com"
