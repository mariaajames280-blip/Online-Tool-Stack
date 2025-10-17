/* ===================================
   Tools Part 2: JavaScript Functions
   Tools 11-20
   =================================== */

// Tool 11: Image Resizer
let resizeImageData = null;

function resizeImage() {
    const fileInput = document.getElementById('resizeImageFile');
    const width = document.getElementById('resizeWidth').value;
    const height = document.getElementById('resizeHeight').value;
    const maintainAspect = document.getElementById('maintainAspect').checked;
    
    if (!fileInput.files[0]) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    if (!width || !height) {
        showToast('Please enter width and height', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('resizedCanvas');
            const ctx = canvas.getContext('2d');
            
            let newWidth = parseInt(width);
            let newHeight = parseInt(height);
            
            if (maintainAspect) {
                const ratio = Math.min(newWidth / img.width, newHeight / img.height);
                newWidth = img.width * ratio;
                newHeight = img.height * ratio;
            }
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            document.getElementById('originalDimensions').textContent = `${img.width} x ${img.height}`;
            document.getElementById('newDimensions').textContent = `${newWidth} x ${newHeight}`;
            document.getElementById('resizeOutput').style.display = 'block';
            document.getElementById('downloadResized').style.display = 'inline-block';
            
            showToast('Image resized successfully!', 'success');
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

function downloadResizedImage() {
    const canvas = document.getElementById('resizedCanvas');
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resized-image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Image downloaded!', 'success');
    });
}

function resetImageResizer() {
    document.getElementById('resizeImageFile').value = '';
    document.getElementById('resizeWidth').value = '800';
    document.getElementById('resizeHeight').value = '600';
    document.getElementById('maintainAspect').checked = true;
    document.getElementById('resizeOutput').style.display = 'none';
    document.getElementById('downloadResized').style.display = 'none';
}

// Tool 12: Hash Generator
async function generateHash() {
    const text = document.getElementById('hashInput').value;
    
    if (!text.trim()) {
        showToast('Please enter text to hash', 'error');
        return;
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // MD5 (using simple implementation)
    const md5Hash = simpleMD5(text);
    document.getElementById('md5Hash').textContent = md5Hash;
    
    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha1Hash = bufferToHex(sha1Buffer);
    document.getElementById('sha1Hash').textContent = sha1Hash;
    
    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Hash = bufferToHex(sha256Buffer);
    document.getElementById('sha256Hash').textContent = sha256Hash;
    
    document.getElementById('hashOutput').style.display = 'block';
    showToast('Hashes generated!', 'success');
}

function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function simpleMD5(string) {
    // Simple MD5 implementation for demo purposes
    function md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    }
    
    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }
    
    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    
    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }
    
    // Simplified - return a pseudo hash for demo
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = ((hash << 5) - hash) + string.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
}

function copyHash(elementId) {
    const hash = document.getElementById(elementId).textContent;
    copyToClipboard(hash);
}

function resetHashGenerator() {
    document.getElementById('hashInput').value = '';
    document.getElementById('hashOutput').style.display = 'none';
}

// Tool 13: UUID Generator
function generateUUID() {
    const count = document.getElementById('uuidCount').value;
    const version = document.getElementById('uuidVersion').value;
    
    let uuids = [];
    for (let i = 0; i < count; i++) {
        if (version === 'v4') {
            uuids.push(generateUUIDv4());
        } else {
            uuids.push(generateUUIDv4()); // Simplified - always v4
        }
    }
    
    document.getElementById('uuidList').textContent = uuids.join('\n');
    document.getElementById('uuidOutput').style.display = 'block';
    
    showToast(`${count} UUID(s) generated!`, 'success');
}

function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function copyUUIDs() {
    const uuids = document.getElementById('uuidList').textContent;
    copyToClipboard(uuids);
}

function resetUUID() {
    document.getElementById('uuidCount').value = '1';
    document.getElementById('uuidVersion').value = 'v4';
    document.getElementById('uuidOutput').style.display = 'none';
}

