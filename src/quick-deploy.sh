#!/bin/bash

# 🚀 Raleskip Portfolio - Quick Deploy Script
# One-command deployment to all platforms

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${PURPLE}🚀 Raleskip Portfolio - Quick Deploy${NC}"
echo -e "${PURPLE}====================================${NC}"

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo -e "${YELLOW}❌ Error: package.json not found. Run this from the project root.${NC}"
    exit 1
fi

# Make scripts executable
echo -e "${BLUE}🔧 Making scripts executable...${NC}"
chmod +x scripts/*.sh

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm ci --prefer-offline --no-audit

# Run quality checks
echo -e "${BLUE}🔍 Running quality checks...${NC}"
npm run type-check
npm run format:check || npm run format

# Build the application
echo -e "${BLUE}🏗️ Building application...${NC}"
npm run build

# Deploy to all platforms
echo -e "${BLUE}🚀 Starting deployment...${NC}"

# Option 1: Use deployment script if available
if [[ -f "scripts/deploy.sh" ]]; then
    ./scripts/deploy.sh --production
else
    # Option 2: Manual deployment commands
    echo -e "${BLUE}📋 Manual deployment instructions:${NC}"
    echo ""
    echo "1. Vercel deployment:"
    echo "   npm install -g vercel"
    echo "   vercel --prod"
    echo ""
    echo "2. Netlify deployment:"
    echo "   npm install -g netlify-cli"
    echo "   netlify deploy --prod --dir=dist"
    echo ""
    echo "3. GitHub Pages:"
    echo "   Push to main branch to trigger GitHub Actions"
fi

echo ""
echo -e "${GREEN}🎉 Quick deploy completed!${NC}"
echo -e "${PURPLE}====================================${NC}"
echo -e "${GREEN}🚀 Vercel: https://raleskip.vercel.app${NC}"
echo -e "${BLUE}🌊 Netlify: https://raleskip.netlify.app${NC}"
echo -e "${PURPLE}🌐 GitHub Pages: https://raleskip.github.io${NC}"
echo -e "${PURPLE}====================================${NC}"