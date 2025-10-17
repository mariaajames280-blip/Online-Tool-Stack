/* ===================================
   Tools Part 1: JavaScript Functions
   Tools 1-10
   =================================== */

// Tool 1: Image Compressor
let originalImageData = null;
let compressedImageBlob = null;

document.getElementById('compressionQuality')?.addEventListener('input', function() {
    document.getElementById('qualityValue').textContent = this.value;
});

function compressImage() {
    const fileInput = document.getElementById('imageFile');
    const quality = document.getElementById('compressionQuality').value / 100;
    
    if (!fileInput.files[0]) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('compressedCanvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(function(blob) {
                const originalSize = file.size;
                const compressedSize = blob.size;
                const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
                
                document.getElementById('originalSize').textContent = formatFileSize(originalSize);
                document.getElementById('compressedSize').textContent = formatFileSize(compressedSize);
                document.getElementById('reduction').textContent = reduction + '%';
                
                compressedImageBlob = blob;
                
                document.getElementById('imageOutput').style.display = 'block';
                document.getElementById('downloadCompressed').style.display = 'inline-block';
                
                showToast('Image compressed successfully!', 'success');
            }, 'image/jpeg', quality);
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

function downloadCompressedImage() {
    if (!compressedImageBlob) {
        showToast('No compressed image available', 'error');
        return;
    }
    
    const url = URL.createObjectURL(compressedImageBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Image downloaded!', 'success');
}

function resetImageCompressor() {
    document.getElementById('imageFile').value = '';
    document.getElementById('compressionQuality').value = 80;
    document.getElementById('qualityValue').textContent = '80';
    document.getElementById('imageOutput').style.display = 'none';
    document.getElementById('downloadCompressed').style.display = 'none';
    compressedImageBlob = null;
}

// Tool 2: PDF to Word Converter
function convertPDF() {
    const fileInput = document.getElementById('pdfFile');
    
    if (!fileInput.files[0]) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    if (!file.type.includes('pdf')) {
        showToast('Please select a valid PDF file', 'error');
        return;
    }
    
    document.getElementById('pdfFileName').textContent = file.name;
    document.getElementById('pdfFileSize').textContent = formatFileSize(file.size);
    document.getElementById('pdfOutput').style.display = 'block';
    
    showToast('PDF file loaded. Server-side conversion required for actual conversion.', 'warning');
}

function resetPDFConverter() {
    document.getElementById('pdfFile').value = '';
    document.getElementById('pdfOutput').style.display = 'none';
}

// Tool 3: QR Code Generator
let qrCodeInstance = null;

document.getElementById('qrSize')?.addEventListener('input', function() {
    document.getElementById('qrSizeValue').textContent = this.value;
});

function generateQR() {
    const text = document.getElementById('qrText').value;
    const size = document.getElementById('qrSize').value;
    
    if (!text.trim()) {
        showToast('Please enter text or URL', 'error');
        return;
    }
    
    const qrOutput = document.getElementById('qrOutput');
    qrOutput.innerHTML = '';
    qrOutput.style.display = 'block';
    
    try {
        qrCodeInstance = new QRCode(qrOutput, {
            text: text,
            width: parseInt(size),
            height: parseInt(size),
            colorDark: '#00d4ff',
            colorLight: '#0a0a0a',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        document.getElementById('downloadQR').style.display = 'inline-block';
        showToast('QR Code generated!', 'success');
    } catch (error) {
        showToast('Error generating QR Code', 'error');
    }
}

function downloadQR() {
    const canvas = document.querySelector('#qrOutput canvas');
    if (!canvas) {
        showToast('No QR code to download', 'error');
        return;
    }
    
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('QR Code downloaded!', 'success');
    });
}

function resetQR() {
    document.getElementById('qrText').value = '';
    document.getElementById('qrSize').value = 256;
    document.getElementById('qrSizeValue').textContent = '256';
    document.getElementById('qrOutput').innerHTML = '';
    document.getElementById('qrOutput').style.display = 'none';
    document.getElementById('downloadQR').style.display = 'none';
    qrCodeInstance = null;
}

// Tool 4: Password Generator
document.getElementById('passwordLength')?.addEventListener('input', function() {
    document.getElementById('lengthValue').textContent = this.value;
});

function generatePassword() {
    const length = document.getElementById('passwordLength').value;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        showToast('Please select at least one character type', 'error');
        return;
    }
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('generatedPassword').textContent = password;
    document.getElementById('passwordOutput').style.display = 'block';
    document.getElementById('copyPassword').style.display = 'inline-block';
    
    // Calculate strength
    let strength = 'Weak';
    let strengthColor = 'var(--color-error)';
    
    if (length >= 16 && includeUppercase && includeLowercase && includeNumbers && includeSymbols) {
        strength = 'Very Strong';
        strengthColor = 'var(--color-success)';
    } else if (length >= 12 && ((includeUppercase && includeLowercase && includeNumbers) || 
                                (includeUppercase && includeLowercase && includeSymbols))) {
        strength = 'Strong';
        strengthColor = 'var(--color-yellow)';
    } else if (length >= 8) {
        strength = 'Medium';
        strengthColor = 'var(--color-warning)';
    }
    
    document.getElementById('passwordStrength').textContent = strength;
    document.getElementById('passwordStrength').style.color = strengthColor;
    
    showToast('Password generated!', 'success');
}

