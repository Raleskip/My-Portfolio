import emailjs from '@emailjs/browser'

// Safe environment variables with proper fallbacks
const getEnvVar = (key: string, defaultValue: string = '') => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || defaultValue
    }
    return defaultValue
  } catch {
    return defaultValue
  }
}

// EmailJS Configuration from environment variables
const EMAILJS_CONFIG = {
  serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID', 'service_raleskip'),
  templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID', 'template_contact'),
  publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY', 'YOUR_EMAILJS_PUBLIC_KEY')
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  projectType: string
  budget?: string
  timeline?: string
}

export interface EmailResult {
  success: boolean
  message: string
  submissionId?: string
  method?: string
}

/**
 * Send email using EmailJS
 * @param formData The contact form data
 * @returns Promise<EmailResult> indicating success/failure
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResult> => {
  try {
    // Check if EmailJS is properly configured
    const isDefaultConfig = EMAILJS_CONFIG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY'
    const isDevConfig = EMAILJS_CONFIG.publicKey === 'dev_key_disabled'
    
    if (isDefaultConfig || isDevConfig) {
      const isDevelopment = typeof window !== 'undefined' && 
                           (window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' ||
                            window.location.hostname.includes('preview'))
      
      // Only show warning in production environments
      if (!isDevelopment) {
        console.warn('[EmailJS] Not configured - using fallback method')
      }
      
      return {
        success: false,
        message: 'Email service not configured. Please use the manual email option.',
        method: 'not-configured'
      }
    }

    // Generate unique submission ID
    const submissionId = `RLSKP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Prepare email template parameters
    const templateParams = {
      to_email: 'apdontmailme@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not specified',
      project_type: formData.projectType,
      subject: formData.subject,
      message: formData.message,
      budget: formData.budget || 'Not specified',
      timeline: formData.timeline || 'Not specified',
      submission_id: submissionId,
      submission_date: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      website_source: 'Raleskip Portfolio - raleskip.com',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) : 'Unknown Browser', // Truncate for template
      client_ip: 'Hidden for privacy',
      referrer: typeof document !== 'undefined' ? (document.referrer || 'Direct visit') : 'Portfolio Contact'
    }

    console.log('[EmailJS] Sending email with config:', {
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.templateId,
      publicKey: EMAILJS_CONFIG.publicKey.substring(0, 10) + '...',
      submissionId
    })

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    if (response.status === 200) {
      console.log('[EmailJS] Email sent successfully:', {
        status: response.status,
        text: response.text,
        submissionId
      })
      
      return {
        success: true,
        message: 'Email sent successfully! I\'ll get back to you within 6 hours.',
        submissionId,
        method: 'emailjs'
      }
    } else {
      throw new Error(`EmailJS failed with status: ${response.status}`)
    }

  } catch (error) {
    console.error('[EmailJS] Failed to send email:', error)
    
    // Return user-friendly error message based on error type
    let errorMessage = 'Unknown error occurred'
    
    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network connection issue. Please check your internet connection.'
      } else if (error.message.includes('unauthorized') || error.message.includes('invalid')) {
        errorMessage = 'Email service configuration issue. Please use the manual email option.'
      } else {
        errorMessage = error.message
      }
    }
    
    return {
      success: false,
      message: `Failed to send email: ${errorMessage}. Please try the mailto fallback or contact me directly at apdontmailme@gmail.com`,
      method: 'emailjs-failed'
    }
  }
}

/**
 * Initialize EmailJS (call this once in your app)
 */
export const initializeEmailJS = () => {
  try {
    const isDevelopment = typeof window !== 'undefined' && 
                         (window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1' ||
                          window.location.hostname.includes('preview'))

    const isDefaultConfig = EMAILJS_CONFIG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY'
    const isDevConfig = EMAILJS_CONFIG.publicKey === 'dev_key_disabled'
    
    if (isDefaultConfig || isDevConfig) {
      // Only show warning in production environments
      if (!isDevelopment) {
        console.warn('[EmailJS] Not configured - email service will use fallback mode')
      }
      return false
    }

    emailjs.init(EMAILJS_CONFIG.publicKey)
    console.log('[EmailJS] Initialized successfully')
    return true
  } catch (error) {
    console.error('[EmailJS] Initialization failed:', error)
    return false
  }
}

/**
 * Create a professional email template for manual sending
 * @param formData The contact form data
 * @returns Formatted email content
 */
