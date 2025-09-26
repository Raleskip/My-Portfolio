# Netlify redirects for single-page applications
/*    /index.html   200

# Force HTTPS
http://raleskip.com/*    https://raleskip.com/:splat    301!
http://www.raleskip.com/*    https://www.raleskip.com/:splat    301!

# Redirect www to non-www (choose one option)
https://www.raleskip.com/*    https://raleskip.com/:splat    301!

# Security headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

# Cache static assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML with shorter duration
/*.html
  Cache-Control: public, max-age=3600

# API routes (if any)
/api/*
  Cache-Control: no-cache