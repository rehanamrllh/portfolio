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
document.addEventListener('DOMContentLoaded', function() {
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
    ssMoveTo();
    ssModeToggle();

})();

