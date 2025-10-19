/* ===================================
   Extra PDF Tools (34-40) - Continuation
   =================================== */

// Tool 34: PDF Page Numbers
function addPageNumbersToPDF() {
    const file = document.getElementById('pdfPageNumberFile').files[0];
    const position = document.getElementById('pageNumberPosition').value;
    const format = document.getElementById('pageNumberFormat').value;
    
    if (!file) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    document.getElementById('pdfPageNumberName').textContent = file.name;
    document.getElementById('pageNumberPos').textContent = position;
    document.getElementById('pageNumberFmt').textContent = format;
    document.getElementById('pdfPageNumberOutput').style.display = 'block';
    
    showToast('PDF loaded. Adding page numbers requires server-side processing.', 'warning');
}

function resetPDFPageNumbers() {
    document.getElementById('pdfPageNumberFile').value = '';
    document.getElementById('pdfPageNumberOutput').style.display = 'none';
}

// Tool 35: PDF Crop
function cropPDF() {
    const file = document.getElementById('pdfCropFile').files[0];
    const margin = document.getElementById('cropMargin').value;
    
    if (!file) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    document.getElementById('pdfCropName').textContent = file.name;
    document.getElementById('cropMarginValue').textContent = margin + 'mm';
    document.getElementById('pdfCropOutput').style.display = 'block';
    
    showToast('PDF loaded. Cropping requires server-side processing.', 'warning');
}

function resetPDFCrop() {
    document.getElementById('pdfCropFile').value = '';
    document.getElementById('pdfCropOutput').style.display = 'none';
}

// Tool 36: PDF Sign
function signPDF() {
    const pdfFile = document.getElementById('pdfSignFile').files[0];
    const signatureFile = document.getElementById('signatureImage').files[0];
    
    if (!pdfFile) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    if (!signatureFile) {
        showToast('Please upload a signature image', 'error');
        return;
    }
    
    // Preview signature
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('signaturePreview').innerHTML = `
            <img src="${e.target.result}" style="max-width: 200px; border: 2px solid var(--color-blue); border-radius: 8px; padding: 10px; background: white;">
        `;
    };
    reader.readAsDataURL(signatureFile);
    
    document.getElementById('pdfSignName').textContent = pdfFile.name;
    document.getElementById('pdfSignOutput').style.display = 'block';
    
    showToast('Files loaded. Signing requires server-side processing.', 'warning');
}

function resetPDFSign() {
    document.getElementById('pdfSignFile').value = '';
    document.getElementById('signatureImage').value = '';
    document.getElementById('signaturePreview').innerHTML = '';
    document.getElementById('pdfSignOutput').style.display = 'none';
}

// Tool 37: PDF Metadata Editor
function editPDFMetadata() {
    const file = document.getElementById('pdfMetadataFile').files[0];
    const title = document.getElementById('pdfTitle').value;
    const author = document.getElementById('pdfAuthor').value;
    const subject = document.getElementById('pdfSubject').value;
    const keywords = document.getElementById('pdfKeywords').value;
    
    if (!file) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    document.getElementById('pdfMetadataName').textContent = file.name;
    document.getElementById('metadataPreview').innerHTML = `
        <div class="result-row"><span class="result-label">Title:</span><span class="result-value">${title || 'Not set'}</span></div>
        <div class="result-row"><span class="result-label">Author:</span><span class="result-value">${author || 'Not set'}</span></div>
        <div class="result-row"><span class="result-label">Subject:</span><span class="result-value">${subject || 'Not set'}</span></div>
        <div class="result-row"><span class="result-label">Keywords:</span><span class="result-value">${keywords || 'Not set'}</span></div>
    `;
    document.getElementById('pdfMetadataOutput').style.display = 'block';
    
    showToast('Metadata prepared. Saving requires server-side processing.', 'warning');
}

function resetPDFMetadata() {
    document.getElementById('pdfMetadataFile').value = '';
    document.getElementById('pdfTitle').value = '';
    document.getElementById('pdfAuthor').value = '';
    document.getElementById('pdfSubject').value = '';
    document.getElementById('pdfKeywords').value = '';
    document.getElementById('pdfMetadataOutput').style.display = 'none';
}

