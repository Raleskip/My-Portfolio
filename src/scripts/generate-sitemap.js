#!/usr/bin/env node

// 🗺️ Raleskip Portfolio - Sitemap Generator
// Generates XML sitemap for better SEO

const fs = require('fs');
const path = require('path');

const siteUrl = 'https://raleskip.vercel.app';
const today = new Date().toISOString().split('T')[0];

const pages = [
  {
    loc: '/',
    lastmod: today,
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    loc: '/#about',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    loc: '/#skills',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/#journey',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/#projects',
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    loc: '/#contact',
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.7'
  }
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

const generateRobots = () => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# Disallow common non-content paths
Disallow: /api/
Disallow: /_next/
Disallow: /.well-known/
Disallow: /assets/
Disallow: /dist/

# Allow crawling of main portfolio sections
Allow: /#about
Allow: /#skills
Allow: /#journey
Allow: /#projects
Allow: /#contact

# Crawl delay (optional)
Crawl-delay: 1`;
};

// Ensure dist and public directories exist
const distDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(distDir) && !fs.existsSync(publicDir)) {
  console.error('❌ Neither dist nor public directory found');
  process.exit(1);
}

try {
  // Generate sitemap
  const sitemapContent = generateSitemap();
  const robotsContent = generateRobots();

  // Write to dist directory if it exists (production build)
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
    console.log('✅ Generated sitemap.xml and robots.txt in dist/');
  }

  // Also write to public directory for development
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
    if (!fs.existsSync(path.join(publicDir, 'robots.txt'))) {
      fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
    }
    console.log('✅ Generated sitemap.xml in public/');
  }

  console.log(`📊 Generated sitemap with ${pages.length} pages`);
  console.log(`🌐 Site URL: ${siteUrl}`);
  
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}