# Design Specification - 03-08-2025 Site

## Theme: Ocean Blue & Cyan
**Mood**: Modern, tech-forward, innovative

## Color Palette
```css
/* Primary Colors */
--accent: #fdfcff;           /* Near white - primary text */
--bg-primary: #1b3565;       /* Deep blue - background */

/* Additional Colors Used */
#2ad6ff                      /* Cyan - primary accent */
#3773ed                      /* Blue - secondary accent */
#fdfcff                      /* White - text/highlights */
```

## Background Design
- **Body**: Solid color `#1b3565`
- **Canvas Background**: Animated numbers and math symbols
- **Vignette**: Radial gradient with blue tones (80% opacity)
- **Content Container**:
  - Background: Complex gradient from deep blue to cyan (40-85% opacity)
  - Backdrop filter: 15px blur with 1.2 saturation
  - Border: 1px solid with 30% white
  - Shadow: Cyan glow effect

## Typography
- **Font Family**: "Manrope", system-ui, -apple-system, Segoe UI, Roboto, sans-serif
- **Welcome Text**: 
  - Size: clamp(1.4rem, 8vw, 3.25rem)
  - Weight: 800
  - Color: #fdfcff
- **Subtitle**: 
  - Size: clamp(0.95rem, 4.5vw, 1.25rem)
  - Weight: 700
  - Color: #fdfcff

## Button Styling
- **Base State**:
  - Border: 2px solid [#2ad6ff]/40
  - Background: Gradient from [#3773ed]/15 via [#1b3565]/40 to [#1b3565]/60
  - Shadow: 2xl with cyan tint
- **Hover State**:
  - Border: [#2ad6ff]/70
  - Scale: 1.02
  - Transform: translateY(-1px)
  - Shadow: Enhanced cyan glow
- **Active State**: Scale 0.95
- **Icon**: Cyan (#2ad6ff), transitions to white on hover
- **Text Colors**: 
  - Primary: cyan → white on hover
  - Secondary: cyan/60 → white/80 on hover

## Animation Details
- **Glitch Colors**: ["#2ad6ff", "#3773ed", "#fdfcff"]
- **Glitch Speed**: 300ms (slightly faster)
- **Glitch Characters**: Numbers and mathematical symbols (emphasized)
  - Heavy emphasis on numbers (3x weight)
  - Mathematical operators: +-*/=<>≤≥±∞π√∑∏∫∂Δ
  - Greek letters: αβγδεζηθικλμνξοπρστυφχψω
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
