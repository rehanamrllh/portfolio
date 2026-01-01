/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */


function counter() {
    var count = setInterval(function () {
        var counterElement = document.querySelector(".counter");
        if (!counterElement) {
            clearInterval(count);
            return;
        }
        var c = parseInt(counterElement.textContent);
        counterElement.textContent = (++c).toString();
        if (c === 100) {
            clearInterval(count);
            counterElement.classList.add("hide");
            document.querySelector(".preloader").classList.add("active");
            setTimeout(function () {
                document.querySelector('html').classList.remove('ss-preload');
                document.querySelector('html').classList.add('ss-loaded');
                document.querySelectorAll('.ss-animated').forEach(function (item) {
                    item.classList.remove('ss-animated');
                });
            }, 1800);
        }
    }, 10);
}

window.addEventListener('load', counter);

/* Light/Dark Mode Toggle
* ------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('.toggle input'); // Update selector
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Init theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light-mode');
    setTheme(initialTheme);
    themeToggle.checked = initialTheme === 'light-mode'; // Set checkbox state

    // Toggle theme
    themeToggle.addEventListener('change', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light-mode' : 'dark');
    });

    // Watch system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light-mode');
        }
    });
});


/* Highlight active menu link on pagescroll
 * ------------------------------------------------------ */
const ssScrollSpy = function () {

    const sections = document.querySelectorAll(".target-section");

    // Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlight);

    function navHighlight() {

        // Get current scroll position
        let scrollY = window.pageYOffset;

        // Loop through sections to get height(including padding and border), 
        // top and ID values for each
        sections.forEach(function (current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute("id");

            /* If our current scroll position enters the space where current section 
             * on screen is, add .current class to parent element(li) of the thecorresponding 
             * navigation link, else remove it. To know which link is active, we use 
             * sectionId variable we are getting while looping through sections as 
             * an selector
             */
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
            } else {
                document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
            }
        });
    }

}; // end ssScrollSpy


/* Animate elements if in viewport
 * ------------------------------------------------------ */
const ssViewAnimate = function () {

    const blocks = document.querySelectorAll("[data-animate-block]");

    window.addEventListener("scroll", viewportAnimation);

    function viewportAnimation() {

        let scrollY = window.pageYOffset;

        blocks.forEach(function (current) {

            const viewportHeight = window.innerHeight;
            const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
            const blockHeight = current.offsetHeight;
            const blockSpace = triggerTop + blockHeight;
            const inView = scrollY > triggerTop && scrollY <= blockSpace;
            const isAnimated = current.classList.contains("ss-animated");

            if (inView && (!isAnimated)) {
                anime({
                    targets: current.querySelectorAll("[data-animate-el]"),
                    opacity: [0, 1],
                    translateY: [100, 0],
                    delay: anime.stagger(400, { start: 200 }),
                    duration: 800,
                    easing: 'easeInOutCubic',
                    begin: function (anim) {
                        current.classList.add("ss-animated");
                    }
                });
            }
        });
    }

}; // end ssViewAnimate


/* Swiper
 * ------------------------------------------------------ */
const ssSwiper = function () {

    const mySwiper = new Swiper('.swiper-container', {

        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is > 400px
            401: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is > 800px
            801: {
                slidesPerView: 2,
                spaceBetween: 32
            },
            // when window width is > 1200px
            1201: {
                slidesPerView: 2,
                spaceBetween: 80
            }
        }
    });

}; // end ssSwiper


/* Lightbox
 * ------------------------------------------------------ */
const ssLightbox = function () {

    const folioLinks = document.querySelectorAll('.folio-list__item-link');
    const modals = [];

    folioLinks.forEach(function (link) {
        let modalbox = link.getAttribute('href');
        let instance = basicLightbox.create(
            document.querySelector(modalbox),
            {
                onShow: function (instance) {
                    //detect Escape key press
                    document.addEventListener("keydown", function (event) {
                        event = event || window.event;
                        if (event.keyCode === 27) {
                            instance.close();
                        }
                    });
                }
            }
        )
        modals.push(instance);
    });

    folioLinks.forEach(function (link, index) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            modals[index].show();
        });
    });

};  // end ssLightbox


/* Alert boxes
 * ------------------------------------------------------ */
const ssAlertBoxes = function () {

    const boxes = document.querySelectorAll('.alert-box');

    boxes.forEach(function (box) {

        box.addEventListener('click', function (event) {
            if (event.target.matches(".alert-box__close")) {
                event.stopPropagation();
                event.target.parentElement.classList.add("hideit");

                setTimeout(function () {
                    box.style.display = "none";
                }, 500)
            }
        });

    })

}; // end ssAlertBoxes

/* Profile Page Interactions
 * ------------------------------------------------------ */
