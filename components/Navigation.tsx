'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
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
  ArrowRight
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  // Kinetic Typography Helper
  const KineticText = ({ children, className = "" }: { children: string, className?: string }) => {
    return (
      <span className={`kinetic-glow ${className}`}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ animationDelay: `${index * 0.03}s` }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'neuro-base backdrop-blur-xl border-b-2 border-emerald-500/30' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Circular Logo Section */}
            <motion.div
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => handleNavigation('home')}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Clean Logo - No Outline */}
              <motion.img 
                src={raleskipLogo} 
                alt="Raleskip" 
                className="w-16 h-16 object-contain rounded-full"
                style={{
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              
              <div className="hidden md:block">
                <motion.h1 
                  className="text-lg font-display font-bold"
                  whileHover={{ scale: 1.05 }}
                >
                  <KineticText className="text-gradient-neon">
                    Raleskip
                  </KineticText>
                </motion.h1>
                <p className="text-xs text-white/60 font-body font-medium">
                  Digital Innovation Studio
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as Page)}
                  className={`
                    group relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300
                    ${currentPage === item.id 
                      ? 'nav-link-active text-emerald-400' 
                      : 'text-white/70 hover:text-white neuro-flat hover:neuro-floating'
                    }
                  `}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: currentPage !== item.id ? "0 8px 20px rgba(16, 185, 129, 0.2)" : undefined
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <KineticText>{item.label}</KineticText>
                  </span>

                  {/* Active Indicator */}
                  {currentPage === item.id && (
                    <motion.div
                      className="absolute -bottom-2 left-1/2 w-2 h-2 bg-emerald-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover Tooltip */}
                  <motion.div
                    className="absolute top-full mt-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/95 border-2 border-emerald-500/40 rounded-xl text-sm font-semibold text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-10"
                    initial={false}
                  >
                    {item.description}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-l border-t border-emerald-500/40 rotate-45" />
                  </motion.div>
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

            {/* Menu Panel */}
            <motion.div
              className="absolute top-20 left-4 right-4 neuro-base p-6 rounded-2xl border border-purple-500/20"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                staggerChildren: 0.05
              }}
            >
              {/* Clean Logo in Mobile Menu - No Outline */}
              <motion.div
                className="flex items-center justify-center mb-6 pb-4 border-b border-purple-500/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={raleskipLogo} 
                  alt="Raleskip"
                  className="w-16 h-16 object-contain rounded-full mr-3"
                  style={{
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                />
                <h2 className="text-lg font-display font-bold text-gradient-neon">
                  <KineticText>Raleskip</KineticText>
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id as Page)}
                    className={`
                      group p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden
                      ${currentPage === item.id 
                        ? 'nav-link-active text-purple-400' 
                        : 'neuro-flat hover:neuro-floating text-white/80 hover:text-white'
                      }
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">
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
                className="mt-6 pt-6 border-t border-purple-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white/70 font-body">
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