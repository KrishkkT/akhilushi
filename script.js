// DOM Elements
const heartsContainer = document.getElementById('heartsContainer');
const floatingHeartsContainer = document.getElementById('floatingHearts');
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
    enhancedCompliments();
    setupVideoFunctionality();
    
    // Initialize music state
    setTimeout(() => {
        // Initialize music flags if not set
        if (window.wasMusicPlaying === undefined) {
            window.wasMusicPlaying = false;
        }
        
        updateMusicButtonState(); // Ensure button reflects actual state
        checkCurrentSection(); // Apply section-specific music rules
    }, 1000); // Slight delay to ensure everything is loaded
});

// Setup video functionality
function setupVideoFunctionality() {
    // Get the best moments video element
    const bestMomentVideo = document.getElementById('bestMomentVideo');
    
    if (bestMomentVideo) {
        // Configure video properties
        bestMomentVideo.loop = true;
        bestMomentVideo.muted = true; // Start muted due to autoplay policies
        
        // Attempt to play the video when the section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Try to play the video with error handling
                    bestMomentVideo.play().catch(error => {
                        console.log('Autoplay prevented:', error);
                        // If autoplay fails, show a message
                        showTemporaryMessage("Video autoplay blocked. Click the video to play.");
                    });
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible
        
        // Observe the video element
        observer.observe(bestMomentVideo.closest('.timeline-item'));
        
        // Add click to play functionality
        bestMomentVideo.addEventListener('click', function() {
            if (this.paused) {
                this.play().catch(error => {
                    console.log('Play error:', error);
                });
            } else {
                this.pause();
            }
        });
    }
    
    // Setup reel video functionality
    const reelVideo = document.getElementById('reelVideo');
    if (reelVideo) {
        // Configure video properties
        reelVideo.loop = true;
        reelVideo.muted = true; // Start muted due to autoplay policies
        
        // Attempt to play when section becomes visible
        const reelObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Only play if we're currently on the story section
                    const storySection = sections.story;
                    const storyVisible = !storySection.classList.contains('hidden');
                    
                    if (storyVisible) {
                        // First, unmute the reel video since we want sound on the story page
                        reelVideo.muted = false;
                        
                        reelVideo.play().then(() => {
                            console.log('Reel video playing with sound via intersection');
                        }).catch(error => {
                            console.log('Reel autoplay prevented:', error);
                            showTemporaryMessage("Reel autoplay blocked. Click the video to play.");
                            // Try to play muted if sound fails
                            reelVideo.muted = true;
                            reelVideo.play().catch(error2 => {
                                console.log('Could not play reel video even muted:', error2);
                            });
                        });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the reel video element
        reelObserver.observe(reelVideo.closest('.timeline-item'));
        
        reelVideo.addEventListener('click', function() {
            // Toggle mute state
            this.muted = !this.muted;
            
            if (this.paused) {
                this.play().catch(error => {
                    console.log('Play error:', error);
                });
            } else {
                this.pause();
            }
            
            // Show a temporary message about mute/unmute
            if (this.muted) {
                showTemporaryMessage("Video muted 🔇");
            } else {
                showTemporaryMessage("Video unmuted 🔊");
            }
        });
    }
    
    // Add error handling for videos
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.loop = true; // Enable looping for all videos
        
        // Handle video loading errors
        video.addEventListener('error', function(e) {
            console.error('Video failed to load:', e.target.src);
            showTemporaryMessage("Video couldn't load. It may be unavailable.");
        });
        
        // Only add the general click handler if it's not the reel video
        if (video.id !== 'reelVideo') {
            video.addEventListener('click', function() {
                // Toggle mute state
                this.muted = !this.muted;
                
                // Show a temporary message about mute/unmute
                if (this.muted) {
                    showTemporaryMessage("Video muted 🔇");
                } else {
                    showTemporaryMessage("Video unmuted 🔊");
                }
            });
        }
    });
}

// Initialize floating hearts animation
function initFloatingHearts() {
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        createHeart();
    }
    
    // Keep creating hearts periodically
    setInterval(createHeart, 800);
    
    // Start the new floating hearts
    startFloatingHearts();
}