export const createEmailTemplate = (formData: ContactFormData): { subject: string; body: string } => {
  const subject = `🚀 New Portfolio Inquiry: ${formData.subject} | ${formData.projectType}`
  
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
🌐 Source: Raleskip Portfolio Website (${typeof window !== 'undefined' ? window.location.hostname : 'raleskip.com'})
🔗 Referrer: ${typeof document !== 'undefined' ? (document.referrer || 'Direct visit') : 'Portfolio Contact'}
📱 Device: ${typeof navigator !== 'undefined' ? (/Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop') : 'Unknown'}

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

/**
 * Fallback method using mailto link
 * @param formData The contact form data
 */
export const sendViaMailto = (formData: ContactFormData): void => {
  const { subject, body } = createEmailTemplate(formData)
  
  const mailtoUrl = `mailto:apdontmailme@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  try {
    if (mailtoUrl.length > 2000) {
      // URL too long, show copy option instead
      throw new Error('Email content too long for mailto')
    }
    
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl
      console.log('[Mailto] Email client opened successfully')
    } else {
      throw new Error('Window object not available')
    }
  } catch (error) {
    console.error('[Mailto] Failed to open email client:', error)
    
    // Show manual copy option
    const fallbackText = `${subject}\n\n${body}`
    
    // Try clipboard first
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fallbackText).then(() => {
        alert('📋 Email content copied to clipboard!\n\nPlease paste it in your email client and send to:\napdontmailme@gmail.com')
      }).catch(() => {
        showManualCopyModal(fallbackText, subject)
      })
    } else {
      showManualCopyModal(fallbackText, subject)
    }
  }
}

/**
 * Show manual copy modal for email content
 * @param content The email content to display
 * @param title The email subject
 */
const showManualCopyModal = (content: string, title: string): void => {
  // Check if document is available
  if (typeof document === 'undefined') {
    console.warn('[Modal] Document not available, cannot show modal')
    return
  }
  
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
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
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

/**
 * Check if EmailJS is properly configured
 * @returns boolean indicating if EmailJS is ready to use
 */
export const isEmailJSConfigured = (): boolean => {
  const isDefaultConfig = EMAILJS_CONFIG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY' || 
                         EMAILJS_CONFIG.serviceId === 'service_raleskip' ||
                         EMAILJS_CONFIG.templateId === 'template_contact'
  
  const isDevConfig = EMAILJS_CONFIG.publicKey === 'dev_key_disabled' ||
                     EMAILJS_CONFIG.serviceId === 'dev_service_disabled' ||
                     EMAILJS_CONFIG.templateId === 'dev_template_disabled'
  
  return !isDefaultConfig && !isDevConfig
}

export interface EmailConfigStatus {
  isConfigured: boolean
  mode: 'emailjs' | 'fallback'
  status: string
  statusColor: 'emerald' | 'amber'
  description: string
}

/**
 * Get the current email configuration status
 * @returns EmailConfigStatus object with current configuration details
 */
export const getEmailConfigStatus = (): EmailConfigStatus => {
  const isConfigured = isEmailJSConfigured()
  
  if (isConfigured) {
    return {
      isConfigured: true,
      mode: 'emailjs',
      status: 'Email Service Active',
      statusColor: 'emerald',
      description: 'Messages will be sent directly through our email service'
    }
  } else {
    return {
      isConfigured: false,
      mode: 'fallback',
      status: 'Email Client Mode',
      statusColor: 'amber',
      description: 'Messages will open in your email client'
    }
  }
}

/**
 * Get detailed configuration information for debugging
 * @returns Object with configuration debug information
 */
export const getConfigDebugInfo = () => {
  return {
    serviceId: EMAILJS_CONFIG.serviceId,
    templateId: EMAILJS_CONFIG.templateId,
    publicKeySet: EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY',
    publicKeyLength: EMAILJS_CONFIG.publicKey.length,
    isConfigured: isEmailJSConfigured(),
    environment: {
      isDevelopment: getEnvVar('DEV', 'false') === 'true',
      mode: getEnvVar('MODE', 'production'),
      hasEnvFile: !!(getEnvVar('VITE_EMAILJS_SERVICE_ID') && 
                    getEnvVar('VITE_EMAILJS_TEMPLATE_ID') && 
                    getEnvVar('VITE_EMAILJS_PUBLIC_KEY'))
    }
  }
}