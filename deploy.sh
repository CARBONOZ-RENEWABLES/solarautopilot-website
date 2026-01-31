#!/bin/bash

# SolarAutopilot Website Deployment Script
# Server: 192.168.160.98
# User: localadmin

echo "🚀 Building SolarAutopilot Website..."

# Install dependencies
npm install

# Build the application
npm run build

echo "✅ Build complete!"
echo ""
echo "📦 Ready to deploy to 192.168.160.98"
echo ""
echo "Next steps:"
echo "1. Copy the entire project to server: scp -r . localadmin@192.168.160.98:/var/www/solarautopilot"
echo "2. SSH to server: ssh localadmin@192.168.160.98"
echo "3. Install Node.js and PM2 on server"
echo "4. Configure Nginx"
echo "5. Start the application with PM2"
