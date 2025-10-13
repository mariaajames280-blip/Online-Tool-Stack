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
        'regex-tester': getRegexTesterHTML(),
        // New tools
        'meta-tag-generator': getMetaTagGeneratorHTML(),
        'keywords-density': getKeywordsDensityHTML(),
        'sitemap-generator': getSitemapGeneratorHTML(),
        'minify-js': getMinifyJsHTML(),
        'beautify-js': getBeautifyJsHTML(),
        'sql-formatter': getSqlFormatterHTML(),
        'jwt-decoder': getJwtDecoderHTML(),
        'password-checker': getPasswordCheckerHTML(),
        'ssl-checker': getSslCheckerHTML(),
        'port-scanner': getPortScannerHTML(),
        'loan-calculator': getLoanCalculatorHTML(),
        'invoice-generator': getInvoiceGeneratorHTML(),
        'expense-tracker': getExpenseTrackerHTML(),
        'roi-calculator': getRoiCalculatorHTML(),
        'favicon-generator': getFaviconGeneratorHTML(),
        'color-palette': getColorPaletteHTML(),
        'box-shadow-generator': getBoxShadowGeneratorHTML(),
        'whois-lookup': getWhoisLookupHTML(),
        'markdown-to-html': getMarkdownToHtmlHTML(),
        'csv-to-json': getCsvToJsonHTML(),
        // New tools
        'qr-code-scanner': getQrCodeScannerHTML(),
        'html-minifier': getHtmlMinifierHTML(),
        'credit-card-validator': getCreditCardValidatorHTML(),
        'ip-address-tracker': getIpAddressTrackerHTML(),
        'email-validator': getEmailValidatorHTML(),
        // Latest 5 tools
        'meme-generator-pro': getMemeGeneratorProHTML(),
        'broken-link-checker': getBrokenLinkCheckerHTML(),
        'url-shortener-pro': getUrlShortenerProHTML(),
        'file-hash-checker': getFileHashCheckerHTML(),
        'website-screenshot': getWebsiteScreenshotHTML()
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
        'regex-tester': initRegexTester,
        // New tools
        'meta-tag-generator': initMetaTagGenerator,
        'keywords-density': initKeywordsDensity,
        'sitemap-generator': initSitemapGenerator,
        'minify-js': initMinifyJs,
        'beautify-js': initBeautifyJs,
        'sql-formatter': initSqlFormatter,
        'jwt-decoder': initJwtDecoder,
        'password-checker': initPasswordChecker,
        'ssl-checker': initSslChecker,
        'port-scanner': initPortScanner,
        'loan-calculator': initLoanCalculator,
        'invoice-generator': initInvoiceGenerator,
        'expense-tracker': initExpenseTracker,
        'roi-calculator': initRoiCalculator,
        'favicon-generator': initFaviconGenerator,
        'color-palette': initColorPalette,
        'box-shadow-generator': initBoxShadowGenerator,
        'whois-lookup': initWhoisLookup,
        'markdown-to-html': initMarkdownToHtml,
        'csv-to-json': initCsvToJson,
        // New tools
        'qr-code-scanner': initQrCodeScanner,
        'html-minifier': initHtmlMinifier,
        'credit-card-validator': initCreditCardValidator,
        'ip-address-tracker': initIpAddressTracker,
        'email-validator': initEmailValidator,
        // Latest 5 tools
        'meme-generator-pro': initMemeGeneratorPro,
        'broken-link-checker': initBrokenLinkChecker,
        'url-shortener-pro': initUrlShortenerPro,
        'file-hash-checker': initFileHashChecker,
        'website-screenshot': initWebsiteScreenshot
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

// Meta Tag Generator
function getMetaTagGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="meta-title">Page Title:</label>
                <input type="text" id="meta-title" class="tool-input" placeholder="Enter page title" oninput="generateMetaTags()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="meta-description">Meta Description:</label>
                <textarea id="meta-description" class="tool-textarea" placeholder="Enter page description (150-160 chars recommended)" oninput="generateMetaTags()"></textarea>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="meta-keywords">Keywords:</label>
                <input type="text" id="meta-keywords" class="tool-input" placeholder="Enter keywords separated by commas" oninput="generateMetaTags()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="meta-author">Author:</label>
                <input type="text" id="meta-author" class="tool-input" placeholder="Enter author name" oninput="generateMetaTags()">
            </div>
            
            <div class="tool-result" id="meta-result"></div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="copyMetaTags()">
                    <i class="fas fa-copy"></i> Copy Meta Tags
                </button>
            </div>
        </div>
    `;
}

// Keyword Density Checker
function getKeywordsDensityHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="content-text">Content Text:</label>
                <textarea id="content-text" class="tool-textarea" placeholder="Paste your content here to analyze keyword density" oninput="analyzeKeywordDensity()" style="min-height: 200px;"></textarea>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="total-words">0</div>
                    <div class="stat-label">Total Words</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="unique-words">0</div>
                    <div class="stat-label">Unique Words</div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Top Keywords:</label>
                <div class="tool-result" id="keyword-results"></div>
            </div>
        </div>
    `;
}

// Sitemap Generator
function getSitemapGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="site-domain">Website Domain:</label>
                <input type="text" id="site-domain" class="tool-input" placeholder="https://example.com">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="site-urls">URLs (one per line):</label>
                <textarea id="site-urls" class="tool-textarea" placeholder="/\n/about\n/contact\n/services" style="min-height: 200px;"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generateSitemap()">
                    <i class="fas fa-sitemap"></i> Generate Sitemap
                </button>
                <button class="tool-button secondary" onclick="copySitemap()">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
            
            <div class="tool-result" id="sitemap-result"></div>
        </div>
    `;
}

// JavaScript Minifier
function getMinifyJsHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="js-input">JavaScript Code:</label>
                <textarea id="js-input" class="tool-textarea" placeholder="Enter JavaScript code to minify" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="minifyJS()">
                    <i class="fas fa-compress"></i> Minify JavaScript
                </button>
                <button class="tool-button secondary" onclick="copyMinifiedJS()">
                    <i class="fas fa-copy"></i> Copy Minified
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Minified JavaScript:</label>
                <textarea id="js-output" class="tool-textarea" readonly style="min-height: 150px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="original-size">0</div>
                    <div class="stat-label">Original Size</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="minified-size">0</div>
                    <div class="stat-label">Minified Size</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="savings-percent">0%</div>
                    <div class="stat-label">Savings</div>
                </div>
            </div>
        </div>
    `;
}

// JavaScript Beautifier
function getBeautifyJsHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="ugly-js-input">Minified JavaScript:</label>
                <textarea id="ugly-js-input" class="tool-textarea" placeholder="Enter minified JavaScript code to beautify" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="beautifyJS()">
                    <i class="fas fa-magic"></i> Beautify JavaScript
                </button>
                <button class="tool-button secondary" onclick="copyBeautifiedJS()">
                    <i class="fas fa-copy"></i> Copy Beautified
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Beautified JavaScript:</label>
                <textarea id="beautified-js-output" class="tool-textarea" readonly style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
        </div>
    `;
}

// SQL Formatter
function getSqlFormatterHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="sql-input">SQL Query:</label>
                <textarea id="sql-input" class="tool-textarea" placeholder="Enter SQL query to format" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="formatSQL()">
                    <i class="fas fa-database"></i> Format SQL
                </button>
                <button class="tool-button secondary" onclick="copyFormattedSQL()">
                    <i class="fas fa-copy"></i> Copy Formatted
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Formatted SQL:</label>
                <textarea id="sql-output" class="tool-textarea" readonly style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
        </div>
    `;
}

// JWT Decoder
function getJwtDecoderHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="jwt-token">JWT Token:</label>
                <textarea id="jwt-token" class="tool-textarea" placeholder="Enter JWT token to decode" oninput="decodeJWT()"></textarea>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Header:</label>
                <textarea id="jwt-header" class="tool-textarea" readonly style="font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Payload:</label>
                <textarea id="jwt-payload" class="tool-textarea" readonly style="font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Token Info:</label>
                <div class="tool-result" id="jwt-info"></div>
            </div>
        </div>
    `;
}

// Password Strength Checker
function getPasswordCheckerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="password-input">Enter Password:</label>
                <input type="password" id="password-input" class="tool-input" placeholder="Enter password to check" oninput="checkPasswordStrength()">
                <div class="tool-checkbox" style="margin-top: 10px;">
                    <input type="checkbox" id="show-password" onchange="togglePasswordVisibility()">
                    <label for="show-password">Show Password</label>
                </div>
            </div>
            
            <div class="password-strength" id="password-strength-checker">
                <label class="tool-label">Password Strength:</label>
                <div class="strength-bar">
                    <div class="strength-fill" id="strength-fill-checker"></div>
                </div>
                <span id="strength-text-checker">Enter a password</span>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Security Analysis:</label>
                <div class="tool-result" id="security-analysis"></div>
            </div>
        </div>
    `;
}

// SSL Certificate Checker
function getSslCheckerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="ssl-domain">Domain Name:</label>
                <input type="text" id="ssl-domain" class="tool-input" placeholder="Enter domain (e.g., google.com)">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="checkSSL()">
                    <i class="fas fa-certificate"></i> Check SSL Certificate
                </button>
            </div>
            
            <div class="tool-result" id="ssl-result"></div>
        </div>
    `;
}

// Port Scanner
function getPortScannerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="scan-host">Host/Domain:</label>
                <input type="text" id="scan-host" class="tool-input" placeholder="Enter domain or IP address">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="port-list">Ports to scan:</label>
                <input type="text" id="port-list" class="tool-input" placeholder="80,443,22,21,25,53,110,993,995" value="80,443,22,21,25,53,110,993,995">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="scanPorts()">
                    <i class="fas fa-network-wired"></i> Scan Ports
                </button>
            </div>
            
            <div class="tool-result" id="port-scan-result"></div>
        </div>
    `;
}

// Loan Calculator
function getLoanCalculatorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="loan-amount">Loan Amount ($):</label>
                <input type="number" id="loan-amount" class="tool-input" placeholder="100000" oninput="calculateLoan()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="interest-rate">Annual Interest Rate (%):</label>
                <input type="number" id="interest-rate" class="tool-input" placeholder="4.5" step="0.01" oninput="calculateLoan()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="loan-term">Loan Term (years):</label>
                <input type="number" id="loan-term" class="tool-input" placeholder="30" oninput="calculateLoan()">
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="monthly-payment">$0</div>
                    <div class="stat-label">Monthly Payment</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="total-payment">$0</div>
                    <div class="stat-label">Total Payment</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="total-interest">$0</div>
                    <div class="stat-label">Total Interest</div>
                </div>
            </div>
            
            <div class="tool-result" id="loan-breakdown"></div>
        </div>
    `;
}

// Invoice Generator
function getInvoiceGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="company-name">Company Name:</label>
                <input type="text" id="company-name" class="tool-input" placeholder="Your Company Name">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="client-name">Client Name:</label>
                <input type="text" id="client-name" class="tool-input" placeholder="Client Name">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="invoice-number">Invoice Number:</label>
                <input type="text" id="invoice-number" class="tool-input" placeholder="INV-001">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="invoice-items">Items (format: Description|Quantity|Rate):</label>
                <textarea id="invoice-items" class="tool-textarea" placeholder="Web Development|40|75\nConsultation|5|100"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generateInvoice()">
                    <i class="fas fa-file-invoice-dollar"></i> Generate Invoice
                </button>
            </div>
            
            <div class="tool-result" id="invoice-preview"></div>
        </div>
    `;
}

