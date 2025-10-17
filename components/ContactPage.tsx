'use client'

import { motion } from 'motion/react'
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
  Twitter,
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
  Loader2
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner@2.0.3'
import aayushPhoto from 'figma:asset/f768bb506045584da1daa65ca55661ab3701d060.png'
import raleskipLogo from 'figma:asset/589aa36d22fe0b179779594af0fd32438e2c3ed1.png'

export function ContactPage() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.projectType) {
      toast.error('Please fill in all required fields', {
        description: 'Name, email, project type, subject, and message are required',
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
      // Simulate API call with real-world processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Enhanced form processing simulation
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        submissionId: crypto.randomUUID(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        sessionId: sessionStorage.getItem('sessionId') || crypto.randomUUID()
      }
      
      // Store session ID
      sessionStorage.setItem('sessionId', submissionData.sessionId)
      
      // Enhanced logging
      console.log('Enhanced form submission:', submissionData)
      
      // Track submission analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact_form_submission', {
          event_category: 'engagement',
          event_label: formData.projectType,
          value: submitCount + 1
        })
      }
      
      setSubmitCount(prev => prev + 1)
      
      // Create mailto fallback for immediate follow-up
      const subject = encodeURIComponent(`${formData.subject} - From ${formData.name}`)
      const body = encodeURIComponent(
        `Project Type: ${formData.projectType}\n` +
        `Company: ${formData.company || 'Not specified'}\n` +
        `Budget: ${formData.budget || 'Not specified'}\n` +
        `Timeline: ${formData.timeline || 'Not specified'}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `Submission ID: ${submissionData.submissionId}`
      )
      
      toast.success('Message sent successfully!', {
        description: 'Thanks for reaching out. I\'ll get back to you within 6 hours.',
        duration: 5000,
        action: {
          label: 'Send via Email',
          onClick: () => {
            window.location.href = `mailto:apdontmailme@gmail.com?subject=${subject}&body=${body}`
          }
        }
      })

      // Reset form
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

      // Track submission analytics
      console.log(`Form submission #${submitCount + 1} completed`)

    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or contact me directly at apdontmailme@gmail.com',
        duration: 5000,
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

  // Handle external link clicks with analytics
  const handleExternalLink = (url: string, platform: string) => {
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
      window.location.href = `${url}?subject=${subject}&body=${body}`
    } else if (platform === 'Phone') {
      // For mobile devices, use tel: protocol
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = url
      } else {
        // For desktop, copy to clipboard
        navigator.clipboard.writeText('+91 8356933902').then(() => {
          toast.success('Phone number copied to clipboard!', {
            description: 'You can now paste it in your phone app',
            duration: 3000,
          })
        })
      }
    } else {
      // Regular external links
      window.open(url, '_blank', 'noopener,noreferrer')
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
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-dark border border-purple-500/30 mb-6"
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgba(139, 92, 246, 0.5)"
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{
                boxShadow: [
                  "0 0 8px rgba(16, 185, 129, 0.5)",
                  "0 0 16px rgba(16, 185, 129, 0.8)",
                  "0 0 8px rgba(16, 185, 129, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-emerald-300 tracking-wide font-medium">
              GET IN TOUCH
            </span>
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </motion.div>

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

        {/* Profile Card */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-dark p-6 text-center max-w-sm w-full">
            <motion.div
              className="relative w-24 h-24 mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full rounded-full p-1 bg-gradient-to-r from-purple-500/30 to-cyan-500/30">
                <img 
                  src={aayushPhoto} 
                  alt="Aayush Pawar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              <motion.div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-3 border-gray-900 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>

            <h2 className="text-xl font-display font-bold text-white mb-2">
              <KineticText>Aayush Pawar</KineticText>
            </h2>
            
            <p className="text-purple-300 font-medium mb-4 font-body text-sm">
              Founder & Creative Director
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center p-1"
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  src={raleskipLogo} 
                  alt="Raleskip" 
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
              <span className="text-xs text-white/60 font-body font-medium tracking-wide">
                RALESKIP
              </span>
            </div>

            <motion.div
              className="flex items-center justify-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-emerald-300 font-medium font-body">
                Available for Projects
              </span>
            </motion.div>
          </Card>
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
                  icon: Twitter, 
                  name: "Twitter", 
                  href: "https://twitter.com/aayushpawar", 
                  color: "bg-sky-600/20 text-sky-400 border-sky-500/30"
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
                    <social.icon className="w-4 h-4" />
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