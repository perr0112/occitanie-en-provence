import gsap from "gsap"

import { findPlant } from "../data/plants"

const BASIC_DURATION = 1.2

const generateModal = (modal, transition, name) => {
    if (!modal || !transition || !name) return;

    const plant = findPlant(name)

    if (!plant) return;

    console.log('p', plant)

    const tl = gsap.timeline({
        defaults: {
            ease: "expo.inOut",
            duration: BASIC_DURATION
        }
    })

    tl.set('html', {
        cursor: 'progress'
    })

    transition.dataset.active = true

    tl.set(modal, {
        autoAlpha: 1
    }, BASIC_DURATION)

    tl.to(modal, {

    })

}

export {
    generateModal
}
