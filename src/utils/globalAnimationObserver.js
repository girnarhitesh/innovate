import { AnimationObserver, AnimationConfigs } from './animationObserver';

const shouldReduceMotion = () =>
    document.body?.dataset.a11yPauseAnimations === 'true' ||
    document.body?.dataset.a11yAdhdMode === 'true';

// Global animation observer for all h2 headings
class GlobalAnimationObserver {
    constructor() {
        this.observer = new AnimationObserver({
            threshold: 0.1,
            rootMargin: '-20px 0px 0px 0px',
            animationDelay: 200
        });
        this.initialized = false;
        this.mutationObserver = null;
        this.animatedElements = new Set();
    }

    init() {
        if (this.initialized) return;

        // Initial setup for existing h2 elements
        this.setupExistingElements();

        // Setup mutation observer to watch for new h2 elements
        this.setupMutationObserver();

        this.initialized = true;
    }

    setupExistingElements() {
        const h2Elements = document.querySelectorAll('h2');
        this.animateElements(h2Elements);
    }

    setupMutationObserver() {
        this.mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Check for added nodes
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is an h2
                        if (node.tagName === 'H2') {
                            this.animateElements([node]);
                        }

                        // Check for h2 elements within the added node
                        const h2Elements = node.querySelectorAll ? node.querySelectorAll('h2') : [];
                        if (h2Elements.length > 0) {
                            this.animateElements(h2Elements);
                        }
                    }
                });
            });
        });

        // Start observing
        this.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    animateElements(elements) {
        elements.forEach((h2, index) => {
            // Skip if already animated
            if (this.animatedElements.has(h2)) return;

            // Add to animated set
            this.animatedElements.add(h2);

            if (shouldReduceMotion()) {
                h2.classList.add(AnimationConfigs.BLUR_3D, 'animate-in');
                return;
            }

            // Apply animation
            this.observer.observe(h2, AnimationConfigs.BLUR_3D);

            // Store delay info
            h2.dataset.animationDelay = index * 150;
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.destroy();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        this.animatedElements.clear();
        this.initialized = false;
    }
}

// Create global instance
const globalAnimationObserver = new GlobalAnimationObserver();

// Initialize after a short delay to ensure React has rendered
setTimeout(() => {
    globalAnimationObserver.init();
}, 100);

// Also initialize on DOM content loaded as backup
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        globalAnimationObserver.init();
    });
} else {
    // If DOM is already loaded, initialize after a short delay
    setTimeout(() => {
        globalAnimationObserver.init();
    }, 100);
}

// Export for manual control if needed
export { globalAnimationObserver }; 