// Tool 38: PDF to HTML
function convertPDFToHTML() {
    const file = document.getElementById('pdfToHtmlFile').files[0];
    const includeImages = document.getElementById('includeImages').checked;
    const preserveLayout = document.getElementById('preserveLayout').checked;
    
    if (!file) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    document.getElementById('pdfToHtmlName').textContent = file.name;
    document.getElementById('pdfToHtmlImages').textContent = includeImages ? 'Yes' : 'No';
    document.getElementById('pdfToHtmlLayout').textContent = preserveLayout ? 'Yes' : 'No';
    document.getElementById('pdfToHtmlOutput').style.display = 'block';
    
    showToast('PDF loaded. HTML conversion requires server-side processing.', 'warning');
}

function resetPDFToHTML() {
    document.getElementById('pdfToHtmlFile').value = '';
    document.getElementById('includeImages').checked = true;
    document.getElementById('preserveLayout').checked = true;
    document.getElementById('pdfToHtmlOutput').style.display = 'none';
}

// Tool 39: HTML to PDF
function convertHTMLToPDF() {
    const htmlContent = document.getElementById('htmlContent').value;
    const pageSize = document.getElementById('pdfPageSize').value;
    const orientation = document.getElementById('pdfOrientation').value;
    
    if (!htmlContent.trim()) {
        showToast('Please enter HTML content', 'error');
        return;
    }
    
    // Preview HTML
    document.getElementById('htmlPreview').innerHTML = htmlContent;
    document.getElementById('htmlToPdfPageSize').textContent = pageSize;
    document.getElementById('htmlToPdfOrientation').textContent = orientation;
    document.getElementById('htmlToPdfOutput').style.display = 'block';
    
    showToast('HTML content ready. PDF generation requires server-side processing.', 'warning');
}

function resetHTMLToPDF() {
    document.getElementById('htmlContent').value = '';
    document.getElementById('htmlPreview').innerHTML = '';
    document.getElementById('htmlToPdfOutput').style.display = 'none';
}

// Tool 40: PDF OCR (Text Recognition)
function performPDFOCR() {
    const file = document.getElementById('pdfOcrFile').files[0];
    const language = document.getElementById('ocrLanguage').value;
    
    if (!file) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    document.getElementById('pdfOcrName').textContent = file.name;
    document.getElementById('ocrLang').textContent = getLanguageName(language);
    document.getElementById('pdfOcrOutput').style.display = 'block';
    
    // Simulate OCR progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        document.getElementById('ocrProgress').style.width = progress + '%';
        document.getElementById('ocrProgressText').textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            showToast('OCR simulation complete. Real OCR requires server-side processing with Tesseract.', 'success');
        }
    }, 300);
}

function getLanguageName(code) {
    const languages = {
        'eng': 'English',
        'spa': 'Spanish',
        'fra': 'French',
        'deu': 'German',
        'ita': 'Italian',
        'por': 'Portuguese',
        'rus': 'Russian',
        'chi_sim': 'Chinese (Simplified)',
        'jpn': 'Japanese',
        'kor': 'Korean',
        'ara': 'Arabic',
        'hin': 'Hindi'
    };
    return languages[code] || code;
}

function resetPDFOCR() {
    document.getElementById('pdfOcrFile').value = '';
    document.getElementById('ocrProgress').style.width = '0%';
    document.getElementById('ocrProgressText').textContent = '0%';
    document.getElementById('pdfOcrOutput').style.display = 'none';
}

// Update compression level display
document.getElementById('pdfCompressionLevel')?.addEventListener('change', function() {
    const labels = {
        low: 'Low (Better Quality)',
        medium: 'Medium (Balanced)',
        high: 'High (Smaller Size)'
    };
    document.getElementById('compressionLabel').textContent = labels[this.value];
});

// Update watermark opacity display
document.getElementById('watermarkOpacity')?.addEventListener('input', function() {
    document.getElementById('opacityValue').textContent = this.value + '%';
    if (document.getElementById('watermarkPreview')) {
        document.getElementById('watermarkPreview').style.opacity = this.value / 100;
    }
});

// Update rotate angle display
document.getElementById('rotateAngle')?.addEventListener('change', function() {
    document.getElementById('rotateAngleDisplay').textContent = this.value + '°';
});

// Update crop margin display
document.getElementById('cropMargin')?.addEventListener('input', function() {
    document.getElementById('cropMarginDisplay').textContent = this.value + 'mm';
});

console.log('✅ Advanced PDF Tools Loaded Successfully!');
