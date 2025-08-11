// ============================= //
// Main JavaScript - UI Interactions //
// ============================= //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app features
function initializeApp() {
    console.log('Initializing application...');
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize form handling
    initForms();
    
    // Initialize theme toggling
    initThemeToggle();
    
    // Initialize mobile menu
    initMobileMenu();
    
    console.log('Application initialized successfully!');
}

// ============================= //
// Smooth Scrolling
// ============================= //

function initSmoothScroll() {
    // Get all links that start with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================= //
// Navigation
// ============================= //

function initNavigation() {
    const nav = document.querySelector('nav');
    
    if (!nav) return;
    
    // Add sticky navigation on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('sticky');
            
            // Hide/show based on scroll direction
            if (currentScroll > lastScroll) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
        } else {
            nav.classList.remove('sticky');
            nav.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================= //
// Animations
// ============================= //

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Optionally unobserve after animation
                if (entry.target.dataset.animateOnce === 'true') {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add parallax effect to elements with .parallax class
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ============================= //
// Form Handling
// ============================= //

function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    clearError(field);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    showError(field, 'Please enter a valid email address');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted:', data);
                showSuccess(form, 'Form submitted successfully!');
                
                // Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                }, 2000);
            }
        });
        
        // Remove error on input
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    clearError(this);
                }
            });
        });
    });
}

// Helper functions for form validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(field, message) {
    const errorElement = field.parentElement.querySelector('.error-message') || 
                        createErrorElement(field, message);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function createErrorElement(field, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    field.parentElement.appendChild(errorElement);
    return errorElement;
}

function showSuccess(form, message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.cssText = `
        background: #4caf50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
    `;
    form.appendChild(successElement);
    
    setTimeout(() => {
        successElement.remove();
    }, 3000);
}

// ============================= //
// Theme Toggle
// ============================= //

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        // Create theme toggle button if it doesn't exist
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.innerHTML = '🌙';
        button.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(button);
    }
    
    // Get saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle(currentTheme);
    
    // Add click event
    const toggle = document.querySelector('.theme-toggle');
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
    });
}

function updateThemeToggle(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    }
}

// ============================= //
// Mobile Menu
// ============================= //

function initMobileMenu() {
    // Create mobile menu button if needed
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    mobileMenuBtn.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
    `;
    
    // Show mobile menu button on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMobileMenu(e) {
        if (e.matches) {
            mobileMenuBtn.style.display = 'block';
            nav.classList.add('mobile-nav');
        } else {
            mobileMenuBtn.style.display = 'none';
            nav.classList.remove('mobile-nav', 'nav-open');
        }
    }
    
    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);
    
    nav.parentElement.insertBefore(mobileMenuBtn, nav);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// ============================= //
// Utility Functions
// ============================= //

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// Export functions for use in other scripts
window.appUtils = {
    debounce,
    throttle,
    copyToClipboard,
    showError,
    clearError,
    showSuccess
};
