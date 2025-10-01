/* The Tool Nest - Main JavaScript */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupScrollToTop();
    updateCurrentYear();
    
    // Initialize tools page specific features if we're on tools page
    if (document.querySelector('.tools-section')) {
        initializeToolsPage();
    }
    
    // Initialize suggestion form if present
    const suggestionForm = document.getElementById('suggestion-form');
    if (suggestionForm) {
        initializeSuggestionForm();
    }
    
    // Initialize timestamp updater if on tools page
    if (document.getElementById('current-timestamp')) {
        updateCurrentTimestamp();
        setInterval(updateCurrentTimestamp, 1000);
    }
}

// Setup navigation functionality
function setupNavigation() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }
    
    // Highlight current page in navigation
    highlightCurrentPage();
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Setup scroll to top functionality
function setupScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize tools page specific functionality
function initializeToolsPage() {
    setupToolSearch();
    setupCategoryFilter();
    initializeColorPicker();
}

// Setup tool search functionality
function setupToolSearch() {
    const searchInput = document.getElementById('tool-search');
    const clearButton = document.getElementById('clear-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterTools);
        
        if (clearButton) {
            clearButton.addEventListener('click', function() {
                searchInput.value = '';
                filterTools();
                searchInput.focus();
            });
        }
    }
}

// Setup category filter functionality
function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter tools
            filterTools();
        });
    });
}

// Filter tools based on search and category
function filterTools() {
    const searchTerm = document.getElementById('tool-search')?.value.toLowerCase() || '';
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    const toolCards = document.querySelectorAll('.tool-card');
    const noResults = document.getElementById('no-results');
    
    let visibleCount = 0;
    
    toolCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.dataset.category;
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// Initialize color picker
function initializeColorPicker() {
    const colorInput = document.getElementById('color-picker-input');
    if (colorInput) {
        colorInput.addEventListener('input', updateColorValues);
        // Initialize with default color
        updateColorValues();
    }
}

// Update color values when color picker changes
function updateColorValues() {
    const colorInput = document.getElementById('color-picker-input');
    const colorPreview = document.getElementById('color-preview');
    const hexValue = document.getElementById('hex-value');
    const rgbValue = document.getElementById('rgb-value');
    const hslValue = document.getElementById('hsl-value');
    
    if (!colorInput) return;
    
    const color = colorInput.value;
    
    // Update preview
    if (colorPreview) {
        colorPreview.style.backgroundColor = color;
    }
    
    // Update hex value
    if (hexValue) {
        hexValue.value = color.toUpperCase();
    }
    
    // Convert to RGB
    const rgb = hexToRgb(color);
    if (rgb && rgbValue) {
        rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    
    // Convert to HSL
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    if (hsl && hslValue) {
        hslValue.value = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
    }
}

// Convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {
        h: h * 360,
        s: s * 100,
        l: l * 100
    };
}

// Copy text to clipboard
async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const text = element.value || element.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        element.select();
        document.execCommand('copy');
        showToast('Copied to clipboard!', 'success');
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#4f46e5'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Download text as file
function downloadText(toolId) {
    let content = '';
    let filename = 'tool-output.txt';
    
    // Get content based on tool
    const tool = document.getElementById(toolId);
    if (!tool) return;
    
    const toolName = tool.querySelector('h3').textContent.replace(/\s+/g, '-').toLowerCase();
    
    // Try to find output content
    const outputs = tool.querySelectorAll('textarea[readonly], input[readonly], #qr-result canvas, pre');
    const textOutputs = Array.from(outputs)
        .filter(el => el.tagName !== 'CANVAS')
        .map(el => el.value || el.textContent || el.innerText)
        .filter(text => text && text.trim());
    
    if (textOutputs.length > 0) {
        content = textOutputs.join('\n\n');
        filename = `${toolName}-output.txt`;
    } else {
        // Check for canvas (QR code)
        const canvas = tool.querySelector('canvas');
        if (canvas) {
            // Download canvas as image
            const link = document.createElement('a');
            link.download = `${toolName}-qr-code.png`;
            link.href = canvas.toDataURL();
            link.click();
            return;
        } else {
            showToast('No output to download', 'error');
            return;
        }
    }
    
    if (!content.trim()) {
        showToast('No output to download', 'error');
        return;
    }
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast(`Downloaded ${filename}`, 'success');
}

