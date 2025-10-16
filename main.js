// Online ToolStack - Main JavaScript

// Global variables
const toolsData = [
    {
        id: 'password-generator',
        name: 'Password Generator',
        description: 'Generate secure passwords with custom options',
        icon: 'fas fa-lock',
        category: 'generator',
        featured: true
    },
    {
        id: 'qr-generator',
        name: 'QR Code Generator',
        description: 'Create QR codes for any text or URL',
        icon: 'fas fa-qrcode',
        category: 'generator',
        featured: true
    },
    {
        id: 'color-picker',
        name: 'Color Picker',
        description: 'Pick colors and get HEX, RGB, HSL values',
        icon: 'fas fa-palette',
        category: 'generator',
        featured: true
    },
    {
        id: 'base64-encoder',
        name: 'Base64 Encoder/Decoder',
        description: 'Encode and decode Base64 strings',
        icon: 'fas fa-code',
        category: 'converter',
        featured: true
    },
    {
        id: 'url-shortener',
        name: 'URL Shortener',
        description: 'Shorten long URLs for easy sharing',
        icon: 'fas fa-link',
        category: 'converter'
    },
    {
        id: 'text-counter',
        name: 'Text Counter',
        description: 'Count characters, words, lines in text',
        icon: 'fas fa-text-width',
        category: 'text'
    },
    {
        id: 'hash-generator',
        name: 'Hash Generator',
        description: 'Generate MD5, SHA1, SHA256 hashes',
        icon: 'fas fa-hashtag',
        category: 'generator'
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Format and validate JSON data',
        icon: 'fas fa-brackets-curly',
        category: 'text'
    },
    {
        id: 'calculator',
        name: 'Calculator',
        description: 'Basic arithmetic calculator',
        icon: 'fas fa-calculator',
        category: 'calculator'
    },
    {
        id: 'percentage-calculator',
        name: 'Percentage Calculator',
        description: 'Calculate percentages and ratios',
        icon: 'fas fa-percent',
        category: 'calculator'
    },
    {
        id: 'bmi-calculator',
        name: 'BMI Calculator',
        description: 'Calculate Body Mass Index',
        icon: 'fas fa-weight',
        category: 'calculator'
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert between different units',
        icon: 'fas fa-exchange-alt',
        category: 'converter'
    },
    {
        id: 'timestamp-converter',
        name: 'Timestamp Converter',
        description: 'Convert Unix timestamps to dates',
        icon: 'fas fa-clock',
        category: 'converter'
    },
    {
        id: 'text-case-converter',
        name: 'Text Case Converter',
        description: 'Convert text to different cases',
        icon: 'fas fa-font',
        category: 'text'
    },
    {
        id: 'html-encoder',
        name: 'HTML Encoder/Decoder',
        description: 'Encode and decode HTML entities',
        icon: 'fab fa-html5',
        category: 'converter'
    },
    {
        id: 'css-minifier',
        name: 'CSS Minifier',
        description: 'Minify CSS code for optimization',
        icon: 'fab fa-css3-alt',
        category: 'text'
    },
    {
        id: 'lorem-generator',
        name: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text',
        icon: 'fas fa-paragraph',
        category: 'generator'
    },
    {
        id: 'gradient-generator',
        name: 'CSS Gradient Generator',
        description: 'Create beautiful CSS gradients',
        icon: 'fas fa-fill-drip',
        category: 'generator'
    },
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        description: 'Resize images online',
        icon: 'fas fa-image',
        category: 'converter'
    },
    {
        id: 'regex-tester',
        name: 'Regex Tester',
        description: 'Test regular expressions',
        icon: 'fas fa-search',
        category: 'text'
    },
    // New SEO Tools
    {
        id: 'meta-tag-generator',
        name: 'Meta Tag Generator',
        description: 'Generate SEO meta tags for your website',
        icon: 'fas fa-tags',
        category: 'seo'
    },
    {
        id: 'keywords-density',
        name: 'Keyword Density Checker',
        description: 'Analyze keyword density in your content',
        icon: 'fas fa-search-plus',
        category: 'seo'
    },
    {
        id: 'sitemap-generator',
        name: 'Sitemap Generator',
        description: 'Generate XML sitemaps for websites',
        icon: 'fas fa-sitemap',
        category: 'seo'
    },
    // New Developer Tools
    {
        id: 'minify-js',
        name: 'JavaScript Minifier',
        description: 'Minify JavaScript code for production',
        icon: 'fab fa-js-square',
        category: 'developer'
    },
    {
        id: 'beautify-js',
        name: 'JavaScript Beautifier',
        description: 'Format and beautify JavaScript code',
        icon: 'fas fa-magic',
        category: 'developer'
    },
    {
        id: 'sql-formatter',
        name: 'SQL Formatter',
        description: 'Format and beautify SQL queries',
        icon: 'fas fa-database',
        category: 'developer'
    },
    {
        id: 'jwt-decoder',
        name: 'JWT Token Decoder',
        description: 'Decode and inspect JWT tokens',
        icon: 'fas fa-key',
        category: 'developer'
    },
    // New Security Tools
    {
        id: 'password-checker',
        name: 'Password Strength Checker',
        description: 'Check password strength and security',
        icon: 'fas fa-shield-alt',
        category: 'security'
    },
    {
        id: 'ssl-checker',
        name: 'SSL Certificate Checker',
        description: 'Check SSL certificate status and details',
        icon: 'fas fa-certificate',
        category: 'security'
    },
    {
        id: 'port-scanner',
        name: 'Port Scanner',
        description: 'Check open ports on any domain',
        icon: 'fas fa-network-wired',
        category: 'security'
    },
    // New Business Tools
    {
        id: 'loan-calculator',
        name: 'Loan Calculator',
        description: 'Calculate loan payments and interest',
        icon: 'fas fa-money-bill-wave',
        category: 'business'
    },
    {
        id: 'invoice-generator',
        name: 'Invoice Generator',
        description: 'Create professional invoices',
        icon: 'fas fa-file-invoice-dollar',
        category: 'business'
    },
    {
        id: 'expense-tracker',
        name: 'Expense Tracker',
        description: 'Track and categorize expenses',
        icon: 'fas fa-chart-pie',
        category: 'business'
    },
    {
        id: 'roi-calculator',
        name: 'ROI Calculator',
        description: 'Calculate return on investment',
        icon: 'fas fa-percentage',
        category: 'business'
    },
    // New Design Tools
    {
        id: 'favicon-generator',
        name: 'Favicon Generator',
        description: 'Generate favicons from images',
        icon: 'fas fa-star',
        category: 'design'
    },
    {
        id: 'color-palette',
        name: 'Color Palette Generator',
        description: 'Generate harmonious color palettes',
        icon: 'fas fa-swatchbook',
        category: 'design'
    },
    {
        id: 'box-shadow-generator',
        name: 'Box Shadow Generator',
        description: 'Create CSS box shadow effects',
        icon: 'fas fa-cube',
        category: 'design'
    },
    // Additional Utility Tools
    {
        id: 'whois-lookup',
        name: 'Whois Lookup',
        description: 'Get domain registration information',
        icon: 'fas fa-globe',
        category: 'seo'
    },
    {
        id: 'markdown-to-html',
        name: 'Markdown to HTML',
        description: 'Convert Markdown to HTML',
        icon: 'fab fa-markdown',
        category: 'converter'
    },
    {
        id: 'csv-to-json',
        name: 'CSV to JSON Converter',
        description: 'Convert CSV data to JSON format',
        icon: 'fas fa-file-csv',
        category: 'converter'
    },
    // Additional Professional Tools
    {
        id: 'qr-code-scanner',
        name: 'QR Code Scanner',
        description: 'Scan and decode QR codes from images',
        icon: 'fas fa-qrcode',
        category: 'converter'
    },
    {
        id: 'html-minifier',
        name: 'HTML Minifier',
        description: 'Minify HTML code for production',
        icon: 'fab fa-html5',
        category: 'developer'
    },
    {
        id: 'credit-card-validator',
        name: 'Credit Card Validator',
        description: 'Validate credit card numbers and identify card types',
        icon: 'fas fa-credit-card',
        category: 'business'
    },
    {
        id: 'ip-address-tracker',
        name: 'IP Address Tracker',
        description: 'Get location and details of IP addresses',
        icon: 'fas fa-map-marker-alt',
        category: 'security'
    },
    {
        id: 'email-validator',
        name: 'Email Validator',
        description: 'Validate email addresses and check syntax',
        icon: 'fas fa-envelope',
        category: 'text'
    },
    // 5 Additional Professional Tools
    {
        id: 'meme-generator-pro',
        name: 'Meme Generator',
        description: 'Create custom memes with text overlays',
        icon: 'fas fa-laugh',
        category: 'generator'
    },
    {
        id: 'broken-link-checker',
        name: 'Broken Link Checker',
        description: 'Check websites for broken or invalid links',
        icon: 'fas fa-unlink',
        category: 'seo'
    },
    {
        id: 'url-shortener-pro',
        name: 'Advanced URL Shortener',
        description: 'Create short URLs with custom aliases and analytics',
        icon: 'fas fa-compress-alt',
        category: 'converter'
    },
    {
        id: 'file-hash-checker',
        name: 'File Hash Checker',
        description: 'Calculate MD5, SHA1, SHA256 hashes of uploaded files',
        icon: 'fas fa-file-signature',
        category: 'security'
    },
    {
        id: 'website-screenshot',
        name: 'Website Screenshot',
        description: 'Capture screenshots of any website',
        icon: 'fas fa-camera',
        category: 'seo'
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupScrollAnimations();
});

