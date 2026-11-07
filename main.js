import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const FOV = 75;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR = 0.1;
const FAR = 1000;

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
    FOV, // fov
    ASPECT_RATIO, // aspect
    NEAR, // near
    FAR // far 
);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth, // width
    window.innerHeight // height
);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// composer
const composer = new EffectComposer(renderer);

// meshes
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push( new THREE.Vector3(-10,0,0) );
points.push( new THREE.Vector3(0,10,0) );
points.push( new THREE.Vector3(10,0,0) );

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

// passes
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// const glitchPass = new GlitchPass();
// composer.addPass(glitchPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

// animation loop
function animate( time ) {

    requestAnimationFrame(animate);
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;

    // renderer.render(scene, camera);
    composer.render()
}

