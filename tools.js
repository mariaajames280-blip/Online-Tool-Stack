// Tools Implementation

// Get Tool HTML Content
function getToolHTML(toolId) {
    const toolHtmlMap = {
        'password-generator': getPasswordGeneratorHTML(),
        'qr-generator': getQRGeneratorHTML(),
        'color-picker': getColorPickerHTML(),
        'base64-encoder': getBase64EncoderHTML(),
        'url-shortener': getURLShortenerHTML(),
        'text-counter': getTextCounterHTML(),
        'hash-generator': getHashGeneratorHTML(),
        'json-formatter': getJSONFormatterHTML(),
        'calculator': getCalculatorHTML(),
        'percentage-calculator': getPercentageCalculatorHTML(),
        'bmi-calculator': getBMICalculatorHTML(),
        'unit-converter': getUnitConverterHTML(),
        'timestamp-converter': getTimestampConverterHTML(),
        'text-case-converter': getTextCaseConverterHTML(),
        'html-encoder': getHTMLEncoderHTML(),
        'css-minifier': getCSSMinifierHTML(),
        'lorem-generator': getLoremGeneratorHTML(),
        'gradient-generator': getGradientGeneratorHTML(),
        'image-resizer': getImageResizerHTML(),
        'regex-tester': getRegexTesterHTML()
    };

    return toolHtmlMap[toolId] || '<p>Tool not found.</p>';
}

// Initialize Tool Functionality
function initializeTool(toolId) {
    const toolInitMap = {
        'password-generator': initPasswordGenerator,
        'qr-generator': initQRGenerator,
        'color-picker': initColorPicker,
        'base64-encoder': initBase64Encoder,
        'url-shortener': initURLShortener,
        'text-counter': initTextCounter,
        'hash-generator': initHashGenerator,
        'json-formatter': initJSONFormatter,
        'calculator': initCalculator,
        'percentage-calculator': initPercentageCalculator,
        'bmi-calculator': initBMICalculator,
        'unit-converter': initUnitConverter,
        'timestamp-converter': initTimestampConverter,
        'text-case-converter': initTextCaseConverter,
        'html-encoder': initHTMLEncoder,
        'css-minifier': initCSSMinifier,
        'lorem-generator': initLoremGenerator,
        'gradient-generator': initGradientGenerator,
        'image-resizer': initImageResizer,
        'regex-tester': initRegexTester
    };

    const initFunction = toolInitMap[toolId];
    if (initFunction) {
        initFunction();
    }
}

// Password Generator
function getPasswordGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label">Password Length: <span id="length-value">12</span></label>
                <input type="range" id="password-length" class="tool-range" min="4" max="100" value="12">
            </div>
            
            <div class="password-options">
                <div class="tool-checkbox">
                    <input type="checkbox" id="include-uppercase" checked>
                    <label for="include-uppercase">Uppercase Letters (A-Z)</label>
                </div>
                <div class="tool-checkbox">
                    <input type="checkbox" id="include-lowercase" checked>
                    <label for="include-lowercase">Lowercase Letters (a-z)</label>
                </div>
                <div class="tool-checkbox">
                    <input type="checkbox" id="include-numbers" checked>
                    <label for="include-numbers">Numbers (0-9)</label>
                </div>
                <div class="tool-checkbox">
                    <input type="checkbox" id="include-symbols">
                    <label for="include-symbols">Symbols (!@#$%^&*)</label>
                </div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generatePassword()">
                    <i class="fas fa-sync"></i> Generate Password
                </button>
                <button class="tool-button secondary" onclick="copyPassword()">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            
            <div class="tool-result" id="password-result"></div>
            
            <div class="password-strength" id="password-strength" style="display: none;">
                <label class="tool-label">Password Strength:</label>
                <div class="strength-bar">
                    <div class="strength-fill" id="strength-fill"></div>
                </div>
                <span id="strength-text"></span>
            </div>
        </div>
    `;
}

function initPasswordGenerator() {
    const lengthSlider = document.getElementById('password-length');
    const lengthValue = document.getElementById('length-value');
    
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });
    
    generatePassword();
}

function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!charset) {
        document.getElementById('password-result').textContent = 'Please select at least one character type.';
        return;
    }
    
    const password = generateRandomString(length, charset);
    document.getElementById('password-result').textContent = password;
    
    // Show password strength
    updatePasswordStrength(password);
}

function copyPassword() {
    const password = document.getElementById('password-result').textContent;
    if (password && password !== 'Please select at least one character type.') {
        copyToClipboard(password);
    }
}

function updatePasswordStrength(password) {
    const strengthDiv = document.getElementById('password-strength');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    let score = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    
    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine strength
    if (score >= 6) {
        strengthFill.className = 'strength-fill strong';
        feedback = 'Strong';
    } else if (score >= 4) {
        strengthFill.className = 'strength-fill good';
        feedback = 'Good';
    } else if (score >= 2) {
        strengthFill.className = 'strength-fill fair';
        feedback = 'Fair';
    } else {
        strengthFill.className = 'strength-fill weak';
        feedback = 'Weak';
    }
    
    strengthText.textContent = feedback;
    strengthDiv.style.display = 'block';
}

// QR Code Generator
function getQRGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="qr-text">Enter text or URL:</label>
                <textarea id="qr-text" class="tool-textarea" placeholder="Enter text or URL to generate QR code"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generateQRCode()">
                    <i class="fas fa-qrcode"></i> Generate QR Code
                </button>
                <button class="tool-button secondary" onclick="downloadQRCode()">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
            
            <div class="qr-container">
                <div id="qr-code"></div>
            </div>
        </div>
    `;
}

function initQRGenerator() {
    // QR code will be generated using a simple method
}

