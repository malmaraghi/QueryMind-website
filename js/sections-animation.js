// Unified Animations Controller for all sections
class SectionAnimations {
    constructor() {
        this.animations = new Map(); // Track which animations have played
        this.initAttempts = 0;
        this.maxAttempts = 50;
        this.init();
    }

    init() {
        console.log('Initializing section animations...');
        
        // Wait for DOM and sections to load
        setTimeout(() => this.setupAnimations(), 100);
    }

    setupAnimations() {
        this.initAttempts++;
        
        const sections = [
            { id: 'abstract-content-inner', type: 'grid', itemSelector: 'p', delay: 400 },
            { id: 'problem-grid', type: 'grid', itemSelector: '.problem-card', delay: 300 },
            { id: 'features-grid', type: 'grid', itemSelector: '.feature-card', delay: 200 },
            { id: 'methodology-grid', type: 'grid', itemSelector: '.methodology-section', delay: 200 },
            { id: 'graph-container', type: 'single', delay: 0 },
            { id: 'results-table', type: 'single', delay: 0 },
            { id: 'results-findings', type: 'single', delay: 0 },
            { id: 'conclusion-content', type: 'conclusion', delay: 300 },
            { id: 'team-grid', type: 'grid', itemSelector: '.team-card', delay: 300 },
            { id: 'supervisor-section', type: 'single', delay: 0 }
        ];

        let foundCount = 0;
        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                foundCount++;
                this.setupSectionObserver(element, section);
                console.log(`✓ Found section: ${section.id}`);
            }
        });

        if (foundCount < sections.length && this.initAttempts < this.maxAttempts) {
            console.log(`Found ${foundCount}/${sections.length} sections, retrying...`);
            setTimeout(() => this.setupAnimations(), 100);
        } else {
            console.log(`Animation setup complete. Found ${foundCount}/${sections.length} sections.`);
        }
    }

    setupSectionObserver(element, config) {
        // Mark element as ready for animation
        element.classList.add('animation-ready');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animations.has(config.id)) {
                    console.log(`Starting animation for: ${config.id}`);
                    this.animateSection(element, config);
                    this.animations.set(config.id, true);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(element);
    }

    async animateSection(element, config) {
        switch (config.type) {
            case 'grid':
                await this.animateGrid(element, config);
                break;
            case 'single':
                await this.animateSingle(element);
                break;
            case 'conclusion':
                await this.animateConclusion(element, config);
                break;
        }
    }

    async animateGrid(container, config) {
        const items = container.querySelectorAll(config.itemSelector);
        console.log(`Animating ${items.length} items in ${config.id}`);
        
        for (let item of items) {
            item.classList.add('animate-in');
            await this.sleep(config.delay);
        }
    }

    async animateSingle(element) {
        element.classList.add('animate-in');
    }

    async animateConclusion(container, config) {
        // Animate summary first
        const summary = container.querySelector('[data-index="0"]');
        if (summary) {
            summary.classList.add('animate-in');
            await this.sleep(400);
        }

        // Animate future work grid items
        const futureItems = container.querySelectorAll('.future-item');
        for (let item of futureItems) {
            item.classList.add('animate-in');
            await this.sleep(config.delay);
        }

        // Animate impact last
        const impact = container.querySelector('.conclusion-impact');
        if (impact) {
            await this.sleep(300);
            impact.classList.add('animate-in');
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing all section animations');
        new SectionAnimations();
    });
} else {
    console.log('DOM already loaded, initializing all section animations');
    new SectionAnimations();
}
