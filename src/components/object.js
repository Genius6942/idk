import Point from './point.js';

class GameObject {
	constructor () {
		this.width = 1;
		this.height = 1;
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.useImage = false;
		this.image = null;
		this.color = 'black';
	}

	draw (ctx) {
		if (this.useImage) {
			this.drawFromImage(ctx);
		} else {
			this.drawFromRect(ctx);
		}
	}

	/**
	 * @function drawFromImage
	 * @param {CanvasRenderingContext2D} ctx
	 */
	drawFromImage (ctx) {
		const center = new Point(this.x, this.y);
		ctx.save();
		ctx.translate(center.x, center.y);
		ctx.rotate(this.rotation);
		ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
	}

	/**
	 * @function drawFromRect
	 * @param {CanvasRenderingContext2D} ctx
	 */
	drawFromRect (ctx) {
		const center = new Point(this.x, this.y);
		ctx.save();
		ctx.translate(center.x, center.y);
		ctx.rotate(this.rotation);
		ctx.fillRect(-this.width / 2, - this.height / 2, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.restore();
	}

	loadImage (url, onload, onprogress, onerror) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'arraybuffer';
		xhr.send(null);
		xhr.addEventListener('progress', (e) => {
			onprogress({loaded: e.loaded, total: e.lengthComputable ? e.total : e.loaded, computable: e.lengthComputable});
		});
		xhr.addEventListener('load', (e) => {
			if (xhr.status === 200) {
				// success!
				var blob = new Blob([xhr.response]);
				blob = blob.getBlob ('image/png');
				var reader = new FileReader();
				reader.addEventListener('load', (e) => {
					const element = document.createElement('img');
					element.src = e.target.result;
					onload($('#images').appendChild(element));
				});
			}
		});

		xhr.addEventListener('error', onerror);
	}
}

export default Object;