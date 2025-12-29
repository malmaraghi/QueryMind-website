// Objectives Animation Controller
class ObjectivesAnimation {
    constructor() {
        this.isAnimating = false;
        this.hasPlayed = false;
        this.initAttempts = 0;
        this.init();
    }

    init() {
        console.log('Objectives animation initializing...');
        const objectivesList = document.getElementById('objectives-list');
        
        if (!objectivesList) {
            console.log('Objectives list not found, retrying...');
            this.initAttempts++;
            if (this.initAttempts < 50) {
                setTimeout(() => this.init(), 100);
            } else {
                console.error('Objectives list not found after 50 attempts');
            }
            return;
        }

        console.log('Objectives list found!');
        
        // Mark container as ready for animation
        objectivesList.classList.add('animation-ready');
        
        // Start animation when objectives section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating && !this.hasPlayed) {
                    console.log('Objectives section in view, starting animation');
                    this.startAnimation();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(objectivesList);
    }

    async startAnimation() {
        if (this.hasPlayed) {
            console.log('Objectives animation already played, skipping');
            return;
        }
        
        this.isAnimating = true;
        this.hasPlayed = true;
        await this.animateObjectives();
        this.isAnimating = false;
        
        console.log('Objectives animation complete');
    }

    async animateObjectives() {
        const items = document.querySelectorAll('.objective-item');
        console.log('Animating', items.length, 'objective items');
        
        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('animate-in');
            await this.sleep(400); // Delay between each item
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing objectives animation');
        new ObjectivesAnimation();
    });
} else {
    console.log('DOM already loaded, initializing objectives animation');
    new ObjectivesAnimation();
}
