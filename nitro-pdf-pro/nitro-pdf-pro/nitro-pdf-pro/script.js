// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Global Variables
let uploadedFiles = [];
let mergeFiles = [];
let currentPDF = null;

// Initialize App
function initializeApp() {
    setupEventListeners();
    initializeSignatureCanvas();
    setupDragAndDrop();
}

// Setup Event Listeners
function setupEventListeners() {
    // Sidebar Navigation
    const sidebarButtons = document.querySelectorAll('.sidebar-btn');
    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tool = this.getAttribute('data-tool');
            switchTool(tool);
            
            // Update active state
            sidebarButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Upload Tool
    document.getElementById('selectFileBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    
    // Merge Tool
    document.getElementById('mergeUploadZone').addEventListener('click', () => {
        document.getElementById('mergeFileInput').click();
    });
    
    document.getElementById('mergeFileInput').addEventListener('change', handleMergeFileSelect);
    document.getElementById('mergeBtn').addEventListener('click', handleMerge);
    
    // Split Tool
    document.getElementById('splitBtn').addEventListener('click', handleSplit);
    
    // Compress Tool
    document.getElementById('compressBtn').addEventListener('click', handleCompress);
    
    // Convert Tool
    document.getElementById('convertBtn').addEventListener('click', handleConvert);
    
    // Rotate Tool
    document.getElementById('rotateLeftBtn').addEventListener('click', () => rotatePage(-90));
    document.getElementById('rotateRightBtn').addEventListener('click', () => rotatePage(90));
    document.getElementById('rotate180Btn').addEventListener('click', () => rotatePage(180));
    document.getElementById('applyRotateBtn').addEventListener('click', handleApplyRotate);
    
    // Watermark Tool
    const watermarkToggle = document.querySelectorAll('[data-type]');
    watermarkToggle.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            switchWatermarkType(type);
            watermarkToggle.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    document.getElementById('selectImageBtn').addEventListener('click', () => {
        document.getElementById('watermarkImageInput').click();
    });
    
    document.getElementById('addWatermarkBtn').addEventListener('click', handleAddWatermark);
    
    // Signature Tool
    const signatureTabs = document.querySelectorAll('.tab-btn');
    signatureTabs.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchSignatureTab(tab);
            signatureTabs.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    document.getElementById('clearCanvas').addEventListener('click', clearSignatureCanvas);
    document.getElementById('uploadSignatureBtn').addEventListener('click', () => {
        document.getElementById('signatureFileInput').click();
    });
    document.getElementById('addSignatureBtn').addEventListener('click', handleAddSignature);
    
    // Protect Tool
    document.getElementById('protectBtn').addEventListener('click', handleProtect);
    
    // Extract Tool
    document.getElementById('extractBtn').addEventListener('click', handleExtract);
    
    // Range Input Updates
    setupRangeInputs();
    
    // Preview Panel
    document.getElementById('closePreview').addEventListener('click', () => {
        document.getElementById('previewPanel').style.display = 'none';
    });
    
    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// Setup Drag and Drop
function setupDragAndDrop() {
    const uploadZone = document.getElementById('uploadZone');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.remove('dragover');
        }, false);
    });
    
    uploadZone.addEventListener('drop', handleDrop, false);
}

// Handle File Drop
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

// Handle File Select
function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

// Handle Files
function handleFiles(files) {
    showLoading();
    
    Array.from(files).forEach(file => {
        if (file.type === 'application/pdf') {
            uploadedFiles.push(file);
            displayFile(file);
        } else {
            showToast('Only PDF files are supported', 'error');
        }
    });
    
    setTimeout(() => {
        hideLoading();
        if (uploadedFiles.length > 0) {
            currentPDF = uploadedFiles[0];
            showToast(`${files.length} file(s) uploaded successfully`, 'success');
        }
    }, 1000);
}

