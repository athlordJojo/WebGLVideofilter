/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

THREE.VideoShader = {

  uniforms: {
    "texture": { type: "t", value: null }
  },

  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
    "vUv = uv;",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join("\n"),

  fragmentShader: [
    "uniform sampler2D texture;",
    "varying vec2 vUv;",

    "void main() {",
    "vec4 color = texture2D(texture, vUv);",
    "color.r = color.r + 0.5;",
    "gl_FragColor = color;",
    "}"

  ].join("\n")

};
