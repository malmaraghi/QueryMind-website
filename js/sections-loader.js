// Section Loader - Dynamically loads HTML sections
async function loadSection(sectionId, filename) {
    try {
        const response = await fetch(`sections/${filename}.html`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const html = await response.text();
        const element = document.getElementById(sectionId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading section ${filename}:`, error);
    }
}

// Load all sections when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load all sections
    await Promise.all([
        loadSection('abstract-content', 'abstract'),
        loadSection('objectives-content', 'objectives'),
        loadSection('methodology-content', 'methodology'),
        loadSection('problem-content', 'problem'),
        loadSection('features-content', 'features'),
        loadSection('demo-content', 'demo'),
        loadSection('results-content', 'results'),
        loadSection('conclusion-content', 'conclusion'),
        loadSection('about-content', 'about')
    ]);
    
    // After all sections are loaded, handle hash navigation
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Small delay to ensure rendering is complete
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});
