// Advanced features for the romantic website

// Enhanced mouse trail with different shapes
let mouseX = 0;
let mouseY = 0;
let trail = [];

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create enhanced mouse trail
function createEnhancedTrail() {
    if (Math.random() > 0.3) { // Reduce frequency to prevent overload
        const trailElement = document.createElement('div');
        trailElement.innerHTML = ['❤️', '💕', '💖', '💘', '💝', '💗', '💓', '💞'][Math.floor(Math.random() * 8)];
        trailElement.style.position = 'fixed';
        trailElement.style.left = `${mouseX}px`;
        trailElement.style.top = `${mouseY}px`;
        trailElement.style.fontSize = `${Math.random() * 20 + 10}px`;
        trailElement.style.pointerEvents = 'none';
        trailElement.style.zIndex = '9999';
        trailElement.style.userSelect = 'none';
        trailElement.style.transition = 'all 1.5s ease-out';
        trailElement.style.opacity = '1';
        
        document.body.appendChild(trailElement);
        
        // Animate the trail element
        setTimeout(() => {
            trailElement.style.opacity = '0';
            trailElement.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            if (trailElement.parentNode) {
                trailElement.parentNode.removeChild(trailElement);
            }
        }, 1600);
    }
}

// Start the enhanced trail
setInterval(createEnhancedTrail, 100);

// Heartbeat effect for heart elements
function addHeartbeatEffect() {
    const hearts = document.querySelectorAll('.heart, .envelope, .polaroid');
    hearts.forEach(heart => {
        if (!heart.classList.contains('heartbeat-added')) {
            heart.classList.add('heartbeat-added');
            heart.addEventListener('mouseenter', () => {
                heart.style.animation = 'heartbeat 0.5s ease-in-out 3';
            });
        }
    });
}

// Add heartbeat effect periodically
setInterval(addHeartbeatEffect, 2000);

// Enhanced click effects with multiple particles
document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createClickParticle(e.clientX, e.clientY);
        }, i * 100);
    }
});

function createClickParticle(x, y) {
    const particle = document.createElement('div');
    particle.innerHTML = ['🌹', '🌸', '🌺', '🌷', '💐', '🌼', '🌻', '🥀'][Math.floor(Math.random() * 8)];
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.fontSize = `${Math.random() * 20 + 15}px`;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.userSelect = 'none';
    particle.style.transition = 'all 1.5s ease-out';
    particle.style.opacity = '1';
    
    document.body.appendChild(particle);
    
    // Animate the particle
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    particle.style.transform = `translate(${endX - x}px, ${endY - y}px) rotate(${Math.random() * 360}deg)`;
    particle.style.opacity = '0';
    
    // Remove after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1500);
}

// Enhanced keyboard interactions
document.addEventListener('keydown', (e) => {
    // Secret combination: Ctrl+Alt+L
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'l') {
        createConfetti();
        showSpecialMessage("I love you more than all the stars in the sky! ✨");
    }
    
    // Secret combination: Type "love" with delays
    if (!window.typeSequence) window.typeSequence = '';
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        window.typeSequence += e.key.toLowerCase();
        if (window.typeSequence.endsWith('love')) {
            showSpecialMessage("Found the secret! You're loved more than you know 💖");
            window.typeSequence = ''; // Reset
        } else if (window.typeSequence.length > 4) {
            window.typeSequence = window.typeSequence.slice(-4); // Keep last 4 chars
        }
    }
});

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ffa3b8', '#ffebf3', '#a8e6cf', '#dcedc1'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['❤️', '💖', '💕', '💘', '💝', '💗', '💓', '💞', '💟', '❣️'][Math.floor(Math.random() * 10)];
            confetti.style.position = 'fixed';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.top = '-20px';
            confetti.style.fontSize = `${Math.random() * 20 + 15}px`;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9997';
            confetti.style.userSelect = 'none';
            confetti.style.transition = 'all 3s ease-out';
            confetti.style.opacity = '1';
            
            document.body.appendChild(confetti);
            
            // Animate falling
            confetti.style.top = `${window.innerHeight + 20}px`;
            confetti.style.opacity = '0';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 30);
    }
}

// Show special message
function showSpecialMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.position = 'fixed';
    message.style.top = '20%';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    message.style.padding = '1.5rem 3rem';
    message.style.borderRadius = '50px';
    message.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.4)';
    message.style.zIndex = '10001';
    message.style.fontStyle = 'italic';
    message.style.color = '#ff6b9d';
    message.style.fontWeight = 'bold';
    message.style.fontSize = '1.2rem';
    message.style.pointerEvents = 'none';
    message.style.animation = 'slideIn 0.5s ease, fadeOut 0.5s ease 2.5s forwards';
    
    document.body.appendChild(message);
    
    // Remove after animation
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Add enhanced gallery interactions
function enhanceGalleryInteractions() {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseenter', () => {
            // Add floating effect
            polaroid.style.transform = 'rotate(2deg) translateY(-15px) scale(1.05)';
            polaroid.style.transition = 'all 0.3s ease';
            
            // Show special message
            const messages = [
                "This is when I fell for you a little more.",
                "I could stare at this forever.",
                "You're breathtaking in this one.",
                "This moment is frozen in my heart.",
                "I love the way you look in this."
            ];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            showTemporaryHint(message, polaroid);
        });
        
        polaroid.addEventListener('mouseleave', () => {
            polaroid.style.transform = 'rotate(0deg) translateY(0) scale(1)';
        });
    });
}

