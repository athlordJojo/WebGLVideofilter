requirejs.config({
                   baseUrl: 'src',
                   paths: {
                     threejs: "../vendor/threejs/build/three",
                     stats: "../vendor/threejs-stats/Stats",
                     datgui: "../vendor/dat.gui/dat.gui"
                   }
                 });

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/app']);