// Create romantic floating hearts in the background
function createFloatingHeart() {
    if (!floatingHeartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    // Random heart emoji
    const hearts = ['❤️', '💖', '💕', '💘', '💝', '💗', '💓', '💞'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Random position
    const startPosition = Math.random() * 100;
    heart.style.left = `${startPosition}%`;
    
    // Random size
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = `${size}px`;
    
    // Random animation duration
    const duration = Math.random() * 10 + 10;
    heart.style.animationDuration = `${duration}s`;
    
    floatingHeartsContainer.appendChild(heart);
    
    // Remove after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, duration * 1000);
}

// Start creating floating hearts periodically
function startFloatingHearts() {
    if (!floatingHeartsContainer) return;
    
    // Create initial floating hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 500);
    }
    
    // Continue creating floating hearts periodically
    setInterval(createFloatingHeart, 800);
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
    
    // Romantic mood changes
    setInterval(changeRomanticMood, 30000); // Every 30 seconds
    
    // Surprise confetti on special occasions
    setInterval(checkForSpecialSurprises, 60000); // Every minute
}

// Change romantic mood periodically
function changeRomanticMood() {
    const moods = [
        { bg: 'linear-gradient(135deg, #fff5f5, #f5f0ff)', color: '#ff6b9d' },
        { bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', color: '#ec4899' },
        { bg: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', color: '#0ea5e9' },
        { bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', color: '#22c55e' }
    ];
    
    const mood = moods[Math.floor(Math.random() * moods.length)];
    document.body.style.background = `${mood.bg}, ${mood.bg.replace('135deg', '45deg')}`;
    
    // Temporarily change accent color
    const tempStyle = document.createElement('style');
    tempStyle.textContent = `
        .nav-link, .main-title, .subtitle, .cta-button {
            color: ${mood.color} !important;
        }
    `;
    document.head.appendChild(tempStyle);
    
    // Revert after delay
    setTimeout(() => {
        if (tempStyle.parentNode) {
            tempStyle.parentNode.removeChild(tempStyle);
        }
    }, 5000);
}

// Check for special surprises
function checkForSpecialSurprises() {
    if (Math.random() > 0.7) { // 30% chance every minute
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 21 || hour <= 5) { // Evening/night
            createConfettiRain();
            showTemporaryMessage("Stargazing time... You shine brighter than any star ✨");
        } else if (hour >= 6 && hour <= 10) { // Morning
            showTemporaryMessage("Good morning sunshine! ☀️");
        } else if (hour >= 12 && hour <= 14) { // Lunch time
            showTemporaryMessage("Hope your lunch is as delightful as you are!");
        } else if (hour >= 17 && hour <= 19) { // Evening
            showTemporaryMessage("Sunset time! But you're more beautiful than any sunset 🌅");
        }
    }
}

// Create confetti rain effect
function createConfettiRain() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece();
        }, i * 100);
    }
}

