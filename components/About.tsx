'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Brain, Rocket, Target, Zap } from 'lucide-react'

export function About() {
  const features = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Leveraging machine learning and artificial intelligence to create smarter marketing solutions and predictive analytics."
    },
    {
      icon: Target,
      title: "Strategic Marketing",
      description: "Data-driven marketing strategies that combine traditional wisdom with cutting-edge digital transformation."
    },
    {
      icon: Rocket,
      title: "Future Technology",
      description: "Exploring emerging technologies like AR/VR, blockchain, and IoT to create tomorrow's marketing experiences."
    },
    {
      icon: Zap,
      title: "Performance Driven",
      description: "Optimizing every touchpoint for maximum ROI through advanced analytics and continuous experimentation."
    }
  ]

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-background to-emerald-950/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-gradient-neon">About My Vision</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-body">
            At the intersection of marketing, technology, and artificial intelligence lies 
            the future of human connection. I'm exploring this frontier to create 
            experiences that are not just effective, but <span className="text-emerald-400 font-semibold">transformative</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/80 transition-all duration-300 group">
                <motion.div
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </motion.div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "5+", label: "Years of Innovation" },
            { number: "50+", label: "AI Projects" },
            { number: "100+", label: "Marketing Campaigns" },
            { number: "∞", label: "Possibilities Ahead" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}