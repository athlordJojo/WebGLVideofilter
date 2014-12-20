/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.VideoShader = {

  uniforms: {
    "texture": { type: "t", value: null },
    "red": {type: "f", value: 1.0 },
    "green": {type: "f", value: 0.0 },
    "blue": {type: "f", value: 0.0 }
  },

  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [
//    "uniform sampler2D texture;",
//    "uniform float red;",
//    "uniform float green;",
//    "uniform float blue;",
//    "varying vec2 vUv;",
//
//    "void main() {",
//    "vec4 color = texture2D(texture, vUv);",
//    "color.r = color.r + red;",
//    "color.g = color.g + green;",
//    "color.b = color.b + blue;",
//    "gl_FragColor = color;",
//    "}"

    "uniform sampler2D texture;",
    "uniform float red;",
    "uniform float green;",
    "uniform float blue;",
    "varying vec2 vUv;",

    "void main() {",
    "vec4 color = texture2D(texture, vUv);",
    "float diffRG = color.r - color.g;",
    "float diffRB = color.r - color.b;",
    "if(diffRG > 0.15 && diffRB > 0.15){",
    "   color.r = red;",
    "   color.g = green;",
    "   color.b = blue;",
    "}",
    "gl_FragColor = color;",
    "}"

  ].join("\n")

};
