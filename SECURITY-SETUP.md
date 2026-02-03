# 🔒 Security Setup Guide

## Critical Security Issues to Fix

Your boss identified these security concerns:
1. ❌ Weak password (Adgl5581) - needs 12+ characters with high entropy
2. ❌ No HTTPS - running on port 80 only
3. ❌ Server exposed to internet without SSL

## ✅ Solution: 3-Step Security Fix

### Step 1: Change Server Password (CRITICAL)

**On your local machine:**
```bash
# SSH into the server
ssh localadmin@192.168.160.98

# Change password (use 12+ characters with mix of upper, lower, numbers, symbols)
sudo passwd localadmin
```

**Example strong password:** `K9mP#xL2vN8q!Zt5` (16 characters)

**After changing password:**
```bash
# On your local machine, save the new password securely
echo 'YOUR_NEW_SECURE_PASSWORD' > /Users/digitalaxis/Desktop/solarautopilot-website/.deploy-password
chmod 600 /Users/digitalaxis/Desktop/solarautopilot-website/.deploy-password
```

---

### Step 2: Setup SSL Certificate (Enable HTTPS)

**Option A: Automated Setup (Recommended)**

```bash
# From your local machine
cd /Users/digitalaxis/Desktop/solarautopilot-website

# Make scripts executable
chmod +x setup-security.sh generate-ssl.sh deploy-secure.sh

# Deploy with new password
./deploy-secure.sh

# Then run security setup on remote server
sshpass -p 'YOUR_NEW_PASSWORD' ssh localadmin@192.168.160.98 'cd ~/solarautopilot-website && bash setup-security.sh'
```

**Option B: Manual Setup**

```bash
# SSH into server
ssh localadmin@192.168.160.98

# Generate SSL certificate
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/solarautopilot.key \
  -out /etc/nginx/ssl/solarautopilot.crt \
  -subj "/C=US/ST=State/L=City/O=CARBONOZ/OU=IT/CN=192.168.160.98"

# Set permissions
sudo chmod 600 /etc/nginx/ssl/solarautopilot.key
sudo chmod 644 /etc/nginx/ssl/solarautopilot.crt

# Update Nginx config
sudo cp ~/solarautopilot-website/nginx-ssl.conf /etc/nginx/sites-available/solarautopilot
sudo ln -sf /etc/nginx/sites-available/solarautopilot /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx

# Open port 443
sudo ufw allow 443/tcp
```

---

### Step 3: Update Deployment Scripts

**Update your deployment commands to use the new password:**

```bash
# Old command (INSECURE - DON'T USE)
sshpass -p 'Adgl5581' scp deploy.tar.gz localadmin@192.168.160.98:/home/localadmin/

# New command (SECURE)
sshpass -p "$(cat .deploy-password)" scp deploy.tar.gz localadmin@192.168.160.98:/home/localadmin/
```

**Or use the new secure deployment script:**

```bash
cd /Users/digitalaxis/Desktop/solarautopilot-website
./deploy-secure.sh
```

---

## 🎯 Quick Start (All-in-One)

```bash
cd /Users/digitalaxis/Desktop/solarautopilot-website

# 1. Change password on server first
ssh localadmin@192.168.160.98
sudo passwd localadmin
# Enter new strong password (12+ chars)
exit

# 2. Save new password locally
echo 'YOUR_NEW_SECURE_PASSWORD' > .deploy-password
chmod 600 .deploy-password

# 3. Make scripts executable
chmod +x deploy-secure.sh setup-security.sh

# 4. Deploy application
./deploy-secure.sh

# 5. Setup SSL on remote server
NEW_PASS=$(cat .deploy-password)
sshpass -p "$NEW_PASS" ssh localadmin@192.168.160.98 'cd ~/solarautopilot-website && bash setup-security.sh'
```

---

## ✅ Verification Checklist

After completing the setup:

- [ ] Password changed to 12+ characters
- [ ] `.deploy-password` file created and secured (chmod 600)
- [ ] SSL certificate generated on server
- [ ] Nginx configured for HTTPS (port 443)
- [ ] HTTP redirects to HTTPS
- [ ] Port 443 open in firewall
- [ ] Website accessible via `https://192.168.160.98`
- [ ] Browser shows SSL certificate (self-signed warning is normal)

---

## 🔐 Password Requirements

Your new password MUST have:
- ✅ Minimum 12 characters
- ✅ Mix of uppercase and lowercase letters
- ✅ Numbers
- ✅ Special characters (!@#$%^&*)
- ✅ High entropy (random, not dictionary words)

**Good examples:**
- `K9mP#xL2vN8q!Zt5`
- `Jx7$nQ3pW!mR9kL2`
- `Vy4#Bz8tN!qX6mP1`

**Bad examples:**
- `admin123` ❌ (too short, predictable)
- `Adgl5581` ❌ (too short, low entropy)
- `password2024` ❌ (dictionary word)

---

## 🌐 Access URLs

After setup:
- **HTTP (redirects to HTTPS):** http://192.168.160.98
- **HTTPS (secure):** https://192.168.160.98

---

## 📝 Notes

1. **Self-signed certificate warning:** Browsers will show a security warning because the certificate is self-signed. This is normal for internal servers. Users need to accept the certificate.

2. **Production SSL:** For public internet access, consider using Let's Encrypt for a free, trusted SSL certificate:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Password storage:** Never commit `.deploy-password` to git. It's already in `.gitignore`.

4. **SSH keys (optional):** For even better security, consider using SSH keys instead of passwords:
   ```bash
   ssh-keygen -t ed25519
   ssh-copy-id localadmin@192.168.160.98
   ```

---

## 🆘 Troubleshooting

**Port 443 not accessible:**
```bash
sudo ufw status
sudo ufw allow 443/tcp
sudo systemctl status nginx
```

**Nginx fails to start:**
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**SSL certificate issues:**
```bash
sudo ls -la /etc/nginx/ssl/
sudo openssl x509 -in /etc/nginx/ssl/solarautopilot.crt -text -noout
```

---

## 📧 Report to Boss

After completing the setup, you can report:

> ✅ Security issues resolved:
> 1. Password changed to 16-character high-entropy password
> 2. HTTPS enabled on port 443 with self-signed SSL certificate
> 3. HTTP (port 80) now redirects to HTTPS
> 4. SSL/TLS 1.2+ with strong ciphers configured
> 5. Security headers added (HSTS, X-Frame-Options, etc.)
> 
> The website is now accessible at: https://192.168.160.98
