"use strict";
// https://www.youtube.com/watch?v=zmvznP1lv3E
// https://www.youtube.com/watch?v=FdFBYUQCuHQ
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
// subtype/supertype describe relationsip between types
// Circle is subtype of Shape i.e. Circle is a more specific Shape
// ColoredCircle is subtype of Circle
// Shape is supertype of Circle i.e. Shape is a more generic Circle
// Circle is supertype of ColoredCircle
// https://en.wikipedia.org/wiki/Liskov_substitution_principle
// object may be replaced by sub-object without breaking the program
const coloredCircle = new ColoredCircle("black", 10, 0);
console.log(coloredCircle);
//# sourceMappingURL=index.js.map