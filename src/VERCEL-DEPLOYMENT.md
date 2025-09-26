# 🚀 Vercel Deployment Guide - Raleskip Portfolio

## Overview
Complete deployment guide for the Raleskip Portfolio on Vercel platform with optimized performance, security, and SEO configuration.

## 🎯 Quick Deployment

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# ? Set up and deploy "~/raleskip-portfolio"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? raleskip-portfolio
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n

# For production deployment
vercel --prod
```

### Option 2: GitHub Integration
1. Push your code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Vite framework
6. Click "Deploy"

## 🔧 Environment Variables Setup

### Required Environment Variables
Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```bash
# Site Configuration
VITE_SITE_NAME=Raleskip Portfolio
VITE_SITE_URL=https://your-domain.vercel.app
VITE_APP_VERSION=1.0.0

# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### Setting Environment Variables via CLI
```bash
# Set production environment variables
vercel env add VITE_SITE_NAME production
vercel env add VITE_SITE_URL production
vercel env add VITE_EMAILJS_SERVICE_ID production
vercel env add VITE_EMAILJS_TEMPLATE_ID production
vercel env add VITE_EMAILJS_PUBLIC_KEY production

# Set preview environment variables
vercel env add VITE_SITE_NAME preview
vercel env add VITE_SITE_URL preview

# Set development environment variables
vercel env add VITE_SITE_NAME development
vercel env add VITE_SITE_URL development
```

## 🌐 Custom Domain Setup

### Adding Custom Domain
1. **Purchase Domain**: Buy your domain from any registrar
2. **Vercel Dashboard**: Go to Project → Settings → Domains
3. **Add Domain**: Enter your custom domain (e.g., `raleskip.com`)
4. **DNS Configuration**: Update your domain's DNS settings:

```dns
# For root domain (raleskip.com)
Type: A
Name: @
Value: 76.76.19.61

# For www subdomain (www.raleskip.com)
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Alternative: Use Vercel nameservers
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### SSL Certificate
- Vercel automatically provides SSL certificates
- No additional configuration needed
- Certificates auto-renew

## ⚡ Performance Optimizations

### Build Optimizations
```json
// vite.config.ts optimizations
{
  "build": {
    "rollupOptions": {
      "output": {
        "manualChunks": {
          "vendor": ["react", "react-dom"],
          "motion": ["motion"],
          "radix": ["@radix-ui/react-accordion", "@radix-ui/react-dialog"]
        }
      }
    },
    "chunkSizeWarningLimit": 1000
  }
}
```

### Vercel Analytics Setup
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      {/* Your app content */}
      <Analytics />
    </>
  );
}
```

## 🔒 Security Configuration

### Content Security Policy
The `vercel.json` includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Environment Security
```bash
# Never commit these to repository
echo "VITE_EMAILJS_*" >> .gitignore
echo ".env.local" >> .gitignore
```

## 📊 Monitoring & Analytics

### Vercel Web Analytics
1. Enable in Vercel Dashboard → Project → Analytics
2. View performance metrics, page views, and user behavior

### Performance Monitoring
```bash
# Install Vercel Speed Insights
npm install @vercel/speed-insights

# Add to App.tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      {/* Your app content */}
      <SpeedInsights />
    </>
  );
}
```

## 🚀 Deployment Commands

### Development Workflow
```bash
# Local development
npm run dev

# Preview deployment (branch deployments)
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

### Rollback Strategy
```bash
# List previous deployments
vercel ls

# Promote previous deployment to production
vercel promote [deployment-url]

# Alias specific deployment
vercel alias [deployment-url] your-domain.com
```

## 📱 Mobile & PWA Optimizations

### Progressive Web App
The portfolio includes PWA configuration:
- `manifest.json` for app installation
- Service worker for offline functionality
- Optimized for mobile devices

### Mobile Performance
- Responsive design with Tailwind CSS
- Optimized images and assets
- Fast loading on mobile networks

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear build cache
vercel --force

# Check build logs
vercel logs --follow

# Local build test
npm run build
npm run preview
```

#### Environment Variables Not Working
```bash
# Verify environment variables
vercel env ls

# Pull environment variables locally
vercel env pull .env.local

# Check variable names (must start with VITE_)
echo $VITE_SITE_NAME
```

#### Domain Issues
```bash
# Check domain configuration
vercel domains ls

# Remove and re-add domain
vercel domains rm your-domain.com
vercel domains add your-domain.com
```

### Performance Issues
1. **Large Bundle Size**: Check build output and optimize imports
2. **Slow Loading**: Enable Vercel Analytics to identify bottlenecks
3. **Image Optimization**: Use Vercel Image Optimization

## 📈 SEO Configuration

### Meta Tags
The portfolio includes comprehensive SEO:
- Dynamic meta titles and descriptions
- Open Graph tags for social sharing
- Structured data for rich snippets
- XML sitemap at `/sitemap.xml`

### Search Console Setup
1. Add domain to Google Search Console
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor search performance

## 🔄 CI/CD Pipeline

### Automatic Deployments
- **Main Branch**: Deploys to production
- **Feature Branches**: Creates preview deployments
- **Pull Requests**: Generates preview URLs

### GitHub Actions Integration
```yaml
# .github/workflows/vercel.yml
name: Vercel Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 📞 Support & Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vercel.com/guides/deploying-vite-with-vercel)
- [Custom Domains](https://vercel.com/docs/projects/domains)

### Performance Resources
- [Vercel Analytics](https://vercel.com/analytics)
- [Speed Insights](https://vercel.com/docs/speed-insights)
- [Web Vitals](https://web.dev/vitals/)

---

## 🎉 Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Environment variables configured
- [ ] Custom domain setup (if applicable)
- [ ] SSL certificate verified
- [ ] Analytics configured
- [ ] SEO tags verified
- [ ] Mobile responsiveness tested
- [ ] Performance metrics checked
- [ ] Contact form tested (EmailJS)
- [ ] Error pages configured

**Your Raleskip Portfolio is now ready for the world! 🚀**