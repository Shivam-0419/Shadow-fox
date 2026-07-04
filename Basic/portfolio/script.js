/* =================================================================
   COSMIC PORTFOLIO INTERACTIVE JS CONTROLLER
   Engine: Responsive HTML5 Canvas Starfield & Scroll Animators
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMIC HEADER & SCROLL CONTROLS
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        // Shrink header and blur background on scroll down
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Active link highlighting on scroll
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // 2. MOBILE MENU OVERLAY NAVIGATION
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navbar = document.querySelector(".navbar");

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (navbar.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars-staggered";
            }
        });

        // Close mobile drawer when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                mobileToggle.querySelector("i").className = "fa-solid fa-bars-staggered";
            });
        });
    }


    // 3. AUTO-TYPRITER EFFECT FOR HERO TITLE
    const typingSpan = document.querySelector(".typing-text");
    
    // =================================================================
    // [EDIT HERE: ROLES / SKILLS SLIDES]
    // Edit the roles you want to loop in the typewriter hero header.
    // =================================================================
    const rolesArray = ["Creative CS Student", "Full-Stack Developer", "UI/UX Innovator", "Tech Enthusiast"];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        if (!typingSpan) return;

        const currentRole = rolesArray[roleIdx];
        
        if (isDeleting) {
            // Remove character
            typingSpan.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // Deletes faster than writing
        } else {
            // Add character
            typingSpan.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100; // Standard typing speed
        }

        // Handle states
        if (!isDeleting && charIdx === currentRole.length) {
            // Finished typing, pause on the word
            isDeleting = true;
            typingSpeed = 1800; // Pause at end of text
        } else if (isDeleting && charIdx === 0) {
            // Finished deleting, move to next role
            isDeleting = false;
            roleIdx = (roleIdx + 1) % rolesArray.length;
            typingSpeed = 500; // Brief delay before typing next
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    // Trigger Typewriter loop initialization
    if (typingSpan) {
        setTimeout(handleTypewriter, 1000);
    }


    // 4. SCROLL-REVEAL ELEMENT ANIMATIONS (INTERSECTION OBSERVER)
    // Setup reveals on sections and cards
    const revealTargets = document.querySelectorAll(".reveal-left, .reveal-right, .info-metric-card, .skill-card, .project-card");
    
    // Add default reveal style helper class
    revealTargets.forEach(target => {
        if (!target.classList.contains("reveal-left") && !target.classList.contains("reveal-right")) {
            target.classList.add("reveal-up");
        }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // If it is a skill card, animate the skill fill bars inside it
                if (entry.target.classList.contains("skill-card")) {
                    const fillBar = entry.target.querySelector(".skill-bar-fill");
                    if (fillBar) {
                        // Triggers the CSS transition based on inline width style
                        const targetWidth = fillBar.style.width;
                        fillBar.style.width = "0%";
                        setTimeout(() => {
                            fillBar.style.width = targetWidth;
                        }, 100);
                    }
                }
                
                observer.unobserve(entry.target); // Stop observing once triggered
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealTargets.forEach(target => {
        revealObserver.observe(target);
    });


    // 5. MOUSE-INTERACTIVE STARFIELD CANVAS PARTICLES
    const canvas = document.getElementById("cosmic-particles");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let particleCount = 70;
    let connectionDistance = 110;
    
    // Mouse coordinates tracking
    const mouse = {
        x: null,
        y: null,
        radius: 170
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle full viewport canvas scaling
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Adjust particle density based on screen dimensions
        if (window.innerWidth < 768) {
            particleCount = 30;
            connectionDistance = 80;
        } else {
            particleCount = 75;
            connectionDistance = 115;
        }
        initParticles();
    }

    class Particle {
        constructor() {
            this.reset();
            // Randomize starting positions fully across screen
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 1; // Star size
            this.vx = (Math.random() - 0.5) * 0.45; // Slow drift X speed
            this.vy = (Math.random() - 0.5) * 0.45; // Slow drift Y speed
            this.color = Math.random() > 0.4 ? "#00f2fe" : "#9b51e0"; // Cyan or Purple tint stars
            this.alpha = Math.random() * 0.5 + 0.3; // Transparency
        }

        update() {
            // Drift star
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges smoothly
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Cursor magnetic field attraction physics
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Attract gently toward mouse coordinates
                    this.x += (dx / distance) * force * 0.9;
                    this.y += (dy / distance) * force * 0.9;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for line drawing efficiency
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.hypot(dx, dy);

                if (distance < connectionDistance) {
                    // Line fades out the farther away the particles are from each other
                    const alpha = (connectionDistance - distance) / connectionDistance * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    
                    // Create a subtle cyan-to-purple web gradient line
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
            
            // Draw magnetic lines from stars directly to mouse coordinates when within radius
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const distance = Math.hypot(dx, dy);
                
                if (distance < mouse.radius) {
                    const alpha = (mouse.radius - distance) / mouse.radius * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = "#ffffff";
                    ctx.globalAlpha = alpha;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawLines();
        requestAnimationFrame(animateParticles);
    }

    // Initialize starry canvas background controls
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animateParticles();


    // 6. CONTACT FORM SUBMISSION MOCK
    const contactForm = document.getElementById("portfolio-contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalText = submitBtn.innerHTML;
            
            // Visual state feedback: "Transmitting..."
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Transmitting to Space...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            submitBtn.style.boxShadow = "0 0 30px #9b51e0";
            
            // Simulate deep space communication lag (1.5 seconds)
            setTimeout(() => {
                // Reset form values
                contactForm.reset();
                
                // Success state feedback
                submitBtn.innerHTML = `<span>Message Transmitted!</span> <i class="fa-solid fa-circle-check"></i>`;
                submitBtn.style.background = "linear-gradient(135deg, #00b09b, #96c93d)";
                submitBtn.style.boxShadow = "0 0 30px #00b09b";
                
                // Let it sit for a moment then restore original transmit button
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = "";
                    submitBtn.style.boxShadow = "";
                }, 3000);
                
                // Visual pop-up notification
                showSpaceNotification("Your message has bypassed atmospheric boundaries! I will reply shortly.");
            }, 1800);
        });
    }

    // Space Notifications system
    function showSpaceNotification(message) {
        // Create dynamic notification card
        const alertBox = document.createElement("div");
        alertBox.className = "glass-card space-alert";
        
        // CSS Style Injection dynamically for this popup alert
        alertBox.style.position = "fixed";
        alertBox.style.bottom = "30px";
        alertBox.style.right = "30px";
        alertBox.style.padding = "20px 24px";
        alertBox.style.zIndex = "1000";
        alertBox.style.display = "flex";
        alertBox.style.alignItems = "center";
        alertBox.style.gap = "14px";
        alertBox.style.borderLeft = "4px solid #00f2fe";
        alertBox.style.transform = "translateY(100px)";
        alertBox.style.opacity = "0";
        alertBox.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        
        alertBox.innerHTML = `
            <i class="fa-solid fa-satellite-dish" style="color: #00f2fe; font-size: 24px; animation: float 2s infinite;"></i>
            <div>
                <h4 style="font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px;">Transmission Successful</h4>
                <p style="font-size: 13px; color: #94a3b8; line-height: 1.4;">${message}</p>
            </div>
        `;
        
        document.body.appendChild(alertBox);
        
        // Trigger reveal slide-up
        setTimeout(() => {
            alertBox.style.transform = "translateY(0)";
            alertBox.style.opacity = "1";
        }, 100);
        
        // Auto remove alert after 5.5 seconds
        setTimeout(() => {
            alertBox.style.transform = "translateY(100px)";
            alertBox.style.opacity = "0";
            setTimeout(() => {
                alertBox.remove();
            }, 500);
        }, 5500);
    }
});
