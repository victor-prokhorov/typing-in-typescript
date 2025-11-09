"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    x;
    constructor(x) {
        this.x = x;
    }
}
class Circle extends Shape {
    radius;
    constructor(radius, x) {
        super(x);
        this.radius = radius;
    }
}
class ColoredCircle extends Circle {
    color;
    constructor(color, radius, x) {
        super(radius, x);
        this.color = color;
    }
}
const coloredCircle = new ColoredCircle("black", 10, 0);
console.log(coloredCircle);
//# sourceMappingURL=index.js.map