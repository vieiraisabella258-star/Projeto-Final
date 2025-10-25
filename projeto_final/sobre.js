let mousePosition = { x: 0, y: 0 };

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const floatingLinesContainer = document.getElementById('floating-lines');

    generateFloatingLines(floatingLinesContainer);

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mousePosition.x = e.clientX - rect.left;
        mousePosition.y = e.clientY - rect.top;
        updateLinePositions();
    });

    setupSmoothScroll();
    setupIntersectionObserver();

    const feedbackBtn = document.querySelector('.btn-primary');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            alert('Função de feedback será implementada em breve!');
        });
    }
});

function generateFloatingLines(container) {
    for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.className = 'floating-line';
        
        line.style.left = (Math.random() * 100) + '%';
        line.style.top = (Math.random() * 100) + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDuration = (3 + Math.random() * 2) + 's';
        line.style.animationDelay = (Math.random() * 5) + 's';
        
        container.appendChild(line);
    }
}

function updateLinePositions() {
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');
    const line3 = document.getElementById('line-3');

    if (line1) line1.style.transform = `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.02}px)`;
    if (line2) line2.style.transform = `translateX(${-mousePosition.x * 0.025}px) translateY(${-mousePosition.y * 0.015}px)`;
    if (line3) line3.style.transform = `rotate(45deg) translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.03}px)`;
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .value-card, .cta-section').forEach(el => {
        el.style.opacity = '0.8';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        observer.observe(el);
    });
}