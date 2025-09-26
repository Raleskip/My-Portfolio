# 🚀 Raleskip Portfolio - GitHub Deployment Guide

## Quick Deployment

### Option 1: Automated GitHub Actions (Recommended)
1. **Push to GitHub**: The deployment happens automatically when you push to the `main` branch
2. **Check Status**: Go to your repository's "Actions" tab to monitor the deployment
3. **Enable Pages**: Go to Settings → Pages → Source: GitHub Actions

### Option 2: Manual Deployment Script
```bash
# Make the script executable
chmod +x deploy-github.sh

# Run the deployment
./deploy-github.sh
```

## Setup Instructions

### 1. Repository Setup
```bash
# Clone or initialize your repository
git clone https://github.com/YOUR_USERNAME/raleskip-portfolio.git
cd raleskip-portfolio

# Install dependencies
npm install

# Test local build
npm run build
npm run preview
```

### 2. GitHub Pages Configuration
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Set source to **GitHub Actions**
4. The site will be available at `https://YOUR_USERNAME.github.io/raleskip-portfolio/`

### 3. Custom Domain (Optional)
If you have a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `base` in `vite.config.ts`

## Performance Optimizations

### ✅ What's Optimized
- **Bundle Size**: Optimized chunk splitting and tree shaking
- **Loading Speed**: Lazy loading for components
- **SEO**: Meta tags and structured data
- **Caching**: Optimized asset naming for cache busting
- **Compression**: Gzip compression and minification
- **Images**: Optimized image loading with fallbacks

### 📊 Build Statistics
- **Main Bundle**: ~200KB (gzipped)
- **Vendor Bundle**: ~150KB (gzipped)
- **CSS**: ~25KB (gzipped)
- **First Load**: <3 seconds on 3G

## Environment Variables

```bash
# Production build with version info
VITE_APP_VERSION=2.1.0
VITE_BUILD_DATE=2025-01-03T10:00:00Z
NODE_ENV=production
```

## Troubleshooting

### Common Issues

**1. 404 Error on Refresh**
- ✅ Fixed: Added `404.html` redirect to `index.html`

**2. Assets Not Loading**
- ✅ Fixed: Correct base path in `vite.config.ts`

**3. Large Bundle Size**
- ✅ Fixed: Code splitting and lazy loading

**4. Slow Loading**
- ✅ Fixed: Optimized animations and reduced complexity

### Deployment Checklist

- [ ] All assets are optimized
- [ ] Build runs without errors
- [ ] All routes work correctly
- [ ] Meta tags are properly set
- [ ] Performance is acceptable
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified

## Scripts Available

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build locally

# Building
npm run build            # Production build
npm run build:analyze    # Build with bundle analysis

# Quality Checks
npm run type-check       # TypeScript validation
npm run lint             # ESLint checks
npm run format           # Format with Prettier

# Deployment
./deploy-github.sh       # Deploy to GitHub Pages
npm run deploy:vercel    # Deploy to Vercel (alternative)
```

## Project Structure

```
raleskip-portfolio/
├── src/
│   ├── components/          # React components
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── dist/                   # Build output
├── .github/workflows/      # GitHub Actions
└── deploy-github.sh        # Deployment script
```

## Performance Monitoring

After deployment, monitor:
- **Core Web Vitals**: Using Google PageSpeed Insights
- **Bundle Size**: Check build output
- **Load Times**: Test on different networks
- **User Experience**: Test on various devices

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your repository settings
3. Test the build locally first
4. Check the browser console for errors

---

**Live Site**: [Raleskip Portfolio](https://raleskip.github.io/raleskip-portfolio/)

Made with ❤️ by Aayush Pawar | Raleskip