var scene, camera, renderer;
init();
animate();

function init() {




    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true

            controls = new THREE.OrbitControls(camera, renderer.domElement);

        var light = new THREE.PointLight(0xfffff3, 0.8);
        light.position.set(-100, 200, 100);
        scene.add(light);

        var sphereSize = 1;
        var pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
        scene.add(pointLightHelper);

        var light2 = new THREE.PointLight(0xd7f0ff, 0.2);
        light2.position.set(200, 200, 100);
        scene.add(light2);

        var sphereSize = 1;
        var pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize);
        scene.add(pointLightHelper2);

        var light3 = new THREE.PointLight(0xFFFFFF, 0.5);
        light3.position.set(150, 200, -100);
        scene.add(light3);

        var sphereSize = 1;
        var pointLightHelper3 = new THREE.PointLightHelper(light3, sphereSize);
        scene.add(pointLightHelper3);
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.set(50, 150, 100);
    scene.add(camera);
    window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });
