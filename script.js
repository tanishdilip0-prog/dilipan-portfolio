// ========================================
// DILIPAN — LIQUID GLASS INTERFACE
// Optimized version
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const cursorLight = document.querySelector(".cursor-light");
    const layers = document.querySelectorAll(".liquid-layer");
    const cards = document.querySelectorAll(".career-card");
    const buttons = document.querySelectorAll(".btn");

    let mouseX = 0;
    let mouseY = 0;
    let animationFrame = null;

    let activeCard = null;

    // ========================================
    // CURSOR + LIQUID BACKGROUND
    // ========================================

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        // Prevent dozens of DOM updates per frame
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(updateEffects);
        }

        // Find the card currently under the cursor
        const element = document.elementFromPoint(mouseX, mouseY);
        const card = element?.closest(".career-card");

        if (card !== activeCard) {

            if (activeCard) {
                activeCard.style.transform =
                    "perspective(900px) rotateX(0deg) rotateY(0deg)";
            }

            activeCard = card || null;
        }
    });


    function updateEffects() {

        animationFrame = null;

        // ========================================
        // CURSOR LIGHT
        // ========================================

        if (cursorLight) {
            cursorLight.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }


        // ========================================
        // LIQUID BACKGROUND
        // ========================================

        layers.forEach((layer, index) => {

            const speed = (index + 1) * 0.012;

            const moveX =
                (mouseX - window.innerWidth / 2) * speed;

            const moveY =
                (mouseY - window.innerHeight / 2) * speed;

            layer.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;
        });


        // ========================================
        // ACTIVE CARD TILT
        // ========================================

        if (activeCard) {

            const rect = activeCard.getBoundingClientRect();

            const cardX = mouseX - rect.left;
            const cardY = mouseY - rect.top;

            const rotateX =
                ((cardY - rect.height / 2) / rect.height) * -4;

            const rotateY =
                ((cardX - rect.width / 2) / rect.width) * 4;

            activeCard.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        }
    }


    // ========================================
    // RESET CARD
    // ========================================

    cards.forEach((card) => {

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";

            if (activeCard === card) {
                activeCard = null;
            }
        });
    });


    // ========================================
    // BUTTON GLASS INTERACTION
    // ========================================

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =
                "translateY(-3px) scale(1.02)";
        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translateY(0) scale(1)";
        });
    });


    // ========================================
    // PAGE LOAD
    // ========================================

    document.body.classList.add("loaded");

});
