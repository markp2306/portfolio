document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Animation
    const preloader = document.querySelector('.preloader');
    const preloaderProgress = document.querySelector('.progress-bar');
    
    // Simulate loading
    setTimeout(() => {
        if(preloaderProgress) preloaderProgress.style.width = '100%';
    }, 100);

    setTimeout(() => {
        if(preloader) {
            preloader.classList.add('hidden');
            // Trigger initial reveals
            setTimeout(triggerInitialReveals, 500);
        }
    }, 1200);

    function triggerInitialReveals() {
        document.querySelectorAll('.hero .reveal-elem').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 150);
        });
        document.querySelectorAll('.hero .reveal-fade').forEach(el => {
            el.classList.add('active');
        });
        const heroGlow = document.querySelector('.hero-glow');
        if(heroGlow) heroGlow.classList.add('active');
    }

    // 2. Advanced Smooth Cursor & Mouse Glow
    const cursorDot = document.querySelector(".cursor-dot");
    const mouseGlow = document.querySelector(".mouse-glow");
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    
    const speed = 0.15;
    const glowSpeed = 0.15;

    if (window.innerWidth > 768) {
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (mouseGlow) {
                mouseGlow.style.opacity = "1";
            }
        });

        const animate = () => {
            // Cursor Lerp
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            if (cursorDot) cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            
            // Glow Lerp
            glowX += (mouseX - glowX) * glowSpeed;
            glowY += (mouseY - glowY) * glowSpeed;
            if (mouseGlow) mouseGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

            // Global Mouse tracking for Background Grid
            document.documentElement.style.setProperty('--global-mouse-x', `${mouseX}px`);
            document.documentElement.style.setProperty('--global-mouse-y', `${mouseY}px`);
            
            requestAnimationFrame(animate);
        };
        animate();

        // Hover effects on links
        const interactiveElements = document.querySelectorAll("a, button, .magnetic-el, .project-img-wrap, .social-item, .top-btn");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                if (cursorDot) cursorDot.classList.add("expand");
                if (el.classList.contains('visual-badge') || el.closest('.visual-badge')) {
                    cursorDot.classList.add('no-blend');
                }
            });
            el.addEventListener("mouseleave", () => {
                if (cursorDot) {
                    cursorDot.classList.remove("expand");
                    cursorDot.classList.remove('no-blend');
                }
            });
        });
    }

    // 3. Magnetic Elements (Buttons/Links)
    const magnets = document.querySelectorAll('.magnetic-el');
    const magneticScrolls = document.querySelectorAll('.magnetic-scroll'); // For projects image slight parallax

    if (window.innerWidth > 768) {
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
                magnet.style.transform = `translate(${x}px, ${y}px)`;
                magnet.style.transition = "transform 0.1s linear";
                
                const text = magnet.querySelector('.btn-text, span:not(.logo span), i');
                if(text) {
                    text.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
                    text.style.transition = "transform 0.1s linear";
                }
            });

            magnet.addEventListener('mouseleave', () => {
                magnet.style.transform = `translate(0px, 0px)`;
                magnet.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
                const text = magnet.querySelector('.btn-text, span:not(.logo span), i');
                if(text) {
                    text.style.transform = `translate(0px, 0px)`;
                    text.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
                }
            });
        });

        // Parallax effect for project images
        magneticScrolls.forEach(wrap => {
            const img = wrap.querySelector('img');
            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
                if(img) img.style.transform = `scale(1.2) translate(${x}px, ${y}px)`;
            });

            wrap.addEventListener('mouseleave', () => {
                if(img) img.style.transform = `scale(1.1) translate(0px, 0px)`;
            });
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElems = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right, .skill-card, .project-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElems.forEach(el => observer.observe(el));

    // 5. Navbar Scrolled State
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 6. Mobile Menu Toggle
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const toggleIcon = mobileToggle ? mobileToggle.querySelector("i") : null;

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", () => {
            const isActive = mobileMenu.classList.toggle("active");
            mobileToggle.classList.toggle("active");
            
            if (isActive) {
                document.body.style.overflow = "hidden";
                if(toggleIcon) {
                    toggleIcon.classList.remove("ph-list");
                    toggleIcon.classList.add("ph-x");
                }
            } else {
                document.body.style.overflow = "";
                if(toggleIcon) {
                    toggleIcon.classList.remove("ph-x");
                    toggleIcon.classList.add("ph-list");
                }
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                mobileToggle.classList.remove("active");
                document.body.style.overflow = "";
                if(toggleIcon) {
                    toggleIcon.classList.remove("ph-x");
                    toggleIcon.classList.add("ph-list");
                }
            });
        });
    }

    // 7. Scroll Progress & Active Link Highlighting
    const scrollProgressBar = document.querySelector(".scroll-progress-bar");
    const sections = document.querySelectorAll("section[id]");
    const navLinksList = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        // Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgressBar) scrollProgressBar.style.width = scrolled + "%";

        // Active Link
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinksList.forEach((link) => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active-nav");
            }
        });
    });

    // 8. 3D Tilt Effect & Spotlight Tracking
    const tiltCards = document.querySelectorAll('.skill-card, .project-img-wrap, .contact-form-wrap, .stat-box');
    
    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Set CSS variables for spotlight
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                card.style.transition = "transform 0.1s linear";
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
                card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            });
        });
    }

    // 9. Footer Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 10. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="btn-text">Sending...</span>
                <i class="ph ph-spinner-gap ph-spin"></i>
            `;

            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message || 'Message sent successfully!');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message.');
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Something went wrong. Please try again later.');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
