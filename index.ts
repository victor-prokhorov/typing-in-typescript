// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ

// unknown is the most generic

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

// never is most specific

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
// parameter type is contravariant i.e. it is safe to pass supertypes when assigning
const coloredCircleConsumer: ColoredCircleConsumer = shapeConsumer;
// here we just assigned a more generic type (Shape) in the parameter position
// where a more specific type (ColoredCircle) was expected

{
	const coloredCircle: ColoredCircle = coloredCircleBuilder();
	coloredCircleConsumer(coloredCircle);
	const shape: Shape = shapeBuilder();
	// here we need a generic Shape, but more specific ColoredCircle is still a Shape
	console.assert((shape as any).color === "black");
	// this shape is a ColoredCircle
	shapeConsumer(shape);
}

{
	// parameter position type is contravariant
	const circleConsumer = (circle: Circle) => console.log({ circle });
	// @ts-expect-error: cannot pass supertype
	circleConsumer(new Shape());
	// can pass subtype
	circleConsumer(new ColoredCircle());
}

{
	// return position type is covariant
	const circleBuilder: () => Circle = () => new Circle();
	// we need at least a Shape and Circle is a more specific Shape, this is fine
	const shape: Shape = circleBuilder();
	// @ts-expect-error: we need a ColoredCircle but Circle is lacking some properties
	const coloredCircle: ColoredCircle = circleBuilder();
}

// now the fun part
// unknown type is like any type but it forces the user to narrow it down
// unknown is a supertype to any type (top type)
// never is a subtype to any type (bottom type)

// classical and very intuitive so far
{
	// we expect anything thus string which is a subtype of unknown is also fine here
	// because return type is covariant and we do return a subtype which is safe
	const buildAnything: unknown = () => "string";
	const consumeAnything = (anything: unknown) => console.log(anything);
	consumeAnything("string");
	const neverReturns = (): never => {
		throw new Error("this function never returns because it throws exiting normal flow");
	};
	try {
		const result: never = neverReturns();
	} catch {
	}
}

{
	// most generic when calling the function and passing the parameter
	type UnknownConsumer = (mostGeneric: unknown) => void;
	// most specific when calling the function and passing the parameter
	type NeverConsumer = (mostSpecific: never) => void;	

	let acceptsNothing: NeverConsumer = (mostSpecific: never) => {
		// mostSpecific cannot have a type
		// that is more specific that itself, and naturally we expect
		// a subtype in the parameter position when calling the function
		// thus this code is unreachable
		console.log(mostSpecific);
	};
	// @ts-expect-error: string is not specific enough
	acceptsNothing("string");
	const acceptsEverything: UnknownConsumer = (mostGeneric: unknown) => {
		// in javascript everything is printable
		console.log(mostGeneric);
	};
	
	// lol? 🤯🤯🤯
	acceptsNothing = acceptsEverything;

	// well of course this is because of contravariance in function parameters
}

// let's push further
// do you see what's coming?
const map = new Map<number, never>();

async function proc(id: number, cb: (x: never) => Promise<void>, map: Map<number, never>): Promise<void> {
	const value = map.get(id);	
	if (!value) return;
	await cb(value);	
}

async function stringCb(x: string): Promise<void> {
	console.log(x);
}

async function anythingCb(anything: unknown): Promise<void> {
	console.log(anything);
}

function setValue<T>(map: Map<number, T>, id: number, value: T): void {
	map.set(id, value);
}


setValue(map, 123, "456");
proc(123, stringCb, map);
proc(123, anythingCb, map);

// now covariant leaks into position where you don't exepct it,
// naturally because it interacts with parameter position contravariant in assignment
// so here again in Map<number, never>, never actually the top type, the most open type
