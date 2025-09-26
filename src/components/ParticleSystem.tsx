'use client'

import React, { useMemo, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ParticleSystemProps {
  count?: number
  colors?: string[]
  size?: 'sm' | 'md' | 'lg'
  density?: 'low' | 'medium' | 'high'
  speed?: 'slow' | 'medium' | 'fast'
  interactive?: boolean
  pattern?: 'random' | 'grid' | 'spiral' | 'neural'
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  color: string
  direction: number
  velocity: number
}

const PARTICLE_CONFIGS = {
  size: {
    sm: { min: 1, max: 3 },
    md: { min: 2, max: 5 },
    lg: { min: 3, max: 7 }
  },
  density: {
    low: 20,
    medium: 50,
    high: 100
  },
  speed: {
    slow: { min: 15, max: 25 },
    medium: { min: 8, max: 15 },
    fast: { min: 4, max: 10 }
  }
}

const DEFAULT_COLORS = [
  'rgba(16, 185, 129, 0.6)',   // emerald
  'rgba(6, 182, 212, 0.6)',    // cyan
  'rgba(139, 92, 246, 0.6)',   // purple
  'rgba(236, 72, 153, 0.6)',   // pink
  'rgba(245, 158, 11, 0.6)',   // amber
]

export function ParticleSystem({
  count,
  colors = DEFAULT_COLORS,
  size = 'md',
  density = 'medium',
  speed = 'medium',
  interactive = false,
  pattern = 'random',
  className = ''
}: ParticleSystemProps) {
  const shouldReduceMotion = useReducedMotion()
  
  // Calculate particle count based on density if not explicitly provided
  const particleCount = count || PARTICLE_CONFIGS.density[density]
  
  // Generate particles based on pattern
  const particles = useMemo(() => {
    const generateParticle = (index: number): Particle => {
      const sizeConfig = PARTICLE_CONFIGS.size[size]
      const speedConfig = PARTICLE_CONFIGS.speed[speed]
      
      let x: number, y: number
      
      switch (pattern) {
        case 'grid':
          const cols = Math.ceil(Math.sqrt(particleCount))
          const rows = Math.ceil(particleCount / cols)
          x = ((index % cols) / cols) * 100
          y = (Math.floor(index / cols) / rows) * 100
          break
          
        case 'spiral':
          const angle = index * 0.5
          const radius = (index / particleCount) * 40
          x = 50 + Math.cos(angle) * radius
          y = 50 + Math.sin(angle) * radius
          break
          
        case 'neural':
          // Create network-like positions
          const nodeIndex = index % 12
          const layerIndex = Math.floor(index / 12)
          x = 20 + (nodeIndex % 4) * 20 + Math.random() * 10
          y = 20 + layerIndex * 25 + Math.random() * 10
          break
          
        case 'random':
        default:
          x = Math.random() * 100
          y = Math.random() * 100
          break
      }
      
      return {
        id: index,
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
        size: Math.random() * (sizeConfig.max - sizeConfig.min) + sizeConfig.min,
        opacity: Math.random() * 0.6 + 0.3,
        duration: Math.random() * (speedConfig.max - speedConfig.min) + speedConfig.min,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        direction: Math.random() * 360,
        velocity: Math.random() * 2 + 1
      }
    }
    
    return Array.from({ length: particleCount }, (_, i) => generateParticle(i))
  }, [particleCount, size, speed, pattern, colors])
  
  // Particle animation variants
  const getParticleAnimation = useCallback((particle: Particle) => {
    if (shouldReduceMotion) {
      return {
        opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
      }
    }
    
    const baseAnimation = {
      y: [0, -30, 0],
      x: [0, Math.sin(particle.direction) * 20, 0],
      opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
      scale: [particle.size, particle.size * 1.5, particle.size],
      rotate: [0, 360],
    }
    
    // Add pattern-specific animations
    switch (pattern) {
      case 'spiral':
        return {
          ...baseAnimation,
          rotate: [0, particle.direction + 360],
          x: [0, Math.cos(particle.id * 0.5) * 15, 0],
          y: [0, Math.sin(particle.id * 0.5) * 15, 0],
        }
        
      case 'neural':
        return {
          ...baseAnimation,
          opacity: [particle.opacity, 1, particle.opacity * 0.2, particle.opacity],
          scale: [particle.size, particle.size * 2, particle.size * 0.5, particle.size],
        }
        
      default:
        return baseAnimation
    }
  }, [shouldReduceMotion, pattern])
  
  // Interactive particle effects
  const handleParticleInteraction = useCallback((particleId: number) => {
    if (!interactive) return
    
    // Add ripple effect or particle burst
    console.log(`Particle ${particleId} interacted`)
  }, [interactive])
  
  if (shouldReduceMotion && pattern !== 'grid') {
    return null
  }
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Main particle layer */}
      <div className="relative w-full h-full">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${interactive ? 'cursor-pointer pointer-events-auto' : ''}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            animate={getParticleAnimation(particle)}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            onClick={() => handleParticleInteraction(particle.id)}
            whileHover={interactive ? {
              scale: particle.size * 2,
              opacity: 1,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            } : undefined}
          />
        ))}
      </div>
      
      {/* Neural network connections for neural pattern */}
      {pattern === 'neural' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {particles.slice(0, -1).map((particle, index) => {
            const nextParticle = particles[index + 1]
            if (!nextParticle) return null
            
            return (
              <motion.line
                key={`connection-${particle.id}`}
                x1={`${particle.x}%`}
                y1={`${particle.y}%`}
                x2={`${nextParticle.x}%`}
                y2={`${nextParticle.y}%`}
                stroke={particle.color}
                strokeWidth="0.5"
                opacity="0.3"
                animate={shouldReduceMotion ? {} : {
                  opacity: [0.1, 0.6, 0.1],
                  strokeWidth: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: particle.duration * 1.5,
                  repeat: Infinity,
                  delay: particle.delay + 1,
                }}
              />
            )
          })}
        </svg>
      )}
      
      {/* Ambient glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={shouldReduceMotion ? {} : {
          background: [
            `radial-gradient(ellipse at center, ${colors[0]}10 0%, transparent 60%)`,
            `radial-gradient(ellipse at center, ${colors[1]}10 0%, transparent 60%)`,
            `radial-gradient(ellipse at center, ${colors[2]}10 0%, transparent 60%)`,
            `radial-gradient(ellipse at center, ${colors[0]}10 0%, transparent 60%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// Preset configurations for easy use
export const ParticlePresets = {
  ambient: {
    density: 'low' as const,
    speed: 'slow' as const,
    size: 'sm' as const,
    pattern: 'random' as const,
  },
  energetic: {
    density: 'high' as const,
    speed: 'fast' as const,
    size: 'md' as const,
    pattern: 'spiral' as const,
    interactive: true,
  },
  neural: {
    density: 'medium' as const,
    speed: 'medium' as const,
    size: 'sm' as const,
    pattern: 'neural' as const,
  },
  minimal: {
    density: 'low' as const,
    speed: 'slow' as const,
    size: 'sm' as const,
    pattern: 'grid' as const,
  },
}

export default ParticleSystem