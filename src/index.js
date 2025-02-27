import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

import { BASIC_DURATION, enterTransition, transitionIn, transitionOut } from './utils/modal';
import { changeTexture } from "./utils/scene";
import { handleMenu, toggleMenu } from "./utils/menu";

/**
 * Debug
 */

// const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Environment map
 */

// Sphere
const geometry = new THREE.SphereGeometry(50, 32, 32);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/environmentMaps/1.jpg");
texture.wrapS = THREE.RepeatWrapping;

const materialSphere = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
materialSphere.transparent = true;

const sphere = new THREE.Mesh(geometry, materialSphere);
scene.add(sphere);

// Sprite

let textureIcon = textureLoader.load("./icons/sprite.png");

const addSprite = (position, name) => {
  const materialIcon = new THREE.SpriteMaterial({
    map: textureIcon,
    transparent: true,
    alphaTest: 0.5,
  });
  
  let sprite = new THREE.Sprite(materialIcon);
  sprite.position.copy(position);
  sprite.name = name;
  // sprite.position.copy(position.clone().normalize().multiplyScalar(30));
  
  scene.add(sprite);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -0.1;
camera.position.y = 0;
camera.position.z = 0;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.rotateSpeed = 0.4;
controls.enableZoom = false;
controls.enablePan = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

// Modal
const modal = document.querySelector('.content')
const transitionElement = document.querySelector('.transition')

// Toggle view
const toggleViewElement = document.querySelector('.toggle-view')

const BASE_TEXTURE_PATHS = "./textures/environmentMaps";

const texturePaths = [
  `${BASE_TEXTURE_PATHS}/1.jpg`,
  `${BASE_TEXTURE_PATHS}/2.jpg`,
  `${BASE_TEXTURE_PATHS}/3.jpg`,
];

const sceneSprites = [
  [ // scène 1.jpg
    { position: new THREE.Vector3(5, -1, -2.75), name: "lavande" },
    { position: new THREE.Vector3(4, -1, 0), name: "alyssum-murale" }
  ],
  [ // scène 2.jpg
    { position: new THREE.Vector3(-5, 0, -1), name: "lavande" },
    { position: new THREE.Vector3(1, -1, 2.75), name: "citron-caviar" }
  ],
  [ // scène 3.jpg
    { position: new THREE.Vector3(1, -2, 4), name: 'bambou-nain' }
  ]
];

const removeSprites = () => {
  const children = scene.children

  console.log(scene, children)

  scene.children
    .filter((c) => c.type === "Sprite")
    .forEach((sprite) => {
      if (sprite.material) sprite.material.dispose();
      scene.remove(sprite);
    })
}

const updateSprites = (sceneIndex) => {
  console.log(sceneIndex, sceneSprites[sceneIndex]);
  const newSprites = sceneSprites[sceneIndex];

  newSprites.forEach((sprite) => addSprite(sprite.position, sprite.name))
};


toggleViewElement.addEventListener('click', () => {
  toggleViewElement.style.pointerEvents = 'none';

  changeTexture(materialSphere, texturePaths, textureLoader, removeSprites, updateSprites);

  setTimeout(() => {
    toggleViewElement.style.pointerEvents = 'auto';
  }, BASIC_DURATION * 1000);
});


// Open modal

window.addEventListener('click', (event) => {
  const intersects = raycaster.intersectObjects(scene.children);
  // console.log(intersects)
  // if (intersects.length > 0) {
  //   console.log('Sprite clicked');
  //   console.log(currentIntersect);
  // }
  intersects.forEach((intersect) => {
    if (intersect.object.type === 'Sprite' && modal.dataset.active === "false") {
      console.log(intersect.object.name)
      transitionIn(modal, transitionElement, intersect.object.name)
      modal.dataset.active = true
      toggleViewElement.dataset.active = false
    }
  })
});
// Close modal
const closeModal = document.querySelectorAll('.close-modal')
closeModal.forEach((el) => {
  el.addEventListener('click', () => {
    if (modal.dataset.active === "true") {
      transitionOut(modal, transitionElement);
      modal.dataset.active = false
      toggleViewElement.dataset.active = true
    }
  })
})

window.addEventListener('keydown', (e) => {
  if (modal.dataset.active === "true" && e.code === "Escape") {
    transitionOut(modal, transitionElement)
    modal.dataset.active = false
    toggleViewElement.dataset.active = true
  }
})

/**
 * Sounds
 */
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/nature.wav', (buffer) => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
});

const toggleButton = document.getElementById('toggle-sound');
const soundOnIcon = document.getElementById('sound-on-icon');
const soundOffIcon = document.getElementById('sound-off-icon');

const toggleSound = () => {
  if (sound.isPlaying) {
    sound.pause();
    soundOnIcon.style.display = 'none';
    soundOffIcon.style.display = 'block';
  } else {
    sound.play();
    soundOnIcon.style.display = 'block';
    soundOffIcon.style.display = 'none';
  }
}

toggleButton.addEventListener('click', toggleSound);

/**
 * Animate
 */
const clock = new THREE.Clock();

// let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Cast a ray
  raycaster.setFromCamera(mouse, camera)

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

const informationScene = document.querySelector('.information-scene');
const informationBtnScene = informationScene.querySelector('.scene__btn');

const menuBtn = document.querySelector('.menu');
const menuContainer = document.querySelector('.menu-container');

document.addEventListener('DOMContentLoaded', () => {
  // enterTransition(transitionElement);

  const navEntries = performance.getEntriesByType('navigation');

  if (navEntries.length > 0 && navEntries[0].type === 'reload') {
    // page actualisée depuis la map
    gsap.set(transitionElement, { y: '100%' });

    if (localStorage.getItem("gotTips") === "true") {
      informationScene.dataset.active = "false";

      setTimeout(() => {
        addSprite(new THREE.Vector3(5, -1, -2.75), 'lavande');
        addSprite(new THREE.Vector3(4, -1, 0), 'alyssum-murale');
        
        toggleViewElement.classList.remove('hidden');
      }, BASIC_DURATION * 50)
    }

  } else {
    // nouvelle venue
    enterTransition(transitionElement);
  }

  if (informationScene && informationScene.getAttribute('data-active') === 'true') {
    toggleViewElement.classList.add('hidden');
  }

  handleMenu(menuContainer)
});

informationBtnScene.addEventListener('click', () => {
  informationScene.dataset.active = "false";

  localStorage.gotTips = true

  setTimeout(() => {
    addSprite(new THREE.Vector3(5, -1, -2.75), 'lavande');
    addSprite(new THREE.Vector3(4, -1, 0), 'alyssum-murale');
    
    toggleViewElement.classList.remove('hidden');
  }, BASIC_DURATION * 50)
})


/**
 * Menu
 */

menuBtn.addEventListener('click', () => toggleMenu(menuContainer))
