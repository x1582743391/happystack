
import * as THREE from 'three';
import { Tween } from '@tweenjs/tween.js'
import { CubeProperty, XYZObj } from './interfaceAndClass'
import { Box3, Mesh, SpotLight, Vector3 } from 'three';
import {getGradientColor,addMusic} from './utils'
let tween: Tween<XYZObj>;//记录当前点击时需要暂停的动画
let _scen: THREE.Scene
let _camera: THREE.Camera
let _SpotLight:SpotLight
let lookAt: Vector3 = new Vector3(0, 4, 0);

let isStart: number = 0
let context: Element = document.querySelector('#webgl-output')
let mask = <HTMLElement>document.querySelector('#mask');
let scoreEle = <HTMLElement>document.querySelector('#score');
let btn = <HTMLElement>document.querySelector('.btn');
let ggbox = <HTMLElement>document.querySelector('#gg');
let move_V: number = 0.0064;
let down_V: number = .0054;

let score: number = 0
context.addEventListener('mousedown', (event: any) => {
	event = event || window.event;
	if (event.buttons == 1) {
		tween.stop();
	}
}, false)

mask.addEventListener('mousedown', (event: any) => {
	event = event || window.event;
	if (event.buttons == 1) {
		if (isStart++ == 0) {
			let originPositionParam: XYZObj = new XYZObj(0, 0, 0)
			let originCubeProperty: CubeProperty = new CubeProperty(3, 1, 3, 'z')
			ctr(originPositionParam, originCubeProperty)
			mask.style.display = 'none'
		}
	}
}, false)
btn.addEventListener('mousedown', (event: any) => {
	event = event || window.event;
	if (event.buttons == 1) {
		ggbox.style.display = 'none'
		location.reload()
	}
}, false)

let ctr = (function () {
	let flag: boolean = false;
	let cubeQuque: THREE.Mesh[] = [];//储存顶部的立方体
	function dfs(pos: XYZObj, cubeSize: CubeProperty): void {
		cubeSize.color=getGradientColor();
		//创建第一层
		if (cubeQuque.length == 0) {
			cubeQuque.push(createCubeAddSecen(pos, cubeSize));
		}
		pos.y = cubeQuque[cubeQuque.length - 1].position.y + cubeSize.y;
		let target: number = 0;
		if (flag) {
			pos.x = 10;
			cubeSize.dir = 'x';
			target = -10;
		} else {
			pos.z = -10;
			target = 10;
			cubeSize.dir = 'z';
		}
		let cube: THREE.Mesh = createCubeAddSecen(pos, cubeSize);
		let time = Math.abs(pos[cubeSize.dir] - target) / move_V
		let cb = () => {
			let isOk = splitCube(pos, cubeSize, cubeQuque);
			if (isOk == false) {
				ggGame()
				return
			}

			ctr.apply(null, isOk);
			if (cubeQuque[cubeQuque.length - 1].position.y - lookAt.y > 0) {
				let _cameraPos = { y: 0 }
				let o_y = _camera.position.y
				let l_y = lookAt.y
				let light_y=_SpotLight.position.y
				let tween = new Tween(_cameraPos).to({ y: cubeSize.y }, time / 4)
					.onUpdate(() => {
						_camera.position.y = o_y + _cameraPos.y
						lookAt.y = l_y + _cameraPos.y;
						_SpotLight.position.y=light_y+ _cameraPos.y;
						_camera.lookAt(lookAt)
					})
				tween.start()
			}
			score++
			scoreEle.textContent = score + '分'
		}
		bindAnimation(pos, cube, cubeSize.dir, cb, target, time);
		cubeQuque.push(cube);
		flag = !flag;
	}
	return dfs
})()

