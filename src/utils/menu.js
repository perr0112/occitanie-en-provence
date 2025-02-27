import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

const BASIC_DURATION = 1.2;

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99")

const handleMenu = (menu) => {
    const containerBoxs = menu.querySelector('.container__boxs')
    let containerBoxsWidth = containerBoxs.getBoundingClientRect().width

    console.log('containerBoxs', containerBoxs.getBoundingClientRect(), containerBoxsWidth)

    const boxs = menu.querySelectorAll('.box')
    console.log(boxs)

    let minX = 0;
    let maxX = 0;
    let widthBox = 0;

    boxs.forEach((box, index) => {
        const boundingClient = box.getBoundingClientRect();

        if (index === 0) {
            minX = boundingClient.left;
            widthBox = boundingClient.width;
        }

        if (index === boxs.length - 1) {
            maxX = boundingClient.right;
        }

        console.log('minX', minX, 'maxX', maxX)
    });

    gsap.set(containerBoxs, {
        rotation: -2.5
    });

    let isDragging = false;
    let currentX, initialX, initialY;
    let xOffset = 0, yOffset = 0;

    containerBoxs.addEventListener('mousedown', (e) => {
        initialX = e.clientX - xOffset
        initialY = e.clientY - yOffset
        if (e.target === containerBoxs) {
            isDragging = true
        }
    })

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault()

            currentX = e.clientX - initialX
            xOffset = currentX

            if (currentX > minX || currentX > 0) return;
            if (currentX * -1 > containerBoxsWidth - widthBox / 10) return;

            console.log('currentX', currentX, widthBox)

            gsap.to(containerBoxs, {
                x: currentX,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    })

    document.addEventListener('mouseup', () => {
        isDragging = false
    })
}

const toggleMenu = (menu) => {
    const isOpening = menu.dataset.active === "false";
    menu.dataset.active = isOpening;

    const tl = gsap.timeline({
        defaults: {
            duration: BASIC_DURATION,
            ease: "primary-ease"
        }
    });

    if (isOpening) {
        tl.set(menu, {
            autoAlpha: 1
        })

        tl.to('.container__cover', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)',
        })

        tl.to('.box img', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)',
            stagger: BASIC_DURATION / 6,
        }, `-=${BASIC_DURATION / 2}`)

        tl.to('.box h3', {
            opacity: 1,
            stagger: BASIC_DURATION / 6,
        }, `-=${BASIC_DURATION / 12}`);

    } else {
        tl.to('.box h3', {
            opacity: 0,
            stagger: BASIC_DURATION / 6,
        })

        tl.to('.box img', {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)',
            stagger: BASIC_DURATION / 6,
        }, `-=${BASIC_DURATION / 6}`)

        tl.to('.container__cover', {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)',
        }, `-=${BASIC_DURATION / 2}`)

        tl.set(menu, {
            autoAlpha: 0
        });
    }
}

export {
    handleMenu,
    toggleMenu
}