function generateQRCode() {
    const text = document.getElementById('qr-text').value.trim();
    const qrContainer = document.getElementById('qr-code');
    
    if (!text) {
        qrContainer.innerHTML = '<p>Please enter text or URL</p>';
        return;
    }
    
    // Using Google Charts API for QR code generation
    const size = '200x200';
    const qrUrl = `https://chart.googleapis.com/chart?chs=${size}&cht=qr&chl=${encodeURIComponent(text)}`;
    
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code" class="qr-code">`;
}

function downloadQRCode() {
    const qrImg = document.querySelector('#qr-code img');
    if (qrImg) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrImg.src;
        link.click();
    }
}

// Color Picker
function getColorPickerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="color-input">Pick a color:</label>
                <input type="color" id="color-input" class="tool-input" value="#0066ff">
                <div class="color-preview" id="color-preview"></div>
            </div>
            
            <div class="color-values">
                <div class="color-value">
                    <div class="color-value-label">HEX</div>
                    <div class="color-value-text" id="hex-value">#0066ff</div>
                </div>
                <div class="color-value">
                    <div class="color-value-label">RGB</div>
                    <div class="color-value-text" id="rgb-value">rgb(0, 102, 255)</div>
                </div>
                <div class="color-value">
                    <div class="color-value-label">HSL</div>
                    <div class="color-value-text" id="hsl-value">hsl(220, 100%, 50%)</div>
                </div>
                <div class="color-value">
                    <div class="color-value-label">CMYK</div>
                    <div class="color-value-text" id="cmyk-value">cmyk(100%, 60%, 0%, 0%)</div>
                </div>
            </div>
        </div>
    `;
}

function initColorPicker() {
    const colorInput = document.getElementById('color-input');
    colorInput.addEventListener('input', updateColorValues);
    updateColorValues();
}

function updateColorValues() {
    const color = document.getElementById('color-input').value;
    const preview = document.getElementById('color-preview');
    
    preview.style.backgroundColor = color;
    
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    // Convert to HSL
    const hsl = rgbToHsl(r, g, b);
    
    // Convert to CMYK
    const cmyk = rgbToCmyk(r, g, b);
    
    document.getElementById('hex-value').textContent = color.toUpperCase();
    document.getElementById('rgb-value').textContent = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('hsl-value').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    document.getElementById('cmyk-value').textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
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
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function rgbToCmyk(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    
    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    
    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

// Base64 Encoder/Decoder
function getBase64EncoderHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="base64-input">Input Text:</label>
                <textarea id="base64-input" class="tool-textarea" placeholder="Enter text to encode or Base64 to decode"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="encodeBase64()">
                    <i class="fas fa-lock"></i> Encode
                </button>
                <button class="tool-button" onclick="decodeBase64()">
                    <i class="fas fa-unlock"></i> Decode
                </button>
                <button class="tool-button secondary" onclick="copyBase64Result()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Result:</label>
                <div class="tool-result" id="base64-result"></div>
            </div>
        </div>
    `;
}

function initBase64Encoder() {
    // Initialize with empty result
    document.getElementById('base64-result').textContent = 'Result will appear here...';
}

function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    const result = document.getElementById('base64-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter text to encode';
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        result.textContent = encoded;
        result.className = 'tool-result success';
    } catch (error) {
        result.textContent = 'Error encoding text';
        result.className = 'tool-result error';
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value;
    const result = document.getElementById('base64-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter Base64 string to decode';
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        result.textContent = decoded;
        result.className = 'tool-result success';
    } catch (error) {
        result.textContent = 'Error decoding Base64 string';
        result.className = 'tool-result error';
    }
}

function copyBase64Result() {
    const result = document.getElementById('base64-result').textContent;
    if (result && !result.includes('Error') && !result.includes('Please enter')) {
        copyToClipboard(result);
    }
}

// Text Counter
function getTextCounterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="text-input">Enter your text:</label>
                <textarea id="text-input" class="tool-textarea" placeholder="Type or paste your text here..." oninput="updateTextStats()"></textarea>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="char-count">0</div>
                    <div class="stat-label">Characters</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="char-count-no-spaces">0</div>
                    <div class="stat-label">Characters (no spaces)</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="word-count">0</div>
                    <div class="stat-label">Words</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="line-count">0</div>
                    <div class="stat-label">Lines</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="paragraph-count">0</div>
                    <div class="stat-label">Paragraphs</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="sentence-count">0</div>
                    <div class="stat-label">Sentences</div>
                </div>
            </div>
        </div>
    `;
}

function initTextCounter() {
    updateTextStats();
}

function updateTextStats() {
    const text = document.getElementById('text-input').value;
    
    // Character count
    document.getElementById('char-count').textContent = text.length;
    
    // Character count without spaces
    document.getElementById('char-count-no-spaces').textContent = text.replace(/\s/g, '').length;
    
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('word-count').textContent = text.trim() === '' ? 0 : words.length;
    
    // Line count
    document.getElementById('line-count').textContent = text === '' ? 0 : text.split('\n').length;
    
    // Paragraph count
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    document.getElementById('paragraph-count').textContent = paragraphs.length;
    
    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    document.getElementById('sentence-count').textContent = sentences.length;
}

// Hash Generator
function getHashGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="hash-input">Enter text to hash:</label>
                <textarea id="hash-input" class="tool-textarea" placeholder="Enter text to generate hashes"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generateHashes()">
                    <i class="fas fa-hashtag"></i> Generate Hashes
                </button>
            </div>
            
            <div class="hash-results" id="hash-results"></div>
        </div>
    `;
}

function initHashGenerator() {
    // Initialize empty
}