// Enhanced compliment system
function enhancedCompliments() {
    const enhancedComplimentsList = [
        "You're my favorite thought",
        "You make my heart skip a beat",
        "You're my sunshine on cloudy days",
        "With you, I've found my home",
        "You're my today and all of my tomorrows",
        "You're the missing piece I didn't know I needed",
        "You're my happy place",
        "You make ordinary moments magical",
        "You're my favorite hello and hardest goodbye",
        "You're the best thing that ever happened to me"
    ];
    
    // Show a random enhanced compliment every 2 minutes
    setInterval(() => {
        if (Math.random() > 0.5) { // 50% chance
            const compliment = enhancedComplimentsList[Math.floor(Math.random() * enhancedComplimentsList.length)];
            showTemporaryMessage(compliment);
        }
    }, 120000); // Every 2 minutes
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
    
    // Music toggle button
    musicToggle.addEventListener('click', toggleMusic);
    
    // Auto-start music on first interaction
    document.addEventListener('click', function enableMusic() {
        if (backgroundMusic.paused) {
            // Restore the saved playback position if we have one
            if (window.savedMusicTime !== undefined) {
                backgroundMusic.currentTime = window.savedMusicTime;
            }
            
            backgroundMusic.play().then(() => {
                window.wasMusicPlaying = true; // Update the flag
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('music-playing', 'music-pulse');
            }).catch(error => {
                console.log('Autoplay prevented on first interaction:', error);
                musicToggle.textContent = '🎵';
                showTemporaryMessage("Browser blocked autoplay. Press 'M' key or click music button to start.");
                window.wasMusicPlaying = false; // Update the flag
            });
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
    
    // Letter envelope click with animated opening and magical effects
    letterEnvelope.addEventListener('click', () => {
        // Create magical sparkles
        createMagicalSparkles();
        
        // Animate envelope opening
        letterEnvelope.style.animation = 'envelopeOpen 1s ease forwards';
        
        setTimeout(() => {
            letterEnvelope.classList.add('hidden');
            letterContent.classList.remove('hidden');
            
            // Add entrance animation
            letterContent.style.animation = 'letterReveal 1s ease forwards';
            
            // Reveal letter text with romantic effects
            revealLetterText();
            
            // Create floating hearts around the letter
            createLetterHearts();
        }, 800);
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
    
    // Check and update music/video state based on current section
    checkCurrentSection();
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
    
    // Check and update music/video state based on current section
    checkCurrentSection();
    
    // Stop the landing page timers
    clearTimeout(autoMessageTimer);
    clearTimeout(buttonShakeTimer);
    clearTimeout(waitingMessageTimer);
}

// Toggle background music
function toggleMusic() {
    if (backgroundMusic.paused) {
        // Restore the saved playback position if we have one
        if (window.savedMusicTime !== undefined) {
            backgroundMusic.currentTime = window.savedMusicTime;
        }
        
        backgroundMusic.play().then(() => {
            window.wasMusicPlaying = true; // Update the flag
            musicToggle.textContent = '🔊';
            musicToggle.classList.add('music-playing', 'music-pulse');
            showTemporaryMessage("Music on! Let's dance 💃");
        }).catch(error => {
            console.log('Autoplay prevented:', error);
            showTemporaryMessage("Browser blocked autoplay. Click anywhere to start music.");
            // Update button state to reflect actual music state
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('music-playing', 'music-pulse');
            window.wasMusicPlaying = false; // Update the flag
        });
    } else {
        // Save the current playback position before pausing
        window.savedMusicTime = backgroundMusic.currentTime;
        window.wasMusicPlaying = false; // Update the flag
        
        backgroundMusic.pause();
        musicToggle.textContent = '🎵';
        musicToggle.classList.remove('music-playing', 'music-pulse');
        showTemporaryMessage("Music paused ⏸️");
    }
}

// Manage music based on current section
function checkCurrentSection() {
    const storySection = sections.story;
    const reelVideo = document.getElementById('reelVideo');
    
    // Check if story section is currently visible
    const storyVisible = !storySection.classList.contains('hidden');
    
    if (reelVideo) {
        if (storyVisible) {
            // If story section is visible, pause background music and play reel video
            if (!backgroundMusic.paused) {
                // Save the current playback position and state before pausing
                window.savedMusicTime = backgroundMusic.currentTime;
                window.wasMusicPlaying = true; // Remember that music was playing
                backgroundMusic.pause();
                updateMusicButtonState();
            }
            
            // First, unmute the reel video since we want sound on the story page
            reelVideo.muted = false;
            
            // Try to play reel video
            reelVideo.play().then(() => {
                console.log('Reel video playing with sound');
            }).catch(error => {
                console.log('Could not play reel video:', error);
                // If we can't play with sound, try to play muted
                reelVideo.muted = true;
                reelVideo.play().catch(error2 => {
                    console.log('Could not play reel video even muted:', error2);
                });
            });
        } else {
            // If story section is not visible, pause reel video and mute it
            reelVideo.pause();
            reelVideo.muted = true;
        }
    }
    
    // Always handle background music state appropriately
    // If we're not on the story page, restore the music based on previous state
    if (!storyVisible) {
        // Small delay to ensure video is properly paused before resuming music
        setTimeout(() => {
            if (window.wasMusicPlaying) {  // If music was playing before
                // Restore the saved playback position if we have one
                if (window.savedMusicTime !== undefined) {
                    backgroundMusic.currentTime = window.savedMusicTime;
                }
                
                backgroundMusic.play().catch(error => {
                    console.log('Could not resume background music:', error);
                });
                updateMusicButtonState();
            }
        }, 100);
    }
}

// Override the navigateToSection function to handle music
function navigateToSectionWithMusic(sectionId) {
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
    
    // Check and update music/video state based on current section
    checkCurrentSection();
}

// Update navigation links to use the new function
const updateNavigation = () => {
    navLinks.forEach(link => {
        link.removeEventListener('click', navigateToSection); // Remove old listener
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.getAttribute('data-section');
            navigateToSectionWithMusic(targetSection);
        });
    });
};

// Call updateNavigation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavigation);
} else {
    updateNavigation();
}

// Update music button visuals based on playback state
function updateMusicButtonState() {
    if (backgroundMusic && !backgroundMusic.paused) {
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('music-playing', 'music-pulse');
    } else {
        musicToggle.textContent = '🎵';
        musicToggle.classList.remove('music-playing', 'music-pulse');
    }
}

// Listen for music state changes
if (backgroundMusic) {
    backgroundMusic.addEventListener('play', updateMusicButtonState);
    backgroundMusic.addEventListener('pause', updateMusicButtonState);
}

// Initialize the music button state
setTimeout(updateMusicButtonState, 500); // Small delay to ensure DOM is ready

// Enhanced music controls with volume
function setupMusicControls() {
    // Set initial volume
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3;
        
        // Handle music errors
        backgroundMusic.addEventListener('error', function() {
            console.log('Music file not found or failed to load');
            musicToggle.textContent = '🔇';
            musicToggle.disabled = true;
            musicToggle.title = 'Music unavailable';
        });
        
        // Handle music ended (loop should restart, but just in case)
        backgroundMusic.addEventListener('ended', function() {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        });
    }
}

// Initialize music controls
setupMusicControls();

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
        case 'm':
            if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                // Toggle music with M key
                toggleMusic();
                e.preventDefault(); // Prevent any default behavior
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
    
    // Position randomly on left or right side
    const isLeftSide = Math.random() > 0.5;
    const verticalPosition = 20 + Math.random() * 60; // 20-80% from top
    
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = `${verticalPosition}%`;
    messageDiv.style.transform = 'translateY(-50%)';;
    
    if (isLeftSide) {
        messageDiv.style.left = '30px';
        messageDiv.style.right = 'auto';
        messageDiv.style.animation = 'slideInFromLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), fadeOutSide 0.5s ease 2.8s forwards';
    } else {
        messageDiv.style.right = '30px';
        messageDiv.style.left = 'auto';
        messageDiv.style.animation = 'slideInFromRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), fadeOutSide 0.5s ease 2.8s forwards';
    }
    
    messageDiv.style.backgroundColor = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 247, 0.95))';
    messageDiv.style.padding = '1.2rem 2rem';
    messageDiv.style.borderRadius = '25px';
    messageDiv.style.boxShadow = 
        '0 10px 30px rgba(255, 107, 157, 0.25), '
        + '0 5px 15px rgba(0, 0, 0, 0.1), '
        + 'inset 0 2px 5px rgba(255, 255, 255, 0.5)';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.fontStyle = 'italic';
    messageDiv.style.color = '#ff6b9d';
    messageDiv.style.pointerEvents = 'none';
    messageDiv.style.maxWidth = '280px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.backdropFilter = 'blur(15px)';
    messageDiv.style.border = '2px solid rgba(255, 107, 157, 0.15)';
    messageDiv.style.fontSize = '1.05rem';
    
    document.body.appendChild(messageDiv);
    
    // Remove after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3300);
}

