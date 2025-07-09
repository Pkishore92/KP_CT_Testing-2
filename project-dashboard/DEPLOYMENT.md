# Deployment Guide

## Quick Start

Your project dashboard is ready to deploy! Here are three **free** hosting options:

## Option 1: GitHub Pages (Recommended)

1. **Create GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/project-dashboard.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: main / root
   - Click "Save"

3. **Build and deploy:**
   ```bash
   bun run build
   # Upload the dist/ folder contents to your gh-pages branch
   ```

   Your site will be available at: `https://yourusername.github.io/project-dashboard`

## Option 2: Netlify (Easiest)

1. **Drag & Drop:**
   - Run `bun run build`
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist/` folder to the deploy area
   - Done! You'll get a random URL like `project-dashboard-abc123.netlify.app`

2. **Custom domain (optional):**
   - Go to Domain settings
   - Add your custom domain

## Option 3: Vercel

1. **Connect GitHub:**
   - Push your code to GitHub (see Option 1, step 1)
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Git Repository"
   - Select your project
   - Deploy automatically

## Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Updating Your Live Site

### Method 1: Automatic (Recommended)
- Push changes to GitHub
- Sites will auto-update (if using GitHub Pages, Netlify, or Vercel with Git integration)

### Method 2: Manual
- Run `bun run build`
- Upload new `dist/` folder contents
- Site updates immediately

## Custom Domain Setup

All hosting providers support custom domains:

1. **Buy domain** (namecheap.com, godaddy.com, etc.)
2. **Point DNS** to hosting provider:
   - **GitHub Pages:** A record to `185.199.108.153`
   - **Netlify:** CNAME to `your-site.netlify.app`
   - **Vercel:** Follow their custom domain guide

## Project Data Updates

1. **Edit `src/data/projects.json`**
2. **Rebuild and deploy:**
   ```bash
   bun run build
   # Upload new files or push to Git
   ```

## Environment Setup

If you need to set this up on a new computer:

```bash
# Install Bun (if not installed)
curl -fsSL https://bun.sh/install | bash

# Clone your repository
git clone https://github.com/yourusername/project-dashboard.git
cd project-dashboard

# Install dependencies and run
bun install
bun run dev
```

## Troubleshooting

### Map not loading
- Check browser console for errors
- Ensure Leaflet CSS is loading correctly
- Verify project coordinates are valid

### Build fails
- Run `bun install` to ensure all dependencies are installed
- Check that all JSON data is valid

### Site not updating
- Clear browser cache
- Check if deployment actually completed
- Verify you're viewing the correct URL

## Performance Tips

- Images: Optimize any project images you add
- Data: Keep JSON file under 1MB for fast loading
- Caching: Modern hosting providers handle this automatically

## Security

- No API keys needed (using OpenStreetMap)
- No sensitive data exposed (all static files)
- HTTPS enabled by default on all hosting providers

---

**Total hosting cost: $0/month** ✨