window.onload = function () {
  var scene, camera, renderer, geometry, material, mesh, stats;

  function initStats() {
    stats = new Stats();
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
  }

  function initThreeJs() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
  }

  function initDatGui() {
    var gui = new dat.GUI();
    gui.addColor({filtercolor: [255, 0, 0]}, 'filtercolor');
  }

  function init() {
    initStats();
    initThreeJs();
    initDatGui();
  }

  function animate() {
    stats.begin();

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);
    stats.end();

    requestAnimationFrame(animate);
  }

  init();
  animate();
};

