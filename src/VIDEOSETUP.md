# 🎬 AI Video Background Setup Guide

## Overview

This guide will help you add the AI animation video from Pexels as a dynamic background to your Hero section.

## Video Source

**Original Video**: [AI Animation by Martina Stiftinger](https://www.pexels.com/video/an-artist-s-animation-of-artificial-intelligence-ai-this-video-represents-how-ai-powered-tools-can-support-us-and-save-time-it-was-created-by-martina-stiftinger-as-part-of-the-visualis-18069232/)

## Step-by-Step Setup

### 1. Download the Video

1. Visit the Pexels link above
2. Click the **Download** button
3. Choose **HD 1920x1080** for best quality
4. Save the file as `ai-animation-original.mp4`

### 2. Optimize the Video for Web

To ensure fast loading and smooth playback, you need to optimize the video:

#### Option A: Using FFmpeg (Recommended)

```bash
# Install FFmpeg if you haven't already
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
# Windows: Download from https://ffmpeg.org/

# Create optimized MP4 (smaller file size)
ffmpeg -i ai-animation-original.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  ai-animation-optimized.mp4

# Create WebM version (better compression)
ffmpeg -i ai-animation-original.mp4 \
  -c:v libvpx-vp9 \
  -b:v 1M \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:a libvorbis \
  -b:a 128k \
  ai-animation-optimized.webm
```

#### Option B: Using Online Tools

- **CloudConvert**: https://cloudconvert.com/
- **Online Video Converter**: https://www.onlinevideoconverter.com/
- **Handbrake**: https://handbrake.fr/ (Desktop app)

**Settings for optimization:**
- **Resolution**: 1920x1080 (HD)
- **Format**: MP4 (H.264) and WebM (VP9)
- **Bitrate**: 1000-2000 kbps
- **File size target**: Under 10MB
- **Frame rate**: 30fps

### 3. Add Videos to Your Project

The `public/assets/` directory has already been created for you. Add your optimized videos:

```bash
# Copy your optimized videos to the assets directory
cp ai-animation-optimized.mp4 public/assets/
cp ai-animation-optimized.webm public/assets/
```

**Required file structure:**
```
public/
└── assets/
    ├── README.md (instructions - already present)
    ├── ai-animation-optimized.mp4 (add this file)
    └── ai-animation-optimized.webm (add this file)
```

### 3.1 Quick Test (Optional)

If you want to test the video system immediately, you can temporarily use a placeholder:

```bash
# Download a test video (temporary)
cd public/assets
curl -o ai-animation-optimized.mp4 "https://sample-videos.com/zip/10/mp4/720/SampleVideo_720x480_1mb.mp4"
```

This will show you how the video system works before you add the actual AI animation.

### 4. Verify Implementation

The video background has already been implemented in the Hero component with:

- ✅ **Auto-play**: Starts automatically when page loads
- ✅ **Muted**: Plays without sound (required for auto-play)
- ✅ **Loop**: Continuously repeats
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Optimized**: GPU accelerated with performance optimizations
- ✅ **Fallback**: Graceful fallback to gradient background if video fails
- ✅ **Multiple formats**: Supports both MP4 and WebM for better compatibility

### 5. Test the Implementation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the homepage

3. You should see the AI animation playing as a subtle background behind the hero content

4. If the video doesn't load, check the browser console for errors

## Troubleshooting

### ❌ Error: "AI video failed to load, using gradient fallback"

This is **normal** and **expected** until you add the video files! 

**Solution:**
1. Check that `public/assets/` directory exists ✅ (already created)
2. Add the video files:
   - `public/assets/ai-animation-optimized.mp4`
   - `public/assets/ai-animation-optimized.webm`
3. Refresh your browser

**The gradient background looks amazing too!** So this isn't urgent.

### Video Not Playing After Adding Files?

1. **Check file paths**: Ensure videos are in `public/assets/` (not `src/assets/`)
2. **Check file names**: Must match exactly:
   - `ai-animation-optimized.mp4`
   - `ai-animation-optimized.webm`
3. **Check file size**: Keep under 10MB for fast loading
4. **Check browser console**: Look for 404 or loading errors
5. **Hard refresh**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Performance Issues?

1. **Reduce video quality**: Lower bitrate or resolution
2. **Compress further**: Use higher compression settings
3. **Check network**: Large videos may be slow on slow connections
4. **Enable fallback**: The gradient background will show if video fails

### Browser Compatibility

The implementation supports:
- ✅ Chrome (all versions)
- ✅ Firefox (all versions)  
- ✅ Safari (all versions)
- ✅ Edge (all versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Advanced Customization

### Adjust Video Effects

Edit the CSS in `/styles/globals.css`:

```css
.hero-video {
  /* Adjust these values to change the video appearance */
  filter: brightness(0.3) contrast(1.2) saturate(1.1) hue-rotate(10deg);
}
```

**Filter options:**
- `brightness(0.1-1.0)`: Controls video brightness
- `contrast(1.0-2.0)`: Adjusts contrast
- `saturate(0.5-2.0)`: Color saturation
- `hue-rotate(0-360deg)`: Color tint

### Change Video Timing

Edit the animation in `/styles/globals.css`:

```css
.hero-video-enhanced {
  animation: ai-glow-pulse 20s ease-in-out infinite;
  /* Change 20s to adjust animation speed */
}
```

## Credits

- **Video**: Created by Martina Stiftinger for Pexels
- **License**: Free to use under Pexels License
- **Implementation**: Optimized for Raleskip Portfolio

## Support

If you encounter any issues with the video setup, please check:
1. File paths and names are correct
2. Videos are properly optimized
3. Browser console for error messages
4. Network tab for loading issues

The system will automatically fall back to the beautiful animated gradient background if the video cannot load.