function createCube(pos: XYZObj, cubesize: CubeProperty): THREE.Mesh {
	let boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(cubesize.x, cubesize.y, cubesize.z);
	let basicMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({ color: cubesize.color || '000000' });
	let cube: THREE.Mesh = new THREE.Mesh(boxGeometry, basicMaterial);
	cube.position.set(pos.x, pos.y, pos.z);
	cube.castShadow = true;
	return cube;
}
function createCubeAddSecen(pos: XYZObj, cubesize: CubeProperty): THREE.Mesh {
	let cube = createCube(pos, cubesize)
	_scen.add(cube)
	return cube
}
function bindAnimation(pos: XYZObj, cube: THREE.Mesh, dir: 'x' | 'y' | 'z', cb?: Function, target: number = 0, delay: number = 4500): any {
	tween = new Tween(pos).to({ [dir]: target }, delay);
	cb = cb || function () { };
	tween.onComplete(() => {
		ggGame()
	})
		.onUpdate(() => {
			cube.position[dir] = pos[dir];
		})
		.onStop(() => {
			cb();
		});
	tween.start();
	return tween;
}
let splitCubeDown = (function () {
	let xQueue: THREE.Mesh[][] = [[], []]
	let zQueue: THREE.Mesh[][] = [[], []]
	let add2opposite = (dir: string, diff: number, cube: THREE.Mesh): void => {
		let index: number = diff > 0 ? 1 : 0;
		let arr = (dir == 'x' ? xQueue : zQueue)[index];//另一个方向切割块数组
		arr.push(cube)
	}
	let dfs = (cubesize: CubeProperty, cube: THREE.Mesh, diff: number, level?: number): void => {
		let index: number = diff > 0 ? 0 : 1;
		let arr = (cubesize.dir == 'x' ? xQueue : zQueue)[index];//当前方向的切割块数组
		let key = cubesize.dir
		level = level != undefined ? level : arr.length - 1;//当前需要比较的位置
		let topCube = arr[level]
		let fn = () => {
			if (arr.length == 0) {
				// 如果切割数组中没有方块，直接缓存
				arr.push(cube)
				return
			}
			if (!topCube) return;
			let topCubeSize = getCubeSize(topCube);
			let curPos: number = cube.position[key];
			let topPos: number = topCube.position[key];
			if (diff < 0) {
				curPos *= -1
				topPos *= -1
			}
			// 暂停切割的情况，直接落在level的顶上
			if (curPos + cubesize[key] / 2 <= topPos + topCubeSize[key] / 2) {

				if (arr[level + 1]) {
					// 替换上一层[1,2,3,4,5]
					arr.splice(level + 1, 1)
				}
				arr.splice(level + 1, 0, cube)
			} else {
				// 需要递归切割情况
				// 这一层不需要暂停的情况,让方块继续往下移动
				if (Math.abs(cube.position[key] - topCube.position[key]) == cubesize[key] + topCubeSize[key]) {
					dfs(cubesize, cube, diff, level - 1)
				} else {
					// 切割出新块的宽度 w=(+|-)(x2-x1)+(w2-w1)/2
					//切割出新的方块的坐标 p=(x1+x2)/2  +|-  (w1+w2)/4
					//   +|- 取决于diff的符号
					_scen.remove(cube)

					// 先生成一个和当前层cube等大但是y坐标++的cube
					let l_cubeSize = { ...cubesize }
					l_cubeSize[key] = topCubeSize[key]
					let l_pos = new XYZObj(cube.position.x, topCube.position.y + cubesize.y, cube.position.z);
					l_pos[key] = topCube.position[key]
					let l_cube = createCubeAddSecen(l_pos, l_cubeSize)
					if (arr[level + 1]) {
						// 替换上一层[1,2,3,4,5]
						arr.splice(level + 1, 1)
					}
					arr.splice(level + 1, 0, l_cube)
					// 切割出来的新cube
					let flag: number = diff > 0 ? 1 : -1
					let x1: number = topCube.position[key]
					let x2: number = cube.position[key]
					let w1: number = topCubeSize[key]
					let w2: number = cubesize[key]

					let w: number = flag * (x2 - x1) + (w2 - w1) / 2
					let p: number = (x1 + x2) / 2 + flag * (w1 + w2) / 4

					let r_cubeSize = { ...cubesize }
					r_cubeSize[key] = w
					let r_pos = new XYZObj(cube.position.x, cube.position.y, cube.position.z);
					r_pos[key] = p
					let r_cube = createCubeAddSecen(r_pos, r_cubeSize)
					dfs(r_cubeSize, r_cube, diff, level - 1)
				}

			}
		}
		let pos = {
			y: cube.position.y
		}
		let target: number = topCube ? topCube.position.y + cubesize.y : 0
		let time: number = Math.abs(pos.y - target) / down_V
		// 给当前块绑定动画，让其移动到栈顶的时候递归的切割
		let tween = new Tween(pos).to({ y: target }, time)
		tween.onComplete(fn)
			.onUpdate(() => {
				cube.position.y = pos.y;
			})
		tween.start()
	}
	return function (cubesize: CubeProperty, cube: THREE.Mesh, diff: number, otherPos: XYZObj) {
		let mid = { ...cubesize }
		mid.color = 'yellow'
		let otherCube: THREE.Mesh = createCube(otherPos, mid);
		add2opposite(cubesize.dir, diff, otherCube);
		dfs(cubesize, cube, diff)
	}
})()
function getCubeSize(cube: THREE.Mesh): THREE.Vector3 {
	let ans = new THREE.Vector3();
	new Box3().setFromObject(cube).getSize(ans);
	return ans
}

