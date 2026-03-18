// Custom Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    const blob = document.querySelector('.cursor-blob');
    if (blob) {
        blob.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }
});

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
const sections = document.querySelectorAll('.section');

const revealSection = () => {
    const triggerBottom = window.innerHeight * 0.8;

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
    if(section.id !== 'home') {
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
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
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
/* Form Submit Logic (WhatsApp for PK, Email for others) */
let userCountry = "PK"; // Default to Pakistan

async function fetchUserLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
            userCountry = data.country_code;
            
            // Multi-Language Greeting Logic
            const contactHeading = document.getElementById('contactHeading');
            const contactSubheading = document.getElementById('contactSubheading');
            
            if (contactHeading && contactSubheading) {
                // Determine language based on country for a "wow" factor
                // Middle East (Arabic)
                const arabicCountries = ['SA', 'AE', 'QA', 'KW', 'OM', 'BH', 'IQ', 'JO', 'LB', 'EG'];
                // Spanish speaking
                const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU'];
                // French speaking
                const frenchCountries = ['FR', 'CA', 'BE', 'CH', 'SN', 'CI', 'CM'];
                
                if (arabicCountries.includes(data.country_code)) {
                    contactHeading.innerHTML = `دعنا <span class="gradient-text">نتحدث</span>`; // Let's talk
                    contactSubheading.innerText = `لا تتردد في التواصل للتعاون أو فرص العمل أو مجرد إلقاء التحية.`;
                } else if (spanishCountries.includes(data.country_code)) {
                    contactHeading.innerHTML = `Ponte en <span class="gradient-text">Contacto</span>`;
                    contactSubheading.innerText = `No dudes en contactarme para colaboraciones, oportunidades o simplemente para saludar.`;
                } else if (frenchCountries.includes(data.country_code)) {
                    contactHeading.innerHTML = `Entrer en <span class="gradient-text">Contact</span>`;
                    contactSubheading.innerText = `N'hésitez pas à me contacter pour des collaborations, des opportunités ou juste pour dire bonjour.`;
                } else if (data.country_code === 'PK' || data.country_code === 'IN') {
                    // Optional: keep English or use Urdu/Hindi, sticking to English for PK as professional standard, maybe change Subheading
                    contactHeading.innerHTML = `Get In <span class="gradient-text">Touch</span>`;
                    contactSubheading.innerText = `Feel free to reach out for collaborations, gig opportunities, or just to say hi.`;
                }
            }
        }
        
        const btn = document.getElementById('submitBtn');
        if (btn) {
            if (userCountry === 'PK') {
                btn.innerHTML = 'Send via WhatsApp <i class="fab fa-whatsapp"></i>';
            } else {
                btn.innerHTML = 'Send via Email <i class="fas fa-envelope"></i>';
            }
        }
    } catch (error) {
        console.error("Error fetching location:", error);
    }
}

// Fetch location when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchUserLocation();

    const subjectSelect = document.getElementById('senderSubject');
    const otherSubjectInput = document.getElementById('otherSubject');
    
    if (subjectSelect && otherSubjectInput) {
        subjectSelect.addEventListener('change', (e) => {
            if (e.target.value === 'Other') {
                otherSubjectInput.style.display = 'block';
                otherSubjectInput.required = true;
            } else {
                otherSubjectInput.style.display = 'none';
                otherSubjectInput.required = false;
                otherSubjectInput.value = '';
            }
        });
    }
});

function handleFormSubmit() {
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subjectSelectValue = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;

    let subject = subjectSelectValue;
    if (subjectSelectValue === 'Other') {
        subject = document.getElementById('otherSubject').value;
    }

    if (!name || !email || !message || (subjectSelectValue === 'Other' && !subject)) {
        alert("Please fill all required fields before sending.");
        return;
    }

    if (userCountry === 'PK') {
        // WhatsApp Logic
        const myNumber = "923029111856";
        const whatsappMessage = `*New Message from Portfolio Website!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${myNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    } else {
        // Email Logic (mailto opens default email client)
        const myEmail = "muaazkori@gmail.com";
        const emailSubject = `New Message from Portfolio: ${subject || 'No Subject'}`;
        const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        const encodedSubject = encodeURIComponent(emailSubject);
        const encodedBody = encodeURIComponent(emailBody);
        const mailtoURL = `mailto:${myEmail}?subject=${encodedSubject}&body=${encodedBody}`;

        window.open(mailtoURL, '_self');
    }
}
