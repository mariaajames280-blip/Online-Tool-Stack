// Shared Template Functions for Individual Tool Pages

// Common header HTML for all tool pages
function getSharedHeader(toolData) {
    return `
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
            <span class="breadcrumb-current">${toolData.name}</span>
        </nav>
    </div>

    <!-- Tool Header -->
    <section class="tool-header">
        <div class="tool-header-container">
            <div class="tool-header-content">
                <div class="tool-icon">
                    <i class="${toolData.icon}"></i>
                </div>
                <div class="tool-info">
                    <h1 class="tool-title">${toolData.name}</h1>
                    <p class="tool-description">${toolData.description}</p>
                    <div class="tool-meta">
                        <span class="tool-category">
                            <i class="fas fa-tag"></i> ${toolData.category}
                        </span>
                        ${toolData.featured ? '<span class="tool-featured"><i class="fas fa-star"></i> Featured</span>' : ''}
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
    `;
}

// Common footer HTML for all tool pages
function getSharedFooter() {
    return `
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
    `;
}

// Common JavaScript functionality for all tool pages
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

    // Smooth scrolling for anchor links
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

// Get meta tags for tool pages
function getToolMetaTags(toolData) {
    return `
    <title>${toolData.name} - Online ToolStack</title>
    <meta name="description" content="${toolData.description} - Free online tool at Online ToolStack">
    <meta name="keywords" content="${toolData.name.toLowerCase()}, ${toolData.category} tools, online tools, web tools, ${toolData.id.replace('-', ' ')}">
    <meta name="author" content="Online ToolStack">
    <link rel="canonical" href="https://onlinetoolstack.com/${toolData.id}.html">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${toolData.name} - Online ToolStack">
    <meta property="og:description" content="${toolData.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://onlinetoolstack.com/${toolData.id}.html">
    <meta property="og:site_name" content="Online ToolStack">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${toolData.name} - Online ToolStack">
    <meta name="twitter:description" content="${toolData.description}">
    <meta name="twitter:site" content="@onlinetoolstack">
    
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "${toolData.name}",
        "description": "${toolData.description}",
        "url": "https://onlinetoolstack.com/${toolData.id}.html",
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
    `;
}
