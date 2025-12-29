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
document.addEventListener('DOMContentLoaded', function() {
    loadSection('abstract-content', 'abstract');
    loadSection('objectives-content', 'objectives');
    loadSection('methodology-content', 'methodology');
    loadSection('problem-content', 'problem');
    loadSection('features-content', 'features');
    loadSection('demo-content', 'demo');
    loadSection('results-content', 'results');
    loadSection('conclusion-content', 'conclusion');
    loadSection('about-content', 'about');
});
