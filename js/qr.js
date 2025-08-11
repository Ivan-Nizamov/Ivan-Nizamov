// ============================= //
// QR Code Generation Module //
// ============================= //

(function() {
    'use strict';
    
    // QR Code configuration
    const QR_CONFIG = {
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: 2, // L=1, M=0, Q=3, H=2
        margin: 4,
        dotScale: 1
    };
    
    // Initialize QR code functionality when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQRModule);
    } else {
        initQRModule();
    }
    
    function initQRModule() {
        console.log('Initializing QR Code module...');
        
        // Create QR codes for elements with data-qr attribute
        generateQRCodes();
        
        // Setup QR code generator UI if needed
        setupQRGenerator();
        
        // Setup dynamic QR code generation
        setupDynamicQR();
    }
    
    // ============================= //
    // Generate QR Codes from Data Attributes
    // ============================= //
    
    function generateQRCodes() {
        const qrElements = document.querySelectorAll('[data-qr]');
        
        qrElements.forEach(element => {
            const data = element.dataset.qr;
            const size = parseInt(element.dataset.qrSize) || QR_CONFIG.width;
            const darkColor = element.dataset.qrDark || QR_CONFIG.colorDark;
            const lightColor = element.dataset.qrLight || QR_CONFIG.colorLight;
            
            if (data) {
                createQRCode(element, data, {
                    width: size,
                    height: size,
                    colorDark: darkColor,
                    colorLight: lightColor
                });
            }
        });
    }
    
    // ============================= //
    // Create QR Code
    // ============================= //
    
    function createQRCode(container, data, options = {}) {
        const config = { ...QR_CONFIG, ...options };
        
        // Clear container
        container.innerHTML = '';
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = config.width;
        canvas.height = config.height;
        container.appendChild(canvas);
        
        // Generate QR code on canvas
        drawQRCode(canvas, data, config);
        
        // Add download button if specified
        if (container.dataset.qrDownload === 'true') {
            addDownloadButton(container, canvas, data);
        }
        
        return canvas;
    }
    
    // ============================= //
    // Draw QR Code on Canvas
    // ============================= //
    
    function drawQRCode(canvas, data, config) {
        const ctx = canvas.getContext('2d');
        
        // Simple QR code matrix generation (simplified version)
        // In production, you would use a proper QR code library
        const qrMatrix = generateQRMatrix(data, config.correctLevel);
        const cellSize = Math.floor(Math.min(config.width, config.height) / qrMatrix.length);
        
        // Clear canvas
        ctx.fillStyle = config.colorLight;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw QR code
        ctx.fillStyle = config.colorDark;
        
        for (let row = 0; row < qrMatrix.length; row++) {
            for (let col = 0; col < qrMatrix[row].length; col++) {
                if (qrMatrix[row][col]) {
                    const x = col * cellSize + config.margin;
                    const y = row * cellSize + config.margin;
                    const size = cellSize * config.dotScale;
                    
                    // Draw with optional rounded corners
                    if (config.rounded) {
                        drawRoundedRect(ctx, x, y, size, size, size * 0.3);
                    } else {
                        ctx.fillRect(x, y, size, size);
                    }
                }
            }
        }
        
        // Add logo if specified
        if (config.logo) {
            addLogoToQR(canvas, config.logo);
        }
    }
    
    // ============================= //
    // Generate QR Matrix (Simplified)
    // ============================= //
    
    function generateQRMatrix(data, correctLevel) {
        // This is a simplified placeholder
        // In a real implementation, use a proper QR code library like qrcode.js
        const size = 25; // Standard QR code size
        const matrix = [];
        
        // Create a simple pattern for demonstration
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                // Create finder patterns (corners)
                if ((i < 7 && j < 7) || (i < 7 && j >= size - 7) || (i >= size - 7 && j < 7)) {
                    matrix[i][j] = ((i === 0 || i === 6 || j === 0 || j === 6) || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) ? 1 : 0;
                } else {
                    // Random pattern for demonstration
                    matrix[i][j] = Math.random() > 0.5 ? 1 : 0;
                }
            }
        }
        
        return matrix;
    }
    
    // ============================= //
    // Helper Functions
    // ============================= //
    
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }
    
    function addLogoToQR(canvas, logoSrc) {
        const ctx = canvas.getContext('2d');
        const logo = new Image();
        
        logo.onload = function() {
            const logoSize = canvas.width * 0.2;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;
            
            // Add white background for logo
            ctx.fillStyle = 'white';
            ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
            
            // Draw logo
            ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
        };
        
        logo.src = logoSrc;
    }
    
    function addDownloadButton(container, canvas, data) {
        const button = document.createElement('button');
        button.className = 'btn btn-primary qr-download-btn';
        button.textContent = 'Download QR Code';
        button.style.marginTop = '10px';
        
        button.addEventListener('click', () => {
            downloadQRCode(canvas, `qr-code-${Date.now()}.png`);
        });
        
        container.appendChild(button);
    }
    
    function downloadQRCode(canvas, filename) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
    
    // ============================= //
    // Setup QR Generator UI
    // ============================= //
    
    function setupQRGenerator() {
        const generator = document.querySelector('.qr-generator');
        if (!generator) return;
        
        // Create generator UI
        const html = `
            <div class="qr-generator-container">
                <h3>Generate QR Code</h3>
                <div class="form-group">
                    <label for="qr-input">Enter text or URL:</label>
                    <input type="text" id="qr-input" class="qr-input" placeholder="https://example.com">
                </div>
                <div class="form-group">
                    <label for="qr-size">Size:</label>
                    <select id="qr-size" class="qr-size">
                        <option value="128">Small (128px)</option>
                        <option value="256" selected>Medium (256px)</option>
                        <option value="512">Large (512px)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="qr-color">Color:</label>
                    <input type="color" id="qr-color" class="qr-color" value="#000000">
                </div>
                <button class="btn btn-primary generate-qr-btn">Generate QR Code</button>
                <div class="qr-output"></div>
            </div>
        `;
        
        generator.innerHTML = html;
        
        // Add event listeners
        const generateBtn = generator.querySelector('.generate-qr-btn');
        const input = generator.querySelector('#qr-input');
        const sizeSelect = generator.querySelector('#qr-size');
        const colorInput = generator.querySelector('#qr-color');
        const output = generator.querySelector('.qr-output');
        
        generateBtn.addEventListener('click', () => {
            const data = input.value.trim();
            if (!data) {
                alert('Please enter text or URL');
                return;
            }
            
            const size = parseInt(sizeSelect.value);
            const color = colorInput.value;
            
            output.innerHTML = '';
            createQRCode(output, data, {
                width: size,
                height: size,
                colorDark: color
            });
            
            // Add download button
            addDownloadButton(output, output.querySelector('canvas'), data);
        });
        
        // Generate on Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateBtn.click();
            }
        });
    }
    
    // ============================= //
    // Setup Dynamic QR Generation
    // ============================= //
    
    function setupDynamicQR() {
        // Generate QR codes for contact info
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            const email = card.dataset.email;
            const phone = card.dataset.phone;
            const vcard = card.dataset.vcard;
            
            if (vcard) {
                const qrContainer = document.createElement('div');
                qrContainer.className = 'contact-qr';
                card.appendChild(qrContainer);
                
                createQRCode(qrContainer, vcard, {
                    width: 150,
                    height: 150
                });
            }
        });
        
        // Generate QR codes for social media links
        const socialLinks = document.querySelectorAll('.social-link[data-qr-enabled="true"]');
        socialLinks.forEach(link => {
            const url = link.href;
            const qrContainer = document.createElement('div');
            qrContainer.className = 'social-qr';
            qrContainer.style.display = 'none';
            
            createQRCode(qrContainer, url, {
                width: 200,
                height: 200
            });
            
            link.parentElement.appendChild(qrContainer);
            
            // Show QR on hover
            link.addEventListener('mouseenter', () => {
                qrContainer.style.display = 'block';
            });
            
            link.addEventListener('mouseleave', () => {
                qrContainer.style.display = 'none';
            });
        });
    }
    
    // ============================= //
    // Public API
    // ============================= //
    
    window.QRGenerator = {
        create: createQRCode,
        download: downloadQRCode,
        generateMatrix: generateQRMatrix,
        config: QR_CONFIG,
        
        // Utility methods
        generateVCard: function(contact) {
            return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name || ''}
ORG:${contact.organization || ''}
TEL:${contact.phone || ''}
EMAIL:${contact.email || ''}
URL:${contact.website || ''}
END:VCARD`;
        },
        
        generateWiFi: function(ssid, password, type = 'WPA') {
            return `WIFI:T:${type};S:${ssid};P:${password};;`;
        },
        
        generateSMS: function(phone, message) {
            return `sms:${phone}?body=${encodeURIComponent(message)}`;
        },
        
        generateEmail: function(email, subject, body) {
            return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        },
        
        generateLocation: function(lat, lng, label) {
            return `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`;
        }
    };
    
})();
