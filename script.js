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
            btn.innerHTML = 'Send via WhatsApp <i class="fab fa-whatsapp"></i>';
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

async function handleFormSubmit() {
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subjectSelectValue = document.getElementById('senderSubject').value;
    const urgency = document.getElementById('serviceUrgency');
    const urgencyValue = urgency ? urgency.value : '';
    const message = document.getElementById('senderMessage').value;

    let subject = subjectSelectValue;
    if (subjectSelectValue === 'Other') {
        subject = document.getElementById('otherSubject').value;
    }

    if (!name || !email || !message || !urgencyValue || (subjectSelectValue === 'Other' && !subject)) {
        alert("Please fill all required fields before sending.");
        return;
    }

    // Email Syntax Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address format.");
        return;
    }

    // Common Email Typo Validation
    const domain = email.split('@')[1].toLowerCase();
    const commonTypos = {
        'gmai.com': 'gmail.com',
        'g.om': 'gmail.com',
        'gamil.com': 'gmail.com',
        'gmail.co': 'gmail.com',
        'gmail.con': 'gmail.com',
        'gmail.cm': 'gmail.com',
        'gamil.con': 'gmail.com',
        'yaho.com': 'yahoo.com',
        'yahoo.co': 'yahoo.com',
        'outlok.com': 'outlook.com',
        'hotmai.com': 'hotmail.com',
        'hotmail.co': 'hotmail.com'
    };

    if (commonTypos[domain]) {
        alert(`Your email domain seems incorrect. Did you mean ${email.split('@')[0]}@${commonTypos[domain]}? Please fix it to continue.`);
        return;
    }

    const btn = document.getElementById('submitBtn');
    let originalBtnText = 'Send Message';
    if (btn) {
        originalBtnText = btn.innerHTML;
        btn.innerHTML = 'Verifying Email... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
    }

    // Live Domain Availability Check (DNS MX via Google DoH)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const data = await response.json();
        
        // Status 3 is NXDOMAIN (domain does not exist)
        if (data.Status === 3) {
            alert(`The email domain "${domain}" does not exist or is not active. Please verify your email address.`);
            if (btn) {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
            }
            return;
        }
    } catch (error) {
        console.warn('DNS lookup failed due to network, bypassing strict domain validation.');
    }

    if (btn) {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
    }

    // WhatsApp Logic
    const myPhone = "923029111856";
    const whatsappText = `*New Message from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject || 'No Subject'}\n*Urgency:* ${urgencyValue}\n\n*Message:*\n${message}`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappURL = `https://wa.me/${myPhone}?text=${encodedText}`;

    window.open(whatsappURL, '_blank');
}

