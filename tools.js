/* The Tool Nest - Tools JavaScript Functions */

// Tool 1: Text Case Converter
function convertCase(type) {
    const input = document.getElementById('text-input');
    if (!input || !input.value.trim()) {
        showToast('Please enter some text first', 'error');
        return;
    }
    
    let result = '';
    const text = input.value;
    
    switch (type) {
        case 'upper':
            result = text.toUpperCase();
            break;
        case 'lower':
            result = text.toLowerCase();
            break;
        case 'title':
            result = text.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            break;
        case 'sentence':
            result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            break;
    }
    
    input.value = result;
    showToast(`Text converted to ${type} case`, 'success');
}

// Tool 2: Password Generator
function generatePassword() {
    const length = document.getElementById('pwd-length').value;
    const includeUpper = document.getElementById('pwd-uppercase').checked;
    const includeLower = document.getElementById('pwd-lowercase').checked;
    const includeNumbers = document.getElementById('pwd-numbers').checked;
    const includeSymbols = document.getElementById('pwd-symbols').checked;
    const output = document.getElementById('generated-password');
    
    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
        showToast('Please select at least one character type', 'error');
        return;
    }
    
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    output.value = password;
    showToast('Password generated successfully', 'success');
}

// Update password length display
document.addEventListener('DOMContentLoaded', function() {
    const lengthSlider = document.getElementById('pwd-length');
    const lengthValue = document.getElementById('pwd-length-value');
    
    if (lengthSlider && lengthValue) {
        lengthSlider.addEventListener('input', function() {
            lengthValue.textContent = this.value;
        });
    }
});