// Display File
function displayFile(file) {
    const fileList = document.getElementById('fileList');
    
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-info">
            <i class="fas fa-file-pdf"></i>
            <div class="file-details">
                <h4>${file.name}</h4>
                <p>${formatFileSize(file.size)} • PDF Document</p>
            </div>
        </div>
        <div class="file-actions">
            <button class="btn-icon" onclick="previewFile('${file.name}')">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon" onclick="removeFile('${file.name}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    fileList.appendChild(fileItem);
}

// Handle Merge File Select
function handleMergeFileSelect(e) {
    const files = e.target.files;
    
    Array.from(files).forEach(file => {
        if (file.type === 'application/pdf') {
            mergeFiles.push(file);
            displayMergeFile(file);
        }
    });
    
    if (mergeFiles.length > 1) {
        document.getElementById('mergeActions').style.display = 'block';
    }
}

// Display Merge File
function displayMergeFile(file) {
    const mergeList = document.getElementById('mergeList');
    
    const mergeItem = document.createElement('div');
    mergeItem.className = 'merge-item';
    mergeItem.draggable = true;
    mergeItem.innerHTML = `
        <div class="merge-item-drag">
            <i class="fas fa-grip-vertical"></i>
            <i class="fas fa-file-pdf"></i>
            <div>
                <h4>${file.name}</h4>
                <p>${formatFileSize(file.size)}</p>
            </div>
        </div>
        <button class="btn-icon" onclick="removeMergeFile('${file.name}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    mergeList.appendChild(mergeItem);
}

// Handle Tool Actions
function handleMerge() {
    if (mergeFiles.length < 2) {
        showToast('Please add at least 2 PDF files to merge', 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast(`Successfully merged ${mergeFiles.length} PDF files`, 'success');
        showResultPreview('merged_document.pdf', 'Merged PDF');
    }, 2000);
}

function handleSplit() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const splitRange = document.getElementById('splitRange').value;
    
    if (!splitRange) {
        showToast('Please specify page range to split', 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('PDF split successfully', 'success');
        showResultPreview('split_pages.pdf', 'Split PDF');
    }, 1500);
}

function handleCompress() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const compression = document.querySelector('input[name="compression"]:checked').value;
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const reduction = compression === 'high' ? 70 : compression === 'medium' ? 50 : 30;
        showToast(`PDF compressed successfully (${reduction}% reduction)`, 'success');
        showResultPreview('compressed_document.pdf', 'Compressed PDF');
    }, 2000);
}

function handleConvert() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const format = document.getElementById('convertFormat').value;
    const formatNames = {
        'word': 'Word Document',
        'excel': 'Excel Spreadsheet',
        'powerpoint': 'PowerPoint',
        'image': 'Images',
        'html': 'HTML',
        'text': 'Text File'
    };
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast(`PDF converted to ${formatNames[format]} successfully`, 'success');
        showResultPreview(`converted_file.${format}`, `Converted ${formatNames[format]}`);
    }, 2500);
}

function rotatePage(degrees) {
    const previewPage = document.querySelector('.preview-page');
    const currentRotation = parseInt(previewPage.getAttribute('data-rotation') || 0);
    const newRotation = (currentRotation + degrees) % 360;
    
    previewPage.style.transform = `rotate(${newRotation}deg)`;
    previewPage.setAttribute('data-rotation', newRotation);
    
    showToast(`Rotated ${degrees > 0 ? 'clockwise' : 'counterclockwise'} ${Math.abs(degrees)}°`, 'success');
}

function handleApplyRotate() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const pages = document.getElementById('rotatePages').value || 'all';
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast(`Rotation applied to pages: ${pages}`, 'success');
        showResultPreview('rotated_document.pdf', 'Rotated PDF');
    }, 1500);
}

function handleAddWatermark() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const watermarkText = document.getElementById('watermarkText').value;
    
    if (!watermarkText && document.getElementById('textWatermark').style.display !== 'none') {
        showToast('Please enter watermark text', 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('Watermark added successfully', 'success');
        showResultPreview('watermarked_document.pdf', 'Watermarked PDF');
    }, 1500);
}

function handleAddSignature() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('Signature added successfully', 'success');
        showResultPreview('signed_document.pdf', 'Signed PDF');
    }, 1500);
}

function handleProtect() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const openPassword = document.getElementById('openPassword').value;
    const permissionsPassword = document.getElementById('permissionsPassword').value;
    
    if (!openPassword && !permissionsPassword) {
        showToast('Please set at least one password', 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('PDF protected successfully', 'success');
        showResultPreview('protected_document.pdf', 'Protected PDF');
    }, 1500);
}

function handleExtract() {
    if (!currentPDF) {
        showToast('Please upload a PDF file first', 'warning');
        return;
    }
    
    const extractPages = document.getElementById('extractPages').value;
    
    if (!extractPages) {
        showToast('Please specify pages to extract', 'warning');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showToast('Pages extracted successfully', 'success');
        showResultPreview('extracted_pages.pdf', 'Extracted Pages');
    }, 1500);
}

// Switch Tool
function switchTool(tool) {
    const panels = document.querySelectorAll('.tool-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${tool}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

// Switch Watermark Type
function switchWatermarkType(type) {
    const textWatermark = document.getElementById('textWatermark');
    const imageWatermark = document.getElementById('imageWatermark');
    
    if (type === 'text') {
        textWatermark.style.display = 'block';
        imageWatermark.style.display = 'none';
    } else {
        textWatermark.style.display = 'none';
        imageWatermark.style.display = 'block';
    }
}

// Switch Signature Tab
function switchSignatureTab(tab) {
    const panels = document.querySelectorAll('.signature-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${tab}Signature`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

// Initialize Signature Canvas
function initializeSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        ctx.strokeStyle = '#00d5ff';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
}

// Clear Signature Canvas
function clearSignatureCanvas() {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showToast('Canvas cleared', 'success');
}

// Setup Range Inputs
function setupRangeInputs() {
    const fontSize = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    
    fontSize.addEventListener('input', (e) => {
        fontSizeValue.textContent = e.target.value;
    });
    
    const opacity = document.getElementById('opacity');
    const opacityValue = document.getElementById('opacityValue');
    
    opacity.addEventListener('input', (e) => {
        opacityValue.textContent = e.target.value;
    });
    
    const rotation = document.getElementById('rotation');
    const rotationValue = document.getElementById('rotationValue');
    
    rotation.addEventListener('input', (e) => {
        rotationValue.textContent = e.target.value;
    });
}

// Show Result Preview
function showResultPreview(filename, description) {
    const previewContent = document.getElementById('previewContent');
    const downloadBtn = document.getElementById('downloadBtn');
    
    previewContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">${description}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">File: ${filename}</p>
            <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: 8px;">
                <p style="color: var(--text-secondary); font-size: 0.875rem;">Preview not available in demo mode</p>
            </div>
        </div>
    `;
    
    downloadBtn.disabled = false;
    downloadBtn.onclick = () => {
        showToast(`Downloading ${filename}...`, 'success');
    };
}

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

function toggleTheme() {
    // This is a placeholder for theme toggle functionality
    showToast('Theme toggle feature coming soon', 'warning');
}

function previewFile(filename) {
    showToast(`Preview for ${filename}`, 'success');
}

function removeFile(filename) {
    uploadedFiles = uploadedFiles.filter(file => file.name !== filename);
    showToast(`${filename} removed`, 'success');
    
    // Remove from UI
    const fileList = document.getElementById('fileList');
    Array.from(fileList.children).forEach(item => {
        if (item.textContent.includes(filename)) {
            item.remove();
        }
    });
}

function removeMergeFile(filename) {
    mergeFiles = mergeFiles.filter(file => file.name !== filename);
    
    // Remove from UI
    const mergeList = document.getElementById('mergeList');
    Array.from(mergeList.children).forEach(item => {
        if (item.textContent.includes(filename)) {
            item.remove();
        }
    });
    
    if (mergeFiles.length < 2) {
        document.getElementById('mergeActions').style.display = 'none';
    }
}