async function generateHashes() {
    const input = document.getElementById('hash-input').value;
    const resultsDiv = document.getElementById('hash-results');
    
    if (!input.trim()) {
        resultsDiv.innerHTML = '<p>Please enter text to hash</p>';
        return;
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    try {
        // Generate different hashes
        const md5Hash = await generateMD5(input);
        const sha1Hash = await generateSHA(data, 'SHA-1');
        const sha256Hash = await generateSHA(data, 'SHA-256');
        const sha512Hash = await generateSHA(data, 'SHA-512');
        
        resultsDiv.innerHTML = `
            <div class="hash-result-item">
                <div class="hash-type">MD5</div>
                <div class="hash-value" onclick="copyToClipboard('${md5Hash}')">${md5Hash}</div>
            </div>
            <div class="hash-result-item">
                <div class="hash-type">SHA-1</div>
                <div class="hash-value" onclick="copyToClipboard('${sha1Hash}')">${sha1Hash}</div>
            </div>
            <div class="hash-result-item">
                <div class="hash-type">SHA-256</div>
                <div class="hash-value" onclick="copyToClipboard('${sha256Hash}')">${sha256Hash}</div>
            </div>
            <div class="hash-result-item">
                <div class="hash-type">SHA-512</div>
                <div class="hash-value" onclick="copyToClipboard('${sha512Hash}')">${sha512Hash}</div>
            </div>
        `;
    } catch (error) {
        resultsDiv.innerHTML = '<p class="error">Error generating hashes</p>';
    }
}

async function generateSHA(data, algorithm) {
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple MD5 implementation (for demo purposes)
async function generateMD5(input) {
    // This is a simplified version. In production, use a proper MD5 library
    return 'MD5_' + input.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0).toString(16);
}

// Calculator
function getCalculatorHTML() {
    return `
        <div class="tool-interface">
            <div class="calc-display" id="calc-display">0</div>
            <div class="calculator-grid">
                <button class="calc-button" onclick="clearCalculator()">C</button>
                <button class="calc-button" onclick="clearEntry()">CE</button>
                <button class="calc-button" onclick="backspace()">⌫</button>
                <button class="calc-button operator" onclick="inputOperator('/')">/</button>
                
                <button class="calc-button" onclick="inputNumber('7')">7</button>
                <button class="calc-button" onclick="inputNumber('8')">8</button>
                <button class="calc-button" onclick="inputNumber('9')">9</button>
                <button class="calc-button operator" onclick="inputOperator('*')">×</button>
                
                <button class="calc-button" onclick="inputNumber('4')">4</button>
                <button class="calc-button" onclick="inputNumber('5')">5</button>
                <button class="calc-button" onclick="inputNumber('6')">6</button>
                <button class="calc-button operator" onclick="inputOperator('-')">−</button>
                
                <button class="calc-button" onclick="inputNumber('1')">1</button>
                <button class="calc-button" onclick="inputNumber('2')">2</button>
                <button class="calc-button" onclick="inputNumber('3')">3</button>
                <button class="calc-button operator" onclick="inputOperator('+')">+</button>
                
                <button class="calc-button" onclick="inputNumber('0')" style="grid-column: span 2;">0</button>
                <button class="calc-button" onclick="inputNumber('.')">.</button>
                <button class="calc-button operator" onclick="calculate()">=</button>
            </div>
        </div>
    `;
}

let currentInput = '0';
let previousInput = '';
let operator = '';
let waitingForNewOperand = false;

function initCalculator() {
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('calc-display').textContent = currentInput;
}

function inputNumber(num) {
    if (waitingForNewOperand) {
        currentInput = num;
        waitingForNewOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const result = performCalculation();
        currentInput = String(result);
        previousInput = result;
        updateDisplay();
    }

    waitingForNewOperand = true;
    operator = nextOperator;
}

function calculate() {
    const result = performCalculation();
    currentInput = String(result);
    previousInput = '';
    operator = '';
    waitingForNewOperand = true;
    updateDisplay();
}

function performCalculation() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return current;

    switch (operator) {
        case '+': return prev + current;
        case '-': return prev - current;
        case '*': return prev * current;
        case '/': return current !== 0 ? prev / current : 0;
        default: return current;
    }
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    waitingForNewOperand = false;
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// JSON Formatter
function getJSONFormatterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="json-input">Enter JSON:</label>
                <textarea id="json-input" class="tool-textarea" placeholder="Paste your JSON here..."></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="formatJSON()">
                    <i class="fas fa-code"></i> Format JSON
                </button>
                <button class="tool-button" onclick="minifyJSON()">
                    <i class="fas fa-compress"></i> Minify JSON
                </button>
                <button class="tool-button" onclick="validateJSON()">
                    <i class="fas fa-check"></i> Validate JSON
                </button>
                <button class="tool-button secondary" onclick="copyJSONResult()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Formatted JSON:</label>
                <div class="tool-result" id="json-result"></div>
            </div>
        </div>
    `;
}

function initJSONFormatter() {
    document.getElementById('json-result').textContent = 'Formatted JSON will appear here...';
}

function formatJSON() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter JSON to format';
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        result.textContent = formatted;
        result.className = 'tool-result success';
    } catch (error) {
        result.textContent = `Invalid JSON: ${error.message}`;
        result.className = 'tool-result error';
    }
}

function minifyJSON() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter JSON to minify';
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        result.textContent = minified;
        result.className = 'tool-result success';
    } catch (error) {
        result.textContent = `Invalid JSON: ${error.message}`;
        result.className = 'tool-result error';
    }
}

function validateJSON() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter JSON to validate';
        return;
    }
    
    try {
        JSON.parse(input);
        result.textContent = '✅ Valid JSON';
        result.className = 'tool-result success';
    } catch (error) {
        result.textContent = `❌ Invalid JSON: ${error.message}`;
        result.className = 'tool-result error';
    }
}

function copyJSONResult() {
    const result = document.getElementById('json-result').textContent;
    if (result && !result.includes('Invalid') && !result.includes('Please enter')) {
        copyToClipboard(result);
    }
}

// URL Shortener (Simulated)
function getURLShortenerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="url-input">Enter URL to shorten:</label>
                <input type="url" id="url-input" class="tool-input" placeholder="https://example.com/very/long/url">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="shortenURL()">
                    <i class="fas fa-compress"></i> Shorten URL
                </button>
            </div>
            
            <div id="url-shortened" style="display: none;">
                <div class="url-result">
                    <span class="shortened-url" id="shortened-url"></span>
                    <button class="tool-button secondary" onclick="copyURL()">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initURLShortener() {
    // Initialize
}

function shortenURL() {
    const url = document.getElementById('url-input').value.trim();
    
    if (!url) {
        showNotification('Please enter a URL', 'error');
        return;
    }
    
    if (!isValidURL(url)) {
        showNotification('Please enter a valid URL', 'error');
        return;
    }
    
    // Generate a random short URL (simulation)
    const shortCode = generateRandomString(6, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    const shortURL = `https://short.ly/${shortCode}`;
    
    document.getElementById('shortened-url').textContent = shortURL;
    document.getElementById('url-shortened').style.display = 'block';
}

