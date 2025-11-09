"use strict";
// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    x;
    constructor(x) {
        this.x = x || 0;
    }
}
class Circle extends Shape {
    radius;
    constructor(radius, x) {
        super(x);
        this.radius = radius || 10;
    }
}
class ColoredCircle extends Circle {
    color;
    constructor(color, radius, x) {
        super(radius, x);
        this.color = color || "black";
    }
}
const coloredCircleBuilder = () => new ColoredCircle();
// return type is covariance i.e. it is safe to return subtypes
const shapeBuilder = coloredCircleBuilder;
// here we just assigned a more specific type (ColoredCircle) in return position
// where a more generic type (Shape) was expected
const coloredCircle = coloredCircleBuilder();
const shape = shapeBuilder();
console.log({ coloredCircle });
console.log({ shape });
//# sourceMappingURL=index.js.map