document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // 3. Service Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. "Book This Service" Pre-fill & Scroll to Quote Builder
    const selectServiceBtns = document.querySelectorAll('.select-service-btn');
    const serviceSelect = document.getElementById('serviceType');
    const quoteSection = document.getElementById('quote');

    selectServiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenService = btn.getAttribute('data-service');
            if (serviceSelect && chosenService) {
                serviceSelect.value = chosenService;
            }
            if (quoteSection) {
                quoteSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. WhatsApp Quote Builder (Barney: 27766173022 | Flip: 27624420524)
    const quoteForm = document.getElementById('quoteForm');
    const sendFlipBtn = document.getElementById('sendFlipBtn');

    function sendWhatsAppDispatch(recipientPhone, recipientName) {
        const name = document.getElementById('clientName').value.trim();
        const service = document.getElementById('serviceType').value;
        const pickup = document.getElementById('pickupLoc').value.trim();
        const dropoff = document.getElementById('dropoffLoc').value.trim();
        const notes = document.getElementById('loadNotes').value.trim();

        if (!name || !pickup || !dropoff) {
            alert('Please fill in your Name, Pickup Town, and Drop-off Town before sending.');
            return;
        }

        const message =
            `Hi ${recipientName}, I would like a quote from *Supreme Body Works Towing & Recovery*:\n\n` +
            `*Name:* ${name}\n` +
            `*Service:* ${service}\n` +
            `*Pickup:* ${pickup}\n` +
            `*Drop-off:* ${dropoff}\n` +
            `*Details:* ${notes || 'Standard load'}`;

        const whatsappUrl = `https://wa.me/${recipientPhone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener');
    }

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sendWhatsAppDispatch('27766173022', 'Barney');
        });
    }

    if (sendFlipBtn) {
        sendFlipBtn.addEventListener('click', () => {
            sendWhatsAppDispatch('27624420524', 'Flip');
        });
    }

    // 6. Fleet Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const mediaCards = document.querySelectorAll('.media-card');

    mediaCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const caption = card.getAttribute('data-caption');
            if (lightbox && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption || '';
                lightbox.classList.add('open');
                lightbox.setAttribute('aria-hidden', 'false');
            }
        });
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // 7. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
});