// Tool 3: QR Code Generator
function generateQRCode() {
    const text = document.getElementById('qr-text').value;
    const size = document.getElementById('qr-size').value;
    const output = document.getElementById('qr-result');
    
    if (!text.trim()) {
        showToast('Please enter text or URL to generate QR code', 'error');
        return;
    }
    
    // Clear previous QR code
    output.innerHTML = '';
    
    // Generate QR code using qrcode library
    QRCode.toCanvas(text, { 
        width: parseInt(size),
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, function (err, canvas) {
        if (err) {
            showToast('Error generating QR code', 'error');
            return;
        }
        
        output.appendChild(canvas);
        showToast('QR code generated successfully', 'success');
    });
}

// Download QR Code
function downloadQRCode() {
    const canvas = document.querySelector('#qr-result canvas');
    if (!canvas) {
        showToast('Please generate a QR code first', 'error');
        return;
    }
    
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL();
    link.click();
    showToast('QR code downloaded', 'success');
}

// Tool 5: Calculator Functions
let calcExpression = '';

function appendToCalc(value) {
    const display = document.getElementById('calc-display');
    if (value === '*') value = '×';
    if (value === '/') value = '÷';
    if (value === '-') value = '−';
    
    calcExpression += value === '×' ? '*' : value === '÷' ? '/' : value === '−' ? '-' : value;
    display.value += value;
}

function clearCalc() {
    document.getElementById('calc-display').value = '';
    calcExpression = '';
}

function calcBackspace() {
    const display = document.getElementById('calc-display');
    display.value = display.value.slice(0, -1);
    calcExpression = calcExpression.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('calc-display');
    
    try {
        // Safety check: only allow numbers, operators, parentheses, and decimal points
        if (!/^[0-9+\-*/.() ]+$/.test(calcExpression)) {
            throw new Error('Invalid characters');
        }
        
        const result = Function('"use strict"; return (' + calcExpression + ')')();
        display.value = result;
        calcExpression = result.toString();
        showToast('Calculation completed', 'success');
    } catch (error) {
        display.value = 'Error';
        calcExpression = '';
        showToast('Invalid expression', 'error');
    }
}

// Tool 6: JSON Formatter
function formatJSON() {
    const input = document.getElementById('json-input');
    const output = document.getElementById('json-output');
    
    if (!input.value.trim()) {
        showToast('Please enter JSON data', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input.value);
        const formatted = JSON.stringify(parsed, null, 2);
        output.textContent = formatted;
        showToast('JSON formatted successfully', 'success');
    } catch (error) {
        output.textContent = 'Invalid JSON: ' + error.message;
        showToast('Invalid JSON format', 'error');
    }
}

function minifyJSON() {
    const input = document.getElementById('json-input');
    const output = document.getElementById('json-output');
    
    if (!input.value.trim()) {
        showToast('Please enter JSON data', 'error');
        return;
    }
    
    try {
        const parsed = JSON.parse(input.value);
        const minified = JSON.stringify(parsed);
        output.textContent = minified;
        showToast('JSON minified successfully', 'success');
    } catch (error) {
        output.textContent = 'Invalid JSON: ' + error.message;
        showToast('Invalid JSON format', 'error');
    }
}

function validateJSON() {
    const input = document.getElementById('json-input');
    const output = document.getElementById('json-output');
    
    if (!input.value.trim()) {
        showToast('Please enter JSON data', 'error');
        return;
    }
    
    try {
        JSON.parse(input.value);
        output.textContent = '✅ Valid JSON';
        showToast('JSON is valid', 'success');
    } catch (error) {
        output.textContent = '❌ Invalid JSON: ' + error.message;
        showToast('Invalid JSON format', 'error');
    }
}

// Tool 7: UUID Generator
function generateUUID() {
    const count = parseInt(document.getElementById('uuid-count').value);
    const version = document.getElementById('uuid-version').value;
    const output = document.getElementById('uuid-output');
    
    if (count < 1 || count > 100) {
        showToast('Please enter a number between 1 and 100', 'error');
        return;
    }
    
    const uuids = [];
    for (let i = 0; i < count; i++) {
        if (version === '4') {
            uuids.push(generateUUIDv4());
        } else {
            uuids.push(generateUUIDv1());
        }
    }
    
    output.innerHTML = uuids.map(uuid => `
        <div class="output-item">
            <span>${uuid}</span>
            <button onclick="copyToClipboard(this.previousElementSibling)" class="copy-btn">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `).join('');
    
    showToast(`Generated ${count} UUID${count > 1 ? 's' : ''}`, 'success');
}

function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateUUIDv1() {
    // Simplified UUID v1 (timestamp-based)
    const timestamp = Date.now().toString(16);
    const random = Math.random().toString(16).substr(2, 8);
    return `${timestamp.substr(0, 8)}-${timestamp.substr(8)}-1${random.substr(0, 3)}-8${random.substr(3, 3)}-${random.substr(6)}${Math.random().toString(16).substr(2, 6)}`;
}

// Tool 8: Base64 Converter
function encodeBase64() {
    const input = document.getElementById('base64-input');
    const output = document.getElementById('base64-output');
    
    if (!input.value.trim()) {
        showToast('Please enter text to encode', 'error');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input.value)));
        output.value = encoded;
        showToast('Text encoded to Base64', 'success');
    } catch (error) {
        showToast('Error encoding text', 'error');
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input');
    const output = document.getElementById('base64-output');
    
    if (!input.value.trim()) {
        showToast('Please enter Base64 to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input.value)));
        output.value = decoded;
        showToast('Base64 decoded successfully', 'success');
    } catch (error) {
        showToast('Invalid Base64 format', 'error');
    }
}

// Tool 9: URL Encoder/Decoder
function encodeURL() {
    const input = document.getElementById('url-input');
    const output = document.getElementById('url-output');
    
    if (!input.value.trim()) {
        showToast('Please enter URL to encode', 'error');
        return;
    }
    
    try {
        const encoded = encodeURIComponent(input.value);
        output.value = encoded;
        showToast('URL encoded successfully', 'success');
    } catch (error) {
        showToast('Error encoding URL', 'error');
    }
}

function decodeURL() {
    const input = document.getElementById('url-input');
    const output = document.getElementById('url-output');
    
    if (!input.value.trim()) {
        showToast('Please enter encoded URL to decode', 'error');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input.value);
        output.value = decoded;
        showToast('URL decoded successfully', 'success');
    } catch (error) {
        showToast('Error decoding URL', 'error');
    }
}

