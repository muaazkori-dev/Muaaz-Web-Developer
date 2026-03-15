// Custom Cursor Glow Effect removed in favor of floating glass shapes.

// Scroll Effects
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal Animation on Scroll
const sections = document.querySelectorAll('.bento-card');

const revealSection = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initial state for sections
sections.forEach(section => {
    if(!section.classList.contains('hero-card')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
    }
});

window.addEventListener('scroll', revealSection);
// Trigger once on load
revealSection();

// Mobile Menu Toggle logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Simple toggle for now
        // In a real app we would add a mobile menu container
        alert('Mobile menu clicked! (To be implemented fully)');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});
/* Form to WhatsApp */
function sendWhatsApp() {
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;

    if (!name || !email || !message) {
        alert("Please fill all required fields before sending.");
        return;
    }

    const myNumber = "923029111856";
    const whatsappMessage = `*New Message from Portfolio Website!*
    
*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${myNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}