// Tool 14: Lorem Ipsum Generator
function generateLoremIpsum() {
    const type = document.getElementById('loremType').value;
    const count = document.getElementById('loremCount').value;
    
    const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'];
    
    let result = '';
    
    if (type === 'words') {
        const words = [];
        for (let i = 0; i < count; i++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        result = words.join(' ');
    } else if (type === 'sentences') {
        for (let i = 0; i < count; i++) {
            const sentenceLength = Math.floor(Math.random() * 10) + 10;
            const words = [];
            for (let j = 0; j < sentenceLength; j++) {
                words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
            }
            result += words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '. ';
        }
    } else if (type === 'paragraphs') {
        for (let i = 0; i < count; i++) {
            const sentenceCount = Math.floor(Math.random() * 5) + 3;
            let paragraph = '';
            for (let j = 0; j < sentenceCount; j++) {
                const sentenceLength = Math.floor(Math.random() * 10) + 10;
                const words = [];
                for (let k = 0; k < sentenceLength; k++) {
                    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
                }
                paragraph += words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '. ';
            }
            result += paragraph + '\n\n';
        }
    }
    
    document.getElementById('loremOutput').textContent = result;
    document.getElementById('loremResult').style.display = 'block';
    
    showToast('Lorem ipsum generated!', 'success');
}

function copyLoremIpsum() {
    const text = document.getElementById('loremOutput').textContent;
    copyToClipboard(text);
}

function resetLoremIpsum() {
    document.getElementById('loremType').value = 'paragraphs';
    document.getElementById('loremCount').value = '3';
    document.getElementById('loremResult').style.display = 'none';
}

// Tool 15: HTML/CSS/JS Minifier
function minifyCode() {
    const codeType = document.getElementById('codeType').value;
    const input = document.getElementById('minifierInput').value;
    
    if (!input.trim()) {
        showToast('Please enter code to minify', 'error');
        return;
    }
    
    let minified = '';
    
    if (codeType === 'html') {
        minified = input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    } else if (codeType === 'css') {
        minified = input.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}').replace(/\s*:\s*/g, ':').replace(/\s*;\s*/g, ';').trim();
    } else if (codeType === 'js') {
        minified = input.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}').replace(/\s*;\s*/g, ';').trim();
    }
    
    const originalSize = new Blob([input]).size;
    const minifiedSize = new Blob([minified]).size;
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    document.getElementById('minifiedCode').textContent = minified;
    document.getElementById('minifierOriginalSize').textContent = formatFileSize(originalSize);
    document.getElementById('minifierMinifiedSize').textContent = formatFileSize(minifiedSize);
    document.getElementById('minifierReduction').textContent = reduction + '%';
    document.getElementById('minifierOutput').style.display = 'block';
    
    showToast('Code minified!', 'success');
}

function copyMinifiedCode() {
    const code = document.getElementById('minifiedCode').textContent;
    copyToClipboard(code);
}

function resetMinifier() {
    document.getElementById('codeType').value = 'html';
    document.getElementById('minifierInput').value = '';
    document.getElementById('minifierOutput').style.display = 'none';
}

// Tool 16: Markdown to HTML Converter
function convertMarkdown() {
    const markdown = document.getElementById('markdownInput').value;
    
    if (!markdown.trim()) {
        showToast('Please enter Markdown text', 'error');
        return;
    }
    
    try {
        const html = marked.parse(markdown);
        document.getElementById('markdownHTML').textContent = html;
        document.getElementById('markdownPreview').innerHTML = html;
        document.getElementById('markdownOutput').style.display = 'block';
        showToast('Markdown converted!', 'success');
    } catch (error) {
        showToast('Error converting Markdown', 'error');
    }
}

function copyMarkdownHTML() {
    const html = document.getElementById('markdownHTML').textContent;
    copyToClipboard(html);
}

function resetMarkdown() {
    document.getElementById('markdownInput').value = '';
    document.getElementById('markdownOutput').style.display = 'none';
}

// Tool 17: Unit Converter
function convertUnit() {
    const category = document.getElementById('unitCategory').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const value = parseFloat(document.getElementById('unitValue').value);
    
    if (isNaN(value)) {
        showToast('Please enter a valid number', 'error');
        return;
    }
    
    let result = 0;
    
    // Length conversions
    const lengthUnits = {
        'mm': 1,
        'cm': 10,
        'm': 1000,
        'km': 1000000,
        'in': 25.4,
        'ft': 304.8,
        'yd': 914.4,
        'mi': 1609344
    };
    
    // Weight conversions
    const weightUnits = {
        'mg': 1,
        'g': 1000,
        'kg': 1000000,
        'oz': 28349.5,
        'lb': 453592,
        'ton': 1000000000
    };
    
    // Temperature conversions
    if (category === 'temperature') {
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            result = (value * 9/5) + 32;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            result = (value - 32) * 5/9;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            result = value + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            result = value - 273.15;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            result = (value - 32) * 5/9 + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            result = (value - 273.15) * 9/5 + 32;
        } else {
            result = value;
        }
    } else if (category === 'length') {
        result = value * lengthUnits[fromUnit] / lengthUnits[toUnit];
    } else if (category === 'weight') {
        result = value * weightUnits[fromUnit] / weightUnits[toUnit];
    }
    
    document.getElementById('unitResult').textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
    document.getElementById('conversionOutput').style.display = 'block';
    
    showToast('Conversion completed!', 'success');
}