function copyURL() {
    const shortURL = document.getElementById('shortened-url').textContent;
    copyToClipboard(shortURL);
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Percentage Calculator
function getPercentageCalculatorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <h4>What is X% of Y?</h4>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <input type="number" id="percent1" class="tool-input" placeholder="X" style="width: 80px;">
                    <span>% of</span>
                    <input type="number" id="value1" class="tool-input" placeholder="Y" style="width: 100px;">
                    <span>=</span>
                    <span id="result1" style="font-weight: bold; color: var(--primary-blue);">0</span>
                </div>
            </div>
            
            <div class="tool-group">
                <h4>X is what percent of Y?</h4>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <input type="number" id="value2" class="tool-input" placeholder="X" style="width: 80px;">
                    <span>is</span>
                    <span id="result2" style="font-weight: bold; color: var(--primary-blue);">0</span>
                    <span>% of</span>
                    <input type="number" id="total2" class="tool-input" placeholder="Y" style="width: 100px;">
                </div>
            </div>
            
            <div class="tool-group">
                <h4>Percentage Change</h4>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <span>From</span>
                    <input type="number" id="old-value" class="tool-input" placeholder="Old Value" style="width: 100px;">
                    <span>to</span>
                    <input type="number" id="new-value" class="tool-input" placeholder="New Value" style="width: 100px;">
                    <span>=</span>
                    <span id="result3" style="font-weight: bold; color: var(--primary-blue);">0%</span>
                </div>
            </div>
        </div>
    `;
}

function initPercentageCalculator() {
    // Add event listeners
    document.getElementById('percent1').addEventListener('input', calculatePercentage1);
    document.getElementById('value1').addEventListener('input', calculatePercentage1);
    document.getElementById('value2').addEventListener('input', calculatePercentage2);
    document.getElementById('total2').addEventListener('input', calculatePercentage2);
    document.getElementById('old-value').addEventListener('input', calculatePercentageChange);
    document.getElementById('new-value').addEventListener('input', calculatePercentageChange);
}

function calculatePercentage1() {
    const percent = parseFloat(document.getElementById('percent1').value) || 0;
    const value = parseFloat(document.getElementById('value1').value) || 0;
    const result = (percent / 100) * value;
    document.getElementById('result1').textContent = result.toFixed(2);
}

function calculatePercentage2() {
    const value = parseFloat(document.getElementById('value2').value) || 0;
    const total = parseFloat(document.getElementById('total2').value) || 0;
    const result = total !== 0 ? (value / total) * 100 : 0;
    document.getElementById('result2').textContent = result.toFixed(2);
}

function calculatePercentageChange() {
    const oldValue = parseFloat(document.getElementById('old-value').value) || 0;
    const newValue = parseFloat(document.getElementById('new-value').value) || 0;
    const result = oldValue !== 0 ? ((newValue - oldValue) / oldValue) * 100 : 0;
    document.getElementById('result3').textContent = result.toFixed(2) + '%';
}

// BMI Calculator
function getBMICalculatorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label">Unit System:</label>
                <div class="tool-checkbox">
                    <input type="radio" id="metric" name="unit" value="metric" checked>
                    <label for="metric">Metric (kg, cm)</label>
                </div>
                <div class="tool-checkbox">
                    <input type="radio" id="imperial" name="unit" value="imperial">
                    <label for="imperial">Imperial (lbs, ft/in)</label>
                </div>
            </div>
            
            <div id="metric-inputs">
                <div class="tool-group">
                    <label class="tool-label" for="weight-kg">Weight (kg):</label>
                    <input type="number" id="weight-kg" class="tool-input" placeholder="70">
                </div>
                <div class="tool-group">
                    <label class="tool-label" for="height-cm">Height (cm):</label>
                    <input type="number" id="height-cm" class="tool-input" placeholder="175">
                </div>
            </div>
            
            <div id="imperial-inputs" style="display: none;">
                <div class="tool-group">
                    <label class="tool-label" for="weight-lbs">Weight (lbs):</label>
                    <input type="number" id="weight-lbs" class="tool-input" placeholder="154">
                </div>
                <div class="tool-group">
                    <label class="tool-label" for="height-ft">Height (feet):</label>
                    <input type="number" id="height-ft" class="tool-input" placeholder="5">
                </div>
                <div class="tool-group">
                    <label class="tool-label" for="height-in">Height (inches):</label>
                    <input type="number" id="height-in" class="tool-input" placeholder="9">
                </div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="calculateBMI()">
                    <i class="fas fa-calculator"></i> Calculate BMI
                </button>
            </div>
            
            <div id="bmi-result" class="text-stats" style="display: none;">
                <div class="stat-item">
                    <div class="stat-number" id="bmi-value">0</div>
                    <div class="stat-label">BMI</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="bmi-category">Normal</div>
                    <div class="stat-label">Category</div>
                </div>
            </div>
        </div>
    `;
}