// Add fadeOut animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInFromLeft {
        0% { 
            transform: translateX(-100%) translateY(-50%);
            opacity: 0;
            filter: blur(5px);
        }
        70% {
            filter: blur(1px);
        }
        100% { 
            transform: translateX(0) translateY(-50%);
            opacity: 1;
            filter: blur(0);
        }
    }
    
    @keyframes slideInFromRight {
        0% { 
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
            filter: blur(5px);
        }
        70% {
            filter: blur(1px);
        }
        100% { 
            transform: translateX(0) translateY(-50%);
            opacity: 1;
            filter: blur(0);
        }
    }
    
    @keyframes fadeOutSide {
        0% { 
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }
        100% { 
            opacity: 0;
            transform: translateY(-50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Create romantic effect for lightbox
function createRomanticLightboxEffect() {
    // Create floating hearts around the lightbox
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💕', '💖', '💘'][Math.floor(Math.random() * 4)];
            heart.style.position = 'fixed';
            heart.style.fontSize = `${Math.random() * 20 + 15}px`;
            heart.style.zIndex = '10002';
            heart.style.pointerEvents = 'none';
            heart.style.opacity = '0';
            
            // Position around the edges of the screen
            const positions = [
                {left: `${Math.random() * 20}%`, top: '0'},
                {left: `${Math.random() * 20}%`, top: '100vh'},
                {left: '0', top: `${Math.random() * 20}%`},
                {left: '100vw', top: `${Math.random() * 20}%`}
            ];
            
            const pos = positions[Math.floor(Math.random() * positions.length)];
            heart.style.left = pos.left;
            heart.style.top = pos.top;
            
            document.body.appendChild(heart);
            
            // Animate to center
            setTimeout(() => {
                heart.style.transition = 'all 1.5s ease-in-out';
                heart.style.opacity = '0.8';
                
                // Move toward center
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                heart.style.left = `${centerX}px`;
                heart.style.top = `${centerY}px`;
            }, 10);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 200);
    }
}

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
                    
                    // Add romantic surprise effect
                    createRomanticLightboxEffect();
                    
                    // Add random emotional caption
                    const randomEmotionalCaptions = [
                        "You mean the world to me",
                        "I'm grateful for moments like these",
                        "This memory is precious to me",
                        "You make everything better",
                        "Every moment with you is treasured",
                        "These memories warm my heart",
                        "You're the best part of my day",
                        "I fall in love with you all over again looking at this"
                    ];
                    
                    const randomCaption = randomEmotionalCaptions[Math.floor(Math.random() * randomEmotionalCaptions.length)];
                    lightboxCaption.textContent += " - " + randomCaption;
                });
            }
        }
    }
    
    // Add romantic surprise when hovering over gallery items
    if (e.target.closest('.polaroid')) {
        const polaroid = e.target.closest('.polaroid');
        
        // Create subtle romantic effect on hover
        const effect = document.createElement('div');
        effect.innerHTML = ['💕', '💖', '💞'][Math.floor(Math.random() * 3)];
        effect.style.position = 'absolute';
        effect.style.left = `${Math.random() * 100}%`;
        effect.style.top = `${Math.random() * 100}%`;
        effect.style.fontSize = '1.5rem';
        effect.style.opacity = '0.7';
        effect.style.pointerEvents = 'none';
        effect.style.transition = 'all 1s ease';
        effect.style.zIndex = '999';
        
        polaroid.style.position = 'relative';
        polaroid.appendChild(effect);
        
        // Fade out after delay
        setTimeout(() => {
            if (effect.parentNode) {
                effect.style.opacity = '0';
                effect.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (effect.parentNode) {
                        effect.parentNode.removeChild(effect);
                    }
                }, 1000);
            }
        }, 1000);
    }
}

