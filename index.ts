// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ

class Shape {
	x: number;
	constructor(x?: number) {
		this.x = x || 0;
	}
}

class Circle extends Shape {
	radius: number;
	constructor(radius?: number, x?: number) {
		super(x);
		this.radius = radius || 10;
	}
}

class ColoredCircle extends Circle {
	color: string;
	constructor(color?: string, radius?: number, x?: number) {
		super(radius, x);
		this.color = color || "black";
	}
}

// subtype/supertype describe the relationship between types
// Circle is a subtype of Shape i.e. Circle is a more specific Shape
// ColoredCircle is a subtype of Circle
// Shape is a supertype of Circle i.e. Shape is a more generic Circle
// Circle is a supertype of ColoredCircle
// https://en.wikipedia.org/wiki/Liskov_substitution_principle
// an object may be replaced by subobject without breaking the program

type ShapeBuilder = () => Shape;
type CircleBuilder = () => Circle;
type ColoredCircleBuilder = () => ColoredCircle;

const coloredCircleBuilder: ColoredCircleBuilder = () => new ColoredCircle();

const coloredCircle = coloredCircleBuilder();

console.log(coloredCircle);
