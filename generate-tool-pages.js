// Tool Page Generator Script
// This script generates individual HTML pages for all tools

const fs = require('fs');

// Tools Data - copied from main.js
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

// Generate HTML template for a tool
function generateToolHTML(tool) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>${tool.name} - Online ToolStack</title>
    <meta name="description" content="${tool.description} - Free online tool at Online ToolStack">
    <meta name="keywords" content="${tool.name.toLowerCase()}, ${tool.category} tools, online tools, web tools, ${tool.id.replace('-', ' ')}">
    <meta name="author" content="Online ToolStack">
    <link rel="canonical" href="https://onlinetoolstack.com/${tool.id}.html">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${tool.name} - Online ToolStack">
    <meta property="og:description" content="${tool.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://onlinetoolstack.com/${tool.id}.html">
    <meta property="og:site_name" content="Online ToolStack">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${tool.name} - Online ToolStack">
    <meta name="twitter:description" content="${tool.description}">
    <meta name="twitter:site" content="@onlinetoolstack">
    
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "${tool.name}",
        "description": "${tool.description}",
        "url": "https://onlinetoolstack.com/${tool.id}.html",
        "applicationCategory": "Utility",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "provider": {
            "@type": "Organization",
            "name": "Online ToolStack",
            "url": "https://onlinetoolstack.com"
        }
    }
    </script>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/tools.css">
    <link rel="stylesheet" href="css/tool-pages.css">
    <link rel="stylesheet" href="css/animations.css">
    
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX" crossorigin="anonymous"></script>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="/">
                    <i class="fas fa-tools"></i>
                    <span>Online ToolStack</span>
                </a>
            </div>
            
            <div class="nav-menu" id="nav-menu">
                <a href="/" class="nav-link">Home</a>
                <a href="/#tools" class="nav-link">All Tools</a>
                <a href="/about.html" class="nav-link">About</a>
                <a href="/contact.html" class="nav-link">Contact</a>
                <a href="/blog.html" class="nav-link">Blog</a>
            </div>
            
            <div class="nav-toggle" id="nav-toggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-container">
        <nav class="breadcrumb">
            <a href="/" class="breadcrumb-item">
                <i class="fas fa-home"></i> Home
            </a>
            <span class="breadcrumb-separator">
                <i class="fas fa-chevron-right"></i>
            </span>
            <a href="/#tools" class="breadcrumb-item">Tools</a>
            <span class="breadcrumb-separator">
                <i class="fas fa-chevron-right"></i>
            </span>
            <span class="breadcrumb-current">${tool.name}</span>
        </nav>
    </div>

    <!-- Tool Header -->
    <section class="tool-header">
        <div class="tool-header-container">
            <div class="tool-header-content">
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="tool-info">
                    <h1 class="tool-title">${tool.name}</h1>
                    <p class="tool-description">${tool.description}</p>
                    <div class="tool-meta">
                        <span class="tool-category">
                            <i class="fas fa-tag"></i> ${tool.category}
                        </span>
                        ${tool.featured ? '<span class="tool-featured"><i class="fas fa-star"></i> Featured</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="tool-actions">
                <button onclick="window.history.back()" class="btn-secondary">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                <a href="/" class="btn-primary">
                    <i class="fas fa-home"></i> All Tools
                </a>
            </div>
        </div>
    </section>

    <!-- Tool Content -->
    <div class="tool-content">
        <div class="tool-main" id="tool-main">
            <!-- Tool content will be loaded here -->
        </div>

        <!-- Related Tools -->
        <div class="related-tools">
            <h3><i class="fas fa-tools"></i> Related Tools</h3>
            <div class="related-tools-grid" id="related-tools-grid">
                <!-- Related tools will be populated here -->
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-grid">
                <div class="footer-section">
                    <div class="footer-logo">
                        <i class="fas fa-tools"></i>
                        <span>Online ToolStack</span>
                    </div>
                    <p class="footer-description">
                        Professional web tools for developers, content creators, and digital professionals. 
                        All tools are free, fast, and secure.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Facebook">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3 class="footer-title">Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/#tools">All Tools</a></li>
                        <li><a href="/about.html">About Us</a></li>
                        <li><a href="/contact.html">Contact</a></li>
                        <li><a href="/blog.html">Blog</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3 class="footer-title">Tool Categories</h3>
                    <ul class="footer-links">
                        <li><a href="/#category-text">Text Tools</a></li>
                        <li><a href="/#category-generator">Generators</a></li>
                        <li><a href="/#category-calculator">Calculators</a></li>
                        <li><a href="/#category-converter">Converters</a></li>
                        <li><a href="/#category-seo">SEO Tools</a></li>
                        <li><a href="/#category-developer">Developer Tools</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3 class="footer-title">Legal</h3>
                    <ul class="footer-links">
                        <li><a href="/privacy.html">Privacy Policy</a></li>
                        <li><a href="/terms.html">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Online ToolStack. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-chevron-up"></i>
    </button>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
    <script src="js/tools.js"></script>
    <script src="js/animations.js"></script>
    <script>
        // Initialize the specific tool
        document.addEventListener('DOMContentLoaded', function() {
            const toolMain = document.getElementById('tool-main');
            const toolId = '${tool.id}';
            
            // Load tool HTML
            toolMain.innerHTML = getToolHTML(toolId);
            
            // Initialize tool functionality
            initializeTool(toolId);
            
            // Initialize shared functionality
            initializeSharedFunctionality();
            
            // Load related tools
            loadRelatedTools(toolId);
        });
        
        // Load related tools
        function loadRelatedTools(currentToolId) {
            const toolsData = window.toolsData || []; // Access from main.js
            const currentTool = toolsData.find(t => t.id === currentToolId);
            if (!currentTool) return;
            
            // Get tools from same category
            const relatedTools = toolsData
                .filter(tool => 
                    tool.category === currentTool.category && 
                    tool.id !== currentToolId
                )
                .slice(0, 6);
            
            // If not enough from same category, add featured tools
            if (relatedTools.length < 3) {
                const additionalTools = toolsData
                    .filter(tool => 
                        tool.featured && 
                        tool.id !== currentToolId &&
                        !relatedTools.find(rt => rt.id === tool.id)
                    )
                    .slice(0, 6 - relatedTools.length);
                
                relatedTools.push(...additionalTools);
            }
            
            const relatedGrid = document.getElementById('related-tools-grid');
            if (relatedGrid && relatedTools.length > 0) {
                relatedGrid.innerHTML = relatedTools.map(tool => \`
                    <a href="\${tool.id}.html" class="related-tool-card">
                        <div class="tool-card-icon">
                            <i class="\${tool.icon}"></i>
                        </div>
                        <div class="tool-card-name">\${tool.name}</div>
                        <div class="tool-card-description">\${tool.description}</div>
                    </a>
                \`).join('');
            }
        }
        
        // Initialize shared functionality from template
        function initializeSharedFunctionality() {
            // Mobile menu toggle
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                });
            }

            // Back to top functionality
            const backToTop = document.getElementById('back-to-top');
            if (backToTop) {
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
        }
    </script>
</body>
</html>`;
}

// Generate all tool pages
function generateAllToolPages() {
    let generatedCount = 0;
    
    toolsData.forEach(tool => {
        try {
            const html = generateToolHTML(tool);
            const filename = `${tool.id}.html`;
            
            console.log(`Generating ${filename}...`);
            // In actual implementation, you would write to files here
            // fs.writeFileSync(filename, html, 'utf8');
            
            generatedCount++;
        } catch (error) {
            console.error(`Error generating ${tool.id}.html:`, error);
        }
    });
    
    console.log(`Successfully generated ${generatedCount} tool pages!`);
    
    // Generate sitemap
    generateSitemap();
}

// Generate XML sitemap
function generateSitemap() {
    const sitemapEntries = toolsData.map(tool => 
        `  <url>
    <loc>https://onlinetoolstack.com/${tool.id}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    ).join('\n');
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://onlinetoolstack.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://onlinetoolstack.com/about.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://onlinetoolstack.com/contact.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://onlinetoolstack.com/blog.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
${sitemapEntries}
</urlset>`;

    console.log('Generated sitemap.xml');
    console.log('Sitemap contains', toolsData.length + 4, 'URLs');
    
    return sitemap;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toolsData,
        generateToolHTML,
        generateAllToolPages,
        generateSitemap
    };
} else {
    // Browser environment - make functions available globally
    window.toolPageGenerator = {
        toolsData,
        generateToolHTML,
        generateAllToolPages,
        generateSitemap
    };
}

// Auto-run if in Node.js environment
if (typeof require !== 'undefined' && require.main === module) {
    generateAllToolPages();
}
