# Personal Website

This repository contains a clean, organized personal website with multiple sub-sites, each with consistent branding and typography using the Manrope font.

## Repository Structure

```
├── 01-08-2025/                 # Sub-site directory
│   ├── index.html
│   ├── resume.tex
│   ├── resume.pdf
│   └── qr_code.png           # QR code pointing to /01-08-2025
├── 03-08-2025/                 # Sub-site directory  
│   ├── index.html
│   ├── resume.tex
│   ├── resume.pdf
│   └── qr_code.png           # QR code pointing to /03-08-2025
├── fonts/                      # Shared Manrope font files
│   ├── static/                 # TTF font files
│   │   ├── Manrope-Regular.ttf
│   │   ├── Manrope-Bold.ttf
│   │   └── ...
│   └── Manrope.zip            # Original font archive
├── generate                    # Simple wrapper script to generate all sites
├── generate_sites.py           # Master script to generate all sites
├── index.html                  # Main site (root)
├── Makefile                    # Make targets for common tasks
├── README.md                   # This file
├── resume.pdf                  # Main site resume
├── serve                       # Simple script to start local dev server
└── shell.nix                   # Nix shell environment
```

## URLs

- **Main site**: https://ivan-nizamov.github.io
- **Sub-site 1**: https://ivan-nizamov.github.io/01-08-2025
- **Sub-site 2**: https://ivan-nizamov.github.io/03-08-2025

## Features

- **Automatic Site Discovery**: Script automatically finds all site directories - no manual configuration needed
- **Consistent Typography**: All sites use Manrope font (same as website text)
- **Automated Generation**: Single script generates all QR codes and resumes
- **Clean Structure**: Each site is self-contained with all necessary files
- **QR Code Integration**: Each resume includes a QR code linking to its specific URL

## Usage

### Generate All Sites

Run the generation script using one of these methods:

**Simple method (recommended):**
```bash
./generate
```

**Using Make:**
```bash
make
```

**Using Nix shell:**
```bash
nix-shell
generate  # alias available in the shell
```

**Direct command:**
```bash
nix-shell -p python3 python3Packages.qrcode python3Packages.pillow --run "python3 generate_sites.py"
```

**Note:** The script uses `texlive.combined.scheme-full` to ensure all required LaTeX packages are available for compilation.

This will:
1. Generate QR codes for each site URL
2. Copy templates to each site directory
3. Compile LaTeX resumes to PDF using XeLaTeX with Manrope font
4. Clean up auxiliary files

### Adding New Sites

To add a new sub-site:

1. Create a new directory with your desired URL path name:
   ```bash
   cp -r 01-08-2025 new-site-name
   ```

2. Edit the files in the new directory:
   - Update `resume.tex` with your content
   - Modify `index.html` as needed
   - Delete the old `qr_code.png` and `resume.pdf` (they'll be regenerated)

3. Run the generation script - it will automatically discover your new directory:
   ```bash
   ./generate
   ```

4. The new site will be available at `https://ivan-nizamov.github.io/new-site-name`

**Note:** The script automatically discovers directories containing `resume.tex` or `index.html`. The directory name becomes the URL path.

### Manual Resume Compilation

To manually compile a resume in any site directory:

```bash
cd site-directory
nix-shell -p texlive.combined.scheme-full --run "xelatex resume.tex"
```

### Local Development Server

To start a local development server:

```bash
./serve
```

This will start a server at http://localhost:8000 where you can preview your site before pushing to GitHub Pages.

## Dependencies

- **NixOS/Nix**: For reproducible builds
- **Python 3**: With qrcode and Pillow packages
- **XeLaTeX**: From texlive.combined.scheme-full
- **Manrope Font**: Included in fonts/ directory

## Notes

- Each site directory is self-contained with its own resume, QR code, and HTML content
- The main site no longer exists as a separate directory - the root files serve as the main site
- LaTeX compilation uses XeLaTeX to support the Manrope font via fontspec package
- QR codes are generated with high error correction for better scanning reliability
- Site directories can use any naming convention and will be automatically discovered
- The `serve` script provides a quick way to preview changes locally before deploying
