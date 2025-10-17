# 🚀 Production Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ **Code Quality**
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] ESLint warnings addressed (`npm run lint`)
- [ ] No console.log statements in production code
- [ ] Error boundaries implemented and tested
- [ ] Performance optimizations applied

### ✅ **SEO & Meta Tags**
- [ ] All meta tags configured in `index.html`
- [ ] Open Graph images generated (1200x630px)
- [ ] Twitter Card images created (1200x600px)
- [ ] Sitemap.xml updated with correct URLs
- [ ] Robots.txt configured for your domain
- [ ] Structured data validated

### ✅ **Performance**
- [ ] Lighthouse score 90+ on all metrics
- [ ] Images optimized (WebP format where possible)
- [ ] Bundle size analyzed (`npm run build:analyze`)
- [ ] Lazy loading implemented for heavy components
- [ ] Code splitting configured
- [ ] Critical CSS inlined

### ✅ **Security**
- [ ] Content Security Policy configured
- [ ] Security headers implemented
- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced
- [ ] Dependencies updated and secure

### ✅ **Analytics & Monitoring**
- [ ] Google Analytics 4 configured (if using)
- [ ] Error tracking setup (optional)
- [ ] Performance monitoring enabled
- [ ] Core Web Vitals tracking

## 🌐 Platform-Specific Deployment

### **Netlify Deployment**

1. **Connect Git Repository**
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Netlify Configuration**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: `18`

3. **Environment Variables** (if needed)
   ```
   NODE_VERSION=18
   NPM_VERSION=8
   VITE_GA_MEASUREMENT_ID=your_ga_id (optional)
   ```

4. **Custom Domain Setup**
   - Add your domain: `www.raleskip.com`
   - Configure DNS: Point to Netlify
   - Enable HTTPS: Automatic SSL

### **Vercel Deployment**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Custom Domain**
   ```bash
   vercel domains add www.raleskip.com
   ```

### **GitHub Pages**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Deploy Script** (package.json)
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### **Traditional Web Hosting**

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Upload Files**
   - Upload entire `dist` folder to your web root
   - Ensure server serves `index.html` for all routes

3. **Server Configuration** (Apache)
   ```apache
   # .htaccess
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

4. **Server Configuration** (Nginx)
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## 🔧 Production Optimizations

### **Image Optimization**
```bash
# Convert images to WebP
npx @squoosh/cli --webp '{"quality":80}' public/images/*.{png,jpg}

# Generate different sizes
npx @squoosh/cli --resize '{"width":1200}' public/og-image.png
npx @squoosh/cli --resize '{"width":600}' public/twitter-image.png
```

### **Bundle Analysis**
```bash
# Analyze bundle size
npm run build:analyze

# Check for duplicate dependencies
npx webpack-bundle-analyzer dist/stats.json
```

### **Performance Testing**
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Core Web Vitals
npx web-vitals-measure https://www.raleskip.com
```

## 📊 Monitoring Setup

### **Google Analytics 4**
1. Create GA4 property
2. Get Measurement ID
3. Uncomment GA code in `index.html`
4. Replace `GA_MEASUREMENT_ID` with your ID

### **Google Search Console**
1. Add property: `https://www.raleskip.com`
2. Verify ownership via HTML tag
3. Submit sitemap: `https://www.raleskip.com/sitemap.xml`

### **Performance Monitoring**
```javascript
// Web Vitals tracking (optional)
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🚨 Troubleshooting

### **Common Issues**

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues (404 on refresh)**
- Ensure SPA redirect rules are configured
- Check server configuration for single-page apps

**Performance Issues**
```bash
# Check bundle size
npm run build:analyze

# Optimize images
# Use WebP format
# Enable lazy loading
```

**SEO Issues**
- Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)
- Check meta tags: [Meta Tags](https://metatags.io/)
- Test social sharing: [Social Share Preview](https://socialsharepreview.com/)

## 📈 Post-Deployment

### **Domain Configuration**
1. **DNS Setup**
   ```
   A Record: @ → Netlify/Vercel IP
   CNAME: www → your-site.netlify.app
   ```

2. **SSL Certificate**
   - Automatic with Netlify/Vercel
   - Manual: Let's Encrypt for custom servers

### **Performance Monitoring**
- Monitor Core Web Vitals
- Track user interactions
- Monitor error rates
- Check uptime status

### **SEO Monitoring**
- Submit to Google Search Console
- Monitor search rankings
- Track organic traffic
- Update sitemap regularly

## 🔄 Continuous Deployment

### **Automated Deployment**
```yaml
# GitHub Actions (.github/workflows/deploy.yml)
name: Deploy to Production
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - run: npm run deploy
```

### **Quality Gates**
- Lighthouse score > 90
- No TypeScript errors
- ESLint passing
- Build successful

## 📞 Support

For deployment issues or questions:
- 📧 Email: contact@raleskip.com
- 💼 LinkedIn: [Aayush Pawar](https://www.linkedin.com/in/aayushpawar)
- 🌐 Website: [www.raleskip.com](https://www.raleskip.com)

---

**🎉 Your portfolio is ready for production!**