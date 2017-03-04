import XY from "util/xy.js";

const CELL = new XY(8, 12);

function drawCell(ctx, xy, color="#000") {
	ctx.fillStyle = color;
	ctx.fillRect(xy.x, xy.y, CELL.x-1, CELL.y-1);
}

export function draw(level) {
	let canvas = document.createElement("canvas");
	canvas.style.backgroundColor = "#000";
	document.body.appendChild(canvas);

	let ctx = canvas.getContext("2d");

	let offset = new XY(1.5*level.radius, 1*level.radius); // level center from canvas left-top
	ctx.canvas.width = CELL.x * 2 * offset.x;
	ctx.canvas.height = CELL.y * 2 * offset.y;

	let xy = new XY();
	for (xy.x=-offset.x; xy.x<=offset.x; xy.x++) {
		for (xy.y=-offset.y; xy.y<=offset.y; xy.y++) {
			let visual = level.visualAt(xy);

			if (!visual) continue;

			let pxy = xy.plus(offset).scale(CELL.x, CELL.y);
			drawCell(ctx, pxy, visual.fg);
		}
	}
}
