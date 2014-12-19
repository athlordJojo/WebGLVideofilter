define(['stats', 'THREE', 'datgui', 'EffectComposer', 'BasicShader', 'RenderPass', 'VideoShader'], function () {
  var scene, camera, renderer, geometry, material, mesh, stats, video, videoTexture, videoMaterial, plane, composer, renderpass, shaderPass1, copyPass, guiUniforms;

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
    guiUniforms = {
      red: 0.0,
      green: 0.0,
      blue:0.0
    };
    gui.add(guiUniforms, 'red', 0, 1);
    gui.add(guiUniforms, 'green', 0, 1);
    gui.add(guiUniforms, 'blue', 0, 1);
  }

  function initVideo() {
    video = document.createElement('video');
    video.loop = true;
    video.src = "videos/small.mp4";
    video.play();

    videoTexture = new THREE.Texture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    videoMaterial = new THREE.ShaderMaterial({
                                               uniforms: THREE.VideoShader.uniforms,
                                               vertexShader: THREE.VideoShader.vertexShader,
                                               fragmentShader: THREE.VideoShader.fragmentShader
                                             });


    videoMaterial.uniforms.texture.value = videoTexture;

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

  function initComposer() {
    composer = new THREE.EffectComposer(renderer);
  }

  function initPasses() {
    renderpass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderpass);
    shaderPass1 = new THREE.ShaderPass(THREE.VideoShader);
    shaderPass1.uniforms = [];
    composer.addPass(shaderPass1);

    copyPass = new THREE.ShaderPass(THREE.CopyShader);
    composer.addPass(copyPass);
    copyPass.renderToScreen = true;
  }

  function init() {

    initStats();
    initScene();
    initDatGui();
    initVideo();

    initWebGlRenderer();
    initComposer();
    //initPasses();
  }

  function animate() {
    stats.begin();
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      if (videoTexture) videoTexture.needsUpdate = true;
    }
    videoMaterial.uniforms.red.value = guiUniforms.red;
    videoMaterial.uniforms.green.value = guiUniforms.green;
    videoMaterial.uniforms.blue.value = guiUniforms.blue;
    renderer.render(scene, camera);
//    composer.render(0.1);
    stats.end();

    requestAnimationFrame(animate);
  }

  init();
  animate();

});
