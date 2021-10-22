import Camera from './camera.js';
import Player from './player.js';
import Loader from './loader.js';
import StaticBody from './staticbody.js';
import {Point} from './things.js';

class Game {
	constructor () {

		this.loader = new Loader();
		this.loadNamesUsed = [];
		this.uploadsNeeded = 2;
		this.loadsComplete = 0;
		// create canvas
		this.container = document.body.appendChild(document.createElement('div'));
		this.container.style.cssText = 'top: 0; left: 0; position: fixed;';
		this.canvas = this.container.appendChild(document.createElement('canvas'));
		this.ctx = this.canvas.getContext('2d');

		// crate camera
		this.camera = new Camera();

		this.resize();
		
		this.player = new Player();
		this.player.loadImage(
			this.player.imageURL,
			(total) => {
				this.loader.addLoad('player', total);
				this.loadNamesUsed.push('player');
			},
			
			(image) => {
				this.player.image = image;
				this.player.useImage = true;
				this.loadsComplete += 1;
				if (this.loadsComplete >= this.uploadsNeeded) {
					this.loader.hide();
					this.start();
				}
			},

			(e) => {
				this.loader.updateLoad('player', e.loaded, e.total);
			},

			(e) => {
				console.error(e);
			}
		);

		fetch('../../assets/layout.json').then(r=>r.json()).then(r=>{
			this.staticBodies = r;
			for (let i = 0; i < this.staticBodies.length; i++) {
				const body = new StaticBody(...Object.values(this.staticBodies[i]));
				this.staticBodies[i] = body;
			}
			this.loadsComplete += 1;
				if (this.loadsComplete >= this.uploadsNeeded) {
					this.loader.hide();
					this.start();
				}
			}).catch(e=>console.error('error loading json map file: ' + e));

		this.staticBodies = [];

		window.addEventListener('resize', this.resize.bind(this));
	}

	static Constants = {
		gravity: 1
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

	start () {
		requestAnimationFrame(this.update.bind(this));
	}

	update (time) {
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.player.update(Game.Constants.gravity, this.staticBodies);
		const pc = new Point(this.player.x + this.player.width / 2 - window.innerWidth / 2, this.player.y + this.player.height / 2 - window.innerHeight / 2); // player center
		this.staticBodies.forEach(x=>x.draw(this.ctx, pc));
		this.player.draw(this.ctx, pc);
		requestAnimationFrame(this.update.bind(this));
	}
}
export default Game;