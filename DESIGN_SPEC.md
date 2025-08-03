# Design Specification - Main Site

## Theme: Premium Golden Yellow
**Mood**: Sophisticated, warm, professional

## Color Palette
```css
/* Primary Colors */
--accent: #fbbf24;           /* Golden yellow - primary accent */
--accent-bright: #fde047;    /* Bright yellow - highlights */
--accent-deep: #f59e0b;      /* Amber - deep accents */
--bg-primary: #0f0f23;       /* Deep navy - primary background */
--bg-secondary: #1a1a2e;     /* Darker navy - secondary background */

/* Text Colors */
--text-primary: #f8fafc;     /* Off-white - main text */
--text-secondary: #e2e8f0;   /* Light gray - secondary text */
```

## Background Design
- **Body**: Linear gradient from `#0f0f23` to `#1a1a2e` (135deg)
- **Canvas Background**: Animated letter glitch effect with golden yellow variations
- **Vignette**: Radial gradient with subtle golden glow
- **Content Container**: 
  - Background: Linear gradient with navy tones (85% opacity)
  - Backdrop filter: 15px blur with 1.2 saturation
  - Border: 1px solid with 20% golden yellow
  - Shadow: Golden glow effect

## Typography
- **Font Family**: "Manrope", system-ui, -apple-system, Segoe UI, Roboto, sans-serif
- **Welcome Text**: 
  - Size: clamp(1.4rem, 8vw, 3.25rem)
  - Weight: 800
  - Color: #fbbf24
- **Subtitle**: 
  - Size: clamp(0.95rem, 4.5vw, 1.25rem)
  - Weight: 700
  - Color: #fbbf24

## Button Styling
- **Base State**:
  - Border: 2px solid yellow-500/30
  - Background: Gradient from yellow-900/40 via slate-900/60 to black/80
  - Shadow: 2xl with yellow tint
- **Hover State**:
  - Border: yellow-400/60
  - Scale: 1.02
  - Transform: translateY(-1px)
  - Shadow: Enhanced yellow glow
- **Active State**: Scale 0.95
- **Icon**: Yellow-400, scales to 110% on hover
- **Text Colors**: 
  - Primary: yellow-400 → yellow-300 on hover
  - Secondary: yellow-300/60 → yellow-200/80 on hover

## Animation Details
- **Glitch Colors**: ["#fbbf24", "#fde047", "#f59e0b", "#facc15", "#fcd34d"]
- **Glitch Speed**: 400ms
- **Text Animation**: 
  - Welcome: 40ms delay, 0.6s duration, y: 60px, rotationX: -90deg
  - Subtitle: 25ms delay, 0.5s duration, y: 40px, scale: 0.92

## Responsive Design
### Tablet (max-width: 768px)
- Content container: Reduced gap and padding
- Canvas opacity: Reduced to 0.7
- Blur filter: Increased to 0.5px

### Mobile (max-width: 420px)
- Content container: 98vw max-width, further reduced padding
- Welcome text: Smaller clamp values
- Subtitle: Smaller clamp values

## Accessibility
- Respects `prefers-reduced-motion`
- Safe area insets for notched devices
- ARIA labels on interactive elements
- High contrast ratios maintained
