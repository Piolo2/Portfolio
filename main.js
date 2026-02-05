import './style.css'

// Mobile Menu Logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

console.log('Portfolio initialized');

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const getInitialClasses = (type) => {
    const classes = ['opacity-0'];
    if (type === 'fade-up') classes.push('translate-y-10');
    else if (type === 'fade-down') classes.push('-translate-y-10');
    else if (type === 'slide-right') classes.push('-translate-x-10');
    else if (type === 'slide-left') classes.push('translate-x-10');
    else if (type === 'zoom-in') classes.push('scale-95');
    else if (type === 'blur-in') classes.push('blur-md', 'scale-95');
    return classes;
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const animationType = entry.target.dataset.animate;
        const initialClasses = getInitialClasses(animationType);

        if (entry.isIntersecting) {
            // Animate IN
            entry.target.classList.remove(...initialClasses);
            entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100', 'blur-0');
        } else {
            // Animate OUT (Reset)
            // Only reset if it has already been animated in (check for opacity-100)
            if (entry.target.classList.contains('opacity-100')) {
                entry.target.classList.remove('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100', 'blur-0');
                entry.target.classList.add(...initialClasses);
            }
        }
    });
}, observerOptions);

// Document-wide animation initialization
document.querySelectorAll('[data-animate]').forEach(el => {
    const animationType = el.dataset.animate;

    // Base classes
    el.classList.add('transition-all', 'duration-1000', 'ease-out');

    // Apply specific initial states
    el.classList.add(...getInitialClasses(animationType));

    observer.observe(el);
});
