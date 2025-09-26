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

// Simple, safe contact implementation without external dependencies
export function ContactPageSimplified() {
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
      // Fallback: show the text in an alert
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
      
      // Check if URL is too long (some email clients have limits)
      if (mailtoUrl.length > 2000) {
        // Fallback: show copy modal
        showCopyModal(subject, body)
      } else {
        // Open email client
        if (typeof window !== 'undefined') {
          window.location.href = mailtoUrl
        }
      }
      
      // Show success message
      toast.success('Message sent successfully! 📧', {
        description: 'We\'ll get back to you within 24 hours.',
        duration: 6000,
        action: {
          label: 'Copy Content',
          onClick: () => showCopyModal(subject, body)
        }
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

      console.log(`[Contact] Successful submission #${submitCount + 1}`)

    } catch (error) {
      console.error('[Contact] Error:', error)
      
      toast.error('Message could not be sent', {
        description: 'Please try again or contact us directly',
        duration: 8000,
        action: {
          label: 'Copy Message',
          onClick: () => {
            const { subject, body } = createEmailTemplate(formData)
            showCopyModal(subject, body)
          }
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show manual copy modal
  const showCopyModal = (subject: string, body: string) => {
    const content = `${subject}\n\n${body}`
    
    // Create modal overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'Poppins', sans-serif;
    `

    // Create modal content
    const modal = document.createElement('div')
    modal.style.cssText = `
      background: #0a0a0a;
      border: 2px solid #8b5cf6;
      border-radius: 16px;
      padding: 32px;
      max-width: 600px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    `

    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">📧 Copy Email Content</h3>
        <button id="closeModal" style="
          background: #1a1a1a;
          border: 1px solid #444;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.2s;
        ">×</button>
      </div>
      <div style="margin-bottom: 16px;">
        <p style="color: #a3a3a3; font-size: 14px; margin: 0 0 12px 0;">
          📋 Copy the content below and send it to: <strong style="color: #10b981;">apdontmailme@gmail.com</strong>
        </p>
      </div>
      <textarea readonly style="
        width: 100%;
        min-height: 300px;
        background: #000000;
        border: 1px solid #333;
        color: #ffffff;
        padding: 16px;
        border-radius: 12px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        line-height: 1.5;
        resize: vertical;
        box-sizing: border-box;
        white-space: pre-wrap;
      ">${content}</textarea>
      <div style="margin-top: 20px; display: flex; gap: 12px; justify-content: center;">
        <button id="selectAllBtn" style="
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        ">📋 Select All</button>
        <button id="copyBtn" style="
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        ">📄 Copy to Clipboard</button>
        <button id="closeModalBtn" style="
          background: #444;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        ">✖️ Close</button>
      </div>
      <div style="margin-top: 16px; text-align: center;">
        <p style="color: #666; font-size: 12px; margin: 0;">
          💡 Tip: After copying, paste this content in your email client and send to apdontmailme@gmail.com
        </p>
      </div>
    `

    overlay.appendChild(modal)
    document.body.appendChild(overlay)

    // Add event listeners
    const closeModal = () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay)
      }
    }

    const textarea = modal.querySelector('textarea') as HTMLTextAreaElement
    const selectAllBtn = modal.querySelector('#selectAllBtn') as HTMLButtonElement
    const copyBtn = modal.querySelector('#copyBtn') as HTMLButtonElement
    const closeBtn = modal.querySelector('#closeModalBtn') as HTMLButtonElement
    const closeX = modal.querySelector('#closeModal') as HTMLButtonElement

    selectAllBtn.onclick = () => {
      textarea.focus()
      textarea.select()
    }

    copyBtn.onclick = async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(content)
          copyBtn.textContent = '✅ Copied!'
          copyBtn.style.background = '#10b981'
          setTimeout(() => {
            copyBtn.textContent = '📄 Copy to Clipboard'
            copyBtn.style.background = '#10b981'
          }, 2000)
        } else {
          throw new Error('Clipboard not available')
        }
      } catch (err) {
        textarea.select()
        if (typeof window !== 'undefined') {
          alert('Please select all text (Ctrl+A) and copy manually (Ctrl+C)')
        }
      }
    }

    closeBtn.onclick = closeModal
    closeX.onclick = closeModal
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal()
    }

    // Auto-focus and select text
    setTimeout(() => {
      textarea.focus()
      textarea.select()
    }, 100)

    // Auto-close after 2 minutes
    setTimeout(closeModal, 120000)
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
    
    console.log(`[Analytics] Contact link clicked: ${platform}`)
    
    if (platform === 'Email') {
      // For email, offer copy option
      const success = await copyToClipboard('apdontmailme@gmail.com', 'email')
      if (!success) {
        // Also try opening email client as backup
        if (typeof window !== 'undefined') {
          window.location.href = url
        }
      }
    } else if (platform === 'Phone') {
      // For phone, copy number to clipboard
      const phoneNumber = '+91 8356933902'
      const success = await copyToClipboard(phoneNumber, 'phone')
      
      // For mobile devices, also try tel: protocol
      if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = url
          }
        }, 1000)
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
                  className="w-full p-4 card-glow rounded-xl text-left transition-all duration-500 group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    rotateY: 2
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }}
                >
                  <div className="flex items-center gap-3">
                    <contact.icon className={`w-4 h-4 ${contact.color}`} />
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{contact.label}</div>
                      <div className={`text-xs ${contact.color}`}>{contact.value}</div>
                    </div>
                    {contact.canCopy && (
                      <div className="flex items-center gap-1">
                        {((contact.label === 'Email' && copiedEmail) || (contact.label === 'Phone' && copiedPhone)) ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors" />
                        )}
                        <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors" />
                      </div>
                    )}
                    {!contact.canCopy && (
                      <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors" />
                    )}
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
                  className={`p-4 rounded-xl border-2 transition-all duration-500 group relative overflow-hidden btn-magnetic ${social.color}`}
                  whileHover={{ 
                    scale: 1.08,
                    rotate: 3,
                    y: -3
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15 
                  }}
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
              
              {/* Simple Status Indicator */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mt-4 bg-amber-500/10 border-amber-500/30"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse bg-amber-400" />
                <span className="text-xs font-medium text-amber-300">
                  Email Client Mode
                </span>
                <Info className="w-3 h-3 text-amber-400" />
              </motion.div>
              
              <p className="text-xs text-white/50 mt-2 font-body">
                Submit your message and we'll get back to you within 24 hours message will open in your email client
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
                    <option value="1-2weeks">1-2 Weeks</option>
                    <option value="1month">1 Month</option>
                    <option value="2-3months">2-3 Months</option>
                    <option value="6months">6+ Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2 font-body">
                  <KineticText>Message *</KineticText>
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, goals, and vision. What challenges are you looking to solve?"
                  className="neuro-input w-full min-h-[120px]"
                  required
                />
              </div>

              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="neuro-btn flex-1 py-3 px-6 font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 border-emerald-400/50 hover:from-emerald-400 hover:to-cyan-400"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Opening Email Client...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>

              <div className="text-center pt-4">
                <p className="text-xs text-white/50 font-body">
                  💡 Your message will open in your default email client (Gmail, Outlook, etc.) 
                  for you to review and send directly.
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}