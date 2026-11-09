import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

function newCamera(fov = 75, aspect = 2, near = 0.1, far = 5) {
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

function newRenderer(options) {
    return new THREE.WebGLRenderer({antialias: options.antialias, canvas: options.canvas})
}

function initializeCamera(camera) {
    camera.position.z = 5;
}

function newScene() {
    return new THREE.Scene();
}

function getCanvas() {
    return document.querySelector('#c');
}

function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}


function main() {
    const canvas = getCanvas();
    const renderer = newRenderer({antialias: true, canvas});
    
    const camera = newCamera();
    initializeCamera(camera);

    const scene = newScene();
    scene.background = new THREE.Color(0xAAAAAA);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    const cube = new THREE.Mesh(geometry, material);

    // scene.add(cube);

    const lightColor = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(lightColor, intensity);
    light.position.set(-1, 2, 4);

    scene.add(light);

    // renderer.render(scene, camera);
    const objects = [];
    const spread = 15;
    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
    }

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    addSolidGeometry(0,0, new THREE.BoxGeometry());

    // const cubes = [
    //     makeInstance(geometry, 0x44aa88, 0),
    //     makeInstance(geometry, 0x8844aa, -2),
    //     makeInstance(geometry, 0xaa8844, 2)
    // ];

    function resizeRendererToDisplaySize(renderer, maxPixelCount = 3840*2160) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        let width = Math.floor(canvas.clientWidth * pixelRatio);
        let height = Math.floor(canvas.clientHeight * pixelRatio);
        const pixelCount = width * height;
        const renderScale = pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;
        width = Math.floor(width * renderScale);
        height = Math.floor(height * renderScale);

        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time){
        time *= 0.001; // convert time to seconds

        if(resizeRendererToDisplaySize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // cubes.forEach((cube, index) => {
        //     const speed = 1 + index * .1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot;
        // })
        // cube.rotation.x = time;
        // cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
}
    requestAnimationFrame(render);
}
main();