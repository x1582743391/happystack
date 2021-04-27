import TWEEN from '@tweenjs/tween.js'
import { createGame} from './createCube'
import { AmbientLight, Color, PerspectiveCamera, Scene, SpotLight, Vector3, WebGLRenderer } from 'three';

window.focus();
// create a scene, that will hold all our elements such as objects, cameras and lights.
const scene: Scene = new Scene();

// create a camera, which defines where we're looking at.
const camera: PerspectiveCamera = new PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a render and set the size
const renderer: WebGLRenderer = new WebGLRenderer();
renderer.setClearColor(new Color('0xffffff'));
renderer.setClearAlpha(0.1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// // show axes in the screen
// const axes: THREE.AxesHelper = new THREE.AxesHelper(20);
// scene.add(axes);
// position and point the camera to the center of the scene
camera.position.set(-60, 50, 60);
camera.lookAt(new Vector3(0,4,0));
// add subtle ambient lighting
var ambienLight = new AmbientLight(0x353535);
scene.add(ambienLight);

// add spotlight for the shadows
var spotLight = new SpotLight(0xffffff);
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

