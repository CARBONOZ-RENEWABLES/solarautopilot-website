# Push Repository to GitHub - CARBONOZ-RENEWABLES

## Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/digitalaxis/Desktop/SolarAutopilotWesite

# Initialize git if needed
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.production
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite

# Uploads
public/downloads/*
!public/downloads/.gitkeep

# Prisma
prisma/migrations/
EOF

# Create .gitkeep for downloads folder
mkdir -p public/downloads
touch public/downloads/.gitkeep
```

## Step 2: Create Repository on GitHub

1. Go to https://github.com/CARBONOZ-RENEWABLES
2. Click "New repository"
3. Repository name: `solarautopilot-website`
4. Description: `Official SolarAutopilot marketing website with admin CMS, blog, and download management`
5. Keep it Public or Private (your choice)
6. DO NOT initialize with README (we already have files)
7. Click "Create repository"

## Step 3: Add Files and Push

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: SolarAutopilot website with admin CMS, blog, and file management"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/CARBONOZ-RENEWABLES/solarautopilot-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 4: Setup GitHub Secrets (for CI/CD if needed)

Go to repository Settings → Secrets and variables → Actions

Add these secrets:
- `DATABASE_URL` - Your production database URL
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `ADMIN_PASSWORD` - Your admin password

## Step 5: Update Repository URLs in Code

The code already points to `https://github.com/CARBONOZ-RENEWABLES/solarautopilot`

If you want to change the repository name, update these files:
- `content/collections/installation.json`
- `components/InstallationGuide.tsx`

## Alternative: Push to Existing Repository

If you want to push to an existing repo:

```bash
# Remove existing remote if any
git remote remove origin

# Add your repository
git remote add origin https://github.com/CARBONOZ-RENEWABLES/your-repo-name.git

# Force push (if repo exists and you want to replace it)
git push -u origin main --force

# Or normal push
git push -u origin main
```

## Repository Structure

```
solarautopilot-website/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities and helpers
├── prisma/                 # Database schema
├── public/                 # Static files
├── content/                # CMS content
├── .env.local             # Local environment (NOT committed)
├── .env.production        # Production template
├── nginx.conf             # Nginx configuration
├── solarautopilot.service # Systemd service
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # Project documentation
```

## Important Notes

1. **Never commit sensitive data:**
   - `.env.local` is in `.gitignore`
   - Database credentials
   - API keys
   - Admin passwords

2. **Uploaded files:**
   - `public/downloads/` is ignored
   - Files are stored locally or in S3/R2
   - Only `.gitkeep` is committed

3. **Database:**
   - Prisma schema is committed
   - Migrations are NOT committed (generated per environment)
   - Run `npx prisma db push` on each deployment

## Verify Push

After pushing, verify at:
https://github.com/CARBONOZ-RENEWABLES/solarautopilot-website

## Clone on Server

To deploy on production server:

```bash
# Clone repository
git clone https://github.com/CARBONOZ-RENEWABLES/solarautopilot-website.git
cd solarautopilot-website

# Install dependencies
npm install

# Setup environment
cp .env.production .env.local
nano .env.local  # Edit with your values

# Setup database
npx prisma generate
npx prisma db push

# Build and run
npm run build
npm start
```

---

**Your repository is now on GitHub!** 🚀