function initBMICalculator() {
    document.querySelectorAll('input[name="unit"]').forEach(radio => {
        radio.addEventListener('change', toggleUnitInputs);
    });
}

function toggleUnitInputs() {
    const isMetric = document.getElementById('metric').checked;
    document.getElementById('metric-inputs').style.display = isMetric ? 'block' : 'none';
    document.getElementById('imperial-inputs').style.display = isMetric ? 'none' : 'block';
}

function calculateBMI() {
    const isMetric = document.getElementById('metric').checked;
    let weight, height;
    
    if (isMetric) {
        weight = parseFloat(document.getElementById('weight-kg').value);
        height = parseFloat(document.getElementById('height-cm').value) / 100; // Convert to meters
    } else {
        weight = parseFloat(document.getElementById('weight-lbs').value) * 0.453592; // Convert to kg
        const feet = parseFloat(document.getElementById('height-ft').value) || 0;
        const inches = parseFloat(document.getElementById('height-in').value) || 0;
        height = ((feet * 12) + inches) * 0.0254; // Convert to meters
    }
    
    if (!weight || !height) {
        showNotification('Please enter valid weight and height values', 'error');
        return;
    }
    
    const bmi = weight / (height * height);
    let category = '';
    
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    document.getElementById('bmi-category').textContent = category;
    document.getElementById('bmi-result').style.display = 'grid';
}

// Unit Converter
function getUnitConverterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="unit-type">Conversion Type:</label>
                <select id="unit-type" class="tool-select" onchange="updateUnitOptions()">
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                    <option value="area">Area</option>
                    <option value="volume">Volume</option>
                </select>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="from-value">From:</label>
                <div style="display: flex; gap: 10px;">
                    <input type="number" id="from-value" class="tool-input" placeholder="Enter value" oninput="convertUnits()">
                    <select id="from-unit" class="tool-select" onchange="convertUnits()"></select>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="to-value">To:</label>
                <div style="display: flex; gap: 10px;">
                    <input type="number" id="to-value" class="tool-input" readonly>
                    <select id="to-unit" class="tool-select" onchange="convertUnits()"></select>
                </div>
            </div>
        </div>
    `;
}

const unitConversions = {
    length: {
        units: { 'mm': 'Millimeter', 'cm': 'Centimeter', 'm': 'Meter', 'km': 'Kilometer', 'in': 'Inch', 'ft': 'Foot', 'yd': 'Yard', 'mi': 'Mile' },
        toMeter: { 'mm': 0.001, 'cm': 0.01, 'm': 1, 'km': 1000, 'in': 0.0254, 'ft': 0.3048, 'yd': 0.9144, 'mi': 1609.34 }
    },
    weight: {
        units: { 'mg': 'Milligram', 'g': 'Gram', 'kg': 'Kilogram', 'oz': 'Ounce', 'lb': 'Pound', 't': 'Ton' },
        toGram: { 'mg': 0.001, 'g': 1, 'kg': 1000, 'oz': 28.3495, 'lb': 453.592, 't': 1000000 }
    },
    temperature: {
        units: { 'c': 'Celsius', 'f': 'Fahrenheit', 'k': 'Kelvin' }
    },
    area: {
        units: { 'mm2': 'Square mm', 'cm2': 'Square cm', 'm2': 'Square meter', 'km2': 'Square km', 'in2': 'Square inch', 'ft2': 'Square foot' },
        toMeter2: { 'mm2': 0.000001, 'cm2': 0.0001, 'm2': 1, 'km2': 1000000, 'in2': 0.00064516, 'ft2': 0.092903 }
    },
    volume: {
        units: { 'ml': 'Milliliter', 'l': 'Liter', 'm3': 'Cubic meter', 'fl oz': 'Fluid ounce', 'cup': 'Cup', 'pt': 'Pint', 'qt': 'Quart', 'gal': 'Gallon' },
        toLiter: { 'ml': 0.001, 'l': 1, 'm3': 1000, 'fl oz': 0.0295735, 'cup': 0.236588, 'pt': 0.473176, 'qt': 0.946353, 'gal': 3.78541 }
    }
};

function initUnitConverter() {
    updateUnitOptions();
}

function updateUnitOptions() {
    const type = document.getElementById('unit-type').value;
    const units = unitConversions[type].units;
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    Object.entries(units).forEach(([key, value]) => {
        fromUnit.innerHTML += `<option value="${key}">${value}</option>`;
        toUnit.innerHTML += `<option value="${key}">${value}</option>`;
    });
    
    convertUnits();
}

function convertUnits() {
    const type = document.getElementById('unit-type').value;
    const fromValue = parseFloat(document.getElementById('from-value').value) || 0;
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    
    let result = 0;
    
    if (type === 'temperature') {
        result = convertTemperature(fromValue, fromUnit, toUnit);
    } else {
        const baseUnit = type === 'length' ? 'toMeter' : type === 'weight' ? 'toGram' : type === 'area' ? 'toMeter2' : 'toLiter';
        const conversions = unitConversions[type][baseUnit];
        
        // Convert to base unit then to target unit
        const baseValue = fromValue * conversions[fromUnit];
        result = baseValue / conversions[toUnit];
    }
    
    document.getElementById('to-value').value = result.toFixed(6).replace(/\.?0+$/, '');
}

function convertTemperature(value, from, to) {
    // Convert to Celsius first
    let celsius = value;
    if (from === 'f') celsius = (value - 32) * 5/9;
    else if (from === 'k') celsius = value - 273.15;
    
    // Convert from Celsius to target
    if (to === 'f') return celsius * 9/5 + 32;
    else if (to === 'k') return celsius + 273.15;
    else return celsius;
}

// Timestamp Converter
function getTimestampConverterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="timestamp-input">Unix Timestamp (seconds):</label>
                <input type="number" id="timestamp-input" class="tool-input" placeholder="1640995200" oninput="convertTimestamp()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="date-input">Date & Time:</label>
                <input type="datetime-local" id="date-input" class="tool-input" onchange="convertDate()">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="setCurrentTime()">
                    <i class="fas fa-clock"></i> Current Time
                </button>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="human-readable">-</div>
                    <div class="stat-label">Human Readable</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="iso-format">-</div>
                    <div class="stat-label">ISO Format</div>
                </div>
            </div>
        </div>
    `;
}

