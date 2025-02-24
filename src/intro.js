import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");

const BASIC_DURATION = 1.2;
const btnExperience = document.querySelector('.body__btn')

const loader = () => {
    const textContainers = document.querySelectorAll(".animated-title");

    const tl = gsap.timeline({
        defaults: {
            duration: BASIC_DURATION,
            ease: "primary-ease"
        }
    });

    textContainers.forEach((tContainer) => {
        tContainer.innerHTML = tContainer.innerHTML
            .split(/(<span[^>]*>.*?<\/span>|\s+)/g)
            .map(segment => {
                if (segment.startsWith("<span") || segment.trim() === "") return segment;
                return `<span class="word">${segment}</span>`;
            })
            .join("");
    
        const words = tContainer.querySelectorAll(".word");

        gsap.fromTo(
            words,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "primary-ease",
                stagger: { amount: 0.3, from: "random" },
                onComplete: () => {
                    gsap.to(document.documentElement, {
                        "--opacity-after-circle": "1",
                        duration: 0,
                        onComplete: () => {
                            setTimeout(() => {
                                gsap.to('.word', {
                                    y: -20,
                                    opacity: 0,
                                    stagger: { amount: 0.3, from: "random" },
                                    onStart: () => {
                                        document.documentElement.style.setProperty("--opacity-after-circle", "0");
                                    },
                                    onComplete: () => {
                                        changeText();
                                    }
                                });
                            }, 3000);
                        }
                    });
                }
            }
        );
    });
};

const changeText = () => {
    gsap.set('.v-1', {
        autoAlpha: 0,
    });

    gsap.set('.v-1', {
        display: 'none'
    })

    const textContainers = document.querySelectorAll(".v-2 .animated-title");

    console.log(textContainers)

    textContainers.forEach((tContainer) => {
        tContainer.innerHTML = tContainer.innerHTML
            .split(/(<span[^>]*>.*?<\/span>|\s+)/g)
            .map(segment => {
                if (segment.startsWith("<span") || segment.trim() === "") return segment;
                return `<span class="word">${segment}</span>`;
            })
            .join("");

        const words = tContainer.querySelectorAll(".word");

        gsap.set('.word', {autoAlpha: 0})

        gsap.set('.v-2', {
            autoAlpha: 1,
            display: 'block',
        });

        gsap.to(
            words,
            // { autoAlpha: 0, y: 20 },
            {
                autoAlpha: 1,
                y: 0,
                duration: BASIC_DURATION,
                ease: "primary-ease",
                stagger: { amount: 0.3, from: "random" }
            },
        );
    });

};

const transition = () => {
    const href = window.location.origin + "/map"
    const transition = document.querySelector('.transition-experience')

    const tl = gsap.timeline({
        defaults: {
            ease: "primary-ease",
            duration: BASIC_DURATION
        }
    })

    tl.set('html', {
        cursor: 'progress'
    })

    tl.to(transition, {
        y: '-100%',
        onComplete: () => {
            window.location.href = href;
        }
    })
}

document.addEventListener("DOMContentLoaded", loader);
btnExperience.addEventListener('click', transition)
