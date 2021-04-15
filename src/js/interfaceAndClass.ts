
// 可以用来表示位置，size等参数
export class XYZObj {
	x: number
	y: number
	z: number
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}
// cube的属性
export class CubeProperty {
	x: number
	y: number
	z: number
	color: string
	dir: 'x' | 'z' | 'y'//移动方向
	constructor(x: number = 0, y: number = 0, z: number = 0, dir: 'x' | 'y' | 'z' = 'x') {
		this.x = x;
		this.y = y;
		this.z = z;
		this.color = '#ffffff';
		this.dir = dir;
	}
}
