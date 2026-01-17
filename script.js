// DOM Elements
const heartsContainer = document.getElementById('heartsContainer');
const surpriseBtn = document.getElementById('surpriseBtn');
const autoMessage = document.getElementById('autoMessage');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const complimentPopup = document.getElementById('complimentPopup');
const clickEffectContainer = document.getElementById('clickEffectContainer');
const simulatorBtns = document.querySelectorAll('.simulator-btn');
const simulatorOutput = document.getElementById('simulatorOutput');
const letterEnvelope = document.getElementById('letterEnvelope');
const letterContent = document.getElementById('letterContent');
const lastThingBtn = document.getElementById('lastThingBtn');
const finalMessage = document.getElementById('finalMessage');
const daysCounter = document.getElementById('daysCounter');

// Navigation elements
const navLinks = document.querySelectorAll('.nav-link');

// Sections
const sections = {
    landing: document.getElementById('landing'),
    story: document.getElementById('story'),
    gallery: document.getElementById('gallery'),
    funny: document.getElementById('funny'),
    letters: document.getElementById('letters'),
    future: document.getElementById('future'),
    ending: document.getElementById('ending'),
    proposal: document.getElementById('proposal')
};

// Timing variables
let idleTimer;
let autoMessageTimer;
let buttonShakeTimer;
let waitingMessageTimer;
let petalTimer;
let surpriseTimer;
let textRevealTimers = [];

// Romantic compliments for hover effects
const compliments = [
    "You make ordinary moments special.",
    "You're my favorite notification.",
    "I still get butterflies.",
    "You're the best thing that ever happened to me.",
    "Just seeing you smile brightens my day.",
    "You inspire me to be a better person.",
    "Your laugh is my favorite sound.",
    "You're more beautiful than you realize.",
    "You're my safe place in this world.",
    "Every day with you feels like a gift.",
    "You make me believe in happy endings.",
    "I fall for you more each day."
];

// Funny simulator responses
const simulatorResponses = [
    "You forgot to reply for 2 minutes. She noticed.",
    "You said 'ok' instead of 'ok baby'. Points deducted.",
    "She's giving you that look... you know the one.",
    "Emergency! She's cuter than you can handle!",
    "Warning: Excessive cuteness detected!",
    "You're being too sweet, proceed with caution.",
    "She just smiled at nothing. Probably thinking of you.",
    "She's about to send a 'good morning' text. Be ready."
];

// Reasons why I love you
const loveReasons = [
    "Because you care",
    "Because you're strong",
    "Because you steal food from my plate",
    "Because you make me laugh",
    "Because you listen to my rants",
    "Because you're patient with me",
    "Because you're beautiful inside and out",
    "Because you make me want to be better",
    "Because you're my best friend",
    "Because you love my weirdness",
    "Because you're perfect in my eyes",
    "Because you're irreplaceable"
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    setupEventListeners();
    startAutoMessageTimer();
    updateDaysCounter();
    startPetals();
    setupScrollAnimations();
    startSurpriseIntervals();
});

// Initialize floating hearts animation
function initFloatingHearts() {
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        createHeart();
    }
    
    // Keep creating hearts periodically
    setInterval(createHeart, 800);
}

