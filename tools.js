document.addEventListener('DOMContentLoaded', () => {

    // All tools data
    const tools = [
        { name: 'Image Compressor', category: 'image', icon: 'fas fa-compress', description: 'Compress images without losing quality', link: 'tools.html#image-compressor' },
        { name: 'PDF to Word Converter', category: 'file', icon: 'fas fa-file-pdf', description: 'Convert PDF files to editable Word documents', link: 'tools.html#pdf-converter' },
        { name: 'QR Code Generator', category: 'generator', icon: 'fas fa-qrcode', description: 'Create custom QR codes for URLs, text, and contacts', link: 'tools.html#qr-generator' },
        { name: 'Password Generator', category: 'security', icon: 'fas fa-key', description: 'Generate strong, secure passwords', link: 'tools.html#password-generator' },
        { name: 'Color Picker', category: 'design', icon: 'fas fa-palette', description: 'Pick colors and generate color palettes', link: 'tools.html#color-picker' },
        { name: 'JSON Formatter', category: 'developer', icon: 'fas fa-code', description: 'Format, validate, and beautify JSON data', link: 'tools.html#json-formatter' },
        { name: 'Word Counter', category: 'text', icon: 'fas fa-file-alt', description: 'Count words and characters', link: 'tools.html#word-counter' },
        { name: 'Lorem Ipsum Generator', category: 'text', icon: 'fas fa-paragraph', description: 'Generate placeholder text for designs', link: 'tools.html#lorem-ipsum' },
        { name: 'Text to Speech', category: 'text', icon: 'fas fa-volume-up', description: 'Convert text to natural-sounding speech', link: 'tools.html#text-to-speech' },
        { name: 'Age Calculator', category: 'calculator', icon: 'fas fa-birthday-cake', description: 'Calculate age from date of birth', link: 'tools.html#age-calculator' },
        { name: 'BMI Calculator', category: 'calculator', icon: 'fas fa-heartbeat', description: 'Calculate body mass index', link: 'tools.html#bmi-calculator' },
        { name: 'Unit Converter', category: 'calculator', icon: 'fas fa-exchange-alt', description: 'Convert units for length, weight, temperature and more', link: 'tools.html#unit-converter' }
        // Add more tools as needed
    ];

    const toolsContainer = document.getElementById('tools-grid');

    // Function to display tools
    function displayTools(toolsArray) {
        toolsContainer.innerHTML = '';
        toolsArray.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.classList.add('tool-card', 'fade-in-up');
            toolCard.dataset.category = tool.category;
            toolCard.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
                <a href="${tool.link}" class="tool-link">Use Tool <i class="fas fa-arrow-right"></i></a>
            `;
            toolsContainer.appendChild(toolCard);
        });
    }

    // Initial display: all tools
    displayTools(tools);

    // Optional: Filter by category (if you have filter buttons)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            if (category === 'all') {
                displayTools(tools);
            } else {
                const filtered = tools.filter(tool => tool.category === category);
                displayTools(filtered);
            }
        });
    });

});
