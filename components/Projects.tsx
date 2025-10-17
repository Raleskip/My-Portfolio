'use client'

import { motion } from 'motion/react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Projects() {
  const projects = [
    {
      title: "AI-Powered Customer Journey Optimizer",
      description: "Revolutionary machine learning platform that predicts customer behavior and optimizes touchpoints in real-time, resulting in 45% improvement in conversion rates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      tags: ["AI/ML", "Python", "TensorFlow", "React", "AWS"],
      category: "AI Innovation",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Immersive AR Brand Experience",
      description: "Next-generation augmented reality marketing campaign that creates interactive 3D brand experiences, increasing engagement by 300% across mobile platforms.",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop&crop=center",
      tags: ["AR/VR", "Unity", "WebXR", "Three.js", "Mobile"],
      category: "Future Tech",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Predictive Content Personalization Engine",
      description: "Advanced AI system that generates personalized content recommendations using natural language processing and user behavior analysis.",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop&crop=center",
      tags: ["NLP", "Personalization", "Node.js", "MongoDB", "Redis"],
      category: "Marketing AI",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      title: "Blockchain-Based Loyalty Platform",
      description: "Decentralized customer loyalty program using smart contracts and NFT rewards, creating new paradigms for brand engagement and customer retention.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&crop=center",
      tags: ["Blockchain", "Smart Contracts", "NFTs", "Web3", "Solidity"],
      category: "Future Tech",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Voice Commerce AI Assistant",
      description: "Conversational AI that transforms voice interactions into seamless shopping experiences, integrating with major e-commerce platforms.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop&crop=center",
      tags: ["Voice AI", "NLP", "E-commerce", "Alexa Skills", "Google Actions"],
      category: "AI Innovation",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      title: "Real-Time Marketing Analytics Dashboard",
      description: "Comprehensive analytics platform that provides instant insights across all marketing channels with predictive modeling and automated reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      tags: ["Analytics", "React", "D3.js", "Python", "Machine Learning"],
      category: "Marketing Tech",
      gradient: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gradient-to-b from-accent/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Innovative projects that push the boundaries of what's possible in marketing,
            technology, and artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/20 hover:bg-card/80 transition-all duration-500 h-full">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium`}>
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline"
                          className="text-xs hover:bg-accent/50 transition-colors duration-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1 group/button"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-2 group-hover/button:scale-110 transition-transform duration-200" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="px-3"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="px-3"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            These represent just a fraction of the innovative projects I've worked on. 
            Each project pushes the boundaries of what's possible in modern marketing technology.
          </p>
          <Button size="lg" className="px-8 py-6 text-lg">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}