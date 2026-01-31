# Quick Deployment Guide

## 🚀 Automated Deployment (Recommended)

Run this single command to deploy everything:

```bash
./deploy-auto.sh
```

This script will:
1. Build the application locally
2. Copy files to the server
3. Install dependencies
4. Configure Nginx
5. Start the application with PM2

## 📋 Manual Deployment

If you prefer manual deployment, follow the detailed guide in `DEPLOYMENT.md`

## 🌐 Access Your Website

After deployment, visit: **http://192.168.160.98**

## 🔍 Check Status

```bash
ssh localadmin@192.168.160.98 'pm2 status'
```

## 📝 View Logs

```bash
ssh localadmin@192.168.160.98 'pm2 logs solarautopilot-website'
```

## 🔄 Update Website

After making changes, run:

```bash
./deploy-auto.sh
```

## ❓ Troubleshooting

See `DEPLOYMENT.md` for detailed troubleshooting steps.

## 📚 Full Documentation

- **Deployment Guide**: `DEPLOYMENT.md`
- **Environment Setup**: `.env.example`
- **Nginx Config**: `nginx.conf`
- **PM2 Config**: `ecosystem.config.js`