function initTimestampConverter() {
    setCurrentTime();
}

function convertTimestamp() {
    const timestamp = parseFloat(document.getElementById('timestamp-input').value);
    if (!timestamp) return;
    
    const date = new Date(timestamp * 1000);
    document.getElementById('date-input').value = date.toISOString().slice(0, 16);
    document.getElementById('human-readable').textContent = date.toLocaleString();
    document.getElementById('iso-format').textContent = date.toISOString();
}

function convertDate() {
    const dateValue = document.getElementById('date-input').value;
    if (!dateValue) return;
    
    const date = new Date(dateValue);
    const timestamp = Math.floor(date.getTime() / 1000);
    document.getElementById('timestamp-input').value = timestamp;
    document.getElementById('human-readable').textContent = date.toLocaleString();
    document.getElementById('iso-format').textContent = date.toISOString();
}

function setCurrentTime() {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    
    document.getElementById('timestamp-input').value = timestamp;
    document.getElementById('date-input').value = now.toISOString().slice(0, 16);
    document.getElementById('human-readable').textContent = now.toLocaleString();
    document.getElementById('iso-format').textContent = now.toISOString();
}

// Text Case Converter
function getTextCaseConverterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="case-input">Enter text:</label>
                <textarea id="case-input" class="tool-textarea" placeholder="Enter text to convert case"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="convertCase('upper')">UPPERCASE</button>
                <button class="tool-button" onclick="convertCase('lower')">lowercase</button>
                <button class="tool-button" onclick="convertCase('title')">Title Case</button>
                <button class="tool-button" onclick="convertCase('sentence')">Sentence case</button>
                <button class="tool-button" onclick="convertCase('camel')">camelCase</button>
                <button class="tool-button" onclick="convertCase('pascal')">PascalCase</button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Result:</label>
                <div class="tool-result" id="case-result"></div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyCaseResult()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
        </div>
    `;
}

function initTextCaseConverter() {
    document.getElementById('case-result').textContent = 'Converted text will appear here...';
}

function convertCase(type) {
    const input = document.getElementById('case-input').value;
    const result = document.getElementById('case-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter text to convert';
        return;
    }
    
    let converted = '';
    
    switch (type) {
        case 'upper':
            converted = input.toUpperCase();
            break;
        case 'lower':
            converted = input.toLowerCase();
            break;
        case 'title':
            converted = input.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
            break;
        case 'sentence':
            converted = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            break;
        case 'camel':
            converted = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
                index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
            break;
        case 'pascal':
            converted = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
                word.toUpperCase()).replace(/\s+/g, '');
            break;
    }
    
    result.textContent = converted;
}

function copyCaseResult() {
    const result = document.getElementById('case-result').textContent;
    if (result && result !== 'Please enter text to convert' && result !== 'Converted text will appear here...') {
        copyToClipboard(result);
    }
}

// HTML Encoder/Decoder
function getHTMLEncoderHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="html-input">Input Text/HTML:</label>
                <textarea id="html-input" class="tool-textarea" placeholder="Enter text or HTML to encode/decode"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="encodeHTML()">
                    <i class="fas fa-lock"></i> Encode HTML
                </button>
                <button class="tool-button" onclick="decodeHTML()">
                    <i class="fas fa-unlock"></i> Decode HTML
                </button>
                <button class="tool-button secondary" onclick="copyHTMLResult()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Result:</label>
                <div class="tool-result" id="html-result"></div>
            </div>
        </div>
    `;
}

function initHTMLEncoder() {
    document.getElementById('html-result').textContent = 'Encoded/Decoded HTML will appear here...';
}

function encodeHTML() {
    const input = document.getElementById('html-input').value;
    const result = document.getElementById('html-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter text to encode';
        return;
    }
    
    const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    
    result.textContent = encoded;
}

function decodeHTML() {
    const input = document.getElementById('html-input').value;
    const result = document.getElementById('html-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter HTML to decode';
        return;
    }
    
    const decoded = input
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    
    result.textContent = decoded;
}

function copyHTMLResult() {
    const result = document.getElementById('html-result').textContent;
    if (result && !result.includes('Please enter') && !result.includes('will appear here')) {
        copyToClipboard(result);
    }
}

