#!/bin/bash

# Generate self-signed SSL certificate for SolarAutopilot
# Run this on the remote server (192.168.160.98)

echo "🔐 Generating self-signed SSL certificate..."

# Create SSL directory
sudo mkdir -p /etc/nginx/ssl
cd /etc/nginx/ssl

# Generate private key and certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout solarautopilot.key \
  -out solarautopilot.crt \
  -subj "/C=US/ST=State/L=City/O=CARBONOZ/OU=IT/CN=192.168.160.98"

# Set proper permissions
sudo chmod 600 solarautopilot.key
sudo chmod 644 solarautopilot.crt

echo "✅ SSL certificate generated successfully!"
echo "📁 Certificate: /etc/nginx/ssl/solarautopilot.crt"
echo "🔑 Private Key: /etc/nginx/ssl/solarautopilot.key"
