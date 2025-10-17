'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Calendar, MapPin, ArrowRight, Building2, TrendingUp, Sparkles, Users, Award, Zap, Target, Lightbulb, Star } from 'lucide-react'

export function ProfessionalJourney() {
  const experiences = [
    {
      company: "Jio Platforms Limited (JPL)",
      role: "Product Marketing Manager",
      period: "July 2024 — Present",
      location: "Mumbai, India",
      description: "Managing Central Product Marketing and user experience gamification for Jio Consumer Partner Platforms and mobile apps. Leading strategic initiatives across 15+ applications including MyJio, JioMart, JioFinance, JioOnePay, JioCare, JioFiber, Jio Network, Jio AI Cloud, JioHealthHub, Little Nest, Peoplefirst, Jio Partner World, Helios, Jio Buzz, and Jio Sense.",
      impact: "400M+ Users Across Platforms",
      impactColor: "text-pink-600",
      technologies: ["MyJio", "JioMart", "JioFinance", "JioOnePay", "JioCare", "JioFiber", "Jio AI Cloud", "Product Marketing", "UX Gamification"],
      current: true,
      achievements: [
        "Central product marketing for 15+ mobile applications",
        "UI/UX Excellence",
        "User experience gamification strategies",
        "Cross-platform partner ecosystem management"
      ],
      gradient: "from-pink-500 to-rose-600",
      cardColor: "strategic"
    },
    {
      company: "JioHealthHub",
      role: "Marketing Manager",
      period: "July 2022 — September 2024",
      location: "Navi Mumbai, India",
      description: "Led comprehensive design initiatives and built the brand identity from ground up. Conducted extensive product R&D for Health-Tech segment and pioneered market research for Immersive Technology in Healthcare. Created breakthrough AR/VR and mixed reality experiences, including the innovative 'Clinic-On-The-Go kit' for healthcare accessibility.",
      impact: "Health-Tech Innovation Pioneer",
      impactColor: "text-orange-600",
      technologies: ["Brand Identity", "AR/VR Healthcare", "SEO", "Paid Marketing", "Organic Growth", "Mixed Reality", "Jio Design System"],
      achievements: [
        "Built complete brand identity and design system",
        "Created groundbreaking AR/VR healthcare experiences",
        "Developed 'Clinic-On-The-Go kit' innovation",
        "Led business development for G20, IMC, and Manah Wellness",
        "Managed internal events and partner summits"
      ],
      gradient: "from-orange-500 to-amber-600",
      cardColor: "marketing"
    },
    {
      company: "ACL Digital",
      role: "Digital Communications Manager",
      period: "September 2021 — July 2022",
      location: "Mumbai, India",
      description: "Developed and implemented comprehensive digital strategies while creating extensive content libraries. Led the strategic re-branding initiative for JioHealthHub and established thought leadership in the healthcare industry. Orchestrated multiple digital campaigns including 'Care Before Cure', Covid Pass, and awareness initiatives.",
      impact: "Digital Transformation Leader",
      impactColor: "text-violet-600",
      technologies: ["Digital Strategy", "Content Library", "Healthcare Content", "Re-branding", "Thought Leadership"],
      achievements: [
        "Led complete re-branding initiative for JioHealthHub",
        "Established thought leadership in healthcare industry",
        "Created comprehensive digital content libraries",
        "Launched 'Care Before Cure' and Covid Pass campaigns"
      ],
      gradient: "from-violet-500 to-purple-600",
      cardColor: "innovation"
    },
    {
      company: "Ortium Financial Services Pvt Ltd",
      role: "Head of Digital",
      period: "April 2020 — September 2021",
      location: "Mumbai, India",
      description: "Spearheaded digital transformation by building comprehensive digital assets and optimizing lead generation strategies. Designed intelligent financial calculators for retirement planning, marriage expense planning, and child's education. Developed data-driven marketing campaigns and built the complete web application for Ortium.",
      impact: "Digital Asset Development",
      impactColor: "text-cyan-600",
      technologies: ["Smart Calculators", "Digital Marketing", "Web Development", "Lead Generation", "Financial Planning Tools"],
      achievements: [
        "Led complete digital transformation initiative",
        "Designed smart financial planning calculators",
        "Built comprehensive web application platform",
        "Optimized lead generation and conversion strategies"
      ],
      gradient: "from-cyan-500 to-blue-600",
      cardColor: "technical"
    },
    {
      company: "Surajkaeley",
      role: "Head of Content",
      period: "November 2019 — April 2020",
      location: "Mumbai, India",
      description: "Developed comprehensive content strategies and spearheaded the creation of 'The Sales Accelerator' flagship course for financial services professionals. Created and curated specialized online courses in B2B Sales, B2C Sales, and Investment strategies. Managed complete content lifecycle from scripting to filming and editing.",
      impact: "Educational Content Innovation",
      impactColor: "text-emerald-600",
      technologies: ["Content Strategy", "E-Learning", "B2B Sales", "B2C Sales", "Investment Strategies", "Video Production"],
      achievements: [
        "Created 'The Sales Accelerator' flagship course",
        "Developed comprehensive B2B and B2C sales curricula",
        "Managed complete video production pipeline",
        "Utilized data-driven optimization for course content"
      ],
      gradient: "from-emerald-500 to-green-600",
      cardColor: "leadership"
    },
    {
      company: "FCB Interface",
      role: "Visualizer",
      period: "October 2018 — November 2019",
      location: "Mumbai, India",
      description: "Designed impactful ad campaigns and ensured effective brand communication through strategic design concepts. Delivered high-impact pitch work that contributed significantly to securing new business opportunities. Developed comprehensive storyboards and animatics to bring creative concepts to life for global brands.",
      impact: "Creative Brand Communication",
      impactColor: "text-red-600",
      technologies: ["Brand Communication", "Ad Campaigns", "Storyboards", "Animatics", "Pitch Development"],
      achievements: [
        "Delivered high-impact pitch work for new business",
        "Created strategic design concepts for global brands",
        "Developed comprehensive visual storytelling frameworks",
        "Contributed to significant business growth through creative solutions"
      ],
      gradient: "from-red-500 to-rose-600",
      cardColor: "analytics"
    },
    {
      company: "J. Walter Thompson Worldwide",
      role: "Graphic Design Intern",
      period: "March 2018 — June 2018",
      location: "Mumbai, India",
      description: "Designed visually engaging content across various digital marketing channels for prestigious global brands. Managed comprehensive social media presence for FOREVERMARK, AMAZON, FURA, and NASSCOM. Documented internal events through professional photography and cinematography, contributing to the agency's creative portfolio.",
      impact: "Multi-Brand Content Creation",
      impactColor: "text-pink-600",
      technologies: ["Digital Marketing", "Social Media Management", "Photography", "Cinematography", "Brand Content"],
      achievements: [
        "Managed social media for global brands including AMAZON",
        "Created engaging content across multiple digital channels",
        "Documented high-profile internal events",
        "Developed expertise in brand-specific content strategies"
      ],
      gradient: "from-pink-500 to-rose-600",
      cardColor: "strategic"
    },
    {
      company: "Shilpin Consulting Pvt. Ltd.",
      role: "Content Producer",
      period: "July 2017 — May 2018",
      location: "Mumbai, India",
      description: "Developed engaging, user-centric content for websites and applications, working closely with UI/UX designers to ensure seamless user experiences. Conceptualized innovative content strategies aligned with business goals and developed compelling product narratives and user onboarding experiences for clients including Kotak Mahindra.",
      impact: "User-Centered Content Design",
      impactColor: "text-orange-600",
      technologies: ["Content Strategy", "UX Writing", "Product Narratives", "User Onboarding", "Website Content"],
      achievements: [
        "Developed user-centric content for major financial brands",
        "Collaborated effectively with UI/UX design teams",
        "Created compelling product narratives and onboarding flows",
        "Aligned content strategies with business objectives"
      ],
      gradient: "from-orange-500 to-amber-600",
      cardColor: "marketing"
    },
    {
      company: "AIESEC",
      role: "University Relations Manager",
      period: "April 2016 — November 2016",
      location: "Navi Mumbai, India",
      description: "Facilitated transformative global exchange programs for students, creating life-changing international opportunities. Crafted and implemented comprehensive communication strategies for key stakeholders while leading cross-cultural events. Built strong partnerships with university officials as the primary point of contact for academic relations.",
      impact: "Global Community Building",
      impactColor: "text-violet-600",
      technologies: ["Cross-Cultural Communication", "Event Management", "Stakeholder Relations", "Partnership Building"],
      achievements: [
        "Facilitated global exchange programs for students",
        "Built strategic partnerships with university officials",
        "Led successful cross-cultural events and initiatives",
        "Developed comprehensive stakeholder communication strategies"
      ],
      gradient: "from-violet-500 to-purple-600",
      cardColor: "innovation"
    }
  ]

  return (
    <section id="journey" className="py-24 bg-gradient-modern-4 relative overflow-hidden transform-3d">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          {[...Array(25)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="3"
              fill="url(#journey3DGradient)"
              animate={{
                r: [2, 6, 2],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          <defs>
            <radialGradient id="journey3DGradient">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative preserve-3d">
        {/* Enhanced Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border-2 border-emerald-400/30 mb-8"
            whileHover={{ 
              borderColor: "rgba(16,185,129,0.4)",
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(16,185,129,0.15)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(16,185,129,0.5)",
                  "0 0 20px rgba(16,185,129,0.8)",
                  "0 0 10px rgba(16,185,129,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-sm text-emerald-400 tracking-wider font-medium">
              9+ YEARS OF STRATEGIC LEADERSHIP
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </motion.div>
          
          <h2 className="heading-primary text-white mb-6">
            <span className="kinetic-neon-pulse brand-text-dark">Professional</span>
            <br />
            <span className="text-white/95">Journey</span>
          </h2>
          <p className="body-elegant max-w-4xl mx-auto">
            From strategic leadership at global tech giants to pioneering innovations in health-tech, 
            my journey spans diverse industries - building products, brands, and experiences 
            that connect with millions while driving meaningful business transformation through 
            creative excellence and strategic vision.
          </p>
        </motion.div>

        {/* 3D Timeline Container */}
        <div className="relative timeline-3d p-8">
          {/* Enhanced Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-2 bg-gradient-to-b from-pink-400 via-orange-500 via-violet-500 via-cyan-500 via-emerald-500 to-red-500 opacity-20 rounded-full timeline-3d" />
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-2 bg-gradient-to-b from-pink-500 via-orange-600 via-violet-600 via-cyan-600 via-emerald-600 to-red-600 opacity-60 rounded-full animate-pulse-3d"
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
              boxShadow: [
                "0 0 20px rgba(16,185,129,0.3)",
                "0 0 30px rgba(139,92,246,0.4)",
                "0 0 20px rgba(249,115,22,0.3)",
                "0 0 20px rgba(16,185,129,0.3)"
              ]
            }}
            transition={{ 
              backgroundPosition: { duration: 15, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 6, repeat: Infinity }
            }}
            style={{ backgroundSize: "100% 200%" }}
          />

          {/* Experience Stories */}
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${index}`}
                initial={{ opacity: 0, x: -50, rotateY: -20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.76, 0, 0.24, 1]
                }}
                viewport={{ once: true }}
                className="relative pl-20 group preserve-3d"
              >
                {/* Enhanced Journey Marker */}
                <div className="absolute left-6 top-10">
                  <motion.div 
                    className={`relative w-8 h-8 rounded-full border-4 border-white bg-gradient-to-r ${experience.gradient} shadow-2xl preserve-3d`}
                    whileHover={{ 
                      scale: 1.6,
                      rotateY: 20,
                      rotateX: 15,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {experience.current && (
                      <>
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-pink-400 opacity-70"
                          animate={{ 
                            scale: [1, 2.5, 1], 
                            opacity: [0.7, 0, 0.7],
                            rotateZ: [0, 360]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute -inset-3 rounded-full border-2 border-pink-400/60"
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 3, repeat: Infinity }
                          }}
                        />
                        <motion.div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                          <Star className="w-3 h-3 text-pink-500" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Enhanced Experience Card */}
                <motion.div
                  whileHover={{ 
                    y: -12, 
                    scale: 1.02,
                    rotateY: 3,
                    rotateX: 2,
                    z: 30
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="preserve-3d"
                >
                  <Card className={`skill-card-${experience.cardColor} p-8 timeline-item-3d relative overflow-hidden group`}>
                    {/* Animated Background Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${experience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    />

                    <div className="relative preserve-3d">
                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              className={`p-3 rounded-xl bg-gradient-to-r ${experience.gradient} text-white shadow-lg`}
                              whileHover={{ 
                                scale: 1.1, 
                                rotateY: 15,
                                boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Building2 className="w-5 h-5" />
                            </motion.div>
                            <div>
                              <h3 className="text-2xl font-display font-semibold text-white mb-1">
                                {experience.company}
                              </h3>
                              {experience.current && (
                                <motion.div
                                  className="inline-flex items-center gap-2 mt-1"
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Badge className="bg-emerald-500/20 border-emerald-400/50 text-emerald-400 text-xs font-medium">
                                    <motion.span
                                      animate={{ opacity: [1, 0.6, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      Current Role
                                    </motion.span>
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                          </div>
                          
                          <h4 className="text-xl text-white/90 font-medium mb-4 font-display">
                            {experience.role}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 font-body">
                            <motion.div 
                              className="flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Calendar className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium text-white/80">{experience.period}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              <MapPin className="w-4 h-4 text-emerald-400" />
                              <span className="text-white/70">{experience.location}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Award className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">
                                {experience.impact}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Description */}
                      <motion.p 
                        className="body-refined mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {experience.description}
                      </motion.p>

                      {/* Key Achievements */}
                      {experience.achievements && (
                        <div className="mb-8">
                          <h5 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                            <Zap className="w-4 h-4" />
                            Key Achievements
                          </h5>
                          <div className="grid md:grid-cols-2 gap-3">
                            {experience.achievements.map((achievement, achIndex) => (
                              <motion.div
                                key={achIndex}
                                className="flex items-start gap-3 p-3 rounded-lg glass-dark border border-white/20"
                                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ 
                                  delay: index * 0.1 + achIndex * 0.1,
                                  type: "spring",
                                  stiffness: 200
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                  scale: 1.02,
                                  backgroundColor: "rgba(16,185,129,0.1)",
                                  borderColor: "rgba(16,185,129,0.4)"
                                }}
                              >
                                <motion.div 
                                  className={`w-2 h-2 rounded-full ${experience.gradient} bg-gradient-to-r mt-2 flex-shrink-0`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: achIndex * 0.2 }}
                                />
                                <span className="text-sm text-white/80 font-body leading-relaxed">
                                  {achievement}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies & Skills */}
                      <div>
                        <h5 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                          <Lightbulb className="w-4 h-4" />
                          Technologies & Expertise
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                              transition={{ 
                                delay: index * 0.1 + techIndex * 0.05,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                              }}
                              viewport={{ once: true }}
                              whileHover={{ 
                                scale: 1.1,
                                rotateY: 5,
                                boxShadow: "0 0 20px rgba(16,185,129,0.3)",
                                backgroundColor: "rgba(16,185,129,0.1)"
                              }}
                              className="preserve-3d"
                            >
                              <Badge 
                                variant="outline"
                                className="glass-dark border-white/30 text-white/80 hover:bg-emerald-400/20 hover:border-emerald-400/50 hover:text-emerald-400 transition-all duration-300 text-xs font-body"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Flow Connection */}
                {index < experiences.length - 1 && (
                  <motion.div
                    className="absolute left-7 -bottom-10 text-emerald-400/80"
                    initial={{ opacity: 0, y: -20, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, 12, 0],
                        rotateX: [0, 15, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="preserve-3d"
                    >
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Timeline End Star */}
          <motion.div
            className="absolute left-6 bottom-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.5
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-500 flex items-center justify-center border-4 border-white shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(16,185,129,0.5)",
                  "0 0 30px rgba(6,182,212,0.6)",
                  "0 0 25px rgba(245,158,11,0.5)",
                  "0 0 20px rgba(16,185,129,0.5)"
                ],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.2,
                rotateY: 20,
                rotateX: 15
              }}
            >
              <Star className="w-6 h-6 text-white fill-current" />
            </motion.div>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-dark border-2 border-cyan-400/30 mb-8"
              whileHover={{ 
                borderColor: "rgba(6,182,212,0.4)",
                scale: 1.05,
                rotateY: 5
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(6,182,212,0.5)",
                    "0 0 20px rgba(6,182,212,0.8)",
                    "0 0 10px rgba(6,182,212,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="text-sm text-cyan-400 tracking-wider font-medium">
                ACADEMIC FOUNDATION
              </span>
              <Award className="w-4 h-4 text-cyan-400" />
            </motion.div>
            
            <h2 className="heading-primary text-white mb-6">
              <span className="kinetic-neon-pulse brand-text-dark">Education</span>
            </h2>
            <p className="body-elegant max-w-3xl mx-auto">
              Academic foundations in digital communication and mass media that shaped my expertise 
              in strategic marketing, creative storytelling, and innovative brand experiences.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                degree: "Introduction to Conversational Interfaces",
                field: "Digital Communication and Media/Multimedia",
                institution: "University of the Arts London",
                location: "London, United Kingdom",
                type: "Specialized Program",
                gradient: "from-cyan-500 to-blue-600",
                icon: Lightbulb,
                color: "text-cyan-400"
              },
              {
                degree: "Bachelor's Degree in Mass Media",
                field: "Mass Communication/Media Studies",
                institution: "Pillai College of Arts, Commerce and Science",
                location: "Mumbai, India",
                type: "Undergraduate Degree",
                gradient: "from-emerald-500 to-green-600",
                icon: Award,
                color: "text-emerald-400"
              }
            ].map((education, index) => (
              <motion.div
                key={education.institution}
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.76, 0, 0.24, 1]
                }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    rotateY: 2
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="preserve-3d"
                >
                  <Card className="neuro-base p-8 timeline-item-3d relative overflow-hidden group">
                    {/* Animated Background Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${education.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    />

                    <div className="relative preserve-3d">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              className={`p-3 rounded-xl bg-gradient-to-r ${education.gradient} text-white shadow-lg`}
                              whileHover={{ 
                                scale: 1.1, 
                                rotateY: 15
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <education.icon className="w-5 h-5" />
                            </motion.div>
                            <div>
                              <h3 className="text-2xl font-display font-semibold text-white mb-1">
                                {education.institution}
                              </h3>
                              <div className={`text-sm ${education.color} font-medium tracking-wider uppercase`}>
                                {education.type}
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-xl text-white/90 font-medium mb-2 font-display">
                            {education.degree}
                          </h4>
                          
                          <p className="body-refined mb-4">
                            {education.field}
                          </p>
                          
                          <div className="flex items-center gap-2 text-sm text-white/70 font-body">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/70">{education.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-emerald-400/30"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "9+", label: "Years Experience", description: "Strategic Leadership", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/20" },
              { number: "9", label: "Companies", description: "Diverse Industries", icon: Building2, color: "text-purple-400", bg: "bg-purple-500/20" },
              { number: "400M+", label: "Users Impacted", description: "Through Jio Ecosystem", icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/20" },
              { number: "15+", label: "Apps Managed", description: "At Current Role", icon: Target, color: "text-amber-400", bg: "bg-amber-500/20" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group neuro-base p-8 rounded-2xl"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  rotateY: 10,
                  z: 20
                }}
              >
                <motion.div
                  className={`w-16 h-16 ${stat.bg} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotateX: 15, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <motion.div 
                  className={`text-4xl font-display font-bold ${stat.color} mb-2`}
                  animate={{
                    textShadow: [
                      "0 0 8px rgba(16,185,129,0.3)",
                      "0 0 16px rgba(139,92,246,0.4)",
                      "0 0 8px rgba(249,115,22,0.3)",
                      "0 0 8px rgba(16,185,129,0.3)"
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-emerald-400 font-medium mb-1 uppercase tracking-wider font-body">
                  {stat.label}
                </div>
                <div className="text-xs text-white/70 font-body">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20 neuro-base p-12 rounded-3xl relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-violet-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          />
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          />
          
          <motion.div
            className="inline-flex p-6 rounded-full bg-gradient-to-r from-emerald-400 to-violet-500 text-white mb-6 shadow-2xl"
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
            <Sparkles className="w-8 h-8" />
          </motion.div>
          
          <h3 className="text-4xl font-display font-semibold text-white mb-6">
            <span className="kinetic-neon-pulse brand-text-dark">Ready for the Next Challenge</span>
          </h3>
          <p className="body-elegant max-w-3xl mx-auto">
            With 9+ years of proven success in strategic marketing leadership, product innovation, and 
            cross-functional team management across diverse industries, I'm passionate about creating 
            the future of digital experiences that truly matter. Let's build something extraordinary together.
          </p>
        </motion.div>
      </div>
    </section>
  )
}