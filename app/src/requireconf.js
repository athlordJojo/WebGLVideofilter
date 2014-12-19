requirejs.config({
                   baseUrl: 'src',
                   paths: {
                     THREE: "../vendor/threejs/build/three",
                     stats: "../vendor/threejs-stats/Stats",
                     datgui: "../vendor/dat.gui/dat.gui",
                     RenderPass: '../vendor/threejs-dist/extra/postprocessing/RenderPass',
                     EffectComposer: "../vendor/threejs-dist/extra/postprocessing/EffectComposer",
                     ShaderPass: "../vendor/threejs-dist/extra/postprocessing/ShaderPass",
                     MaskPass: "../vendor/threejs-dist/extra/postprocessing/MaskPass",
                     CopyShader: "../vendor/threejs-dist/extra/shaders/CopyShader",
                     BasicShader: "../vendor/threejs-dist/extra/shaders/BasicShader",
                     VideoShader: "shaders/VideoShader"
                   },
                   shim: {
                     THREE: {
                       exports: 'THREE'
                     },
                     CopyShader: {
                       exports: 'CopyShader',
                       deps: ['THREE']
                     },
                     SSAOShader: {
                       deps: ['THREE']
                     },
                     EffectComposer: {
                       deps: ['THREE', 'ShaderPass', 'CopyShader', 'MaskPass']
                     },
                     RenderPass: {
                       deps: ['THREE']
                     },
                     MaskPass: {
                       exports: "MaskPass",
                       deps: ['THREE']
                     },
                     ShaderPass: {
                       exports: 'ShaderPass',
                       deps: ['THREE']
                     },
                     BasicShader: {
                       deps: ['THREE']
                     },
                     VideoShader: {
                       deps: ['THREE']
                     }
                   }
                 }
);

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/app']);