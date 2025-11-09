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
const coloredCircle = coloredCircleBuilder();
console.log(coloredCircle);
//# sourceMappingURL=index.js.map