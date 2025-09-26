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
  Settings
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner@2.0.3'
import aayushPhoto from 'figma:asset/f768bb506045584da1daa65ca55661ab3701d060.png'
import raleskipLogo from 'figma:asset/589aa36d22fe0b179779594af0fd32438e2c3ed1.png'
import { copyToClipboard } from './utils/clipboard'
import { 
  sendContactEmail, 
  initializeEmailJS, 
  sendViaMailto,
  getEmailConfigStatus,
  getConfigDebugInfo,
  type ContactFormData,
  type EmailConfigStatus
} from './utils/emailService'
import Objects from '../imports/Objects'

export function ContactPage() {
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
  const [emailConfigStatus, setEmailConfigStatus] = useState(getEmailConfigStatus())

  // Initialize EmailJS when component mounts
  useEffect(() => {
    try {
      const initialized = initializeEmailJS()
      const configStatus = getEmailConfigStatus()
      setEmailConfigStatus(configStatus)
      
      const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      
      // Debug info for development
      if (isDevelopment) {
        const debugInfo = getConfigDebugInfo()
        console.log('[ContactPage] Email service running in fallback mode (development)')
        console.log('[ContactPage] To enable EmailJS: https://www.emailjs.com/')
        
        // Only show full debug in development if needed
        if (window.location.search.includes('debug=email')) {
          console.log('[ContactPage] Email Configuration Debug:', debugInfo)
        }
      }
      
      if (initialized) {
        console.log('[ContactPage] EmailJS initialized successfully')
      }
    } catch (error) {
      console.error('[ContactPage] EmailJS initialization failed:', error)
      setEmailConfigStatus({
        isConfigured: false,
        mode: 'fallback',
        status: 'Email Client Mode',
        statusColor: 'amber',
        description: 'Messages will open in your email client'
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.projectType) {
      toast.error('Please fill in all required fields', {
        description: 'Name, email, project type, subject, and message are required',
        action: {
          label: 'Check Form',
          onClick: () => {
            // Focus on first empty required field
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
      // Attempt to send email
      const emailResult = await sendContactEmail(formData)
      
      if (emailResult.success) {
        // Success - email sent via EmailJS
        toast.success('Message sent successfully! 🚀', {
          description: emailResult.message,
          duration: 6000,
          action: {
            label: 'Send Another',
            onClick: () => {
              // Reset form for another submission
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
            }
          }
        })

        // Track successful submission
        setSubmitCount(prev => prev + 1)
        
        // Analytics tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'contact_form_submission', {
            event_category: 'engagement',
            event_label: formData.projectType,
            value: submitCount + 1,
            custom_parameters: {
              submission_method: emailResult.method || 'unknown',
              submission_id: emailResult.submissionId
            }
          })
        }

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

        console.log(`[Contact] Successful submission #${submitCount + 1} via ${emailResult.method}:`, emailResult.submissionId)

      } else {
        // EmailJS failed or not configured - offer fallback options
        const isConfigured = emailConfigStatus.isConfigured
        const fallbackMessage = isConfigured 
          ? 'Direct email temporarily unavailable' 
          : 'Opening your email client'
        
        toast.info(fallbackMessage, {
          description: 'We\'ll help you send the message through your email app',
          duration: 6000,
          action: {
            label: 'Open Email Client',
            onClick: () => {
              sendViaMailto(formData)
            }
          }
        })

        // Auto-trigger mailto after a short delay for better UX
        setTimeout(() => {
          sendViaMailto(formData)
        }, 1500)

        console.log('[Contact] Using fallback method:', emailResult.method, emailResult.message)
      }

    } catch (error) {
      // Unexpected error
      console.error('[Contact] Unexpected error:', error)
      
      toast.error('Submission failed', {
        description: 'Don\'t worry - let\'s try the email client instead',
        duration: 8000,
        action: {
          label: 'Open Email Client',
          onClick: () => {
            sendViaMailto(formData)
          }
        }
      })
      
      // Auto-fallback to mailto
      setTimeout(() => {
        sendViaMailto(formData)
      }, 1000)
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

  // Handle external link clicks with analytics and safe clipboard operations
  const handleExternalLink = async (url: string, platform: string) => {
    toast.info(`Opening ${platform}...`, {
      description: 'Redirecting to external platform',
      duration: 2000,
    })
    
    // Track analytics
    console.log(`[Analytics] Contact link clicked: ${platform}`)
    
    // Special handling for different platforms
    if (platform === 'Email') {
      // Create professional email template
      const subject = encodeURIComponent('Let\'s Create Magic Together!')
      const body = encodeURIComponent(
        'Hi Aayush,\n\n' +
        'I\'d love to discuss a potential collaboration opportunity.\n\n' +
        '• Project Type: [Please specify]\n' +
        '• Timeline: [When would you like to start?]\n' +
        '• Budget Range: [What\'s your estimated budget?]\n' +
        '• Goals: [What are you hoping to achieve?]\n\n' +
        'Looking forward to hearing from you!\n\n' +
        'Best regards,\n' +
        '[Your Name]'
      )
      if (typeof window !== 'undefined') {
        window.location.href = `${url}?subject=${subject}&body=${body}`
      }
    } else if (platform === 'Phone') {
      // For mobile devices, use tel: protocol
      if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        if (typeof window !== 'undefined') {
          window.location.href = url
        }
      } else {
        // For desktop, try to copy to clipboard with proper error handling
        const phoneNumber = '+91 8356933902'
        const success = await copyToClipboard(phoneNumber)
        
        if (success.success) {
          toast.success('Phone number copied to clipboard!', {
            description: 'You can now paste it in your phone app',
            duration: 3000,
          })
        } else {
          // Fallback: Show phone number in a modal or alert
          toast.info('Phone Number', {
            description: `${phoneNumber} - Please copy manually if needed`,
            duration: 5000,
            action: {
              label: 'Try Again',
              onClick: async () => {
                const retrySuccess = await copyToClipboard(phoneNumber)
                if (retrySuccess.success) {
                  toast.success('Phone number copied!')
                } else {
                  // Final fallback - show alert with phone number
                  if (typeof window !== 'undefined') {
                    alert(`Phone: ${phoneNumber}\n\nPlease copy this number manually.`)
                  }
                }
              }
            }
          })
        }
      }
    } else {
      // Regular external links
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }
  }

  // Kinetic Typography Helper
  const KineticText = ({ children, className = "" }: { children: string, className?: string }) => {
    return (
      <span className={`kinetic-glow ${className}`}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ 
              animationDelay: `${index * 0.08}s`,
              animationFillMode: 'both'
            }}
            className="inline-block transform transition-all duration-300 ease-out"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  return (
    <section className="min-h-screen py-20 bg-background relative overflow-hidden particle-system-dark">
      {/* Optimized Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-500/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Profile Card - Moved to top */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="card-dark p-8 text-center max-w-md w-full">
            <motion.div
              className="relative w-36 h-36 mx-auto mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 p-1">
                  <img 
                    src={aayushPhoto} 
                    alt="Aayush Pawar"
                    className="w-full h-full object-cover rounded-full border border-emerald-400/20"
                  />
                </div>
              </div>
              
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full border-2 border-black flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>

            <h2 className="text-2xl font-display font-bold text-white mb-3">
              <KineticText>Aayush Pawar</KineticText>
            </h2>
            
            <p className="text-emerald-300 font-medium mb-6 font-body text-base">
              Founder & Creative Director
            </p>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center p-1.5"
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  src={raleskipLogo} 
                  alt="Raleskip" 
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
              <span className="text-sm text-white/60 font-body font-medium tracking-wide">
                RALESKIP
              </span>
            </div>

            <motion.div
              className="flex items-center justify-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-emerald-300 font-medium font-body">
                Available for Projects
              </span>
            </motion.div>
          </Card>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl lg:text-6xl font-display font-black mb-6">
            <span className="text-gradient-neon">
              <KineticText>Let's Create</KineticText>
            </span>
            <br />
            <span className="text-white">
              <KineticText>Something Amazing</KineticText>
            </span>
          </h1>

          <p className="text-lg text-white/70 max-w-3xl mx-auto font-body leading-relaxed">
            Ready to transform your vision into reality? Let's collaborate on innovative solutions that 
            drive meaningful impact. Whether it's AI-powered experiences, strategic marketing, or 
            cutting-edge digital transformation - I'm here to bring your ideas to life.
          </p>
        </motion.div>

        {/* Contact Methods & Social Links */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-400" />
              <KineticText>Contact Information</KineticText>
            </h3>
            
            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "apdontmailme@gmail.com",
                  href: "mailto:apdontmailme@gmail.com",
                  color: "text-cyan-400"
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 8356933902",
                  href: "tel:+918356933902",
                  color: "text-emerald-400"
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Mumbai, Maharashtra",
                  href: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
                  color: "text-purple-400"
                }
              ].map((contact, index) => (
                <motion.button
                  key={contact.label}
                  onClick={() => handleExternalLink(contact.href, contact.label)}
                  className="w-full p-3 neuro-flat rounded-lg text-left hover:neuro-floating transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <contact.icon className={`w-4 h-4 ${contact.color}`} />
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{contact.label}</div>
                      <div className={`text-xs ${contact.color}`}>{contact.value}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <KineticText>Social Platforms</KineticText>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { 
                  icon: Linkedin, 
                  name: "LinkedIn", 
                  href: "https://www.linkedin.com/in/aayushpawar", 
                  color: "bg-blue-600/20 text-blue-400 border-blue-500/30"
                },
                { 
                  icon: () => <div className="w-4 h-4"><Objects /></div>, 
                  name: "Behance", 
                  href: "https://www.behance.net/aayushpawar", 
                  color: "bg-blue-500/20 text-blue-300 border-blue-400/30"
                },
                { 
                  icon: Instagram, 
                  name: "Instagram", 
                  href: "https://instagram.com/aayushpawar", 
                  color: "bg-pink-600/20 text-pink-400 border-pink-500/30"
                },
                { 
                  icon: Github, 
                  name: "GitHub", 
                  href: "https://github.com/aayushpawar", 
                  color: "bg-gray-600/20 text-gray-400 border-gray-500/30"
                }
              ].map((social) => (
                <motion.button
                  key={social.name}
                  onClick={() => handleExternalLink(social.href, social.name)}
                  className={`p-3 rounded-lg border transition-all duration-300 group ${social.color}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    {typeof social.icon === 'function' ? <social.icon /> : <social.icon className="w-4 h-4" />}
                    <span className="text-sm font-medium">{social.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 ml-auto" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="card-dark p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-display font-bold text-white mb-3">
                <KineticText>Start Your Project</KineticText>
              </h2>
              <p className="text-white/70 font-body leading-relaxed">
                Tell me about your vision, and let's explore how we can transform it into 
                an extraordinary digital experience that drives real results.
              </p>
              
              {/* Email Status Indicator */}
              <motion.div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mt-4 ${
                  emailConfigStatus.statusColor === 'emerald' 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  emailConfigStatus.statusColor === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
                <span className={`text-xs font-medium ${
                  emailConfigStatus.statusColor === 'emerald' ? 'text-emerald-300' : 'text-amber-300'
                }`}>
                  {emailConfigStatus.status}
                </span>
                {emailConfigStatus.mode === 'fallback' && (
                  <Info className="w-3 h-3 text-amber-400" />
                )}
              </motion.div>
              
              <p className="text-xs text-white/50 mt-2 font-body">
                {emailConfigStatus.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-body">
                    <KineticText>Full Name *</KineticText>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="neuro-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-body">
                    <KineticText>Email Address *</KineticText>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="neuro-input w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-body">
                    <KineticText>Company/Organization</KineticText>
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="neuro-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-body">
                    <KineticText>Project Type *</KineticText>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="neuro-input w-full"
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="ai-innovation">AI Innovation</option>
                    <option value="brand-strategy">Brand Strategy</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="product-development">Product Development</option>
                    <option value="creative-campaign">Creative Campaign</option>
                    <option value="consulting">Strategic Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-body">
                  <KineticText>Project Subject *</KineticText>
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief project title or subject"
                  className="neuro-input w-full"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-body">
                    <KineticText>Budget Range</KineticText>
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="neuro-input w-full"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10K</option>
                    <option value="10k-25k">$10K - $25K</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-plus">$100K+</option>
                    <option value="discuss">Let's Discuss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2 font-body">
                    <KineticText>Timeline</KineticText>
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="neuro-input w-full"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-months-plus">6+ months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-body">
                  <KineticText>Project Details *</KineticText>
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project vision, goals, challenges, and what you're hoping to achieve. The more details you share, the better I can understand how to help bring your ideas to life."
                  rows={5}
                  className="neuro-input w-full resize-none"
                  required
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="neuro-btn py-3 px-8 font-display font-bold rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <KineticText>
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </KineticText>
                  </span>
                </Button>
                
                {/* Manual Fallback Button */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => sendViaMailto(formData)}
                    className="text-sm text-white/60 hover:text-white/80 underline transition-colors"
                  >
                    Or send via your email client
                  </button>
                </div>
              </div>

              <motion.div
                className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-center mt-4"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-300 font-body">
                  <Clock className="w-4 h-4" />
                  <span>
                    <KineticText>
                      Typical response within 6 hours • Available Mon-Fri, 9 AM - 6 PM IST
                    </KineticText>
                  </span>
                </div>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}