function copyPassword() {
    const password = document.getElementById('generatedPassword').textContent;
    copyToClipboard(password);
}

function resetPassword() {
    document.getElementById('passwordLength').value = 16;
    document.getElementById('lengthValue').textContent = '16';
    document.getElementById('includeUppercase').checked = true;
    document.getElementById('includeLowercase').checked = true;
    document.getElementById('includeNumbers').checked = true;
    document.getElementById('includeSymbols').checked = true;
    document.getElementById('passwordOutput').style.display = 'none';
    document.getElementById('copyPassword').style.display = 'none';
}

// Tool 5: URL Shortener
function shortenURL() {
    const longURL = document.getElementById('longURL').value;
    
    if (!longURL.trim()) {
        showToast('Please enter a URL', 'error');
        return;
    }
    
    if (!validateURL(longURL)) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    // Simulated shortened URL
    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortURL = `https://short.link/${shortCode}`;
    
    document.getElementById('shortURL').textContent = shortURL;
    document.getElementById('urlOutput').style.display = 'block';
    document.getElementById('copyShortURL').style.display = 'inline-block';
    
    showToast('URL shortened (simulated)!', 'success');
}

function copyShortURL() {
    const shortURL = document.getElementById('shortURL').textContent;
    copyToClipboard(shortURL);
}

function resetURLShortener() {
    document.getElementById('longURL').value = '';
    document.getElementById('urlOutput').style.display = 'none';
    document.getElementById('copyShortURL').style.display = 'none';
}

// Tool 6: Color Picker
document.getElementById('colorPicker')?.addEventListener('input', function() {
    updateColorInfo(this.value);
});

function updateColorInfo(hex) {
    document.getElementById('hexValue').textContent = hex.toUpperCase();
    
    const rgb = hexToRgb(hex);
    document.getElementById('rgbValue').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    document.getElementById('hslValue').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

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
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function generatePalette() {
    const baseColor = document.getElementById('colorPicker').value;
    const rgb = hexToRgb(baseColor);
    
    const palette = [
        baseColor,
        adjustBrightness(baseColor, 30),
        adjustBrightness(baseColor, -30),
        complementaryColor(baseColor),
        analogousColor(baseColor, 30),
        analogousColor(baseColor, -30)
    ];
    
    let paletteHTML = '<h3>Generated Palette</h3><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1rem; margin-top: 1rem;">';
    
    palette.forEach(color => {
        paletteHTML += `
            <div style="text-align: center;">
                <div style="width: 100%; height: 80px; background: ${color}; border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer;" onclick="copyToClipboard('${color}')"></div>
                <span style="font-size: 0.9rem; color: var(--color-gray);">${color}</span>
            </div>
        `;
    });
    
    paletteHTML += '</div>';
    document.getElementById('paletteOutput').innerHTML = paletteHTML;
    
    showToast('Palette generated! Click colors to copy', 'success');
}

function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    const adjust = (val) => Math.max(0, Math.min(255, val + (val * percent / 100)));
    
    return '#' + [rgb.r, rgb.g, rgb.b].map(val => {
        const adjusted = Math.round(adjust(val));
        return adjusted.toString(16).padStart(2, '0');
    }).join('');
}

function complementaryColor(hex) {
    const rgb = hexToRgb(hex);
    return '#' + [255 - rgb.r, 255 - rgb.g, 255 - rgb.b].map(val => 
        val.toString(16).padStart(2, '0')
    ).join('');
}