// 计算当点击后cube的分割情况.如果返回了布尔值，说明了此时方块不相交。其他时候返回保留的位置信息和属性信息
function splitCube(pos: XYZObj, cubesize: CubeProperty, cubeQuque: THREE.Mesh[]): [XYZObj, CubeProperty] | boolean {
	let key = cubesize.dir;
	let peekPos: THREE.Vector3 = cubeQuque[cubeQuque.length - 2].position;
	let w: number = cubesize[key] / 2;
	let distanceDiff: number = pos[key] - peekPos[key];
	if (distanceDiff < 0) {
		w = -w;
	}
	if (Math.abs(distanceDiff) <0.15) {
		//两个方块完美重叠
		let peek:Mesh=cubeQuque[cubeQuque.length-1];
		peek.position[cubesize.dir]=peekPos[cubesize.dir]
		return [new XYZObj(peek.position.x,peek.position.y,peek.position.z), cubesize]
	}
	_scen.remove(cubeQuque.pop());
	if (Math.abs(distanceDiff) >= cubesize[key]) return false;//两个方块不相交
	addMusic()
	//  交叉 (x1+x2)/2
	// 多余的部分 (x1+x2)/2  +(-) w  由新cube与旧cube相对位置决定

	//不需要掉落的部分
	let intersectPos: XYZObj = { ...pos };
	let sum: number = pos[key] + peekPos[key];
	intersectPos[key] = sum / 2;//移动方向的新坐标
	let intersectSize: CubeProperty = { ...cubesize };
	intersectSize[key] = cubesize[key] - Math.abs(distanceDiff);//该移动方向上的新尺寸
	// intersectSize.color = 'red'
	let intersectCube: THREE.Mesh = createCubeAddSecen(intersectPos, intersectSize);

	cubeQuque.push(intersectCube);

	// 需要掉落的部分
	let downPos: XYZObj = { ...pos };
	downPos[key] = sum / 2 + w;
	let downSize: CubeProperty = { ...cubesize };
	downSize[key] = Math.abs(distanceDiff);
	let downCube: THREE.Mesh = createCubeAddSecen(downPos, downSize);

	let otherPos: XYZObj = { ...pos }
	otherPos[key] = sum / 2 - w;
	otherPos.y -= cubesize.y;
	splitCubeDown(downSize, downCube, distanceDiff, otherPos)
	return [intersectPos, intersectSize];
}
function ggGame() {
	let ggtext = <HTMLElement>document.querySelector('#ggtext');
	ggtext.textContent = '最后得分：' + score	
	ggbox.style.display='flex'
}

export function createGame(scene: THREE.Scene, camera: THREE.Camera,light:THREE.SpotLight) {
	_scen = scene;
	_camera = camera;
	_SpotLight=light

}



