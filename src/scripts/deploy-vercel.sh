#!/bin/bash

# Raleskip Portfolio - Vercel Deployment Script
# Author: Aayush Pawar
# Version: 2.0.0

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "\n${PURPLE}========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}========================================${NC}\n"
}

# Check if we're in the right directory
check_project_root() {
    if [[ ! -f "package.json" ]] || [[ ! -f "vercel.json" ]]; then
        print_error "This script must be run from the project root directory"
        print_error "Make sure package.json and vercel.json exist"
        exit 1
    fi
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking required dependencies..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [[ $NODE_VERSION -lt 18 ]]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check Vercel CLI
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI is not installed. Installing globally..."
        npm install -g vercel@latest
    fi
    
    print_success "All dependencies are available"
}

# Clean previous builds
clean_build() {
    print_status "Cleaning previous builds..."
    
    if [[ -d "dist" ]]; then
        rm -rf dist
        print_success "Removed dist directory"
    fi
    
    if [[ -d "node_modules/.vite" ]]; then
        rm -rf node_modules/.vite
        print_success "Cleared Vite cache"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Check if node_modules exists and is not empty
    if [[ ! -d "node_modules" ]] || [[ -z "$(ls -A node_modules 2>/dev/null)" ]]; then
        print_status "Installing fresh dependencies..."
        npm ci --production=false
    else
        print_status "Updating dependencies..."
        npm ci --production=false
    fi
    
    print_success "Dependencies installed successfully"
}

# Run type checking
type_check() {
    print_status "Running TypeScript type checking..."
    
    if npm run type-check; then
        print_success "TypeScript type checking passed"
    else
        print_error "TypeScript type checking failed"
        exit 1
    fi
}

# Run linting
lint_code() {
    print_status "Running ESLint..."
    
    if npm run lint; then
        print_success "Linting passed"
    else
        print_warning "Linting issues found. Attempting to fix..."
        if npm run lint:fix; then
            print_success "Linting issues fixed automatically"
        else
            print_error "Linting failed. Please fix issues manually"
            exit 1
        fi
    fi
}

# Build the project
build_project() {
    print_status "Building the project for production..."
    
    # Set production environment
    export NODE_ENV=production
    
    if npm run build; then
        print_success "Build completed successfully"
        
        # Show build size
        if [[ -d "dist" ]]; then
            BUILD_SIZE=$(du -sh dist | cut -f1)
            print_status "Build size: $BUILD_SIZE"
        fi
    else
        print_error "Build failed"
        exit 1
    fi
}

# Verify build
verify_build() {
    print_status "Verifying build output..."
    
    # Check if essential files exist
    REQUIRED_FILES=("dist/index.html" "dist/assets")
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [[ ! -e "dist/$file" ]] && [[ ! -e "$file" ]]; then
            print_error "Required build file missing: $file"
            exit 1
        fi
    done
    
    # Check index.html for basic content
    if grep -q "Raleskip" dist/index.html; then
        print_success "Build verification passed"
    else
        print_error "Build verification failed - index.html doesn't contain expected content"
        exit 1
    fi
}

# Deploy to Vercel
deploy_to_vercel() {
    print_status "Preparing deployment to Vercel..."
    
    # Check if user is logged in to Vercel
    if ! vercel whoami &> /dev/null; then
        print_status "Please log in to Vercel..."
        vercel login
    fi
    
    # Get deployment type from argument or ask user
    DEPLOYMENT_TYPE=${1:-""}
    
    if [[ -z "$DEPLOYMENT_TYPE" ]]; then
        echo -e "\n${CYAN}Select deployment type:${NC}"
        echo "1) Preview deployment (staging)"
        echo "2) Production deployment"
        echo -n "Enter your choice (1-2): "
        read -r choice
        
        case $choice in
            1)
                DEPLOYMENT_TYPE="preview"
                ;;
            2)
                DEPLOYMENT_TYPE="production"
                ;;
            *)
                print_error "Invalid choice. Defaulting to preview deployment."
                DEPLOYMENT_TYPE="preview"
                ;;
        esac
    fi
    
    print_status "Deploying to Vercel ($DEPLOYMENT_TYPE)..."
    
    if [[ "$DEPLOYMENT_TYPE" == "production" ]]; then
        # Production deployment
        if vercel --prod; then
            print_success "🚀 Production deployment completed successfully!"
            echo -e "\n${GREEN}Your portfolio is now live!${NC}"
            
            # Get the production URL
            PROD_URL=$(vercel ls | grep "raleskip-portfolio" | grep "READY" | awk '{print $2}' | head -1)
            if [[ -n "$PROD_URL" ]]; then
                echo -e "${CYAN}Production URL: https://$PROD_URL${NC}"
            fi
        else
            print_error "Production deployment failed"
            exit 1
        fi
    else
        # Preview deployment
        if vercel; then
            print_success "🚀 Preview deployment completed successfully!"
            echo -e "\n${GREEN}Your preview is ready!${NC}"
            
            # Get the preview URL
            PREVIEW_URL=$(vercel ls | grep "raleskip-portfolio" | head -1 | awk '{print $2}')
            if [[ -n "$PREVIEW_URL" ]]; then
                echo -e "${CYAN}Preview URL: https://$PREVIEW_URL${NC}"
            fi
        else
            print_error "Preview deployment failed"
            exit 1
        fi
    fi
}

