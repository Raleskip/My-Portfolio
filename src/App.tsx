import React, { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Toaster } from './components/ui/sonner'
import { toast } from 'sonner@2.0.3'
import raleskipLogo from 'figma:asset/a78476f907be19392ee6d9e24f5f23a82b9a29ea.png'

// Optimized lazy loading with simpler error handling
const Skills = lazy(() => 
  import('./components/Skills').then(module => ({ default: module.Skills }))
    .catch(() => ({ 
      default: () => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 text-white/60">
            <h3 className="text-2xl font-display font-semibold mb-4">Skills Section Loading...</h3>
            <p className="text-lg">Please wait a moment.</p>
          </div>
        </div>
      )
    }))
)

const ProfessionalJourney = lazy(() => 
  import('./components/ProfessionalJourney').then(module => ({ default: module.ProfessionalJourney }))
    .catch(() => ({ 
      default: () => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 text-white/60">
            <h3 className="text-2xl font-display font-semibold mb-4">Journey Section Loading...</h3>
            <p className="text-lg">Please wait a moment.</p>
          </div>
        </div>
      )
    }))
)

const ProjectsPage = lazy(() => 
  import('./components/ProjectsPage').then(module => ({ default: module.ProjectsPage }))
    .catch(() => ({ 
      default: () => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 text-white/60">
            <h3 className="text-2xl font-display font-semibold mb-4">Projects Section Loading...</h3>
            <p className="text-lg">Please wait a moment.</p>
          </div>
        </div>
      )
    }))
)

const ContactPage = lazy(() => 
  import('./components/ContactPageEnhanced').then(module => ({ default: module.ContactPageEnhanced }))
    .catch(() => ({ 
      default: () => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 text-white/60">
            <h3 className="text-2xl font-display font-semibold mb-4">Contact Section Loading...</h3>
            <p className="text-lg">Please wait a moment.</p>
          </div>
        </div>
      )
    }))
)

type Page = 'home' | 'about' | 'skills' | 'journey' | 'projects' | 'contact'

// Simplified environment configuration
const getEnvConfig = () => {
  const isClient = typeof window !== 'undefined'
  const hostname = isClient ? window.location.hostname : ''
  
  return {
    siteName: 'Raleskip Portfolio - Aayush Pawar',
    siteUrl: isClient ? window.location.origin : 'https://raleskip.github.io',
    appVersion: '2.1.0',
    isDevelopment: hostname === 'localhost' || hostname.includes('127.0.0.1'),
    isProduction: !hostname.includes('localhost') && !hostname.includes('127.0.0.1'),
  }
}

// Streamlined loading component
const PageLoader = React.memo(({ stage }: { stage?: string }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-8 py-16">
      <motion.div
        className="relative w-16 h-16"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      >
        <motion.div
          className="absolute inset-0 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: shouldReduceMotion ? 0 : 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {stage && (
        <motion.p
          className="text-lg text-white/90 font-display font-medium text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
        >
          {stage}
        </motion.p>
      )}
    </div>
  )
})

