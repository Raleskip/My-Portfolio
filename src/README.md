# 🚀 Raleskip Portfolio - Digital Marketing Expert & AI Innovation Leader

<div align="center">

![Raleskip Banner](https://img.shields.io/badge/Raleskip-Portfolio-10b981?style=for-the-badge&logo=react&logoColor=white)

[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/raleskip/portfolio)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/raleskip/portfolio)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=for-the-badge&logo=github)](https://github.com/raleskip/portfolio/actions)

**Production URLs:**
🚀 [Vercel](https://raleskip.vercel.app) • 🌊 [Netlify](https://raleskip.netlify.app) • 🌐 [GitHub Pages](https://raleskip.github.io)

</div>

---

## 👋 About

This is the personal portfolio of **Aayush Pawar**, a Digital Marketing Expert and AI Innovation Leader with 9+ years of experience in healthcare marketing, product marketing at Jio Platforms Limited, brand strategy, and technology innovation.

### 🌟 Professional Summary
- **Current Role:** Product Marketing Manager at Jio Platforms Limited
- **Previous Role:** Marketing Manager at JioHealthHub
- **Expertise:** Digital Marketing, AI/ML, Healthcare Marketing, Brand Strategy
- **Brand Identity:** Raleskip - Digital First Marketer, Raconteur, AI Specialist & Creative Visionary

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and builds
- **Tailwind CSS v4** for modern styling

### Animation & Interactions
- **Framer Motion** for smooth animations
- **Custom kinetic typography** with performance optimizations
- **Advanced neumorphism** design system

### Build & Optimization
- **Code splitting** and lazy loading
- **Bundle analysis** and size optimization
- **SEO optimization** with meta tags and structured data
- **Progressive Web App** features

### Deployment Platforms
- **Vercel** (Primary) - Edge functions, analytics
- **Netlify** (Alternative) - Forms, split testing
- **GitHub Pages** (Backup) - Free hosting

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.18.0+ 
- **npm** 9.8.1+
- **Git** for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/raleskip/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Type check
npm run type-check

# Build application
npm run build

# Preview build
npm run preview
```

---

## 🌐 Deployment Options

### Option 1: Automated GitHub Actions (Recommended)

**Set up GitHub repository secrets:**
```bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

**Deploy automatically on push to main branch** ✅

### Option 2: Manual Deployment Scripts

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Set up all deployment platforms
./scripts/setup-deployment.sh

# Deploy to all platforms
./scripts/deploy.sh --production

# Deploy to specific platform
./scripts/deploy.sh --vercel --production
./scripts/deploy.sh --netlify --production
```

### Option 3: One-Click Deploy

| Platform | Deploy Button | Features |
|----------|---------------|----------|
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/raleskip/portfolio) | Edge functions, Analytics |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/raleskip/portfolio) | Forms, Split testing |

---

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript checking |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run deploy:all` | Deploy to all platforms |
| `npm run deploy:vercel` | Deploy to Vercel only |
| `npm run deploy:netlify` | Deploy to Netlify only |
| `npm run check:deployment` | Check if deployment is live |

---

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
# Site Configuration
VITE_SITE_URL=https://raleskip.vercel.app
VITE_SITE_NAME="Raleskip Portfolio"

# Contact Form (EmailJS)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_ANIMATIONS=true
```

### Custom Domain Setup
For custom domain configuration, see [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

---

## 🎨 Design System

### Color Palette
- **Primary:** Emerald Green (#10b981) - Growth & Innovation
- **Secondary:** Cyan Blue (#06b6d4) - Technology & Clarity
- **Accent:** Purple (#8b5cf6) - Creativity & Vision
- **Background:** Deep Black (#000000) - Premium Feel

### Typography
- **Display:** Cormorant Garamond - Elegant headings
- **Body:** Poppins - Readable content
- **Mono:** JetBrains Mono - Code and technical text

### Interactive Elements
- **Neumorphism effects** for depth and premium feel
- **Kinetic typography** with performance optimizations
- **Smooth animations** with reduced motion support
- **Advanced hover states** and micro-interactions

---

## 📊 Performance Features

### Optimization Techniques
- ⚡ **Code splitting** - Lazy loaded components
- 📦 **Bundle optimization** - Manual chunks for vendors
- 🖼️ **Image optimization** - WebP format with fallbacks
- 🔄 **Service worker** - Offline support and caching
- 📈 **Performance monitoring** - Core Web Vitals tracking

### Accessibility
- ♿ **ARIA labels** and semantic HTML
- ⌨️ **Keyboard navigation** support
- 🎨 **High contrast** mode support
- 🔍 **Screen reader** optimizations
- 🎬 **Reduced motion** preferences

---

## 🔍 SEO Features

### Technical SEO
- 🏷️ **Meta tags** - Complete Open Graph and Twitter Cards
- 📋 **Structured data** - Person and Organization schemas
- 🗺️ **XML sitemap** - Auto-generated for all pages
- 🤖 **Robots.txt** - Search engine directives
- 🔗 **Canonical URLs** - Prevent duplicate content

### Content SEO
- 📝 **Semantic HTML** structure
- 🏆 **Core Web Vitals** optimization
- 📱 **Mobile-first** responsive design
- 🌐 **Progressive Web App** features

---

## 🚨 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
npm run type-check
# Fix any type errors, then rebuild
```

**Deployment fails:**
```bash
# Check secrets are set correctly
# Verify Node.js version (18.18.0+)
# Clear cache and reinstall
npm ci
```

**Performance issues:**
```bash
# Analyze bundle size
npm run build:analyze
# Check Core Web Vitals
# Optimize images and assets
```

---

## 📞 Contact

**Aayush Pawar** - Digital Marketing Expert & AI Innovation Leader

- 📧 **Email:** [apdontmailme@gmail.com](mailto:apdontmailme@gmail.com)
- 📱 **Phone:** [+91 8356933902](tel:+918356933902)
- 📍 **Location:** Mumbai, Maharashtra, India
- 💼 **LinkedIn:** [aayushpawar](https://linkedin.com/in/aayushpawar)
- 🎨 **Behance:** [aayushpawar](https://behance.net/aayushpawar)
- 📷 **Instagram:** [@raleskip](https://instagram.com/raleskip)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration:** Modern portfolio trends and neumorphism
- **Technology Stack:** React ecosystem and modern web standards
- **Performance:** Web Vitals and accessibility guidelines
- **Deployment:** Multi-platform hosting solutions

---

<div align="center">

**Made with ❤️ by Aayush Pawar**

[![Portfolio](https://img.shields.io/badge/Portfolio-raleskip.com-10b981?style=for-the-badge)](https://raleskip.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/aayushpawar)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:apdontmailme@gmail.com)

</div>