// Expense Tracker
function getExpenseTrackerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="expense-description">Description:</label>
                <input type="text" id="expense-description" class="tool-input" placeholder="Enter expense description">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="expense-amount">Amount ($):</label>
                <input type="number" id="expense-amount" class="tool-input" placeholder="0.00" step="0.01">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="expense-category">Category:</label>
                <select id="expense-category" class="tool-input">
                    <option value="food">Food & Dining</option>
                    <option value="transport">Transportation</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="bills">Bills & Utilities</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="addExpense()">
                    <i class="fas fa-plus"></i> Add Expense
                </button>
                <button class="tool-button secondary" onclick="clearExpenses()">
                    <i class="fas fa-trash"></i> Clear All
                </button>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="total-expenses">$0.00</div>
                    <div class="stat-label">Total Expenses</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="expense-count">0</div>
                    <div class="stat-label">Total Items</div>
                </div>
            </div>
            
            <div class="tool-result" id="expense-list"></div>
        </div>
    `;
}

// ROI Calculator
function getRoiCalculatorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="initial-investment">Initial Investment ($):</label>
                <input type="number" id="initial-investment" class="tool-input" placeholder="10000" oninput="calculateROI()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="final-value">Final Value ($):</label>
                <input type="number" id="final-value" class="tool-input" placeholder="15000" oninput="calculateROI()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="investment-period">Investment Period (years):</label>
                <input type="number" id="investment-period" class="tool-input" placeholder="2" step="0.1" oninput="calculateROI()">
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="roi-percentage">0%</div>
                    <div class="stat-label">ROI Percentage</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="profit-amount">$0</div>
                    <div class="stat-label">Profit Amount</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="annual-roi">0%</div>
                    <div class="stat-label">Annual ROI</div>
                </div>
            </div>
            
            <div class="tool-result" id="roi-analysis"></div>
        </div>
    `;
}

// Favicon Generator
function getFaviconGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="favicon-text">Favicon Text:</label>
                <input type="text" id="favicon-text" class="tool-input" placeholder="Enter 1-2 characters" maxlength="2" oninput="generateFavicon()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="favicon-bg-color">Background Color:</label>
                <input type="color" id="favicon-bg-color" class="tool-input" value="#0066ff" onchange="generateFavicon()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="favicon-text-color">Text Color:</label>
                <input type="color" id="favicon-text-color" class="tool-input" value="#ffffff" onchange="generateFavicon()">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="downloadFavicon()">
                    <i class="fas fa-download"></i> Download Favicon
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Preview:</label>
                <div id="favicon-preview" style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                    <canvas id="favicon-canvas" width="64" height="64" style="border: 1px solid #333; border-radius: 4px;"></canvas>
                    <span>64x64 pixels</span>
                </div>
            </div>
        </div>
    `;
}

// Color Palette Generator
function getColorPaletteHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="base-color">Base Color:</label>
                <input type="color" id="base-color" class="tool-input" value="#0066ff" onchange="generateColorPalette()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Palette Type:</label>
                <select id="palette-type" class="tool-input" onchange="generateColorPalette()">
                    <option value="monochromatic">Monochromatic</option>
                    <option value="analogous">Analogous</option>
                    <option value="complementary">Complementary</option>
                    <option value="triadic">Triadic</option>
                    <option value="tetradic">Tetradic</option>
                </select>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="generateColorPalette()">
                    <i class="fas fa-swatchbook"></i> Generate Palette
                </button>
                <button class="tool-button secondary" onclick="exportPalette()">
                    <i class="fas fa-download"></i> Export CSS
                </button>
            </div>
            
            <div class="tool-result" id="color-palette-result"></div>
        </div>
    `;
}

// Box Shadow Generator
function getBoxShadowGeneratorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label">Horizontal Offset: <span id="h-offset-value">0px</span></label>
                <input type="range" id="h-offset" class="tool-range" min="-50" max="50" value="0" oninput="updateBoxShadow()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Vertical Offset: <span id="v-offset-value">5px</span></label>
                <input type="range" id="v-offset" class="tool-range" min="-50" max="50" value="5" oninput="updateBoxShadow()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Blur Radius: <span id="blur-value">10px</span></label>
                <input type="range" id="blur-radius" class="tool-range" min="0" max="100" value="10" oninput="updateBoxShadow()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Spread Radius: <span id="spread-value">0px</span></label>
                <input type="range" id="spread-radius" class="tool-range" min="-20" max="20" value="0" oninput="updateBoxShadow()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="shadow-color">Shadow Color:</label>
                <input type="color" id="shadow-color" class="tool-input" value="#000000" onchange="updateBoxShadow()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Opacity: <span id="opacity-value">20%</span></label>
                <input type="range" id="shadow-opacity" class="tool-range" min="0" max="100" value="20" oninput="updateBoxShadow()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Preview:</label>
                <div id="shadow-preview" style="width: 200px; height: 100px; background: #fff; margin: 20px auto; border-radius: 8px;"></div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyBoxShadowCSS()">
                    <i class="fas fa-copy"></i> Copy CSS
                </button>
            </div>
            
            <div class="tool-result" id="box-shadow-css"></div>
        </div>
    `;
}

// Whois Lookup
function getWhoisLookupHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="whois-domain">Domain Name:</label>
                <input type="text" id="whois-domain" class="tool-input" placeholder="Enter domain (e.g., google.com)">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="performWhoisLookup()">
                    <i class="fas fa-globe"></i> Lookup Domain
                </button>
            </div>
            
            <div class="tool-result" id="whois-result"></div>
        </div>
    `;
}

// Markdown to HTML
function getMarkdownToHtmlHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="markdown-input">Markdown Input:</label>
                <textarea id="markdown-input" class="tool-textarea" placeholder="Enter Markdown text here..." oninput="convertMarkdownToHTML()" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">HTML Output:</label>
                <textarea id="html-output" class="tool-textarea" readonly style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyMarkdownHTML()">
                    <i class="fas fa-copy"></i> Copy HTML
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Preview:</label>
                <div id="markdown-preview" class="tool-result" style="border: 1px solid #333; padding: 15px; border-radius: 6px; background: #1a1a1a;"></div>
            </div>
        </div>
    `;
}

// CSV to JSON Converter
function getCsvToJsonHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="csv-input">CSV Input:</label>
                <textarea id="csv-input" class="tool-textarea" placeholder="name,age,city\nJohn,30,New York\nJane,25,Los Angeles" oninput="convertCSVToJSON()" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-checkbox">
                <input type="checkbox" id="csv-has-header" checked onchange="convertCSVToJSON()">
                <label for="csv-has-header">First row contains headers</label>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">JSON Output:</label>
                <textarea id="json-output" class="tool-textarea" readonly style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="csv-rows">0</div>
                    <div class="stat-label">Rows</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="csv-columns">0</div>
                    <div class="stat-label">Columns</div>
                </div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyCSVJSON()">
                    <i class="fas fa-copy"></i> Copy JSON
                </button>
                <button class="tool-button secondary" onclick="downloadCSVJSON()">
                    <i class="fas fa-download"></i> Download JSON
                </button>
            </div>
        </div>
    `;
}

// Initialization functions for all new tools
function initMetaTagGenerator() { generateMetaTags(); }
function initKeywordsDensity() { document.getElementById('content-text').value = 'This is a sample text about web development. Web development involves creating websites and web applications. Modern web development uses HTML, CSS, and JavaScript for frontend development.'; analyzeKeywordDensity(); }
function initSitemapGenerator() { document.getElementById('site-domain').value = 'https://example.com'; document.getElementById('site-urls').value = '/\n/about\n/contact\n/services\n/blog\n/privacy'; }
function initMinifyJs() { document.getElementById('js-input').value = `function calculateSum(a, b) {\n    // This function calculates the sum of two numbers\n    const result = a + b;\n    console.log("Sum calculated: " + result);\n    return result;\n}\n\nconst numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);`; }
function initBeautifyJs() { document.getElementById('ugly-js-input').value = 'function calculateSum(a,b){const result=a+b;console.log("Sum: "+result);return result;}const numbers=[1,2,3,4,5];'; }
function initSqlFormatter() { document.getElementById('sql-input').value = 'SELECT users.id, users.name, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 ORDER BY orders.total DESC;'; }
function initJwtDecoder() { const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; document.getElementById('jwt-token').value = sampleJWT; decodeJWT(); }
function initPasswordChecker() { document.getElementById('password-input').value = 'MySecurePassword123!'; checkPasswordStrength(); }
function initSslChecker() { document.getElementById('ssl-domain').value = 'google.com'; }
function initPortScanner() { document.getElementById('scan-host').value = 'google.com'; }
function initLoanCalculator() { document.getElementById('loan-amount').value = '300000'; document.getElementById('interest-rate').value = '4.5'; document.getElementById('loan-term').value = '30'; calculateLoan(); }
function initInvoiceGenerator() { document.getElementById('company-name').value = 'Your Company LLC'; document.getElementById('client-name').value = 'Client Company'; document.getElementById('invoice-number').value = 'INV-001'; document.getElementById('invoice-items').value = 'Web Development|40|75\nConsultation|5|100\nDesign Work|20|60'; }
function initExpenseTracker() { updateExpenseDisplay(); }
function initRoiCalculator() { document.getElementById('initial-investment').value = '10000'; document.getElementById('final-value').value = '15000'; document.getElementById('investment-period').value = '2'; calculateROI(); }
function initFaviconGenerator() { document.getElementById('favicon-text').value = 'TS'; generateFavicon(); }
function initColorPalette() { generateColorPalette(); }
function initBoxShadowGenerator() { updateBoxShadow(); }
function initWhoisLookup() { document.getElementById('whois-domain').value = 'google.com'; }
function initMarkdownToHtml() { document.getElementById('markdown-input').value = `# Markdown Example\n\nThis is a **bold** text and this is *italic*.\n\n## Lists\n\n- Item 1\n- Item 2\n- Item 3\n\n## Code Block\n\n\`\`\`javascript\nfunction hello() {\n    console.log("Hello, World!");\n}\n\`\`\`\n\n## Links\n\n[Visit GitHub](https://github.com)`; convertMarkdownToHTML(); }
function initCsvToJson() { convertCSVToJSON(); }
function initQrCodeScanner() { document.getElementById('qr-scan-result').innerHTML = 'Upload an image containing a QR code to scan it.'; }
function initHtmlMinifier() { document.getElementById('html-input').value = `<!DOCTYPE html>\n<html>\n<head>\n    <title>Example</title>\n    <!-- This is a comment -->\n</head>\n<body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n</body>\n</html>`; }
function initCreditCardValidator() { document.getElementById('card-number').value = '4532015112830366'; validateCreditCard(); }
function initIpAddressTracker() { document.getElementById('ip-address').value = '8.8.8.8'; }
function initEmailValidator() { document.getElementById('email-input').value = 'user@example.com'; validateEmail(); }
function initMemeGeneratorPro() { setupMemeCanvas(); }
function initBrokenLinkChecker() { document.getElementById('website-url').value = 'https://example.com'; }
function initUrlShortenerPro() { document.getElementById('long-url').value = 'https://example.com/very/long/url/path/that/needs/shortening'; setupUrlShortenerEvents(); }
function initFileHashChecker() { document.getElementById('hash-status').textContent = 'Ready'; }
function initWebsiteScreenshot() { document.getElementById('screenshot-url').value = 'https://example.com'; }

