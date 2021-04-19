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
export function addMusic(){
	let id = Math.random() + ''
	let ele = <HTMLAudioElement> document.createElement('audio')
	ele.id = id
	ele.src = '/assets/down.mp3'
	ele.loop = false
	ele.volume = 0.3
	ele.preload = 'auto'
	ele.autoplay = true
	ele.addEventListener('ended', () => {
		document.body.removeChild(ele)
	})
	document.body.appendChild(ele)
	ele.play()
}