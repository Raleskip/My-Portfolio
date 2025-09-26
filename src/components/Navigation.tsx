'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  Home, 
  User, 
  Brain, 
  Briefcase, 
  FolderOpen, 
  Mail, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Activity,
  Cpu
} from 'lucide-react'
import raleskipLogo from 'figma:asset/a78476f907be19392ee6d9e24f5f23a82b9a29ea.png'

type Page = 'home' | 'about' | 'skills' | 'journey' | 'projects' | 'contact'

interface NavigationProps {
  currentPage: Page
  setCurrentPage: (page: Page) => void
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  
  // Advanced scroll effects
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(10, 10, 10, 0.95)']
  )
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.3])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      description: 'Welcome to Raleskip' 
    },
    { 
      id: 'about', 
      label: 'About', 
      icon: User, 
      description: 'Know the Visionary' 
    },
    { 
      id: 'skills', 
      label: 'Expertise', 
      icon: Brain, 
      description: 'Core Competencies' 
    },
    { 
      id: 'journey', 
      label: 'Journey', 
      icon: Briefcase, 
      description: 'Professional Path' 
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: FolderOpen, 
      description: 'Innovation Showcase' 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: Mail, 
      description: 'Get in Touch' 
    }
  ]

  const handleNavigation = (pageId: Page) => {
    setCurrentPage(pageId)
    setIsMenuOpen(false)
  }

  // Optimized Kinetic Typography Helper for better performance
  const KineticText = useCallback(({ children, className = "", effect = "glow" }: { 
    children: string, 
    className?: string,
    effect?: "glow" | "shimmer" | "pulse" | "wave"
  }) => {
    const effectClass = {
      glow: 'kinetic-glow',
      shimmer: 'quantum-shimmer',
      pulse: 'neural-pulse',
      wave: 'energy-wave'
    }[effect]
    
    // Performance optimization: disable complex animations on mobile or for long text
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    if (isMobile || children.length > 20) {
      return <span className={`${effectClass} ${className}`}>{children}</span>
    }
    
    return (
      <span className={`${effectClass} ${className}`}>
        {children}
      </span>
    )
  }, [])

  return (
    <>
      {/* Advanced Navigation Bar with Morphing Effects */}
      <motion.header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
        style={{
          background: backgroundColor,
          backdropFilter: `blur(${backdropBlur}px)`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Morphing Border */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, 
              rgba(16, 185, 129, ${borderOpacity.get()}) 0%, 
              rgba(6, 182, 212, ${borderOpacity.get()}) 50%, 
              rgba(139, 92, 246, ${borderOpacity.get()}) 100%)`,
            height: '2px',
            bottom: 0,
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400/40 to-cyan-400/40 rounded-full"
              style={{
                left: `${(i * 8.33) + 10}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 4 + (i * 0.3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Neural Network Background */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20"
          animate={isHovered ? {
            opacity: [0.2, 0.4, 0.2],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.circle
                key={i}
                cx={12.5 * i + 12.5}
                cy="10"
                r="0.8"
                fill="rgba(16, 185, 129, 0.6)"
                animate={{
                  r: [0.5, 1.2, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <motion.line
                key={`line-${i}`}
                x1={12.5 * i + 12.5}
                y1="10"
                x2={12.5 * (i + 1) + 12.5}
                y2="10"
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="0.3"
                animate={{
                  opacity: [0, 0.6, 0],
                  strokeWidth: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </svg>
        </motion.div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Optimized Logo Section for better mobile performance */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group relative"
              onClick={() => handleNavigation('home')}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Simplified Logo Container for Mobile */}
              <div className="relative">
                {/* Reduced rings for mobile performance */}
                <motion.div
                  className="hidden sm:block absolute inset-0 w-16 h-16 rounded-full border border-emerald-400/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Core */}
                <motion.div
                  className="hidden sm:block absolute inset-2 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Logo */}
                <motion.img 
                  src={raleskipLogo} 
                  alt="Raleskip" 
                  className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 0 6px rgba(16, 185, 129, 0.3))'
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                {/* Simplified floating elements for mobile */}
                <motion.div
                  className="hidden sm:block absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  animate={{
                    y: [0, -6, 0],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    y: { duration: 2, repeat: Infinity },
                    scale: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  <Zap className="w-1 h-1 sm:w-2 sm:h-2 text-white" />
                </motion.div>
              </div>
              
              <div className="hidden md:block relative">
                <motion.h1 
                  className="text-base sm:text-lg font-display font-bold relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <KineticText className="text-gradient-neon" effect="shimmer">
                    Raleskip
                  </KineticText>
                  
                  {/* Glowing underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.h1>
                
                <motion.p 
                  className="text-xs text-white/60 font-body font-medium relative"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <KineticText effect="pulse">Digital Innovation Studio</KineticText>
                </motion.p>
              </div>
            </motion.div>

            {/* Optimized Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as Page)}
                  className={`
                    group relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden
                    ${currentPage === item.id 
                      ? 'nav-link-active text-emerald-400' 
                      : 'text-white/70 hover:text-white'
                    }
                  `}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {/* Simplified Background */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: currentPage === item.id 
                        ? 'rgba(16, 185, 129, 0.15)' 
                        : 'rgba(16, 185, 129, 0.08)'
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <span className="flex items-center gap-2 relative z-10">
                    <motion.div
                      animate={currentPage === item.id ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 2, 
                        repeat: currentPage === item.id ? Infinity : 0
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <KineticText>
                      {item.label}
                    </KineticText>
                  </span>

                  {/* Simple Active Indicator */}
                  {currentPage === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Simplified Tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 border border-emerald-500/30 rounded-lg text-xs font-medium text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-l border-t border-emerald-500/30 rotate-45" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden neuro-btn p-3 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Optimized Menu Panel for mobile */}
            <motion.div
              className="absolute top-16 sm:top-20 left-2 right-2 sm:left-4 sm:right-4 neuro-base p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-500/20 max-h-[calc(100vh-120px)] overflow-y-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30
              }}
            >
              {/* Mobile Header */}
              <motion.div
                className="flex items-center justify-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-purple-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={raleskipLogo} 
                  alt="Raleskip"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full mr-2 sm:mr-3"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                />
                <h2 className="text-base sm:text-lg font-display font-bold text-gradient-neon">
                  <KineticText>Raleskip</KineticText>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id as Page)}
                    className={`
                      group p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-300 relative overflow-hidden
                      ${currentPage === item.id 
                        ? 'nav-link-active text-purple-400' 
                        : 'neuro-flat hover:neuro-floating text-white/80 hover:text-white'
                      }
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">
                        <KineticText>{item.label}</KineticText>
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-body leading-tight">
                      {item.description}
                    </p>

                    {/* Active Indicator for Mobile */}
                    {currentPage === item.id && (
                      <motion.div
                        className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={false}
                    >
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Action Section */}
              <motion.div
                className="mt-4 sm:mt-6 pt-3 sm:pt-6 border-t border-purple-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <span className="text-xs sm:text-sm text-white/70 font-body">
                    <KineticText>Ready to innovate together?</KineticText>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Indicator (Right Side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
        <div className="space-y-4">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.id as Page)}
              className="group relative block"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === item.id 
                    ? 'bg-purple-400 shadow-lg shadow-purple-400/50 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                animate={currentPage === item.id ? {
                  boxShadow: [
                    "0 0 10px rgba(139,92,246,0.5)",
                    "0 0 20px rgba(139,92,246,0.8)",
                    "0 0 10px rgba(139,92,246,0.5)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Tooltip */}
              <motion.div
                className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 neuro-flat text-xs text-white font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap"
                initial={false}
              >
                {item.label}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  )
}