// Update days counter since we met
function updateDaysCounter() {
    // For now, using a fixed date - you can change this to your actual date
    const meetDate = new Date('2026-01-02'); // Change this to your actual date
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

// Reveal letter text with magical effects
function revealLetterText() {
    const letterBody = document.getElementById('letterBody');
    const letterLines = [
        "My dearest Aayushi,",
        "Every moment with you feels like magic.",
        "Your smile lights up my darkest days,",
        "and your laugh is my favorite melody.",
        "",
        "I never believed in love at first sight,",
        "until I saw you.",
        "You are my today, my tomorrow, my forever.",
        "",
        "Things I'm scared to say:",
        "I love you more than words can express.",
        "You mean everything to me.",
        "I promise to cherish you always.",
        "",
        "I don't need perfection.",
        "I just need you.",
        "Forever and always.",
        "<span class='blinking-cursor'>|</span>"
    ];
    
    letterBody.innerHTML = ''; // Clear existing content
    
    letterLines.forEach((line, index) => {
        const p = document.createElement('p');
        p.innerHTML = line;
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'all 0.8s ease';
        letterBody.appendChild(p);
        
        // Schedule appearance with magical effects
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
            p.style.color = '#ff6b9d'; // Romantic pink color
            
            // Add sparkle effect
            if (line.trim() !== '' && !line.includes('cursor')) {
                createLineSparkles(p);
            }
        }, index * 600); // Faster reveal
    });
    
    // Add blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        .blinking-cursor {
            animation: blink 1s infinite;
            color: #ff6b9d;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Create magical sparkles
