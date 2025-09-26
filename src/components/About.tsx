'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card } from './ui/card'
import { Brain, Rocket, Target, Zap, Sparkles, Globe, Activity, Cpu } from 'lucide-react'
import ParticleSystem, { ParticlePresets } from './ParticleSystem'
import ScrollReveal, { ScrollMorphing, TextReveal, CounterReveal } from './ScrollReveal'

export function About() {
  const features = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Leveraging machine learning and artificial intelligence to create smarter marketing solutions and predictive analytics."
    },
    {
      icon: Target,
      title: "Strategic Marketing",
      description: "Data-driven marketing strategies that combine traditional wisdom with cutting-edge digital transformation."
    },
    {
      icon: Rocket,
      title: "Future Technology",
      description: "Exploring emerging technologies like AR/VR, blockchain, and IoT to create tomorrow's marketing experiences."
    },
    {
      icon: Zap,
      title: "Performance Driven",
      description: "Optimizing every touchpoint for maximum ROI through advanced analytics and continuous experimentation."
    }
  ]

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Advanced Background with Particle System */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-950/10 to-background" />
        <ParticleSystem 
          {...ParticlePresets.ambient}
          colors={[
            'rgba(16, 185, 129, 0.4)',
            'rgba(6, 182, 212, 0.3)',
            'rgba(139, 92, 246, 0.2)',
          ]}
          className="opacity-60"
        />
      </div>
      
      {/* Morphing Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <ScrollMorphing className="text-center mb-20">
          <div className="relative">
            {/* Floating Elements Around Title */}
            <motion.div
              className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -top-4 -right-12 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              animate={{
                y: [0, 15, 0],
                rotate: [360, 0],
                scale: [1.2, 0.8, 1.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-8 relative">
              <div className="text-gradient-neon">
                <TextReveal 
                  text="About My Vision"
                  stagger={0.08}
                />
              </div>
              
              {/* Glowing underline */}
              <motion.div
                className="absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                initial={{ width: 0, x: '-50%' }}
                whileInView={{ width: '60%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ScrollReveal direction="fade" delay={0.5}>
                <div className="text-xl text-white/80 leading-relaxed font-body">
                  At the intersection of{' '}
                  <motion.span 
                    className="text-emerald-400 font-semibold relative inline-block"
                    whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(16, 185, 129, 0.8)' }}
                  >
                    marketing
                    <motion.div
                      className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span>
                  ,{' '}
                  <motion.span 
                    className="text-cyan-400 font-semibold relative inline-block"
                    whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(6, 182, 212, 0.8)' }}
                  >
                    technology
                    <motion.div
                      className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.span>
                  , and{' '}
                  <motion.span 
                    className="text-purple-400 font-semibold relative inline-block"
                    whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(139, 92, 246, 0.8)' }}
                  >
                    artificial intelligence
                    <motion.div
                      className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </motion.span>
                  {' '}lies the future of human connection. I'm exploring this frontier to create 
                  experiences that are not just effective, but{' '}
                  <motion.span 
                    className="text-gradient-neon font-bold relative inline-block"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    transformative
                  </motion.span>.
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollMorphing>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.2}
              className="h-full"
            >
              <motion.div
                className="interactive-card p-8 h-full relative overflow-hidden group perspective-card"
                whileHover={{
                  rotateY: 5,
                  rotateX: 2,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Card Background Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-xl"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05))',
                      'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))',
                      'linear-gradient(225deg, rgba(139, 92, 246, 0.05), rgba(16, 185, 129, 0.05))',
                      'linear-gradient(315deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05))',
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 3 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
                
                {/* Enhanced Header */}
                <motion.div
                  className="flex items-center mb-6 relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="relative p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 mr-6 border border-emerald-400/30"
                    whileHover={{
                      rotateY: 180,
                      boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)',
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Orbital rings around icon */}
                    <motion.div
                      className="absolute inset-0 border border-emerald-400/20 rounded-2xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-2 border border-cyan-400/20 rounded-xl"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <feature.icon className="w-8 h-8 text-emerald-400 relative z-10" />
                    </motion.div>
                  </motion.div>
                  
                  <div>
                    <div className="text-2xl font-display font-bold mb-2 text-white">
                      <TextReveal 
                        text={feature.title}
                        stagger={0.05}
                      />
                    </div>
                    
                    {/* Dynamic subtitle */}
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
                
                {/* Enhanced Description */}
                <div className="relative z-10">
                  <ScrollReveal direction="fade" delay={0.3}>
                    <span className="text-white/75 leading-relaxed text-lg font-body block">
                      {feature.description}
                    </span>
                  </ScrollReveal>
                </div>
                
                {/* Interactive Corner Element */}
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Stats Section with Advanced Animations */}
        <ScrollReveal direction="scale" delay={0.2}>
          <div className="relative">
            {/* Neural Network Background */}
            <div className="absolute inset-0 pointer-events-none">
              <ParticleSystem 
                {...ParticlePresets.neural}
                count={24}
                className="opacity-30"
              />
            </div>
            
            {/* Stats Header */}
            <motion.div className="text-center mb-12">
              <div className="text-3xl lg:text-4xl font-display font-bold text-gradient-neon mb-4">
                <TextReveal 
                  text="Impact & Innovation"
                  stagger={0.06}
                />
              </div>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {[
                { number: "9+", label: "Years of Innovation", icon: Rocket, color: "emerald" },
                { number: "500M+", label: "Users Impacted", icon: Globe, color: "cyan" },
                { number: "30+", label: "Major Projects", icon: Target, color: "purple" },
                { number: "∞", label: "Possibilities Ahead", icon: Sparkles, color: "pink" }
              ].map((stat, index) => (
                <ScrollMorphing
                  key={stat.label}
                  delay={index * 0.15}
                  className="text-center group"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Glowing Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/10 to-${stat.color}-400/5 rounded-2xl blur-xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      className="relative mb-4 flex justify-center"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <div className={`p-3 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-400/30`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                      </div>
                    </motion.div>
                    
                    {/* Number */}
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold font-display mb-3 relative"
                      whileHover={{
                        textShadow: `0 0 20px rgba(16, 185, 129, 0.8)`,
                      }}
                    >
                      <span className={`text-gradient-neon bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent`}>
                        {stat.number}
                      </span>
                      
                      {/* Pulsing ring */}
                      <motion.div
                        className={`absolute inset-0 border-2 border-${stat.color}-400/30 rounded-lg opacity-0 group-hover:opacity-100`}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <div className="text-white/70 font-body font-medium text-sm lg:text-base">
                      <TextReveal 
                        text={stat.label}
                        stagger={0.03}
                        delay={0.5}
                      />
                    </div>
                    
                    {/* Interactive particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {Array.from({ length: 4 }, (_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-${stat.color}-400 rounded-full`}
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          animate={{
                            x: Math.cos(i * 90 * Math.PI / 180) * 30,
                            y: Math.sin(i * 90 * Math.PI / 180) * 30,
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </ScrollMorphing>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}