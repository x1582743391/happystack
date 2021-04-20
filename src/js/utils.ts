export let getGradientColor = (
	function () {
		let start = parseInt('f12711', 16)
		let end = parseInt('f5af19', 16)
		let diff = end - start
		let t=10000
		let change = parseInt(diff / t+'')
		let i = 0
		return function (): string {
			let ans='#' + Number((i++ % t) * change + start).toString(16)
			console.log(ans,change)
			return ans
		}
	}
)()
export function addMusic(url:string,loop:boolean=false,volume:number=0.3,endCB?:Function){
	let id = Math.random() + ''
	let ele = <HTMLAudioElement> document.createElement('audio')
	ele.id = id
	ele.src = url
	ele.loop = loop
	ele.volume = volume
	ele.preload = 'auto'
	ele.autoplay = true
	ele.addEventListener('ended', function(){
		if(typeof endCB=='function'){
			endCB.call(this)
		}
	})
	document.body.appendChild(ele)
	ele.play()
}
