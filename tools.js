document.addEventListener('DOMContentLoaded', () => {

    // All tools data
    const tools = [
        { name: 'Password Generator', category: 'security', icon: 'fas fa-lock', description: 'Generate secure passwords' },
        { name: 'QR Code Generator', category: 'generator', icon: 'fas fa-qrcode', description: 'Create QR codes' },
        { name: 'Color Picker', category: 'design', icon: 'fas fa-palette', description: 'Pick colors and get HEX, RGB, HSL values' },
        { name: 'Base64 Encoder', category: 'developer', icon: 'fas fa-code', description: 'Encode and decode Base64 strings' },
        { name: 'URL Shortener', category: 'business', icon: 'fas fa-link', description: 'Shorten long URLs quickly' },
        { name: 'Word Counter', category: 'text', icon: 'fas fa-file-alt', description: 'Count words and characters' },
        // Add all other tools from part1 and part2 here
    ];

    const toolsContainer = document.getElementById('tools-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Function to display tools
    function displayTools(filteredTools) {
        toolsContainer.innerHTML = '';
        filteredTools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.classList.add('tool-card');
            toolCard.dataset.category = tool.category;
            toolCard.innerHTML = `
                <div class="card-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            `;
            toolsContainer.appendChild(toolCard);
        });
    }

    // Initial display: all tools
    displayTools(tools);

    // Filter functionality
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
