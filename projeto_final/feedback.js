document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const backgroundLines = document.getElementById('backgroundLines');
    let mousePosition = { x: 0, y: 0 };

    // Generate floating neon lines
    function generateLines() {
        const lines = [];
        for (let i = 0; i < 15; i++) {
            lines.push({
                id: i,
                randomX: Math.random() * 100,
                randomY: Math.random() * 100,
                randomRotation: Math.random() * 360,
                randomDelay: Math.random() * 5,
                duration: 3 + Math.random() * 2
            });
        }
        return lines;
    }

    const lines = generateLines();

    // Render lines
    function renderLines() {
        backgroundLines.innerHTML = '';
        lines.forEach(line => {
            const lineElement = document.createElement('div');
            lineElement.className = 'neon-line';
            lineElement.style.left = `${line.randomX}%`;
            lineElement.style.top = `${line.randomY}%`;
            lineElement.style.transform = `rotate(${line.randomRotation}deg)`;
            lineElement.style.animation = `float ${line.duration}s ease-in-out infinite`;
            lineElement.style.animationDelay = `${line.randomDelay}s`;

            const innerDiv = document.createElement('div');
            innerDiv.className = 'neon-line-inner';
            lineElement.appendChild(innerDiv);

            backgroundLines.appendChild(lineElement);
        });
    }

    renderLines();

    // Mouse tracking for parallax effect
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        mousePosition.x = e.clientX - rect.left;
        mousePosition.y = e.clientY - rect.top;

        // Update neon lines parallax
        const neonLines = document.querySelectorAll('.neon-line-inner');
        neonLines.forEach(line => {
            const offsetX = (mousePosition.x - window.innerWidth / 2) * 0.02;
            const offsetY = (mousePosition.y - window.innerHeight / 2) * 0.02;
            line.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
        });

        // Update animated lines
        updateAnimatedLinesParallax();
    });

    function updateAnimatedLinesParallax() {
        const line1 = document.querySelector('.line-1');
        const line2 = document.querySelector('.line-2');
        const line3 = document.querySelector('.line-3');

        if (line1) {
            line1.style.transform = `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.02}px)`;
        }

        if (line2) {
            line2.style.transform = `translateX(${-mousePosition.x * 0.025}px) translateY(${-mousePosition.y * 0.015}px)`;
        }

        if (line3) {
            line3.style.transform = `rotate(45deg) translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.03}px)`;
        }
    }

    // Button click handlers
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
            // Add your button functionality here
        });
    });
});