// CSS Minifier
function getCSSMinifierHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="css-input">Enter CSS Code:</label>
                <textarea id="css-input" class="tool-textarea" placeholder="Enter CSS code to minify"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="minifyCSS()">
                    <i class="fas fa-compress"></i> Minify CSS
                </button>
                <button class="tool-button" onclick="beautifyCSS()">
                    <i class="fas fa-expand"></i> Beautify CSS
                </button>
                <button class="tool-button secondary" onclick="copyCSSResult()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Minified CSS:</label>
                <div class="tool-result" id="css-result"></div>
            </div>
        </div>
    `;
}

function initCSSMinifier() {
    document.getElementById('css-result').textContent = 'Minified CSS will appear here...';
}

function minifyCSS() {
    const input = document.getElementById('css-input').value;
    const result = document.getElementById('css-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter CSS code to minify';
        return;
    }
    
    const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
        .replace(/}\s*/g, '}') // Remove spaces after closing brace
        .replace(/:\s*/g, ':') // Remove spaces after colon
        .replace(/;\s*/g, ';') // Remove spaces after semicolon
        .trim();
    
    result.textContent = minified;
}

function beautifyCSS() {
    const input = document.getElementById('css-input').value;
    const result = document.getElementById('css-result');
    
    if (!input.trim()) {
        result.textContent = 'Please enter CSS code to beautify';
        return;
    }
    
    const beautified = input
        .replace(/{\s*/g, ' {\n  ') // Add newline and indentation after opening brace
        .replace(/;\s*/g, ';\n  ') // Add newline and indentation after semicolon
        .replace(/}\s*/g, '\n}\n') // Add newlines around closing brace
        .replace(/,\s*/g, ',\n  '); // Add newline after comma in selectors
    
    result.textContent = beautified;
}

function copyCSSResult() {
    const result = document.getElementById('css-result').textContent;
    if (result && !result.includes('Please enter') && !result.includes('will appear here')) {
        copyToClipboard(result);
    }
}

// Lorem Ipsum Generator
function getLoremGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label">Generate by:</label>
                <div class="tool-checkbox">
                    <input type="radio" id="gen-words" name="gen-type" value="words" checked>
                    <label for="gen-words">Words</label>
                </div>
                <div class="tool-checkbox">
                    <input type="radio" id="gen-sentences" name="gen-type" value="sentences">
                    <label for="gen-sentences">Sentences</label>
                </div>
                <div class="tool-checkbox">
                    <input type="radio" id="gen-paragraphs" name="gen-type" value="paragraphs">
                    <label for="gen-paragraphs">Paragraphs</label>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="lorem-count">Count:</label>
                <input type="number" id="lorem-count" class="tool-input" value="50" min="1" max="1000">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generateLorem()">
                    <i class="fas fa-paragraph"></i> Generate Lorem Ipsum
                </button>
                <button class="tool-button secondary" onclick="copyLoremResult()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Lorem Ipsum Text:</label>
                <div class="tool-result" id="lorem-result"></div>
            </div>
        </div>
    `;
}

const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

function initLoremGenerator() {
    generateLorem();
}

function generateLorem() {
    const type = document.querySelector('input[name="gen-type"]:checked').value;
    const count = parseInt(document.getElementById('lorem-count').value) || 1;
    const result = document.getElementById('lorem-result');
    
    let text = '';
    
    switch (type) {
        case 'words':
            const words = [];
            for (let i = 0; i < count; i++) {
                words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
            }
            text = words.join(' ') + '.';
            break;
            
        case 'sentences':
            const sentences = [];
            for (let i = 0; i < count; i++) {
                const sentenceLength = Math.floor(Math.random() * 10) + 5;
                const sentenceWords = [];
                for (let j = 0; j < sentenceLength; j++) {
                    sentenceWords.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
                }
                sentences.push(sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1) + ' ' + sentenceWords.slice(1).join(' ') + '.');
            }
            text = sentences.join(' ');
            break;
            
        case 'paragraphs':
            const paragraphs = [];
            for (let i = 0; i < count; i++) {
                const sentenceCount = Math.floor(Math.random() * 5) + 3;
                const sentences = [];
                for (let j = 0; j < sentenceCount; j++) {
                    const sentenceLength = Math.floor(Math.random() * 10) + 5;
                    const sentenceWords = [];
                    for (let k = 0; k < sentenceLength; k++) {
                        sentenceWords.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
                    }
                    sentences.push(sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1) + ' ' + sentenceWords.slice(1).join(' ') + '.');
                }
                paragraphs.push(sentences.join(' '));
            }
            text = paragraphs.join('\n\n');
            break;
    }
    
    result.textContent = text;
}

function copyLoremResult() {
    const result = document.getElementById('lorem-result').textContent;
    if (result) {
        copyToClipboard(result);
    }
}