# Post-deployment checks
post_deployment_checks() {
    print_status "Running post-deployment checks..."
    
    # Wait a moment for deployment to be ready
    sleep 5
    
    # Get the deployment URL
    DEPLOYMENT_URL=$(vercel ls | grep "raleskip-portfolio" | head -1 | awk '{print $2}')
    
    if [[ -n "$DEPLOYMENT_URL" ]]; then
        FULL_URL="https://$DEPLOYMENT_URL"
        
        print_status "Checking deployment at: $FULL_URL"
        
        # Check if site is accessible
        if curl -s --head "$FULL_URL" | head -1 | grep -q "200 OK"; then
            print_success "Site is accessible and responding"
        else
            print_warning "Site might not be fully ready yet. Please check manually."
        fi
        
        # Open in browser (optional)
        echo -e "\n${CYAN}Would you like to open the site in your browser? (y/n):${NC}"
        read -r open_browser
        
        if [[ "$open_browser" == "y" ]] || [[ "$open_browser" == "Y" ]]; then
            if command -v open &> /dev/null; then
                open "$FULL_URL"
            elif command -v xdg-open &> /dev/null; then
                xdg-open "$FULL_URL"
            else
                print_status "Please open $FULL_URL in your browser"
            fi
        fi
    fi
}

# Show deployment summary
show_summary() {
    print_header "DEPLOYMENT SUMMARY"
    
    echo -e "${GREEN}✅ Project built successfully${NC}"
    echo -e "${GREEN}✅ All checks passed${NC}"
    echo -e "${GREEN}✅ Deployed to Vercel${NC}"
    
    if [[ -n "$DEPLOYMENT_URL" ]]; then
        echo -e "\n${CYAN}🌐 Site URL: https://$DEPLOYMENT_URL${NC}"
    fi
    
    echo -e "\n${PURPLE}📊 Next Steps:${NC}"
    echo -e "   • Verify the site is working correctly"
    echo -e "   • Test contact form functionality"
    echo -e "   • Check mobile responsiveness"
    echo -e "   • Monitor performance metrics"
    echo -e "   • Set up custom domain (if needed)"
    
    echo -e "\n${YELLOW}🔗 Useful Links:${NC}"
    echo -e "   • Vercel Dashboard: https://vercel.com/dashboard"
    echo -e "   • Analytics: https://vercel.com/analytics"
    echo -e "   • Domain Settings: https://vercel.com/domains"
    
    print_success "Deployment completed successfully! 🎉"
}

# Cleanup function
cleanup() {
    print_status "Cleaning up temporary files..."
    # Add any cleanup tasks here if needed
}

# Main execution
main() {
    print_header "RALESKIP PORTFOLIO - VERCEL DEPLOYMENT"
    echo -e "${CYAN}Digital Marketing Expert & AI Innovation Leader${NC}"
    echo -e "${CYAN}Author: Aayush Pawar | Version: 2.0.0${NC}\n"
    
    # Trap to ensure cleanup on exit
    trap cleanup EXIT
    
    # Run all deployment steps
    check_project_root
    check_dependencies
    clean_build
    install_dependencies
    type_check
    lint_code
    build_project
    verify_build
    deploy_to_vercel "$1"
    post_deployment_checks
    show_summary
    
    print_success "🚀 Raleskip Portfolio deployment completed!"
}

# Handle script arguments
case "${1:-}" in
    "production"|"prod")
        main "production"
        ;;
    "preview"|"staging")
        main "preview"
        ;;
    "help"|"-h"|"--help")
        echo "Raleskip Portfolio - Vercel Deployment Script"
        echo ""
        echo "Usage:"
        echo "  ./scripts/deploy-vercel.sh [production|preview]"
        echo ""
        echo "Options:"
        echo "  production, prod    Deploy to production"
        echo "  preview, staging    Deploy to preview/staging"
        echo "  help, -h, --help   Show this help message"
        echo ""
        echo "If no option is provided, you'll be prompted to choose."
        ;;
    *)
        main
        ;;
esac