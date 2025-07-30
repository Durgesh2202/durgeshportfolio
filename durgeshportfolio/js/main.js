document.addEventListener('DOMContentLoaded', function() {
    // Preloader with enhanced animation
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
                
                // Trigger entrance animations for visible elements
                const animatedElements = document.querySelectorAll('.animate-on-load');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 100 * index);
                });
            }, 1000);
        }
    }, 3500);
    
    // Initialize particles with enhanced config if available
    if (typeof particlesJS !== 'undefined') {
        // Check if we have a custom config
        if (typeof particlesConfig !== 'undefined') {
            particlesJS('particles-js', particlesConfig);
        } else {
            // Use default enhanced config
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#00ff41"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00ff41",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: true,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 180,
                            line_linked: {
                                opacity: 0.8
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Enhanced TypeWriter Effect with smoother animations
    const typewriterText = [
        "Cybersecurity Researcher",
        "Web Penetration Tester",
        "Digital Forensics Specialist",
        "Bug Hunter",
        "OSINT Expert"
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentText = typewriterText[currentTextIndex];
        const typewriterElement = document.getElementById('typewriter-text');
        
        if (typewriterElement) {
            if (isDeleting) {
                currentCharIndex--;
                typingSpeed = 40 + Math.random() * 20; // Variable speed for more natural effect
            } else {
                currentCharIndex++;
                typingSpeed = 80 + Math.random() * 40;
            }
            
            typewriterElement.textContent = currentText.substring(0, currentCharIndex);
            
            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
                
                // Add blinking cursor effect
                typewriterElement.classList.add('end-of-text');
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typewriterText.length;
                typingSpeed = 500; // Pause before typing next
                
                // Remove blinking cursor effect
                typewriterElement.classList.remove('end-of-text');
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start TypeWriter after preloader if on homepage
    if (document.getElementById('typewriter-text')) {
        setTimeout(typeWriter, 4000);
    }
    
    // 3D card tilt effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardX = e.clientX - cardRect.left;
            const cardY = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (cardY - centerY) / 10;
            const rotateY = -(cardX - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add highlight effect
            const cardInner = card.querySelector('.project-card-inner');
            if (cardInner) {
                const shine = `radial-gradient(circle at ${cardX}px ${cardY}px, rgba(0, 255, 65, 0.2) 0%, rgba(0, 0, 0, 0) 80%)`;
                cardInner.style.backgroundImage = shine;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const cardInner = card.querySelector('.project-card-inner');
            if (cardInner) {
                cardInner.style.backgroundImage = 'none';
            }
        });
        
        // Animated icon effect
        const icon = card.querySelector('.project-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.classList.add('pulse-animation');
            });
            
            card.addEventListener('mouseleave', () => {
                icon.classList.remove('pulse-animation');
            });
        }
    });
    
    // Testimonial Slider with enhanced transitions
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    
    if (testimonialDots.length > 0 && testimonialSlides.length > 0) {
        // Enhanced slide transition
        function transitionToSlide(index) {
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            // First move current slide out
            testimonialSlides.forEach(slide => {
                if (slide.classList.contains('active')) {
                    slide.classList.add('sliding-out');
                    slide.classList.remove('active');
                    
                    setTimeout(() => {
                        slide.classList.remove('sliding-out');
                    }, 500);
                }
            });
            
            // Then bring new slide in
            setTimeout(() => {
                testimonialSlides[index].classList.add('active');
                testimonialDots[index].classList.add('active');
            }, 300);
        }
        
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = this.getAttribute('data-index');
                transitionToSlide(parseInt(slideIndex));
            });
        });
        
        // Auto-advance testimonials with smooth transitions
        let testimonialIndex = 0;
        function nextTestimonial() {
            testimonialIndex = (testimonialIndex + 1) % testimonialDots.length;
            transitionToSlide(testimonialIndex);
        }
        
        setInterval(nextTestimonial, 7000);
    }
    
    // Form Submission with Formspree AJAX integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Animate button during sending
            const submitBtn = this.querySelector('.submit-btn');
            const formStatus = this.querySelector('.form-status');
            
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-circle-notch fa-spin"></i>';
            submitBtn.disabled = true;
            submitBtn.classList.add('submitting');
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit to Formspree via AJAX
            fetch('https://formspree.io/f/xqalbolp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success
                    submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
                    submitBtn.classList.remove('submitting');
                    submitBtn.classList.add('success');
                    
                    // Show success message
                    if (formStatus) {
                        formStatus.innerHTML = '<p style="color: var(--primary-color); margin-top: 1rem;"><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.</p>';
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                        if (formStatus) {
                            formStatus.innerHTML = '';
                        }
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(error => {
                // Error
                submitBtn.innerHTML = '<span>Try Again</span> <i class="fas fa-exclamation-triangle"></i>';
                submitBtn.disabled = false;
                submitBtn.classList.remove('submitting');
                submitBtn.classList.add('error');
                
                // Show error message
                if (formStatus) {
                    formStatus.innerHTML = '<p style="color: var(--accent-color); margin-top: 1rem;"><i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.</p>';
                }
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                    submitBtn.classList.remove('error');
                    if (formStatus) {
                        formStatus.innerHTML = '';
                    }
                }, 5000);
            });
        });
    }
    
    // Always update footer information with correct date and user
    const lastUpdatedElement = document.querySelector('.last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = "Last updated: 2025-07-27 16:47:47";
    }
    
    const currentUserElement = document.querySelector('.current-user');
    if (currentUserElement) {
        currentUserElement.textContent = "Logged in as: Durgesh2202";
    }
    
    // Scroll animations for sections
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('section-visible');
            }
        });
        
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    };
    
    // Run on scroll and initial load
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 500);
});