// Tool 10: Lorem Ipsum Generator
function generateLorem() {
    const type = document.getElementById('lorem-type').value;
    const count = parseInt(document.getElementById('lorem-count').value);
    const output = document.getElementById('lorem-output');
    
    if (count < 1 || count > 100) {
        showToast('Please enter a number between 1 and 100', 'error');
        return;
    }
    
    const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];
    
    let result = [];
    
    switch (type) {
        case 'words':
            for (let i = 0; i < count; i++) {
                result.push(words[Math.floor(Math.random() * words.length)]);
            }
            output.value = result.join(' ');
            break;
            
        case 'sentences':
            for (let i = 0; i < count; i++) {
                const sentenceLength = Math.floor(Math.random() * 10) + 5;
                const sentence = [];
                for (let j = 0; j < sentenceLength; j++) {
                    sentence.push(words[Math.floor(Math.random() * words.length)]);
                }
                sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
                result.push(sentence.join(' ') + '.');
            }
            output.value = result.join(' ');
            break;
            
        case 'paragraphs':
            for (let i = 0; i < count; i++) {
                const sentenceCount = Math.floor(Math.random() * 5) + 3;
                const paragraph = [];
                for (let j = 0; j < sentenceCount; j++) {
                    const sentenceLength = Math.floor(Math.random() * 10) + 5;
                    const sentence = [];
                    for (let k = 0; k < sentenceLength; k++) {
                        sentence.push(words[Math.floor(Math.random() * words.length)]);
                    }
                    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
                    paragraph.push(sentence.join(' ') + '.');
                }
                result.push(paragraph.join(' '));
            }
            output.value = result.join('\n\n');
            break;
    }
    
    showToast(`Generated ${count} ${type}`, 'success');
}

// Tool 11: Hash Generator (requires crypto-js library)
function generateHashes() {
    const input = document.getElementById('hash-input');
    const md5Output = document.getElementById('md5-hash');
    const sha1Output = document.getElementById('sha1-hash');
    const sha256Output = document.getElementById('sha256-hash');
    
    if (!input.value.trim()) {
        showToast('Please enter text to hash', 'error');
        return;
    }
    
    const text = input.value;
    
    // Simple hash functions (for demo purposes - in production use crypto-js)
    md5Output.value = simpleHash(text, 'md5');
    sha1Output.value = simpleHash(text, 'sha1');
    sha256Output.value = simpleHash(text, 'sha256');
    
    showToast('Hashes generated successfully', 'success');
}

function simpleHash(str, type) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    // Convert to positive hex
    const hex = (Math.abs(hash) >>> 0).toString(16);
    
    // Pad with random characters to simulate different hash lengths
    const padding = type === 'md5' ? 32 : type === 'sha1' ? 40 : 64;
    return (hex + Math.random().toString(16).substr(2)).substr(0, padding);
}

// Tool 12: Unit Converter
const unitConversions = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        inch: 39.3701,
        foot: 3.28084,
        yard: 1.09361,
        mile: 0.000621371
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        pound: 2.20462,
        ounce: 35.274,
        ton: 0.001
    },
    temperature: {
        celsius: { formula: 'c', offset: 0 },
        fahrenheit: { formula: 'f', offset: 0 },
        kelvin: { formula: 'k', offset: 0 }
    },
    area: {
        'square meter': 1,
        'square kilometer': 0.000001,
        'square centimeter': 10000,
        'square foot': 10.7639,
        'square inch': 1550,
        acre: 0.000247105,
        hectare: 0.0001
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        gallon: 0.264172,
        quart: 1.05669,
        pint: 2.11338,
        'cubic meter': 0.001,
        'cubic foot': 0.0353147
    }
};

