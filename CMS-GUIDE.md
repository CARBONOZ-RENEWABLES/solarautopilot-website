# SolarAutopilot CMS Guide

## Complete File-Based Content Management System

This system allows you to edit ALL website content without touching code. Everything is managed through a visual admin panel.

## 🎯 What You Can Edit

### 1. **Pages** (`/admin` → Pages)
- Homepage hero section (title, subtitle, buttons)
- All page content and sections
- SEO metadata (title, description)

### 2. **Features** (`/admin` → Features)
- Feature cards with icons and descriptions
- Reorder features by changing the order number
- Enable/disable features with checkbox

### 3. **Downloads** (`/admin` → Downloads)
- App download links for all platforms
- Version numbers and file sizes
- Platform-specific installation commands

### 4. **Settings** (`/admin` → Settings)
- Site name and tagline
- Contact information
- Social media links

## 🚀 Quick Start

1. **Setup CMS**:
   ```bash
   ./setup-cms.sh
   ```

2. **Start Development**:
   ```bash
   npm run dev
   ```

3. **Access Admin Panel**:
   - Visit: `http://localhost:3000/admin`
   - Login with admin credentials

## 📝 How to Edit Content

### Editing Homepage Hero
1. Go to `/admin` → Pages
2. Click on "Home" page
3. Edit the hero section:
   - **Title**: Main headline text
   - **Subtitle**: Description text
   - **Primary CTA**: Download button text
   - **Secondary CTA**: Demo button text
4. Click "Save Changes"

### Adding New Features
1. Go to `/admin` → Features
2. Click "Add New"
3. Fill in:
   - **Title**: Feature name
   - **Description**: Feature explanation
   - **Icon**: Icon name (from Lucide icons)
   - **Order**: Display order (0 = first)
4. Click "Save Changes"

### Managing Downloads
1. Go to `/admin` → Downloads
2. Click "Add New" or edit existing
3. Fill in:
   - **Platform**: windows/macos/linux/docker
   - **Version**: Version number
   - **Download URL**: Direct download link
   - **Size**: File size (e.g., "45.2 MB")
4. Click "Save Changes"

## 🔧 File Structure

```
content/
├── collections/
│   ├── features.json     # Feature cards
│   ├── downloads.json    # Download links
│   ├── settings.json     # Site settings
│   └── users.json        # Admin users
└── pages/
    └── home.json         # Homepage content
```

## 🌐 Deployment

### Automatic Deployment
- Content changes automatically deploy via Git
- No manual deployment needed
- Changes are live within minutes

### Manual Deployment
```bash
npm run build
npm start
```

## 🔒 Security Features

- Admin authentication required
- Role-based access (admin/editor)
- File-based storage (no database vulnerabilities)
- HTTPS-only in production

## 📱 Mobile-Friendly Admin

The admin panel works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Customization

### Adding New Content Types
1. Edit `payload.config.ts`
2. Add new collection
3. Create corresponding API routes
4. Update admin panel

### Changing Admin Theme
- Edit admin panel styles in `components/AdminPanel.tsx`
- Customize colors and layout

## 🆘 Troubleshooting

### Admin Panel Not Loading
- Check `.env.local` configuration
- Ensure all dependencies installed: `npm install`
- Restart development server: `npm run dev`

### Content Not Updating
- Check file permissions in `content/` directory
- Verify JSON syntax in content files
- Clear browser cache

### Upload Issues
- Check Cloudflare R2 credentials
- Verify bucket permissions
- Test file size limits

## 📞 Support

For technical support:
1. Check the troubleshooting section above
2. Review error logs in browser console
3. Contact development team

---

**Remember**: You never need to edit code files. Everything can be managed through the admin panel at `/admin`.