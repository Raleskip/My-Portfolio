'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'

import { Button } from './ui/button'
import { ArrowRight, Sparkles, Mail, Eye, Brain, Cpu, Code, Activity, Rocket, TrendingUp } from 'lucide-react'
import { useRef, useEffect, useState, useCallback } from 'react'
import aayushPhoto from 'figma:asset/f768bb506045584da1daa65ca55661ab3701d060.png'

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTitle, setCurrentTitle] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacityRange = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Bold title sequence with emerald focus
  const titleSequence = [
    {
      primary: "Digital First",
      secondary: "Marketer",
      color: "from-emerald-400 to-cyan-500",
      icon: Code,
      description: "Transforming brands through cutting-edge digital strategies"
    },
    {
      primary: "Design Thinking",
      secondary: "Expert", 
      color: "from-orange-400 to-yellow-500",
      icon: Sparkles,
      description: "Human-centered solutions through innovative design processes"
    },
    {
      primary: "Raconteur",
      secondary: "& Storyteller", 
      color: "from-emerald-500 to-teal-400",
      icon: Brain,
      description: "Crafting compelling narratives that drive engagement"
    },
    {
      primary: "AI Researcher",
      secondary: "& Innovator",
      color: "from-cyan-400 to-blue-500", 
      icon: Cpu,
      description: "Pioneering the future of artificial intelligence"
    }
  ]

  // Slower title cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titleSequence.length)
    }, 10000) // Very slow 10 second intervals
    return () => clearInterval(interval)
  }, [titleSequence.length])

  const currentTitleData = titleSequence[currentTitle]

  // Button handlers
  const handleContactClick = useCallback(() => {
    if (onNavigate) {
      onNavigate('contact')
    } else {
      // Fallback: scroll to contact section or open email
      window.location.href = 'mailto:hello@raleskip.com?subject=Let\'s Create Magic Together!&body=Hi Aayush,%0D%0A%0D%0AI\'d love to discuss a potential collaboration opportunity.%0D%0A%0D%0ABest regards'
    }
  }, [onNavigate])

  const handleExploreClick = useCallback(() => {
    if (onNavigate) {
      onNavigate('projects')
    } else {
      // Fallback: scroll to projects section
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [onNavigate])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Clean Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Minimal Gradient Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 50% 50% at 30% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 80%), radial-gradient(ellipse 40% 40% at 70% 30%, rgba(6, 182, 212, 0.06) 0%, transparent 80%)',
              'radial-gradient(ellipse 40% 40% at 70% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 80%), radial-gradient(ellipse 50% 50% at 20% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 80%)',
              'radial-gradient(ellipse 50% 50% at 20% 30%, rgba(6, 182, 212, 0.08) 0%, transparent 80%), radial-gradient(ellipse 40% 40% at 80% 70%, rgba(16, 185, 129, 0.06) 0%, transparent 80%)'
            ]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
        style={{ y: contentY, opacity: opacityRange }}
      >


        {/* Professional Photo - User Friendly Size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-16"
        >
          <div className="relative w-36 h-36 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 p-1">
                <img 
                  src={aayushPhoto} 
                  alt="Aayush Pawar"
                  className="w-full h-full object-cover rounded-full border border-emerald-400/20"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full border-2 border-black flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Clean Title Sequence */}
        <motion.div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.5 }}
              className="space-y-6"
            >
              {/* Primary Title - Human Readable */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight">
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTitleData.color}`}>
                  {currentTitleData.primary}
                </div>
              </h1>

              {/* Secondary Title - Balanced Size */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white/85 mt-2">
                {currentTitleData.secondary}
              </h2>

              {/* Icon - Proportioned */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-r ${currentTitleData.color} shadow-lg border border-white/10`}>
                  <currentTitleData.icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Description - Readable */}
              <p className="text-lg lg:text-xl text-white/75 max-w-2xl mx-auto font-body font-medium leading-relaxed">
                {currentTitleData.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Name Section - User Friendly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
            <div className="text-xl lg:text-2xl font-display font-bold text-white">
              Aayush Pawar
            </div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <div className="text-sm text-emerald-300 font-semibold">
              Raleskip Founder
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Balanced & Readable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {[
            { 
              label: "Years of Innovation", 
              value: "8+", 
              icon: Rocket,
              color: "text-emerald-400"
            },
            { 
              label: "Users Impacted", 
              value: "500M+", 
              icon: TrendingUp,
              color: "text-cyan-400"
            },
            { 
              label: "Project Experience", 
              value: "30+", 
              icon: Brain,
              color: "text-yellow-400"
            },
            { 
              label: "Mobile Apps/WebApps", 
              value: "20+", 
              icon: Code,
              color: "text-orange-400"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 text-center rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 1 }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                borderColor: 'rgba(16, 185, 129, 0.2)'
              }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
              <div className={`text-2xl lg:text-3xl font-display font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm text-white/60 font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action Buttons - User Friendly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              size="lg" 
              onClick={handleContactClick}
              className="px-8 py-4 text-base font-display font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-0 rounded-xl shadow-lg hover:shadow-emerald-500/20"
            >
              <Mail className="w-5 h-5 mr-2" />
              Let's Create Magic
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleExploreClick}
              className="px-8 py-4 text-base font-display font-semibold border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400 rounded-xl"
            >
              <Eye className="w-5 h-5 mr-2" />
              Explore Portfolio
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}