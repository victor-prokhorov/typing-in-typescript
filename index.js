"use strict";
// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ
Object.defineProperty(exports, "__esModule", { value: true });
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
// parameter type is contravariant i.e. it is safe to pass supertypes
const coloredCircleConsumer = shapeConsumer;
// here we just assigned a more generic type (Shape) in the parameter position
// where a more specific type (ColoredCircle) was expected
const coloredCircle = coloredCircleBuilder();
coloredCircleConsumer(coloredCircle);
const shape = shapeBuilder();
// here we need a generic Shape, but more specific ColoredCircle is still a Shape
console.assert(shape.color === "black");
// this shape is a ColoredCircle in reality
shapeConsumer(shape);
//# sourceMappingURL=index.js.map