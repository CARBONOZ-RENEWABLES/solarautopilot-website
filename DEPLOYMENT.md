# SolarAutopilot Website Deployment Guide

## Server Information
- **IP**: 192.168.160.98
- **User**: localadmin
- **Password**: Adgl5581
- **Web Server**: Nginx
- **Application Port**: 3000

---

## Prerequisites on Server

### 1. Install Node.js (v18 or higher)
```bash
ssh localadmin@192.168.160.98

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 3. Install and Configure Nginx
```bash
sudo apt-get update
sudo apt-get install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Deployment Steps

### Step 1: Build Locally
```bash
cd /Users/digitalaxis/Desktop/solarautopilot-website

# Install dependencies
npm install

# Build the application
npm run build
```

### Step 2: Copy Files to Server
```bash
# Create directory on server
ssh localadmin@192.168.160.98 "sudo mkdir -p /var/www/solarautopilot && sudo chown localadmin:localadmin /var/www/solarautopilot"

# Copy files (from your local machine)
scp -r .next package.json package-lock.json public app components lib src ecosystem.config.js localadmin@192.168.160.98:/var/www/solarautopilot/

# Copy environment file
scp .env.production localadmin@192.168.160.98:/var/www/solarautopilot/.env
```

### Step 3: Install Dependencies on Server
```bash
ssh localadmin@192.168.160.98

cd /var/www/solarautopilot
npm install --production
```

### Step 4: Configure Nginx
```bash
# Copy nginx configuration
sudo cp /var/www/solarautopilot/nginx.conf /etc/nginx/sites-available/solarautopilot

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/solarautopilot /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 5: Start Application with PM2
```bash
cd /var/www/solarautopilot

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs (will be something like: sudo env PATH=...)

# Check status
pm2 status
pm2 logs solarautopilot-website
```

---

## Verification

### 1. Check Application Status
```bash
pm2 status
pm2 logs solarautopilot-website --lines 50
```

### 2. Check Nginx Status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### 3. Test Website
Open browser and navigate to: http://192.168.160.98

---

## Useful Commands

### PM2 Commands
```bash
pm2 list                          # List all processes
pm2 logs solarautopilot-website   # View logs
pm2 restart solarautopilot-website # Restart app
pm2 stop solarautopilot-website    # Stop app
pm2 delete solarautopilot-website  # Remove app
pm2 monit                         # Monitor resources
```

### Nginx Commands
```bash
sudo systemctl status nginx       # Check status
sudo systemctl restart nginx      # Restart Nginx
sudo systemctl reload nginx       # Reload config
sudo nginx -t                     # Test configuration
sudo tail -f /var/log/nginx/solarautopilot_access.log  # View access logs
sudo tail -f /var/log/nginx/solarautopilot_error.log   # View error logs
```

### Application Logs
```bash
pm2 logs solarautopilot-website --lines 100
pm2 logs solarautopilot-website --err  # Only errors
```

---

## Updating the Website

### Quick Update (after making changes)
```bash
# On local machine
cd /Users/digitalaxis/Desktop/solarautopilot-website
npm run build

# Copy updated files
scp -r .next localadmin@192.168.160.98:/var/www/solarautopilot/

# Restart on server
ssh localadmin@192.168.160.98 "cd /var/www/solarautopilot && pm2 restart solarautopilot-website"
```

---

## Troubleshooting

### Website Not Loading
1. Check PM2 status: `pm2 status`
2. Check logs: `pm2 logs solarautopilot-website`
3. Check Nginx: `sudo systemctl status nginx`
4. Check port 3000: `sudo netstat -tulpn | grep 3000`

### Port Already in Use
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Restart PM2
pm2 restart solarautopilot-website
```

### Nginx 502 Bad Gateway
1. Check if Next.js is running: `pm2 status`
2. Check logs: `pm2 logs solarautopilot-website`
3. Restart application: `pm2 restart solarautopilot-website`

### Permission Issues
```bash
# Fix ownership
sudo chown -R localadmin:localadmin /var/www/solarautopilot

# Fix permissions
chmod -R 755 /var/www/solarautopilot
```

---

## Firewall Configuration (if needed)

```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Performance Optimization

### Enable Nginx Caching
Already configured in nginx.conf for static files and images.

### PM2 Monitoring
```bash
pm2 install pm2-logrotate  # Rotate logs automatically
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## Security Recommendations

1. **Change default SSH port** (optional but recommended)
2. **Setup fail2ban** to prevent brute force attacks
3. **Regular updates**: `sudo apt-get update && sudo apt-get upgrade`
4. **Monitor logs regularly**: `pm2 logs` and nginx logs

---

## Database Setup (Optional - Only if you need admin features)

If you want to enable admin features (blog, changelog, etc.):

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE solarautopilot;
CREATE USER solaruser WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE solarautopilot TO solaruser;
\q

# Update .env file
echo 'DATABASE_URL="postgresql://solaruser:your-secure-password@localhost:5432/solarautopilot"' >> /var/www/solarautopilot/.env

# Run Prisma migrations
cd /var/www/solarautopilot
npx prisma generate
npx prisma db push

# Restart application
pm2 restart solarautopilot-website
```

---

## Support

For issues or questions:
- Check logs: `pm2 logs solarautopilot-website`
- GitHub: https://github.com/CARBONOZ-RENEWABLES/solarautopilot
- Community: Join Discord or forums

---

## Quick Reference

**Website URL**: http://192.168.160.98
**Application Path**: /var/www/solarautopilot
**Nginx Config**: /etc/nginx/sites-available/solarautopilot
**Logs**: 
- PM2: `pm2 logs solarautopilot-website`
- Nginx Access: `/var/log/nginx/solarautopilot_access.log`
- Nginx Error: `/var/log/nginx/solarautopilot_error.log`
