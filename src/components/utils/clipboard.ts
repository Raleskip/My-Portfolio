// Safe clipboard utility with comprehensive fallbacks and error handling
export interface ClipboardResult {
  success: boolean
  error?: string
}

/**
 * Safely copy text to clipboard with multiple fallback methods
 * @param text The text to copy to clipboard
 * @returns Promise<ClipboardResult> indicating success/failure
 */
export const copyToClipboard = async (text: string): Promise<ClipboardResult> => {
  // Input validation
  if (!text || typeof text !== 'string') {
    return { success: false, error: 'Invalid text provided' }
  }

  try {
    // Method 1: Modern Clipboard API (requires HTTPS and permissions)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return { success: true }
      } catch (clipboardError) {
        console.warn('Clipboard API failed:', clipboardError)
        // Fall through to next method
      }
    }

    // Method 2: Legacy execCommand (deprecated but widely supported)
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        
        // Make textarea invisible but accessible
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        textArea.style.opacity = '0'
        textArea.style.pointerEvents = 'none'
        textArea.setAttribute('readonly', '')
        textArea.setAttribute('aria-hidden', 'true')
        
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        textArea.setSelectionRange(0, text.length)
        
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (successful) {
          return { success: true }
        }
      } catch (execCommandError) {
        console.warn('execCommand failed:', execCommandError)
        // Clean up if error occurs
        const existingTextArea = document.querySelector('textarea[aria-hidden="true"]')
        if (existingTextArea) {
          document.body.removeChild(existingTextArea)
        }
      }
    }

    // Method 3: Manual selection fallback for mobile/touch devices
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '50%'
      textArea.style.top = '50%'
      textArea.style.transform = 'translate(-50%, -50%)'
      textArea.style.padding = '12px'
      textArea.style.background = '#1a1a1a'
      textArea.style.color = '#ffffff'
      textArea.style.border = '2px solid #8b5cf6'
      textArea.style.borderRadius = '8px'
      textArea.style.fontSize = '16px'
      textArea.style.zIndex = '10000'
      textArea.style.maxWidth = '90vw'
      textArea.style.maxHeight = '200px'
      textArea.setAttribute('readonly', '')
      
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      // For mobile devices, show selection for a few seconds
      if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        return new Promise((resolve) => {
          const cleanup = () => {
            if (document.body.contains(textArea)) {
              document.body.removeChild(textArea)
            }
          }
          
          // Auto-cleanup after 5 seconds
          setTimeout(() => {
            cleanup()
            resolve({ success: true })
          }, 5000)
          
          // Allow manual cleanup
          textArea.addEventListener('blur', cleanup)
          textArea.addEventListener('click', cleanup)
        })
      } else {
        document.body.removeChild(textArea)
      }
    } catch (manualError) {
      console.warn('Manual selection failed:', manualError)
    }

    // All methods failed
    return { 
      success: false, 
      error: 'Clipboard access not available. Please copy manually.' 
    }

  } catch (generalError) {
    console.error('Clipboard operation failed:', generalError)
    return { 
      success: false, 
      error: generalError instanceof Error ? generalError.message : 'Unknown clipboard error' 
    }
  }
}

/**
 * Check if clipboard API is available
 * @returns boolean indicating clipboard availability
 */
export const isClipboardAvailable = (): boolean => {
  try {
    return !!(
      (navigator.clipboard && window.isSecureContext) ||
      (document.queryCommandSupported && document.queryCommandSupported('copy'))
    )
  } catch {
    return false
  }
}

/**
 * Show a fallback modal with text for manual copying
 * @param text The text to display for manual copying
 * @param title Optional title for the modal
 */
export const showManualCopyModal = (text: string, title: string = 'Copy Text'): void => {
  // Create modal overlay
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  `

  // Create modal content
  const modal = document.createElement('div')
  modal.style.cssText = `
    background: #1a1a1a;
    border: 2px solid #8b5cf6;
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  `

  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0;">${title}</h3>
      <button id="closeModal" style="
        background: none;
        border: none;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background-color 0.2s;
      ">×</button>
    </div>
    <textarea readonly style="
      width: 100%;
      min-height: 120px;
      background: #0a0a0a;
      border: 1px solid #444;
      color: #ffffff;
      padding: 12px;
      border-radius: 8px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 14px;
      resize: vertical;
      box-sizing: border-box;
    ">${text}</textarea>
    <div style="margin-top: 16px; text-align: center;">
      <button id="selectAllBtn" style="
        background: #8b5cf6;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        margin-right: 8px;
        transition: background-color 0.2s;
      ">Select All</button>
      <button id="closeModalBtn" style="
        background: #444;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s;
      ">Close</button>
    </div>
    <p style="color: #888; font-size: 12px; margin-top: 12px; text-align: center;">
      Select the text above and copy it manually (Ctrl+C or Cmd+C)
    </p>
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
  const closeBtn = modal.querySelector('#closeModalBtn') as HTMLButtonElement
  const closeX = modal.querySelector('#closeModal') as HTMLButtonElement

  selectAllBtn.onclick = () => {
    textarea.focus()
    textarea.select()
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

  // Auto-close after 30 seconds
  setTimeout(closeModal, 30000)
}

/**
 * Universal share function with multiple fallbacks
 * @param data ShareData object containing title, text, url
 * @returns Promise<ClipboardResult> indicating success/failure
 */
export interface ShareData {
  title?: string
  text?: string
  url?: string
}

export const universalShare = async (data: ShareData): Promise<ClipboardResult> => {
  try {
    // Method 1: Native Web Share API (mobile browsers)
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share(data)
        return { success: true }
      } catch (shareError) {
        console.warn('Native share failed:', shareError)
        // Fall through to clipboard
      }
    }

    // Method 2: Copy to clipboard as fallback
    const shareText = [
      data.title,
      data.text,
      data.url
    ].filter(Boolean).join('\n\n')

    const clipboardResult = await copyToClipboard(shareText)
    
    if (clipboardResult.success) {
      return { success: true }
    } else {
      // Method 3: Show manual copy modal
      showManualCopyModal(shareText, data.title || 'Share')
      return { success: true }
    }

  } catch (error) {
    console.error('Universal share failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Share failed' 
    }
  }
}