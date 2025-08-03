# Design Specification - 01-08-2025 Site

## Theme: Warm Maroon & Orange
**Mood**: Bold, energetic, creative

## Color Palette
```css
/* Primary Colors */
--accent: #f5a341;           /* Orange - primary accent */
--bg-primary: #18090e;       /* Deep maroon - background */

/* Additional Colors Used */
#fb923c                      /* Orange variant 1 */
#f97316                      /* Orange variant 2 */
#ea580c                      /* Deep orange */
#fdba74                      /* Light orange */
```

## Background Design
- **Body**: Solid color `#18090e`
- **Canvas Background**: Animated letter glitch with orange variations
- **Vignette**: Radial gradient from transparent to black (70%)
- **Content Container**:
  - Background: Linear gradient with maroon tones (85-90% opacity)
  - Backdrop filter: 15px blur with 1.2 saturation
  - Border: 1px solid with 15% orange
  - Shadow: Dark shadow with orange inner glow

## Typography
- **Font Family**: "Manrope", system-ui, -apple-system, Segoe UI, Roboto, sans-serif
- **Welcome Text**: 
  - Size: clamp(1.4rem, 8vw, 3.25rem)
  - Weight: 800
  - Color: #f5a341
- **Subtitle**: 
  - Size: clamp(0.95rem, 4.5vw, 1.25rem)
  - Weight: 700
  - Color: #f5a341

## Button Styling
- **Base State**:
  - Border: 2px solid orange-500/30
  - Background: Gradient from pink-900/40 via slate-900/60 to black/80
  - Shadow: 2xl with orange tint
- **Hover State**:
  - Border: orange-400/60
  - Scale: 1.02
  - Transform: translateY(-1px)
  - Shadow: Enhanced orange glow
- **Active State**: Scale 0.95
- **Icon**: Orange-400, scales to 110% on hover
- **Text Colors**: 
  - Primary: orange-400 → orange-300 on hover
  - Secondary: orange-300/60 → orange-200/80 on hover

## Animation Details
- **Glitch Colors**: ["#f5a341", "#fb923c", "#f97316", "#ea580c", "#fdba74"]
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
