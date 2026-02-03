#!/bin/bash

# Security Setup Script for SolarAutopilot Website
# This script should be run on the remote server (192.168.160.98)

set -e

echo "🔒 SolarAutopilot Security Setup"
echo "================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Generate SSL Certificate
echo -e "\n${YELLOW}Step 1: Generating SSL Certificate${NC}"
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/solarautopilot.key \
  -out /etc/nginx/ssl/solarautopilot.crt \
  -subj "/C=US/ST=State/L=City/O=CARBONOZ/OU=IT/CN=192.168.160.98"

sudo chmod 600 /etc/nginx/ssl/solarautopilot.key
sudo chmod 644 /etc/nginx/ssl/solarautopilot.crt
echo -e "${GREEN}✅ SSL certificate generated${NC}"

# Step 2: Backup old Nginx config
echo -e "\n${YELLOW}Step 2: Backing up Nginx configuration${NC}"
if [ -f /etc/nginx/sites-available/solarautopilot ]; then
    sudo cp /etc/nginx/sites-available/solarautopilot /etc/nginx/sites-available/solarautopilot.backup.$(date +%Y%m%d_%H%M%S)
    echo -e "${GREEN}✅ Backup created${NC}"
fi

# Step 3: Copy new SSL-enabled Nginx config
echo -e "\n${YELLOW}Step 3: Installing SSL-enabled Nginx configuration${NC}"
sudo cp ~/solarautopilot-website/nginx-ssl.conf /etc/nginx/sites-available/solarautopilot
sudo ln -sf /etc/nginx/sites-available/solarautopilot /etc/nginx/sites-enabled/
echo -e "${GREEN}✅ Nginx configuration updated${NC}"

# Step 4: Test Nginx configuration
echo -e "\n${YELLOW}Step 4: Testing Nginx configuration${NC}"
sudo nginx -t

# Step 5: Reload Nginx
echo -e "\n${YELLOW}Step 5: Reloading Nginx${NC}"
sudo systemctl reload nginx
echo -e "${GREEN}✅ Nginx reloaded${NC}"

# Step 6: Check firewall
echo -e "\n${YELLOW}Step 6: Checking firewall rules${NC}"
if command -v ufw &> /dev/null; then
    sudo ufw allow 443/tcp
    sudo ufw status
    echo -e "${GREEN}✅ Port 443 opened in firewall${NC}"
else
    echo -e "${YELLOW}⚠️  UFW not found, please manually open port 443${NC}"
fi

# Summary
echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}🎉 Security Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "✅ SSL certificate generated"
echo "✅ HTTPS enabled on port 443"
echo "✅ HTTP redirects to HTTPS"
echo "✅ Nginx configuration updated"
echo ""
echo "🌐 Access your site at: https://192.168.160.98"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Change the localadmin password!${NC}"
echo "Run: sudo passwd localadmin"
echo "Use a strong password with 12+ characters"
