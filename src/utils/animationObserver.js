const shouldReduceMotion = () =>
    document.body?.dataset.a11yPauseAnimations === 'true' ||
    document.body?.dataset.a11yAdhdMode === 'true';

// Animation Observer Utility
export class AnimationObserver {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '-20px 0px 0px 0px',
            animationDelay: 300,
            ...options
        };
        
        this.observer = null;
        this.animatedElements = new Set();
    }

    // Initialize the observer
    init() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                    }
                });
            },
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            }
        );
    }

    // Observe an element
    observe(element, animationClass = 'animate-blur-3d') {
        if (!this.observer) {
            this.init();
        }

        // Add the animation class
        element.classList.add(animationClass);

        if (shouldReduceMotion()) {
            element.classList.add('animate-in');
            this.animatedElements.add(element);
            return;
        }
        
        // Start observing
        this.observer.observe(element);
        
        // Track the element
        this.animatedElements.add(element);
    }

    // Animate the element
    animateElement(element) {
        if (shouldReduceMotion()) {
            element.classList.add('animate-in');
            this.observer.unobserve(element);
            return;
        }

        // Add delay if specified
        setTimeout(() => {
            element.classList.add('animate-in');
        }, this.options.animationDelay);

        // Stop observing after animation
        this.observer.unobserve(element);
    }

    // Observe multiple elements
    observeMultiple(elements, animationClass = 'animate-blur-3d') {
        elements.forEach((element, index) => {
            // Add staggered delay for multiple elements
            const delay = index * 200;
            this.observe(element, animationClass);
            
            // Store the delay for this element
            element.dataset.animationDelay = delay;
        });
    }

    // Clean up
    destroy() {
        if (this.observer) {
            this.animatedElements.forEach(element => {
                this.observer.unobserve(element);
            });
            this.observer.disconnect();
        }
        this.animatedElements.clear();
    }

    // Reset animations (useful for testing)
    reset() {
        this.animatedElements.forEach(element => {
            element.classList.remove('animate-in');
        });
    }
}

// Predefined animation configurations
export const AnimationConfigs = {
    BLUR_3D: 'animate-blur-3d',
    SLIDE_3D: 'animate-3d-slide',
    ZOOM_3D: 'animate-3d-zoom',
    FLIP_3D: 'animate-3d-flip'
};

// Quick setup function
export function setupAnimationObserver(selector, animationClass = 'animate-blur-3d', options = {}) {
    const observer = new AnimationObserver(options);
    const elements = document.querySelectorAll(selector);
    
    observer.observeMultiple(elements, animationClass);
    
    return observer;
}

// React Hook for easy integration
export function useAnimationObserver(animationClass = 'animate-blur-3d', options = {}) {
    const observerRef = React.useRef(null);
    const elementRef = React.useRef(null);

    React.useEffect(() => {
        if (elementRef.current) {
            observerRef.current = new AnimationObserver(options);
            observerRef.current.observe(elementRef.current, animationClass);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.destroy();
            }
        };
    }, [animationClass, options]);

    return elementRef;
} 