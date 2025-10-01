// Advanced Animations and Effects

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initParticleBackground();
    initScrollRevealAnimations();
    initHoverEffects();
    initTypingAnimation();
});

// Particle Background Animation
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    hero.appendChild(particleContainer);
    
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    particle.addEventListener('animationiteration', () => {
        particle.style.left = Math.random() * 100 + '%';
    });
}

// Scroll Reveal Animations
function initScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll([
        '.animate-on-scroll',
        '.animate-on-scroll-left', 
        '.animate-on-scroll-right',
        '.animate-on-scroll-scale'
    ].join(',')).forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Card tilt effect
    document.querySelectorAll('.featured-card, .tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
    });
    
    // Button ripple effect
    document.querySelectorAll('.tool-button, .btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Add ripple styles if not exist
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    .tool-button, .btn-primary, .btn-secondary {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Typing Animation for Hero Text
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary-blue)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Blinking cursor effect
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Smooth Section Transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent) || 0;
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Loading Animations
function showLoadingAnimation(element, text = 'Loading...') {
    element.innerHTML = `
        <div class="tool-loading">
            <div class="tool-spinner"></div>
            <span>${text}</span>
        </div>
    `;
}

function hideLoadingAnimation(element, content) {
    element.innerHTML = content;
}

// Progress Bar Animation
function animateProgressBar(progressBar, percentage, duration = 1000) {
    progressBar.style.width = '0%';
    progressBar.style.transition = `width ${duration}ms ease`;
    
    setTimeout(() => {
        progressBar.style.width = percentage + '%';
    }, 100);
}

// Floating Action Animation
function createFloatingAction(element, options = {}) {
    const defaults = {
        direction: 'up',
        distance: 20,
        duration: 2000,
        delay: 0
    };
    
    const config = { ...defaults, ...options };
    
    element.style.animation = `
        float${config.direction.charAt(0).toUpperCase() + config.direction.slice(1)} 
        ${config.duration}ms ease-in-out infinite
    `;
    element.style.animationDelay = config.delay + 'ms';
}

// Stagger Animation
function staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Morphing Shape Animation
function initMorphingShapes() {
    document.querySelectorAll('.floating-card .tool-icon').forEach(icon => {
        icon.classList.add('morphing-shape');
    });
}

// Text Reveal Animation
function revealText(element, speed = 50) {
    const text = element.textContent;
    element.innerHTML = '';
    
    const chars = text.split('');
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeIn 0.5s ease forwards`;
        span.style.animationDelay = (index * speed) + 'ms';
        element.appendChild(span);
    });
}

// Parallax Effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Glitch Effect
function applyGlitchEffect(element, duration = 2000) {
    element.classList.add('glitch-effect');
    
    if (!document.querySelector('#glitch-styles')) {
        const style = document.createElement('style');
        style.id = 'glitch-styles';
        style.textContent = `
            .glitch-effect {
                animation: glitch ${duration}ms ease-in-out;
            }
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                10% { transform: translate(-2px, 2px); }
                20% { transform: translate(-2px, -2px); }
                30% { transform: translate(2px, 2px); }
                40% { transform: translate(2px, -2px); }
                50% { transform: translate(-2px, 2px); }
                60% { transform: translate(-2px, -2px); }
                70% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                90% { transform: translate(-2px, 2px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        element.classList.remove('glitch-effect');
    }, duration);
}

// Breathing Animation
function initBreathingAnimation() {
    document.querySelectorAll('.nav-logo i').forEach(icon => {
        icon.classList.add('breathe');
    });
}

// Performance-optimized animation frame
let animationId;

function smoothAnimation(callback) {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    animationId = requestAnimationFrame(callback);
}

// Initialize all animations
function initAllAnimations() {
    initParticleBackground();
    initScrollRevealAnimations();
    initHoverEffects();
    initMorphingShapes();
    initBreathingAnimation();
    animateCounters();
    
    // Add performance optimization
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        el.classList.add('animate-gpu');
    });
}

// Export functions for global use
window.AnimationUtils = {
    showLoadingAnimation,
    hideLoadingAnimation,
    animateProgressBar,
    createFloatingAction,
    staggerAnimation,
    revealText,
    applyGlitchEffect,
    smoothAnimation
};
