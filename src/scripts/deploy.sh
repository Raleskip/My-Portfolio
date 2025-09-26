#!/bin/bash

# 🚀 Raleskip Portfolio - Universal Deployment Script
# Deploys to multiple platforms with comprehensive checks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Raleskip Portfolio"
BUILD_DIR="dist"
NODE_VERSION="18.18.0"
NPM_VERSION="9.8.1"

# Functions
print_header() {
    echo -e "${PURPLE}========================================================================================${NC}"
    echo -e "${PURPLE}🚀 $PROJECT_NAME - Deployment Script${NC}"
    echo -e "${PURPLE}========================================================================================${NC}"
}

print_step() {
    echo -e "${BLUE}📋 Step: $1${NC}"
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
    
    # Check Node.js version
    if command -v node >/dev/null 2>&1; then
        NODE_CURRENT=$(node --version | sed 's/v//')
        print_info "Node.js version: $NODE_CURRENT"
        if [[ "$NODE_CURRENT" < "$NODE_VERSION" ]]; then
            print_warning "Node.js version $NODE_VERSION or higher recommended"
        fi
    else
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check npm version
    if command -v npm >/dev/null 2>&1; then
        NPM_CURRENT=$(npm --version)
        print_info "npm version: $NPM_CURRENT"
    else
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check if we're in the right directory
    if [[ ! -f "package.json" ]]; then
        print_error "package.json not found. Run this script from the project root."
        exit 1
    fi
    
    print_success "Prerequisites check completed"
}

install_dependencies() {
    print_step "Installing dependencies"
    
    if [[ -f "package-lock.json" ]]; then
        npm ci --prefer-offline --no-audit
    else
        npm install
    fi
    
    print_success "Dependencies installed"
}

run_quality_checks() {
    print_step "Running quality checks"
    
    # Type checking
    print_info "Running TypeScript type checking..."
    npm run type-check
    
    # Code formatting
    print_info "Checking code formatting..."
    npm run format:check || {
        print_warning "Code formatting issues found. Auto-fixing..."
        npm run format
    }
    
    # Security audit
    print_info "Running security audit..."
    npm run audit:security || print_warning "Security audit found issues"
    
    print_success "Quality checks completed"
}

build_application() {
    print_step "Building application"
    
    # Clean previous build
    if [[ -d "$BUILD_DIR" ]]; then
        rm -rf "$BUILD_DIR"
        print_info "Cleaned previous build"
    fi
    
    # Build
    npm run build
    
    # Verify build
    if [[ ! -d "$BUILD_DIR" ]]; then
        print_error "Build failed - no build directory found"
        exit 1
    fi
    
    # Build analysis
    print_info "Build analysis:"
    echo "📊 Build size: $(du -sh $BUILD_DIR | cut -f1)"
    echo "📄 Files created: $(find $BUILD_DIR -type f | wc -l)"
    
    # Check for critical files
    if [[ ! -f "$BUILD_DIR/index.html" ]]; then
        print_error "Critical file missing: index.html"
        exit 1
    fi
    
    print_success "Application built successfully"
}

test_build() {
    print_step "Testing build"
    
    # Start preview server in background
    npm run preview &
    PREVIEW_PID=$!
    
    # Wait for server to start
    sleep 10
    
    # Test if server is responding
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        print_success "Build test passed"
    else
        print_error "Build test failed - server not responding"
        kill $PREVIEW_PID 2>/dev/null || true
        exit 1
    fi
    
    # Clean up
    kill $PREVIEW_PID 2>/dev/null || true
}

deploy_vercel() {
    print_step "Deploying to Vercel"
    
    if command -v vercel >/dev/null 2>&1; then
        if [[ "$1" == "production" ]]; then
            vercel --prod --confirm
        else
            vercel --confirm
        fi
        print_success "Deployed to Vercel"
    else
        print_warning "Vercel CLI not installed. Skipping Vercel deployment."
        print_info "Install with: npm i -g vercel"
    fi
}

