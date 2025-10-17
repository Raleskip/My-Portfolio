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
  Brain,
  Cpu,
  Palette,
  Eye,
  Zap,
  Target,
  Heart,
  Lightbulb,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import raleskipLogo from 'figma:asset/589aa36d22fe0b179779594af0fd32438e2c3ed1.png'
import aayushPhoto from 'figma:asset/f768bb506045584da1daa65ca55661ab3701d060.png'

export function ContactBrand() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Kinetic Typography Helper
  const KineticText = ({ children, className = "", animation = "kinetic-gradient-shift" }: { 
    children: string, 
    className?: string, 
    animation?: string 
  }) => {
    return (
      <span className={`${animation} ${className}`}>
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            style={{ animationDelay: `${index * 0.05}s` }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  const StaggeredText = ({ children, className = "" }: { children: string, className?: string }) => {
    return (
      <span className={`kinetic-stagger ${className}`}>
        {children.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.03}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  return (
    <section id="contact-brand" className="py-24 bg-raleskip-gradient relative overflow-hidden transform-3d">
      {/* Brand Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 70%)
          `,
        }} />
      </div>

      {/* Floating Brand Elements */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative preserve-3d">
        {/* Brand Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Raleskip Logo */}
          <motion.div
            className="w-24 h-24 mx-auto mb-8"
            whileHover={{ scale: 1.1, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={raleskipLogo} 
              alt="Raleskip"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-3d mb-8"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255,255,255,0.1)"
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-white"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-sm text-white tracking-wider font-medium">
              <KineticText animation="kinetic-float-text">
                LET'S CREATE THE FUTURE TOGETHER
              </KineticText>
            </span>
            <MessageCircle className="w-4 h-4 text-white" />
          </motion.div>

          <h2 className="text-5xl lg:text-7xl font-display font-black mb-6 text-white">
            <StaggeredText className="kinetic-letters">
              Connect with
            </StaggeredText>
            <br />
            <KineticText 
              className="brand-text text-shadow-modern-strong"
              animation="kinetic-pulse-text"
            >
              Raleskip
            </KineticText>
          </h2>

          <p className="text-xl text-white/90 max-w-3xl mx-auto font-body leading-relaxed">
            Ready to transform your vision into reality? Let's collaborate on{' '}
            <motion.span 
              className="kinetic-wave font-semibold text-cyan-200"
              whileHover={{ scale: 1.05 }}
            >
              AI-driven solutions
            </motion.span>, compelling{' '}
            <motion.span 
              className="kinetic-bounce font-semibold text-green-200"
              whileHover={{ scale: 1.05 }}
            >
              brand narratives
            </motion.span>, and{' '}
            <motion.span 
              className="kinetic-elastic font-bold text-yellow-200"
              whileHover={{ scale: 1.05 }}
            >
              digital innovations
            </motion.span>{' '}
            that make a lasting impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Brand Identity & Contact */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8 preserve-3d"
          >
            {/* Aayush Profile Card */}
            <motion.div
              className="glass-3d p-8 rounded-2xl preserve-3d"
              whileHover={{ 
                scale: 1.02, 
                rotateY: 3,
                boxShadow: "0 25px 50px rgba(255,255,255,0.2)"
              }}
            >
              <div className="flex items-center gap-6 mb-6">
                <motion.div
                  className="relative w-20 h-20"
                  whileHover={{ scale: 1.1, rotateY: 15 }}
                >
                  <img 
                    src={aayushPhoto} 
                    alt="Aayush Pawar"
                    className="w-full h-full object-cover rounded-full border-2 border-white/30"
                  />
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2 border-white/50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    <KineticText animation="kinetic-letters">
                      Aayush Pawar
                    </KineticText>
                  </h3>
                  <p className="text-white/80 font-body">
                    Founder & Creative Director
                  </p>
                </div>
              </div>

              {/* Professional Titles */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {[
                  { title: "Digital First Marketer", icon: Globe, color: "text-cyan-200" },
                  { title: "Raconteur", icon: Brain, color: "text-green-200" },
                  { title: "AI Specialist", icon: Cpu, color: "text-purple-200" },
                  { title: "Creative Visionary", icon: Eye, color: "text-yellow-200" }
                ].map((role, index) => (
                  <motion.div
                    key={role.title}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(255,255,255,0.15)"
                    }}
                  >
                    <role.icon className={`w-5 h-5 ${role.color}`} />
                    <span className={`${role.color} font-display font-medium professional-title`}>
                      {role.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Languages & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-display font-semibold mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Hindi', 'French'].map((language, index) => (
                      <motion.span
                        key={language}
                        className="px-2 py-1 bg-white/20 text-white/90 rounded-lg text-xs font-medium font-body"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <KineticText animation="kinetic-float-text">
                          {language}
                        </KineticText>
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Availability
                  </h4>
                  <p className="text-white/80 text-sm font-body">
                    Mon-Fri, 9 AM - 6 PM IST
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "apdontmailme@gmail.com",
                  description: "Your ideas deserve immediate attention",
                  href: "mailto:apdontmailme@gmail.com",
                  gradient: "from-cyan-500 to-blue-500"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+91 8356933902",
                  description: "Let's discuss your vision directly",
                  href: "tel:+918356933902",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "Mumbai, Maharashtra",
                  description: "India • Global collaboration welcome",
                  href: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
                  gradient: "from-purple-500 to-violet-500"
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -4,
                    boxShadow: "0 15px 30px rgba(255,255,255,0.1)"
                  }}
                >
                  <Card className="glass-3d p-6 cursor-pointer preserve-3d">
                    <a href={contact.href} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-r ${contact.gradient} text-white shadow-lg`}
                          whileHover={{ 
                            scale: 1.1, 
                            rotateY: 15,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <contact.icon className="w-6 h-6" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-white mb-1">
                            <KineticText animation="kinetic-letters">
                              {contact.title}
                            </KineticText>
                          </h3>
                          <p className="text-cyan-200 font-medium mb-1 font-body">
                            {contact.value}
                          </p>
                          <p className="text-sm text-white/70 font-body">
                            {contact.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <KineticText animation="kinetic-wave">
                  Connect Across Platforms
                </KineticText>
              </h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: Linkedin,
                    name: "LinkedIn",
                    href: "https://linkedin.com/in/aayushpawar",
                    color: "bg-blue-600 hover:bg-blue-700"
                  },
                  {
                    icon: Mail,
                    name: "Email",
                    href: "mailto:apdontmailme@gmail.com",
                    color: "bg-emerald-600 hover:bg-emerald-700"
                  },
                  {
                    icon: Phone,
                    name: "WhatsApp",
                    href: "https://wa.me/918356933902",
                    color: "bg-green-600 hover:bg-green-700"
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 ${social.color} text-white rounded-xl shadow-lg transition-all duration-300 preserve-3d`}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      rotateY: 10,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="preserve-3d"
          >
            <Card className="glass-3d p-8 preserve-3d">
              <div className="mb-8">
                <h3 className="text-3xl font-display font-bold text-white mb-3">
                  <KineticText animation="kinetic-pulse-text">
                    Start Your Journey
                  </KineticText>
                </h3>
                <p className="text-white/80 font-body leading-relaxed">
                  Transform your ideas into{' '}
                  <span className="kinetic-wave font-semibold text-cyan-200">AI-powered solutions</span>{' '}
                  that captivate and convert. Let's build something extraordinary together.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/90 mb-2 font-body">
                      <KineticText animation="kinetic-float-text">
                        Name *
                      </KineticText>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-lg"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-white/90 mb-2 font-body">
                      <KineticText animation="kinetic-float-text">
                        Email *
                      </KineticText>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-lg"
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-2 font-body">
                    <KineticText animation="kinetic-float-text">
                      Project Type *
                    </KineticText>
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="AI Innovation • Brand Strategy • Digital Marketing • Creative Campaign"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-lg"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-2 font-body">
                    <KineticText animation="kinetic-float-text">
                      Your Vision *
                    </KineticText>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your vision, challenges, and goals. What impact do you want to create? How can Raleskip help bring your ideas to life?"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-lg"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full btn-3d py-4 font-display font-bold rounded-xl group bg-white text-purple-600 hover:bg-white/90"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      <KineticText animation="kinetic-letters">
                        Launch Our Collaboration
                      </KineticText>
                      <motion.div
                        className="group-hover:translate-x-1 transition-transform"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-lg"
              >
                <div className="flex items-center gap-2 text-sm text-white/90 font-body">
                  <Calendar className="w-4 h-4" />
                  <span>
                    <KineticText animation="kinetic-float-text">
                      Response within 24 hours • Available for calls Mon-Fri, 9 AM - 6 PM IST
                    </KineticText>
                  </span>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Brand Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20 glass-3d p-12 rounded-3xl preserve-3d"
        >
          <motion.div
            className="inline-flex p-6 rounded-full bg-gradient-to-r from-white/20 to-white/10 text-white mb-6 shadow-2xl backdrop-blur-lg"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity }
            }}
            whileHover={{ scale: 1.15, rotateX: 15 }}
          >
            <Target className="w-8 h-8" />
          </motion.div>
          
          <h3 className="text-4xl font-display font-black text-white mb-6">
            <KineticText animation="kinetic-pulse-text">
              Ready to Reshape Tomorrow?
            </KineticText>
          </h3>
          <p className="text-white/90 leading-relaxed font-body max-w-4xl mx-auto text-lg">
            At{' '}
            <motion.span 
              className="kinetic-bounce font-bold text-cyan-200"
              whileHover={{ scale: 1.05 }}
            >
              Raleskip
            </motion.span>, we don't just create campaigns – we architect{' '}
            <motion.span 
              className="kinetic-wave font-semibold text-green-200"
              whileHover={{ scale: 1.05 }}
            >
              digital ecosystems
            </motion.span>{' '}
            that transform industries, inspire communities, and unlock the extraordinary potential within every idea. 
            Let's build the future, one{' '}
            <motion.span 
              className="kinetic-elastic font-bold text-yellow-200"
              whileHover={{ scale: 1.05 }}
            >
              innovative solution
            </motion.span>{' '}
            at a time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}