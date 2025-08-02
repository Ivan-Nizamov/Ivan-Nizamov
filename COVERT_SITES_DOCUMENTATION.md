# Covert Multi-Site System Documentation

## Overview
This system allows hosting multiple "hidden" websites within a single GitHub Pages repository using innocuous-looking URLs that appear to be random or corrupted paths.

## Current Structure

```
github-pages-site/
├── index.html                    # Main public portfolio site
├── resume.pdf                    # Main CV (if exists)
├── h6Eb9x2Qk7nM4pL8vR3tY/      # Hidden site directory
│   ├── index.html               # Duplicate portfolio with different CV
│   └── placeholder_cv.pdf       # Alternative CV file
└── COVERT_SITES_DOCUMENTATION.md # This file
```

## Access URLs

- **Main Site**: `https://ivan-nizamov.github.io/`
- **Hidden Site**: `https://ivan-nizamov.github.io/h6Eb9x2Qk7nM4pL8vR3tY/`

## How It Works

1. GitHub Pages serves any directory with an `index.html` file as a subsite
2. Directory names are chosen to look like:
   - Random hash values
   - Corrupted URLs
   - Database IDs
   - Session tokens
   - Build artifacts

## Adding New Hidden Sites

### 1. Generate a Convincing Directory Name

Good patterns:
- `x7Qk2mN9pL4vR8` (looks like a hash)
- `tmp_build_20240102_8f3a2` (looks like temp files)
- `assets_v2_deprecated` (looks like old resources)
- `legacy_backup_2023` (looks like forgotten backups)

### 2. Create the Directory and Content

```bash
# Create new hidden site directory
mkdir -p "NEW_DIRECTORY_NAME"

# Copy existing site as template
cp index.html "NEW_DIRECTORY_NAME/"

# Modify the content as needed
# Edit NEW_DIRECTORY_NAME/index.html to change:
# - CV download link
# - Any other content differences

# Add alternative CV or resources
cp alternative_cv.pdf "NEW_DIRECTORY_NAME/special_cv.pdf"
```

### 3. Deploy

```bash
git add NEW_DIRECTORY_NAME/
git commit -m "Add build artifacts" # Use innocuous commit messages
git push
```

## Maintaining Secrecy

### DO:
- Use believable directory names that look like:
  - Build artifacts
  - Cache directories
  - Temporary files
  - Old backups
  - Hash values
- Use generic commit messages like:
  - "Update build artifacts"
  - "Clean up temp files"
  - "Archive old assets"
- Keep the main site looking normal and professional

### DON'T:
- Use obvious names like "secret", "hidden", "private"
- Link to hidden sites from public pages
- Use descriptive commit messages for hidden content
- Share URLs publicly unless intended

## Security Considerations

1. **Not True Security**: This is "security through obscurity" - anyone with the URL can access the content
2. **Search Engines**: Add a `robots.txt` to prevent indexing if needed
3. **GitHub History**: All content is visible in git history
4. **Access Logs**: GitHub may log access to these URLs

## Example: Creating a New Hidden Site

```bash
# 1. Create directory with hash-like name
mkdir -p "f4E8b2Kx9Nm3Qp7Lv"

# 2. Copy and modify content
cp index.html f4E8b2Kx9Nm3Qp7Lv/
# Edit f4E8b2Kx9Nm3Qp7Lv/index.html to point to new CV

# 3. Add new CV
cp special_resume.pdf f4E8b2Kx9Nm3Qp7Lv/cv_alt.pdf

# 4. Deploy with innocuous message
git add f4E8b2Kx9Nm3Qp7Lv/
git commit -m "Update cache files"
git push
```

## Extending the System

### Multi-Level Hidden Sites
Create nested directories for even more obscure URLs:
```
h6Eb9x2Qk7nM4pL8vR3tY/
└── cache/
    └── v2/
        └── index.html  # Accessible at /h6Eb9x2Qk7nM4pL8vR3tY/cache/v2/
```

### Dynamic Content Loading
Use JavaScript to load different content based on URL parameters:
```javascript
// In index.html
const params = new URLSearchParams(window.location.search);
if (params.get('v') === 'alt') {
    // Load alternative content
}
```

### Temporary Access
Use JavaScript to check dates and disable access after certain time:
```javascript
const expiryDate = new Date('2024-12-31');
if (new Date() > expiryDate) {
    window.location.href = '/404.html';
}
```

## Maintenance Commands

```bash
# List all hidden sites
find . -type d -name "*[0-9a-zA-Z]*" -exec test -e {}/index.html \; -print

# Update all hidden sites with new template
for dir in h6Eb9x2Qk7nM4pL8vR3tY f4E8b2Kx9Nm3Qp7Lv; do
    cp template.html "$dir/index.html"
done

# Clean up (BE CAREFUL!)
# rm -rf DIRECTORY_NAME
```

## Emergency Procedures

If a hidden site is discovered:
1. Remove the directory immediately
2. Push changes with message like "Clean up old builds"
3. Create new hidden sites with different patterns

## Notes

- This system provides plausible deniability, not true security
- Perfect for portfolio variations, different CV versions, or A/B testing
- Always assume these sites could be discovered
- Keep truly sensitive information elsewhere