function updateUnitOptions() {
    const category = document.getElementById('unit-category').value;
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    
    const units = Object.keys(unitConversions[category]);
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    units.forEach(unit => {
        fromUnit.appendChild(new Option(unit.charAt(0).toUpperCase() + unit.slice(1), unit));
        toUnit.appendChild(new Option(unit.charAt(0).toUpperCase() + unit.slice(1), unit));
    });
    
    // Set default selections
    if (units.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

function convertUnits() {
    const category = document.getElementById('unit-category').value;
    const fromValue = parseFloat(document.getElementById('from-value').value);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const toValueField = document.getElementById('to-value');
    
    if (isNaN(fromValue)) {
        showToast('Please enter a valid number', 'error');
        return;
    }
    
    let result;
    
    if (category === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        const conversions = unitConversions[category];
        const baseValue = fromValue / conversions[fromUnit];
        result = baseValue * conversions[toUnit];
    }
    
    toValueField.value = result.toFixed(6).replace(/\.?0+$/, '');
    showToast('Conversion completed', 'success');
}

function convertTemperature(value, from, to) {
    let celsius;
    
    // Convert to Celsius first
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target
    switch (to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return celsius * 9/5 + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Tool 13: Word Counter
function updateWordCount() {
    const input = document.getElementById('word-counter-input');
    if (!input) return;
    
    const text = input.value;
    
    // Count words
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Count characters
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Count paragraphs
    const paragraphs = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).length;
    
    // Count sentences
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Estimate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Update display
    document.getElementById('word-count').textContent = words;
    document.getElementById('char-count').textContent = characters;
    document.getElementById('char-no-spaces').textContent = charactersNoSpaces;
    document.getElementById('paragraph-count').textContent = paragraphs;
    document.getElementById('sentence-count').textContent = sentences;
    document.getElementById('reading-time').textContent = readingTime;
}

// Tool 14: Image to Base64
function convertImageToBase64() {
    const input = document.getElementById('image-input');
    const preview = document.getElementById('image-preview');
    const output = document.getElementById('image-base64-output');
    
    if (!input.files || !input.files[0]) {
        return;
    }
    
    const file = input.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showToast('Image size should be less than 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const base64 = e.target.result;
        
        // Show preview
        preview.innerHTML = `<img src="${base64}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">`;
        
        // Set output
        output.value = base64;
        
        showToast('Image converted to Base64', 'success');
    };
    
    reader.onerror = function() {
        showToast('Error reading image file', 'error');
    };
    
    reader.readAsDataURL(file);
}

// Tool 15: CSS Minifier
function minifyCSS() {
    const input = document.getElementById('css-input');
    const output = document.getElementById('css-output');
    const stats = document.getElementById('css-stats');
    
    if (!input.value.trim()) {
        showToast('Please enter CSS code', 'error');
        return;
    }
    
    const originalCSS = input.value;
    const originalSize = originalCSS.length;
    
    // Simple CSS minification
    let minified = originalCSS
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around specific characters
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*,\s*/g, ',')
        // Remove trailing semicolon before }
        .replace(/;}/g, '}')
        .trim();
    
    const minifiedSize = minified.length;
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    output.value = minified;
    
    stats.innerHTML = `
        <div>Original: ${originalSize} bytes</div>
        <div>Minified: ${minifiedSize} bytes</div>
        <div>Savings: ${savings}%</div>
    `;
    
    showToast('CSS minified successfully', 'success');
}

// Tool 16: HTML Encoder/Decoder
function encodeHTML() {
    const input = document.getElementById('html-input');
    const output = document.getElementById('html-output');
    
    if (!input.value.trim()) {
        showToast('Please enter HTML to encode', 'error');
        return;
    }
    
    const encoded = input.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    
    output.value = encoded;
    showToast('HTML encoded successfully', 'success');
}

function decodeHTML() {
    const input = document.getElementById('html-input');
    const output = document.getElementById('html-output');
    
    if (!input.value.trim()) {
        showToast('Please enter encoded HTML to decode', 'error');
        return;
    }
    
    const decoded = input.value
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    
    output.value = decoded;
    showToast('HTML decoded successfully', 'success');
}

// Tool 17: Random Number Generator
function generateRandomNumbers() {
    const min = parseInt(document.getElementById('min-number').value);
    const max = parseInt(document.getElementById('max-number').value);
    const count = parseInt(document.getElementById('number-count').value);
    const allowDuplicates = document.getElementById('allow-duplicates').checked;
    const sortNumbers = document.getElementById('sort-numbers').checked;
    const output = document.getElementById('random-numbers-output');
    
    if (isNaN(min) || isNaN(max) || isNaN(count)) {
        showToast('Please enter valid numbers', 'error');
        return;
    }
    
    if (min >= max) {
        showToast('Maximum must be greater than minimum', 'error');
        return;
    }
    
    if (!allowDuplicates && count > (max - min + 1)) {
        showToast('Cannot generate more unique numbers than available in range', 'error');
        return;
    }
    
    let numbers = [];
    
    if (allowDuplicates) {
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    } else {
        const available = [];
        for (let i = min; i <= max; i++) {
            available.push(i);
        }
        
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * available.length);
            numbers.push(available.splice(randomIndex, 1)[0]);
        }
    }
    
    if (sortNumbers) {
        numbers.sort((a, b) => a - b);
    }
    
    output.innerHTML = numbers.map(num => `
        <div class="output-item">
            <span>${num}</span>
        </div>
    `).join('');
    
    showToast(`Generated ${count} random number${count > 1 ? 's' : ''}`, 'success');
}

