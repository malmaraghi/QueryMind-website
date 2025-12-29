// Hero Section Animation
class HeroAnimation {
    constructor() {
        this.hasPlayed = false;
        this.init();
    }

    init() {
        console.log('Hero animation initializing...');
        
        const heroSection = document.getElementById('hero-section');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroButtons = document.getElementById('hero-buttons');

        if (!heroSection || !heroTitle || !heroSubtitle || !heroButtons) {
            console.error('Hero elements not found');
            return;
        }

        console.log('Hero elements found!');
        
        // Mark section as ready for animation
        heroSection.classList.add('animation-ready');
        
        // Start animation after modal closes or immediately if no modal
        this.startAnimation();
    }

    async startAnimation() {
        if (this.hasPlayed) {
            console.log('Hero animation already played');
            return;
        }

        this.hasPlayed = true;
        
        // Wait a bit for page to settle
        await this.sleep(300);
        
        console.log('Starting hero animation');

        // Animate title
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.classList.add('animate-in');
            await this.sleep(400);
        }

        // Animate subtitle
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.classList.add('animate-in');
            await this.sleep(400);
        }

        // Animate buttons
        const heroButtons = document.getElementById('hero-buttons');
        if (heroButtons) {
            heroButtons.classList.add('animate-in');
        }

        console.log('Hero animation complete');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing hero animation');
        new HeroAnimation();
    });
} else {
    console.log('DOM already loaded, initializing hero animation');
    new HeroAnimation();
}
