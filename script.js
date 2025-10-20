// ===================================
// Online ToolStack - Main JavaScript
// All Tools Functionality
// ===================================

// Global Variables
let currentCompressedImage = null;

// ==================== //
// TOOL NAVIGATION     //
// ==================== //
function showTool(toolId) {
    const element = document.getElementById(toolId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }
}

// ==================== //
// IMAGE COMPRESSOR    //
// ==================== //
function initImageCompressor() {
    const qualityRange = document.getElementById('qualityRange');
    if (qualityRange) {
        qualityRange.addEventListener('input', function() {
            document.getElementById('qualityValue').textContent = this.value + '%';
        });
    }
}

function compressImage() {
    const fileInput = document.getElementById('imageInput');
    const quality = document.getElementById('qualityRange').value / 100;
    
    if (!fileInput.files[0]) {
        alert('Please select an image first!');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            currentCompressedImage = compressedDataUrl;
            
            const originalSize = (file.size / 1024).toFixed(2);
            const compressedSize = ((compressedDataUrl.length * 3) / 4 / 1024).toFixed(2);
            
            document.getElementById('imageComparison').innerHTML = `
                <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
                    <div style="text-align: center;">
                        <h4 style="color: var(--color-error);">Original</h4>
                        <img src="${e.target.result}" style="max-width: 200px; border: 2px solid var(--color-error); border-radius: 8px;">
                        <p><strong>${originalSize} KB</strong></p>
                    </div>
                    <div style="text-align: center;">
                        <h4 style="color: var(--color-success);">Compressed</h4>
                        <img src="${compressedDataUrl}" style="max-width: 200px; border: 2px solid var(--color-success); border-radius: 8px;">
                        <p><strong>${compressedSize} KB</strong></p>
                        <p style="color: var(--color-yellow);"><strong>${((1 - compressedSize/originalSize) * 100).toFixed(1)}% smaller</strong></p>
                    </div>
                </div>
                <div class="tool-buttons" style="margin-top: 1rem; text-align: center;">
                    <button class="btn btn-download" onclick="downloadCompressedImage()">Download Compressed Image</button>
                </div>
            `;
            
            document.getElementById('imageResult').style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadCompressedImage() {
    if (currentCompressedImage) {
        const link = document.createElement('a');
        link.href = currentCompressedImage;
        link.download = 'compressed-image.jpg';
        link.click();
    } else {
        alert('Please compress an image first!');
    }
}

function resetImageCompressor() {
    document.getElementById('imageInput').value = '';
    document.getElementById('imageResult').style.display = 'none';
    document.getElementById('qualityRange').value = 70;
    document.getElementById('qualityValue').textContent = '70%';
    currentCompressedImage = null;
}

// ==================== //
// QR CODE GENERATOR   //
// ==================== //
function generateSimpleQR() {
    const text = document.getElementById('qrText').value.trim();
    const color = document.querySelector('input[name="qrColor"]:checked').value;
    
    if (!text) {
        alert('Please enter some text or URL!');
        return;
    }

    // Google Charts API for QR code
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(text)}&chco=${color}&chld=L|1`;
    
    // Display the QR code
    const qrImage = document.getElementById('qrImage');
    qrImage.src = qrUrl;
    qrImage.style.borderColor = `#${color}`;
    
    // Show result
    document.getElementById('qrResult').style.display = 'block';
}

function downloadSimpleQR() {
    const qrImage = document.getElementById('qrImage');
    if (qrImage.src) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrImage.src;
        link.click();
    } else {
        alert('Please generate a QR code first!');
    }
}

function resetQRGenerator() {
    document.getElementById('qrText').value = '';
    document.querySelector('input[name="qrColor"][value="00d4ff"]').checked = true;
    document.getElementById('qrResult').style.display = 'none';
}

// ==================== //
// PASSWORD GENERATOR  //
// ==================== //
function initPasswordGenerator() {
    const passwordLength = document.getElementById('passwordLength');
    if (passwordLength) {
        passwordLength.addEventListener('input', function() {
            document.getElementById('lengthValue').textContent = this.value;
        });
    }
}

function generatePassword() {
    const length = document.getElementById('passwordLength').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*';

    if (!chars) {
        alert('Please select at least one character type!');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('generatedPassword').textContent = password;
    document.getElementById('passwordStrength').textContent = getPasswordStrength(password);
    document.getElementById('passwordResult').style.display = 'block';
}

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'Weak 🔴';
    if (strength <= 4) return 'Medium 🟡';
    return 'Strong 🟢';
}

function copyPassword() {
    const password = document.getElementById('generatedPassword').textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        });
    }
}

// ==================== //
// WORD COUNTER        //
// ==================== //
function initWordCounter() {
    const wordText = document.getElementById('wordText');
    if (wordText) {
        wordText.addEventListener('input', countWords);
    }
}

function countWords() {
    const text = document.getElementById('wordText').value;
    
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;

    document.getElementById('wordCount').textContent = words;
    document.getElementById('charCount').textContent = characters;
    document.getElementById('charNoSpaceCount').textContent = charactersNoSpace;
    document.getElementById('sentenceCount').textContent = sentences;
    document.getElementById('paragraphCount').textContent = paragraphs;
}

function resetWordCounter() {
    document.getElementById('wordText').value = '';
    countWords();
}

// ==================== //
// COLOR PICKER        //
// ==================== //
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', function() {
            const hex = this.value;
            const rgb = hexToRgb(hex);
            
            document.getElementById('hexValue').textContent = hex.toUpperCase();
            document.getElementById('rgbValue').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            document.getElementById('colorPreview').style.background = hex;
        });
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

// ==================== //
// UTILITY FUNCTIONS   //
// ==================== //
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== //
// INITIALIZATION      //
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tool functionalities
    initMobileMenu();
    initImageCompressor();
    initPasswordGenerator();
    initWordCounter();
    initColorPicker();
    
    // Initialize word counter
    countWords();
    
    console.log('✅ Online ToolStack - All tools initialized successfully!');
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});
