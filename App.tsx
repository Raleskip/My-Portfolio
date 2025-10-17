import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Toaster } from './components/ui/sonner'
import { toast } from 'sonner@2.0.3'
import raleskipLogo from 'figma:asset/a78476f907be19392ee6d9e24f5f23a82b9a29ea.png'

// Performance-optimized lazy loading
const Skills = lazy(() => 
  import('./components/Skills').then(module => ({ default: module.Skills }))
)
const ProfessionalJourney = lazy(() => 
  import('./components/ProfessionalJourney').then(module => ({ default: module.ProfessionalJourney }))
)
const ProjectsPage = lazy(() => 
  import('./components/ProjectsPage').then(module => ({ default: module.ProjectsPage }))
)
const ContactPage = lazy(() => 
  import('./components/ContactPage').then(module => ({ default: module.ContactPage }))
)

type Page = 'home' | 'about' | 'skills' | 'journey' | 'projects' | 'contact'

// Safe environment variables with proper fallbacks
const getEnvVar = (key: string, defaultValue: string = '') => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || defaultValue
    }
    return defaultValue
  } catch {
    return defaultValue
  }
}

const ENV = {
  siteName: getEnvVar('VITE_SITE_NAME', 'Raleskip Portfolio'),
  siteUrl: getEnvVar('VITE_SITE_URL', 'https://www.raleskip.com'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  isDevelopment: typeof window !== 'undefined' && window.location.hostname === 'localhost'
}

// Simple loading component
const PageLoader = ({ stage }: { stage?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <motion.div
      className="relative w-12 h-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 border-2 border-emerald-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 border-2 border-purple-500 border-b-transparent rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
    
    {stage && (
      <motion.p
        className="text-sm text-white/60 font-mono"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {stage}
      </motion.p>
    )}
  </div>
)

// Error Fallback Component
const ErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
    <div className="text-center max-w-md space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        
        <h2 className="text-2xl font-display font-bold">Something went wrong</h2>
        <p className="text-white/70">We encountered an unexpected error while loading your portfolio.</p>
        
        <div className="space-y-3">
          <button
            onClick={retry}
            className="neuro-btn px-6 py-3 mr-3"
          >
            Try Again
          </button>
          
          <button
            onClick={() => typeof window !== 'undefined' && window.location.reload()}
            className="neuro-btn px-6 py-3 bg-gray-700 hover:bg-gray-600"
          >
            Reload Page
          </button>
        </div>

        {ENV.isDevelopment && (
          <details className="mt-4 text-left text-xs opacity-50 max-w-sm mx-auto">
            <summary className="cursor-pointer">Technical Details</summary>
            <pre className="mt-2 whitespace-pre-wrap p-3 bg-gray-800 rounded text-xs overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  </div>
)

// Simple Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Error Boundary] Caught error:', error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} retry={this.retry} />
    }

    return this.props.children
  }
}

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState<string>('Initializing...')
  const shouldReduceMotion = useReducedMotion()

  // Enhanced SEO and Meta Management
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    document.title = `${ENV.siteName} | Digital Marketing Expert & AI Innovation Leader`
    
    // Set meta tags
    const metaTags = [
      { name: 'description', content: 'Aayush Pawar - Digital First Marketer, AI Specialist & Creative Visionary at Raleskip. 9+ years expertise in healthcare marketing, brand campaigns, and technology innovation. Currently Product Marketing Manager at Jio Platforms Limited.' },
      { name: 'keywords', content: 'Aayush Pawar, Raleskip, Digital Marketing Expert, AI Marketing, Healthcare Marketing, Product Marketing Manager, Jio Platforms, JioHealthHub, Brand Strategy, Creative Direction, Marketing Technology, UX/UI Design, Digital Innovation' },
      { name: 'author', content: 'Aayush Pawar' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'theme-color', content: '#10b981' },
      { property: 'og:title', content: 'Aayush Pawar | Digital Marketing Expert & AI Innovation Leader | Raleskip' },
      { property: 'og:description', content: 'Digital First Marketer, AI Specialist & Creative Visionary with 9+ years expertise in healthcare marketing, brand campaigns, and technology innovation at Jio Platforms Limited.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: ENV.siteUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Aayush Pawar | Digital Marketing Expert & AI Innovation Leader' },
      { name: 'version', content: ENV.appVersion },
    ]

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      
      let existingTag = document.querySelector(selector)
      
      if (existingTag) {
        existingTag.setAttribute('content', content)
      } else {
        const meta = document.createElement('meta')
        if (name) meta.name = name
        if (property) meta.setAttribute('property', property)
        meta.content = content
        document.head.appendChild(meta)
      }
    })
  }, [])

  // Loading simulation
  const loadingStages = [
    { stage: 'Initializing Raleskip Experience...', progress: 0 },
    { stage: 'Loading core assets...', progress: 20 },
    { stage: 'Preparing portfolio data...', progress: 40 },
    { stage: 'Setting up interactive elements...', progress: 60 },
    { stage: 'Optimizing performance...', progress: 80 },
    { stage: 'Welcome to Raleskip!', progress: 100 }
  ]

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark')
    }
    
    let currentStageIndex = 0
    let isActive = true
    
    const updateProgress = async () => {
      if (!isActive) return
      
      const currentStageData = loadingStages[currentStageIndex]
      const nextStageData = loadingStages[currentStageIndex + 1]
      
      setLoadingStage(currentStageData.stage)
      
      if (!nextStageData) {
        setLoadingProgress(100)
        await new Promise(resolve => setTimeout(resolve, 300))
        
        if (isActive) {
          setIsLoading(false)
          
          toast.success('Portfolio loaded successfully!', {
            description: 'Welcome to Aayush Pawar\'s digital showcase',
            duration: 3000,
          })
        }
        return
      }
      
      let currentProgress = currentStageData.progress
      
      const progressInterval = setInterval(() => {
        if (!isActive) {
          clearInterval(progressInterval)
          return
        }
        
        const progressIncrement = Math.random() * 3 + 1
        currentProgress = Math.min(currentProgress + progressIncrement, nextStageData.progress)
        
        setLoadingProgress(currentProgress)
        
        if (currentProgress >= nextStageData.progress) {
          clearInterval(progressInterval)
          currentStageIndex++
          setTimeout(updateProgress, 50)
        }
      }, 50)
    }
    
    const initTimer = setTimeout(updateProgress, 100)
    
    return () => {
      isActive = false
      clearTimeout(initTimer)
    }
  }, [])

  // Page navigation
  const handlePageChange = useCallback((page: Page) => {
    if (page === currentPage) return
    
    setCurrentPage(page)
    
    if (typeof window !== 'undefined') {
      window.history.pushState({ page }, '', `#${page}`)
      document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} - ${ENV.siteName}`
    }
  }, [currentPage])

  // Handle initial URL routing
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const hash = window.location.hash.slice(1) as Page
      const validPages: Page[] = ['home', 'about', 'skills', 'journey', 'projects', 'contact']
      
      if (validPages.includes(hash)) {
        setCurrentPage(hash)
      } else if (hash) {
        window.history.replaceState({}, '', '#home')
      }
    } catch (error) {
      console.error('[Routing] Error handling initial route:', error)
    }
  }, [])

  // Kinetic Text Component
  const KineticText = useCallback(({ 
    children, 
    className = "", 
    animation = "kinetic-glow"
  }: { 
    children: React.ReactNode, 
    className?: string, 
    animation?: string
  }) => {
    const textContent = React.Children.toArray(children).join('')
    
    if (typeof textContent !== 'string' || !textContent.trim()) {
      return <span className={className}>{children}</span>
    }

    if (shouldReduceMotion || textContent.length > 50) {
      return <span className={className}>{textContent}</span>
    }

    return (
      <span className={`${animation} ${className}`}>
        {textContent.split('').map((char, index) => (
          <span 
            key={`kinetic-char-${index}-${char === ' ' ? 'space' : char}`}
            style={{ animationDelay: `${index * 0.05}s` }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }, [shouldReduceMotion])

  // Loader
  const RaleskipLoader = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          scale: 0.95,
          filter: "blur(10px)"
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.76, 0, 0.24, 1] 
        }}
      >
        <div className="relative text-center z-20 max-w-md px-6">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative w-16 h-16 mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-purple-400"
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent border-l-cyan-400 border-b-amber-400"
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-black text-white">
              <KineticText 
                className="brand-text-dark"
                animation={shouldReduceMotion ? "" : "kinetic-neon-pulse"}
              >
                Raleskip
              </KineticText>
            </h1>
            
            <p className="text-white/70 font-body text-base leading-relaxed">
              <KineticText animation={shouldReduceMotion ? "" : "kinetic-glow"}>
                Digital Marketing Expert & AI Innovation Leader
              </KineticText>
            </p>
          </motion.div>

          <motion.div
            className="mt-10 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="w-72 h-2 neuro-inset rounded-full mx-auto overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-purple-500 to-cyan-500 rounded-full relative overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center justify-between px-4 text-sm">
              <motion.span
                className="text-white/60 font-mono"
                key={loadingStage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {loadingStage}
              </motion.span>
              <motion.span
                className="text-white/80 font-bold tabular-nums"
                animate={shouldReduceMotion ? {} : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: shouldReduceMotion ? 0 : 1, repeat: Infinity }}
              >
                {Math.round(loadingProgress)}%
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )

  // Page rendering
  const renderCurrentPage = useCallback(() => {
    const pageComponents = {
      'home': () => (
        <>
          <Hero onNavigate={handlePageChange} />
          <About />
        </>
      ),
      'about': () => <About />,
      'skills': () => (
        <Suspense fallback={<PageLoader stage="Loading expertise..." />}>
          <Skills />
        </Suspense>
      ),
      'journey': () => (
        <Suspense fallback={<PageLoader stage="Loading professional journey..." />}>
          <ProfessionalJourney />
        </Suspense>
      ),
      'projects': () => (
        <Suspense fallback={<PageLoader stage="Loading projects..." />}>
          <ProjectsPage />
        </Suspense>
      ),
      'contact': () => (
        <Suspense fallback={<PageLoader stage="Loading contact information..." />}>
          <ContactPage />
        </Suspense>
      )
    }

    try {
      return pageComponents[currentPage]?.() || pageComponents['home']()
    } catch (error) {
      console.error(`[Page Render] Error rendering ${currentPage}:`, error)
      return <ErrorFallback error={error as Error} retry={() => typeof window !== 'undefined' && window.location.reload()} />
    }
  }, [currentPage, handlePageChange])

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative font-body smooth-scroll">
        <Toaster 
          position="top-right"
          expand={true}
          richColors={true}
          closeButton={true}
          toastOptions={{
            style: {
              background: 'var(--neuro-base)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: 'var(--foreground)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            className: 'font-body',
            duration: 4000,
          }}
        />
        
        <AnimatePresence>
          {isLoading && RaleskipLoader}
        </AnimatePresence>

        {!isLoading && (
          <>
            {/* Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                animate={shouldReduceMotion ? {} : {
                  background: [
                    'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, rgba(10, 10, 10, 1) 70%)',
                    'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, rgba(10, 10, 10, 1) 70%)',
                    'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, rgba(10, 10, 10, 1) 70%)',
                  ]
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 25, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10"
            >
              <Navigation 
                currentPage={currentPage} 
                setCurrentPage={handlePageChange} 
              />
              
              <main className="relative min-h-screen" role="main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {renderCurrentPage()}
                  </motion.div>
                </AnimatePresence>
              </main>
              
              <footer className="relative overflow-hidden neuro-base mt-20 border-t border-emerald-500/20" role="contentinfo">
                <div className="absolute inset-0 gradient-mesh-dark opacity-20" />
                
                <div className="relative max-w-6xl mx-auto px-6 py-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <img 
                        src={raleskipLogo} 
                        alt="Raleskip Logo"
                        className="w-full h-full object-contain"
                        style={{
                          filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))'
                        }}
                        loading="lazy"
                        width="64"
                        height="64"
                      />
                    </motion.div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-display font-bold text-white">
                        <KineticText 
                          animation={shouldReduceMotion ? "" : "kinetic-neon-pulse"}
                          className="brand-text-dark"
                        >
                          Raleskip
                        </KineticText>
                      </h3>
                      
                      <p className="text-white/60 font-body text-base max-w-md mx-auto leading-relaxed">
                        <KineticText animation={shouldReduceMotion ? "" : "kinetic-glow"}>
                          Digital Marketing Expert • AI Innovation Leader • Creative Strategist
                        </KineticText>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-white/50 font-body">
                      <span className="neuro-flat px-4 py-2 rounded-lg">
                        <KineticText animation={shouldReduceMotion ? "" : "kinetic-glow"}>
                          © 2025 Aayush Pawar. All rights reserved.
                        </KineticText>
                      </span>
                      <span className="hidden sm:inline text-white/30">•</span>
                      <span className="neuro-flat px-4 py-2 rounded-lg">
                        <KineticText animation={shouldReduceMotion ? "" : "kinetic-glow"}>
                          v{ENV.appVersion} • Crafted with passion & precision
                        </KineticText>
                      </span>
                    </div>
                  </motion.div>
                </div>
              </footer>
            </motion.div>
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}

// Production Error Handling
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('[Global Error]:', event.error)
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Unhandled Promise Rejection]:', event.reason)
  })
}