deploy_netlify() {
    print_step "Deploying to Netlify"
    
    if command -v netlify >/dev/null 2>&1; then
        if [[ "$1" == "production" ]]; then
            netlify deploy --prod --dir="$BUILD_DIR"
        else
            netlify deploy --dir="$BUILD_DIR"
        fi
        print_success "Deployed to Netlify"
    else
        print_warning "Netlify CLI not installed. Skipping Netlify deployment."
        print_info "Install with: npm i -g netlify-cli"
    fi
}

deploy_github_pages() {
    print_step "Preparing for GitHub Pages deployment"
    
    # Create CNAME file for custom domain
    echo "raleskip.com" > "$BUILD_DIR/CNAME"
    
    print_info "CNAME file created for GitHub Pages"
    print_info "Push the '$BUILD_DIR' directory to the 'gh-pages' branch to deploy"
    
    if command -v gh >/dev/null 2>&1; then
        print_info "You can use: gh workflow run deploy.yml"
    fi
}

generate_deployment_summary() {
    print_step "Generating deployment summary"
    
    cat > deployment-summary.md << EOF
# 🚀 Raleskip Portfolio - Deployment Summary

**Deployment Date:** $(date)
**Build Size:** $(du -sh $BUILD_DIR | cut -f1)
**Files Generated:** $(find $BUILD_DIR -type f | wc -l)
**Node.js Version:** $(node --version)
**npm Version:** $(npm --version)

## 🌐 Deployment URLs

- 🚀 **Vercel (Primary):** https://raleskip.vercel.app
- 🌐 **GitHub Pages:** https://raleskip.github.io
- 🌊 **Netlify:** https://raleskip.netlify.app

## 📊 Build Analysis

\`\`\`
$(ls -la $BUILD_DIR)
\`\`\`

## 🔍 Bundle Analysis

**JavaScript Files:**
$(find $BUILD_DIR -name "*.js" -exec ls -lh {} \;)

**CSS Files:**
$(find $BUILD_DIR -name "*.css" -exec ls -lh {} \;)

---
*Generated by Raleskip Portfolio Deployment Script*
EOF
    
    print_success "Deployment summary created: deployment-summary.md"
}

cleanup() {
    print_step "Cleaning up"
    
    # Kill any remaining processes
    pkill -f "vite preview" 2>/dev/null || true
    
    print_success "Cleanup completed"
}

main() {
    # Handle script arguments
    DEPLOYMENT_TYPE="preview"
    PLATFORM="all"
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -p|--production)
                DEPLOYMENT_TYPE="production"
                shift
                ;;
            --vercel)
                PLATFORM="vercel"
                shift
                ;;
            --netlify)
                PLATFORM="netlify"
                shift
                ;;
            --github-pages)
                PLATFORM="github-pages"
                shift
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  -p, --production    Deploy to production"
                echo "  --vercel           Deploy only to Vercel"
                echo "  --netlify          Deploy only to Netlify"
                echo "  --github-pages     Prepare for GitHub Pages"
                echo "  -h, --help         Show this help"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Trap to ensure cleanup on exit
    trap cleanup EXIT
    
    # Main deployment flow
    print_header
    
    check_prerequisites
    install_dependencies
    run_quality_checks
    build_application
    test_build
    
    # Deploy to specified platforms
    case $PLATFORM in
        vercel)
            deploy_vercel "$DEPLOYMENT_TYPE"
            ;;
        netlify)
            deploy_netlify "$DEPLOYMENT_TYPE"
            ;;
        github-pages)
            deploy_github_pages
            ;;
        all)
            deploy_vercel "$DEPLOYMENT_TYPE"
            deploy_netlify "$DEPLOYMENT_TYPE"
            deploy_github_pages
            ;;
    esac
    
    generate_deployment_summary
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo -e "${PURPLE}========================================================================================${NC}"
    echo -e "${GREEN}🚀 Vercel: https://raleskip.vercel.app${NC}"
    echo -e "${BLUE}🌐 GitHub Pages: https://raleskip.github.io${NC}"
    echo -e "${CYAN}🌊 Netlify: https://raleskip.netlify.app${NC}"
    echo -e "${PURPLE}========================================================================================${NC}"
}

# Run main function
main "$@"