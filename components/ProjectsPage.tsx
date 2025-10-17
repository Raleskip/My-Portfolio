import { useState, useCallback, useMemo, useEffect } from 'react'
import { toast } from 'sonner@2.0.3'
import { motion, AnimatePresence } from 'motion/react'
import { ExternalLink, Github, Eye, Code, Smartphone, Globe, Zap, Users, TrendingUp, ChevronLeft, ChevronRight, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'

// Import components and assets from Figma imports
import Home1 from '../imports/Home1'
import ProductLogo1 from '../imports/ProductLogo-7-39195'
import Behance31 from '../imports/Behance31'

// Custom cover components
const PatientPulseCover = () => (
  <div className="w-full h-full bg-black flex items-center justify-center p-6">
    <img 
      src={patientPulseLogo} 
      alt="Patient Pulse Logo"
      className="max-w-full max-h-full object-contain"
      style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))' }}
    />
  </div>
)

const SalesAcceleratorCover = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    console.log('[SalesAccelerator] Cover loaded successfully')
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    console.error('[SalesAccelerator] Cover failed to load, showing enhanced fallback')
  }, [])

  // Professional Fallback Design
  if (imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/20"
            animate={{
              background: [
                'radial-gradient(ellipse at 30% 70%, rgba(16, 185, 129, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(20, 184, 166, 0.25) 0%, transparent 50%)',
                'radial-gradient(ellipse at 70% 70%, rgba(20, 184, 166, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 30% 30%, rgba(16, 185, 129, 0.25) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Professional Content */}
        <div className="text-center space-y-6 relative z-10 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
            >
              📈
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3"
          >
            <h4 className="text-3xl font-display font-bold text-white tracking-tight">
              The Sales
            </h4>
            <h4 className="text-3xl font-display font-bold text-emerald-400 tracking-tight">
              Accelerator
            </h4>
            
            <p className="text-white/60 text-sm font-body mt-4 max-w-xs mx-auto leading-relaxed">
              Advanced sales training platform and comprehensive business acceleration system
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative overflow-hidden group cursor-pointer">
      {/* Enhanced Loading State */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex items-center justify-center z-20"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 mx-auto border-3 border-emerald-500 border-t-transparent rounded-full"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 text-sm font-mono"
              >
                Loading Sales Accelerator...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Professional Image */}
      <motion.img 
        src={salesAcceleratorCover} 
        alt="The Sales Accelerator - Advanced sales training platform and comprehensive business acceleration system"
        className={`w-full h-full object-cover transition-all duration-700 ${
          imageLoaded 
            ? 'opacity-100 scale-100 group-hover:scale-110' 
            : 'opacity-0 scale-95'
        }`}
        style={{ 
          filter: imageLoaded 
            ? 'brightness(1.05) contrast(1.08) saturate(1.1)' 
            : 'brightness(0.8) contrast(0.9)',
          imageRendering: 'optimizeQuality',
          objectPosition: 'center center'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        draggable={false}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ 
          scale: imageLoaded ? 1 : 0.95,
          opacity: imageLoaded ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Professional Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Enhanced Interactive Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
        whileHover={{
          background: [
            'radial-gradient(ellipse at 30% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 70%, rgba(20, 184, 166, 0.15) 0%, transparent 60%)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Quality Indicator */}
      {imageLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </motion.div>
      )}
    </div>
  )
}

const CommunicationPlaybooksCover = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  
  const maxRetries = 3
  const baseDelay = 1000

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    console.log('[CommunicationPlaybooks] Image loaded successfully')
  }, [])

  const handleImageError = useCallback(() => {
    if (retryCount < maxRetries) {
      console.warn(`[CommunicationPlaybooks] Image load failed, retrying... (${retryCount + 1}/${maxRetries})`)
      
      // Exponential backoff retry
      setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setImageLoaded(false)
      }, baseDelay * Math.pow(2, retryCount))
    } else {
      setImageError(true)
      console.error('[CommunicationPlaybooks] Image failed to load after retries, showing enhanced fallback')
    }
  }, [retryCount, maxRetries, baseDelay])

  // Enhanced Professional Fallback
  if (imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20"
            animate={{
              background: [
                'radial-gradient(ellipse at 30% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
                'radial-gradient(ellipse at 70% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Professional Content */}
        <div className="text-center space-y-6 relative z-10 px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
            >
              💬
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3"
          >
            <h4 className="text-3xl font-display font-bold text-white tracking-tight">
              Communication
            </h4>
            <h4 className="text-3xl font-display font-bold text-emerald-400 tracking-tight">
              Playbooks
            </h4>
            
            <p className="text-white/60 text-sm font-body mt-4 max-w-xs mx-auto leading-relaxed">
              Strategic communication frameworks and brand guidelines for organizational excellence
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative overflow-hidden group cursor-pointer">
      {/* Enhanced Loading State */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center z-20"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 mx-auto border-3 border-emerald-500 border-t-transparent rounded-full"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/60 text-sm font-mono"
              >
                Loading Communication Playbooks...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Professional Image */}
      <motion.img 
        key={retryCount} // Force re-render on retry
        src={communicationPlaybooksCover} 
        alt="Communication Playbooks - Strategic communication frameworks and brand guidelines for organizational excellence"
        className={`w-full h-full object-cover transition-all duration-700 ${
          imageLoaded 
            ? 'opacity-100 scale-100 group-hover:scale-110' 
            : 'opacity-0 scale-95'
        }`}
        style={{ 
          filter: imageLoaded 
            ? 'brightness(1.05) contrast(1.08) saturate(1.1)' 
            : 'brightness(0.8) contrast(0.9)',
          imageRendering: 'optimizeQuality',
          objectPosition: 'center center'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        draggable={false}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ 
          scale: imageLoaded ? 1 : 0.95,
          opacity: imageLoaded ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Professional Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Enhanced Interactive Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
        whileHover={{
          background: [
            'radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 70%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Quality Indicator */}
      {imageLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </motion.div>
      )}
    </div>
  )
}

// Import project cover images
import newPatientPulseCover from 'figma:asset/063476f84ea887ffa19dc1b5ef749c1c76b06975.png'
import patientPulseLogo from 'figma:asset/063476f84ea887ffa19dc1b5ef749c1c76b06975.png'
import mahindraHardestWorkersAward from 'figma:asset/be666d1a30ae89d21fd13858d6406f15e6ebf75a.png'
import mahindraRiseForGoodCover from 'figma:asset/7fd51a9cdb3b5ac674a2fdfe7ac18f7ccd637efd.png'
import jioHealthHubAwarenessCover from 'figma:asset/a81f32da5315e50f7d9629fe1d164533d3ec6913.png'
import communicationPlaybooksCover from 'figma:asset/5099bf468ca50c7a27ff649c82b1d5a1fb1832c1.png'
import salesAcceleratorCover from 'figma:asset/f7eb642b9b8afbfed54b39d69c03efdb8722a89b.png'


interface Project {
  id: number
  title: string
  category: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  images: string[]
  coverImage?: string
  coverComponent?: React.ComponentType<any>
  demoUrl?: string
  githubUrl?: string
  behanceUrl?: string
  status: 'completed' | 'in-progress' | 'concept'
  year: string
  role: string
  impact?: string[]
  metrics?: {
    label: string
    value: string
    trend?: 'up' | 'down' | 'neutral'
  }[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Patient Pulse",
    category: "Healthcare UX/UI",
    description: "Comprehensive healthcare dashboard design focusing on patient-centered digital experiences",
    longDescription: "Patient Pulse is a revolutionary healthcare dashboard that puts patients at the center of their digital health journey. The design emphasizes intuitive navigation, real-time health insights, and seamless integration with healthcare providers. Through extensive user research and iterative design processes, we created a platform that transforms how patients interact with their health data, making complex medical information accessible and actionable.",
    technologies: ["Figma", "Design Systems", "Prototyping", "User Research", "Healthcare UX"],
    features: [
      "Real-time Health Monitoring",
      "Personalized Health Insights", 
      "Provider Communication Hub",
      "Medication Management",
      "Appointment Scheduling",
      "Health Records Integration"
    ],
    images: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&q=80"
    ],
    coverComponent: PatientPulseCover,
    status: 'completed',
    year: '2024',
    role: 'Lead UX/UI Designer',
    impact: [
      "Improved patient engagement by 45%",
      "Reduced appointment scheduling time by 60%", 
      "Enhanced medication adherence tracking by 35%"
    ],
    metrics: [
      { label: "User Satisfaction", value: "4.8/5", trend: 'up' },
      { label: "Task Completion", value: "92%", trend: 'up' },
      { label: "Time on Platform", value: "+65%", trend: 'up' }
    ]
  },
  {
    id: 2,
    title: "Mahindra Rise - Hardest Workers",
    category: "Brand & Digital Campaign",
    description: "Strategic digital campaign celebrating the spirit of hard work and perseverance across industries",
    longDescription: "The Mahindra Rise 'Hardest Workers' campaign was a comprehensive digital marketing initiative that celebrated individuals and communities who embody the spirit of hard work and determination. This multi-platform campaign combined powerful storytelling with strategic digital marketing to amplify Mahindra's brand values of resilience, innovation, and commitment to excellence. The campaign featured real stories of hardworking individuals across various sectors, creating an emotional connection with audiences while reinforcing Mahindra's position as a brand that rises with its customers.",
    technologies: ["Adobe Creative Suite", "Campaign Strategy", "Social Media Marketing", "Content Creation", "Brand Storytelling"],
    features: [
      "Multi-platform Digital Campaign",
      "Real Story Documentation",
      "Emotional Brand Storytelling",
      "Strategic Content Distribution",
      "Cross-industry Representation",
      "Community Engagement Focus"
    ],
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80"
    ],
    coverImage: mahindraHardestWorkersAward,
    behanceUrl: "https://www.behance.net/gallery/94266629/Mahindra-Rise-Digital-Campaign-(Hardest-Workers)",
    status: 'completed',
    year: '2020',
    role: 'Campaign Strategist & Creative Lead',
    impact: [
      "Increased brand engagement by 220%",
      "Generated 15M+ social media impressions",
      "Enhanced brand sentiment score by 40%"
    ],
    metrics: [
      { label: "Campaign Reach", value: "15M+", trend: 'up' },
      { label: "Engagement Rate", value: "8.5%", trend: 'up' },
      { label: "Brand Lift", value: "+40%", trend: 'up' }
    ]
  },
  {
    id: 3,
    title: "JHH App UI - Push Notifications & Banners",
    category: "Mobile UX/UI Design",
    description: "Comprehensive mobile app interface design for healthcare notifications and promotional banners",
    longDescription: "A specialized mobile UI/UX design project focused on creating intuitive and engaging notification systems, interstitial screens, and promotional banners for the JioHealthHub application. The design philosophy centered on clear communication hierarchy, accessible information architecture, and seamless user experience across various notification types. Each element was crafted to ensure maximum user engagement while maintaining clinical accuracy and compliance with healthcare communication standards.",
    technologies: ["Figma", "Mobile UI Design", "Notification Systems", "Healthcare UX", "Accessibility Design"],
    features: [
      "Push Notification Design",
      "Interstitial Screen Layouts",
      "Promotional Banner Systems",
      "Healthcare-compliant Messaging",
      "Accessibility-first Approach",
      "Multi-device Optimization"
    ],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop&q=80"
    ],
    coverComponent: ProductLogo1,
    behanceUrl: "https://www.behance.net/gallery/192156193/JHH-App-UI-Banners-Interstitials-Push-notifications",
    status: 'completed',
    year: '2024',
    role: 'Senior Mobile UI/UX Designer',
    impact: [
      "Improved notification open rates by 55%",
      "Enhanced user retention by 30%",
      "Reduced app abandonment rate by 25%"
    ],
    metrics: [
      { label: "Open Rate", value: "68%", trend: 'up' },
      { label: "User Retention", value: "+30%", trend: 'up' },
      { label: "Task Success", value: "89%", trend: 'up' }
    ]
  },
  {
    id: 4,
    title: "Mahindra Rise - Cut The Crap",
    category: "Brand & Digital Campaign",
    description: "Bold and direct digital campaign focusing on authentic communication and cutting through industry noise",
    longDescription: "The 'Cut The Crap' campaign represented a bold departure from conventional automotive marketing, focusing on direct, honest communication that cuts through industry jargon and marketing fluff. This campaign was designed to position Mahindra as a brand that speaks truth, delivers on promises, and maintains authentic relationships with customers. The creative strategy involved straightforward messaging, real customer testimonials, and transparent communication about product features and benefits, creating a refreshing brand voice in a cluttered marketplace.",
    technologies: ["Campaign Strategy", "Brand Communication", "Digital Marketing", "Content Strategy", "Social Media"],
    features: [
      "Authentic Brand Messaging",
      "Direct Communication Strategy",
      "Customer-centric Content",
      "Transparent Marketing Approach",
      "Anti-jargon Positioning",
      "Honest Product Communication"
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80"
    ],
    coverImage: mahindraRiseForGoodCover,
    behanceUrl: "https://www.behance.net/gallery/94845951/Mahindra-Rise-CutTheCrap",
    status: 'completed',
    year: '2020',
    role: 'Creative Strategy Lead',
    impact: [
      "Increased brand authenticity perception by 65%",
      "Generated 12M+ campaign impressions",
      "Improved customer trust scores by 45%"
    ],
    metrics: [
      { label: "Authenticity Score", value: "+65%", trend: 'up' },
      { label: "Campaign Reach", value: "12M+", trend: 'up' },
      { label: "Trust Index", value: "+45%", trend: 'up' }
    ]
  },
  {
    id: 5,
    title: "JioHealthHub Health Awareness Platform",
    category: "Healthcare UX/UI",
    description: "Comprehensive digital health education platform promoting preventive healthcare and community wellness",
    longDescription: "The JioHealthHub Health Awareness Platform represents a groundbreaking initiative in digital health education, designed to democratize healthcare knowledge and promote preventive care across diverse communities. This comprehensive platform combines evidence-based medical content with engaging user experiences to deliver critical health information on disease prevention, lifestyle management, mental health awareness, and community wellness programs. The platform features interactive health assessments, personalized wellness recommendations, expert-curated content libraries, and community-driven health campaigns that have reached millions of users across India.",
    technologies: ["Healthcare UX/UI", "Content Strategy", "Digital Health", "Community Engagement", "Health Analytics", "Mobile-First Design"],
    features: [
      "Interactive Health Assessments",
      "Personalized Wellness Recommendations",
      "Expert-Curated Content Library",
      "Community Health Campaigns",
      "Disease Prevention Resources",
      "Mental Health Awareness Modules",
      "Lifestyle Management Tools",
      "Health Risk Calculators",
      "Multilingual Health Content",
      "Evidence-Based Medical Information"
    ],
    images: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&q=80"
    ],
    coverImage: jioHealthHubAwarenessCover,
    demoUrl: "https://healthhub.jio.com/awareness",
    status: 'completed',
    year: '2024',
    role: 'Lead Health Marketing Strategist & UX Designer',
    impact: [
      "Reached 5M+ users with health awareness content",
      "Improved health literacy scores by 75% among active users",
      "Generated 12M+ health assessment completions",
      "Reduced healthcare-seeking anxiety by 40% in target demographics"
    ],
    metrics: [
      { label: "Monthly Users", value: "45k+", trend: 'up' },
      { label: "Content Engagement", value: "78%", trend: 'up' },
      { label: "Health Assessment Completion", value: "12M+", trend: 'up' }
    ]
  },
  {
    id: 6,
    title: "The Sales Accelerator",
    category: "EdTech & Learning Platform",
    description: "Advanced sales training platform and comprehensive business acceleration system designed to transform sales professionals through cutting-edge methodologies and interactive learning experiences",
    longDescription: "The Sales Accelerator represents a revolutionary approach to sales training and business development education. This comprehensive platform combines proven sales methodologies with modern learning technologies to create an immersive educational experience that accelerates professional growth. The system features interactive modules, real-world case studies, practical exercises, and continuous assessment tools designed to transform sales professionals at every level. Built with scalable architecture and user-centric design principles, the platform delivers personalized learning paths, progress tracking, and community-driven learning experiences. The Sales Accelerator integrates advanced analytics, gamification elements, and mentorship programs to ensure maximum engagement and measurable results for both individual learners and enterprise clients.",
    technologies: ["Educational Technology", "Learning Management Systems", "Sales Methodology", "Interactive Learning Design", "Progress Analytics", "Community Building", "Gamification", "Assessment Systems"],
    features: [
      "Comprehensive Sales Training Modules",
      "Interactive Learning Experiences & Simulations",
      "Real-World Case Studies & Practical Applications",
      "Personalized Learning Paths & Adaptive Content",
      "Progress Tracking & Performance Analytics",
      "Community Forums & Peer Learning Networks",
      "Expert Mentorship & Coaching Programs",
      "Gamified Achievement & Certification Systems",
      "Mobile-Responsive Learning Platform",
      "Advanced Assessment & Evaluation Tools",
      "Resource Library & Sales Toolkit Access",
      "Live Webinars & Interactive Sessions",
      "Industry-Specific Sales Strategies",
      "CRM Integration & Workflow Optimization",
      "Continuous Learning & Skill Development Programs"
    ],
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop&q=80"
    ],
    coverImage: salesAcceleratorCover,
    behanceUrl: "https://www.learn.surajkaeley.com/courses/thesalesaccelerator",
    status: 'completed',
    year: '2024',
    role: 'Educational Platform Strategist & Learning Experience Designer',
    impact: [
      "Transformed sales performance for 500+ professionals across multiple industries",
      "Achieved 89% course completion rate with average skill improvement of 73%",
      "Generated 95% user satisfaction rate with comprehensive feedback system",
      "Increased sales conversion rates by 67% for program participants",
      "Built scalable learning architecture serving 1000+ concurrent users",
      "Established industry-leading retention rate of 92% for long-term engagement",
      "Created comprehensive resource library with 200+ practical tools and templates"
    ],
    metrics: [
      { label: "Course Completion Rate", value: "89%", trend: 'up' },
      { label: "User Satisfaction", value: "95%", trend: 'up' },
      { label: "Skill Improvement", value: "+73%", trend: 'up' },
      { label: "Sales Conversion Boost", value: "+67%", trend: 'up' },
      { label: "User Retention", value: "92%", trend: 'up' },
      { label: "Active Learners", value: "500+", trend: 'up' }
    ]
  },
  {
    id: 7,
    title: "Communication Playbooks",
    category: "Brand & Digital Campaign",
    description: "Enterprise-grade strategic communication frameworks and comprehensive brand guidelines for organizational excellence and consistent messaging",
    longDescription: "The Communication Playbooks project represents a transformative strategic initiative that revolutionizes organizational communication through comprehensive frameworks, detailed brand guidelines, and sophisticated messaging standards. This enterprise-level solution encompasses everything from crisis communication protocols and executive messaging templates to cross-cultural communication strategies and digital engagement frameworks. Each playbook is meticulously crafted using data-driven insights, behavioral psychology principles, and industry best practices to ensure maximum impact, consistency, and effectiveness across all organizational touchpoints. The system includes advanced analytics, automated compliance checking, and dynamic content adaptation capabilities that help brands maintain coherent, compelling messaging while seamlessly adapting to diverse contexts, audiences, and cultural nuances.",
    technologies: ["Strategic Communication Design", "Brand Architecture", "Content Strategy Systems", "Communication Frameworks", "Brand Voice AI", "Stakeholder Psychology", "Crisis Management Protocols", "Digital Communication Analytics"],
    features: [
      "Advanced Crisis Communication Protocols & Response Systems",
      "AI-Powered Brand Voice & Tone Guidelines",
      "Executive & Leadership Communication Templates",
      "Multi-Level Stakeholder Engagement Frameworks",
      "Comprehensive Social Media Communication Standards",
      "Dynamic Internal Communication Playbooks",
      "Strategic External PR & Media Guidelines",
      "Cross-Cultural & International Communication Standards",
      "Digital-First Communication Best Practices",
      "Real-Time Communication Performance Analytics",
      "Automated Brand Compliance Monitoring",
      "Personalized Stakeholder Journey Mapping",
      "Crisis Scenario Simulation & Training Modules",
      "Integrated Campaign Communication Workflows",
      "Advanced Message Testing & Optimization Tools"
    ],
    images: [
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&q=80"
    ],
    coverComponent: CommunicationPlaybooksCover,
    behanceUrl: "https://www.behance.net/gallery/204807987/Communication-Playbooks",
    status: 'completed',
    year: '2024',
    role: 'Senior Strategic Communications Architect & Brand Ecosystem Designer',
    impact: [
      "Standardized communication excellence across 25+ organizational departments and 150+ team members",
      "Reduced miscommunication incidents by 78% through intelligent guidelines and automated systems", 
      "Improved overall brand consistency score by 89% across all digital and physical touchpoints",
      "Enhanced stakeholder engagement effectiveness by 67% with personalized communication strategies",
      "Accelerated crisis response time by 85% through automated protocols and pre-approved messaging",
      "Increased employee communication confidence by 92% with comprehensive training and templates",
      "Achieved 94% stakeholder satisfaction rating through strategic messaging optimization"
    ],
    metrics: [
      { label: "Communication Consistency", value: "96%", trend: 'up' },
      { label: "Brand Alignment Score", value: "+89%", trend: 'up' },
      { label: "Stakeholder Satisfaction", value: "94%", trend: 'up' },
      { label: "Crisis Response Time", value: "-85%", trend: 'up' },
      { label: "Employee Confidence", value: "+92%", trend: 'up' },
      { label: "Engagement Rate", value: "+67%", trend: 'up' }
    ]
  },
  {
    id: 8,
    title: "Behance Creative Portfolio",
    category: "Creative Portfolio & Brand Showcase",
    description: "Comprehensive creative portfolio showcasing 9+ years of marketing campaigns, design projects, and brand innovations",
    longDescription: "A meticulously curated Behance portfolio that showcases the breadth and depth of my creative expertise across digital marketing, brand campaigns, UX/UI design, and strategic communications. This comprehensive portfolio spans over 9 years of professional work, featuring award-winning campaigns, innovative design solutions, and strategic marketing initiatives that have shaped brands and driven measurable business results. Each project tells a story of creative problem-solving, strategic thinking, and execution excellence across diverse industries from automotive to healthcare.",
    technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy", "Campaign Development", "Creative Direction", "Portfolio Curation"],
    features: [
      "Award-Winning Campaign Showcases",
      "Comprehensive Project Case Studies",
      "Brand Strategy Documentation",
      "Visual Design Excellence",
      "Strategic Marketing Campaigns",
      "Cross-Industry Expertise",
      "Creative Process Documentation",
      "Impact Metrics & Results",
      "Professional Photography Integration",
      "Interactive Project Presentations"
    ],
    images: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&q=80"
    ],
    coverComponent: Behance31,
    behanceUrl: "https://www.behance.net/raleskip",
    status: 'completed',
    year: '2024',
    role: 'Creative Director & Portfolio Curator',
    impact: [
      "Showcased 25+ professional projects across 9+ years",
      "Generated 50K+ portfolio views and engagement",
      "Attracted international creative collaboration opportunities",
      "Established creative thought leadership in marketing design"
    ],
    metrics: [
      { label: "Portfolio Views", value: "50K+", trend: 'up' },
      { label: "Project Appreciations", value: "2.5K+", trend: 'up' },
      { label: "Creative Followers", value: "1.2K+", trend: 'up' }
    ]
  }
]

const categories = ["All", "Healthcare UX/UI", "Brand & Digital Campaign", "EdTech & Learning Platform", "Mobile UX/UI Design", "Creative Portfolio & Brand Showcase"]

// Enhanced Project Cover Component with Robust Error Handling
const ProjectCover = ({ project }: { project: Project }) => {
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageError = () => {
    // Try fallback images in sequence
    const availableImages = [project.coverImage, ...(project.images || [])].filter(Boolean)
    
    if (currentImageIndex + 1 < availableImages.length) {
      setCurrentImageIndex(prev => prev + 1)
      setLoading(true)
    } else {
      setImageError(true)
      setLoading(false)
    }
  }

  const handleImageLoad = () => {
    setLoading(false)
  }

  if (project.coverComponent) {
    // Special handling for different projects
    const isJHHProject = project.title === "JHH App UI - Push Notifications & Banners"
    const isBehanceProject = project.title === "Behance Creative Portfolio"
    const isPatientPulseProject = project.title === "Patient Pulse"
    const isCommunicationProject = project.title === "Communication Playbooks"
    const isSalesAcceleratorProject = project.title === "The Sales Accelerator"
    
    // Custom components handle their own styling
    if (isPatientPulseProject || isCommunicationProject || isSalesAcceleratorProject) {
      return (
        <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
          <project.coverComponent />
        </div>
      )
    }
    
    const backgroundClass = isJHHProject 
      ? "bg-white" 
      : "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
    
    // Full size for Behance project, scaled for others
    const scaleClass = isBehanceProject ? "transform scale-100" : "transform scale-75"
    
    return (
      <div className={`w-full h-full ${backgroundClass} flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500`}>
        <div className={scaleClass}>
          <project.coverComponent />
        </div>
      </div>
    )
  }

  // Get available images for fallback
  const availableImages = [project.coverImage, ...(project.images || [])].filter(Boolean)
  const currentImage = availableImages[currentImageIndex]

  if (currentImage && !imageError) {
    return (
      <div className="relative w-full h-full">
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        )}
        <ImageWithFallback
          src={currentImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
    )
  }

  // Enhanced Fallback Cover with Category-based Styling
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'Healthcare UX/UI':
        return 'from-emerald-900 via-teal-900 to-cyan-900'
      case 'Brand & Digital Campaign':
        return 'from-purple-900 via-violet-900 to-indigo-900'
      case 'Mobile UX/UI Design':
        return 'from-blue-900 via-sky-900 to-cyan-900'
      case 'Creative Portfolio & Brand Showcase':
        return 'from-indigo-900 via-purple-900 to-pink-900'
      default:
        return 'from-gray-900 via-slate-900 to-zinc-900'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Healthcare UX/UI':
        return <Users className="h-16 w-16 text-emerald-400/60" />
      case 'Brand & Digital Campaign':
        return <TrendingUp className="h-16 w-16 text-purple-400/60" />
      case 'Mobile UX/UI Design':
        return <Smartphone className="h-16 w-16 text-blue-400/60" />
      case 'Creative Portfolio & Brand Showcase':
        return <Globe className="h-16 w-16 text-indigo-400/60" />
      default:
        return <Globe className="h-16 w-16 text-gray-400/60" />
    }
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(project.category)} flex flex-col items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {getCategoryIcon(project.category)}
        <h4 className="text-lg font-display font-semibold text-white/90 mt-4 mb-2">
          {project.title}
        </h4>
        <p className="text-sm text-white/60 font-body">
          {project.category}
        </p>
      </motion.div>
    </div>
  )
}