function createMagicalSparkles() {
    const container = document.querySelector('.letters .container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '💫', '🌟', '💖', '💕'][Math.floor(Math.random() * 5)];
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.fontSize = `${Math.random() * 20 + 15}px`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = `sparkleFloat ${Math.random() * 2 + 2}s ease-out forwards`;
            sparkle.style.opacity = '0';
            
            container.appendChild(sparkle);
            
            // Fade in
            setTimeout(() => {
                sparkle.style.opacity = '1';
            }, 50);
            
            // Remove after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, i * 100);
    }
    
    // Add CSS for sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% { 
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create floating hearts around the letter
function createLetterHearts() {
    const letterSection = document.getElementById('letters');
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${Math.random() * 25 + 15}px`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9998';
            heart.style.animation = `heartFloat ${Math.random() * 3 + 4}s ease-out forwards`;
            heart.style.opacity = '0';
            
            letterSection.appendChild(heart);
            
            // Fade in
            setTimeout(() => {
                heart.style.opacity = '0.7';
            }, 50);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }, i * 200);
    }
    
    // Add CSS for heart animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% { 
                transform: translateY(50px) scale(0);
                opacity: 0;
            }
            20% { 
                transform: translateY(0) scale(1);
                opacity: 0.7;
            }
            80% { 
                transform: translateY(-30px) scale(1);
                opacity: 0.7;
            }
            100% { 
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create sparkles for each line
function createLineSparkles(element) {
    const rect = element.getBoundingClientRect();
    const container = document.querySelector('.letters .container');
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
            sparkle.style.top = `${rect.top + rect.height/2}px`;
            sparkle.style.fontSize = '15px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'lineSparkle 1s ease-out forwards';
            
            container.appendChild(sparkle);
            
            // Remove after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 200);
    }
    
    // Add CSS for line sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes lineSparkle {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1.5) rotate(180deg);
                opacity: 0;
            }
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

// Show simple effects when on future page
function showFutureMagic() {
    // Simple background enhancement
    const futureSection = document.getElementById('future');
    futureSection.style.background = 'linear-gradient(135deg, #5a67d8, #805ad5)';
}

// Hide effects when leaving future page
function hideFutureMagic() {
    const futureSection = document.getElementById('future');
    futureSection.style.background = '';
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
                    showFutureMagic();
                    addStarEffects();
                }
            } else {
                if (entry.target.id === 'future') {
                    hideFutureMagic();
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

// Setup keyboard hint panel
function setupKeyboardHint() {
    const hintPanel = document.getElementById('keyboardHint');
    const closeBtn = document.getElementById('closeHint');
    
    // Show hint initially for first-time visitors
    const hasSeenHint = localStorage.getItem('hasSeenKeyboardHint');
    if (!hasSeenHint) {
        setTimeout(() => {
            hintPanel.classList.remove('hidden-panel');
        }, 5000); // Show after 5 seconds
        
        // Mark as seen after 30 seconds or when closed
        setTimeout(() => {
            localStorage.setItem('hasSeenKeyboardHint', 'true');
        }, 30000);
    }
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        hintPanel.classList.add('hidden-panel');
        localStorage.setItem('hasSeenKeyboardHint', 'true');
    });
    
    // Auto-hide after 30 seconds if not closed
    setTimeout(() => {
        if (!localStorage.getItem('hasSeenKeyboardHint')) {
            hintPanel.classList.add('hidden-panel');
        }
    }, 30000);
}

// Call the lightbox setup function when the page loads
setupLightboxClose();

// Setup keyboard hint panel
setupKeyboardHint();