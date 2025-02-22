import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Debug
 */

const gui = new GUI();

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
const texture = textureLoader.load("./textures/environmentMaps/1.jpg")
texture.wrapS = THREE.RepeatWrapping

const materialSphere = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide
})
materialSphere.transparent = true

const sphere = new THREE.Mesh(geometry, materialSphere)
scene.add(sphere)

// Sprite
const textureIcon = textureLoader.load("./icons/sprite.png");

const materialIcon = new THREE.SpriteMaterial({ 
  map: textureIcon, 
  transparent: true,
  alphaTest: 0.5
});

const sprite = new THREE.Sprite(materialIcon);
console.log(sprite);

const position = new THREE.Vector3(5, 0, 0);

sprite.position.copy(position);

scene.add(sprite);

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
controls.enableZoom = false
controls.enablePan = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