// Patient Pulse Carousel Component
const PatientPulseCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      title: "Patient Dashboard Overview",
      description: "Comprehensive health monitoring with real-time insights and personalized tracking",
      component: <Home1 />
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full">
      <div className="relative h-[500px] overflow-hidden rounded-xl neuro-base">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          >
            <div className="transform scale-75 origin-center">
              {slides[currentSlide].component}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {slides.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="pointer-events-auto neuro-btn bg-black/20 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="pointer-events-auto neuro-btn bg-black/20 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-6' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Slide Information */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-center"
      >
        <h4 className="text-lg font-display font-semibold text-white mb-2">
          {slides[currentSlide].title}
        </h4>
        <p className="text-sm text-white/70 font-body">
          {slides[currentSlide].description}
        </p>
      </motion.div>
    </div>
  )
}

export function ProjectsPage() {
  // Production: Load user preferences with enhanced error handling
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('raleskip-portfolio-category') || "All"
      } catch (error) {
        console.warn('[Storage] Failed to load category preference:', error)
        return "All"
      }
    }
    return "All"
  })
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imagePreloadComplete, setImagePreloadComplete] = useState(false)
  const [networkStatus, setNetworkStatus] = useState('online')
  const [performanceMetrics, setPerformanceMetrics] = useState({
    pageLoadTime: 0,
    imageLoadTime: 0,
    interactionCount: 0,
    errorCount: 0
  })
  const [componentMountTime] = useState(Date.now())

  // Production: Enhanced user preference persistence with error handling
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('raleskip-portfolio-category', selectedCategory)
        console.log(`[User Preference] Category saved: ${selectedCategory}`)
      } catch (error) {
        console.error('[Storage] Failed to save category preference:', error)
        
        // Fallback to localStorage if sessionStorage fails
        try {
          localStorage.setItem('raleskip-portfolio-category-fallback', selectedCategory)
        } catch (fallbackError) {
          console.error('[Storage] Fallback storage also failed:', fallbackError)
        }
      }
    }
  }, [selectedCategory])

  // Production: Comprehensive performance monitoring
  useEffect(() => {
    const measurePageLoad = () => {
      const loadTime = Date.now() - componentMountTime
      setPerformanceMetrics(prev => ({ ...prev, pageLoadTime: loadTime }))
      
      console.log(`[Performance] ProjectsPage loaded in ${loadTime}ms`)
      
      // Report to analytics in production
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'projects_page_load', {
          event_category: 'performance',
          event_label: 'page_timing',
          value: loadTime,
          custom_map: {
            load_time_ms: loadTime,
            network_status: networkStatus,
            category: selectedCategory
          }
        })
      }
    }

    // Measure when all critical assets are loaded
    if (imagePreloadComplete) {
      measurePageLoad()
    }
  }, [imagePreloadComplete, componentMountTime, networkStatus, selectedCategory])

  // Production: Error boundary and reporting
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setPerformanceMetrics(prev => ({ ...prev, errorCount: prev.errorCount + 1 }))
      
      console.error('[ProjectsPage Error]:', error)
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'projects_page_error', {
          event_category: 'error',
          event_label: error.message,
          value: 1
        })
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online')
    const handleOffline = () => setNetworkStatus('offline')
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Enhanced Performance: Intelligent image preloading with priority queue
  useEffect(() => {
    const criticalImages = [
      { src: communicationPlaybooksCover, priority: 'high', name: 'Communication Playbooks' },
      { src: patientPulseLogo, priority: 'high', name: 'Patient Pulse Logo' },
      { src: mahindraHardestWorkersAward, priority: 'medium', name: 'Mahindra Award' },
      { src: mahindraRiseForGoodCover, priority: 'medium', name: 'Mahindra Rise Cover' },
      { src: jioHealthHubAwarenessCover, priority: 'low', name: 'JHH Awareness Cover' }
    ]

    // Intelligent preloading with connection-aware optimization
    const preloadImages = async () => {
      const connectionSpeed = navigator.connection?.effectiveType || '4g'
      const slowConnection = ['slow-2g', '2g', '3g'].includes(connectionSpeed)
      
      console.log(`[Performance] Connection speed: ${connectionSpeed}, Slow connection: ${slowConnection}`)
      
      // Prioritize high-priority images for slow connections
      const imagesToPreload = slowConnection 
        ? criticalImages.filter(img => img.priority === 'high')
        : criticalImages

      const preloadPromises = imagesToPreload.map(({ src, name }, index) => {
        return new Promise((resolve) => {
          if (!src) {
            resolve({ success: false, name, error: 'No source provided' })
            return
          }
          
          const img = new Image()
          const startTime = performance.now()
          
          img.onload = () => {
            const loadTime = performance.now() - startTime
            console.log(`[Performance] ${name} loaded in ${loadTime.toFixed(2)}ms`)
            resolve({ success: true, name, loadTime })
          }
          
          img.onerror = (error) => {
            console.warn(`[Performance] Failed to preload ${name}:`, error)
            resolve({ success: false, name, error })
          }
          
          // Add slight delay for non-critical images to avoid overwhelming
          if (index > 0 && !slowConnection) {
            setTimeout(() => { img.src = src }, index * 100)
          } else {
            img.src = src
          }
        })
      })

      try {
        const results = await Promise.allSettled(preloadPromises)
        const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length
        
        setImagePreloadComplete(true)
        
        console.log(`[Performance] Image preloading complete: ${successCount}/${imagesToPreload.length} successful`)
        
        // Performance metrics for production monitoring
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'image_preload_complete', {
            event_category: 'performance',
            event_label: 'portfolio_images',
            value: successCount,
            custom_map: {
              total_images: imagesToPreload.length,
              connection_type: connectionSpeed,
              success_rate: (successCount / imagesToPreload.length * 100).toFixed(1)
            }
          })
        }
        
        // Show user feedback for slow preloading
        const totalResults = results.length
        if (successCount < totalResults) {
          toast.info('Some images are still loading', {
            description: `${successCount}/${totalResults} images loaded successfully`,
            duration: 3000,
          })
        }
        
      } catch (error) {
        console.error('[Performance] Critical error during image preloading:', error)
        setImagePreloadComplete(true) // Don't block the app
        
        toast.error('Image loading issue detected', {
          description: 'Some portfolio images may load slowly',
          duration: 4000,
        })
      }
    }

    // Start preloading with a small delay to allow critical rendering
    const preloadTimer = setTimeout(preloadImages, 200)
    
    return () => {
      clearTimeout(preloadTimer)
    }
  }, [])

  // Enhanced external link handling with comprehensive analytics and error handling
  const handleExternalLink = useCallback((url: string, type: string, projectTitle: string) => {
    try {
      // Validate URL
      if (!url || typeof url !== 'string') {
        toast.error('Invalid link', {
          description: 'The requested link is not available',
          duration: 3000,
        })
        return
      }

      // User feedback with enhanced messaging
      toast.info(`Opening ${type}...`, {
        description: `Loading ${projectTitle} ${type.toLowerCase()} in new tab`,
        duration: 2000,
      })
      
      // Comprehensive analytics tracking
      const analyticsData = {
        event: 'external_link_click',
        link_type: type.toLowerCase(),
        project_title: projectTitle,
        url: url,
        timestamp: Date.now(),
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        session_duration: Date.now() - sessionStorage.getItem('session_start') || 0
      }
      
      console.log('[Analytics] External link interaction:', analyticsData)
      
      // Google Analytics 4 event tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'external_link_click', {
          event_category: 'engagement',
          event_label: `${type} - ${projectTitle}`,
          value: 1,
          custom_map: {
            link_type: type.toLowerCase(),
            project_title: projectTitle
          }
        })
      }
      
      // Custom event for advanced tracking
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('raleskipExternalLink', {
          detail: analyticsData
        }))
      }
      
      // Enhanced security and user experience
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer,nofollow')
      
      if (!newWindow) {
        toast.error('Popup blocked', {
          description: 'Please allow popups for this site to open external links',
          duration: 4000,
          action: {
            label: "Copy Link",
            onClick: () => {
              navigator.clipboard.writeText(url).then(() => {
                toast.success('Link copied to clipboard', {
                  duration: 2000
                })
              }).catch(() => {
                toast.error('Failed to copy link', {
                  duration: 2000
                })
              })
            }
          }
        })
        return
      }
      
      // Focus management for accessibility
      newWindow.focus()
      
    } catch (error) {
      console.error('[External Link] Error opening link:', error)
      toast.error('Failed to open link', {
        description: 'Please try again or copy the link manually',
        duration: 3000,
        action: {
          label: "Copy Link",
          onClick: () => {
            navigator.clipboard.writeText(url).then(() => {
              toast.success('Link copied to clipboard')
            }).catch(() => {
              console.error('Clipboard access failed')
            })
          }
        }
      })
    }
  }, [])

  // Performance: Memoize filtered projects to prevent unnecessary re-renders
  const filteredProjects = useMemo(() => {
    const filtered = selectedCategory === "All" 
      ? projects 
      : projects.filter(project => project.category === selectedCategory)
    
    console.log(`[Filter] ${selectedCategory}: ${filtered.length} projects`)
    return filtered
  }, [selectedCategory])

  // Performance: Memoize category change handler with persistence
  const handleCategoryChange = useCallback((category: string) => {
    if (category === selectedCategory) return
    
    // Optimistic UI update
    setSelectedCategory(category)
    
    // Persist user preference
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('raleskip-portfolio-category', category)
    }
    
    // Analytics tracking for category filtering
    console.log(`[Category Filter] Changed to: ${category}`)
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'category_filter', {
        event_category: 'portfolio_interaction',
        event_label: category,
        value: 1
      })
    }
    
    // Enhanced user feedback
    const projectCount = category === "All" 
      ? projects.length 
      : projects.filter(p => p.category === category).length
    
    toast.info(
      projectCount === 1 
        ? `Found ${projectCount} ${category} project` 
        : `Found ${projectCount} ${category} projects`,
      {
        duration: 1500,
      }
    )
  }, [selectedCategory])

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed': return <Eye className="h-4 w-4 text-emerald-400" />
      case 'in-progress': return <Zap className="h-4 w-4 text-amber-400" />
      case 'concept': return <Code className="h-4 w-4 text-purple-400" />
    }
  }

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-emerald-400" />
    return null
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 gradient-mesh-dark opacity-20" />
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 30%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neuro-flat mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-body text-white/80">Portfolio Showcase</span>
          </div>

          <h1 className="heading-primary text-white mb-6">
            <span className="kinetic-neon-pulse brand-text-dark">
              Creative Projects
            </span>
          </h1>

          <p className="body-elegant max-w-3xl mx-auto mb-8">
            A curated collection of projects spanning healthcare UX/UI design, marketing technology innovation, 
            and AI-powered solutions. Each project represents a unique intersection of creativity, strategy, and technical excellence.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`neuro-btn font-body transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
                  selectedCategory === category
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'hover:border-emerald-400/30 hover:text-emerald-400/80 hover:shadow-md'
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter projects by ${category} category`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="ml-2 inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid with Loading State */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {!imagePreloadComplete && filteredProjects.length > 0 && (
            <div className="col-span-full flex justify-center items-center py-8">
              <motion.div
                className="flex items-center gap-3 text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full"
                />
                <span className="font-body text-sm">Optimizing portfolio experience...</span>
              </motion.div>
            </div>
          )}
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`project-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Card 
                  className="card-dark h-full group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900" 
                  onClick={() => {
                    setSelectedProject(project)
                    setPerformanceMetrics(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }))
                    
                    // Enhanced analytics tracking with detailed project data
                    console.log(`[Project Selection] Opened: ${project.title}`)
                    
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'project_view', {
                        event_category: 'portfolio_engagement',
                        event_label: project.title,
                        value: 1,
                        custom_map: {
                          project_id: project.id,
                          project_category: project.category,
                          project_year: project.year,
                          project_status: project.status,
                          user_category_filter: selectedCategory
                        }
                      })
                    }

                    // Special tracking for featured projects
                    if (project.id === 6) {
                      console.log('[Sales Accelerator] Educational platform accessed')
                      
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'sales_accelerator_view', {
                          event_category: 'featured_project',
                          event_label: 'educational_platform',
                          value: 1,
                          custom_map: {
                            access_source: 'portfolio_grid',
                            session_duration: Date.now() - componentMountTime
                          }
                        })
                      }
                    }

                    if (project.id === 7) {
                      console.log('[Communication Playbooks] Professional project accessed')
                      
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'communication_playbooks_view', {
                          event_category: 'featured_project',
                          event_label: 'strategic_communication',
                          value: 1,
                          custom_map: {
                            access_source: 'portfolio_grid',
                            session_duration: Date.now() - componentMountTime
                          }
                        })
                      }
                    }

                    // Update meta tags for better sharing when project is viewed
                    try {
                      document.title = `${project.title} - Aayush Pawar | Raleskip Portfolio`
                      
                      const metaDescription = document.querySelector('meta[name="description"]')
                      if (metaDescription) {
                        metaDescription.setAttribute('content', project.description)
                      }

                      // Update Open Graph tags for better social sharing
                      const ogTitle = document.querySelector('meta[property="og:title"]')
                      if (ogTitle) {
                        ogTitle.setAttribute('content', `${project.title} - Aayush Pawar Portfolio`)
                      }

                      const ogDescription = document.querySelector('meta[property="og:description"]')
                      if (ogDescription) {
                        ogDescription.setAttribute('content', project.description)
                      }
                      
                    } catch (error) {
                      console.warn('[SEO] Failed to update meta tags:', error)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${project.title} project`}
                  aria-describedby={`project-${project.id}-description`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedProject(project)
                      setPerformanceMetrics(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }))
                    }
                  }}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <ProjectCover project={project} />
                    
                    {/* Enhanced Status Badge with Animation */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge 
                        variant="outline" 
                        className="glass-dark border-white/20 text-white/90 backdrop-blur-md transition-all duration-300 group-hover:border-emerald-400/50 group-hover:text-emerald-400"
                      >
                        <motion.span
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          {getStatusIcon(project.status)}
                        </motion.span>
                        <span className="ml-1 capitalize font-medium">
                          {project.status.replace('-', ' ')}
                        </span>
                      </Badge>
                    </div>

                    {/* Enhanced Year Badge with Gradient */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge 
                        variant="outline" 
                        className="glass-dark border-white/20 text-white/90 backdrop-blur-md transition-all duration-300 group-hover:border-purple-400/50 group-hover:text-purple-400"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="font-bold tabular-nums"
                        >
                          {project.year}
                        </motion.span>
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-display font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/60 font-body">{project.category}</p>
                      </div>
                    </div>

                    <p 
                      id={`project-${project.id}-description`}
                      className="text-white/80 font-body text-sm mb-4 line-clamp-3"
                    >
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/70">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-white/50">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {project.metrics.slice(0, 2).map((metric, index) => (
                          <div key={index} className="neuro-inset p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/60 font-body">{metric.label}</span>
                              {getTrendIcon(metric.trend)}
                            </div>
                            <span className="font-display font-semibold text-white text-sm">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Enhanced Action Buttons with Better UX */}
                    <div className="flex gap-2">
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 neuro-btn text-xs hover:bg-blue-500/10 hover:border-blue-400/50 hover:text-blue-400 focus-visible:ring-blue-400 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExternalLink(project.demoUrl!, 'Demo', project.title)
                          }}
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          Know More
                        </Button>
                      )}
                      {project.behanceUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 neuro-btn text-xs hover:bg-purple-500/10 hover:border-purple-400/50 hover:text-purple-400 focus-visible:ring-purple-400 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExternalLink(project.behanceUrl!, 'Behance', project.title)
                          }}
                          aria-label={`View ${project.title} on Behance`}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Behance
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 neuro-btn text-xs hover:bg-emerald-500/10 hover:border-emerald-400/50 hover:text-emerald-400 focus-visible:ring-emerald-400 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExternalLink(project.githubUrl!, 'GitHub', project.title)
                          }}
                          aria-label={`View source code for ${project.title} on GitHub`}
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Project Detail Modal with Accessibility */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedProject(null)
                }
              }}
              role="dialog"
              aria-labelledby="project-modal-title"
              aria-describedby="project-modal-description"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 id="project-modal-title" className="heading-secondary text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-emerald-400 font-body font-medium" aria-label="Project role">
                      {selectedProject.role}
                    </p>
                    <p id="project-modal-description" className="sr-only">
                      {selectedProject.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setSelectedProject(null)
                      
                      // Analytics tracking for modal close
                      console.log(`[Project Modal] Closed: ${selectedProject.title}`)
                      
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'project_modal_close', {
                          event_category: 'portfolio_interaction',
                          event_label: selectedProject.title,
                          value: 1
                        })
                      }
                    }}
                    className="neuro-btn hover:bg-red-500/10 hover:border-red-400/50 hover:text-red-400 transition-colors duration-300"
                    aria-label="Close project details"
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Code className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>

                {/* Project Showcase */}
                {selectedProject.id === 1 ? (
                  <div className="h-80 rounded-xl mb-6 overflow-hidden bg-black flex items-center justify-center">
                    <PatientPulseCover />
                  </div>
                ) : selectedProject.id === 3 ? (
                  <div className="h-80 bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900 rounded-xl mb-6 flex items-center justify-center">
                    <div className="transform scale-75">
                      <ProductLogo1 />
                    </div>
                  </div>
                ) : selectedProject.id === 6 ? (
                  <div className="h-80 rounded-xl mb-6 overflow-hidden">
                    <SalesAcceleratorCover />
                  </div>
                ) : selectedProject.id === 7 ? (
                  <div className="h-80 rounded-xl mb-6 overflow-hidden">
                    <CommunicationPlaybooksCover />
                  </div>
                ) : selectedProject.id === 8 ? (
                  <div className="h-80 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 rounded-xl mb-6 flex items-center justify-center">
                    <div className="transform scale-100 w-full h-full flex items-center justify-center">
                      <Behance31 />
                    </div>
                  </div>
                ) : (
                  <div className="h-80 rounded-xl mb-6 overflow-hidden">
                    <ProjectCover project={selectedProject} />
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Project Details */}
                  <div>
                    <h3 className="heading-tertiary text-white mb-4">Project Overview</h3>
                    <p className="body-refined mb-6">{selectedProject.longDescription}</p>

                    <h4 className="text-lg font-display font-semibold text-white mb-3">Key Features</h4>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-white/80 font-body text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-lg font-display font-semibold text-white mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="border-emerald-400/30 text-emerald-400">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics & Impact */}
                  <div>
                    {selectedProject.metrics && (
                      <>
                        <h4 className="text-lg font-display font-semibold text-white mb-3">Key Metrics</h4>
                        <div className="grid gap-3 mb-6">
                          {selectedProject.metrics.map((metric, index) => (
                            <div key={index} className="neuro-inset p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-white/60 font-body text-sm">{metric.label}</span>
                                {getTrendIcon(metric.trend)}
                              </div>
                              <span className="font-display font-bold text-white text-xl">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedProject.impact && (
                      <>
                        <h4 className="text-lg font-display font-semibold text-white mb-3">Impact & Results</h4>
                        <ul className="space-y-3">
                          {selectedProject.impact.map((impact, index) => (
                            <li key={index} className="text-white/80 font-body text-sm flex items-start gap-3">
                              <TrendingUp className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              {impact}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Enhanced Action Buttons with Professional Styling */}
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
                  {selectedProject.demoUrl && (
                    <Button
                      className="neuro-btn hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300"
                      onClick={() => handleExternalLink(selectedProject.demoUrl!, 'Demo', selectedProject.title)}
                      aria-label={`View live demo of ${selectedProject.title}`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mr-2"
                      >
                        <Globe className="h-4 w-4" />
                      </motion.span>
                      View Live Demo
                    </Button>
                  )}
                  {selectedProject.behanceUrl && (
                    <Button
                      variant="outline"
                      className="neuro-btn hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-purple-400 transition-all duration-300"
                      onClick={() => handleExternalLink(selectedProject.behanceUrl!, 'Behance', selectedProject.title)}
                      aria-label={`View ${selectedProject.title} portfolio on Behance`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="mr-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.span>
                      View on Behance
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      className="neuro-btn hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-emerald-400 transition-all duration-300"
                      onClick={() => handleExternalLink(selectedProject.githubUrl!, 'GitHub', selectedProject.title)}
                      aria-label={`View source code for ${selectedProject.title} on GitHub`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="mr-2"
                      >
                        <Github className="h-4 w-4" />
                      </motion.span>
                      View Source Code
                    </Button>
                  )}
                  
                  {/* Share Button */}
                  <Button
                    variant="outline"
                    className="neuro-btn hover:bg-yellow-500/20 hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                    onClick={async () => {
                      try {
                        if (navigator.share) {
                          await navigator.share({
                            title: `${selectedProject.title} - Aayush Pawar Portfolio`,
                            text: selectedProject.description,
                            url: `${window.location.origin}#projects`
                          })
                        } else {
                          await navigator.clipboard.writeText(window.location.href)
                          toast.success('Link copied to clipboard', {
                            description: 'Share this portfolio with others',
                            duration: 2000
                          })
                        }
                      } catch (error) {
                        console.error('[Share] Failed to share:', error)
                        toast.error('Failed to share project')
                      }
                    }}
                    aria-label="Share this project"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="mr-2"
                    >
                      <span className="text-sm">🔗</span>
                    </motion.span>
                    Share Project
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Production Development Metrics Panel */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 z-40">
            <details className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-xs text-white/70 font-mono max-w-sm">
              <summary className="cursor-pointer text-emerald-400 font-semibold mb-2">
                📊 Performance Metrics
              </summary>
              <div className="space-y-1 mt-2">
                <div>Page Load: {performanceMetrics.pageLoadTime}ms</div>
                <div>Network: {networkStatus === 'online' ? '🟢 Online' : '🔴 Offline'}</div>
                <div>Images: {imagePreloadComplete ? '✅ Loaded' : '⏳ Loading'}</div>
                <div>Interactions: {performanceMetrics.interactionCount}</div>
                <div>Errors: {performanceMetrics.errorCount}</div>
                <div>Category: {selectedCategory}</div>
                <div>Projects: {filteredProjects.length}</div>
                <div>Session: {Math.round((Date.now() - componentMountTime) / 1000)}s</div>
                <div className="pt-2 border-t border-white/20">
                  <div className="text-cyan-400">Featured Projects:</div>
                  <div className="ml-2 space-y-1">
                    <div className="text-emerald-400">Sales Accelerator:</div>
                    <div className="ml-2 text-xs">✅ Production Ready</div>
                    <div className="ml-2 text-xs">✅ Cover Optimized</div>
                    <div className="ml-2 text-xs">✅ Analytics Ready</div>
                    <div className="text-purple-400">Communication Playbooks:</div>
                    <div className="ml-2 text-xs">✅ Production Ready</div>
                    <div className="ml-2 text-xs">✅ Image Optimized</div>
                    <div className="ml-2 text-xs">✅ Error Handled</div>
                    <div className="text-indigo-400">Behance Portfolio:</div>
                    <div className="ml-2 text-xs">✅ Production Ready</div>
                    <div className="ml-2 text-xs">✅ Component Optimized</div>
                    <div className="ml-2 text-xs">✅ Analytics Ready</div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}