const ssProfileInteractions = function () {
    
    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Fun activities interactive click
    const funItems = document.querySelectorAll('.fun-item');
    funItems.forEach(item => {
        item.addEventListener('click', function() {
            const emoji = this.querySelector('.fun-emoji');
            emoji.style.transform = 'scale(1.3) rotate(10deg)';
            
            setTimeout(() => {
                emoji.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });

    // Experience items stagger animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply stagger animation to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Parallax effect for profile image
    const profileImg = document.querySelector('.about-profile-img');
    if (profileImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            profileImg.style.transform = `translateY(${speed}px)`;
        });
    }

    // Interactive typing effect for main title
    const titleWords = document.querySelectorAll('.about-main-title .hover-word');
    titleWords.forEach((word, index) => {
        word.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.display = 'inline-block';
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        word.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Add keyboard support
        word.setAttribute('tabindex', '0');
        word.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.dispatchEvent(new Event('mouseenter'));
                setTimeout(() => {
                    this.dispatchEvent(new Event('mouseleave'));
                }, 300);
            }
        });
    });

    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.skill-item, .fun-item');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add ARIA labels for better accessibility
    const skillElements = document.querySelectorAll('.skill-item');
    skillElements.forEach(item => {
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Technology: ${item.textContent.trim()}`);
    });

    const hobbyElements = document.querySelectorAll('.fun-item');
    hobbyElements.forEach(item => {
        const activity = item.querySelector('span').textContent;
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Hobby: ${activity}`);
    });

    // Profile status dot animation
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        let isGlowing = false;
        setInterval(() => {
            isGlowing = !isGlowing;
            statusDot.style.boxShadow = isGlowing ? '0 0 10px #22c55e' : 'none';
        }, 2000);
    }

    // Social links hover animations
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // CV Button click effect
    const cvBtn = document.querySelector('.profile-cv-btn');
    if (cvBtn) {
        cvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create download animation
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/>
                    <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>Downloading...</span>
            `;
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }

}; // end ssProfileInteractions

/* Dynamic Background Particles (Profile Page)
 * ------------------------------------------------------ */
const ssProfileParticles = function() {
    if (!document.querySelector('.s-pagewrap .circles')) return;
    
    const circles = document.querySelector('.circles');
    
    // Add more interactive particles for profile page
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('span');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(45deg, var(--color-1), var(--color-accent));
            border-radius: 50%;
            opacity: 0.1;
            animation: float ${Math.random() * 20 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;
        circles.appendChild(particle);
    }

    // Mouse follower effect
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--color-1);
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(follower);

    function updateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX - 10 + 'px';
        follower.style.top = followerY - 10 + 'px';
        
        requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Hide follower on hover over interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .skill-item, .fun-item, .experience-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            follower.style.opacity = '0.1';
            follower.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            follower.style.opacity = '0.3';
            follower.style.transform = 'scale(1)';
        });
    });
}; // end ssProfileParticles

/* Smooth Page Transitions
 * ------------------------------------------------------ */
const ssPageTransitions = function() {
    // Add page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
    });

    // Add smooth transitions between sections
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, options);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}; // end ssPageTransitions

/* Smoothscroll
 * ------------------------------------------------------ */
const ssMoveTo = function () {

    const easeFunctions = {
        easeInQuad: function (t, b, c, d) {
            t /= d;
            return c * t * t + b;
        },
        easeOutQuad: function (t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        },
        easeInOutQuad: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        easeInOutCubic: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
    }

    const triggers = document.querySelectorAll('.smoothscroll');

    const moveTo = new MoveTo({
        tolerance: 0,
        duration: 1200,
        easing: 'easeInOutCubic',
        container: window
    }, easeFunctions);

    triggers.forEach(function (trigger) {
        moveTo.registerTrigger(trigger);
    });

}; // end ssMoveTo




/* Initialize
* ------------------------------------------------------ */
(function ssInit() {

    ssScrollSpy();
    ssViewAnimate();
    ssSwiper();
    ssLightbox();
    ssAlertBoxes();
    ssProfileInteractions();
    ssProfileParticles();
    ssPageTransitions();
    ssMoveTo();

})();

/* --------------------------------------------------- 
 * Profile Page Enhanced Interactions
 * --------------------------------------------------- */
const ssProfileEnhanced = function() {
    
    // Enhanced social card interactions
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Profile description enhanced animation
    const profileDesc = document.querySelector('.profile-description');
    if (profileDesc) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                }
            });
        });
        observer.observe(profileDesc);
    }

    // Experience items enhanced hover
    const expItems = document.querySelectorAll('.experience-item');
    expItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-light) 100%)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'var(--color-bg)';
        });
    });

    // Profile avatar animation
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(5deg) scale(1.1)';
        });
        
        profileAvatar.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .profile-avatar {
        transition: all 0.3s ease;
    }
    
    .experience-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize enhanced profile interactions
document.addEventListener('DOMContentLoaded', ssProfileEnhanced);

