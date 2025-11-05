// Base64 Encoder/Decoder Tool
let currentConversion = null;

function updateMode() {
    const inputText = document.getElementById('inputText');
    const mode = document.querySelector('input[name="mode"]:checked').value;
    
    if (mode === 'encode') {
        inputText.placeholder = 'Enter text to encode to Base64...';
    } else {
        inputText.placeholder = 'Enter Base64 string to decode...';
    }
    
    updateCharCount();
}

function updateCharCount() {
    const inputText = document.getElementById('inputText').value;
    const charCount = document.getElementById('charCount');
    const byteCount = document.getElementById('byteCount');
    
    const characters = inputText.length;
    const bytes = new TextEncoder().encode(inputText).length;
    
    charCount.textContent = `${characters} characters`;
    byteCount.textContent = `${bytes} bytes`;
}

function convert() {
    const inputText = document.getElementById('inputText').value.trim();
    const outputText = document.getElementById('outputText');
    const status = document.getElementById('status');
    const mode = document.querySelector('input[name="mode"]:checked').value;
    
    if (!inputText) {
        alert('❌ Please enter some text to convert!');
        return;
    }
    
    try {
        let result = '';
        
        if (mode === 'encode') {
            result = btoa(unescape(encodeURIComponent(inputText)));
            status.textContent = '✅ Text encoded to Base64 successfully';
            status.style.color = '#4CAF50';
        } else {
            result = decodeURIComponent(escape(atob(inputText)));
            status.textContent = '✅ Base64 decoded to text successfully';
            status.style.color = '#4CAF50';
        }
        
        outputText.value = result;
        currentConversion = { input: inputText, output: result, mode: mode };
        
    } catch (error) {
        outputText.value = `Error: ${error.message}`;
        status.textContent = '❌ Conversion failed';
        status.style.color = '#f44336';
        currentConversion = null;
    }
}

function copyResult() {
    const outputText = document.getElementById('outputText');
    const copyStatus = document.getElementById('copyStatus');
    
    if (!outputText.value || outputText.value.startsWith('Error:')) {
        alert('❌ No valid text to copy!');
        return;
    }
    
    navigator.clipboard.writeText(outputText.value).then(() => {
        copyStatus.textContent = '✓ Copied!';
        setTimeout(() => {
            copyStatus.textContent = '';
        }, 2000);
    }).catch(err => {
        copyStatus.textContent = '❌ Copy failed';
        copyStatus.style.color = '#f44336';
    });
}

function downloadResult() {
    if (!currentConversion) {
        alert('❌ No conversion result to download!');
        return;
    }
    
    const outputText = document.getElementById('outputText').value;
    const mode = currentConversion.mode;
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `base64-${mode}-${timestamp}.txt`;
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function resetAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('status').textContent = 'Ready for conversion';
    document.getElementById('status').style.color = '#666';
    document.getElementById('copyStatus').textContent = '';
    document.querySelector('input[value="encode"]').checked = true;
    updateMode();
    currentConversion = null;
}

function loadEncodeSample() {
    document.getElementById('inputText').value = 'Hello Base64 World!';
    document.querySelector('input[value="encode"]').checked = true;
    updateMode();
    convert();
}

function loadDecodeSample() {
    document.getElementById('inputText').value = 'SGVsbG8gQmFzZTY0IFdvcmxkIQ==';
    document.querySelector('input[value="decode"]').checked = true;
    updateMode();
    convert();
}

function clearInput() {
    document.getElementById('inputText').value = '';
    updateCharCount();
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
    
    // Toggle mode
    const currentMode = document.querySelector('input[name="mode"]:checked').value;
    const newMode = currentMode === 'encode' ? 'decode' : 'encode';
    document.querySelector(`input[value="${newMode}"]`).checked = true;
    
    updateMode();
    updateCharCount();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    inputText.addEventListener('input', updateCharCount);
    updateMode();
});