// Initialize Application
function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Generate tools grid
    generateToolsGrid();
    
    // Setup navigation
    setupNavigation();
    
    // Setup back to top button
    setupBackToTop();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });



    // Filter functionality
    setupFilters();

    // Featured cards click
    document.querySelectorAll('.featured-card').forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.dataset.tool;
            navigateToTool(toolId);
        });
    });
}

// Setup Navigation
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    let scrolled = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (!scrolled) {
                navbar.classList.add('scrolled');
                scrolled = true;
            }
        } else {
            if (scrolled) {
                navbar.classList.remove('scrolled');
                scrolled = false;
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Generate Tools Grid
function generateToolsGrid() {
    const toolsGrid = document.getElementById('tools-grid');
    if (!toolsGrid) return;

    toolsGrid.innerHTML = '';

    toolsData.forEach((tool, index) => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card animate-on-scroll';
        toolCard.style.animationDelay = `${index * 0.1}s`;
        toolCard.dataset.category = tool.category;
        toolCard.dataset.tool = tool.id;

        toolCard.innerHTML = `
            <div class="tool-card-header">
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h3>${tool.name}</h3>
            </div>
            <p>${tool.description}</p>
            <div class="tool-tags">
                <span class="tool-tag">${tool.category}</span>
                ${tool.featured ? '<span class="tool-tag">Featured</span>' : ''}
            </div>
        `;

        toolCard.addEventListener('click', () => {
            navigateToTool(tool.id);
        });

        toolsGrid.appendChild(toolCard);
    });
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter cards
            toolCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Navigate to Individual Tool Page
function navigateToTool(toolId) {
    const tool = toolsData.find(t => t.id === toolId);
    if (!tool) return;
    
    // Navigate to the individual tool page
    window.location.href = `${toolId}.html`;
}

// Setup Back to Top Button
function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Setup Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy to clipboard', 'error');
    });
}

function downloadFile(content, filename, contentType = 'text/plain') {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
        <span>${message}</span>
    `;

    // Add notification styles if not exist
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 16px;
                border-radius: 6px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
            }
            .notification-success { background: #28a745; }
            .notification-error { background: #dc3545; }
            .notification-info { background: #007bff; }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function generateRandomString(length, charset) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}
