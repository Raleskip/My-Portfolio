'use client'

import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Calendar, 
  Globe, 
  Linkedin, 
  Instagram,
  Github,
  Brain,
  Cpu,
  Palette,
  Eye,
  Zap,
  Target,
  Heart,
  Lightbulb,
  Sparkles,
  Clock,
  CheckCircle,
  Star,
  ExternalLink,
  Loader2,
  AlertCircle,
  Info,
  Settings,
  Copy,
  Check
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner@2.0.3'
import aayushPhoto from 'figma:asset/f768bb506045584da1daa65ca55661ab3701d060.png'
import raleskipLogo from 'figma:asset/589aa36d22fe0b179779594af0fd32438e2c3ed1.png'
import Objects from '../imports/Objects'

interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  projectType: string
  budget?: string
  timeline?: string
}

// Enhanced contact implementation with creative interactions
export function ContactPageEnhanced() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  // Safe clipboard copy with fallbacks
  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        if (type === 'email') setCopiedEmail(true)
        if (type === 'phone') setCopiedPhone(true)
        
        toast.success(`${type === 'email' ? 'Email' : 'Phone number'} copied!`, {
          description: 'You can now paste it anywhere',
          duration: 2000,
        })
        
        setTimeout(() => {
          if (type === 'email') setCopiedEmail(false)
          if (type === 'phone') setCopiedPhone(false)
        }, 2000)
        
        return true
      } else {
        throw new Error('Clipboard not available')
      }
    } catch (error) {
      const itemName = type === 'email' ? 'Email' : 'Phone number'
      if (typeof window !== 'undefined') {
        alert(`${itemName}: ${text}\n\nPlease copy this manually.`)
      }
      return false
    }
  }

  // Create professional email template
  const createEmailTemplate = (formData: ContactFormData): { subject: string; body: string } => {
    const subject = `🚀 Portfolio Inquiry: ${formData.subject} | ${formData.projectType}`
    
    const body = `
Hello Aayush,

You have received a new inquiry through your Raleskip portfolio website.

CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${formData.name}
📧 Email: ${formData.email}
🏢 Company: ${formData.company || 'Not specified'}
🎯 Project Type: ${formData.projectType}

PROJECT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Subject: ${formData.subject}
💰 Budget Range: ${formData.budget || 'Not specified'}
⏰ Timeline: ${formData.timeline || 'Not specified'}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message}

SUBMISSION INFO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Submitted: ${new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })} IST
🌐 Source: Raleskip Portfolio Website
🔗 Referrer: Portfolio Contact Form

─────────────────────────────────────────────────────────────────────────────
💡 QUICK ACTIONS:
• Reply directly to ${formData.email}
• Review project type: ${formData.projectType}
• Expected timeline: ${formData.timeline || 'Flexible'}
• Budget expectation: ${formData.budget || 'To be discussed'}

Best regards,
Raleskip Portfolio System ✨
    `.trim()

    return { subject, body }
  }

  // Handle form submission with mailto fallback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.projectType) {
      toast.error('Please fill in all required fields', {
        description: 'Name, email, project type, subject, and message are required',
        action: {
          label: 'Check Form',
          onClick: () => {
            const firstEmptyField = document.querySelector('input:invalid, select:invalid, textarea:invalid') as HTMLElement
            if (firstEmptyField) {
              firstEmptyField.focus()
            }
          }
        }
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', {
        description: 'We need a valid email to get back to you',
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create email template
      const { subject, body } = createEmailTemplate(formData)
      
      // Create mailto URL
      const mailtoUrl = `mailto:apdontmailme@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      // Open email client
      if (typeof window !== 'undefined') {
        window.location.href = mailtoUrl
      }
      
      // Show success message
      toast.success('Message sent successfully! 📧', {
        description: 'We\'ll get back to you within 24 hours.',
        duration: 6000,
      })

      // Track successful submission
      setSubmitCount(prev => prev + 1)
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        projectType: '',
        budget: '',
        timeline: ''
      })

    } catch (error) {
      console.error('[Contact] Error:', error)
      
      toast.error('Message could not be sent', {
        description: 'Please try again or contact us directly',
        duration: 8000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Handle external link clicks safely
  const handleExternalLink = async (url: string, platform: string) => {
    toast.info(`Opening ${platform}...`, {
      description: 'Redirecting to external platform',
      duration: 2000,
    })
    
    if (platform === 'Email') {
      const success = await copyToClipboard('apdontmailme@gmail.com', 'email')
      if (!success) {
        if (typeof window !== 'undefined') {
          window.location.href = url
        }
      }
    } else if (platform === 'Phone') {
      const phoneNumber = '+91 8356933902'
      const success = await copyToClipboard(phoneNumber, 'phone')
      
      if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = url
          }
        }, 1000)
      }
    } else {
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }
  }

  // Optimized Kinetic Typography Helper
  const KineticText = ({ children, className = "" }: { children: string, className?: string }) => {
    // Performance optimization: disable complex animations on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    if (isMobile || children.length > 20) {
      return <span className={className}>{children}</span>
    }
    
    return (
      <span className={`kinetic-glow ${className}`}>
        {children}
      </span>
    )
  }

  return (
    <section className="min-h-screen py-12 sm:py-20 bg-background relative overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Responsive Profile Card */}
        <motion.div
          className="flex justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <Card className="card-glow p-6 sm:p-10 text-center max-w-md w-full mx-4">
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6"
              whileHover={{ 
                scale: 1.05, 
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 p-1">
                  <img 
                    src={aayushPhoto} 
                    alt="Aayush Pawar"
                    className="w-full h-full object-cover rounded-full border-2 border-emerald-400/30 hover:border-emerald-400/60 transition-colors duration-500"
                  />
                </div>
              </div>
              
              <motion.div
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full border-3 border-black flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CheckCircle className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            <h2 className="text-3xl font-display font-bold text-white mb-4">
              <KineticText>Aayush Pawar</KineticText>
            </h2>
            
            <p className="text-emerald-300 font-medium mb-6 font-body text-lg">
              Founder & Creative Director
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center p-2"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  borderColor: "rgba(139, 92, 246, 0.6)"
                }}
              >
                <img 
                  src={raleskipLogo} 
                  alt="Raleskip" 
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
              <span className="text-base text-white/70 font-body font-medium tracking-wider">
                RALESKIP
              </span>
            </div>

            <motion.div
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(16, 185, 129, 0.3)"
              }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-emerald-400"
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 5px rgba(16, 185, 129, 0.5)",
                    "0 0 15px rgba(16, 185, 129, 0.8)",
                    "0 0 5px rgba(16, 185, 129, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-emerald-200 font-medium font-body">
                Available for Projects
              </span>
            </motion.div>
          </Card>
        </motion.div>

        {/* Responsive Header */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 sm:mb-8">
            <span className="text-gradient-neon">
              <KineticText>Let's Create</KineticText>
            </span>
            <br />
            <span className="text-white">
              <KineticText>Something Amazing</KineticText>
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-4xl mx-auto font-body leading-relaxed px-4">
            Ready to transform your vision into reality? Let's collaborate on innovative solutions that 
            drive meaningful impact. Whether it's AI-powered experiences, strategic marketing, or 
            cutting-edge digital transformation - I'm here to bring your ideas to life.
          </p>
        </motion.div>

        {/* Responsive Contact Methods & Social Links */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-display font-semibold text-white mb-6 flex items-center gap-3 text-xl">
              <Phone className="w-6 h-6 text-purple-400" />
              <KineticText>Contact Information</KineticText>
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "apdontmailme@gmail.com",
                  href: "mailto:apdontmailme@gmail.com",
                  color: "text-cyan-400",
                  canCopy: true
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 8356933902",
                  href: "tel:+918356933902",
                  color: "text-emerald-400",
                  canCopy: true
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Mumbai, Maharashtra",
                  href: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
                  color: "text-purple-400",
                  canCopy: false
                }
              ].map((contact, index) => (
                <motion.button
                  key={contact.label}
                  onClick={() => handleExternalLink(contact.href, contact.label)}
                  className="w-full p-6 card-glow rounded-2xl text-left transition-all duration-500 group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    rotateY: 3
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${
                        contact.label === 'Email' ? 'from-cyan-500/20 to-blue-500/20' :
                        contact.label === 'Phone' ? 'from-emerald-500/20 to-green-500/20' :
                        'from-purple-500/20 to-violet-500/20'
                      } border border-white/10 group-hover:border-white/30 transition-colors duration-500`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                      }}
                    >
                      <contact.icon className={`w-6 h-6 ${contact.color} group-hover:scale-110 transition-transform duration-300`} />
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-display font-semibold text-white text-lg mb-1">{contact.label}</div>
                      <div className={`text-sm ${contact.color} font-body`}>{contact.value}</div>
                    </div>
                    {contact.canCopy && (
                      <div className="flex items-center gap-2">
                        {((contact.label === 'Email' && copiedEmail) || (contact.label === 'Phone' && copiedPhone)) ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="w-4 h-4 text-green-400" />
                          </motion.div>
                        ) : (
                          <Copy className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
                        )}
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
                      </div>
                    )}
                    {!contact.canCopy && (
                      <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="font-display font-semibold text-white mb-6 flex items-center gap-3 text-xl">
              <Globe className="w-6 h-6 text-purple-400" />
              <KineticText>Social Platforms</KineticText>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  icon: Linkedin, 
                  name: "LinkedIn", 
                  href: "https://www.linkedin.com/in/aayushpawar", 
                  color: "bg-blue-600/30 text-blue-300 border-blue-500/40 hover:bg-blue-600/50"
                },
                { 
                  icon: () => <div className="w-5 h-5"><Objects /></div>, 
                  name: "Behance", 
                  href: "https://www.behance.net/aayushpawar", 
                  color: "bg-blue-500/30 text-blue-200 border-blue-400/40 hover:bg-blue-500/50"
                },
                { 
                  icon: Instagram, 
                  name: "Instagram", 
                  href: "https://instagram.com/aayushpawar", 
                  color: "bg-pink-600/30 text-pink-300 border-pink-500/40 hover:bg-pink-600/50"
                },
                { 
                  icon: Github, 
                  name: "GitHub", 
                  href: "https://github.com/aayushpawar", 
                  color: "bg-gray-600/30 text-gray-300 border-gray-500/40 hover:bg-gray-600/50"
                }
              ].map((social, index) => (
                <motion.button
                  key={social.name}
                  onClick={() => handleExternalLink(social.href, social.name)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden btn-magnetic ${social.color}`}
                  whileHover={{ 
                    scale: 1.08,
                    rotate: 3,
                    y: -4
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15 
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {typeof social.icon === 'function' ? <social.icon /> : <social.icon className="w-5 h-5" />}
                    </motion.div>
                    <span className="text-sm font-medium font-body">{social.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 ml-auto transition-opacity duration-300" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="card-glow p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                <KineticText>Start Your Project</KineticText>
              </h2>
              <p className="text-white/80 font-body leading-relaxed text-lg">
                Tell me about your vision, and let's explore how we can transform it into 
                an extraordinary digital experience that drives real results.
              </p>
              
              {/* Enhanced Status Indicator */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border mt-6 bg-amber-500/20 border-amber-500/40"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full bg-amber-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-amber-300 font-body">
                  Ready to Connect
                </span>
                <Info className="w-4 h-4 text-amber-400" />
              </motion.div>
              
              <p className="text-sm text-white/60 mt-3 font-body">
                Submit your message and we'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enhanced Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                    Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 text-base"
                    required
                  />
                </motion.div>

                {/* Enhanced Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 text-base"
                    required
                  />
                </motion.div>
              </div>

              {/* Enhanced Company Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                  Company (Optional)
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 text-base"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enhanced Project Type Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 cursor-pointer text-base"
                    required
                  >
                    <option value="">Select project type...</option>
                    <option value="AI & Technology Solutions">🤖 AI & Technology Solutions</option>
                    <option value="Digital Marketing Strategy">📈 Digital Marketing Strategy</option>
                    <option value="Brand Development">🎨 Brand Development & Creative</option>
                    <option value="Product Marketing">🚀 Product Marketing & Launch</option>
                    <option value="Healthcare Marketing">🏥 Healthcare Marketing</option>
                    <option value="UI/UX Design">✨ UI/UX Design & Experience</option>
                    <option value="Growth Hacking">📊 Growth Hacking & Analytics</option>
                    <option value="Consultation">💬 Strategic Consultation</option>
                    <option value="Other">🔧 Custom Solution</option>
                  </select>
                </motion.div>

                {/* Enhanced Budget Field */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                    Budget Range (Optional)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 cursor-pointer text-base"
                  >
                    <option value="">Select budget range...</option>
                    <option value="Under $5,000">💰 Under $5,000</option>
                    <option value="$5,000 - $15,000">💳 $5,000 - $15,000</option>
                    <option value="$15,000 - $50,000">💎 $15,000 - $50,000</option>
                    <option value="$50,000+">🏆 $50,000+</option>
                    <option value="Let's Discuss">🤝 Let's Discuss</option>
                  </select>
                </motion.div>
              </div>

              {/* Enhanced Timeline Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
              >
                <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                  Timeline (Optional)
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 cursor-pointer text-base"
                >
                  <option value="">Select timeline...</option>
                  <option value="ASAP">⚡ ASAP (Rush Project)</option>
                  <option value="1-2 weeks">🏃‍♂️ 1-2 weeks</option>
                  <option value="1 month">📅 1 month</option>
                  <option value="2-3 months">🗓️ 2-3 months</option>
                  <option value="3+ months">📈 3+ months</option>
                  <option value="Flexible">🤷‍♂️ Flexible</option>
                </select>
              </motion.div>

              {/* Enhanced Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                  Subject *
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your project"
                  className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 backdrop-blur-lg hover:border-white/30 hover:bg-black/50 text-base"
                  required
                />
              </motion.div>

              {/* Enhanced Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 }}
              >
                <label className="block text-sm font-medium text-white/90 mb-3 font-body">
                  Project Details *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your vision, goals, target audience, and any specific requirements. The more details you share, the better I can understand and assist with your project."
                  rows={6}
                  className="w-full px-5 py-4 bg-black/40 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400/60 transition-all duration-500 resize-none backdrop-blur-lg hover:border-white/30 hover:bg-black/50 text-base"
                  required
                />
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-float btn-pulse px-16 py-6 font-display font-bold text-xl text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 border-0 rounded-2xl relative overflow-hidden group min-w-[280px] transition-all duration-500"
                  whileHover={{ 
                    scale: 1.05,
                    y: -6,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  <span className="flex items-center justify-center gap-4 relative z-10">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="font-mono">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-12" />
                        <span>Send Message</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                          animate={{ translateX: ["100%", "-100%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>

              {/* Enhanced Help Text */}
              <motion.div
                className="text-center mt-10 p-8 bg-gradient-to-r from-white/10 to-emerald-500/10 rounded-3xl border border-white/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -3,
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
              >
                <div className="flex items-center justify-center gap-4 text-base text-white/90 font-body mb-4">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>Response Time: Within 24 hours</span>
                </div>
                <div className="flex items-center justify-center gap-4 text-sm text-white/70 font-body">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Available Mon-Fri, 9 AM - 6 PM IST • All inquiries welcome</span>
                </div>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}