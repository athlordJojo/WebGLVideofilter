define(['stats', 'threejs', 'datgui'], function () {
  var scene, camera, renderer, geometry, material, mesh, stats, video, videoTexture, videoMaterial, plane;

  function initStats() {
    stats = new Stats();
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
  }

  function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

//    geometry = new THREE.BoxGeometry(200, 200, 200);
//    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
//
//    mesh = new THREE.Mesh(geometry, material);
//    scene.add(mesh);
  }

  function initDatGui() {
    var gui = new dat.GUI();
    gui.addColor({filtercolor: [255, 0, 0]}, 'filtercolor');
  }

  function initVideo() {
    video = document.createElement('video');
    video.loop = true;
    video.src = "videos/small.mp4";
    video.play();

    videoTexture = new THREE.Texture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    videoMaterial = new THREE.MeshBasicMaterial({
                                                  map: videoTexture
                                                });


    //Add video plane
    var planeGeometry = new THREE.PlaneGeometry(1080, 720, 1, 1);
    plane = new THREE.Mesh(planeGeometry, videoMaterial);
    plane.z = 0;
    plane.scale.x = plane.scale.y = 1.45;
    scene.add(plane);
  }

  function initWebGlRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
  }

  function init() {
    initWebGlRenderer();
    initStats();
    initScene();
    initDatGui();
    initVideo();
  }

  function animate() {
    stats.begin();
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      if (videoTexture) videoTexture.needsUpdate = true;
    }
    renderer.render(scene, camera);
    stats.end();

    requestAnimationFrame(animate);
  }

  init();
  animate();

});