// Reset tool to initial state
function resetTool(toolId) {
    const tool = document.getElementById(toolId);
    if (!tool) return;
    
    // Reset all form inputs
    const inputs = tool.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = input.defaultChecked;
        } else if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        } else {
            input.value = input.defaultValue || '';
        }
    });
    
    // Clear output areas
    const outputs = tool.querySelectorAll('textarea[readonly], input[readonly], .output-list, .qr-output, pre, .result');
    outputs.forEach(output => {
        if (output.tagName === 'INPUT' || output.tagName === 'TEXTAREA') {
            output.value = '';
        } else {
            output.innerHTML = '';
        }
    });
    
    // Reset specific tool states
    switch (toolId) {
        case 'color-picker':
            document.getElementById('color-picker-input').value = '#4f46e5';
            updateColorValues();
            break;
        case 'calculator':
            document.getElementById('calc-display').value = '';
            break;
        case 'word-counter':
            updateWordCount();
            break;
    }
    
    showToast('Tool reset successfully', 'success');
}

// Update current year in footer
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Initialize suggestion form
function initializeSuggestionForm() {
    const form = document.getElementById('suggestion-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name') || 'Anonymous';
        const email = formData.get('email') || 'Not provided';
        const message = formData.get('message');
        
        if (!message.trim()) {
            showToast('Please enter your suggestion', 'error');
            return;
        }
        
        // Simulate form submission (in real app, send to server)
        showToast('Thank you for your suggestion! We appreciate your feedback.', 'success');
        form.reset();
        
        // In a real application, you would send this data to your server
        console.log('Suggestion submitted:', { name, email, message });
    });
}

// Update current timestamp
function updateCurrentTimestamp() {
    const timestampElement = document.getElementById('current-timestamp');
    const dateElement = document.getElementById('current-date');
    
    if (timestampElement) {
        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);
        timestampElement.textContent = timestamp;
        
        if (dateElement) {
            dateElement.textContent = now.toLocaleString();
        }
    }
}

// Show privacy policy modal
function showPrivacyPolicy() {
    const modal = createModal('Privacy Policy', `
        <h3>Information We Collect</h3>
        <p>We do not collect any personal information. All tools work locally in your browser.</p>
        
        <h3>How We Use Information</h3>
        <p>Since we don't collect personal information, we don't use it for any purpose.</p>
        
        <h3>Data Security</h3>
        <p>All processing happens locally on your device. No data is sent to our servers.</p>
        
        <h3>Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
    `);
    document.body.appendChild(modal);
}

// Show terms of service modal
function showTermsOfService() {
    const modal = createModal('Terms of Service', `
        <h3>Acceptance of Terms</h3>
        <p>By using The Tool Nest, you agree to these terms of service.</p>
        
        <h3>Use License</h3>
        <p>You may use our tools for personal and commercial purposes. Do not attempt to reverse engineer our code.</p>
        
        <h3>Disclaimer</h3>
        <p>The tools are provided "as is" without warranty of any kind.</p>
        
        <h3>Limitations</h3>
        <p>We shall not be liable for any damages arising from the use of our tools.</p>
    `);
    document.body.appendChild(modal);
}

// Show sitemap modal
function showSitemap() {
    const modal = createModal('Sitemap', `
        <h3>Main Pages</h3>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="tools.html">All Tools</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
        
        <h3>Tool Categories</h3>
        <ul>
            <li>Text Tools</li>
            <li>Generators</li>
            <li>Converters</li>
            <li>Calculators</li>
            <li>Utilities</li>
        </ul>
    `);
    document.body.appendChild(modal);
}

// Create modal
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        padding: 20px;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #1f1f1f;
        border-radius: 12px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    modalContent.innerHTML = `
        <div style="padding: 2rem; position: sticky; top: 0; background: #1f1f1f; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <h2 style="margin: 0; color: #ffffff;">${title}</h2>
                <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; color: #999; font-size: 1.5rem; cursor: pointer; padding: 5px;">&times;</button>
            </div>
        </div>
        <div style="padding: 2rem; color: #ffffff;">
            ${content}
        </div>
    `;
    
    modal.appendChild(modalContent);
    
    // Close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}
