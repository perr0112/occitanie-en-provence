import gsap from 'gsap';

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

const toggleMenu = () => {
}

export {
    handleMenu,
    toggleMenu
}
