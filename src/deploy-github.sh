#!/bin/bash

# GitHub Pages Deployment Script for Raleskip Portfolio
# Author: Aayush Pawar
# Version: 2.1.0

set -e

echo "🚀 Starting GitHub Pages deployment for Raleskip Portfolio..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    print_error "Git is not installed or not in PATH"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed or not in PATH"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
MIN_NODE_VERSION="18.0.0"

version_compare() {
    printf '%s\n%s\n' "$1" "$2" | sort -V | head -n1
}

if [ "$(version_compare "$NODE_VERSION" "$MIN_NODE_VERSION")" != "$MIN_NODE_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION is too old. Minimum required: $MIN_NODE_VERSION"
    exit 1
fi

print_success "Node.js version $NODE_VERSION meets requirements"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache/ 2>/dev/null || true

# Install dependencies
print_status "Installing dependencies..."
npm ci --prefer-offline --no-audit

# Run type checking
print_status "Running type checks..."
npm run type-check

# Build the project
print_status "Building project for production..."
export NODE_ENV=production
export VITE_APP_VERSION=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
export VITE_BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

npm run build

# Verify build output
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

if [ ! -f "dist/index.html" ]; then
    print_error "Build failed - index.html not found in dist"
    exit 1
fi

print_success "Build completed successfully"

# Check if gh-pages branch exists
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
    print_status "gh-pages branch exists"
else
    print_status "Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout main
fi

# Deploy to GitHub Pages
print_status "Deploying to GitHub Pages..."

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
cp -r dist/* "$TEMP_DIR/"

# Add CNAME file if needed (uncomment and modify if you have a custom domain)
# echo "your-domain.com" > "$TEMP_DIR/CNAME"

# Add .nojekyll file to bypass Jekyll processing
touch "$TEMP_DIR/.nojekyll"

# Create 404.html for client-side routing
cp "$TEMP_DIR/index.html" "$TEMP_DIR/404.html"

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Switch to gh-pages branch
git checkout gh-pages

# Remove old files (keep .git directory)
find . -maxdepth 1 -not -name '.git' -not -name '.' -exec rm -rf {} +

# Copy new files
cp -r "$TEMP_DIR"/* .

# Add deployment info
cat > README.md << EOF
# Raleskip Portfolio - GitHub Pages Deployment

This branch contains the production build of the Raleskip Portfolio.

- **Deployed on**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
- **Commit**: $(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
- **Version**: 2.1.0

**Live Site**: [Raleskip Portfolio](https://raleskip.github.io/raleskip-portfolio/)

---

This is an automated deployment. Do not edit files in this branch directly.
EOF

# Commit and push
git add -A
git commit -m "Deploy Raleskip Portfolio - $(date -u +"%Y-%m-%d %H:%M:%S UTC")" || {
    print_warning "No changes to deploy"
    git checkout "$CURRENT_BRANCH"
    rm -rf "$TEMP_DIR"
    exit 0
}

# Push to GitHub
print_status "Pushing to GitHub Pages..."
git push origin gh-pages

# Return to original branch
git checkout "$CURRENT_BRANCH"

# Clean up
rm -rf "$TEMP_DIR"

print_success "Deployment completed successfully!"
print_status "Your site should be available at: https://$(git config --get remote.origin.url | sed 's/.*\/\([^\/]*\)\/\([^\/]*\)\.git/\1.github.io\/\2/')"
print_status "Note: It may take a few minutes for GitHub Pages to update."

# Optional: Open the site in browser (uncomment if desired)
# if command -v open &> /dev/null; then
#     open "https://$(git config --get remote.origin.url | sed 's/.*\/\([^\/]*\)\/\([^\/]*\)\.git/\1.github.io\/\2/')"
# elif command -v xdg-open &> /dev/null; then
#     xdg-open "https://$(git config --get remote.origin.url | sed 's/.*\/\([^\/]*\)\/\([^\/]*\)\.git/\1.github.io\/\2/')"
# fi

print_success "🎉 Raleskip Portfolio deployment complete!"