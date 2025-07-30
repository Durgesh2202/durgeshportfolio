// Enhanced Neural Connection Effects
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    const cursorPulse = document.createElement('div');
    
    cursor.classList.add('custom-cursor');
    cursorDot.classList.add('cursor-dot');
    cursorPulse.classList.add('cursor-pulse');
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorPulse);
    
    // Neural connections array - INCREASED MAX CONNECTIONS
    const maxConnections = 8; // Increased from 5
    const connections = [];
    
    // Create initial connections
    for (let i = 0; i < maxConnections; i++) {
        const connection = document.createElement('div');
        connection.classList.add('neural-connection');
        document.body.appendChild(connection);
        connections.push({
            element: connection,
            targetX: 0,
            targetY: 0,
            active: false,
            length: 0,
            angle: 0
        });
    }
    
    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let nearbyParticles = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        cursorPulse.style.left = mouseX + 'px';
        cursorPulse.style.top = mouseY + 'px';
        
        // Find nearby particles if particles.js is active
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const particles = window.pJSDom[0].pJS.particles.array;
            const canvasPos = document.getElementById('particles-js').getBoundingClientRect();
            
            nearbyParticles = [];
            
            particles.forEach(particle => {
                const particleX = particle.x + canvasPos.left;
                const particleY = particle.y + canvasPos.top;
                const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2));
                
                if (distance < 250) { // Increased detection radius
                    nearbyParticles.push({
                        x: particleX,
                        y: particleY,
                        distance: distance
                    });
                }
            });
            
            // Sort by distance and take the closest ones
            nearbyParticles.sort((a, b) => a.distance - b.distance);
            nearbyParticles = nearbyParticles.slice(0, maxConnections);
            
            // Update connections
            connections.forEach((connection, index) => {
                if (index < nearbyParticles.length) {
                    const target = nearbyParticles[index];
                    
                    // Calculate position, angle, length
                    const dx = target.x - mouseX;
                    const dy = target.y - mouseY;
                    const angle = Math.atan2(dy, dx);
                    const length = Math.sqrt(dx * dx + dy * dy);
                    
                    // Update connection visual
                    connection.element.style.width = `${length}px`;
                    connection.element.style.left = `${mouseX}px`;
                    connection.element.style.top = `${mouseY}px`;
                    connection.element.style.transform = `rotate(${angle}rad)`;
                    
                    // ENHANCED VISIBILITY - Higher opacity and brighter for closer particles
                    const opacityValue = Math.min(1, (1 - target.distance / 250) * 1.5);
                    connection.element.style.opacity = opacityValue;
                    
                    // DYNAMIC GLOW EFFECT based on distance
                    const glowIntensity = Math.min(15, 20 * (1 - target.distance / 250));
                    connection.element.style.boxShadow = `0 0 ${glowIntensity}px rgba(0, 255, 65, ${opacityValue * 0.8})`;
                    
                    connection.element.style.display = 'block';
                    connection.active = true;
                } else {
                    connection.element.style.display = 'none';
                    connection.active = false;
                }
            });
        }
    });
    
    // Interactive elements hover effect - ENHANCED
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .nav-link, .skill-item, input, textarea, .testimonial-nav-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            // Add pulse animation to the element on hover
            element.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.5)';
            element.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            element.style.boxShadow = '';
        });
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        cursorPulse.style.display = 'none';
        connections.forEach(connection => {
            connection.element.style.display = 'none';
        });
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        cursorPulse.style.display = 'block';
    });
});