# Deployment Instructions

## Quick Deploy
Run this command to deploy to production:
```bash
./deploy.sh
```

## Manual Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Update: MongoDB integration"
git push origin main
```

### 2. SSH to Server
```bash
ssh localadmin@192.168.160.98
```
Password: `Adgl5581`

### 3. On Server - Install MongoDB
```bash
# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### 4. On Server - Update Application
```bash
cd /var/www/solarautopilot

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Restart application
pm2 restart solarautopilot
# OR if not using PM2:
# sudo systemctl restart solarautopilot
```

### 5. Verify Deployment
Visit: https://solarautopilot.com

Test:
- Login to admin panel
- Upload an image (Header logo, Blog cover, etc.)
- Check if image displays correctly

## Troubleshooting

### Check MongoDB Status
```bash
sudo systemctl status mongod
```

### Check Application Logs
```bash
pm2 logs solarautopilot
```

### Check MongoDB Connection
```bash
mongosh
use solarautopilot
db.images.find()
```

### Restart Services
```bash
sudo systemctl restart mongod
pm2 restart solarautopilot
```
