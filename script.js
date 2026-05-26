/* ============================================
   IKIGAI WEBSITE - INTERACTIVE JAVASCRIPT
   Complete Functionality & Animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initCustomCursor();
    initSakuraPetals();
    initParticleCanvas();
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initQuoteCarousel();
    initContactForm();
    initRippleEffect();
    initLoadingScreen();
    initParallaxEffect();
    initMouseTrail();
});

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Linear interpolation for smooth following
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, .principle-card, .info-card, .author-card, .quote-btn, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// ============================================
// SAKURA PETALS ANIMATION
// ============================================
function initSakuraPetals() {
    const container = document.getElementById('sakuraContainer');
    if (!container) return;
    
    const petalCount = 30;
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        
        // Random properties
        const startLeft = Math.random() * 100;
        const duration = 8 + Math.random() * 7;
        const delay = Math.random() * 10;
        const size = 10 + Math.random() * 10;
        
        petal.style.left = startLeft + '%';
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        
        container.appendChild(petal);
    }
    
    // Create initial petals
    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }
    
    // Continuously create new petals
    setInterval(createPetal, 3000);
}

// ============================================
// PARTICLE CANVAS BACKGROUND
// ============================================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    
    // Set canvas size
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() > 0.5 ? 350 : 50; // Red or gold
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((width * height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    initParticles();
    window.addEventListener('resize', initParticles);
    
    // Mouse interaction
    let mouse = { x: null, y: null };
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        
        // Create ripple effect
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * 2;
                particle.y -= Math.sin(angle) * 2;
            }
        });
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, index) => {
            particles.slice(index + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(188, 0, 45, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!navbar) return;
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Animate mobile links
            const links = mobileMenu.querySelectorAll('.mobile-link');
            links.forEach((link, index) => {
                link.style.transitionDelay = (0.1 * index) + 's';
            });
        });
        
        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Stagger animation for cards
                if (entry.target.classList.contains('reveal-card')) {
                    const index = parseInt(entry.target.dataset.index);
                    entry.target.style.transitionDelay = (index * 0.1) + 's';
                }
                
                // Stagger animation for explanation items
                if (entry.target.classList.contains('reveal-explain')) {
                    const index = parseInt(entry.target.dataset.index);
                    entry.target.style.transitionDelay = (index * 0.15) + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-card, .reveal-explain, .reveal-diagram, .reveal-book-cover, .reveal-book-info, .reveal-form, .reveal-info'
    );
    
    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        
                        // Add suffix based on context
                        if (target === 100) counter.textContent += '+';
                        if (target === 1) counter.textContent += 'M+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// QUOTE CAROUSEL
// ============================================
function initQuoteCarousel() {
    const container = document.getElementById('quotesContainer');
    const prevBtn = document.getElementById('quotePrev');
    const nextBtn = document.getElementById('quoteNext');
    const dotsContainer = document.getElementById('quoteDots');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const quotes = container.querySelectorAll('.quote-card');
    let currentIndex = 0;
    
    // Create dots
    quotes.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('quote-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.quote-dot');
    
    function updateSlides() {
        quotes.forEach((quote, index) => {
            quote.classList.remove('active', 'prev');
            if (index === currentIndex) {
                quote.classList.add('active');
            } else if (index < currentIndex) {
                quote.classList.add('prev');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % quotes.length;
        updateSlides();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        updateSlides();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (!form || !toast) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Success
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            showToast('Message sent successfully!');
        }, 1500);
    });
    
    function showToast(message, type = 'success') {
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toastIcon.textContent = type === 'success' ? '✓' : '✕';
        toastIcon.style.background = type === 'success' 
            ? 'linear-gradient(135deg, #7D9D6B 0%, #5D8A4B 100%)'
            : 'linear-gradient(135deg, #BC002D 0%, #8B0000 100%)';
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.ripple');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return;
    
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-kanji, .sakura-petal');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ============================================
// MOUSE TRAIL EFFECT
// ============================================
function initMouseTrail() {
    let trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
    });
}

// ============================================
// ADDITIONAL INTERACTIVE FEATURES
// ============================================

// Text split animation on hover
document.querySelectorAll('.split-text').forEach(element => {
    const lines = element.querySelectorAll('.line');
    
    element.addEventListener('mouseenter', () => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.transform = 'translateX(10px)';
                line.style.transition = 'transform 0.3s ease';
            }, index * 50);
        });
    });
    
    element.addEventListener('mouseleave', () => {
        lines.forEach(line => {
            line.style.transform = 'translateX(0)';
        });
    });
});

// Card tilt effect
document.querySelectorAll('.principle-card, .author-card, .info-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Diagram circle hover effects
document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('mouseenter', function() {
        const label = this.dataset.label;
        // Could show tooltip here
    });
});

// Newsletter subscription
document.querySelector('.subscribe-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.querySelector('.newsletter-form input');
    const email = input.value;
    
    if (email && email.includes('@')) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.querySelector('.toast-message').textContent = 'Welcome to our newsletter!';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
        input.value = '';
    }
});

// Smooth reveal on scroll for diagram
const diagramSection = document.getElementById('diagram');
if (diagramSection) {
    const diagramObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circles = entry.target.querySelectorAll('.circle');
                circles.forEach((circle, index) => {
                    setTimeout(() => {
                        circle.style.opacity = '1';
                        circle.style.transform = 'scale(1)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    diagramObserver.observe(diagramSection);
}

// Add glow effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Dynamic gradient based on scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        const opacity = Math.max(0, 1 - scrollPosition / windowHeight);
        hero.style.opacity = opacity;
    }
});

// Book cover 3D rotation follow mouse
const bookCover = document.querySelector('.book-cover');
if (bookCover) {
    bookCover.addEventListener('mousemove', (e) => {
        const rect = bookCover.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 10;
        const rotateX = (centerY - y) / 10;
        
        const cover3D = bookCover.querySelector('.cover-3d');
        if (cover3D) {
            cover3D.style.transform = `rotateY(${-25 + rotateY}deg) rotateX(${5 + rotateX}deg)`;
        }
    });
    
    bookCover.addEventListener('mouseleave', () => {
        const cover3D = bookCover.querySelector('.cover-3d');
        if (cover3D) {
            cover3D.style.transform = 'rotateY(-25deg) rotateX(5deg)';
        }
    });
}

// Console message for developers
console.log('%c🌸 Welcome to Ikigai Journey 🌸', 'font-size: 20px; color: #BC002D; font-weight: bold;');
console.log('%cDiscover your purpose and live a long, happy life.', 'font-size: 14px; color: #2C2C2C;');
console.log('%cBuilt with ❤️ and Japanese aesthetics', 'font-size: 12px; color: #D4AF37;');
