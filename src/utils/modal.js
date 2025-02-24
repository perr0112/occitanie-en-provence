import gsap from "gsap"
import CustomEase from "gsap/CustomEase"

import { findPlant } from "../data/plants"

gsap.registerPlugin(CustomEase)

CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99")

const BASIC_DURATION = 1.2

const enterTransition = (transition) => {
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
        y: '-100%'
    })

    tl.to(transition, {
        y: '-200%'
    })

    tl.set('html', {
        cursor: 'default'
    }, `-=${BASIC_DURATION / 2}`)

    tl.set(transition, {
        y: '100%'
    })
}

const transitionIn = (modal, transition, name) => {
    if (!modal || !transition || !name) return;

    const plant = findPlant(name)

    if (!plant) return;

    console.log('p', plant)

    const tl = gsap.timeline({
        defaults: {
            ease: "primary-ease",
            duration: BASIC_DURATION
        }
    })

    tl.set(transition, {
        y: '100%'
    })

    tl.set('html', {
        cursor: 'progress'
    })

    // add plant informations to modal content
    updateInformations(modal, plant)

    tl.to(transition, {
        y: 0
    })

    tl.set(modal, {
        autoAlpha: 1
    }, '>')

    tl.to(transition, {
        y: '-200%'
    })

    tl.set('html', {
        cursor: 'default'
    }, `-=${BASIC_DURATION / 2}`)

    tl.set(transition, {
        y: '100%'
    })
}

const transitionOut = (modal, transition) => {
    if (!modal || !transition) return;

    const tl = gsap.timeline({
        defaults: {
            ease: "primary-ease",
            duration: BASIC_DURATION
        }
    })

    tl.set(transition, {
        y: '100%'
    })

    tl.set('html', {
        cursor: 'progress'
    })

    tl.to(transition, {
        y: 0
    })

    tl.set(modal, {
        autoAlpha: 0
    }, '>')

    tl.to(transition, {
        y: '-200%'
    })

    tl.set('html', {
        cursor: 'default'
    }, `-=${BASIC_DURATION / 2}`)

    tl.set(transition, {
        y: '100%'
    })
}

const updateInformations = (modal, plant) => {
    const { name, title, description, subtitle } = plant;

    const marquees = modal.querySelectorAll('.marquee')
    const contentTitle = modal.querySelector('.content__title span')
    const contentDescription = modal.querySelector('.content__desc')
    const imgCover = modal.querySelector('.modal__header img.cover')

    marquees.forEach((marquee) => marquee.innerHTML = title + '&nbsp;' )
    contentTitle.innerHTML = subtitle
    contentDescription.innerHTML = description
    imgCover.src = `./plants/${name}/cover.png`
    imgCover.alt = `${title}`
}

export {
    transitionIn,
    transitionOut,
    enterTransition,
    BASIC_DURATION
}
