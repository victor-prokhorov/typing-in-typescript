// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ

// more generic
class Shape {
	x: number;
	constructor(x?: number) {
		this.x = x || 0;
	}
}

// reference type
class Circle extends Shape {
	radius: number;
	constructor(radius?: number, x?: number) {
		super(x);
		this.radius = radius || 10;
	}
}

// more specific
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
type ColoredCircleBuilder = () => ColoredCircle;

const coloredCircleBuilder: ColoredCircleBuilder = () => new ColoredCircle();
// return type is covariant i.e. it is safe to return subtypes
const shapeBuilder: ShapeBuilder = coloredCircleBuilder;
// here we just assigned a more specific type (ColoredCircle) in the return position
// where a more generic type (Shape) was expected

type ShapeConsumer = (shape: Shape) => void;
type ColoredCircleConsumer = (coloredCircle: ColoredCircle) => void;

const shapeConsumer: ShapeConsumer = (shape: Shape) => {
	console.log(shape.x);
	// here we have access to x if we get something more specific
	// aka more properties of the shape we don't use them anyway
};
// parameter type is contravariant i.e. it is safe to pass supertypes
const coloredCircleConsumer: ColoredCircleConsumer = shapeConsumer;
// here we just assigned a more generic type (Shape) in the parameter position
// where a more specific type (ColoredCircle) was expected

const coloredCircle: ColoredCircle = coloredCircleBuilder();
coloredCircleConsumer(coloredCircle);
const shape: Shape = shapeBuilder();
// here we need a generic Shape, but more specific ColoredCircle is still a Shape
console.assert((shape as any).color === "black");
// this shape is a ColoredCircle
shapeConsumer(shape);
