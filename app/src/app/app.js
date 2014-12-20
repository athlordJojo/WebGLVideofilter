define(['stats', 'THREE', 'datgui', 'EffectComposer', 'BasicShader', 'RenderPass', 'VideoShader', 'KeyboardState'],
       function () {
         var scene, camera, renderer, sphere, stats, video, videoTexture, videoMaterial, plane, guiUniforms, keyboard, render;

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
           scene.add(plane);
         }

         function initCamera() {
           camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
           camera.position.z = 1000;
           camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
         }

         function renderToggle() {
           render = !render;
         }

         function initDatGui() {
           var gui = new dat.GUI();
           guiUniforms = {
             red: 0.0,
             green: 0.0,
             blue: 0.0,
             renderToggle: renderToggle

           };

           gui.add(guiUniforms, 'red', 0, 1);
           gui.add(guiUniforms, 'green', 0, 1);
           gui.add(guiUniforms, 'blue', 0, 1);
           gui.add(guiUniforms, 'renderToggle');
         }

         function initVideo() {
           video = document.createElement('video');
           video.loop = true;
           video.src = "videos/rewe.mov";
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
         }

         function initGeometry() {
           //Add video plane
           var planeGeometry = new THREE.PlaneGeometry(1080, 720, 1, 1);
           plane = new THREE.Mesh(planeGeometry, videoMaterial);
           plane.z = 0;
           plane.scale.x = plane.scale.y = 1.45;

           var sphereGeometry = new THREE.SphereGeometry(1400, 32, 32);
           sphere = new THREE.Mesh(sphereGeometry, videoMaterial);
         }

         function initWebGlRenderer() {
           renderer = new THREE.WebGLRenderer();
           renderer.setSize(window.innerWidth, window.innerHeight);
           document.body.appendChild(renderer.domElement);
           render = true;
         }

         function initKeyboard() {
           keyboard = new THREEx.KeyboardState();
         }

         function init() {
           initKeyboard();
           initStats();
           initCamera();
           initDatGui();
           initVideo();
           initGeometry();
           initScene();

           initWebGlRenderer();
         }

         function updateUniforms() {
           videoMaterial.uniforms.red.value = guiUniforms.red;
           videoMaterial.uniforms.green.value = guiUniforms.green;
           videoMaterial.uniforms.blue.value = guiUniforms.blue;
         }

         function updateKeyboard() {
           if (keyboard.pressed("w")) {
             sphere.rotation.x -= 0.03;
           } else if (keyboard.pressed("s")) {
             sphere.rotation.x += 0.03;
           } else if (keyboard.pressed("a")) {
             sphere.rotation.y -= 0.02;
           } else if (keyboard.pressed("d")) {
             sphere.rotation.y += 0.02;
           } else if (keyboard.pressed("y")) {
             camera.position.y += 10;
             camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
           } else if (keyboard.pressed("x")) {
             camera.position.y -= 10;
             camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
           } else if (keyboard.pressed("k")) {
             scene.remove(plane);
             scene.add(sphere);
           } else if (keyboard.pressed("p")) {
             scene.remove(sphere);
             scene.add(plane);
           }
         }

         function checkVideo() {
           if (video.readyState === video.HAVE_ENOUGH_DATA && videoTexture) {
             videoTexture.needsUpdate = true;
           }
         }

         function animate() {
           stats.begin();

           checkVideo();
           updateUniforms();
           updateKeyboard();

//           requestAnimationFrame(animate);
           setTimeout(animate, 1000 / 24);
           if (render) {
             renderer.render(scene, camera);
           }
           stats.end();
         }

         init();
         animate();
       });