function analogousColor(hex, angle) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + angle + 360) % 360;
    
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return '#' + [r, g, b].map(val => {
        const hex = Math.round(val * 255).toString(16);
        return hex.padStart(2, '0');
    }).join('');
}

function resetColorPicker() {
    document.getElementById('colorPicker').value = '#00d4ff';
    updateColorInfo('#00d4ff');
    document.getElementById('paletteOutput').innerHTML = '';
}

// Tool 7: Text to Speech
let speechSynthesis = window.speechSynthesis;

document.getElementById('ttsSpeed')?.addEventListener('input', function() {
    document.getElementById('speedValue').textContent = this.value;
});

function speakText() {
    const text = document.getElementById('ttsText').value;
    const speed = document.getElementById('ttsSpeed').value;
    
    if (!text.trim()) {
        showToast('Please enter text to speak', 'error');
        return;
    }
    
    if (!speechSynthesis) {
        showToast('Text-to-speech not supported in this browser', 'error');
        return;
    }
    
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = parseFloat(speed);
    
    speechSynthesis.speak(utterance);
    showToast('Speaking...', 'success');
}

function stopSpeech() {
    if (speechSynthesis) {
        speechSynthesis.cancel();
        showToast('Speech stopped', 'success');
    }
}

function resetTTS() {
    document.getElementById('ttsText').value = '';
    document.getElementById('ttsSpeed').value = 1;
    document.getElementById('speedValue').textContent = '1.0';
    stopSpeech();
}

// Tool 8: Base64 Encoder/Decoder
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    
    if (!input.trim()) {
        showToast('Please enter text to encode', 'error');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('base64Result').textContent = encoded;
        document.getElementById('base64Output').style.display = 'block';
        showToast('Text encoded successfully!', 'success');
    } catch (error) {
        showToast('Error encoding text', 'error');
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    
    if (!input.trim()) {
        showToast('Please enter text to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('base64Result').textContent = decoded;
        document.getElementById('base64Output').style.display = 'block';
        showToast('Text decoded successfully!', 'success');
    } catch (error) {
        showToast('Invalid Base64 string', 'error');
    }
}

function copyBase64Output() {
    const output = document.getElementById('base64Result').textContent;
    if (output) {
        copyToClipboard(output);
    }
}

function resetBase64() {
    document.getElementById('base64Input').value = '';
    document.getElementById('base64Output').style.display = 'none';
}

// Tool 9: JSON Formatter
function formatJSON() {
    const input = document.getElementById('jsonInput').value;
    
    if (!input.trim()) {
        showToast('Please enter JSON to format', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        document.getElementById('jsonResult').textContent = formatted;
        document.getElementById('jsonOutput').style.display = 'block';
        showToast('JSON formatted successfully!', 'success');
    } catch (error) {
        showToast('Invalid JSON: ' + error.message, 'error');
    }
}

function minifyJSON() {
    const input = document.getElementById('jsonInput').value;
    
    if (!input.trim()) {
        showToast('Please enter JSON to minify', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        document.getElementById('jsonResult').textContent = minified;
        document.getElementById('jsonOutput').style.display = 'block';
        showToast('JSON minified successfully!', 'success');
    } catch (error) {
        showToast('Invalid JSON: ' + error.message, 'error');
    }
}

function copyJSONOutput() {
    const output = document.getElementById('jsonResult').textContent;
    if (output) {
        copyToClipboard(output);
    }
}

function resetJSON() {
    document.getElementById('jsonInput').value = '';
    document.getElementById('jsonOutput').style.display = 'none';
}

// Tool 10: Word Counter
function countWords() {
    const text = document.getElementById('wordCountText').value;
    
    // Words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = text.trim() === '' ? 0 : words.length;
    
    // Characters
    document.getElementById('charCountWithSpaces').textContent = text.length;
    document.getElementById('charCountNoSpaces').textContent = text.replace(/\s/g, '').length;
    
    // Sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    document.getElementById('sentenceCount').textContent = sentences.length;
    
    // Paragraphs
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    document.getElementById('paragraphCount').textContent = paragraphs.length;
    
    // Reading time
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words.length / wordsPerMinute);
    document.getElementById('readingTime').textContent = minutes + ' min';
}

function resetWordCounter() {
    document.getElementById('wordCountText').value = '';
    countWords();
}

// Initialize color picker on page load
if (document.getElementById('colorPicker')) {
    updateColorInfo('#00d4ff');
}
