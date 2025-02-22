import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

import { generateModal } from "./utils/modal";

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

addSprite(new THREE.Vector3(3, 0, 0), 'Alyssum Murale');


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
const modal = document.querySelector('.modal')
const transition = document.querySelector('.transition')

window.addEventListener('click', (event) => {
  // const intersects = raycaster.intersectObjects([sprite]);
  const intersects = raycaster.intersectObjects(scene.children);
  // console.log(intersects)
  // if (intersects.length > 0) {
  //   console.log('Sprite clicked');
  //   console.log(currentIntersect);
  // }
  intersects.forEach((intersect) => {
    if (intersect.object.type === 'Sprite') {
      console.log(intersect.object.name)
      generateModal(modal, transition, intersect.object.name)
    }
  })
});

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

let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Cast a ray
  raycaster.setFromCamera(mouse, camera)

  const spritesClickable = [];
  const intersects = raycaster.intersectObjects(spritesClickable);

  if (intersects.length) {
    if (currentIntersect) {
      console.log("mouse enter");
    }
    console.log('==', intersects)
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }
    currentIntersect = null;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
