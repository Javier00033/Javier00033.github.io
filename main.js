// Portfolio Website Main JavaScript
// Optimized for performance and user experience

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupSkillAnimations();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupLazyLoading();
        this.setupContactForm();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Animate menu icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                        const icon = mobileMenuBtn?.querySelector('i');
                        if (icon && icon.classList.contains('fa-times')) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            });
        });
    }

    setupSkillAnimations() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        const width = bar.style.width || bar.getAttribute('data-width');
                        if (width) {
                            setTimeout(() => {
                                bar.style.width = width;
                            }, index * 200);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        // Observe skills sections
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const progressBar = bar.querySelector('.skill-progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.setAttribute('data-width', width);
                progressBar.style.width = '0%';
            }
        });

        document.querySelectorAll('.bg-white.rounded-xl.p-8.shadow-lg').forEach(section => {
            if (section.querySelector('.skill-bar')) {
                skillObserver.observe(section);
            }
        });
    }

    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.scrollY;
            const nav = document.querySelector('nav');
            
            // Navigation shadow
            if (scrolled > 100) {
                nav?.classList.add('shadow-lg');
            } else {
                nav?.classList.remove('shadow-lg');
            }

            // Parallax effect for hero section
            const hero = document.querySelector('.hero-gradient');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    setupIntersectionObserver() {
        const animateElements = document.querySelectorAll('.card-hover, .animate-fade-in, .animate-slide-in');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            animationObserver.observe(element);
        });
    }

    setupLazyLoading() {
        // Lazy load images if any
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupContactForm() {
        // Add contact form functionality if needed
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            // Add click tracking for contact links
            const contactLinks = contactSection.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
            contactLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Track contact attempt (could be sent to analytics)
                    console.log('Contact attempt:', link.href);
                });
            });
        }
    }

    // Utility method to debounce events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    criticalLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'style';
        document.head.appendChild(link);
    });
};

// Performance monitoring
const measurePerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
};

// Initialize performance optimizations
preloadCriticalResources();
measurePerformance();

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}