// Simplified error boundary
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
    console.error('[Error Boundary]:', error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
          <div className="text-center max-w-lg space-y-6">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-3xl font-display font-bold">Something went wrong</h2>
            <p className="text-white/80 text-lg leading-relaxed">
              We encountered an error. Please try refreshing the page.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.retry}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main App Component - Optimized for GitHub deployment
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Simplified scroll spy
  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return

    const sections = ['home', 'about', 'skills', 'journey', 'projects', 'contact']
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentPage(sections[i] as Page)
          break
        }
      }
    }

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [isLoading])

  const ENV = getEnvConfig()

  // Simplified SEO setup
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    document.title = `${ENV.siteName} | Digital Marketing Expert & AI Innovation Leader`
    
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = name
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    setMeta('description', 'Aayush Pawar - Digital First Marketer, AI Specialist & Creative Visionary at Raleskip with 9+ years expertise in healthcare marketing and technology innovation.')
    setMeta('keywords', 'Aayush Pawar, Raleskip, Digital Marketing, AI Marketing, Healthcare Marketing, Product Marketing Manager, Jio Platforms')
    setMeta('author', 'Aayush Pawar')
    setMeta('theme-color', '#10b981')

  }, [ENV.siteName])

  // Simplified loading sequence
  useEffect(() => {
    // Set dark mode
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark')
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsInitialized(true)
      
      setTimeout(() => {
        toast.success('Welcome to Raleskip', {
          description: 'Portfolio loaded successfully',
          duration: 2000,
        })
      }, 500)
    }, 1500) // Faster loading
    
    return () => clearTimeout(timer)
  }, [])

  // Simplified error handling
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleError = (event: ErrorEvent) => {
      console.error('[Global Error]:', event.error)
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('[Promise Rejection]:', event.reason)
      // Prevent unnecessary error logging for clipboard and network issues
      if (event.reason?.message?.includes('Clipboard') || event.reason?.message?.includes('fetch')) {
        event.preventDefault()
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  // Simplified navigation
  const handlePageChange = useCallback((page: Page) => {
    if (typeof window !== 'undefined') {
      const sectionId = page === 'home' ? 'home' : page
      const targetElement = document.getElementById(sectionId)
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        
        setCurrentPage(page)
      }
    }
  }, [])

  // Handle initial routing
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleInitialRoute = () => {
      const hash = window.location.hash.slice(1) as Page
      const validPages: Page[] = ['home', 'about', 'skills', 'journey', 'projects', 'contact']
      
      if (validPages.includes(hash)) {
        setCurrentPage(hash)
        setTimeout(() => {
          const targetElement = document.getElementById(hash === 'home' ? 'home' : hash)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 1000)
      }
    }
    
    handleInitialRoute()
  }, [])

  // Optimized loader
  const RaleskipLoader = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center z-20 max-w-lg mx-auto px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative w-20 h-20 mx-auto">
              <motion.div
                className="absolute inset-0 rounded-full border border-emerald-500/30"
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: shouldReduceMotion ? 0 : 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 w-3 h-3 bg-emerald-400 rounded-full"
                animate={shouldReduceMotion ? {} : { 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-display font-black text-white">
              Raleskip
            </h1>
            
            <p className="text-white/70 font-body text-lg">
              Digital Marketing Expert & AI Innovation Leader
            </p>
          </motion.div>

          <motion.div
            className="mt-8 text-sm text-white/40 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            v{ENV.appVersion} • Loading Portfolio
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )

  // Optimized page renderer
  const renderPortfolio = () => (
    <div className="relative">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="w-full container-spacious">
          <Hero onNavigate={handlePageChange} />
        </div>
      </section>
      
      {/* Section Dividers */}
      <div className="h-20 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-display font-bold text-white mb-4">
              About Aayush
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
          </div>
          <About />
        </div>
      </section>
      
      <div className="h-20 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-display font-bold text-white mb-4">
              Expertise & Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <Suspense fallback={<PageLoader stage="Loading expertise..." />}>
            <Skills />
          </Suspense>
        </div>
      </section>
      
      <div className="h-20 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      {/* Journey Section */}
      <section id="journey" className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-display font-bold text-white mb-4">
              Professional Journey
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 mx-auto rounded-full" />
          </div>
          <Suspense fallback={<PageLoader stage="Loading journey..." />}>
            <ProfessionalJourney />
          </Suspense>
        </div>
      </section>
      
      <div className="h-20 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-display font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-auto rounded-full" />
          </div>
          <Suspense fallback={<PageLoader stage="Loading projects..." />}>
            <ProjectsPage />
          </Suspense>
        </div>
      </section>
      
      <div className="h-20 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-display font-bold text-white mb-4">
              Let's Connect
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          <Suspense fallback={<PageLoader stage="Loading contact..." />}>
            <ContactPage />
          </Suspense>
        </div>
      </section>
    </div>
  )

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Toaster */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: 'rgba(10, 10, 10, 0.9)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: 'white',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            },
            duration: 3000,
          }}
        />
        
        {/* Loading Screen */}
        {isLoading && RaleskipLoader}

        {/* Main Content */}
        {!isLoading && isInitialized && (
          <>
            {/* Background */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
              {!shouldReduceMotion && (
                <motion.div 
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'radial-gradient(ellipse at 30% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)',
                      'radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
                      'radial-gradient(ellipse at 40% 60%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
            
            {/* Navigation */}
            <Navigation currentPage={currentPage} setCurrentPage={handlePageChange} />
            
            {/* Main Content */}
            <main className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {renderPortfolio()}
              </motion.div>
            </main>
            
            {/* Footer */}
            <footer className="relative py-20 mt-20">
              <div className="max-w-6xl mx-auto px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-black/40 border border-emerald-500/20 flex items-center justify-center">
                    <img 
                      src={raleskipLogo} 
                      alt="Raleskip Logo"
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-display font-bold text-white">
                      Raleskip
                    </h3>
                    
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                      Digital Marketing Expert • AI Innovation Leader • Creative Strategist
                    </p>
                    
                    <p className="text-white/50">
                      Currently Product Marketing Manager at Jio Platforms Limited
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/50 text-sm">
                    <span>© 2025 Aayush Pawar. All rights reserved.</span>
                    <span className="hidden sm:inline">•</span>
                    <span>v{ENV.appVersion} • Made with passion</span>
                  </div>
                </motion.div>
              </div>
            </footer>
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}