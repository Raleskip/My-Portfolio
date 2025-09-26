'use client'

import React, { useRef, ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate' | 'fade'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
  className?: string
  stagger?: number
  cascade?: boolean
  parallax?: boolean
  morphing?: boolean
}

const revealVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -180, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
}

const morphingVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: -15,
    y: 40,
    filter: 'blur(10px)',
    borderRadius: '50%'
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    filter: 'blur(0px)',
    borderRadius: '0%'
  }
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  once = true,
  threshold = 0.3,
  className = '',
  stagger = 0,
  cascade = false,
  parallax = false,
  morphing = false
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: '0px 0px -100px 0px'
  })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, parallax ? -100 : 0])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, parallax ? 1.1 : 1, 1])
  
  // Get the appropriate variants
  const variants = morphing ? morphingVariants : revealVariants[direction]
  
  // Enhanced transition with custom easing
  const transition = {
    duration,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
    type: "spring" as const,
    stiffness: 100,
    damping: 15
  }
  
  // Cascade children animation
  const containerVariants: Variants = cascade ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger || 0.1,
        delayChildren: delay
      }
    }
  } : {}
  
  const childVariants: Variants = cascade ? {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration * 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  } : {}
  
  if (cascade) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={parallax ? { y: yParallax, scale: scaleParallax } : undefined}
      >
        {React.Children.map(children, (child, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className="relative block"
          >
            {child}
          </motion.span>
        ))}
      </motion.div>
    )
  }
  
  return (
    <motion.span
      ref={ref}
      className={`block ${className}`}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={transition}
      style={parallax ? { y: yParallax, scale: scaleParallax } : undefined}
    >
      {children}
    </motion.span>
  )
}

// Advanced scroll-triggered animations
export function ScrollMorphing({ 
  children, 
  className = '',
  ...props 
}: Omit<ScrollRevealProps, 'morphing'>) {
  return (
    <div className={`perspective-container ${className}`}>
      <ScrollReveal 
        {...props}
        morphing={true}
      >
        {children}
      </ScrollReveal>
    </div>
  )
}

// Parallax wrapper
export function ParallaxSection({ 
  children, 
  intensity = 0.5,
  className = '' 
}: { 
  children: ReactNode
  intensity?: number
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, intensity * -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="will-change-transform block"
      >
        {children}
      </motion.div>
    </div>
  )
}

// Text reveal with character-by-character animation
export function TextReveal({ 
  text, 
  className = '',
  delay = 0,
  stagger = 0.03 
}: { 
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }
  
  const childVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      rotateX: -90,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
  
  return (
    <motion.span
      ref={ref}
      className={`inline-block perspective-container ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Scroll-triggered counter animation
export function CounterReveal({ 
  from = 0, 
  to, 
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}: { 
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const count = useTransform(
    useScroll().scrollYProgress,
    [0, 1],
    [from, to]
  )
  
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.span
        animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
        transition={{ duration, ease: "easeOut" }}
        className="inline-block"
      >
        {prefix}
        <span className="inline-block">
          {isInView ? to : from}
        </span>
        {suffix}
      </motion.span>
    </motion.span>
  )
}

export default ScrollReveal