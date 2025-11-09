class Shape {
	x: number;
	constructor(x: number) {
		this.x = x;
	}
}

class Circle extends Shape {
	radius: number;
	constructor(radius: number, x: number) {
		super(x);
		this.radius = radius;
	}
}

class ColoredCircle extends Circle {
	color: string;
	constructor(color: string, radius: number, x: number) {
		super(radius, x);
		this.color = color;
	}
}

const coloredCircle = new ColoredCircle("black", 10, 0);
console.log(coloredCircle);