// Gradient Generator
function getGradientGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="color1">Color 1:</label>
                <input type="color" id="color1" class="tool-input" value="#ff6b6b" onchange="generateGradient()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="color2">Color 2:</label>
                <input type="color" id="color2" class="tool-input" value="#4ecdc4" onchange="generateGradient()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="gradient-direction">Direction:</label>
                <select id="gradient-direction" class="tool-select" onchange="generateGradient()">
                    <option value="to right">Left to Right</option>
                    <option value="to left">Right to Left</option>
                    <option value="to bottom">Top to Bottom</option>
                    <option value="to top">Bottom to Top</option>
                    <option value="45deg">Diagonal (45°)</option>
                    <option value="135deg">Diagonal (135°)</option>
                    <option value="circle">Radial</option>
                </select>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Preview:</label>
                <div id="gradient-preview" style="width: 100%; height: 100px; border: 1px solid var(--border-color); border-radius: 6px;"></div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">CSS Code:</label>
                <div class="tool-result" id="gradient-css"></div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyGradientCSS()">
                    <i class="fas fa-copy"></i> Copy CSS
                </button>
            </div>
        </div>
    `;
}

function initGradientGenerator() {
    generateGradient();
}

function generateGradient() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const direction = document.getElementById('gradient-direction').value;
    
    const isRadial = direction === 'circle';
    const gradientType = isRadial ? 'radial-gradient' : 'linear-gradient';
    const gradientDirection = isRadial ? 'circle' : direction;
    
    const cssValue = `${gradientType}(${gradientDirection}, ${color1}, ${color2})`;
    
    document.getElementById('gradient-preview').style.background = cssValue;
    document.getElementById('gradient-css').textContent = `background: ${cssValue};`;
}

function copyGradientCSS() {
    const css = document.getElementById('gradient-css').textContent;
    copyToClipboard(css);
}

// Image Resizer (File Upload)
function getImageResizerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="image-upload">Select Image:</label>
                <input type="file" id="image-upload" accept="image/*" onchange="loadImage()">
            </div>
            
            <div id="image-controls" style="display: none;">
                <div class="tool-group">
                    <label class="tool-label" for="resize-width">Width:</label>
                    <input type="number" id="resize-width" class="tool-input" onchange="updateImageSize()">
                </div>
                
                <div class="tool-group">
                    <label class="tool-label" for="resize-height">Height:</label>
                    <input type="number" id="resize-height" class="tool-input" onchange="updateImageSize()">
                </div>
                
                <div class="tool-checkbox">
                    <input type="checkbox" id="maintain-ratio" checked onchange="updateImageSize()">
                    <label for="maintain-ratio">Maintain Aspect Ratio</label>
                </div>
                
                <div class="tool-buttons">
                    <button class="tool-button" onclick="resizeImage()">
                        <i class="fas fa-compress"></i> Resize Image
                    </button>
                    <button class="tool-button secondary" onclick="downloadResizedImage()">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
            
            <canvas id="image-canvas" style="max-width: 100%; border: 1px solid var(--border-color); display: none;"></canvas>
        </div>
    `;
}

let originalImage = null;
let resizedCanvas = null;

function initImageResizer() {
    // Initialize
}

function loadImage() {
    const file = document.getElementById('image-upload').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            document.getElementById('resize-width').value = img.width;
            document.getElementById('resize-height').value = img.height;
            document.getElementById('image-controls').style.display = 'block';
            
            // Draw original image
            const canvas = document.getElementById('image-canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function updateImageSize() {
    if (!originalImage) return;
    
    const maintainRatio = document.getElementById('maintain-ratio').checked;
    const widthInput = document.getElementById('resize-width');
    const heightInput = document.getElementById('resize-height');
    
    if (maintainRatio) {
        const aspectRatio = originalImage.width / originalImage.height;
        
        if (document.activeElement === widthInput) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
        } else if (document.activeElement === heightInput) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
        }
    }
}

function resizeImage() {
    if (!originalImage) return;
    
    const newWidth = parseInt(document.getElementById('resize-width').value);
    const newHeight = parseInt(document.getElementById('resize-height').value);
    
    const canvas = document.getElementById('image-canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
    
    resizedCanvas = canvas;
}

function downloadResizedImage() {
    if (!resizedCanvas) {
        showNotification('Please resize the image first', 'error');
        return;
    }
    
    resizedCanvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'resized-image.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    });
}

// Regex Tester
function getRegexTesterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="regex-pattern">Regular Expression:</label>
                <input type="text" id="regex-pattern" class="tool-input" placeholder="Enter regex pattern (e.g., \\d+)" oninput="testRegex()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Flags:</label>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <div class="tool-checkbox">
                        <input type="checkbox" id="flag-g" onchange="testRegex()">
                        <label for="flag-g">Global (g)</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="flag-i" onchange="testRegex()">
                        <label for="flag-i">Ignore Case (i)</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="flag-m" onchange="testRegex()">
                        <label for="flag-m">Multiline (m)</label>
                    </div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="test-string">Test String:</label>
                <textarea id="test-string" class="tool-textarea" placeholder="Enter text to test against regex" oninput="testRegex()"></textarea>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="match-count">0</div>
                    <div class="stat-label">Matches</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="regex-valid">❓</div>
                    <div class="stat-label">Valid Regex</div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Matches:</label>
                <div class="tool-result" id="regex-matches"></div>
            </div>
        </div>
    `;
}

function initRegexTester() {
    // Set default values for demo
    document.getElementById('regex-pattern').value = '\\d+';
    document.getElementById('test-string').value = 'The price is $25.99 and quantity is 3 items.';
    testRegex();
}

function testRegex() {
    const pattern = document.getElementById('regex-pattern').value;
    const testString = document.getElementById('test-string').value;
    const flagG = document.getElementById('flag-g').checked;
    const flagI = document.getElementById('flag-i').checked;
    const flagM = document.getElementById('flag-m').checked;
    
    const matchCountEl = document.getElementById('match-count');
    const regexValidEl = document.getElementById('regex-valid');
    const matchesEl = document.getElementById('regex-matches');
    
    if (!pattern) {
        matchCountEl.textContent = '0';
        regexValidEl.textContent = '❓';
        matchesEl.textContent = 'Enter a regex pattern';
        return;
    }
    
    try {
        let flags = '';
        if (flagG) flags += 'g';
        if (flagI) flags += 'i';
        if (flagM) flags += 'm';
        
        const regex = new RegExp(pattern, flags);
        regexValidEl.textContent = '✅';
        
        if (!testString) {
            matchCountEl.textContent = '0';
            matchesEl.textContent = 'Enter test string';
            return;
        }
        
        const matches = testString.match(regex);
        const matchCount = matches ? matches.length : 0;
        
        matchCountEl.textContent = matchCount;
        
        if (matches && matches.length > 0) {
            const matchList = matches.map((match, index) => 
                `Match ${index + 1}: "${match}"`
            ).join('\n');
            matchesEl.textContent = matchList;
        } else {
            matchesEl.textContent = 'No matches found';
        }
        
    } catch (error) {
        regexValidEl.textContent = '❌';
        matchCountEl.textContent = '0';
        matchesEl.textContent = `Invalid regex: ${error.message}`;
    }
}
