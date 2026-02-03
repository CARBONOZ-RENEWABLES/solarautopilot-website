#!/bin/bash

# Secure Deployment Script for SolarAutopilot Website
# Updated with security improvements

set -e

# Configuration
REMOTE_USER="localadmin"
REMOTE_HOST="192.168.160.98"
REMOTE_DIR="/home/localadmin/solarautopilot-website"
LOCAL_DIR="/Users/digitalaxis/Desktop/solarautopilot-website"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🚀 SolarAutopilot Secure Deployment${NC}"
echo "===================================="

# Check if password file exists
if [ ! -f "$LOCAL_DIR/.deploy-password" ]; then
    echo -e "${RED}❌ Password file not found!${NC}"
    echo "Please create .deploy-password file with the new secure password"
    echo "Example: echo 'YourSecurePassword123!' > .deploy-password"
    exit 1
fi

# Read password from file
REMOTE_PASS=$(cat "$LOCAL_DIR/.deploy-password")

echo -e "\n${YELLOW}Step 1: Building application${NC}"
cd "$LOCAL_DIR"
npm run build
echo -e "${GREEN}✅ Build complete${NC}"

echo -e "\n${YELLOW}Step 2: Creating deployment package${NC}"
tar -czf deploy.tar.gz .next package.json package-lock.json ecosystem.config.js nginx-ssl.conf setup-security.sh generate-ssl.sh
echo -e "${GREEN}✅ Package created${NC}"

echo -e "\n${YELLOW}Step 3: Uploading files${NC}"
sshpass -p "$REMOTE_PASS" scp deploy.tar.gz "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"
sshpass -p "$REMOTE_PASS" scp .env.production "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"
echo -e "${GREEN}✅ Files uploaded${NC}"

echo -e "\n${YELLOW}Step 4: Extracting and restarting${NC}"
sshpass -p "$REMOTE_PASS" ssh "$REMOTE_USER@$REMOTE_HOST" << 'ENDSSH'
cd ~/solarautopilot-website
tar -xzf deploy.tar.gz
pm2 restart solarautopilot-website || pm2 start ecosystem.config.js
ENDSSH
echo -e "${GREEN}✅ Application restarted${NC}"

echo -e "\n${GREEN}===================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}===================================${NC}"
echo ""
echo "🌐 HTTP: http://192.168.160.98"
echo "🔒 HTTPS: https://192.168.160.98 (after SSL setup)"
echo ""
echo -e "${YELLOW}⚠️  Next Steps:${NC}"
echo "1. Run SSL setup on remote server:"
echo "   ssh $REMOTE_USER@$REMOTE_HOST 'cd ~/solarautopilot-website && bash setup-security.sh'"
echo ""
echo "2. Change the server password:"
echo "   ssh $REMOTE_USER@$REMOTE_HOST 'sudo passwd $REMOTE_USER'"