// Create floating petals
function createPetals() {
    const petal = document.createElement('div');
    petal.innerHTML = ['🌸', '🌹', '🌺', '🌷', '🌼'][Math.floor(Math.random() * 5)];
    petal.style.position = 'fixed';
    petal.style.fontSize = `${Math.random() * 20 + 15}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.top = '100vh';
    petal.style.pointerEvents = 'none';
    petal.style.zIndex = '9995';
    petal.style.userSelect = 'none';
    petal.style.animation = `floatPetals ${Math.random() * 10 + 10}s linear forwards`;
    
    document.body.appendChild(petal);
    
    // Remove after animation
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 15000);
}

// Start creating petals
function startPetals() {
    petalTimer = setInterval(createPetals, 3000);
}

// Setup scroll animations for story section
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Play pop sound effect (visual for now)
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.5)';
                    setTimeout(() => {
                        entry.target.style.boxShadow = '';
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.5s ease';
        observer.observe(item);
    });
}

// Start surprise intervals
function startSurpriseIntervals() {
    // Obvious surprises every 5-8 seconds
    surpriseTimer = setInterval(() => {
        if (Math.random() > 0.5) { // 50% chance
            const surprises = [
                "I'm watching... in a non-creepy way 😊",
                "You're glowing today!",
                "Did you know you're amazing?",
                "You just smiled, didn't you?"
            ];
            showTemporaryMessage(surprises[Math.floor(Math.random() * surprises.length)]);
        }
    }, Math.random() * 3000 + 5000); // 5-8 seconds
    
    // Hidden surprises every 20-40 seconds
    setInterval(() => {
        const hiddenSurprises = [
            "Psst... you're incredible!",
            "This page loves you too",
            "Secret message: I adore you",
            "Easter egg found! 🥚"
        ];
        showTemporaryMessage(hiddenSurprises[Math.floor(Math.random() * hiddenSurprises.length)]);
    }, Math.random() * 20000 + 20000); // 20-40 seconds
}

// Create a single floating heart
function createHeart(x = null, y = null) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart';
    
    // Set random position if not provided
    if (x === null || y === null) {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
    }
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    heart.style.fontSize = `${0.5 + Math.random() * 2}rem`;
    heart.style.opacity = `${0.3 + Math.random() * 0.7}`;
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes to prevent memory leaks
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Set up all event listeners
function setupEventListeners() {
    // Landing page events
    surpriseBtn.addEventListener('click', goToNextSection);
    
    // Music toggle - now starts on first interaction
    document.addEventListener('click', function enableMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🔊';
        }
        document.removeEventListener('click', enableMusic);
    });
    
    // Mouse move for hearts trail
    document.addEventListener('mousemove', handleMouseMove);
    
    // Click effects
    document.addEventListener('click', handleClickEffect);
    
    // Simulator buttons with escalation
    let angerCount = 0;
    simulatorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let randomResponse = simulatorResponses[Math.floor(Math.random() * simulatorResponses.length)];
            
            // Escalation system for anger button
            if (btn.textContent.includes('angry')) {
                angerCount++;
                if (angerCount === 3) {
                    randomResponse = "Okay stop. I'm actually mad now 😤";
                    // Add screen shake effect
                    document.body.style.animation = 'buttonShake 0.5s ease';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 500);
                    angerCount = 0; // Reset
                }
            } else {
                angerCount = 0; // Reset if other button clicked
            }
            
            simulatorOutput.textContent = randomResponse;
            
            // Mood background shift
            const moods = {
                'Make her smile': '#f0fff0',
                'Make her angry': '#ffe0e0',
                'Say something dumb': '#e6f7ff'
            };
            
            for (const [key, color] of Object.entries(moods)) {
                if (btn.textContent.includes(key.split(' ')[2])) { // Extract 'smile', 'angry', 'dumb'
                    document.body.style.background = `linear-gradient(135deg, ${color}, #f5f0ff)`;
                    setTimeout(() => {
                        document.body.style.background = 'linear-gradient(135deg, #fff5f5, #f5f0ff)';
                    }, 1000);
                }
            }
        });
    });
    
    // Letter envelope click with animated opening
    letterEnvelope.addEventListener('click', () => {
        // Animate envelope wiggle
        letterEnvelope.style.animation = 'buttonShake 0.5s ease';
        setTimeout(() => {
            letterContent.classList.remove('hidden');
            letterEnvelope.classList.add('hidden');
            
            // Reveal letter text line by line
            revealLetterText();
        }, 500);
    });
    
    // Last thing button
    lastThingBtn.addEventListener('click', () => {
        finalMessage.classList.remove('hidden');
        lastThingBtn.classList.add('hidden');
        
        // Add replay button after a delay
        addReplayButton();
    });
    
    // Proposal trigger button
    const proposalTrigger = document.getElementById('proposalTrigger');
    if (proposalTrigger) {
        proposalTrigger.addEventListener('click', () => {
            // Hide all sections
            Object.values(sections).forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show proposal section
            sections.proposal.classList.remove('hidden');
            
            // Create confetti effect
            createProposalConfetti();
        });
    }

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });

    // Keyboard interactions
    document.addEventListener('keydown', handleKeyDown);
    
    // Mouse hover for compliments
    document.addEventListener('mouseover', handleMouseOver);
    
    // Idle timer for "miss you" messages
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
    
    startIdleTimer();
    
    // Idle timer for funny section
    let idleTimerFunny = null;
    document.getElementById('funny')?.addEventListener('mouseover', () => {
        clearTimeout(idleTimerFunny);
    });
    
    document.getElementById('funny')?.addEventListener('mouseout', () => {
        idleTimerFunny = setTimeout(() => {
            if (simulatorOutput.textContent === '') {
                simulatorOutput.textContent = "She's waiting for attention...";
            }
        }, 10000);
    });
}

