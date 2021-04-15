import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { createGame} from './createCube'
import { Vector3 } from 'three';

window.focus();
// create a scene, that will hold all our elements such as objects, cameras and lights.
const scene: THREE.Scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a render and set the size
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// // show axes in the screen
// const axes: THREE.AxesHelper = new THREE.AxesHelper(20);
// scene.add(axes);
// position and point the camera to the center of the scene
camera.position.set(-60, 50, 60);
camera.lookAt(new Vector3(0,4,0));
// add subtle ambient lighting
var ambienLight = new THREE.AmbientLight(0x353535);
scene.add(ambienLight);

// add spotlight for the shadows
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-10, 20, -5);
spotLight.castShadow = true;
scene.add(spotLight);
createGame(scene,camera,spotLight)
// add the output of the renderer to the html element
document.getElementById("webgl-output").appendChild(renderer.domElement);
render()

// render the scene
function render() {
	requestAnimationFrame(render)
	TWEEN.update()
	renderer.render(scene, camera);
	camera.updateMatrix()
	spotLight.updateMatrix()
}

