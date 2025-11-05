// Text Case Converter - Text Transformation Tool
let currentConversion = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Text Case Converter loaded!');
    
    // Add event listeners
    const inputText = document.getElementById('inputText');
    const caseOptions = document.querySelectorAll('input[name="caseType"]');
    
    // Real-time character count
    if (inputText) {
        inputText.addEventListener('input', updateCharCount);
    }
    
    // Auto-convert when case type changes
    caseOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (inputText.value.trim()) {
                convertText();
            }
        });
    });
    
    // Initialize character count
    updateCharCount();
});

function updateCharCount() {
    const inputText = document.getElementById('inputText').value;
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    
    const characters = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const lines = inputText ? inputText.split('\n').length : 0;
    
    charCount.textContent = characters;
    wordCount.textContent = words;
    lineCount.textContent = lines;
}

function convertText() {
    const inputText = document.getElementById('inputText').value.trim();
    const outputText = document.getElementById('outputText');
    const outputCaseType = document.getElementById('outputCaseType');
    const selectedCase = document.querySelector('input[name="caseType"]:checked').value;
    
    if (!inputText) {
        alert('❌ Please enter some text to convert!');
        return;
    }
    
    let convertedText = '';
    let caseName = '';
    
    // Convert based on selected case type
    switch (selectedCase) {
        case 'sentence':
            convertedText = toSentenceCase(inputText);
            caseName = 'Sentence Case';
            break;
        case 'lower':
            convertedText = inputText.toLowerCase();
            caseName = 'Lower Case';
            break;
        case 'upper':
            convertedText = inputText.toUpperCase();
            caseName = 'Upper Case';
            break;
        case 'title':
            convertedText = toTitleCase(inputText);
            caseName = 'Title Case';
            break;
        case 'camel':
            convertedText = toCamelCase(inputText);
            caseName = 'camelCase';
            break;
        case 'pascal':
            convertedText = toPascalCase(inputText);
            caseName = 'PascalCase';
            break;
        case 'snake':
            convertedText = toSnakeCase(inputText);
            caseName = 'snake_case';
            break;
        case 'kebab':
            convertedText = toKebabCase(inputText);
            caseName = 'kebab-case';
            break;
        default:
            convertedText = inputText;
            caseName = 'Original';
    }
    
    // Update output
    outputText.value = convertedText;
    outputCaseType.textContent = `Converted to ${caseName}`;
    
    // Store current conversion
    currentConversion = {
        original: inputText,
        converted: convertedText,
        caseType: caseName,
        timestamp: new Date().toISOString()
    };
    
    console.log(`Text converted to ${caseName}`);
}

// Case conversion functions
function toSentenceCase(text) {
    return text.toLowerCase()
        .split('. ')
        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. ');
}

function toTitleCase(text) {
    const smallWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of', 'up', 'with'];
    
    return text.toLowerCase()
        .split(' ')
        .map((word, index) => {
            if (index === 0 || !smallWords.includes(word)) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join(' ');
}

function toCamelCase(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(' ')
        .map((word, index) => {
            if (index === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('')
        .replace(/\s+/g, '');
}

function toPascalCase(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
        .replace(/\s+/g, '');
}

function toSnakeCase(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(' ')
        .filter(word => word.length > 0)
        .join('_');
}

function toKebabCase(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(' ')
        .filter(word => word.length > 0)
        .join('-');
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    const copyStatus = document.getElementById('copyStatus');
    
    if (!outputText.value) {
        alert('❌ No text to copy! Please convert some text first.');
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

function downloadText() {
    if (!currentConversion) {
        alert('❌ No converted text to download! Please convert some text first.');
        return;
    }
    
    const outputText = document.getElementById('outputText').value;
    const caseType = currentConversion.caseType;
    
    if (!outputText) {
        alert('❌ No text to download!');
        return;
    }
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().split('T')[0];
    
    a.href = url;
    a.download = `text-case-${caseType.toLowerCase()}-${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log(`Text downloaded as ${caseType}`);
}

function resetForm() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('outputCaseType').textContent = 'No conversion yet';
    document.getElementById('copyStatus').textContent = '';
    
    // Reset to default case type
    document.querySelector('input[value="sentence"]').checked = true;
    
    // Reset character count
    updateCharCount();
    
    currentConversion = null;
    
    console.log('Form reset successfully');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        convertText();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadText();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        resetForm();
    }
});
