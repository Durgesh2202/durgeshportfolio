// Enhanced Testimonial Slider with Left/Right Navigation
document.addEventListener('DOMContentLoaded', function() {
    const testimonialTrack = document.querySelector('.testimonials-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialTrack && testimonialSlides.length > 0) {
        let currentIndex = 0;
        let slideWidth = testimonialSlides[0].clientWidth;
        let autoplayInterval;
        
        // Set initial position
        testimonialTrack.style.transform = `translateX(0)`;
        
        // Update dots
        function updateDots() {
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            updateDots();
            
            // Reset autoplay timer
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        // Handle next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonialSlides.length;
            goToSlide(currentIndex);
        }
        
        // Handle previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
            goToSlide(currentIndex);
        }
        
        // Start autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds delay
        }
        
        // Initialize
        updateDots();
        startAutoplay();
        
        // Event listeners for navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
            });
        }
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
        
        // Pause autoplay on hover
        testimonialTrack.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', function() {
            startAutoplay();
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            slideWidth = testimonialSlides[0].clientWidth;
            testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        });
    }
});