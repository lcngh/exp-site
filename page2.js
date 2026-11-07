import * as THREE from 'three';
function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    const camera2 = {
        object: new THREE.PerspectiveCamera(fov, aspect, near, far),
        initialize: function() {
            this.object.position.z =2
        }
        
    }
    camera2.initialize();

    camera.position.z = 2;

    const scene = new THREE.Scene();
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

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2)
    ];

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

        cubes.forEach((cube, index) => {
            const speed = 1 + index * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        })
        // cube.rotation.x = time;
        // cube.rotation.y = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
}
    requestAnimationFrame(render);
}
main();