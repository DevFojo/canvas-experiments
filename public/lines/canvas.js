window.addEventListener('load', () => {
	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	ctx.lineWidth = 5;

	let drawing = false;
	let startX, startY = 0;
	const lines = [];

	const drawLines = e => {
		if (!drawing) {
			lines.push({
				a: [startX, startY],
				b: [e.clientX, e.clientY]
			});
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		lines.forEach(({a, b}) => {
			ctx.beginPath();
			ctx.moveTo(a[0], a[1]);
			ctx.lineTo(b[0], b[1]);
			ctx.stroke();
		});
	};

	const handleMouseDown = e => {
		if (drawing) {
			drawing = false;
			drawLines(e);
			return;
		}
		drawing = true;
		startX = e.clientX;
		startY = e.clientY;
	};

	const handleMouseMove = e => {
		if (!drawing) {
			return;
		}

		drawLines(e);

		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
	};

	canvas.addEventListener('mousedown', handleMouseDown);

	canvas.addEventListener('mousemove', handleMouseMove);

});