// Submit Review Function
function submitReview() {
    const name = document.getElementById('reviewerName').value;
    const rating = document.getElementById('reviewRating').value;
    const comment = document.getElementById('reviewText').value;

    if (!name || !rating || !comment) {
        alert("Please fill all fields to submit your review.");
        return;
    }

    const myEmail = "muaazkori@gmail.com";
    const emailSubject = `New Customer Review from ${name}`;
    const emailBody = `Name: ${name}\nRating: ${rating} Stars ⭐\n\nReview:\n"${comment}"`;

    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoURL = `mailto:${myEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    window.open(mailtoURL, '_self');
    
    // Reset form after sending
    document.getElementById('reviewForm').reset();
    alert("Review submitted successfully via Email!");
}

// ==========================================
// 1. Dynamic Project Estimator Logic
// ==========================================
const prices = {
    landing: { base: 80, minDays: 5, maxDays: 8 },
    business: { base: 150, minDays: 8, maxDays: 12 },
    ecommerce: { base: 250, minDays: 12, maxDays: 18 },
    webapp: { base: 400, minDays: 15, maxDays: 25 }
};

const addons = {
    auth: { price: 60, days: 2 },
    payments: { price: 80, days: 2 },
    database: { price: 100, days: 4 },
    chat: { price: 40, days: 1 },
    multilang: { price: 50, days: 2 },
    seo: { price: 30, days: 1 }
};

const urgencyModifiers = {
    normal: { priceMult: 1.0, timeMult: 1.0 },
    urgent: { priceMult: 1.25, timeMult: 0.6 },
    veryurgent: { priceMult: 1.5, timeMult: 0.35 }
};

function initEstimator() {
    const radios = document.querySelectorAll('input[name="projectType"]');
    const checkboxes = document.querySelectorAll('.features-checklist input[type="checkbox"]');
    const urgencyRadios = document.querySelectorAll('input[name="urgency"]');

    if (!radios.length) return; // Prevent errors if elements aren't present yet

    // Toggle active classes on click/change
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('input[name="projectType"]').forEach(r => {
                r.closest('.option-card').classList.remove('active');
            });
            e.target.closest('.option-card').classList.add('active');
            calculateEstimate();
        });
    });

    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked) {
                e.target.closest('.feature-checkbox').classList.add('active');
            } else {
                e.target.closest('.feature-checkbox').classList.remove('active');
            }
            calculateEstimate();
        });
    });

    urgencyRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('input[name="urgency"]').forEach(r => {
                r.closest('.urgency-btn').classList.remove('active');
            });
            e.target.closest('.urgency-btn').classList.add('active');
            calculateEstimate();
        });
    });

    // Run initial calc
    calculateEstimate();
}

function calculateEstimate() {
    const typeInput = document.querySelector('input[name="projectType"]:checked');
    const urgencyInput = document.querySelector('input[name="urgency"]:checked');
    if (!typeInput || !urgencyInput) return;

    const selectedType = typeInput.value;
    const urgency = urgencyInput.value;
    
    // Base Calculations
    const baseObj = prices[selectedType];
    let totalPrice = baseObj.base;
    let minTimeline = baseObj.minDays;
    let maxTimeline = baseObj.maxDays;

    let addonsCost = 0;

    // Addons Calculations
    const checkedAddons = document.querySelectorAll('.features-checklist input[type="checkbox"]:checked');
    checkedAddons.forEach(cb => {
        const addonKey = cb.value;
        const addonObj = addons[addonKey];
        if (addonObj) {
            addonsCost += addonObj.price;
            minTimeline += addonObj.days;
            maxTimeline += addonObj.days;
        }
    });

    // Price urgency modifier
    const modifier = urgencyModifiers[urgency];
    totalPrice = Math.round((totalPrice + addonsCost) * modifier.priceMult);
    
    // Timeline urgency modifier
    minTimeline = Math.max(1, Math.round(minTimeline * modifier.timeMult));
    maxTimeline = Math.max(2, Math.round(maxTimeline * modifier.timeMult));

    // Update UI elements
    const basePriceEl = document.getElementById('summary-base-price');
    const addonsPriceEl = document.getElementById('summary-addons-price');
    const urgencyMultEl = document.getElementById('summary-urgency-multiplier');
    const totalPriceEl = document.getElementById('summary-total-price');
    const totalDurationEl = document.getElementById('summary-total-duration');

    if (basePriceEl) basePriceEl.innerText = `$${baseObj.base}`;
    if (addonsPriceEl) addonsPriceEl.innerText = `$${addonsCost}`;
    if (urgencyMultEl) urgencyMultEl.innerText = `${modifier.priceMult}x`;
    if (totalPriceEl) totalPriceEl.innerText = `$${totalPrice}`;
    if (totalDurationEl) totalDurationEl.innerText = `${minTimeline} - ${maxTimeline} Days`;
}

function bookEstimatedPackage() {
    const selectedTypeEl = document.querySelector('input[name="projectType"]:checked');
    if (!selectedTypeEl) return;
    const projectTypeName = selectedTypeEl.closest('.option-card').querySelector('strong').innerText;
    
    const checkedAddons = document.querySelectorAll('.features-checklist input[type="checkbox"]:checked');
    let addonsList = [];
    checkedAddons.forEach(cb => {
        addonsList.push(cb.closest('.feature-checkbox').querySelector('strong').innerText);
    });

    const urgencyEl = document.querySelector('input[name="urgency"]:checked');
    if (!urgencyEl) return;
    const urgencyName = urgencyEl.closest('.urgency-btn').querySelector('span').innerText;

    const totalPrice = document.getElementById('summary-total-price').innerText;
    const totalDuration = document.getElementById('summary-total-duration').innerText;

    const myPhone = "923029111856";
    let messageText = `*Hi Muaaz, I want to book a Custom Project package!* 🚀\n\n`;
    messageText += `*Project Type:* ${projectTypeName}\n`;
    messageText += `*Premium Features:* ${addonsList.length > 0 ? addonsList.join(', ') : 'None'}\n`;
    messageText += `*Urgency Status:* ${urgencyName}\n\n`;
    messageText += `*Estimated Budget:* ${totalPrice}\n`;
    messageText += `*Estimated Timeline:* ${totalDuration}\n\n`;
    messageText += `Let's discuss my custom project requirements!`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappURL = `https://wa.me/${myPhone}?text=${encodedText}`;
    window.open(whatsappURL, '_blank');
}

// ==========================================
// 2. Interactive Micro-Cursor Glow Ring
// ==========================================
function initInteractiveCursor() {
    const bubble = document.querySelector('.cursor-buble');
    const ring = document.querySelector('.cursor-ring');
    
    if (!bubble || !ring) return;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
    });
    
    // Add Hover Event Listeners to clickables
    const addCursorHoverEvents = () => {
        const hoverables = document.querySelectorAll('a, button, .project-card, .service-card, .tech-card, .form-group input, .contact-form select, .contact-form textarea, .option-card, .feature-checkbox, .urgency-btn');
        hoverables.forEach(item => {
            // Avoid duplicate listeners
            item.removeEventListener('mouseenter', onHoverEnter);
            item.removeEventListener('mouseleave', onHoverLeave);
            
            item.addEventListener('mouseenter', onHoverEnter);
            item.addEventListener('mouseleave', onHoverLeave);
        });
    };

    function onHoverEnter() {
        document.body.classList.add('cursor-hover');
    }
    
    function onHoverLeave() {
        document.body.classList.remove('cursor-hover');
    }

    addCursorHoverEvents();

    // Re-run listener attachment if dynamic content changes
    const observer = new MutationObserver(addCursorHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
}

// ==========================================
// 3. Futuristic Typing (Typewriter) Effect
// ==========================================
function initTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const words = [
        "Web Developer",
        "Custom Developer",
        "UI/UX Designer",
        "Full-Stack Engineer"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterEl.innerText = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriterEl.innerText = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // Word completed typing
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at full word
            isDeleting = true;
        } 
        // Word completed deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing
    type();
}

// ==========================================
// Initialize all features on DOM Content Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initEstimator();
    initInteractiveCursor();
    initTypewriter();
});
