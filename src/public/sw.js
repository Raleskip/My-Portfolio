const CACHE_NAME = 'raleskip-portfolio-v1.0.0'
const OFFLINE_URL = '/offline.html'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// Assets to cache immediately on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add critical CSS and JS files
  '/assets/index.css',
  '/assets/index.js'
]

// Cache strategies for different types of resources
const CACHE_STRATEGIES = {
  // Cache first for static assets (images, fonts, icons)
  CACHE_FIRST: [
    /^https:\/\/fonts\.googleapis\.com\/.*/,
    /^https:\/\/fonts\.gstatic\.com\/.*/,
    /\.(?:png|jpg|jpeg|svg|webp|gif|ico|woff|woff2|ttf|otf)$/,
    /\/icons\//,
    /\/screenshots\//
  ],
  
  // Network first for API calls and dynamic content
  NETWORK_FIRST: [
    /\/api\//,
    /^https:\/\/.*\.supabase\.co\/.*/,
    /^https:\/\/.*analytics.*\/.*/
  ],
  
  // Stale while revalidate for HTML and app shell
  STALE_WHILE_REVALIDATE: [
    /\.(?:html|htm)$/,
    /\/$/,
    /\/#.*/
  ]
}

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  // Only handle HTTP/HTTPS requests
  if (!event.request.url.startsWith('http')) return
  
  // Skip requests with non-GET methods
  if (event.request.method !== 'GET') return
  
  const url = event.request.url
  const request = event.request
  
  // Determine cache strategy
  let strategy = 'NETWORK_ONLY' // default
  
  for (const [strategyName, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pattern.test(url))) {
      strategy = strategyName
      break
    }
  }
  
  // Apply the determined strategy
  switch (strategy) {
    case 'CACHE_FIRST':
      event.respondWith(cacheFirstStrategy(request))
      break
      
    case 'NETWORK_FIRST':
      event.respondWith(networkFirstStrategy(request))
      break
      
    case 'STALE_WHILE_REVALIDATE':
      event.respondWith(staleWhileRevalidateStrategy(request))
      break
      
    default:
      // Network only - don't cache
      break
  }
})

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      // Check if cache is expired
      const cacheTime = await getCacheTime(request.url)
      if (cacheTime && (Date.now() - cacheTime < CACHE_DURATION)) {
        console.log('[SW] Cache hit (cache first):', request.url)
        return cachedResponse
      }
    }
    
    // Fetch from network
    console.log('[SW] Fetching from network (cache first):', request.url)
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache the response
      const responseToCache = networkResponse.clone()
      await cache.put(request, responseToCache)
      await setCacheTime(request.url, Date.now())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, serving from cache:', request.url)
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    return cachedResponse || createOfflineResponse()
  }
}

// Network First Strategy - for dynamic content
async function networkFirstStrategy(request) {
  try {
    console.log('[SW] Fetching from network (network first):', request.url)
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME)
      const responseToCache = networkResponse.clone()
      await cache.put(request, responseToCache)
      await setCacheTime(request.url, Date.now())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, serving from cache:', request.url)
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    return cachedResponse || createOfflineResponse()
  }
}

// Stale While Revalidate Strategy - for app shell
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME)
  
  // Serve from cache immediately if available
  const cachedResponse = await cache.match(request)
  
  // Fetch from network in background to update cache
  const networkResponsePromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
        setCacheTime(request.url, Date.now())
      }
      return networkResponse
    })
    .catch(error => {
      console.log('[SW] Background fetch failed:', request.url, error)
    })
  
  if (cachedResponse) {
    console.log('[SW] Serving from cache, updating in background:', request.url)
    return cachedResponse
  } else {
    console.log('[SW] No cache, waiting for network:', request.url)
    try {
      return await networkResponsePromise
    } catch (error) {
      return createOfflineResponse()
    }
  }
}

// Offline response creator
function createOfflineResponse() {
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Raleskip Portfolio</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: white; min-height: 100vh; display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 20px;
        }
        .offline-container { max-width: 400px; }
        .offline-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.7; }
        h1 { font-size: 1.5rem; margin-bottom: 1rem; color: #10b981; }
        p { margin-bottom: 2rem; opacity: 0.8; line-height: 1.6; }
        button {
          background: linear-gradient(135deg, #10b981, #06b6d4); 
          border: none; padding: 12px 24px; border-radius: 8px; 
          color: white; font-weight: 600; cursor: pointer; transition: transform 0.2s;
        }
        button:hover { transform: scale(1.05); }
        .features { margin-top: 2rem; text-align: left; }
        .feature { display: flex; align-items: center; margin: 0.5rem 0; opacity: 0.7; }
        .feature::before { content: "✓"; margin-right: 0.5rem; color: #10b981; }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">🌐</div>
        <h1>You're Offline</h1>
        <p>Don't worry! Some content from Raleskip Portfolio has been saved for offline viewing.</p>
        <button onclick="window.location.reload()">Try Again</button>
        <div class="features">
          <div class="feature">Cached pages available</div>
          <div class="feature">Portfolio content saved</div>
          <div class="feature">Will sync when online</div>
        </div>
      </div>
    </body>
    </html>`,
    {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      }
    }
  )
}

// Cache time management
async function getCacheTime(url) {
  try {
    const timeCache = await caches.open(`${CACHE_NAME}-timestamps`)
    const response = await timeCache.match(url)
    if (response) {
      const timestamp = await response.text()
      return parseInt(timestamp, 10)
    }
  } catch (error) {
    console.error('[SW] Error getting cache time:', error)
  }
  return null
}

async function setCacheTime(url, timestamp) {
  try {
    const timeCache = await caches.open(`${CACHE_NAME}-timestamps`)
    await timeCache.put(url, new Response(timestamp.toString()))
  } catch (error) {
    console.error('[SW] Error setting cache time:', error)
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered')
    event.waitUntil(handleBackgroundSync())
  }
})

async function handleBackgroundSync() {
  // Handle any queued offline actions
  try {
    console.log('[SW] Performing background sync operations')
    // Implement specific sync logic here
    // e.g., send queued analytics events, contact form submissions, etc.
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('[SW] Push message received')
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Raleskip Portfolio',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icons/explore-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Raleskip Portfolio', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click received')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('https://www.raleskip.com')
    )
  }
})

// Message handling for client communication
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data)
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting()
        break
        
      case 'GET_VERSION':
        event.ports[0].postMessage({
          version: CACHE_NAME,
          timestamp: Date.now()
        })
        break
        
      case 'CLEAR_CACHE':
        clearAllCaches()
        break
        
      default:
        console.log('[SW] Unknown message type:', event.data.type)
    }
  }
})

// Clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
    console.log('[SW] All caches cleared')
  } catch (error) {
    console.error('[SW] Error clearing caches:', error)
  }
}

// Periodic cache cleanup
setInterval(async () => {
  try {
    const cache = await caches.open(CACHE_NAME)
    const requests = await cache.keys()
    
    for (const request of requests) {
      const cacheTime = await getCacheTime(request.url)
      if (cacheTime && (Date.now() - cacheTime > CACHE_DURATION)) {
        console.log('[SW] Removing expired cache entry:', request.url)
        await cache.delete(request)
      }
    }
  } catch (error) {
    console.error('[SW] Error during cache cleanup:', error)
  }
}, 60 * 60 * 1000) // Run every hour

console.log('[SW] Service worker loaded successfully')