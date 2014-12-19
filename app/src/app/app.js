define(['stats', 'THREE', 'datgui', 'EffectComposer', 'BasicShader', 'RenderPass', 'VideoShader', 'KeyboardState'],
       function () {
         var scene, camera, renderer, geometry, material, mesh, stats, video, videoTexture, videoMaterial, plane, composer, renderpass, shaderPass1, copyPass, guiUniforms, keyboard;

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

           //geometry = new THREE.BoxGeometry(200, 200, 200);
//    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
//
           geometry = new THREE.SphereGeometry(1400, 32, 32);
         }

         function initDatGui() {
           var gui = new dat.GUI();
           guiUniforms = {
             red: 0.0,
             green: 0.0,
             blue: 0.0

           };
           gui.add(guiUniforms, 'red', 0, 1);
           gui.add(guiUniforms, 'green', 0, 1);
           gui.add(guiUniforms, 'blue', 0, 1);
         }

         function initVideo() {
           video = document.createElement('video');
           video.loop = true;
           video.src = "videos/video.mp4";
           video.play();

           videoTexture = new THREE.Texture(video);
           videoTexture.minFilter = THREE.LinearFilter;
           videoTexture.magFilter = THREE.LinearFilter;

           videoMaterial = new THREE.ShaderMaterial({
                                                      uniforms: THREE.VideoShader.uniforms,
                                                      vertexShader: THREE.VideoShader.vertexShader,
                                                      fragmentShader: THREE.VideoShader.fragmentShader
                                                    });

           videoMaterial.side = THREE.DoubleSide;
           videoMaterial.uniforms.texture.value = videoTexture;

           //Add video plane
           var planeGeometry = new THREE.PlaneGeometry(1080, 720, 1, 1);
           plane = new THREE.Mesh(planeGeometry, videoMaterial);
           plane.z = 0;
           plane.scale.x = plane.scale.y = 1.45;
           scene.add(plane);


           mesh = new THREE.Mesh(geometry, videoMaterial);
           //scene.add(mesh);
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

         function initKeyboard() {
           keyboard = new THREEx.KeyboardState();

         }

         function init() {
           initKeyboard();
           initStats();
           initScene();
           initDatGui();
           initVideo();

           initWebGlRenderer();
           initComposer();
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
//           mesh.rotation.x += 0.01;
//           mesh.rotation.y += 0.02;

           if (keyboard.pressed("w")) {
             mesh.rotation.x -= 0.03;
           } else if (keyboard.pressed("s")) {
             mesh.rotation.x += 0.03;
           } else if (keyboard.pressed("a")) {
             mesh.rotation.y -= 0.02;
           } else if (keyboard.pressed("d")) {
             mesh.rotation.y += 0.02;
           }else if (keyboard.pressed("y")) {
             camera.position.y += 10;
             camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
           }else if (keyboard.pressed("x")) {
             camera.position.y -= 10;
             camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
           }else if (keyboard.pressed("k")) {
              scene.remove(plane);
             scene.add(mesh);
           }else if (keyboard.pressed("p")) {
             scene.remove(mesh);
             scene.add(plane);
           }
           requestAnimationFrame(animate);
         }

         init();
         animate();

       });
