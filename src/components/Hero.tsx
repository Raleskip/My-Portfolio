'use client'

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowRight, Mail, Eye } from 'lucide-react'
import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import aayushPhoto from 'figma:asset/f768bb506045584da1daa65ca55661ab3701d060.png'
import cosmicGif from 'figma:asset/448c38470bc4d86f60b681b68a450460d4afcdb5.png'

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentTitle, setCurrentTitle] = useState(0)
  
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Enhanced scroll transforms with more dynamic effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacityRange = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scaleRange = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const blurRange = useTransform(scrollYProgress, [0, 1], [0, 3])

  // Simple title sequence - clean and focused
  const titleSequence = [
    {
      primary: "Digital First",
      secondary: "Marketer",
      color: "from-emerald-400 to-cyan-500",
      description: "Transforming brands through cutting-edge digital strategies"
    },
    {
      primary: "AI Innovation",
      secondary: "Leader", 
      color: "from-cyan-400 to-blue-500",
      description: "Pioneering the future of artificial intelligence"
    },
    {
      primary: "Creative",
      secondary: "Strategist", 
      color: "from-emerald-500 to-teal-400",
      description: "Crafting compelling narratives that drive engagement"
    }
  ]

  // Slower title cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titleSequence.length)
    }, 8000) // 8 second intervals
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      
      {/* Clean Cosmic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Primary Cosmic Scene Background */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Ultra High-Quality Cosmic Video Background */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                filter: [
                  'brightness(0.25) contrast(1.3) saturate(1.4)',
                  'brightness(0.3) contrast(1.35) saturate(1.5)',
                  'brightness(0.27) contrast(1.32) saturate(1.45)',
                  'brightness(0.25) contrast(1.3) saturate(1.4)',
                ],
                transform: [
                  'translateZ(0) scale(1.02)',
                  'translateZ(0) scale(1.04)',
                  'translateZ(0) scale(1.03)',
                  'translateZ(0) scale(1.02)',
                ]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.33, 0.66, 1]
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                controlsList="nodownload"
                className="cosmic-video-cover absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: 'inherit',
                  transform: 'inherit',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backfaceVisibility: 'hidden',
                  willChange: 'filter, transform',
                }}
                onLoadedData={() => {
                  console.info('🌌 Cosmic video loaded successfully')
                }}
                onCanPlay={() => {
                  console.info('🌌 Cosmic video ready to play')
                }}
                onError={(e) => {
                  console.info('🌌 Video error, using fallback cosmic background')
                  // Show fallback background element
                  const fallback = e.currentTarget.parentElement?.parentElement?.querySelector('.cosmic-video-fallback')
                  if (fallback) {
                    (fallback as HTMLElement).style.display = 'block'
                  }
                  e.currentTarget.style.display = 'none'
                }}
                onStalled={() => {
                  console.info('🌌 Video stalled, checking fallback')
                }}
              >
                <source src={cosmicGif} type="video/mp4" />
                {/* Multiple format support - try common video formats */}
                <source src={cosmicGif.replace('.png', '.webm')} type="video/webm" />
                <source src={cosmicGif.replace('.png', '.mov')} type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Fallback Background Image */}
            <motion.div
              className="cosmic-video-fallback absolute inset-0"
              style={{
                display: 'none',
                backgroundImage: `url(${cosmicGif})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.25) contrast(1.3) saturate(1.4)',
                transform: 'translateZ(0) scale(1.02)',
                backfaceVisibility: 'hidden',
                willChange: 'filter, transform',
              }}
              animate={{
                filter: [
                  'brightness(0.25) contrast(1.3) saturate(1.4)',
                  'brightness(0.3) contrast(1.35) saturate(1.5)',
                  'brightness(0.27) contrast(1.32) saturate(1.45)',
                  'brightness(0.25) contrast(1.3) saturate(1.4)',
                ],
                transform: [
                  'translateZ(0) scale(1.02)',
                  'translateZ(0) scale(1.04)',
                  'translateZ(0) scale(1.03)',
                  'translateZ(0) scale(1.02)',
                ]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.33, 0.66, 1]
              }}
            />
          </motion.div>

          {/* Professional Black Overlay System */}
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>
      </motion.div>

      {/* Main Content with Responsive Design */}
      <motion.div 
        className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6"
        style={{ 
          y: contentY, 
          opacity: opacityRange,
          scale: scaleRange,
          filter: `blur(${blurRange}px)`,
        }}
      >
        {/* Clean Content Background */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-sm rounded-3xl border border-white/10"
          animate={{
            background: [
              'rgba(0, 0, 0, 0.2)',
              'rgba(16, 185, 129, 0.05)',
              'rgba(6, 182, 212, 0.05)',
              'rgba(0, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255, 255, 255, 0.1)',
              'rgba(16, 185, 129, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgba(255, 255, 255, 0.1)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 p-[15px] mx-[15px] my-[0px]">
          {/* Professional Opening Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <motion.div
              className="inline-block px-6 py-3 rounded-full bg-black/40 border border-emerald-500/30 backdrop-blur-sm mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-emerald-300 font-display font-semibold text-sm tracking-wide cosmic-text-enhance">
                  Welcome to the Future of AI
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Professional Photo - Clean Version */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-12 sm:mb-16 relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto group">
              {/* Simple Glow System */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(16, 185, 129, 0.4)',
                    '0 0 0 12px rgba(16, 185, 129, 0.1)',
                    '0 0 0 24px rgba(6, 182, 212, 0.05)',
                    '0 0 0 0 rgba(16, 185, 129, 0.4)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Photo Container with Clean Effects */}
              <motion.div 
                className="absolute inset-2 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 p-1 backdrop-blur-sm"
                whileHover={{
                  background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.4), rgba(6, 182, 212, 0.4))',
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 p-1">
                  <motion.img 
                    src={aayushPhoto} 
                    alt="Aayush Pawar - Digital Marketing Expert & AI Innovation Leader"
                    className="w-full h-full object-cover rounded-full border-2 border-emerald-400/30 shadow-2xl"
                    style={{
                      imageRendering: 'high-quality',
                      filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',
                    }}
                    whileHover={{
                      scale: 1.1,
                      filter: 'brightness(1.15) contrast(1.2) saturate(1.2)',
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Responsive Title Sequence */}
          <motion.div className="mb-12 sm:mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTitle}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 1.05 }}
                transition={{ 
                  duration: 1.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Primary Title - Responsive */}
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight"
                  whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth > 768 ? 1.02 : 1 }}
                >
                  <motion.div 
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTitleData.color} relative`}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    {currentTitleData.primary}
                  </motion.div>
                </motion.h1>

                {/* Secondary Title - Responsive */}
                <motion.h2 
                  className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white/85 mt-2"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 20, rotateX: -90 },
                      visible: { opacity: 1, y: 0, rotateX: 0 }
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.1,
                      color: '#06b6d4',
                      textShadow: '0 0 15px rgba(6, 182, 212, 0.6)',
                    }}
                  >
                    {currentTitleData.secondary}
                  </motion.span>
                </motion.h2>

                {/* Clean Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="max-w-2xl mx-auto"
                >
                  <motion.p 
                    className="text-lg lg:text-xl text-white/75 font-body font-medium leading-relaxed"
                    initial="hidden"
                    animate="visible"
                  >
                    {currentTitleData.description.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        className="inline-block mr-1"
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.3
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Clean Name Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mb-12 relative"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-black/50 border border-emerald-500/30 backdrop-blur-md shadow-2xl relative z-10">
              <div className="text-xl lg:text-2xl font-display font-bold text-white text-elegant-bold">
                Aayush Pawar
              </div>
              <motion.div 
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="text-sm text-emerald-300 font-semibold text-refined-medium">
                Raleskip Founder
              </div>
            </div>
          </motion.div>

          {/* Clean Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto relative"
          >
            {[
              { 
                label: "Years of Innovation", 
                value: "9+", 
                color: "text-emerald-400",
                bgColor: "from-emerald-400/10 to-emerald-600/5",
                borderColor: "border-emerald-400/20"
              },
              { 
                label: "Users Impacted", 
                value: "500M+", 
                color: "text-cyan-400",
                bgColor: "from-cyan-400/10 to-cyan-600/5",
                borderColor: "border-cyan-400/20"
              },
              { 
                label: "Projects Delivered", 
                value: "30+", 
                color: "text-yellow-400",
                bgColor: "from-yellow-400/10 to-yellow-600/5",
                borderColor: "border-yellow-400/20"
              },
              { 
                label: "Mobile Apps/WebApps", 
                value: "25+", 
                color: "text-orange-400",
                bgColor: "from-orange-400/10 to-orange-600/5",
                borderColor: "border-orange-400/20"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`relative p-8 text-center rounded-2xl bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} backdrop-blur-md shadow-2xl overflow-hidden group`}
                initial={{ opacity: 0, y: 20, rotateY: 45 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 1.4 + index * 0.15, duration: 1, type: "spring" }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 5,
                  boxShadow: `0 20px 40px rgba(${
                    stat.color.includes('emerald') ? '16, 185, 129' :
                    stat.color.includes('cyan') ? '6, 182, 212' :
                    stat.color.includes('yellow') ? '245, 158, 11' :
                    '249, 115, 22'
                  }, 0.3)`
                }}
              >
                {/* Enhanced Typography */}
                <motion.div 
                  className={`text-3xl lg:text-4xl font-display font-black ${stat.color} mb-2 text-elegant-bold`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm lg:text-base text-white/70 font-body font-medium text-refined-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Clean CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.8, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA with Clean Effects */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div
                className="relative overflow-hidden rounded-xl"
                whileHover={{
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.5)',
                }}
              >
                <Button 
                  size="lg" 
                  onClick={handleContactClick}
                  className="px-10 py-5 text-base font-display font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-black border-0 rounded-xl shadow-2xl relative z-10 overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div 
                    className="flex items-center gap-3 relative z-10"
                    animate={{
                      x: [0, 2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Mail className="w-5 h-5" />
                    </motion.div>
                    <span>Let's Create Magic</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              {/* Clean border container */}
              <motion.div
                className="absolute inset-0 rounded-xl p-0.5"
                animate={{
                  background: [
                    'linear-gradient(0deg, rgba(16, 185, 129, 0.5), rgba(6, 182, 212, 0.5))',
                    'linear-gradient(90deg, rgba(6, 182, 212, 0.5), rgba(139, 92, 246, 0.5))',
                    'linear-gradient(180deg, rgba(139, 92, 246, 0.5), rgba(16, 185, 129, 0.5))',
                    'linear-gradient(270deg, rgba(16, 185, 129, 0.5), rgba(6, 182, 212, 0.5))',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-full h-full bg-black rounded-xl" />
              </motion.div>
              
              <Button 
                variant="ghost"
                size="lg"
                onClick={handleExploreClick}
                className="px-10 py-5 text-base font-display font-bold text-emerald-400 border-0 rounded-xl relative z-10 bg-transparent hover:bg-emerald-500/10 transition-colors duration-300"
              >
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{
                    textShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360] 
                    }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity },
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.div>
                  <span>Explore Portfolio</span>
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Clean Vision Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.2 }}
            className="mt-20 relative"
          >
            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
              <motion.p
                className="text-xl lg:text-2xl font-body font-medium leading-relaxed text-white/90 body-elegant"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1.5 }}
              >
                At the intersection of marketing, technology, and artificial intelligence lies the future of human connection. 
                I'm exploring this frontier to create experiences that are not just effective, but{' '}
                <motion.span
                  className="font-display font-bold text-emerald-300 text-elegant-bold"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(16, 185, 129, 0.6)',
                      '0 0 20px rgba(16, 185, 129, 0.8)',
                      '0 0 30px rgba(16, 185, 129, 1)',
                      '0 0 20px rgba(16, 185, 129, 0.8)',
                      '0 0 10px rgba(16, 185, 129, 0.6)'
                    ],
                    color: [
                      '#10b981',
                      '#34d399',
                      '#6ee7b7',
                      '#34d399',
                      '#10b981'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: '0 0 25px rgba(16, 185, 129, 1)',
                    color: '#6ee7b7'
                  }}
                >
                  transformative
                </motion.span>
                .
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}