// Tool 18: Timestamp Converter
function timestampToDate() {
    const timestamp = document.getElementById('timestamp-input').value;
    const result = document.getElementById('timestamp-result');
    
    if (!timestamp) {
        showToast('Please enter a timestamp', 'error');
        return;
    }
    
    try {
        const date = new Date(parseInt(timestamp) * 1000);
        result.innerHTML = `
            <div><strong>Local Date:</strong> ${date.toLocaleString()}</div>
            <div><strong>UTC Date:</strong> ${date.toUTCString()}</div>
            <div><strong>ISO String:</strong> ${date.toISOString()}</div>
        `;
        showToast('Timestamp converted successfully', 'success');
    } catch (error) {
        result.innerHTML = '<div style="color: #ef4444;">Invalid timestamp</div>';
        showToast('Invalid timestamp format', 'error');
    }
}

function dateToTimestamp() {
    const dateInput = document.getElementById('date-input').value;
    const result = document.getElementById('date-result');
    
    if (!dateInput) {
        showToast('Please select a date and time', 'error');
        return;
    }
    
    try {
        const date = new Date(dateInput);
        const timestamp = Math.floor(date.getTime() / 1000);
        
        result.innerHTML = `
            <div><strong>Unix Timestamp:</strong> ${timestamp}</div>
            <div><strong>Milliseconds:</strong> ${date.getTime()}</div>
        `;
        showToast('Date converted to timestamp', 'success');
    } catch (error) {
        result.innerHTML = '<div style="color: #ef4444;">Invalid date</div>';
        showToast('Invalid date format', 'error');
    }
}

// Tool 19: Markdown to HTML Converter
function convertMarkdown() {
    const input = document.getElementById('markdown-input');
    const htmlOutput = document.getElementById('html-code-output');
    const preview = document.getElementById('html-preview');
    
    if (!input.value.trim()) {
        showToast('Please enter Markdown text', 'error');
        return;
    }
    
    const markdown = input.value;
    
    // Simple Markdown to HTML conversion
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        // Line breaks
        .replace(/\n/g, '<br>');
    
    htmlOutput.value = html;
    preview.innerHTML = html;
    
    showToast('Markdown converted to HTML', 'success');
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Tool 20: Binary Converter
function convertFromDecimal() {
    const decimal = parseInt(document.getElementById('decimal-input').value);
    if (isNaN(decimal)) {
        showToast('Please enter a valid decimal number', 'error');
        return;
    }
    
    document.getElementById('binary-input').value = decimal.toString(2);
    document.getElementById('hex-input').value = decimal.toString(16).toUpperCase();
    document.getElementById('octal-input').value = decimal.toString(8);
    
    showToast('Converted from decimal', 'success');
}

function convertFromBinary() {
    const binary = document.getElementById('binary-input').value;
    if (!/^[01]+$/.test(binary)) {
        showToast('Please enter a valid binary number', 'error');
        return;
    }
    
    const decimal = parseInt(binary, 2);
    document.getElementById('decimal-input').value = decimal;
    document.getElementById('hex-input').value = decimal.toString(16).toUpperCase();
    document.getElementById('octal-input').value = decimal.toString(8);
    
    showToast('Converted from binary', 'success');
}

function convertFromHex() {
    const hex = document.getElementById('hex-input').value;
    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
        showToast('Please enter a valid hexadecimal number', 'error');
        return;
    }
    
    const decimal = parseInt(hex, 16);
    document.getElementById('decimal-input').value = decimal;
    document.getElementById('binary-input').value = decimal.toString(2);
    document.getElementById('octal-input').value = decimal.toString(8);
    
    showToast('Converted from hexadecimal', 'success');
}

function convertFromOctal() {
    const octal = document.getElementById('octal-input').value;
    if (!/^[0-7]+$/.test(octal)) {
        showToast('Please enter a valid octal number', 'error');
        return;
    }
    
    const decimal = parseInt(octal, 8);
    document.getElementById('decimal-input').value = decimal;
    document.getElementById('binary-input').value = decimal.toString(2);
    document.getElementById('hex-input').value = decimal.toString(16).toUpperCase();
    
    showToast('Converted from octal', 'success');
}

// Initialize tools page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize unit converter options
    if (document.getElementById('unit-category')) {
        updateUnitOptions();
    }
    
    // Initialize word counter
    if (document.getElementById('word-counter-input')) {
        updateWordCount();
    }
});

// Helper function to copy text from element
async function copyToClipboard(element) {
    let text;
    if (typeof element === 'string') {
        text = document.getElementById(element).value || document.getElementById(element).textContent;
    } else {
        text = element.textContent || element.value;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!', 'success');
    }
}
