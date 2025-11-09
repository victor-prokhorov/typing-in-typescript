"use strict";
// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ
Object.defineProperty(exports, "__esModule", { value: true });
// unknown is the most generic
// more generic
class Shape {
    x;
    constructor(x) {
        this.x = x || 0;
    }
}
// reference type
class Circle extends Shape {
    radius;
    constructor(radius, x) {
        super(x);
        this.radius = radius || 10;
    }
}
// more specific
class ColoredCircle extends Circle {
    color;
    constructor(color, radius, x) {
        super(radius, x);
        this.color = color || "black";
    }
}
const coloredCircleBuilder = () => new ColoredCircle();
// return type is covariant i.e. it is safe to return subtypes
const shapeBuilder = coloredCircleBuilder;
const shapeConsumer = (shape) => {
    console.log(shape.x);
    // here we have access to x if we get something more specific
    // aka more properties of the shape we don't use them anyway
};
// parameter type is contravariant i.e. it is safe to pass supertypes when assigning
const coloredCircleConsumer = shapeConsumer;
// here we just assigned a more generic type (Shape) in the parameter position
// where a more specific type (ColoredCircle) was expected
{
    const coloredCircle = coloredCircleBuilder();
    coloredCircleConsumer(coloredCircle);
    const shape = shapeBuilder();
    // here we need a generic Shape, but more specific ColoredCircle is still a Shape
    console.assert(shape.color === "black");
    // this shape is a ColoredCircle
    shapeConsumer(shape);
}
{
    // parameter position type is contravariant
    const circleConsumer = (circle) => console.log({ circle });
    // @ts-expect-error: cannot pass supertype
    circleConsumer(new Shape());
    // can pass subtype
    circleConsumer(new ColoredCircle());
}
{
    // return position type is covariant
    const circleBuilder = () => new Circle();
    // we need at least a Shape and Circle is a more specific Shape, this is fine
    const shape = circleBuilder();
    // @ts-expect-error: we need a ColoredCircle but Circle is lacking some properties
    const coloredCircle = circleBuilder();
}
// now the fun part
// unknown type is like any type but it forces the user to narrow it down
// unknown is a supertype to any type (top type)
// never is a subtype to any type (bottom type)
// classical and very intuitive so far
{
    // we expect anything thus string which is a subtype of unknown is also fine here
    // because return type is covariant and we do return a subtype which is safe
    const buildAnything = () => "string";
    const consumeAnything = (anything) => console.log(anything);
    consumeAnything("string");
    const neverReturns = () => {
        throw new Error("this function never returns because it throws exiting normal flow");
    };
    try {
        const result = neverReturns();
    }
    catch {
    }
}
{
    let acceptsNothing = (mostSpecific) => {
        // mostSpecific cannot have a type
        // that is more specific that itself, and naturally we expect
        // a subtype in the parameter position when calling the function
        // thus this code is unreachable
        console.log(mostSpecific);
    };
    // @ts-expect-error: string is not specific enough
    acceptsNothing("string");
    const acceptsEverything = (mostGeneric) => {
        // in javascript everything is printable
        console.log(mostGeneric);
    };
    // lol? 🤯🤯🤯
    acceptsNothing = acceptsEverything;
    // well of course this is because of contravariance in function parameters
}
// let's push further
// do you see what's coming?
const map = new Map();
async function proc(id, cb, map) {
    const value = map.get(id);
    if (!value)
        return;
    await cb(value);
}
async function stringCb(x) {
    console.log(x);
}
async function anythingCb(anything) {
    console.log(anything);
}
function setValue(map, id, value) {
    map.set(id, value);
}
setValue(map, 123, "456");
proc(123, stringCb, map);
proc(123, anythingCb, map);
// now covariant leaks into position where you don't exepct it,
// naturally because it interacts with parameter position contravariant in assignment
// so here again in Map<number, never>, never actually the top type, the most open type
//# sourceMappingURL=index.js.map