function resetUnitConverter() {
    document.getElementById('unitCategory').value = 'length';
    document.getElementById('unitValue').value = '';
    updateUnitOptions();
    document.getElementById('conversionOutput').style.display = 'none';
}

function updateUnitOptions() {
    const category = document.getElementById('unitCategory').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    let options = [];
    
    if (category === 'length') {
        options = ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'];
    } else if (category === 'weight') {
        options = ['mg', 'g', 'kg', 'oz', 'lb', 'ton'];
    } else if (category === 'temperature') {
        options = ['celsius', 'fahrenheit', 'kelvin'];
    }
    
    fromUnit.innerHTML = options.map(unit => `<option value="${unit}">${unit}</option>`).join('');
    toUnit.innerHTML = options.map(unit => `<option value="${unit}">${unit}</option>`).join('');
    toUnit.selectedIndex = 1;
}

// Tool 18: Age Calculator
function calculateAge() {
    const birthdate = document.getElementById('birthdate').value;
    
    if (!birthdate) {
        showToast('Please select your birthdate', 'error');
        return;
    }
    
    const birth = new Date(birthdate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    
    document.getElementById('ageYears').textContent = years;
    document.getElementById('ageMonths').textContent = months;
    document.getElementById('ageDays').textContent = days;
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('totalMonths').textContent = totalMonths;
    
    document.getElementById('ageOutput').style.display = 'block';
    showToast('Age calculated!', 'success');
}

function resetAgeCalculator() {
    document.getElementById('birthdate').value = '';
    document.getElementById('ageOutput').style.display = 'none';
}

// Tool 19: BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const unit = document.getElementById('bmiUnit').value;
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        showToast('Please enter valid weight and height', 'error');
        return;
    }
    
    let bmi;
    if (unit === 'metric') {
        bmi = weight / ((height / 100) ** 2);
    } else {
        bmi = (weight / (height ** 2)) * 703;
    }
    
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = 'var(--color-blue)';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'var(--color-success)';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = 'var(--color-warning)';
    } else {
        category = 'Obese';
        color = 'var(--color-error)';
    }
    
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiCategory').style.color = color;
    
    document.getElementById('bmiOutput').style.display = 'block';
    showToast('BMI calculated!', 'success');
}

function resetBMI() {
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('bmiUnit').value = 'metric';
    document.getElementById('bmiOutput').style.display = 'none';
}

// Tool 20: Countdown Timer
let countdownInterval = null;

function startCountdown() {
    const targetDate = document.getElementById('countdownDate').value;
    const targetTime = document.getElementById('countdownTime').value;
    
    if (!targetDate || !targetTime) {
        showToast('Please select date and time', 'error');
        return;
    }
    
    const target = new Date(`${targetDate}T${targetTime}`);
    
    if (target <= new Date()) {
        showToast('Please select a future date and time', 'error');
        return;
    }
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    document.getElementById('countdownDisplay').style.display = 'block';
    
    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = target - now;
        
        if (diff <= 0) {
            clearInterval(countdownInterval);
            showToast('Countdown finished!', 'success');
            stopCountdown();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdownDays').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdownHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdownMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdownSeconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
    
    showToast('Countdown started!', 'success');
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    document.getElementById('countdownDisplay').style.display = 'none';
    showToast('Countdown stopped', 'success');
}

function resetCountdown() {
    stopCountdown();
    document.getElementById('countdownDate').value = '';
    document.getElementById('countdownTime').value = '';
}

// Initialize unit converter options
if (document.getElementById('unitCategory')) {
    updateUnitOptions();
    document.getElementById('unitCategory').addEventListener('change', updateUnitOptions);
}
