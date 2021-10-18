class Loader {
	constructor () {
		this.totalBytes = 0;
		this.loads = [];
		this.createElement();
	}

	createElement () {
		this.container = document.body.appendChild(document.createElement('div'));
		this.container.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: black;
			z-index: 100;
		`;
		const innerContainer = this.container.appendChild(document.createElement('div'));
		innerContainer.style.cssText = `
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content-center;
		`;
		const loadingFrame = innerContainer.appendChild(document.createElement('iframe'));
		loadingFrame.src = 'https://genius6942.github.io/loader';
		loadingFrame.style.border = '0px solid black';
		const loadingBarOuter = innerContainer.appendChild(document.createElement('div'));
		loadingBarOuter.style.cssText = `
			width: 40vw;
			height: 5vw;
			border: 5px solid white;
			border-radius: 2.5vw;
		`;
	}
	
}

export default Loader;