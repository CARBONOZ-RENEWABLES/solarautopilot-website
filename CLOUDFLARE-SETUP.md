# ☁️ Cloudflare Setup Guide

## Current Server Configuration

**Server IP:** `192.168.160.98`
**HTTPS Port:** `443` ✅
**HTTP Port:** `80` ✅ (redirects to HTTPS)
**SSL Certificate:** Self-signed (will be replaced by Cloudflare)

---

## ✅ Server is Ready for Cloudflare

The server is already configured correctly:
- ✅ HTTPS enabled on port 443
- ✅ HTTP redirects to HTTPS
- ✅ Nginx configured with SSL
- ✅ Firewall allows port 443

---

## 🔧 Cloudflare Configuration Steps

### 1. Add Site to Cloudflare
1. Log in to Cloudflare dashboard
2. Click "Add a Site"
3. Enter your domain name
4. Select a plan (Free is fine)

### 2. Update DNS Records
Add an A record pointing to the server:

```
Type: A
Name: @ (or subdomain like "solar")
IPv4: 192.168.160.98
Proxy: ON (orange cloud) ✅
TTL: Auto
```

### 3. SSL/TLS Settings (IMPORTANT)

Go to **SSL/TLS** → **Overview**

**Choose:** `Full (strict)` or `Full`

- ✅ **Full (strict)** - Recommended (validates server certificate)
- ✅ **Full** - Works with self-signed certificates
- ❌ **Flexible** - Don't use (insecure)

### 4. Update Nameservers
Update your domain's nameservers to Cloudflare's:
- Provided by Cloudflare after adding site
- Usually takes 5-60 minutes to propagate

---

## 🔄 After Cloudflare is Active

### Update Environment Variables

Once you have the domain, update `.env.production`:

```bash
# Replace IP with domain
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

Then redeploy:
```bash
cd /Users/digitalaxis/Desktop/solarautopilot-website
./deploy-secure.sh
```

---

## 🎯 Cloudflare Benefits

- ✅ **Free SSL Certificate** - Replaces self-signed certificate
- ✅ **DDoS Protection** - Automatic protection
- ✅ **CDN** - Faster global access
- ✅ **Caching** - Improved performance
- ✅ **Analytics** - Traffic insights
- ✅ **No Browser Warnings** - Trusted SSL certificate

---

## 🧪 Testing After Cloudflare Setup

### 1. Test HTTPS
```bash
curl -I https://yourdomain.com
```
Should return `200 OK` with Cloudflare headers

### 2. Test HTTP Redirect
```bash
curl -I http://yourdomain.com
```
Should redirect to HTTPS

### 3. Test Admin Panel
```
URL: https://yourdomain.com/admin/login
Username: admin
Password: rf4uwizR4BnmL20!Zx9
```

### 4. Check SSL Certificate
Visit https://yourdomain.com
- Should show Cloudflare SSL certificate
- No browser warnings
- Green padlock icon

---

## ⚙️ Recommended Cloudflare Settings

### SSL/TLS
- **SSL/TLS encryption mode:** Full (strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON
- **Minimum TLS Version:** TLS 1.2

### Speed
- **Auto Minify:** JS, CSS, HTML
- **Brotli:** ON
- **Rocket Loader:** OFF (can break Next.js)

### Caching
- **Caching Level:** Standard
- **Browser Cache TTL:** 4 hours

### Security
- **Security Level:** Medium
- **Challenge Passage:** 30 minutes
- **Browser Integrity Check:** ON

---

## 🔍 Troubleshooting

### "Too Many Redirects" Error
- Change SSL/TLS mode from "Flexible" to "Full"

### "502 Bad Gateway"
- Check if server is running: `pm2 status`
- Check Nginx: `sudo systemctl status nginx`
- Verify port 443 is open

### Admin Login Not Working
- Clear browser cache
- Check `.env.production` has correct domain
- Verify password: `rf4uwizR4BnmL20!Zx9`

---

## 📝 Checklist for Boss

Before activating Cloudflare:
- [x] Server has HTTPS on port 443
- [x] Server has HTTP on port 80
- [x] Nginx configured correctly
- [x] Firewall allows ports 80 and 443
- [x] Application is running

After activating Cloudflare:
- [ ] DNS A record points to 192.168.160.98
- [ ] SSL/TLS mode set to "Full" or "Full (strict)"
- [ ] Domain resolves to Cloudflare
- [ ] Website accessible via domain
- [ ] Admin panel works with new domain
- [ ] Update .env.production with domain
- [ ] Redeploy application

---

## 🎉 Ready to Go!

The server is **fully configured** and ready for Cloudflare activation.

Once Cloudflare is active and the domain is working, just update the environment variables and redeploy.

**Current Status:** ✅ Server ready for Cloudflare
**Next Step:** Boss activates Cloudflare DNS
