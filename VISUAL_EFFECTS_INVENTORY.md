# Visual Effects Inventory - Personal Website
Generated: 2025-08-11

## 🎯 Baseline Snapshot Summary

### Website URL
- Local: http://localhost:8000
- File: `/home/navi/ivan-nizamov.github.io/index.html`
- Backup: `index_backup_[timestamp].html` (created)

## 📋 Complete Visual Effects Catalog

### 1. **Animated Glitch Background**
**Location:** Lines 154-244 (JavaScript), Lines 34-40 (CSS)
**CSS Selectors:** 
- `#letter-glitch-bg` - Fixed background container
- `#glitch-canvas` - Canvas element for animation
- `.center-vignette` - Radial gradient overlay

**JavaScript Class:** `LetterGlitch`
**Effects:**
- Animated random letter/symbol display
- Color cycling through orange/amber palette: `["#f5a341", "#fb923c", "#f97316", "#ea580c", "#fdba74"]`
- Glitch speed: 400ms intervals
- Opacity: 0.85 (0.7 on mobile)
- Blur filter: 0.3px (0.5px on mobile)
- Vignette: Radial gradient from transparent center to black edges (70% radius)

---

### 2. **Frosted Glass Panel**
**Location:** Lines 42-66 (CSS)
**CSS Selector:** `.content-container`
**Effects:**
- Background: `linear-gradient(135deg, rgba(24,9,14,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(24,9,14,0.9) 100%)`
- Backdrop filter: `blur(15px) saturate(1.2)`
- Border: `1px solid rgba(245,163,65,0.15)`
- Box shadow: `0 8px 32px 0 rgba(0,0,0,0.4), inset 0 0 24px rgba(245,163,65,0.05)`
- Overlay gradient (::before): `linear-gradient(135deg, rgba(245,163,65,0.08) 0%, transparent 50%, rgba(245,163,65,0.03) 100%)`
- Border radius: 1rem

---

### 3. **Text Animation (Split Character Animation)**
**Location:** Lines 246-315 (JavaScript)
**JavaScript Class:** `SplitTextAnimation`
**CSS Selectors:** 
- `.welcome-text` - Main heading
- `.subtitle` - Subtitle text
- `.word` - Word wrapper (prevents mid-word breaks)

**Welcome Text Animation:**
- Delay: 300ms initial, 40ms between characters
- Duration: 0.6s
- Easing: power3.out
- From state: `{ opacity: 0, y: 60, rotationX: -90 }`
- To state: `{ opacity: 1, y: 0, rotationX: 0 }`

**Subtitle Animation:**
- Delay: 650ms initial, 25ms between characters
- Duration: 0.5s
- Easing: power2.out
- From state: `{ opacity: 0, y: 40, scale: 0.92 }`
- To state: `{ opacity: 1, y: 0, scale: 1 }`

---

### 4. **Resume Download Button**
**Location:** Lines 117-149 (HTML/Tailwind)
**Interactive States:**

**Base State:**
- Background: `bg-gradient-to-br from-pink-900/40 via-slate-900/60 to-black/80`
- Border: `border-2 border-orange-500/30`
- Shadow: `shadow-2xl`

**Hover Effects:**
- Scale: `hover:scale-[1.02]`
- Transform: `hover:-translate-y-1`
- Border color: `hover:border-orange-400/60`
- Shadow: `hover:shadow-orange-500/30 hover:shadow-2xl`
- Shimmer effect: Horizontal gradient sweep (1000ms duration)
- Overlay opacity change: 0 → 100%
- Icon scale: 110%
- Arrow translate: `translate-x-1`
- Arrow opacity: 40% → 100%

**Active State:**
- Scale: `active:scale-95`

**Transition Settings:**
- Duration: 500ms (main), 300-1000ms (various elements)
- Easing: ease-out

---

### 5. **Typography & Colors**
**Location:** Lines 16, 69-83 (CSS)
**CSS Variables:**
- `--accent: #f5a341` (Orange/amber accent color)

**Font Settings:**
- Family: "Manrope" (weight 200-800), system fallbacks
- Welcome text size: `clamp(1.4rem, 8vw, 3.25rem)`
- Subtitle size: `clamp(0.95rem, 4.5vw, 1.25rem)`
- Letter spacing: -0.01em
- Line height: 1.15
- Text wrap: balance
- Hyphens: auto

---

### 6. **Responsive Breakpoints**
**Location:** Lines 90-103 (CSS)

**Tablet (max-width: 768px):**
- Container gap: 1.1rem
- Container padding: 1.5rem 1rem
- Canvas opacity: 0.7
- Canvas blur: 0.5px

**Mobile (max-width: 420px):**
- Container max-width: 98vw
- Container padding: 1.25rem 0.85rem
- Welcome text: `clamp(1.2rem, 9.5vw, 2.1rem)`
- Subtitle: `clamp(0.9rem, 4.5vw, 1.1rem)`

**Accessibility:**
- `prefers-reduced-motion: reduce` - Disables animations
- Safe area insets for notched devices
- ARIA labels and roles

---

### 7. **Layout System**
**Location:** Lines 18-31, 42-54 (CSS)
**Body Layout:**
- Display: grid
- Place items: center
- Min-height: 100svh
- Background: #18090e
- Overflow-x: hidden
- Safe area padding for mobile devices

**Content Container:**
- Max-width: 44rem (704px)
- Flexbox column layout
- Center alignment
- Gap: 1rem

---

## 🎨 Color Palette
- Background: `#18090e` (Deep burgundy/black)
- Accent: `#f5a341` (Primary orange)
- Orange variants: `#fb923c`, `#f97316`, `#ea580c`, `#fdba74`
- Pink accents: Pink-900, Pink-600, Pink-500, Pink-400
- Slate: Slate-900
- Text: White (#fff)

---

## 📦 External Dependencies
1. **Google Fonts:** Manrope (200-800 weights)
2. **Tailwind CSS:** CDN version
3. **GSAP:** Version 3.12.2 (for animations)

---

## 🔧 Critical Elements to Preserve

### Must Keep Unchanged:
1. **LetterGlitch** class - Core background animation logic
2. **SplitTextAnimation** class - Text reveal animation system
3. Frosted glass panel effect (backdrop-filter + gradients)
4. Color palette and CSS variables
5. Responsive breakpoints and mobile optimizations
6. Safe area insets for notched devices
7. Animation timing and easing curves
8. Button hover state transitions

### Browser Compatibility Notes:
- Backdrop-filter requires -webkit prefix for Safari
- SVH units for viewport height (fallback to vh if needed)
- Clamp() for responsive typography
- CSS Grid and Flexbox for layout
- Canvas API for background animation

---

## 📸 Visual States to Capture

1. **Desktop View (1920x1080)**
   - Full glitch background animation
   - Hover state on resume button
   - Text fully animated

2. **Tablet View (768px)**
   - Reduced opacity background
   - Adjusted spacing

3. **Mobile View (375px)**
   - Compact layout
   - Smaller typography
   - Safe area padding visible

4. **Animation States**
   - Initial load (before animations)
   - Mid-animation (text appearing)
   - Final state (all elements visible)

5. **Interactive States**
   - Button default
   - Button hover
   - Button active/pressed

---

## 🚀 Testing Checklist

- [ ] Glitch background animates continuously
- [ ] Text animations trigger on load
- [ ] Frosted glass effect visible
- [ ] Button hover effects work
- [ ] Responsive breakpoints apply correctly
- [ ] Safe areas respected on mobile
- [ ] Reduced motion preference honored
- [ ] All fonts load correctly
- [ ] Colors match specified palette
- [ ] No console errors
