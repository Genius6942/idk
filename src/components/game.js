import Camera from './camera.js';
import Player from './player.js';
import Loader from './loader.js';
class Game {
	constructor () {

		this.loader = new Loader();
		// create canvas
		this.container = document.body.appendChild(document.createElement('div'));
		this.container.style.cssText = 'top: 0; left: 0; position: fixed;';
		this.canvas = this.container.appendChild(document.createElement('canvas'));
		this.ctx = this.canvas.getContext('2d');

		// crate camera
		this.camera = new Camera();

		this.resize();
		
		
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.player = new Player();
	}

	resize () {
		// resize canvas
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.height = window.innerHeight;
		this.width  = window.innerWidth;

		// resize camera
		this.camera.resize();
	}
}
export default Game;