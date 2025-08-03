# Personal Website

This repository contains a clean, organized personal website with multiple sub-sites, each with consistent branding and typography using the Manrope font.

## Repository Structure

```
├── README.md                    # This file
├── generate_sites.py           # Master script to generate all sites
├── generate                    # Simple wrapper script
├── Makefile                    # Make targets for common tasks
├── shell.nix                   # Nix shell environment
├── index.html                  # Main site (root, copied from main/)
├── resume.pdf                  # Main site resume (copied from main/)
├── fonts/                      # Shared Manrope font files
│   ├── static/                 # TTF font files
│   │   ├── Manrope-Regular.ttf
│   │   ├── Manrope-Bold.ttf
│   │   └── ...
│   └── Manrope.zip            # Original font archive
├── main/                      # Root site files
│   ├── index.html
│   ├── resume.tex
│   ├── resume.pdf
│   └── qr_code.png           # QR code pointing to ivan-nizamov.github.io
└── h6Eb9x2Qk7nM4pL8vR3tY/    # Sub-site
    ├── index.html
    ├── resume.tex
    ├── resume.pdf
    └── qr_code.png           # QR code pointing to sub-site URL
```

## URLs

- **Main site**: https://ivan-nizamov.github.io
- **Sub-site**: https://ivan-nizamov.github.io/h6Eb9x2Qk7nM4pL8vR3tY

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
   cp -r h6Eb9x2Qk7nM4pL8vR3tY new-site-name
   ```

2. Edit the files in the new directory:
   - Update `resume.tex` with your content
   - Modify `index.html` as needed
   - Delete the old `qr_code.png` and `resume.pdf` (they'll be regenerated)

3. Run the generation script - it will automatically discover your new directory:
   ```bash
   nix-shell -p python3 python3Packages.qrcode python3Packages.pillow --run "python3 generate_sites.py"
   ```

4. The new site will be available at `https://ivan-nizamov.github.io/new-site-name`

**Note:** The script automatically discovers directories containing `resume.tex` or `index.html`. The directory name becomes the URL path.

### Manual Resume Compilation

To manually compile a resume in any site directory:

```bash
cd site-directory
nix-shell -p texlive.combined.scheme-full --run "xelatex resume.tex"
```

## Dependencies

- **NixOS/Nix**: For reproducible builds
- **Python 3**: With qrcode and Pillow packages
- **XeLaTeX**: From texlive.combined.scheme-full
- **Manrope Font**: Included in fonts/ directory

## Notes

- All resumes use the same content but have different QR codes pointing to their specific URLs
- The main site files (index.html and resume.pdf) are copied to the root directory for GitHub Pages compatibility
- LaTeX compilation uses XeLaTeX to support the Manrope font via fontspec package
- QR codes are generated with high error correction for better scanning reliability
- The website text has been updated from "Portfolio Website" to "Personal Website" throughout all files
