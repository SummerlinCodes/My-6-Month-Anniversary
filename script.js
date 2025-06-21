// Create floating hearts with different styles and animations
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    const heartCount = 30;
    const heartStyles = ['❤', '💗', '💖', '💓', '💝'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomly select heart style
        const heartStyle = heartStyles[Math.floor(Math.random() * heartStyles.length)];
        heart.innerHTML = heartStyle;
        
        // Random position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random animation properties
        const duration = Math.random() * 8 + 8; // 8-15 seconds
        const delay = Math.random() * 5; // 0-5 seconds
        const size = Math.random() * 0.8 + 0.5; // 0.5-1.3 scale
        const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8 opacity
        const animationType = Math.random() > 0.5 ? 'float' : (Math.random() > 0.5 ? 'float2' : 'float3');
        
        // Apply styles
        heart.style.animation = `${animationType} ${duration}s linear ${delay}s infinite`;
        heart.style.opacity = opacity;
        heart.style.transform = `scale(${size})`;
        heart.style.fontSize = `${Math.random() * 10 + 15}px`; // 15-25px
        
        // Random rotation
        heart.style.transform += ` rotate(${Math.random() * 360}deg)`;
        
        // Random z-index
        heart.style.zIndex = Math.floor(Math.random() * 10);
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode === heartsContainer) {
                heart.remove();
            }
        }, 8000);
    }
}

// Create confetti effect
function createConfetti(container, x, y) {
    if (!container) container = document.body;
    
    const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#84fab0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = x !== undefined ? x + (Math.random() - 0.5) * 200 : Math.random() * 100;
        const top = y !== undefined ? y : 0;
        const animationDuration = Math.random() * 3 + 2;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = x !== undefined ? `${left}px` : `${left}%`;
        confetti.style.top = y !== undefined ? `${top}px` : '0';
        confetti.style.animation = `confetti-fall ${animationDuration}s linear forwards`;
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode === container) {
                confetti.remove();
            }
        }, animationDuration * 1000);
    }
}

// Create ripple effect on click
function createRipple(event, element) {
    if (!element) return;
    
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    // Position the ripple at the click position
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode === element) {
            ripple.remove();
        }
    }, 1000);
}

// Initialize lightbox functionality
function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="">
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add click handlers for gallery items
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('close-lightbox')) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Letter interaction
function initLetter() {
    const overlay = document.getElementById('letter-overlay');
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    const heartsContainer = document.getElementById('hearts-container');
    
    if (!overlay || !envelope || !letter || !heartsContainer) return;
    
    let isOpen = false;
    
    // Show the overlay with a nice fade-in
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
    }, 1000);
    
    // Prevent scrolling when overlay is visible
    document.body.style.overflow = 'hidden';
    
    // Initial hearts
    createHearts();
    const heartInterval = setInterval(createHearts, 2000);
    
    // Show the close prompt
    function showClosePrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'close-prompt';
        prompt.innerHTML = 'Click the letter to enter our anniversary site ❤️';
        overlay.appendChild(prompt);
        
        // Hide prompt after 5 seconds if not clicked
        const promptTimeout = setTimeout(() => {
            if (prompt.parentNode) {
                prompt.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => prompt.remove(), 500);
            }
        }, 5000);
        
        // Close handler for the letter
        const letterClickHandler = (e) => {
            e.stopPropagation();
            clearTimeout(promptTimeout);
            if (prompt.parentNode) {
                prompt.remove();
            }
            
            // Close the letter and overlay
            envelope.classList.remove('open');
            letter.style.pointerEvents = 'none';
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                document.body.style.overflow = 'auto';
                isOpen = false;
                clearInterval(heartInterval);
            }, 1000);
            
            // Remove this listener after use
            letter.removeEventListener('click', letterClickHandler);
        };
        
        // Add click handler for the letter
        letter.addEventListener('click', letterClickHandler);
    }
    
    // Handle envelope click
    function handleClick() {
        if (!isOpen) {
            // Open the envelope
            envelope.classList.add('open');
            
            // Enable letter interaction after animation
            setTimeout(() => {
                letter.style.pointerEvents = 'auto';
                isOpen = true;
                
                // Show the close prompt immediately after opening
                showClosePrompt();
                
                // Add confetti when letter is first opened
                createConfetti(overlay);
            }, 1000);
        }
    }
    
    // Add click handlers
    envelope.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isOpen) handleClick();
    });
    
    letter.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isOpen) handleClick();
    });
    
    // Add hover effect on envelope
    envelope.addEventListener('mouseenter', () => {
        if (!isOpen) {
            envelope.style.transform = 'translateY(-5px)';
            envelope.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
        }
    });
    
    envelope.addEventListener('mouseleave', () => {
        if (!isOpen) {
            envelope.style.transform = 'translateY(0)';
            envelope.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // Move hearts container to body after animation
    function moveHeartsToBody() {
        document.body.appendChild(heartsContainer);
        heartsContainer.style.position = 'fixed';
        heartsContainer.style.zIndex = '9998';
    }
    
    // Initial animation
    envelope.style.transform = 'scale(0.9) rotate(-2deg)';
    setTimeout(() => {
        envelope.style.transform = 'scale(1) rotate(0deg)';
    }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightbox
    initLightbox();
    
    // Initialize letter animation
    initLetter();
    
    // Keep creating hearts
    setInterval(createHearts, 2000);
    
    // Set the date we're counting down to (1:30 PM tomorrow)
    function getAnniversaryDate() {
        const date = new Date();
        date.setDate(date.getDate() + 1); // Tomorrow
        date.setHours(13, 30, 0, 0); // 1:30 PM
        return date;
    }
    
    const anniversaryDate = getAnniversaryDate();
    
    function updateCountdown() {
        const now = new Date();
        const distance = anniversaryDate - now;
        
        // If countdown is over
        if (distance <= 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            
            // Show "It's time!" message
            const countdownContainer = document.querySelector('.countdown');
            if (countdownContainer) {
                countdownContainer.innerHTML = "<h2>It's time! ❤️</h2>";
                // Trigger confetti
                createConfetti(countdownContainer, 
                    countdownContainer.offsetLeft + countdownContainer.offsetWidth/2, 
                    countdownContainer.offsetTop + countdownContainer.offsetHeight/2);
            }
            return;
        }
        
        // Time calculations for days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
    
    // Animate timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item, .gallery-item, .message-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add a secret message that appears when clicking on the heart in the footer
    const footerHeart = document.querySelector('footer .fa-heart');
    footerHeart.addEventListener('click', function(e) {
        e.stopPropagation();
        const secretMessage = document.createElement('div');
        secretMessage.textContent = 'I love you more than words can express! ❤️';
        secretMessage.style.position = 'fixed';
        secretMessage.style.bottom = '20px';
        secretMessage.style.right = '20px';
        secretMessage.style.background = 'rgba(255, 255, 255, 0.9)';
        secretMessage.style.padding = '15px 20px';
        secretMessage.style.borderRadius = '10px';
        secretMessage.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        secretMessage.style.zIndex = '1000';
        secretMessage.style.animation = 'fadeIn 0.5s ease-out';
        
        document.body.appendChild(secretMessage);
        
        setTimeout(() => {
            secretMessage.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                secretMessage.remove();
            }, 500);
        }, 3000);
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);
