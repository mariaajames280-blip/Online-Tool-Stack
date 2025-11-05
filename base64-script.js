// Base64 Encoder/Decoder Tool
let currentConversion = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Base64 Encoder/Decoder loaded!');
    
    // Add event listeners
    const inputText = document.getElementById('inputText');
    const modeOptions = document.querySelectorAll('input[name="conversionMode"]');
    const autoDetect = document.getElementById('autoDetect');
    
    // Real-time character count
    if (inputText) {
        inputText.addEventListener('input', updateCharCount);
        inputText.addEventListener('input', handleAutoDetect);
    }
    
    // Auto-convert when mode changes
    modeOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (inputText.value.trim() && !autoDetect.checked) {
                convertBase64();
            }
        });
    });
    
    // Auto-detect toggle
    if (autoDetect) {
        autoDetect.addEventListener('change', function() {
            if (this.checked && inputText.value.trim()) {
                handleAutoDetect();
            }
        });
    }
    
    // Initialize character count
    updateCharCount();
});

function updateCharCount() {
    const inputText = document.getElementById('inputText').value;
    const charCount = document.getElementById('charCount');
    const byteCount = document.getElementById('byteCount');
    
    const characters = inputText.length;
    const bytes = new TextEncoder().encode(inputText).length;
    
    charCount.textContent = characters;
    byteCount.textContent = bytes;
}

function handleAutoDetect() {
    if (!document.getElementById('autoDetect').checked) return;
    
    const inputText = document.getElementById('inputText').value.trim();
    if (!inputText) return;
    
    // Auto-detect if input looks like Base64
    const isLikelyBase64 = isBase64(inputText);
    const encodeRadio = document.querySelector('input[value="encode"]');
    const decodeRadio = document.querySelector('input[value="decode"]');
    
    if (isLikelyBase64) {
        decodeRadio.checked = true;
        document.getElementById('conversionStatus').textContent = 'Auto-detected: Base64 input';
        document.getElementById('conversionStatus').className = 'status-success';
    } else {
        encodeRadio.checked = true;
        document.getElementById('conversionStatus').textContent = 'Auto-detected: Text input';
        document.getElementById('conversionStatus').className = 'status-success';
    }
    
    convertBase64();
}

function isBase64(str) {
    if (str.length % 4 !== 0) return false;
    
    try {
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(str)) return false;
        
        // Try to decode
        const decoded = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
        // Try to re-encode to verify
        const reencoded = btoa(decoded);
        return true;
    } catch (e) {
        return false;
    }
}

function convertBase64() {
    const inputText = document.getElementById('inputText').value.trim();
    const outputText = document.getElementById('outputText');
    const conversionStatus = document.getElementById('conversionStatus');
    const selectedMode = document.querySelector('input[name="conversionMode"]:checked').value;
    const urlSafe = document.getElementById('urlSafe').checked;
    const validateBase64 = document.getElementById('validateBase64').checked;
    
    if (!inputText) {
        alert('❌ Please enter some text to convert!');
        return;
    }
    
    let result = '';
    let status = '';
    let statusClass = '';
    
    try {
        if (selectedMode === 'encode') {
            result = encodeBase64(inputText, urlSafe);
            status = 'Text encoded to Base64 successfully';
            statusClass = 'status-success';
        } else {
            if (validateBase64 && !isBase64(inputText)) {
                throw new Error('Invalid Base64 string');
            }
            result = decodeBase64(inputText, urlSafe);
            status = 'Base64 decoded to text successfully';
            statusClass = 'status-success';
        }
        
        // Store current conversion
        currentConversion = {
            input: inputText,
            output: result,
            mode: selectedMode,
            urlSafe: urlSafe,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        result = `Error: ${error.message}`;
        status = 'Conversion failed';
        statusClass = 'status-error';
        currentConversion = null;
    }
    
    // Update output
    outputText.value = result;
    conversionStatus.textContent = status;
    conversionStatus.className = statusClass;
    
    console.log(`Base64 ${selectedMode} completed`);
}

function encodeBase64(text, urlSafe = false) {
    const encoded = btoa(unescape(encodeURIComponent(text)));
    if (urlSafe) {
        return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return encoded;
}

function decodeBase64(base64String, urlSafe = false) {
    let processed = base64String;
    if (urlSafe) {
        processed = processed.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if necessary
        while (processed.length % 4 !== 0) {
            processed += '=';
        }
    }
    return decodeURIComponent(escape(atob(processed)));
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    const copyStatus = document.getElementById('copyStatus');
    
    if (!outputText.value || outputText.value.startsWith('Error:')) {
        alert('❌ No valid text to copy! Please convert some text first.');
        return;
    }
    
    navigator.clipboard.writeText(outputText.value).then(() => {
        copyStatus.textContent = '✓ Copied!';
        copyStatus.style.color = 'var(--green)';
        
        setTimeout(() => {
            copyStatus.textContent = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        copyStatus.textContent = '❌ Copy failed';
        copyStatus.style.color = 'var(--red)';
    });
}

function downloadResult() {
    if (!currentConversion) {
        alert('❌ No conversion result to download! Please convert some text first.');
        return;
    }
    
    const outputText = document.getElementById('outputText').value;
    const mode = currentConversion.mode;
    
    if (!outputText || outputText.startsWith('Error:')) {
        alert('❌ No valid text to download!');
        return;
    }
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().split('T')[0];
    const fileType = mode === 'encode' ? 'base64' : 'txt';
    
    a.href = url;
    a.download = `base64-${mode}-${timestamp}.${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log(`Result downloaded as ${mode}`);
}

function resetForm() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('conversionStatus').textContent = 'Ready for conversion';
    document.getElementById('conversionStatus').className = '';
    document.getElementById('copyStatus').textContent = '';
    
    // Reset to default mode
    document.querySelector('input[value="encode"]').checked = true;
    
    // Reset options
    document.getElementById('urlSafe').checked = true;
    document.getElementById('autoDetect').checked = false;
    document.getElementById('validateBase64').checked = false;
    
    // Reset character count
    updateCharCount();
    
    currentConversion = null;
    
    console.log('Form reset successfully');
}

// Quick Actions
function encodeSample() {
    const inputText = document.getElementById('inputText');
    inputText.value = 'Hello Base64 World!';
    document.querySelector('input[value="encode"]').checked = true;
    updateCharCount();
    convertBase64();
}

function decodeSample() {
    const inputText = document.getElementById('inputText');
    inputText.value = 'SGVsbG8gQmFzZTY0IFdvcmxkIQ==';
    document.querySelector('input[value="decode"]').checked = true;
    updateCharCount();
    convertBase64();
}

function clearInput() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    updateCharCount();
    document.getElementById('conversionStatus').textContent = 'Input cleared';
    document.getElementById('conversionStatus').className = 'status-warning';
}

function swapText() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    
    if (!outputText.value || outputText.value.startsWith('Error:')) {
        alert('❌ No valid output to swap!');
        return;
    }
    
    const temp = inputText.value;
    inputText.value = outputText.value;
    outputText.value = temp;
    
    // Auto-detect new mode
    handleAutoDetect();
    updateCharCount();
    
    document.getElementById('conversionStatus').textContent = 'Text swapped successfully';
    document.getElementById('conversionStatus').className = 'status-success';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        convertBase64();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadResult();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetForm();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        swapText();
    }
});
