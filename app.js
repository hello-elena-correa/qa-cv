/**
 * Elena Correa Portfolio - Interactive Script
 * Handles scroll effects, timelines, progress bars, and modal forms.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Dom Elements ---
    const header = document.getElementById('main-header');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const contactModal = document.getElementById('contact-modal');
    const btnGetInTouch = document.getElementById('btn-get-in-touch');
    const btnBookCall = document.getElementById('btn-book-call');
    const pillConsultation = document.getElementById('pill-consultation');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const consultationForm = document.getElementById('consultation-form');
    const formSuccessAlert = document.getElementById('form-success-alert');
    
    const emailAddress = document.getElementById('email-address');
    const copyToast = document.getElementById('copy-toast');

    // ==========================================
    // 1. Dynamic Header Scroll State
    // ==========================================
    const checkHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll(); // Initial check

    // ==========================================
    // 2. Responsive Mobile Menu
    // ==========================================
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Toggle body scroll freeze
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on click of nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 3. Smooth Scroll Navigation
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 4. Scroll-Triggered Fade-In Animations
    // ==========================================
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after showing
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // ==========================================
    // 5. Scroll-Triggered Progress Bars
    // ==========================================
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fillElement = entry.target;
                const targetWidth = fillElement.getAttribute('data-progress');
                fillElement.style.width = targetWidth;
                progressObserver.unobserve(fillElement);
            }
        });
    }, {
        threshold: 0.2
    });

    progressFills.forEach(fill => {
        progressObserver.observe(fill);
    });

    // ==========================================
    // 6. Interactive Modals (Get in Touch / Consultations)
    // ==========================================
    const openModal = () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset states
        if (consultationForm) consultationForm.style.display = 'flex';
        if (formSuccessAlert) formSuccessAlert.style.display = 'none';
    };

    const closeModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners for modal triggers
    if (btnGetInTouch) btnGetInTouch.addEventListener('click', openModal);
    if (btnBookCall) btnBookCall.addEventListener('click', openModal);
    if (pillConsultation) pillConsultation.addEventListener('click', openModal);
    
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal on click of grey overlay background
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // Modal Form Submission Simulation
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading animation on button
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting Request...';
            submitBtn.disabled = true;

            // Simulate server network delay
            setTimeout(() => {
                // Transition views
                consultationForm.style.display = 'none';
                formSuccessAlert.style.display = 'flex';
                
                // Reset form values
                consultationForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Close modal after 3 seconds on success
                setTimeout(() => {
                    closeModal();
                }, 3000);

            }, 1200);
        });
    }

    // ==========================================
    // 7. Clipboard Copy for Contact Email
    // ==========================================
    if (emailAddress && copyToast) {
        emailAddress.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent opening local mail app

            const emailText = emailAddress.textContent;
            
            navigator.clipboard.writeText(emailText).then(() => {
                // Show custom toast notification
                copyToast.classList.add('show');
                
                // Hide toast after 3 seconds
                setTimeout(() => {
                    copyToast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                // Fallback to default link action if copy fails
                window.location.href = `mailto:${emailText}`;
            });
        });
    }
});
