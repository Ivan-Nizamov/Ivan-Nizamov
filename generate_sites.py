#!/usr/bin/env python3
"""
Automatic Personal Website Generator

Automatically discovers site directories and generates QR codes and PDFs.
A directory is considered a site if it contains resume.tex or index.html.
The directory name becomes the URL path (e.g., 'projects' -> '/projects').

Special directories ignored: .git, fonts, __pycache__, .vscode
The 'main' directory maps to the root URL.
"""

import os
import subprocess
import qrcode
from pathlib import Path

class PortfolioGenerator:
    def __init__(self, base_url="https://ivan-nizamov.github.io"):
        self.base_url = base_url
        self.root_dir = Path(__file__).parent
        
        # Automatically discover all site directories
        self.sites = self._discover_sites()
    
    def generate_qr_code(self, url, output_path, size=150):
        """Generate QR code for the given URL"""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=1,
        )
        qr.add_data(url)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((size, size))
        img.save(output_path)
        print(f"✓ Generated QR code: {output_path}")
    
    def _discover_sites(self):
        """Automatically discover all site directories based on structure"""
        sites = {}
        
        # Main site is always at root
        if (self.root_dir / "main").exists():
            sites["main"] = ""
        
        # Find all directories that look like site directories
        # A site directory should contain either resume.tex or index.html
        for item in self.root_dir.iterdir():
            if item.is_dir() and item.name not in ['.git', 'fonts', '__pycache__', '.vscode', 'main']:
                # Check if it looks like a site directory
                if (item / "resume.tex").exists() or (item / "index.html").exists():
                    # Directory name becomes the URL path
                    sites[item.name] = f"/{item.name}"
        
        # Sort sites for consistent ordering (main first, then alphabetical)
        sorted_sites = {}
        if "main" in sites:
            sorted_sites["main"] = sites["main"]
        for name in sorted(sites.keys()):
            if name != "main":
                sorted_sites[name] = sites[name]
        
        return sorted_sites
    
    def compile_latex(self, tex_file, output_dir):
        """Compile LaTeX file to PDF using XeLaTeX"""
        print(f"✓ Compiling LaTeX file: {tex_file}")
        
        # Change to the output directory for compilation
        original_cwd = os.getcwd()
        os.chdir(output_dir)
        
        try:
            cmd = [
                "nix-shell", "-p", 
                "texlive.combined.scheme-full",
                "--run", f"xelatex -interaction=nonstopmode {tex_file.name}"
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            # Check if PDF was actually generated
            base_name = tex_file.stem
            pdf_file = output_dir / f"{base_name}.pdf"
            target_pdf = output_dir / "resume.pdf"
            
            if not pdf_file.exists():
                print(f"✗ LaTeX compilation failed for {tex_file}")
                print(f"Return code: {result.returncode}")
                print("STDOUT:", result.stdout[-500:] if result.stdout else "None")
                print("STDERR:", result.stderr[-500:] if result.stderr else "None")
                return False
            
            # Rename output to resume.pdf if needed
            if pdf_file != target_pdf:
                if target_pdf.exists():
                    target_pdf.unlink()
                pdf_file.rename(target_pdf)
            
            print(f"✓ Generated PDF: {target_pdf}")
            
            # Clean up auxiliary files
            for ext in ["aux", "log", "out"]:
                aux_file = output_dir / f"{base_name}.{ext}"
                if aux_file.exists():
                    aux_file.unlink()
            
            return True
            
        except Exception as e:
            print(f"✗ Exception during LaTeX compilation: {e}")
            return False
        finally:
            os.chdir(original_cwd)
    
    def setup_site_directory(self, site_name, url_path):
        """Process an existing site directory: generate QR code and compile LaTeX"""
        site_dir = self.root_dir / site_name
        
        if not site_dir.exists():
            print(f"✗ Site directory {site_name} does not exist, skipping")
            return False
        
        # Full URL for this site
        full_url = self.base_url + url_path
        
        print(f"\n=== Processing site: {site_name} ({full_url}) ===")
        
        # 1. Generate QR code
        qr_target = site_dir / "qr_code.png"
        self.generate_qr_code(full_url, qr_target)
        
        # 2. Compile LaTeX to PDF if resume.tex exists
        tex_file = site_dir / "resume.tex"
        if tex_file.exists():
            success = self.compile_latex(tex_file, site_dir)
            if not success:
                print(f"✗ Failed to generate PDF for {site_name}")
                return False
        else:
            print(f"ⓘ No resume.tex found in {site_name}, skipping PDF generation")
        
        print(f"✓ Site {site_name} processing complete")
        return True
    
    def generate_all_sites(self):
        """Process all portfolio sites"""
        print("=== Portfolio Sites Generator ===\n")
        
        # Display discovered sites
        print(f"Discovered {len(self.sites)} site(s):")
        for site_name, url_path in self.sites.items():
            full_url = self.base_url + url_path
            print(f"  • {site_name} → {full_url}")
        
        successful_sites = 0
        
        # Process each site
        for site_name, url_path in self.sites.items():
            try:
                if self.setup_site_directory(site_name, url_path):
                    successful_sites += 1
            except Exception as e:
                print(f"✗ Error processing {site_name}: {e}")
                continue
        
        print(f"\n=== Processing Complete ===")
        print(f"Successfully processed {successful_sites}/{len(self.sites)} sites")
        return successful_sites > 0
    
def main():
    generator = PortfolioGenerator()
    
    # Process all sites
    success = generator.generate_all_sites()
    
    if success:
        # Copy main resume to root for GitHub Pages
        main_resume = generator.root_dir / "main" / "resume.pdf"
        root_resume = generator.root_dir / "resume.pdf"
        if main_resume.exists():
            import shutil
            shutil.copy2(main_resume, root_resume)
            print(f"✓ Copied main resume to root: {root_resume}")
        
        print("\n🎉 All portfolio sites processed successfully!")
        print("\nEach site directory is independent and contains:")
        print("• index.html - Site content")
        print("• resume.tex - LaTeX source")
        print("• resume.pdf - Generated PDF")
        print("• qr_code.png - QR code for that specific URL")
    else:
        print("\n✗ Processing failed!")

if __name__ == "__main__":
    main()
