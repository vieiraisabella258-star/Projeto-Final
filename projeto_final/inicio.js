const container = document.getElementById('container');

let mousePosition = { x: 0, y: 0 };

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  mousePosition.x = e.clientX - rect.left;
  mousePosition.y = e.clientY - rect.top;
  
  updateNeonLines();
});

// Generate floating neon lines
function generateLines() {
  const linesContainer = document.getElementById('floating-lines');
  
  for (let i = 0; i < 15; i++) {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomRotation = Math.random() * 360;
    const randomDelay = Math.random() * 5;
    const duration = 3 + Math.random() * 2;
    
    const lineWrapper = document.createElement('div');
    lineWrapper.className = 'neon-line-wrapper';
    lineWrapper.style.left = `${randomX}%`;
    lineWrapper.style.top = `${randomY}%`;
    lineWrapper.style.transform = `rotate(${randomRotation}deg)`;
    lineWrapper.style.animation = `float ${duration}s ease-in-out infinite`;
    lineWrapper.style.animationDelay = `${randomDelay}s`;
    
    const line = document.createElement('div');
    line.className = 'neon-line';
    line.setAttribute('data-index', i);
    
    lineWrapper.appendChild(line);
    linesContainer.appendChild(lineWrapper);
  }
}

// Update neon lines position based on mouse
function updateNeonLines() {
  const lines = document.querySelectorAll('.neon-line');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  lines.forEach((line) => {
    const offsetX = (mousePosition.x - centerX) * 0.02;
    const offsetY = (mousePosition.y - centerY) * 0.02;
    
    line.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
  });
}

// Update additional animated lines
function updateAnimatedLines() {
  const line1 = document.getElementById('line-pink');
  const line2 = document.getElementById('line-green');
  const line3 = document.getElementById('line-yellow');
  
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

// Update on every mousemove
document.addEventListener('mousemove', () => {
  updateAnimatedLines();
});

// Button click handlers
document.querySelector('.feedback-btn').addEventListener('click', () => {
  console.log('Feedback button clicked');
  alert('Obrigado por querer nos enviar feedback!');
});

document.querySelector('.cta-btn').addEventListener('click', () => {
  console.log('CTA button clicked');
  alert('Redirecionando para começar...');
});

// Logo click
document.querySelector('.logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  generateLines();
  updateAnimatedLines();
});