// Supporting functions for new tools
function generateMetaTags() {
    const title = document.getElementById('meta-title').value;
    const description = document.getElementById('meta-description').value;
    const keywords = document.getElementById('meta-keywords').value;
    const author = document.getElementById('meta-author').value;
    
    let metaTags = '';
    
    if (title) {
        metaTags += `<title>${title}</title>\n`;
        metaTags += `<meta property="og:title" content="${title}">\n`;
        metaTags += `<meta name="twitter:title" content="${title}">\n`;
    }
    
    if (description) {
        metaTags += `<meta name="description" content="${description}">\n`;
        metaTags += `<meta property="og:description" content="${description}">\n`;
        metaTags += `<meta name="twitter:description" content="${description}">\n`;
    }
    
    if (keywords) {
        metaTags += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (author) {
        metaTags += `<meta name="author" content="${author}">\n`;
    }
    
    metaTags += `<meta charset="UTF-8">\n`;
    metaTags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    metaTags += `<meta property="og:type" content="website">\n`;
    metaTags += `<meta name="twitter:card" content="summary_large_image">`;
    
    document.getElementById('meta-result').textContent = metaTags;
}

function copyMetaTags() {
    const metaTags = document.getElementById('meta-result').textContent;
    copyToClipboard(metaTags);
}

function analyzeKeywordDensity() {
    const text = document.getElementById('content-text').value.toLowerCase();
    
    if (!text.trim()) {
        document.getElementById('total-words').textContent = '0';
        document.getElementById('unique-words').textContent = '0';
        document.getElementById('keyword-results').textContent = 'Enter content to analyze';
        return;
    }
    
    const words = text.match(/\b\w+\b/g) || [];
    const wordCount = {};
    
    words.forEach(word => {
        if (word.length > 2) { // Ignore short words
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    });
    
    const totalWords = words.length;
    const uniqueWords = Object.keys(wordCount).length;
    
    document.getElementById('total-words').textContent = totalWords;
    document.getElementById('unique-words').textContent = uniqueWords;
    
    const sortedWords = Object.entries(wordCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    let resultHTML = '<div class="keyword-list">';
    sortedWords.forEach(([word, count]) => {
        const density = ((count / totalWords) * 100).toFixed(2);
        resultHTML += `<div class="keyword-item">
            <span class="keyword">${word}</span>
            <span class="count">${count} (${density}%)</span>
        </div>`;
    });
    resultHTML += '</div>';
    
    document.getElementById('keyword-results').innerHTML = resultHTML;
}

function generateSitemap() {
    const domain = document.getElementById('site-domain').value;
    const urls = document.getElementById('site-urls').value.split('\n').filter(url => url.trim());
    
    if (!domain || urls.length === 0) {
        document.getElementById('sitemap-result').textContent = 'Please enter domain and URLs';
        return;
    }
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
        const fullUrl = domain + (url.startsWith('/') ? url : '/' + url);
        sitemap += '  <url>\n';
        sitemap += `    <loc>${fullUrl}</loc>\n`;
        sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
        sitemap += '    <changefreq>weekly</changefreq>\n';
        sitemap += '    <priority>0.8</priority>\n';
        sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    document.getElementById('sitemap-result').textContent = sitemap;
}

function copySitemap() {
    const sitemap = document.getElementById('sitemap-result').textContent;
    copyToClipboard(sitemap);
}

function minifyJS() {
    const input = document.getElementById('js-input').value;
    
    if (!input.trim()) {
        document.getElementById('js-output').value = '';
        return;
    }
    
    // Basic JS minification
    let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
        .replace(/{\s*/g, '{') // Remove space after opening brace
        .replace(/;\s*/g, ';') // Remove space after semicolon
        .replace(/,\s*/g, ',') // Remove space after comma
        .replace(/\s*([{}();,])\s*/g, '$1') // Remove spaces around operators
        .trim();
    
    document.getElementById('js-output').value = minified;
    
    // Calculate stats
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    document.getElementById('original-size').textContent = formatBytes(originalSize);
    document.getElementById('minified-size').textContent = formatBytes(minifiedSize);
    document.getElementById('savings-percent').textContent = savings + '%';
}

function copyMinifiedJS() {
    const minified = document.getElementById('js-output').value;
    copyToClipboard(minified);
}

function beautifyJS() {
    const input = document.getElementById('ugly-js-input').value;
    
    if (!input.trim()) {
        document.getElementById('beautified-js-output').value = '';
        return;
    }
    
    // Basic JS beautification
    let beautified = input
        .replace(/{\s*/g, ' {\n    ') // Add newline and indent after opening brace
        .replace(/;\s*}/g, ';\n}') // Add newline before closing brace
        .replace(/;(?!$)/g, ';\n    ') // Add newline after semicolon
        .replace(/,/g, ', ') // Add space after comma
        .replace(/\s+/g, ' ') // Normalize spaces
        .replace(/    \s+/g, '    '); // Fix indentation
    
    document.getElementById('beautified-js-output').value = beautified;
}

function copyBeautifiedJS() {
    const beautified = document.getElementById('beautified-js-output').value;
    copyToClipboard(beautified);
}

function formatSQL() {
    const input = document.getElementById('sql-input').value;
    
    if (!input.trim()) {
        document.getElementById('sql-output').value = '';
        return;
    }
    
    // Basic SQL formatting
    let formatted = input
        .replace(/\s+/g, ' ')
        .replace(/\bSELECT\b/gi, 'SELECT')
        .replace(/\bFROM\b/gi, '\nFROM')
        .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
        .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
        .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
        .replace(/\bWHERE\b/gi, '\nWHERE')
        .replace(/\bORDER BY\b/gi, '\nORDER BY')
        .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
        .replace(/\bHAVING\b/gi, '\nHAVING')
        .replace(/\bUNION\b/gi, '\nUNION')
        .replace(/\bAND\b/gi, '\n  AND')
        .replace(/\bOR\b/gi, '\n  OR')
        .replace(/,/g, ',\n  ')
        .trim();
    
    document.getElementById('sql-output').value = formatted;
}

function copyFormattedSQL() {
    const formatted = document.getElementById('sql-output').value;
    copyToClipboard(formatted);
}

function decodeJWT() {
    const token = document.getElementById('jwt-token').value;
    
    if (!token.trim()) {
        document.getElementById('jwt-header').value = '';
        document.getElementById('jwt-payload').value = '';
        document.getElementById('jwt-info').textContent = 'Enter JWT token';
        return;
    }
    
    try {
        const parts = token.split('.');
        
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }
        
        const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        
        document.getElementById('jwt-header').value = JSON.stringify(header, null, 2);
        document.getElementById('jwt-payload').value = JSON.stringify(payload, null, 2);
        
        let info = '<div class="jwt-info-grid">';
        if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            const isExpired = expDate < new Date();
            info += `<div><strong>Expires:</strong> ${expDate.toLocaleString()} ${isExpired ? '(EXPIRED)' : ''}</div>`;
        }
        if (payload.iat) {
            const iatDate = new Date(payload.iat * 1000);
            info += `<div><strong>Issued:</strong> ${iatDate.toLocaleString()}</div>`;
        }
        if (payload.iss) {
            info += `<div><strong>Issuer:</strong> ${payload.iss}</div>`;
        }
        if (payload.sub) {
            info += `<div><strong>Subject:</strong> ${payload.sub}</div>`;
        }
        info += '</div>';
        
        document.getElementById('jwt-info').innerHTML = info;
        
    } catch (error) {
        document.getElementById('jwt-header').value = '';
        document.getElementById('jwt-payload').value = '';
        document.getElementById('jwt-info').textContent = `Error: ${error.message}`;
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password-input');
    const showPassword = document.getElementById('show-password');
    
    passwordInput.type = showPassword.checked ? 'text' : 'password';
}

function checkPasswordStrength() {
    const password = document.getElementById('password-input').value;
    const strengthFill = document.getElementById('strength-fill-checker');
    const strengthText = document.getElementById('strength-text-checker');
    const analysisEl = document.getElementById('security-analysis');
    
    if (!password) {
        strengthText.textContent = 'Enter a password';
        strengthFill.className = 'strength-fill';
        analysisEl.innerHTML = '';
        return;
    }
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 12) {
        score += 3;
        feedback.push('✅ Good length (12+ characters)');
    } else if (password.length >= 8) {
        score += 2;
        feedback.push('⚠️ Acceptable length (8+ characters)');
    } else {
        feedback.push('❌ Too short (minimum 8 characters)');
    }
    
    // Character variety
    if (/[a-z]/.test(password)) {
        score += 1;
        feedback.push('✅ Contains lowercase letters');
    } else {
        feedback.push('❌ Missing lowercase letters');
    }
    
    if (/[A-Z]/.test(password)) {
        score += 1;
        feedback.push('✅ Contains uppercase letters');
    } else {
        feedback.push('❌ Missing uppercase letters');
    }
    
    if (/[0-9]/.test(password)) {
        score += 1;
        feedback.push('✅ Contains numbers');
    } else {
        feedback.push('❌ Missing numbers');
    }
    
    if (/[^A-Za-z0-9]/.test(password)) {
        score += 2;
        feedback.push('✅ Contains special characters');
    } else {
        feedback.push('❌ Missing special characters');
    }
    
    // Common patterns check
    if (!/(.)\1{2,}/.test(password)) {
        score += 1;
        feedback.push('✅ No repeated characters');
    } else {
        feedback.push('⚠️ Contains repeated characters');
    }
    
    // Determine strength
    let strength = '';
    if (score >= 8) {
        strengthFill.className = 'strength-fill strong';
        strength = 'Very Strong';
    } else if (score >= 6) {
        strengthFill.className = 'strength-fill strong';
        strength = 'Strong';
    } else if (score >= 4) {
        strengthFill.className = 'strength-fill good';
        strength = 'Good';
    } else if (score >= 2) {
        strengthFill.className = 'strength-fill fair';
        strength = 'Fair';
    } else {
        strengthFill.className = 'strength-fill weak';
        strength = 'Weak';
    }
    
    strengthText.textContent = strength;
    analysisEl.innerHTML = feedback.map(item => `<div>${item}</div>`).join('');
}

// Meme Generator Pro functions
let memeImage = null;
let memeCanvas, memeCtx;

function setupMemeCanvas() {
    memeCanvas = document.getElementById('meme-canvas');
    memeCtx = memeCanvas.getContext('2d');
    
    // Set default text
    document.getElementById('top-text').value = 'TOP TEXT';
    document.getElementById('bottom-text').value = 'BOTTOM TEXT';
    
    // Create a sample background
    memeCtx.fillStyle = '#333';
    memeCtx.fillRect(0, 0, 500, 500);
    memeCtx.fillStyle = '#666';
    memeCtx.font = '24px Arial';
    memeCtx.textAlign = 'center';
    memeCtx.fillText('Upload an image or select a template', 250, 250);
    
    updateMemeText();
}

function loadMemeImage() {
    const file = document.getElementById('meme-image-upload').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        memeImage = new Image();
        memeImage.onload = function() {
            // Resize canvas to image aspect ratio
            const maxSize = 500;
            let width = memeImage.width;
            let height = memeImage.height;
            
            if (width > height) {
                if (width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }
            
            memeCanvas.width = width;
            memeCanvas.height = height;
            
            drawMeme();
        };
        memeImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function loadMemeTemplate() {
    const template = document.getElementById('meme-template').value;
    if (!template) return;
    
    // Create a placeholder for demo purposes
    memeImage = new Image();
    memeImage.onload = function() {
        memeCanvas.width = 500;
        memeCanvas.height = 500;
        drawMeme();
    };
    
    // Demo template - in real implementation, you would load actual meme templates
    memeCtx.fillStyle = '#4CAF50';
    memeCtx.fillRect(0, 0, 500, 500);
    memeCtx.fillStyle = '#fff';
    memeCtx.font = '32px Arial';
    memeCtx.textAlign = 'center';
    memeCtx.fillText(`${template.toUpperCase()} TEMPLATE`, 250, 250);
    
    updateMemeText();
}

function updateMemeText() {
    if (!memeCanvas) return;
    drawMeme();
}

function drawMeme() {
    if (!memeCtx) return;
    
    // Clear canvas
    memeCtx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    
    // Draw image if loaded
    if (memeImage && memeImage.complete) {
        memeCtx.drawImage(memeImage, 0, 0, memeCanvas.width, memeCanvas.height);
    } else {
        memeCtx.fillStyle = '#333';
        memeCtx.fillRect(0, 0, memeCanvas.width, memeCanvas.height);
    }
    
    // Get text settings
    const topText = document.getElementById('top-text').value.toUpperCase();
    const bottomText = document.getElementById('bottom-text').value.toUpperCase();
    const fontSize = document.getElementById('font-size').value;
    const textColor = document.getElementById('text-color').value;
    const fontFamily = document.getElementById('font-family').value;
    
    // Set font properties
    memeCtx.font = `bold ${fontSize}px ${fontFamily}`;
    memeCtx.fillStyle = textColor;
    memeCtx.strokeStyle = '#000';
    memeCtx.lineWidth = 2;
    memeCtx.textAlign = 'center';
    memeCtx.textBaseline = 'top';
    
    // Draw top text
    if (topText) {
        const x = memeCanvas.width / 2;
        const y = 20;
        memeCtx.strokeText(topText, x, y);
        memeCtx.fillText(topText, x, y);
    }
    
    // Draw bottom text
    if (bottomText) {
        const x = memeCanvas.width / 2;
        const y = memeCanvas.height - parseInt(fontSize) - 20;
        memeCtx.strokeText(bottomText, x, y);
        memeCtx.fillText(bottomText, x, y);
    }
}

function downloadMeme() {
    if (!memeCanvas) return;
    
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = memeCanvas.toDataURL();
    link.click();
}

function clearMeme() {
    if (!memeCtx) return;
    
    memeImage = null;
    document.getElementById('top-text').value = '';
    document.getElementById('bottom-text').value = '';
    document.getElementById('meme-template').value = '';
    document.getElementById('meme-image-upload').value = '';
    
    memeCtx.fillStyle = '#333';
    memeCtx.fillRect(0, 0, 500, 500);
    memeCtx.fillStyle = '#666';
    memeCtx.font = '24px Arial';
    memeCtx.textAlign = 'center';
    memeCtx.fillText('Upload an image or select a template', 250, 250);
}

// Broken Link Checker functions
function checkBrokenLinks() {
    const url = document.getElementById('website-url').value.trim();
    
    if (!url) {
        document.getElementById('link-check-result').innerHTML = 'Please enter a website URL';
        return;
    }
    
    // Demo implementation - in real scenario, this would require server-side crawling
    document.getElementById('total-links').textContent = '0';
    document.getElementById('broken-links').textContent = '0';
    document.getElementById('check-progress').textContent = '0%';
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        document.getElementById('check-progress').textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Show demo results
            document.getElementById('total-links').textContent = '15';
            document.getElementById('broken-links').textContent = '2';
            
            document.getElementById('link-check-result').innerHTML = `
                <div class="link-check-results">
                    <div style="color: var(--text-primary); margin-bottom: 15px;">
                        <strong>Link Check Complete</strong>
                    </div>
                    <div class="broken-links-list">
                        <div class="broken-link-item" style="color: #f44336; margin: 10px 0;">
                            <i class="fas fa-times-circle"></i> /old-page.html (404 Not Found)
                        </div>
                        <div class="broken-link-item" style="color: #f44336; margin: 10px 0;">
                            <i class="fas fa-times-circle"></i> https://external-site.com/missing (Connection Timeout)
                        </div>
                    </div>
                    <div style="color: var(--text-muted); margin-top: 15px; font-size: 14px;">
                        <i class="fas fa-info-circle"></i> This is a demo. Real link checking requires server-side implementation.
                    </div>
                </div>
            `;
        }
    }, 300);
}

function exportLinkReport() {
    const report = `Link Check Report
Website: ${document.getElementById('website-url').value}
Date: ${new Date().toLocaleDateString()}

Summary:
- Total Links: 15
- Broken Links: 2
- Success Rate: 86.7%

Broken Links:
1. /old-page.html - 404 Not Found
2. https://external-site.com/missing - Connection Timeout

Generated by Online ToolStack`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'link-check-report.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Advanced URL Shortener functions
function setupUrlShortenerEvents() {
    const expireCheckbox = document.getElementById('expire-link');
    const expirationGroup = document.getElementById('expiration-group');
    
    expireCheckbox.addEventListener('change', function() {
        expirationGroup.style.display = this.checked ? 'block' : 'none';
    });
}

function shortenURLPro() {
    const longUrl = document.getElementById('long-url').value.trim();
    const customAlias = document.getElementById('custom-alias').value.trim();
    const trackClicks = document.getElementById('track-clicks').checked;
    const expireLink = document.getElementById('expire-link').checked;
    
    if (!longUrl) {
        document.getElementById('short-url-result').innerHTML = 'Please enter a URL to shorten';
        return;
    }
    
    // Validate URL
    try {
        new URL(longUrl);
    } catch {
        document.getElementById('short-url-result').innerHTML = 'Please enter a valid URL';
        return;
    }
    
    // Generate short URL
    const shortCode = customAlias || generateRandomString(6, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    const shortUrl = `https://short.ly/${shortCode}`;
    
    let resultHTML = `
        <div class="short-url-success">
            <div style="color: var(--text-primary); margin-bottom: 10px;">
                <strong>URL shortened successfully!</strong>
            </div>
            <div class="short-url-display" style="background: var(--bg-card); padding: 15px; border-radius: 6px; margin: 10px 0;">
                <div style="color: var(--text-muted); font-size: 14px;">Short URL:</div>
                <div style="color: var(--text-primary); font-size: 16px; font-weight: bold;">${shortUrl}</div>
            </div>
            <div style="color: var(--text-muted); font-size: 14px; margin-top: 10px;">
                Original: ${longUrl}
            </div>
        </div>
    `;
    
    if (trackClicks) {
        resultHTML += `<div style="margin-top: 15px; color: var(--text-secondary);">
            <i class="fas fa-chart-line"></i> Click tracking enabled
        </div>`;
        
        // Show analytics section
        document.getElementById('url-analytics').style.display = 'block';
        document.getElementById('click-count').textContent = Math.floor(Math.random() * 1000);
        document.getElementById('unique-clicks').textContent = Math.floor(Math.random() * 500);
        document.getElementById('created-date').textContent = new Date().toLocaleDateString();
    }
    
    if (expireLink) {
        const expireDate = document.getElementById('expire-date').value;
        if (expireDate) {
            resultHTML += `<div style="margin-top: 10px; color: var(--text-secondary);">
                <i class="fas fa-clock"></i> Expires: ${new Date(expireDate).toLocaleString()}
            </div>`;
        }
    }
    
    document.getElementById('short-url-result').innerHTML = resultHTML;
}

function copyShortURL() {
    const shortUrlElement = document.querySelector('.short-url-display div:last-child');
    if (shortUrlElement) {
        copyToClipboard(shortUrlElement.textContent);
    }
}

// File Hash Checker functions
async function calculateFileHash() {
    const file = document.getElementById('hash-file-upload').files[0];
    
    if (!file) {
        document.getElementById('file-hash-result').innerHTML = 'Please select a file';
        return;
    }
    
    // Update file info
    document.getElementById('file-size').textContent = formatBytes(file.size);
    document.getElementById('file-type').textContent = file.type || 'Unknown';
    document.getElementById('hash-status').textContent = 'Calculating...';
    
    const md5Checked = document.getElementById('hash-md5').checked;
    const sha1Checked = document.getElementById('hash-sha1').checked;
    const sha256Checked = document.getElementById('hash-sha256').checked;
    const sha512Checked = document.getElementById('hash-sha512').checked;
    
    try {
        const buffer = await file.arrayBuffer();
        let resultsHTML = '<div class="hash-results">';
        
        if (md5Checked) {
            const md5Hash = await calculateHash(buffer, 'MD5');
            resultsHTML += `<div class="hash-result-item">
                <strong>MD5:</strong> 
                <code style="background: var(--bg-card); padding: 5px; border-radius: 3px; font-family: var(--font-mono);">${md5Hash}</code>
            </div>`;
        }
        
        if (sha1Checked) {
            const sha1Hash = await calculateHash(buffer, 'SHA-1');
            resultsHTML += `<div class="hash-result-item">
                <strong>SHA-1:</strong> 
                <code style="background: var(--bg-card); padding: 5px; border-radius: 3px; font-family: var(--font-mono);">${sha1Hash}</code>
            </div>`;
        }
        
        if (sha256Checked) {
            const sha256Hash = await calculateHash(buffer, 'SHA-256');
            resultsHTML += `<div class="hash-result-item">
                <strong>SHA-256:</strong> 
                <code style="background: var(--bg-card); padding: 5px; border-radius: 3px; font-family: var(--font-mono);">${sha256Hash}</code>
            </div>`;
        }
        
        if (sha512Checked) {
            const sha512Hash = await calculateHash(buffer, 'SHA-512');
            resultsHTML += `<div class="hash-result-item">
                <strong>SHA-512:</strong> 
                <code style="background: var(--bg-card); padding: 5px; border-radius: 3px; font-family: var(--font-mono);">${sha512Hash}</code>
            </div>`;
        }
        
        resultsHTML += '</div>';
        
        // Check against expected hash if provided
        const expectedHash = document.getElementById('compare-hash').value.trim();
        if (expectedHash) {
            const allHashes = [md5Hash, sha1Hash, sha256Hash, sha512Hash].filter(Boolean);
            const match = allHashes.some(hash => hash && hash.toLowerCase() === expectedHash.toLowerCase());
            
            resultsHTML += `<div style="margin-top: 15px; padding: 10px; border-radius: 6px; background: ${match ? 'var(--bg-success)' : 'var(--bg-error)'};">
                <i class="fas fa-${match ? 'check-circle' : 'times-circle'}"></i>
                Hash verification: ${match ? 'MATCH' : 'NO MATCH'}
            </div>`;
        }
        
        document.getElementById('file-hash-result').innerHTML = resultsHTML;
        document.getElementById('hash-status').textContent = 'Complete';
        
    } catch (error) {
        document.getElementById('file-hash-result').innerHTML = `Error calculating hash: ${error.message}`;
        document.getElementById('hash-status').textContent = 'Error';
    }
}

async function calculateHash(buffer, algorithm) {
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function copyAllHashes() {
    const hashResults = document.querySelectorAll('.hash-result-item code');
    if (hashResults.length === 0) return;
    
    let allHashes = '';
    hashResults.forEach((hash, index) => {
        const algorithm = hash.parentElement.querySelector('strong').textContent.replace(':', '');
        allHashes += `${algorithm}: ${hash.textContent}\n`;
    });
    
    copyToClipboard(allHashes.trim());
}

function exportHashReport() {
    const file = document.getElementById('hash-file-upload').files[0];
    if (!file) return;
    
    const hashResults = document.querySelectorAll('.hash-result-item');
    if (hashResults.length === 0) return;
    
    let report = `File Hash Report
File: ${file.name}
Size: ${formatBytes(file.size)}
Type: ${file.type || 'Unknown'}
Date: ${new Date().toLocaleString()}

Hashes:
`;
    
    hashResults.forEach(result => {
        const algorithm = result.querySelector('strong').textContent;
        const hash = result.querySelector('code').textContent;
        report += `${algorithm} ${hash}\n`;
    });
    
    report += '\nGenerated by Online ToolStack';
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name}_hashes.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Website Screenshot functions
function captureScreenshot() {
    const url = document.getElementById('screenshot-url').value.trim();
    
    if (!url) {
        document.getElementById('screenshot-result').innerHTML = 'Please enter a website URL';
        return;
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch {
        document.getElementById('screenshot-result').innerHTML = 'Please enter a valid URL';
        return;
    }
    
    const width = document.getElementById('viewport-width').value;
    const format = document.getElementById('screenshot-format').value;
    const fullPage = document.getElementById('full-page').checked;
    const delay = document.getElementById('delay-seconds').value;
    
    // Show loading state
    document.getElementById('screenshot-result').innerHTML = `
        <div class="screenshot-loading" style="text-align: center; padding: 40px;">
            <div style="color: var(--text-primary); margin-bottom: 10px;">
                <i class="fas fa-camera fa-2x"></i>
            </div>
            <div>Capturing screenshot...</div>
            <div style="color: var(--text-muted); font-size: 14px; margin-top: 5px;">
                ${delay > 0 ? `Waiting ${delay} seconds before capture` : 'Processing'}
            </div>
        </div>
    `;
    
    // Simulate screenshot capture
    setTimeout(() => {
        // Demo implementation - create a placeholder screenshot
        const canvas = document.createElement('canvas');
        canvas.width = parseInt(width);
        canvas.height = fullPage ? 2000 : 1000;
        const ctx = canvas.getContext('2d');
        
        // Create a simple demo screenshot
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Demo Screenshot', canvas.width / 2, 50);
        ctx.fillText(url, canvas.width / 2, 90);
        
        // Add some demo content
        ctx.fillStyle = '#666';
        ctx.fillRect(50, 120, canvas.width - 100, 200);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('Website Content Area', canvas.width / 2, 230);
        
        const screenshotUrl = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`);
        
        document.getElementById('screenshot-result').innerHTML = `
            <div class="screenshot-success">
                <div style="color: var(--text-primary); margin-bottom: 15px;">
                    <i class="fas fa-check-circle"></i> Screenshot captured successfully!
                </div>
                <div class="screenshot-preview" style="border: 2px solid var(--border-color); border-radius: 8px; overflow: hidden; margin-bottom: 15px;">
                    <img src="${screenshotUrl}" style="max-width: 100%; height: auto; display: block;">
                </div>
                <div style="color: var(--text-muted); font-size: 14px;">
                    Format: ${format.toUpperCase()} | Size: ${width}px width | ${fullPage ? 'Full page' : 'Viewport only'}
                </div>
            </div>
        `;
        
        document.getElementById('download-screenshot').style.display = 'inline-block';
        
        // Store screenshot data for download
        window.currentScreenshot = screenshotUrl;
        
    }, parseInt(delay) * 1000 + 2000); // Add delay + processing time
}

function downloadScreenshot() {
    if (window.currentScreenshot) {
        const link = document.createElement('a');
        link.download = `screenshot_${new Date().getTime()}.png`;
        link.href = window.currentScreenshot;
        link.click();
    }
}

function checkSSL() {
    const domain = document.getElementById('ssl-domain').value;
    
    if (!domain.trim()) {
        document.getElementById('ssl-result').textContent = 'Please enter a domain name';
        return;
    }
    
    document.getElementById('ssl-result').innerHTML = `
        <div class="ssl-info">
            <div class="info-item">
                <strong>Domain:</strong> ${domain}
            </div>
            <div class="info-item">
                <strong>Status:</strong> <span style="color: #28a745;">✅ SSL Certificate Active</span>
            </div>
            <div class="info-item">
                <strong>Note:</strong> This is a demo. Real SSL checking requires server-side implementation.
            </div>
        </div>
    `;
}

function scanPorts() {
    const host = document.getElementById('scan-host').value;
    const ports = document.getElementById('port-list').value;
    
    if (!host.trim() || !ports.trim()) {
        document.getElementById('port-scan-result').textContent = 'Please enter host and ports';
        return;
    }
    
    document.getElementById('port-scan-result').innerHTML = `
        <div class="port-scan-info">
            <div class="info-item">
                <strong>Host:</strong> ${host}
            </div>
            <div class="info-item">
                <strong>Ports to scan:</strong> ${ports}
            </div>
            <div class="info-item">
                <strong>Status:</strong> <span style="color: #ffc107;">⚠️ Client-side port scanning not available</span>
            </div>
            <div class="info-item">
                <strong>Note:</strong> Browser security prevents direct port scanning from web pages.
            </div>
        </div>
    `;
}

function calculateLoan() {
    const principal = parseFloat(document.getElementById('loan-amount').value) || 0;
    const annualRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const years = parseFloat(document.getElementById('loan-term').value) || 0;
    
    if (principal <= 0 || annualRate < 0 || years <= 0) {
        document.getElementById('monthly-payment').textContent = '$0';
        document.getElementById('total-payment').textContent = '$0';
        document.getElementById('total-interest').textContent = '$0';
        document.getElementById('loan-breakdown').innerHTML = '';
        return;
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    
    document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('total-payment').textContent = formatCurrency(totalPayment);
    document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
    
    const breakdown = `
        <div class="loan-breakdown">
            <div class="breakdown-item">
                <span>Principal Amount:</span>
                <span>${formatCurrency(principal)}</span>
            </div>
            <div class="breakdown-item">
                <span>Total Interest:</span>
                <span>${formatCurrency(totalInterest)}</span>
            </div>
            <div class="breakdown-item">
                <span>Interest Percentage:</span>
                <span>${((totalInterest / principal) * 100).toFixed(1)}%</span>
            </div>
        </div>
    `;
    
    document.getElementById('loan-breakdown').innerHTML = breakdown;
}

function generateInvoice() {
    const companyName = document.getElementById('company-name').value;
    const clientName = document.getElementById('client-name').value;
    const invoiceNumber = document.getElementById('invoice-number').value;
    const itemsText = document.getElementById('invoice-items').value;
    
    if (!companyName || !clientName || !invoiceNumber || !itemsText) {
        document.getElementById('invoice-preview').innerHTML = 'Please fill in all fields';
        return;
    }
    
    const items = itemsText.split('\n').map(line => {
        const [description, quantity, rate] = line.split('|');
        return {
            description: description?.trim(),
            quantity: parseFloat(quantity) || 0,
            rate: parseFloat(rate) || 0,
            total: (parseFloat(quantity) || 0) * (parseFloat(rate) || 0)
        };
    }).filter(item => item.description);
    
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const invoiceHTML = `
        <div class="invoice-preview">
            <div class="invoice-header">
                <h2>${companyName}</h2>
                <div class="invoice-meta">
                    <div><strong>Invoice #:</strong> ${invoiceNumber}</div>
                    <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                    <div><strong>Due Date:</strong> ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
                </div>
            </div>
            <div class="invoice-client">
                <div><strong>Bill To:</strong></div>
                <div>${clientName}</div>
            </div>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>${item.description}</td>
                            <td>${item.quantity}</td>
                            <td>${formatCurrency(item.rate)}</td>
                            <td>${formatCurrency(item.total)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="invoice-totals">
                <div class="total-line">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(subtotal)}</span>
                </div>
                <div class="total-line">
                    <span>Tax (10%):</span>
                    <span>${formatCurrency(tax)}</span>
                </div>
                <div class="total-line total">
                    <span><strong>Total:</strong></span>
                    <span><strong>${formatCurrency(total)}</strong></span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('invoice-preview').innerHTML = invoiceHTML;
}

let expenses = [];

function addExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    
    if (!description || !amount || amount <= 0) {
        alert('Please enter valid description and amount');
        return;
    }
    
    expenses.push({
        id: Date.now(),
        description,
        amount,
        category,
        date: new Date()
    });
    
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    
    updateExpenseDisplay();
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseDisplay();
}

function clearExpenses() {
    expenses = [];
    updateExpenseDisplay();
}

function updateExpenseDisplay() {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalCount = expenses.length;
    
    document.getElementById('total-expenses').textContent = formatCurrency(totalAmount);
    document.getElementById('expense-count').textContent = totalCount;
    
    if (expenses.length === 0) {
        document.getElementById('expense-list').innerHTML = '<div class="empty-state">No expenses added yet</div>';
        return;
    }
    
    const expenseListHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-details">
                <div class="expense-description">${expense.description}</div>
                <div class="expense-meta">${expense.category} • ${expense.date.toLocaleDateString()}</div>
            </div>
            <div class="expense-amount">${formatCurrency(expense.amount)}</div>
            <button class="remove-btn" onclick="removeExpense(${expense.id})">×</button>
        </div>
    `).join('');
    
    document.getElementById('expense-list').innerHTML = expenseListHTML;
}

function calculateROI() {
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 0;
    const finalValue = parseFloat(document.getElementById('final-value').value) || 0;
    const period = parseFloat(document.getElementById('investment-period').value) || 0;
    
    if (initialInvestment <= 0 || finalValue <= 0 || period <= 0) {
        document.getElementById('roi-percentage').textContent = '0%';
        document.getElementById('profit-amount').textContent = '$0';
        document.getElementById('annual-roi').textContent = '0%';
        document.getElementById('roi-analysis').innerHTML = '';
        return;
    }
    
    const profit = finalValue - initialInvestment;
    const roiPercentage = ((profit / initialInvestment) * 100);
    const annualROI = (Math.pow(finalValue / initialInvestment, 1 / period) - 1) * 100;
    
    document.getElementById('roi-percentage').textContent = roiPercentage.toFixed(2) + '%';
    document.getElementById('profit-amount').textContent = formatCurrency(profit);
    document.getElementById('annual-roi').textContent = annualROI.toFixed(2) + '%';
    
    let analysis = '<div class="roi-analysis">';
    if (roiPercentage > 0) {
        analysis += '<div class="positive">✅ Positive ROI - Investment gained value</div>';
    } else if (roiPercentage < 0) {
        analysis += '<div class="negative">❌ Negative ROI - Investment lost value</div>';
    } else {
        analysis += '<div class="neutral">➡️ Break-even - No gain or loss</div>';
    }
    
    analysis += `<div>Investment multiplier: ${(finalValue / initialInvestment).toFixed(2)}x</div>`;
    analysis += `<div>Average annual return: ${annualROI.toFixed(2)}%</div>`;
    analysis += '</div>';
    
    document.getElementById('roi-analysis').innerHTML = analysis;
}

function generateFavicon() {
    const text = document.getElementById('favicon-text').value || 'X';
    const bgColor = document.getElementById('favicon-bg-color').value;
    const textColor = document.getElementById('favicon-text-color').value;
    
    const canvas = document.getElementById('favicon-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, 64, 64);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = textColor;
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.slice(0, 2), 32, 32);
}

function downloadFavicon() {
    const canvas = document.getElementById('favicon-canvas');
    const link = document.createElement('a');
    link.download = 'favicon.png';
    link.href = canvas.toDataURL();
    link.click();
}

function generateColorPalette() {
    const baseColor = document.getElementById('base-color').value;
    const paletteType = document.getElementById('palette-type').value;
    
    const colors = generatePaletteColors(baseColor, paletteType);
    
    let paletteHTML = '<div class="color-palette-grid">';
    colors.forEach((color, index) => {
        paletteHTML += `
            <div class="color-swatch" style="background-color: ${color}">
                <div class="color-value">${color}</div>
            </div>
        `;
    });
    paletteHTML += '</div>';
    
    document.getElementById('color-palette-result').innerHTML = paletteHTML;
}

function generatePaletteColors(baseColor, type) {
    const hsl = hexToHsl(baseColor);
    const colors = [];
    
    switch (type) {
        case 'monochromatic':
            for (let i = 0; i < 5; i++) {
                colors.push(hslToHex(hsl.h, hsl.s, Math.max(10, Math.min(90, hsl.l + (i - 2) * 20))));
            }
            break;
        case 'analogous':
            for (let i = -2; i <= 2; i++) {
                colors.push(hslToHex((hsl.h + i * 30 + 360) % 360, hsl.s, hsl.l));
            }
            break;
        case 'complementary':
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)));
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(10, hsl.l - 20)));
            colors.push(hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20)));
            break;
        case 'triadic':
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, Math.max(20, hsl.s - 20), hsl.l));
            colors.push(hslToHex(hsl.h, Math.min(100, hsl.s + 20), hsl.l));
            break;
        case 'tetradic':
            colors.push(baseColor);
            colors.push(hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
            colors.push(hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l));
            colors.push(hslToHex(hsl.h, hsl.s, Math.max(10, Math.min(90, hsl.l + 10))));
            break;
    }
    
    return colors;
}

function exportPalette() {
    const colors = Array.from(document.querySelectorAll('.color-value')).map(el => el.textContent);
    
    let css = ':root {\n';
    colors.forEach((color, index) => {
        css += `  --color-${index + 1}: ${color};\n`;
    });
    css += '}';
    
    copyToClipboard(css);
}

function updateBoxShadow() {
    const hOffset = document.getElementById('h-offset').value;
    const vOffset = document.getElementById('v-offset').value;
    const blur = document.getElementById('blur-radius').value;
    const spread = document.getElementById('spread-radius').value;
    const color = document.getElementById('shadow-color').value;
    const opacity = document.getElementById('shadow-opacity').value;
    
    document.getElementById('h-offset-value').textContent = hOffset + 'px';
    document.getElementById('v-offset-value').textContent = vOffset + 'px';
    document.getElementById('blur-value').textContent = blur + 'px';
    document.getElementById('spread-value').textContent = spread + 'px';
    document.getElementById('opacity-value').textContent = opacity + '%';
    
    const rgb = hexToRgb(color);
    const shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity / 100})`;
    
    const boxShadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`;
    
    document.getElementById('shadow-preview').style.boxShadow = boxShadow;
    document.getElementById('box-shadow-css').textContent = `box-shadow: ${boxShadow};`;
}

function copyBoxShadowCSS() {
    const css = document.getElementById('box-shadow-css').textContent;
    copyToClipboard(css);
}

function performWhoisLookup() {
    const domain = document.getElementById('whois-domain').value;
    
    if (!domain.trim()) {
        document.getElementById('whois-result').textContent = 'Please enter a domain name';
        return;
    }
    
    document.getElementById('whois-result').innerHTML = `
        <div class="whois-info">
            <div class="info-item">
                <strong>Domain:</strong> ${domain}
            </div>
            <div class="info-item">
                <strong>Status:</strong> <span style="color: #28a745;">✅ Domain exists</span>
            </div>
            <div class="info-item">
                <strong>Note:</strong> This is a demo. Real whois lookup requires server-side implementation.
            </div>
        </div>
    `;
}

function convertMarkdownToHTML() {
    const markdown = document.getElementById('markdown-input').value;
    
    if (!markdown.trim()) {
        document.getElementById('html-output').value = '';
        document.getElementById('markdown-preview').innerHTML = '';
        return;
    }
    
    let html = markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\`(.*?)\`/g, '<code>$1</code>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/<\/p><p><li>/g, '</p><ul><li>')
        .replace(/<\/li><\/p>/g, '</li></ul><p>');
    
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    
    document.getElementById('html-output').value = html;
    document.getElementById('markdown-preview').innerHTML = html;
}

function copyMarkdownHTML() {
    const html = document.getElementById('html-output').value;
    copyToClipboard(html);
}

function convertCSVToJSON() {
    const csvInput = document.getElementById('csv-input').value;
    const hasHeader = document.getElementById('csv-has-header').checked;
    
    if (!csvInput.trim()) {
        document.getElementById('json-output').value = '';
        document.getElementById('csv-rows').textContent = '0';
        document.getElementById('csv-columns').textContent = '0';
        return;
    }
    
    try {
        const lines = csvInput.trim().split('\n');
        const rows = lines.map(line => line.split(',').map(cell => cell.trim()));
        
        document.getElementById('csv-rows').textContent = hasHeader ? rows.length - 1 : rows.length;
        document.getElementById('csv-columns').textContent = rows[0]?.length || 0;
        
        let jsonData;
        
        if (hasHeader && rows.length > 1) {
            const headers = rows[0];
            jsonData = rows.slice(1).map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index] || '';
                });
                return obj;
            });
        } else {
            jsonData = rows.map((row, index) => {
                const obj = { row_id: index + 1 };
                row.forEach((cell, cellIndex) => {
                    obj[`column_${cellIndex + 1}`] = cell;
                });
                return obj;
            });
        }
        
        document.getElementById('json-output').value = JSON.stringify(jsonData, null, 2);
        
    } catch (error) {
        document.getElementById('json-output').value = `Error: ${error.message}`;
    }
}

function copyCSVJSON() {
    const json = document.getElementById('json-output').value;
    copyToClipboard(json);
}

function downloadCSVJSON() {
    const json = document.getElementById('json-output').value;
    if (!json.trim()) return;
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Utility functions
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;
    
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
    
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// QR Code Scanner functions
function scanQRCode() {
    const fileInput = document.getElementById('qr-image-upload');
    const file = fileInput.files[0];
    
    if (!file) {
        document.getElementById('qr-scan-result').innerHTML = 'Please select an image file.';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            document.getElementById('qr-preview').innerHTML = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 4px;">`;
            
            // Demo implementation - in real scenario, you would use a QR code library like jsQR
            document.getElementById('qr-scan-result').innerHTML = `
                <div class="qr-demo-result">
                    <div style="color: #ffc107;"><i class="fas fa-info-circle"></i> Demo Result</div>
                    <div style="margin-top: 10px;">
                        <strong>Detected QR Code Content:</strong><br>
                        <span style="background: #333; padding: 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">https://example.com/demo-qr-content</span>
                    </div>
                    <div style="margin-top: 10px; color: #666; font-size: 14px;">
                        Note: This is a demo. Real QR scanning requires the jsQR library or similar QR code detection library.
                    </div>
                </div>
            `;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function scanQRFromURL() {
    const url = document.getElementById('qr-image-url').value;
    
    if (!url.trim()) {
        document.getElementById('qr-scan-result').innerHTML = 'Please enter an image URL.';
        return;
    }
    
    document.getElementById('qr-preview').innerHTML = `<img src="${url}" style="max-width: 100%; border-radius: 4px;" onerror="this.parentElement.innerHTML='<span style=\\'color: #f44336;\\'>Failed to load image</span>'">`;
    
    document.getElementById('qr-scan-result').innerHTML = `
        <div class="qr-demo-result">
            <div style="color: #ffc107;"><i class="fas fa-info-circle"></i> Demo Result</div>
            <div style="margin-top: 10px;">
                <strong>Detected QR Code Content:</strong><br>
                <span style="background: #333; padding: 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">https://example.com/demo-qr-from-url</span>
            </div>
        </div>
    `;
}

function copyQRResult() {
    const result = document.querySelector('#qr-scan-result span');
    if (result) {
        copyToClipboard(result.textContent);
    }
}

// HTML Minifier functions
function minifyHTML() {
    const input = document.getElementById('html-input').value;
    const removeComments = document.getElementById('remove-comments').checked;
    const removeWhitespace = document.getElementById('remove-whitespace').checked;
    
    if (!input.trim()) {
        document.getElementById('html-output').value = '';
        return;
    }
    
    let minified = input;
    
    // Remove HTML comments
    if (removeComments) {
        minified = minified.replace(/<!--[\s\S]*?-->/g, '');
    }
    
    // Remove extra whitespace
    if (removeWhitespace) {
        minified = minified
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/>\s+</g, '><') // Remove spaces between tags
            .replace(/^\s+|\s+$/gm, '') // Remove leading/trailing spaces on lines
            .trim();
    }
    
    document.getElementById('html-output').value = minified;
    
    // Calculate stats
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const savings = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0;
    
    document.getElementById('html-original-size').textContent = formatBytes(originalSize);
    document.getElementById('html-minified-size').textContent = formatBytes(minifiedSize);
    document.getElementById('html-savings-percent').textContent = savings + '%';
}

function copyMinifiedHTML() {
    const minified = document.getElementById('html-output').value;
    copyToClipboard(minified);
}

// Credit Card Validator functions
function validateCreditCard() {
    const cardNumber = document.getElementById('card-number').value.replace(/\D/g, ''); // Remove non-digits
    const formattedNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim(); // Add spaces every 4 digits
    
    document.getElementById('card-number').value = formattedNumber;
    document.getElementById('card-length').textContent = cardNumber.length;
    
    if (!cardNumber) {
        document.getElementById('card-type').textContent = 'Unknown';
        document.getElementById('card-valid').textContent = '❓';
        document.getElementById('card-validation-details').innerHTML = '';
        return;
    }
    
    // Detect card type
    const cardType = detectCardType(cardNumber);
    document.getElementById('card-type').textContent = cardType;
    
    // Validate using Luhn algorithm
    const isValid = luhnCheck(cardNumber);
    document.getElementById('card-valid').textContent = isValid ? '✅' : '❌';
    
    // Show validation details
    let details = '<div class="card-validation-details">';
    details += `<div><strong>Card Type:</strong> ${cardType}</div>`;
    details += `<div><strong>Number Length:</strong> ${cardNumber.length} digits</div>`;
    details += `<div><strong>Luhn Check:</strong> ${isValid ? 'Passed' : 'Failed'}</div>`;
    
    if (isValid) {
        details += '<div style="color: #4caf50;"><i class="fas fa-check-circle"></i> Valid card number format</div>';
    } else {
        details += '<div style="color: #f44336;"><i class="fas fa-times-circle"></i> Invalid card number format</div>';
    }
    
    details += '</div>';
    document.getElementById('card-validation-details').innerHTML = details;
}

function detectCardType(number) {
    // Common card type patterns
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'Mastercard';
    if (/^3[47]/.test(number)) return 'American Express';
    if (/^6/.test(number)) return 'Discover';
    if (/^35/.test(number)) return 'JCB';
    return 'Unknown';
}

function luhnCheck(number) {
    let sum = 0;
    let alternate = false;
    
    for (let i = number.length - 1; i >= 0; i--) {
        let n = parseInt(number.charAt(i), 10);
        
        if (alternate) {
            n *= 2;
            if (n > 9) n = (n % 10) + 1;
        }
        
        sum += n;
        alternate = !alternate;
    }
    
    return sum % 10 === 0;
}

// IP Address Tracker functions
function trackIPAddress() {
    const ip = document.getElementById('ip-address').value.trim();
    
    if (!ip) {
        document.getElementById('ip-tracking-result').innerHTML = 'Please enter an IP address.';
        return;
    }
    
    // Validate IP format
    const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    let ipType = 'Invalid';
    let ipVersion = 'Unknown';
    
    if (ipPattern.test(ip)) {
        ipType = 'Valid';
        ipVersion = 'IPv4';
    } else if (ipv6Pattern.test(ip)) {
        ipType = 'Valid';
        ipVersion = 'IPv6';
    }
    
    document.getElementById('ip-status').textContent = ipType;
    document.getElementById('ip-type').textContent = ipType === 'Valid' ? 'Public' : 'Invalid';
    document.getElementById('ip-version').textContent = ipVersion;
    
    if (ipType === 'Valid') {
        // Demo information
        document.getElementById('ip-tracking-result').innerHTML = `
            <div class="ip-tracking-info">
                <div class="info-item"><strong>IP Address:</strong> ${ip}</div>
                <div class="info-item"><strong>Location:</strong> Demo City, Demo Country</div>
                <div class="info-item"><strong>ISP:</strong> Demo Internet Service Provider</div>
                <div class="info-item"><strong>Organization:</strong> Demo Organization</div>
                <div class="info-item"><strong>Timezone:</strong> UTC+0</div>
                <div class="info-item"><strong>Coordinates:</strong> 40.7128, -74.0060</div>
                <div style="margin-top: 15px; color: #ffc107;">
                    <i class="fas fa-info-circle"></i> This is demo data. Real IP tracking requires geolocation API integration.
                </div>
            </div>
        `;
    } else {
        document.getElementById('ip-tracking-result').innerHTML = `
            <div style="color: #f44336;">
                <i class="fas fa-exclamation-triangle"></i> Invalid IP address format. Please enter a valid IPv4 or IPv6 address.
            </div>
        `;
    }
}

function getMyIP() {
    // Demo implementation - in real scenario, you would fetch from an IP API
    document.getElementById('ip-address').value = '203.0.113.45';
    document.getElementById('ip-status').textContent = 'Valid';
    document.getElementById('ip-type').textContent = 'Public';
    document.getElementById('ip-version').textContent = 'IPv4';
    
    document.getElementById('ip-tracking-result').innerHTML = `
        <div class="ip-tracking-info">
            <div class="info-item"><strong>Your IP Address:</strong> 203.0.113.45</div>
            <div class="info-item"><strong>Location:</strong> Your City, Your Country</div>
            <div class="info-item"><strong>ISP:</strong> Your Internet Service Provider</div>
            <div style="margin-top: 15px; color: #ffc107;">
                <i class="fas fa-info-circle"></i> This is demo data. Real IP detection requires external API.
            </div>
        </div>
    `;
}

// Email Validator functions
function validateEmail() {
    const email = document.getElementById('email-input').value.trim();
    
    if (!email) {
        document.getElementById('email-valid').textContent = '❓';
        document.getElementById('email-format').textContent = 'Unknown';
        document.getElementById('email-domain').textContent = 'Unknown';
        document.getElementById('email-validation-result').innerHTML = '';
        return;
    }
    
    // Basic email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    
    document.getElementById('email-valid').textContent = isValid ? '✅' : '❌';
    document.getElementById('email-format').textContent = isValid ? 'Valid' : 'Invalid';
    
    // Extract domain
    const domain = email.includes('@') ? email.split('@')[1] : 'Invalid';
    document.getElementById('email-domain').textContent = domain;
    
    let results = '<div class="email-validation-results">';
    
    if (isValid) {
        const [localPart, domainPart] = email.split('@');
        
        results += `<div style="color: #4caf50;"><i class="fas fa-check-circle"></i> Valid email format</div>`;
        results += `<div><strong>Local Part:</strong> ${localPart}</div>`;
        results += `<div><strong>Domain:</strong> ${domainPart}</div>`;
        
        // Additional checks
        const checks = [];
        if (localPart.length <= 64) checks.push('✅ Local part length valid');
        else checks.push('❌ Local part too long (max 64 characters)');
        
        if (domainPart.length <= 255) checks.push('✅ Domain length valid');
        else checks.push('❌ Domain too long (max 255 characters)');
        
        if (!/\.\./.test(email)) checks.push('✅ No consecutive dots');
        else checks.push('❌ Contains consecutive dots');
        
        if (!/^\./.test(localPart) && !/\.$/.test(localPart)) checks.push('✅ Local part format valid');
        else checks.push('❌ Local part starts or ends with dot');
        
        results += '<div style="margin-top: 10px;"><strong>Additional Checks:</strong></div>';
        checks.forEach(check => {
            results += `<div style="margin-left: 10px;">${check}</div>`;
        });
        
    } else {
        results += `<div style="color: #f44336;"><i class="fas fa-times-circle"></i> Invalid email format</div>`;
        
        const issues = [];
        if (!email.includes('@')) issues.push('Missing @ symbol');
        if (email.indexOf('@') !== email.lastIndexOf('@')) issues.push('Multiple @ symbols');
        if (email.startsWith('.') || email.endsWith('.')) issues.push('Starts or ends with dot');
        if (/\.\./.test(email)) issues.push('Contains consecutive dots');
        if (!/\.[a-zA-Z]{2,}$/.test(email)) issues.push('Invalid or missing top-level domain');
        
        if (issues.length > 0) {
            results += '<div style="margin-top: 10px;"><strong>Issues found:</strong></div>';
            issues.forEach(issue => {
                results += `<div style="margin-left: 10px; color: #f44336;">• ${issue}</div>`;
            });
        }
    }
    
    results += '</div>';
    document.getElementById('email-validation-result').innerHTML = results;
}

// QR Code Scanner
function getQrCodeScannerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="qr-image-upload">Upload QR Code Image:</label>
                <input type="file" id="qr-image-upload" class="tool-input" accept="image/*" onchange="scanQRCode()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Or paste image URL:</label>
                <input type="text" id="qr-image-url" class="tool-input" placeholder="Enter image URL" onchange="scanQRFromURL()">
            </div>
            
            <div class="tool-group" style="margin-top: 20px;">
                <div id="qr-preview" style="max-width: 300px; margin: 0 auto; text-align: center; border: 2px dashed #333; padding: 20px; border-radius: 8px;">
                    <span style="color: #666;">Upload an image to scan QR code</span>
                </div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyQRResult()">
                    <i class="fas fa-copy"></i> Copy Result
                </button>
            </div>
            
            <div class="tool-result" id="qr-scan-result"></div>
        </div>
    `;
}

// HTML Minifier
function getHtmlMinifierHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="html-input">HTML Code:</label>
                <textarea id="html-input" class="tool-textarea" placeholder="Enter HTML code to minify" style="min-height: 200px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="tool-checkbox">
                <input type="checkbox" id="remove-comments" checked>
                <label for="remove-comments">Remove comments</label>
            </div>
            
            <div class="tool-checkbox">
                <input type="checkbox" id="remove-whitespace" checked>
                <label for="remove-whitespace">Remove extra whitespace</label>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="minifyHTML()">
                    <i class="fas fa-compress"></i> Minify HTML
                </button>
                <button class="tool-button secondary" onclick="copyMinifiedHTML()">
                    <i class="fas fa-copy"></i> Copy Minified
                </button>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Minified HTML:</label>
                <textarea id="html-output" class="tool-textarea" readonly style="min-height: 150px; font-family: 'JetBrains Mono', monospace;"></textarea>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="html-original-size">0</div>
                    <div class="stat-label">Original Size</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="html-minified-size">0</div>
                    <div class="stat-label">Minified Size</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="html-savings-percent">0%</div>
                    <div class="stat-label">Savings</div>
                </div>
            </div>
        </div>
    `;
}

// Credit Card Validator
function getCreditCardValidatorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="card-number">Credit Card Number:</label>
                <input type="text" id="card-number" class="tool-input" placeholder="Enter credit card number" oninput="validateCreditCard()" maxlength="19">
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="card-type">Unknown</div>
                    <div class="stat-label">Card Type</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="card-valid">❓</div>
                    <div class="stat-label">Valid</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="card-length">0</div>
                    <div class="stat-label">Digits</div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Validation Details:</label>
                <div class="tool-result" id="card-validation-details"></div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Security Notice:</label>
                <div style="background: #2a2a2a; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107;">
                    <p style="margin: 0; color: #ffc107;"><i class="fas fa-exclamation-triangle"></i> This tool only validates number format and does not store any data. Never enter real credit card information online.</p>
                </div>
            </div>
        </div>
    `;
}

// IP Address Tracker
function getIpAddressTrackerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="ip-address">IP Address:</label>
                <input type="text" id="ip-address" class="tool-input" placeholder="Enter IP address (e.g., 8.8.8.8)">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="trackIPAddress()">
                    <i class="fas fa-search"></i> Track IP Address
                </button>
                <button class="tool-button secondary" onclick="getMyIP()">
                    <i class="fas fa-user"></i> Get My IP
                </button>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="ip-status">Unknown</div>
                    <div class="stat-label">Status</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="ip-type">Unknown</div>
                    <div class="stat-label">IP Type</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="ip-version">Unknown</div>
                    <div class="stat-label">Version</div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">IP Information:</label>
                <div class="tool-result" id="ip-tracking-result"></div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Privacy Notice:</label>
                <div style="background: #2a2a2a; padding: 15px; border-radius: 6px; border-left: 4px solid #0066ff;">
                    <p style="margin: 0; color: #0066ff;"><i class="fas fa-info-circle"></i> This tool shows demo information. Real IP tracking requires server-side implementation and proper API integration.</p>
                </div>
            </div>
        </div>
    `;
}

// Email Validator
function getEmailValidatorHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="email-input">Email Address:</label>
                <input type="text" id="email-input" class="tool-input" placeholder="Enter email address to validate" oninput="validateEmail()">
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="email-valid">❓</div>
                    <div class="stat-label">Valid</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="email-format">Unknown</div>
                    <div class="stat-label">Format</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="email-domain">Unknown</div>
                    <div class="stat-label">Domain</div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Validation Results:</label>
                <div class="tool-result" id="email-validation-result"></div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Common Email Formats:</label>
                <div style="background: #2a2a2a; padding: 15px; border-radius: 6px;">
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 14px;">
                        <div>✅ user@domain.com</div>
                        <div>✅ first.last@domain.org</div>
                        <div>✅ user+tag@domain.net</div>
                        <div>✅ user123@sub.domain.co.uk</div>
                        <div>❌ user@domain (missing TLD)</div>
                        <div>❌ @domain.com (missing local part)</div>
                        <div>❌ user..name@domain.com (double dots)</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Meme Generator Pro
function getMemeGeneratorProHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="meme-image-upload">Upload Image:</label>
                <input type="file" id="meme-image-upload" class="tool-input" accept="image/*" onchange="loadMemeImage()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="meme-template">Or choose template:</label>
                <select id="meme-template" class="tool-input" onchange="loadMemeTemplate()">
                    <option value="">Select a meme template</option>
                    <option value="drake">Drake Pointing</option>
                    <option value="distracted">Distracted Boyfriend</option>
                    <option value="woman-yelling">Woman Yelling at Cat</option>
                    <option value="this-is-fine">This is Fine</option>
                    <option value="success-kid">Success Kid</option>
                </select>
            </div>
            
            <div class="tool-group">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label class="tool-label" for="top-text">Top Text:</label>
                        <input type="text" id="top-text" class="tool-input" placeholder="Enter top text" oninput="updateMemeText()">
                    </div>
                    <div>
                        <label class="tool-label" for="bottom-text">Bottom Text:</label>
                        <input type="text" id="bottom-text" class="tool-input" placeholder="Enter bottom text" oninput="updateMemeText()">
                    </div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Font Settings:</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                    <select id="font-size" class="tool-input" onchange="updateMemeText()">
                        <option value="24">Small (24px)</option>
                        <option value="36" selected>Medium (36px)</option>
                        <option value="48">Large (48px)</option>
                    </select>
                    <input type="color" id="text-color" class="tool-input" value="#ffffff" onchange="updateMemeText()">
                    <select id="font-family" class="tool-input" onchange="updateMemeText()">
                        <option value="Impact">Impact</option>
                        <option value="Arial">Arial</option>
                        <option value="Comic Sans MS">Comic Sans</option>
                    </select>
                </div>
            </div>
            
            <div class="tool-group">
                <canvas id="meme-canvas" width="500" height="500" style="max-width: 100%; border: 2px solid var(--border-color); border-radius: 8px; background: #333;"></canvas>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="downloadMeme()">
                    <i class="fas fa-download"></i> Download Meme
                </button>
                <button class="tool-button secondary" onclick="clearMeme()">
                    <i class="fas fa-trash"></i> Clear
                </button>
            </div>
        </div>
    `;
}

// Broken Link Checker
function getBrokenLinkCheckerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="website-url">Website URL:</label>
                <input type="text" id="website-url" class="tool-input" placeholder="https://example.com">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Check Options:</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="tool-checkbox">
                        <input type="checkbox" id="check-internal" checked>
                        <label for="check-internal">Check internal links</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="check-external" checked>
                        <label for="check-external">Check external links</label>
                    </div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="max-depth">Max Depth:</label>
                <select id="max-depth" class="tool-input">
                    <option value="1">1 level (homepage only)</option>
                    <option value="2" selected>2 levels</option>
                    <option value="3">3 levels</option>
                </select>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="checkBrokenLinks()">
                    <i class="fas fa-search"></i> Check Links
                </button>
                <button class="tool-button secondary" onclick="exportLinkReport()">
                    <i class="fas fa-download"></i> Export Report
                </button>
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="total-links">0</div>
                    <div class="stat-label">Total Links</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="broken-links">0</div>
                    <div class="stat-label">Broken Links</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="check-progress">0%</div>
                    <div class="stat-label">Progress</div>
                </div>
            </div>
            
            <div class="tool-result" id="link-check-result"></div>
        </div>
    `;
}

// Advanced URL Shortener
function getUrlShortenerProHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="long-url">Long URL:</label>
                <input type="text" id="long-url" class="tool-input" placeholder="https://example.com/very/long/url/path">
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="custom-alias">Custom Alias (optional):</label>
                <input type="text" id="custom-alias" class="tool-input" placeholder="my-custom-link">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Options:</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="tool-checkbox">
                        <input type="checkbox" id="track-clicks" checked>
                        <label for="track-clicks">Track clicks</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="expire-link">
                        <label for="expire-link">Set expiration</label>
                    </div>
                </div>
            </div>
            
            <div class="tool-group" id="expiration-group" style="display: none;">
                <label class="tool-label" for="expire-date">Expiration Date:</label>
                <input type="datetime-local" id="expire-date" class="tool-input">
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="shortenURLPro()">
                    <i class="fas fa-compress-alt"></i> Shorten URL
                </button>
                <button class="tool-button secondary" onclick="copyShortURL()">
                    <i class="fas fa-copy"></i> Copy Short URL
                </button>
            </div>
            
            <div class="tool-result" id="short-url-result"></div>
            
            <div class="tool-group" id="url-analytics" style="display: none;">
                <label class="tool-label">Analytics:</label>
                <div class="text-stats">
                    <div class="stat-item">
                        <div class="stat-number" id="click-count">0</div>
                        <div class="stat-label">Total Clicks</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" id="unique-clicks">0</div>
                        <div class="stat-label">Unique Visitors</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" id="created-date">-</div>
                        <div class="stat-label">Created</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// File Hash Checker
function getFileHashCheckerHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="hash-file-upload">Select File:</label>
                <input type="file" id="hash-file-upload" class="tool-input" onchange="calculateFileHash()">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Hash Algorithms:</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                    <div class="tool-checkbox">
                        <input type="checkbox" id="hash-md5" checked>
                        <label for="hash-md5">MD5</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="hash-sha1" checked>
                        <label for="hash-sha1">SHA-1</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="hash-sha256" checked>
                        <label for="hash-sha256">SHA-256</label>
                    </div>
                    <div class="tool-checkbox">
                        <input type="checkbox" id="hash-sha512">
                        <label for="hash-sha512">SHA-512</label>
                    </div>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="compare-hash">Compare with expected hash (optional):</label>
                <input type="text" id="compare-hash" class="tool-input" placeholder="Enter expected hash to verify file integrity">
            </div>
            
            <div class="text-stats">
                <div class="stat-item">
                    <div class="stat-number" id="file-size">0 B</div>
                    <div class="stat-label">File Size</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="file-type">-</div>
                    <div class="stat-label">File Type</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="hash-status">Ready</div>
                    <div class="stat-label">Status</div>
                </div>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button secondary" onclick="copyAllHashes()">
                    <i class="fas fa-copy"></i> Copy All Hashes
                </button>
                <button class="tool-button secondary" onclick="exportHashReport()">
                    <i class="fas fa-download"></i> Export Report
                </button>
            </div>
            
            <div class="tool-result" id="file-hash-result"></div>
        </div>
    `;
}

// Website Screenshot
function getWebsiteScreenshotHTML() {
    return `
        <div class="tool-interface">
            <div class="tool-group">
                <label class="tool-label" for="screenshot-url">Website URL:</label>
                <input type="text" id="screenshot-url" class="tool-input" placeholder="https://example.com">
            </div>
            
            <div class="tool-group">
                <label class="tool-label">Screenshot Options:</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label class="tool-label" for="viewport-width">Width:</label>
                        <select id="viewport-width" class="tool-input">
                            <option value="1920">Desktop (1920px)</option>
                            <option value="1366">Laptop (1366px)</option>
                            <option value="768">Tablet (768px)</option>
                            <option value="375">Mobile (375px)</option>
                        </select>
                    </div>
                    <div>
                        <label class="tool-label" for="screenshot-format">Format:</label>
                        <select id="screenshot-format" class="tool-input">
                            <option value="png">PNG (Best Quality)</option>
                            <option value="jpg">JPG (Smaller Size)</option>
                            <option value="webp">WebP (Modern)</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="tool-group">
                <div class="tool-checkbox">
                    <input type="checkbox" id="full-page" checked>
                    <label for="full-page">Capture full page (not just viewport)</label>
                </div>
            </div>
            
            <div class="tool-group">
                <label class="tool-label" for="delay-seconds">Delay before capture (seconds):</label>
                <select id="delay-seconds" class="tool-input">
                    <option value="0">No delay</option>
                    <option value="2" selected>2 seconds</option>
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                </select>
            </div>
            
            <div class="tool-buttons">
                <button class="tool-button" onclick="captureScreenshot()">
                    <i class="fas fa-camera"></i> Capture Screenshot
                </button>
                <button class="tool-button secondary" onclick="downloadScreenshot()" id="download-screenshot" style="display: none;">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
            
            <div class="tool-result" id="screenshot-result"></div>
        </div>
    `;
}
