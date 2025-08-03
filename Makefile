# Makefile for Personal Website Generation

.PHONY: all generate clean help

# Default target
all: generate

# Generate all sites (QR codes and PDFs)
generate:
	@echo "Generating all sites..."
	@nix-shell -p python3 python3Packages.qrcode python3Packages.pillow --run "python3 generate_sites.py"

# Clean generated files (except main)
clean:
	@echo "Cleaning generated files..."
	@find . -name "qr_code.png" -not -path "./main/*" -delete
	@find . -name "resume.pdf" -not -path "./main/*" -not -path "./resume.pdf" -delete
	@echo "Clean complete!"

# Help
help:
	@echo "Personal Website Generator"
	@echo ""
	@echo "Usage:"
	@echo "  make          - Generate all sites (default)"
	@echo "  make generate - Generate all sites"
	@echo "  make clean    - Remove generated files (except main)"
	@echo "  make help     - Show this help message"
