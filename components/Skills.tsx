'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Brain, 
  Megaphone, 
  Lightbulb, 
  Code, 
  Users, 
  BarChart3,
  Target,
  Palette,
  Rocket,
  Shield,
  Globe,
  Zap,
  Star,
  Award,
  TrendingUp,
  Heart,
  Eye
} from 'lucide-react'

export function Skills() {
  const coreCompetencies = [
    {
      category: "Strategic Leadership",
      icon: Brain,
      color: "strategic",
      description: "Visionary thinking and strategic execution across complex business landscapes",
      skills: [
        { name: "Strategic Planning", level: 95, years: "9+" },
        { name: "Business Development", level: 92, years: "8+" },
        { name: "Cross-functional Leadership", level: 94, years: "7+" },
        { name: "Stakeholder Management", level: 96, years: "9+" }
      ],
      achievements: ["Led 15+ successful product launches", "Managed 400M+ user ecosystem"],
      gradient: "from-pink-500 to-rose-600"
    },
    {
      category: "Marketing Excellence",
      icon: Megaphone,
      color: "marketing",
      description: "Comprehensive marketing expertise from brand building to performance optimization",
      skills: [
        { name: "Digital Marketing", level: 98, years: "9+" },
        { name: "Brand Development", level: 94, years: "6+" },
        { name: "Content Strategy", level: 96, years: "8+" },
        { name: "Campaign Management", level: 93, years: "7+" }
      ],
      achievements: ["Built JioHealthHub brand from scratch", "Managed 15+ mobile apps marketing"],
      gradient: "from-orange-500 to-amber-600"
    },
    {
      category: "Innovation & Design",
      icon: Lightbulb,
      color: "innovation",
      description: "Creative problem-solving with cutting-edge design thinking and innovation",
      skills: [
        { name: "Product Innovation", level: 91, years: "6+" },
        { name: "UX Strategy", level: 88, years: "5+" },
        { name: "Design Thinking", level: 92, years: "7+" },
        { name: "AR/VR Development", level: 85, years: "3+" }
      ],
      achievements: ["Created 'Clinic-On-The-Go' innovation", "AR/VR healthcare experiences"],
      gradient: "from-violet-500 to-purple-600"
    },
    {
      category: "Technical Proficiency",
      icon: Code,
      color: "technical",
      description: "Modern technology stack mastery with data-driven implementation",
      skills: [
        { name: "Digital Platforms", level: 89, years: "8+" },
        { name: "Marketing Automation", level: 87, years: "6+" },
        { name: "CMS & Development", level: 83, years: "5+" },
        { name: "Integration Systems", level: 85, years: "4+" }
      ],
      achievements: ["Built responsive prototypes", "Designed smart financial calculators"],
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      category: "Team Leadership",
      icon: Users,
      color: "leadership",
      description: "Inspiring and guiding high-performing cross-functional teams to excellence",
      skills: [
        { name: "Team Management", level: 97, years: "8+" },
        { name: "Mentoring", level: 94, years: "7+" },
        { name: "Culture Building", level: 91, years: "6+" },
        { name: "Change Management", level: 89, years: "5+" }
      ],
      achievements: ["Led global agency teams", "Managed internal events & summits"],
      gradient: "from-emerald-500 to-green-600"
    },
    {
      category: "Analytics & Insights",
      icon: BarChart3,
      color: "analytics",
      description: "Data-driven decision making with advanced analytics and performance optimization",
      skills: [
        { name: "Data Analysis", level: 90, years: "7+" },
        { name: "Performance Optimization", level: 92, years: "8+" },
        { name: "Market Research", level: 98, years: "6+" },
        { name: "ROI Analysis", level: 86, years: "5+" }
      ],
      achievements: ["Optimized lead generation", "Data-driven growth strategies"],
      gradient: "from-red-500 to-rose-600"
    }
  ]

  const specializations = [
    { name: "Product Marketing", icon: Target, proficiency: "Expert", color: "text-pink-400" },
    { name: "Brand Strategy", icon: Palette, proficiency: "Expert", color: "text-orange-400" },
    { name: "Go-To-Market", icon: Rocket, proficiency: "Expert", color: "text-violet-400" },
    { name: "Health-Tech Innovation", icon: Shield, proficiency: "Advanced", color: "text-cyan-400" },
    { name: "Digital Transformation", icon: Globe, proficiency: "Expert", color: "text-emerald-400" },
    { name: "Building Responsive Apps & Platforms", icon: Code, proficiency: "Expert", color: "text-purple-400" },
    { name: "Growth Marketing", icon: TrendingUp, proficiency: "Expert", color: "text-red-400" }
  ]

  const industries = [
    { name: "Telecom", experience: "2+ years", impact: "400M+ users", color: "bg-blue-900/30 text-blue-300 border border-blue-500/30" },
    { name: "Health-Tech", experience: "3+ years", impact: "Healthcare innovation", color: "bg-green-900/30 text-green-300 border border-green-500/30" },
    { name: "Fin-Tech", experience: "2+ years", impact: "Financial solutions", color: "bg-purple-900/30 text-purple-300 border border-purple-500/30" },
    { name: "Digital Payments", experience: "1+ year", impact: "Payment ecosystems", color: "bg-orange-900/30 text-orange-300 border border-orange-500/30" },
    { name: "Ed-Tech", experience: "1+ year", impact: "Educational platforms", color: "bg-cyan-900/30 text-cyan-300 border border-cyan-500/30" },
    { name: "Advertising", experience: "3+ years", impact: "Global campaigns", color: "bg-pink-900/30 text-pink-300 border border-pink-500/30" },
    { name: "Facility Management", experience: "2+ years", impact: "Smart infrastructure", color: "bg-slate-900/30 text-slate-300 border border-slate-500/30" },
    { name: "Air Fiber", experience: "1+ year", impact: "Network infrastructure", color: "bg-sky-900/30 text-sky-300 border border-sky-500/30" },
    { name: "Service Assist Platforms", experience: "2+ years", impact: "Service optimization", color: "bg-teal-900/30 text-teal-300 border border-teal-500/30" },
    { name: "Sales Assist Platforms", experience: "2+ years", impact: "Sales enablement", color: "bg-rose-900/30 text-rose-300 border border-rose-500/30" },
    { name: "Superapp Building", experience: "1+ year", impact: "Ecosystem platforms", color: "bg-indigo-900/30 text-indigo-300 border border-indigo-500/30" },
    { name: "Corporate Communications", experience: "4+ years", impact: "Internal alignment", color: "bg-amber-900/30 text-amber-300 border border-amber-500/30" },
    { name: "Employee Branding", experience: "3+ years", impact: "Culture building", color: "bg-lime-900/30 text-lime-300 border border-lime-500/30" },
    { name: "B2C SaaS", experience: "3+ years", impact: "Consumer platforms", color: "bg-emerald-900/30 text-emerald-300 border border-emerald-500/30" },
    { name: "B2B SaaS", experience: "2+ years", impact: "Business solutions", color: "bg-violet-900/30 text-violet-300 border border-violet-500/30" },
    { name: "E-commerce", experience: "2+ years", impact: "Digital commerce", color: "bg-fuchsia-900/30 text-fuchsia-300 border border-fuchsia-500/30" },
    { name: "AI Cloud", experience: "1+ year", impact: "AI infrastructure", color: "bg-red-900/30 text-red-300 border border-red-500/30" },
    { name: "HR Management Platform", experience: "2+ years", impact: "Workforce solutions", color: "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30" }
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dark Background with Particles */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          animate={{
            background: [
              'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, rgba(10, 10, 10, 1) 70%)',
              'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, rgba(10, 10, 10, 1) 70%)',
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.1) 0%, rgba(10, 10, 10, 1) 70%)',
              'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, rgba(10, 10, 10, 1) 70%)'
            ]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full opacity-20 ${
              i % 6 === 0 ? 'bg-pink-400' :
              i % 6 === 1 ? 'bg-orange-400' :
              i % 6 === 2 ? 'bg-violet-400' :
              i % 6 === 3 ? 'bg-cyan-400' :
              i % 6 === 4 ? 'bg-emerald-400' : 'bg-red-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.6, 0.2],
              x: [0, Math.sin(i) * 50],
              y: [0, Math.cos(i) * 50],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/50 border border-emerald-500/30 mb-8"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16,185,129,0.2)"
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(16,185,129,0.5)",
                  "0 0 20px rgba(16,185,129,0.8)",
                  "0 0 10px rgba(16,185,129,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-sm text-emerald-300 tracking-wider font-medium">
              CORE COMPETENCIES & EXPERTISE
            </span>
            <Star className="w-4 h-4 text-emerald-400" />
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-display font-semibold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Professional</span>
            <br />
            <span className="text-white">Mastery</span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto font-body leading-relaxed">
            Nine years of strategic leadership across diverse industries, mastering the art of 
            transforming complex challenges into breakthrough solutions that drive measurable impact 
            and sustainable growth.
          </p>
        </motion.div>

        {/* Core Competencies Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {coreCompetencies.map((competency, index) => (
            <motion.div
              key={competency.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              viewport={{ once: true }}
            >
              <Card className="neuro-base border border-purple-500/20 p-8 h-full hover:border-purple-500/40 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${competency.gradient} text-white shadow-lg`}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <competency.icon className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-display font-semibold text-${competency.color} mb-2`}>
                      {competency.category}
                    </h3>
                    <p className="text-sm text-white/60 font-body leading-relaxed">
                      {competency.description}
                    </p>
                  </div>
                </div>

                {/* Skills Progress */}
                <div className="space-y-4 mb-6">
                  {competency.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white/80 font-body">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                            {skill.years}
                          </Badge>
                          <span className={`text-xs font-semibold text-${competency.color}`}>
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${competency.gradient} rounded-full relative`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: index * 0.1 + skillIndex * 0.1,
                              ease: [0.76, 0, 0.24, 1]
                            }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/30 rounded-full"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: skillIndex * 0.2
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {competency.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        className="flex items-start gap-2 text-xs text-white/50 font-body"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + achIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-1 h-1 rounded-full bg-${competency.color} mt-2 flex-shrink-0`} />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Specializations Section - Concise Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-display font-semibold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Specialized Expertise</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.08, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                }}
              >
                <Card className="neuro-base border border-purple-500/20 p-4 h-full hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="flex-shrink-0 p-2 rounded-lg bg-gray-800/50 border border-gray-600/30"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <spec.icon className={`w-5 h-5 ${spec.color}`} />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-white text-sm truncate">
                        {spec.name}
                      </h4>
                      <Badge 
                        className={`mt-1 text-xs ${spec.proficiency === 'Expert' ? 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30' : 'bg-blue-900/30 text-blue-300 border-blue-500/30'}`}
                      >
                        {spec.proficiency}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-display font-semibold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Industry Expertise</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                }}
              >
                <Card className="neuro-base border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${industry.color} mb-3`}>
                    {industry.name}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Eye className="w-4 h-4" />
                      <span>{industry.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
                      <Zap className="w-4 h-4" />
                      <span>{industry.impact}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="neuro-base border border-purple-500/20 p-12">
            <motion.div
              className="inline-flex p-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-white mb-6 shadow-2xl"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 8px 32px rgba(16, 185, 129, 0.3)",
                  "0 12px 40px rgba(16, 185, 129, 0.5)",
                  "0 8px 32px rgba(16, 185, 129, 0.3)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="w-8 h-8" />
            </motion.div>
            <h3 className="text-3xl font-display font-semibold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Passion-Driven Excellence</span>
            </h3>
            <p className="text-lg text-white/70 font-body max-w-3xl mx-auto leading-relaxed">
              Every project is an opportunity to push boundaries, create meaningful impact, and 
              transform innovative ideas into tangible results. With a proven track record across 
              8+ industries and 400M+ users reached, I bring both strategic vision and tactical 
              execution to drive exceptional outcomes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { number: "500M+", label: "Users Impacted", icon: Users },
                { number: "20+", label: "Mobile Apps/WebApps", icon: Code },
                { number: "8+", label: "Industries", icon: Globe },
                { number: "8+", label: "Years Experience", icon: Award }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                  }}
                >
                  <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/60 font-body">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}