// Demo Animation Controller
class DemoAnimation {
    constructor() {
        this.questionText = "List all employees who completed Tamkeen training programs in the IT sector";
        this.sqlCode = `SELECT e.employee_name, e.company,
       t.program_name, t.completion_date
FROM employees e
JOIN tamkeen_programs t 
  ON e.employee_id = t.employee_id
WHERE t.sector = 'IT' 
  AND t.status = 'Completed';`;
        
        this.currentCharIndex = 0;
        this.isAnimating = false;
        this.hasPlayed = false;
        this.initAttempts = 0;
        this.init();
    }

    init() {
        console.log('Demo animation initializing...');
        const demoContainer = document.querySelector('.demo-container');
        
        if (!demoContainer) {
            console.log('Demo container not found, retrying...');
            this.initAttempts++;
            if (this.initAttempts < 50) {
                setTimeout(() => this.init(), 100);
            } else {
                console.error('Demo container not found after 50 attempts');
            }
            return;
        }

        console.log('Demo container found!');
        
        // Mark container as ready for animation
        demoContainer.classList.add('animation-ready');
        
        // Start animation when demo section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    console.log('Demo section in view, starting animation');
                    this.startAnimation();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(demoContainer);
    }

    async startAnimation() {
        if (this.hasPlayed) {
            console.log('Animation already played, skipping');
            return;
        }
        
        this.isAnimating = true;
        this.hasPlayed = true;
        await this.resetAll();
        await this.runSequence();
        this.isAnimating = false;
        
        console.log('Animation complete - will not loop');
    }

    async resetAll() {
        console.log('Resetting demo');
        
        // Hide all elements
        document.querySelectorAll('.demo-step, .demo-arrow').forEach(el => {
            el.classList.remove('animate-in');
        });
        
        document.querySelectorAll('.result-row').forEach(el => {
            el.classList.remove('animate-in');
        });

        // Reset question text
        const questionText = document.getElementById('question-text');
        if (questionText) {
            questionText.textContent = '';
            questionText.classList.remove('typewriter-cursor');
        }

        // Reset SQL code
        const sqlText = document.getElementById('sql-text');
        if (sqlText) {
            sqlText.textContent = '';
            sqlText.classList.remove('typewriter-cursor');
        }

        // Reset timing values
        document.querySelectorAll('.timing-value').forEach(el => {
            const firstDecimal = el.dataset.target.includes('.') ? 
                (el.dataset.target.split('.')[1].length > 1 ? '0.00' : '0.0') : '0.00';
            el.textContent = firstDecimal;
        });

        this.currentCharIndex = 0;
        await this.sleep(200);
    }

    async runSequence() {
        console.log('Starting animation sequence');
        
        // Step 1: Show first box (Ask Question)
        await this.animateElement('#demo-step-1');
        await this.sleep(150);

        // Type the question
        await this.typeQuestion();
        await this.sleep(250);

        // Show first arrow
        await this.animateElement('#demo-arrow-1');
        await this.sleep(200);

        // Step 2: Show validation step
        await this.animateElement('#demo-step-2');
        await this.sleep(100);
        
        // Animate validation checks
        await this.animateValidation();
        await this.sleep(200);

        // Show second arrow
        await this.animateElement('#demo-arrow-2');
        await this.sleep(200);

        // Step 3: Show SQL generation box
        await this.animateElement('#demo-step-3');
        await this.sleep(200);

        // Type SQL code
        await this.typeSQL();
        await this.sleep(150);

        // Animate timing badges
        await this.animateTimings();
        await this.sleep(250);

        // Show third arrow
        await this.animateElement('#demo-arrow-3');
        await this.sleep(200);

        // Step 4: Show results box
        await this.animateElement('#demo-step-4');
        await this.sleep(150);

        // Show results one by one
        await this.animateResults();
    }

    async animateElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            console.log('Animating:', selector);
            element.classList.add('animate-in');
        } else {
            console.warn('Element not found:', selector);
        }
    }

    async typeQuestion() {
        const questionText = document.getElementById('question-text');
        if (!questionText) {
            console.error('Question text element not found');
            return;
        }

        console.log('Typing question');
        questionText.classList.add('typewriter-cursor');
        
        for (let i = 0; i < this.questionText.length; i++) {
            questionText.textContent += this.questionText[i];
            await this.sleep(15); // Typing speed
        }
        
        questionText.classList.remove('typewriter-cursor');
    }

    async typeSQL() {
        const sqlText = document.getElementById('sql-text');
        if (!sqlText) {
            console.error('SQL text element not found');
            return;
        }

        console.log('Typing SQL code');
        sqlText.classList.add('typewriter-cursor');
        
        for (let i = 0; i < this.sqlCode.length; i++) {
            sqlText.textContent += this.sqlCode[i];
            await this.sleep(8); // Typing speed
        }
        
        sqlText.classList.remove('typewriter-cursor');
    }

    async animateTimings() {
        const timingElements = document.querySelectorAll('.timing-value');
        if (timingElements.length === 0) {
            console.error('Timing elements not found');
            return;
        }

        console.log('Animating timings');
        const durations = [400, 600, 200]; // Different durations for each timing
        
        timingElements.forEach((el, index) => {
            const target = parseFloat(el.dataset.target);
            const duration = durations[index];
            const steps = 30;
            const increment = target / steps;
            const stepDuration = duration / steps;
            
            let current = 0;
            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target.toFixed(target < 1 ? 2 : 1);
                    clearInterval(interval);
                } else {
                    el.textContent = current.toFixed(target < 1 ? 2 : 1);
                }
            }, stepDuration);
        });

        await this.sleep(750);
    }

    async animateResults() {
        const rows = document.querySelectorAll('.result-row');
        console.log('Animating', rows.length, 'result rows');
        
        for (let row of rows) {
            row.classList.add('animate-in');
            await this.sleep(150);
        }
    }

    async animateValidation() {
        console.log('Animating validation checks');
        const validationItems = document.querySelectorAll('.validation-item');
        
        for (let item of validationItems) {
            item.classList.add('animate-in');
            await this.sleep(100);
        }
        
        await this.sleep(100);
        
        const validationStatus = document.getElementById('validation-status');
        if (validationStatus) {
            validationStatus.classList.add('animate-in');
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing demo');
        new DemoAnimation();
    });
} else {
    console.log('DOM already loaded, initializing demo');
    new DemoAnimation();
}
