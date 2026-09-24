// ========================================
// DILIPAN — LIQUID GLASS INTERFACE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const cursorLight = document.querySelector(".cursor-light");
    const layers = document.querySelectorAll(".liquid-layer");
    const cards = document.querySelectorAll(".career-card");
    const buttons = document.querySelectorAll(".btn");

    // ========================================
    // CURSOR → LIQUID BACKGROUND
    // ========================================

    document.addEventListener("mousemove", (event) => {

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Move the soft glass light
        if (cursorLight) {
            cursorLight.style.left = `${mouseX}px`;
            cursorLight.style.top = `${mouseY}px`;
        }

        // Move each liquid layer at a different speed
        layers.forEach((layer, index) => {

            const speed = (index + 1) * 0.018;

            const moveX =
                (mouseX - window.innerWidth / 2) * speed;

            const moveY =
                (mouseY - window.innerHeight / 2) * speed;

            layer.style.transform =
                `translate(${moveX}px, ${moveY}px)`;
        });

        // ========================================
        // GLASS CARD TILT
        // ========================================

        cards.forEach((card) => {

            const rect = card.getBoundingClientRect();

            const cardX =
                mouseX - rect.left;

            const cardY =
                mouseY - rect.top;

            const rotateX =
                ((cardY - rect.height / 2) /
                rect.height) * -5;

            const rotateY =
                ((cardX - rect.width / 2) /
                rect.width) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });
    });


    // ========================================
    // RESET CARD WHEN MOUSE LEAVES
    // ========================================

    cards.forEach((card) => {

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";
        });
    });


    // ========================================
    // BUTTON GLASS INTERACTION
    // ========================================

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =
                "translateY(-4px) scale(1.04)";
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