// Navigate to section
function navigateToSection(sectionId) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    sections[sectionId].classList.remove('hidden');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Go to next section when clicking the surprise button
function goToNextSection() {
    sections.landing.classList.add('hidden');
    sections.story.classList.remove('hidden');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === 'story') {
            link.classList.add('active');
        }
    });
    
    // Stop the landing page timers
    clearTimeout(autoMessageTimer);
    clearTimeout(buttonShakeTimer);
    clearTimeout(waitingMessageTimer);
}

// Toggle background music
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🎵';
    }
}

// Handle mouse movement for hearts trail
function handleMouseMove(e) {
    // Create small heart near cursor
    if (Math.random() > 0.7) { // Only create occasionally
        createHeart(e.clientX, e.clientY);
    }
    
    // Adjust music volume based on mouse speed (moved from advanced-features.js)
    const speed = Math.sqrt(
        Math.pow(e.clientX - (window.mouseX || e.clientX), 2) + 
        Math.pow(e.clientY - (window.mouseY || e.clientY), 2)
    );
    
    if (backgroundMusic && !backgroundMusic.paused) {
        const newVolume = Math.min(1, Math.max(0.2, speed / 1000));
        backgroundMusic.volume = newVolume;
    }
    
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
}

// Handle click effects
function handleClickEffect(e) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${e.clientX - 10}px`;
    effect.style.top = `${e.clientY - 10}px`;
    
    clickEffectContainer.appendChild(effect);
    
    // Remove after animation
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 1000);
}

// Handle keyboard interactions
function handleKeyDown(e) {
    // Secret key combinations
    switch(e.key.toLowerCase()) {
        case 'h':
            if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                showTemporaryMessage("You have my heart.");
            }
            break;
        case 'l':
            showTemporaryMessage("Love you.");
            break;
        case 'u':
            showTemporaryMessage("Always you.");
            break;
        case 'enter':
            if (!e.shiftKey && !e.ctrlKey) {
                // Jump to finale if on landing page
                if (sections.landing.classList.contains('hidden')) {
                    showTemporaryMessage("My confession: I can't imagine life without you.");
                } else {
                    // Jump to finale
                    sections.landing.classList.add('hidden');
                    sections.ending.classList.remove('hidden');
                    
                    // Update active nav link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === 'ending') {
                            link.classList.add('active');
                        }
                    });
                }
            }
            break;
        case 'backspace':
            showTemporaryMessage("Hey... don't erase me 😌");
            break;
        case 'g':
            if (e.ctrlKey) {
                showTemporaryMessage("I know. And I always will.");
            }
            break;
        default:
            // Typing response
            if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                showTemporaryMessage("I don't know what you're typing... but I know I love you.");
            }
    }
    
    // Reset idle timer on any key press
    resetIdleTimer();
}

// Show temporary message on screen
function showTemporaryMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    messageDiv.style.padding = '1rem 2rem';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.fontStyle = 'italic';
    messageDiv.style.color = '#ff6b9d';
    messageDiv.style.pointerEvents = 'none';
    messageDiv.style.animation = 'fadeIn 0.3s ease, fadeOut 0.5s ease 2.5s forwards';
    
    document.body.appendChild(messageDiv);
    
    // Remove after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Add fadeOut animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Handle mouse hover for compliments
function handleMouseOver(e) {
    // Only show compliment on certain elements
    if (e.target.tagName === 'IMG' || e.target.tagName === 'H1' || e.target.tagName === 'H2' || 
        e.target.tagName === 'H3' || e.target.tagName === 'BUTTON' || e.target.tagName === 'P') {
        
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top - 30;
        
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        complimentPopup.textContent = compliment;
        complimentPopup.style.left = `${x}px`;
        complimentPopup.style.top = `${y}px`;
        complimentPopup.classList.remove('hidden');
        
        // Hide after delay
        setTimeout(() => {
            complimentPopup.classList.add('hidden');
        }, 2000);
    }
    
    // Special handling for polaroid photos
    if (e.target.closest('.polaroid')) {
        const polaroid = e.target.closest('.polaroid');
        
        // After 3 seconds of hovering, reveal secret caption
        let secretTimer = setTimeout(() => {
            const secretCaptions = [
                "You don't know this, but I stared at this for hours",
                "This is when I fell for you a little more",
                "I could look at this forever",
                "You're breathtaking in this one"
            ];
            
            const secretCaption = secretCaptions[Math.floor(Math.random() * secretCaptions.length)];
            
            // Add to existing caption
            const caption = polaroid.querySelector('.caption');
            if (caption) {
                caption.textContent += " - " + secretCaption;
            }
        }, 3000);
        
        // Store timer to clear if user moves away
        polaroid.dataset.secretTimer = secretTimer;
        
        polaroid.addEventListener('mouseleave', function() {
            clearTimeout(secretTimer);
        });
    }
    
    // Gallery lightbox functionality
    if (e.target.classList.contains('polaroid') || e.target.tagName === 'IMG') {
        const polaroid = e.target.classList.contains('polaroid') ? e.target : e.target.closest('.polaroid');
        if (polaroid) {
            const img = polaroid.querySelector('img');
            if (img) {
                img.style.cursor = 'pointer';
                
                img.addEventListener('click', function() {
                    const lightbox = document.getElementById('lightbox');
                    const lightboxImg = document.getElementById('lightbox-img');
                    const lightboxCaption = document.getElementById('lightbox-caption');
                    
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightboxCaption.textContent = img.dataset.caption || '';
                    
                    lightbox.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                    
                    // Add random emotional caption
                    const randomEmotionalCaptions = [
                        "You mean the world to me",
                        "I'm grateful for moments like these",
                        "This memory is precious to me",
                        "You make everything better"
                    ];
                    
                    const randomCaption = randomEmotionalCaptions[Math.floor(Math.random() * randomEmotionalCaptions.length)];
                    lightboxCaption.textContent += " - " + randomCaption;
                });
            }
        }
    }
}

// Update days counter since we met
function updateDaysCounter() {
    // For now, using a fixed date - you can change this to your actual date
    const meetDate = new Date('2023-01-01'); // Change this to your actual date
    const today = new Date();
    const diffTime = Math.abs(today - meetDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    daysCounter.textContent = diffDays;
}

// Start timer for automatic message on landing page
function startAutoMessageTimer() {
    autoMessageTimer = setTimeout(() => {
        autoMessage.classList.remove('hidden');
        
        // After 10 seconds, shake the button gently
        buttonShakeTimer = setTimeout(() => {
            surpriseBtn.classList.add('shake-button');
        }, 5000);
        
        // After 15 seconds, add waiting message
        waitingMessageTimer = setTimeout(() => {
            const waitMsg = document.createElement('p');
            waitMsg.id = 'waitMessage';
            waitMsg.className = 'wait-message';
            waitMsg.textContent = 'Okay okay, I\'ll wait 😌';
            waitMsg.style.display = 'block';
            
            // Insert after autoMessage
            autoMessage.insertAdjacentElement('afterend', waitMsg);
        }, 10000);
    }, 5000); // Show after 5 seconds
}

// Start idle timer for "miss you" messages
function startIdleTimer() {
    idleTimer = setTimeout(() => {
        showTemporaryMessage("Are you still here... or just thinking about me?");
    }, 10000); // 10 seconds of inactivity
}

// Reset idle timer
function resetIdleTimer() {
    clearTimeout(idleTimer);
    startIdleTimer();
}

// Time-based messages
function setTimeBasedMessages() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        // Morning message
        showTemporaryMessage("Good morning, beautiful ☀️");
    } else if (hour >= 18 && hour < 22) {
        // Evening message
        showTemporaryMessage("Hope your evening is as lovely as you are 💛");
    } else if (hour >= 22 || hour < 5) {
        // Night message
        showTemporaryMessage("You should sleep... I'll wait here ❤️");
    }
}

// Add love reasons to the list
function addLoveReasons() {
    const reasonList = document.getElementById('reasonList');
    if (reasonList) {
        reasonList.innerHTML = ''; // Clear existing
        
        loveReasons.forEach(reason => {
            const li = document.createElement('li');
            li.textContent = reason;
            reasonList.appendChild(li);
        });
    }
}

// Initialize additional features when DOM is loaded
window.addEventListener('load', () => {
    addLoveReasons();
    setTimeBasedMessages();
    
    // Add periodic random messages
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance every minute
            const randomMessages = [
                "I made this just for you.",
                "Smile. This page likes you.",
                "You're safe here.",
                "Every click you make makes me smile.",
                "You're the reason I believe in love.",
                "Thanks for being amazing.",
                "You deserve all the happiness in the world."
            ];
            
            const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            showTemporaryMessage(randomMessage);
        }
    }, 60000); // Every minute
});

// Reveal letter text line by line
function revealLetterText() {
    const letterLines = [
        "Things I'm scared to say",
        "What you mean to me",
        "What I promise you",
        "I don't need perfection. I just need you.",
        "<span class='blinking-cursor'>|</span>"
    ];
    
    const letterContentEl = document.getElementById('letterContent');
    letterContentEl.innerHTML = ''; // Clear existing content
    
    letterLines.forEach((line, index) => {
        const p = document.createElement('p');
        p.innerHTML = line;
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        letterContentEl.appendChild(p);
        
        // Schedule appearance
        setTimeout(() => {
            p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, index * 800); // Delay each line
    });
    
    // Add blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        .blinking-cursor {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Function to create floating particles for ending section
function createParticles() {
    if (!sections.ending.classList.contains('hidden')) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        document.querySelector('.ending').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
}

// Create particles periodically
setInterval(createParticles, 300);

// Function to replay the journey
function replayJourney() {
    // Hide all sections
    Object.values(sections).forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show landing section
    sections.landing.classList.remove('hidden');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === 'landing') {
            link.classList.add('active');
        }
    });
    
    // Reset any animations or states
    const waitMessage = document.getElementById('waitMessage');
    if (waitMessage) {
        waitMessage.remove();
    }
    
    surpriseBtn.classList.remove('shake-button');
    
    // Restart landing page timers
    clearTimeout(autoMessageTimer);
    clearTimeout(buttonShakeTimer);
    clearTimeout(waitingMessageTimer);
    
    startAutoMessageTimer();
}

// Add replay button after final message appears
function addReplayButton() {
    setTimeout(() => {
        const replayBtn = document.createElement('button');
        replayBtn.textContent = 'Replay the Journey';
        replayBtn.className = 'cta-button';
        replayBtn.style.marginTop = '1rem';
        replayBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        replayBtn.style.backdropFilter = 'blur(10px)';
        replayBtn.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        
        replayBtn.addEventListener('click', replayJourney);
        
        finalMessage.appendChild(replayBtn);
    }, 5000); // Show after 5 seconds
}

// Create night sky for future page
function createNightSky() {
    const futureSection = document.querySelector('.future');
    if (!futureSection) return;
    
    const sky = document.createElement('div');
    sky.style.position = 'fixed';
    sky.style.top = '0';
    sky.style.left = '0';
    sky.style.width = '100%';
    sky.style.height = '100%';
    sky.style.background = 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)';
    sky.style.zIndex = '-1';
    sky.style.opacity = '0';
    sky.style.transition = 'opacity 2s ease';
    sky.id = 'night-sky';
    
    document.body.insertBefore(sky, document.body.firstChild);
    
    // Add stars
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random();
        star.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.5)';
        
        // Twinkle animation
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite alternate`;
        
        sky.appendChild(star);
    }
    
    // Add shooting stars
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
            createShootingStar(sky);
        }
    }, 3000);
    
    // Add CSS for twinkling
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Create a shooting star
function createShootingStar(parent) {
    const shootingStar = document.createElement('div');
    shootingStar.style.position = 'absolute';
    shootingStar.style.width = '2px';
    shootingStar.style.height = '2px';
    shootingStar.style.backgroundColor = 'white';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.left = '0';
    shootingStar.style.top = `${Math.random() * 100}%`;
    shootingStar.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.8)';
    shootingStar.style.animation = `shoot ${Math.random() * 0.5 + 0.5}s linear forwards`;
    
    parent.appendChild(shootingStar);
    
    // Add CSS for shooting
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shoot {
            0% { 
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
            100% { 
                transform: translateX(100vw) translateY(${(Math.random() - 0.5) * 20}%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 1000);
}

// Show night sky when on future page
function showNightSky() {
    const sky = document.getElementById('night-sky');
    if (sky) {
        sky.style.opacity = '1';
    } else {
        createNightSky();
    }
}

// Hide night sky when leaving future page
function hideNightSky() {
    const sky = document.getElementById('night-sky');
    if (sky) {
        sky.style.opacity = '0';
    }
}

// Add star lighting effect for dreams in future page
function addStarEffects() {
    const dreamItems = document.querySelectorAll('#future li, #future p:not(.countdown)');
    
    dreamItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            // Create a star effect at the click position
            const star = document.createElement('div');
            const rect = this.getBoundingClientRect();
            
            star.style.position = 'fixed';
            star.style.left = `${rect.left + rect.width / 2}px`;
            star.style.top = `${rect.top + rect.height / 2}px`;
            star.style.width = '20px';
            star.style.height = '20px';
            star.style.background = 'radial-gradient(circle, yellow, orange, red)';
            star.style.borderRadius = '50%';
            star.style.boxShadow = '0 0 20px 10px rgba(255, 215, 0, 0.8)';
            star.style.zIndex = '9999';
            star.style.pointerEvents = 'none';
            star.style.animation = 'starBurst 1s forwards';
            
            document.body.appendChild(star);
            
            // Add CSS for star burst
            const style = document.createElement('style');
            style.textContent = `
                @keyframes starBurst {
                    0% { 
                        transform: scale(0);
                        opacity: 1;
                    }
                    50% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% { 
                        transform: scale(3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Remove after animation
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 1000);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add section observers to trigger special effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'future') {
                    showNightSky();
                    addStarEffects();
                }
            } else {
                if (entry.target.id === 'future') {
                    hideNightSky();
                }
            }
        });
    });
    
    const futureSection = document.getElementById('future');
    if (futureSection) {
        observer.observe(futureSection);
    }
});

// Close lightbox
function setupLightboxClose() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-lightbox');
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
}

// Function to create proposal confetti
function createProposalConfetti() {
    // Use the imported confetti library if available
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff6b9d', '#ffa3b8', '#ffffff']
        });
    } else {
        // Fallback to creating confetti manually
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createConfettiPiece();
            }, i * 50);
        }
    }
}

// Create a single confetti piece
function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.innerHTML = ['❤️', '💍', '💎', '💖', '💕'][Math.floor(Math.random() * 5)];
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
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const endX = parseFloat(confetti.style.left) + Math.cos(angle) * distance;
    const endY = window.innerHeight + 20 + Math.sin(angle) * distance;
    
    confetti.style.top = `${endY}px`;
    confetti.style.left = `${endX}px`;
    confetti.style.opacity = '0';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Remove after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 3000);
}

// Call the lightbox setup function when the page loads
setupLightboxClose();