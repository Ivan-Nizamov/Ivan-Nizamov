# Personal Portfolio Website

A modern, single-page portfolio website with glass morphism design and animated background.

## Features

- 🎨 Glass morphism tiles with blur effects
- ✨ Animated matrix background with mutating glyphs
- 📱 Fully responsive (mobile → desktop)
- 🎯 QR code for resume download
- 🚀 No build step required - pure HTML/CSS/JS
- ♿ Accessible design with proper ARIA labels
- 🌙 Dark theme by default

## Structure

```
/
  index.html          # Main HTML file
  styles.css          # All styles with CSS variables
  app.js              # Canvas animation + QR generation
  resume.pdf          # Your resume (already in place!)
  /assets
    placeholder-face.svg  # Placeholder logo (replace with face.png)
    favicon.svg          # Site favicon
```

## Quick Start

1. **Add your assets:**
   - ✅ Your resume.pdf is already in place!
   - Replace `assets/placeholder-face.svg` with `assets/face.png` (your photo/logo, 256x256px, transparent background)
   - Currently using a placeholder SVG for the face/logo

2. **Customize content:**
   - Edit the hero title and subtitle in `index.html`
   - Update the email in the info tile
   - Modify colors in CSS variables (`:root` in `styles.css`)

3. **Test locally:**
   ```bash
   # Using the included script (requires nix):
   ./serve
   
   # OR using Python
   python3 -m http.server 8000
   # OR using Node.js
   npx serve .
   # OR using PHP
   php -S localhost:8000
   ```

4. **Deploy:**
   - For GitHub Pages: Just push to your repository!
   - The site is already configured for GitHub Pages (ivan-nizamov.github.io)
   - Or upload all files to any static host (Netlify, Vercel, etc.)

## Design Tokens

Edit these in `styles.css` to customize the look:

- `--r`: Card border radius (22px)
- `--r-xl`: Hero card radius (28px)
- `--blur`: Backdrop blur amount (22px)
- `--fg`: Main text color
- `--fg-dim`: Secondary text color
- `--ac1`: Primary accent (blue)
- `--ac2`: Secondary accent (purple)

## Performance

- Canvas animation capped at ~20 FPS for efficiency
- Respects `prefers-reduced-motion` for accessibility
- Lightweight QR library (~40KB)
- No heavy frameworks or build tools

## Browser Support

- Modern browsers with backdrop-filter support
- Fallback styling for older browsers
- Mobile responsive from 320px width

## To-Do

- [x] Add real resume PDF (✅ Already added!)
- [ ] Add actual profile photo/logo (replace placeholder-face.svg with face.png)
- [ ] Consider adding OpenGraph meta tags
- [ ] Optional: Add light mode toggle
- [ ] Optional: Use short link for QR code (for easy PDF updates)

## License

Free to use and modify for your personal portfolio.