// Show temporary hint near element
function showTemporaryHint(text, element) {
    const hint = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    hint.textContent = text;
    hint.style.position = 'fixed';
    hint.style.left = `${rect.left + rect.width / 2}px`;
    hint.style.top = `${rect.top - 40}px`;
    hint.style.transform = 'translateX(-50%)';
    hint.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    hint.style.padding = '0.5rem 1rem';
    hint.style.borderRadius = '20px';
    hint.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    hint.style.zIndex = '1000';
    hint.style.fontStyle = 'italic';
    hint.style.color = '#ff6b9d';
    hint.style.fontSize = '0.9rem';
    hint.style.pointerEvents = 'none';
    hint.style.animation = 'fadeIn 0.3s ease, fadeOut 0.5s ease 2s forwards';
    
    document.body.appendChild(hint);
    
    // Remove after animation
    setTimeout(() => {
        if (hint.parentNode) {
            hint.parentNode.removeChild(hint);
        }
    }, 2500);
}

// Enhanced music interaction - volume changes with mouse movement
let lastMouseX = 0;
let lastMouseY = 0;
let volumeChangeTimeout;

document.addEventListener('mousemove', (e) => {
    // Calculate mouse speed
    const speed = Math.sqrt(
        Math.pow(e.clientX - lastMouseX, 2) + 
        Math.pow(e.clientY - lastMouseY, 2)
    );
    
    // Adjust music volume based on mouse speed
    if (backgroundMusic && !backgroundMusic.paused) {
        const newVolume = Math.min(1, Math.max(0.2, speed / 1000));
        backgroundMusic.volume = newVolume;
    }
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    // Reset to normal volume after some time of inactivity
    clearTimeout(volumeChangeTimeout);
    volumeChangeTimeout = setTimeout(() => {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.5; // Normal volume
        }
    }, 2000);
});

// Password protection feature (optional)
function setupPasswordProtection() {
    // Uncomment the following code to add password protection
    /*
    const password = prompt("Enter the secret password:");
    const herNickname = "your_girlfriends_nickname"; // Replace with her actual nickname
    
    if (password !== herNickname) {
        alert("Wrong password! This site is only for someone special.");
        window.location.href = "about:blank"; // Close the page
        return false;
    }
    */
}

// Initialize advanced features when everything is loaded
document.addEventListener('DOMContentLoaded', () => {
    enhanceGalleryInteractions();
    
    // Add a "press here when you miss me" button somewhere
    const missMeButton = document.createElement('button');
    missMeButton.textContent = "Press here when you miss me 💕";
    missMeButton.style.position = 'fixed';
    missMeButton.style.bottom = '20px';
    missMeButton.style.left = '20px';
    missMeButton.style.zIndex = '1000';
    missMeButton.style.background = 'linear-gradient(45deg, #ff6b9d, #ffa3b8)';
    missMeButton.style.color = 'white';
    missMeButton.style.border = 'none';
    missMeButton.style.padding = '0.8rem 1.5rem';
    missMeButton.style.borderRadius = '50px';
    missMeButton.style.cursor = 'pointer';
    missMeButton.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
    missMeButton.style.fontSize = '0.9rem';
    
    missMeButton.addEventListener('click', () => {
        showSpecialMessage("I miss you too! ❤️ Sending virtual hugs your way!");
        createConfetti();
    });
    
    document.body.appendChild(missMeButton);
});

// Add floating elements that follow cursor gently
let floatingElements = [];

function createFloatingElement() {
    if (floatingElements.length < 5) { // Limit to 5 elements
        const element = document.createElement('div');
        element.innerHTML = ['💖', '💕', '🌸', '🌹', '🌷'][Math.floor(Math.random() * 5)];
        element.style.position = 'fixed';
        element.style.fontSize = `${Math.random() * 20 + 15}px`;
        element.style.pointerEvents = 'none';
        element.style.zIndex = '9996';
        element.style.userSelect = 'none';
        element.style.opacity = '0.7';
        element.style.left = `${Math.random() * window.innerWidth}px`;
        element.style.top = `${Math.random() * window.innerHeight}px`;
        
        document.body.appendChild(element);
        
        floatingElements.push({
            element: element,
            x: parseFloat(element.style.left),
            y: parseFloat(element.style.top),
            speed: Math.random() * 0.05 + 0.02
        });
    }
}

// Move floating elements toward cursor
function moveFloatingElements() {
    floatingElements.forEach(f => {
        const dx = mouseX - f.x;
        const dy = mouseY - f.y;
        
        f.x += dx * f.speed;
        f.y += dy * f.speed;
        
        f.element.style.left = `${f.x}px`;
        f.element.style.top = `${f.y}px`;
    });
    
    requestAnimationFrame(moveFloatingElements);
}

// Create floating elements periodically
setInterval(createFloatingElement, 3000);
moveFloatingElements(); // Start the movement animation

// Add time-based content that changes throughout the day
function updateTimeBasedContent() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.subtitle');
    
    if (greetingElement) {
        let greeting = "I know you're already impressed...<br>but let me try once more.";
        
        if (hour >= 5 && hour < 12) {
            greeting = "Good morning, beautiful ☀️<br>Ready for another day of being amazing?";
        } else if (hour >= 12 && hour < 17) {
            greeting = "Good afternoon, love 🌤️<br>Hoping your day is as wonderful as you are.";
        } else if (hour >= 17 && hour < 21) {
            greeting = "Good evening, gorgeous 🌅<br>The sunset isn't as beautiful as your smile.";
        } else {
            greeting = "Good night, angel 🌙<br>Dream of beautiful things... like us.";
        }
        
        greetingElement.innerHTML = greeting;
    }
}

// Update time-based content every hour
updateTimeBasedContent();
setInterval(updateTimeBasedContent, 3600000); // Every hour

// Cleanup function to remove floating elements when needed
window.addEventListener('beforeunload', () => {
    floatingElements.forEach(f => {
        if (f.element.parentNode) {
            f.element.parentNode.removeChild(f.element);
        }
    });
    floatingElements = [];
});