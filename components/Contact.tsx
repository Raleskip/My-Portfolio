'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, Globe, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 bg-gradient-modern-2 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-modern border border-emerald-200/30 mb-8"
            whileHover={{ borderColor: "rgba(16,185,129,0.4)" }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(16,185,129,0.5)",
                  "0 0 15px rgba(16,185,129,0.8)",
                  "0 0 5px rgba(16,185,129,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-sm text-emerald-600 tracking-wider font-medium">
              LET'S CONNECT & COLLABORATE
            </span>
            <MessageCircle className="w-4 h-4 text-emerald-500" />
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-display font-semibold mb-6">
            <span className="text-modern-gradient">Get In</span>
            <br />
            <span className="text-slate-800">Touch</span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-body leading-relaxed">
            Ready to collaborate on your next big idea? Whether it's strategic marketing, 
            product innovation, or digital transformation - let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "apdontmailme@gmail.com",
                  description: "Drop me a line anytime",
                  href: "mailto:apdontmailme@gmail.com",
                  gradient: "from-emerald-500 to-blue-500"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+91 8356933902",
                  description: "Available for calls & WhatsApp",
                  href: "tel:+918356933902",
                  gradient: "from-violet-500 to-purple-500"
                },
                {
                  icon: MapPin,
                  title: "Location",
                  value: "Mumbai, Maharashtra",
                  description: "India • Open to remote collaboration",
                  href: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
                  gradient: "from-amber-500 to-orange-500"
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <Card className="p-6 card-modern border border-emerald-200/20 hover:border-emerald-300/40 transition-all duration-300 group cursor-pointer">
                    <a href={contact.href} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-r ${contact.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <contact.icon className="w-6 h-6" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-slate-800 mb-1">
                            {contact.title}
                          </h3>
                          <p className="text-emerald-600 font-medium mb-1 font-body">
                            {contact.value}
                          </p>
                          <p className="text-sm text-slate-600 font-body">
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
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display font-semibold text-slate-800 mb-4">
                Connect on Social
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
                    className={`p-3 ${social.color} text-white rounded-xl shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="p-6 card-modern rounded-xl border border-emerald-200/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-emerald-500" />
                <h3 className="font-display font-semibold text-slate-800">
                  Languages
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['English', 'Hindi', 'French'].map((language, index) => (
                  <motion.span
                    key={language}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium font-body"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {language}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 card-modern border border-emerald-200/20">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-semibold text-slate-800 mb-2">
                  Send a Message
                </h3>
                <p className="text-slate-600 font-body">
                  Have a project in mind? Let's discuss how we can collaborate.
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
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-body">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2 font-body">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
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
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-body">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2 font-body">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me more about your project or how we can collaborate..."
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
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
                    className="w-full btn-modern-primary py-4 font-display font-semibold rounded-xl group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                      <motion.div
                        className="group-hover:translate-x-1 transition-transform"
                        animate={{ x: [0, 3, 0] }}
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
                className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <div className="flex items-center gap-2 text-sm text-emerald-700 font-body">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Typical response time: Within 24 hours • Available Mon-Fri, 9 AM - 6 PM IST
                  </span>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 card-modern rounded-2xl border border-emerald-200/20"
        >
          <h3 className="text-2xl font-display font-semibold text-modern-gradient mb-4">
            Ready to Transform Your Vision into Reality?
          </h3>
          <p className="text-slate-600 font-body mb-6 max-w-2xl mx-auto">
            From strategic marketing leadership to innovative product development, 
            let's collaborate to create exceptional digital experiences that drive meaningful results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="mailto:apdontmailme@gmail.com"
                className="btn-modern-primary px-6 py-3 rounded-xl font-display font-semibold text-white no-underline inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Start a Conversation
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="tel:+918356933902"
                className="btn-modern-secondary px-6 py-3 rounded-xl font-display font-semibold no-underline inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Schedule a Call
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}