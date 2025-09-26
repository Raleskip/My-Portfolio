#!/bin/bash

# 🔧 Raleskip Portfolio - Deployment Setup Script
# Sets up all deployment platforms and configurations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${PURPLE}========================================================================================${NC}"
    echo -e "${PURPLE}🔧 Raleskip Portfolio - Deployment Setup${NC}"
    echo -e "${PURPLE}========================================================================================${NC}"
}

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

check_prerequisites() {
    print_step "Checking prerequisites"
    
    # Check if git is initialized
    if [[ ! -d ".git" ]]; then
        print_error "Git repository not initialized. Run 'git init' first."
        exit 1
    fi
    
    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        print_error "package.json not found. Are you in the project root?"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

setup_vercel() {
    print_step "Setting up Vercel deployment"
    
    if ! command -v vercel >/dev/null 2>&1; then
        print_info "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    print_info "Vercel CLI is ready"
    print_info "Next steps for Vercel:"
    echo "  1. Run 'vercel login' to authenticate"
    echo "  2. Run 'vercel' to link your project"
    echo "  3. Set up these GitHub secrets:"
    echo "     - VERCEL_TOKEN (from vercel.com/account/tokens)"
    echo "     - VERCEL_ORG_ID (from .vercel/project.json)"
    echo "     - VERCEL_PROJECT_ID (from .vercel/project.json)"
    
    print_success "Vercel setup instructions provided"
}

setup_netlify() {
    print_step "Setting up Netlify deployment"
    
    if ! command -v netlify >/dev/null 2>&1; then
        print_info "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    print_info "Netlify CLI is ready"
    print_info "Next steps for Netlify:"
    echo "  1. Run 'netlify login' to authenticate"
    echo "  2. Run 'netlify init' to create a new site"
    echo "  3. Set up these GitHub secrets:"
    echo "     - NETLIFY_AUTH_TOKEN (from app.netlify.com/user/applications)"
    echo "     - NETLIFY_SITE_ID (from site settings)"
    
    print_success "Netlify setup instructions provided"
}

setup_github_pages() {
    print_step "Setting up GitHub Pages"
    
    print_info "GitHub Pages configuration:"
    echo "  1. Go to your repository Settings > Pages"
    echo "  2. Set Source to 'GitHub Actions'"
    echo "  3. The workflow will automatically deploy to GitHub Pages"
    
    # Create .nojekyll file
    touch ".nojekyll"
    print_info "Created .nojekyll file for GitHub Pages"
    
    print_success "GitHub Pages setup completed"
}

setup_github_secrets() {
    print_step "GitHub Secrets Setup Guide"
    
    print_info "Required GitHub Repository Secrets:"
    echo ""
    echo "🔐 For Vercel deployment:"
    echo "  • VERCEL_TOKEN - Get from https://vercel.com/account/tokens"
    echo "  • VERCEL_ORG_ID - Found in .vercel/project.json after running 'vercel'"
    echo "  • VERCEL_PROJECT_ID - Found in .vercel/project.json after running 'vercel'"
    echo ""
    echo "🔐 For Netlify deployment:"
    echo "  • NETLIFY_AUTH_TOKEN - Get from https://app.netlify.com/user/applications"
    echo "  • NETLIFY_SITE_ID - Found in site settings after creating a site"
    echo ""
    echo "📝 To add secrets:"
    echo "  1. Go to your GitHub repository"
    echo "  2. Settings > Secrets and variables > Actions"
    echo "  3. Click 'New repository secret'"
    echo "  4. Add each secret with its corresponding value"
    
    print_success "GitHub secrets guide provided"
}

setup_domains() {
    print_step "Setting up custom domains"
    
    print_info "Custom domain configuration:"
    echo ""
    echo "🌐 Primary domain: raleskip.com"
    echo "📋 DNS records to configure:"
    echo ""
    echo "For Vercel (Primary):"
    echo "  • Type: CNAME, Name: www, Value: cname.vercel-dns.com"
    echo "  • Type: A, Name: @, Value: 76.76.19.61"
    echo ""
    echo "For Netlify (Backup):"
    echo "  • Type: CNAME, Name: netlify, Value: [your-site].netlify.app"
    echo ""
    echo "For GitHub Pages (Alternative):"
    echo "  • Type: CNAME, Name: github, Value: [username].github.io"
    
    # Update CNAME for GitHub Pages
    echo "raleskip.com" > "public/CNAME"
    print_info "Updated CNAME file for GitHub Pages"
    
    print_success "Domain configuration guide provided"
}

create_deployment_docs() {
    print_step "Creating deployment documentation"
    
    cat > "DEPLOYMENT-GUIDE.md" << 'EOF'
# 🚀 Raleskip Portfolio - Deployment Guide

This guide covers deploying your Raleskip Portfolio to multiple platforms.

## 🎯 Quick Start

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Set up deployment platforms
./scripts/setup-deployment.sh

# Deploy to all platforms
./scripts/deploy.sh --production
```

## 🌐 Deployment Platforms

### 1. 🚀 Vercel (Primary)
- **URL:** https://raleskip.vercel.app
- **Purpose:** Primary production deployment
- **Features:** Automatic deployments, edge functions, analytics

**Setup:**
```bash
npm install -g vercel
vercel login
vercel
```

### 2. 🌊 Netlify (Alternative)
- **URL:** https://raleskip.netlify.app
- **Purpose:** Backup deployment platform
- **Features:** Form handling, edge functions, split testing

**Setup:**
```bash
npm install -g netlify-cli
netlify login
netlify init
```

### 3. 🌐 GitHub Pages (Backup)
- **URL:** https://raleskip.github.io
- **Purpose:** GitHub-hosted backup
- **Features:** Free hosting, automatic deployments

**Setup:**
1. Go to repository Settings > Pages
2. Set source to "GitHub Actions"
3. Workflow will handle deployment

## 🔐 Required Secrets

Set these in your GitHub repository secrets:

### Vercel
- `VERCEL_TOKEN` - From https://vercel.com/account/tokens
- `VERCEL_ORG_ID` - From .vercel/project.json
- `VERCEL_PROJECT_ID` - From .vercel/project.json

### Netlify
- `NETLIFY_AUTH_TOKEN` - From https://app.netlify.com/user/applications
- `NETLIFY_SITE_ID` - From site settings

## 🔄 Automated Deployments

### Production Deployment
Triggered on push to `main` branch:
- Runs quality checks
- Builds application
- Deploys to all platforms
- Runs post-deployment verification

### Preview Deployment
Triggered on pull requests:
- Creates preview deployments
- Posts preview URLs in PR comments
- Runs quality checks

## 📊 Manual Deployment

### Build and Deploy
```bash
# Install dependencies
npm install

# Run quality checks
npm run type-check
npm run format:check

# Build application
npm run build

# Deploy to specific platform
./scripts/deploy.sh --vercel --production
./scripts/deploy.sh --netlify --production
./scripts/deploy.sh --github-pages
```

### Development Preview
```bash
# Start development server
npm run dev

# Build and preview
npm run build
npm run preview
```

## 🌐 Custom Domains

### Primary Domain: raleskip.com
Configure DNS records:

**For Vercel:**
- Type: CNAME, Name: www, Value: cname.vercel-dns.com
- Type: A, Name: @, Value: 76.76.19.61

**For Netlify:**
- Type: CNAME, Name: netlify, Value: [site].netlify.app

## 🔍 Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics: Built-in performance monitoring
- Google PageSpeed: Regular performance audits
- Bundle Analysis: Automated bundle size tracking

### Error Tracking
- Console errors logged in production
- Failed deployments trigger notifications
- Automatic fallback to backup platforms

## 🚨 Troubleshooting

### Build Failures
1. Check Node.js version (18.18.0+ required)
2. Clear cache: `npm ci`
3. Run local build: `npm run build`

### Deployment Issues
1. Verify secrets are set correctly
2. Check platform status pages
3. Review deployment logs in Actions tab

### Performance Issues
1. Run bundle analysis: `npm run build:analyze`
2. Check Core Web Vitals
3. Optimize images and assets

## 📞 Support

For deployment issues:
1. Check deployment logs in GitHub Actions
2. Review platform documentation
3. Contact platform support if needed

---

*Last updated: $(date)*
EOF

    print_success "Created DEPLOYMENT-GUIDE.md"
}

create_env_template() {
    print_step "Creating environment template"
    
    cat > ".env.template" << 'EOF'
# 🔧 Raleskip Portfolio - Environment Variables Template
# Copy this file to .env.local and fill in your values

# Build Configuration
NODE_ENV=production
VITE_APP_VERSION=2.1.0
VITE_BUILD_DATE=2025-01-23

# Site Configuration
VITE_SITE_URL=https://raleskip.vercel.app
VITE_SITE_NAME="Raleskip Portfolio - Aayush Pawar"

# Analytics (Optional)
# VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
# VITE_VERCEL_ANALYTICS_ID=your-analytics-id

# Contact Form (EmailJS)
# VITE_EMAILJS_SERVICE_ID=your-service-id
# VITE_EMAILJS_TEMPLATE_ID=your-template-id
# VITE_EMAILJS_PUBLIC_KEY=your-public-key

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CONTACT_FORM=true
VITE_ENABLE_ANIMATIONS=true

# Debug
VITE_DEBUG_MODE=false
VITE_SHOW_BUILD_INFO=false
EOF

    print_success "Created .env.template"
}

update_package_scripts() {
    print_step "Updating package.json scripts"
    
    # Backup package.json
    cp package.json package.json.backup
    
    # Update scripts using node
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    pkg.scripts = {
        ...pkg.scripts,
        'setup:deployment': './scripts/setup-deployment.sh',
        'deploy:all': './scripts/deploy.sh --production',
        'deploy:vercel': './scripts/deploy.sh --vercel --production',
        'deploy:netlify': './scripts/deploy.sh --netlify --production',
        'deploy:github': './scripts/deploy.sh --github-pages',
        'deploy:preview': './scripts/deploy.sh',
        'check:deployment': 'curl -f https://raleskip.vercel.app && echo \"✅ Deployment is live\"'
    };
    
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    "
    
    print_success "Updated package.json with deployment scripts"
}

make_scripts_executable() {
    print_step "Making scripts executable"
    
    chmod +x scripts/*.sh
    
    print_success "Made all scripts executable"
}

main() {
    print_header
    
    check_prerequisites
    setup_vercel
    setup_netlify
    setup_github_pages
    setup_github_secrets
    setup_domains
    create_deployment_docs
    create_env_template
    update_package_scripts
    make_scripts_executable
    
    echo ""
    echo -e "${PURPLE}========================================================================================${NC}"
    print_success "🎉 Deployment setup completed!"
    echo ""
    print_info "Next steps:"
    echo "  1. Set up GitHub repository secrets (see DEPLOYMENT-GUIDE.md)"
    echo "  2. Configure custom domains (see DNS configuration above)"
    echo "  3. Test deployment: ./scripts/deploy.sh --production"
    echo ""
    print_info "Available commands:"
    echo "  • npm run deploy:all      - Deploy to all platforms"
    echo "  • npm run deploy:vercel   - Deploy to Vercel only"
    echo "  • npm run deploy:netlify  - Deploy to Netlify only"
    echo "  • npm run check:deployment - Check if deployment is live"
    echo -e "${PURPLE}========================================================================================${NC}"
}

# Run main function
main "$@"