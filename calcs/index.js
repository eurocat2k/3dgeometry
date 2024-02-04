import Vector from "../src/vector/index.js";
import Line from "../src/line/index.js";
let v0, v1
v0 = new Vector(2, -5, 3)
v1 = new Vector(-1, 3, 7)
console.log({ v0, v1 })
// rotate v0 around x axis 90 degrees
console.log({ rotX: v0.rotate(0, 90) });
console.log({ rotY: v0.rotate(1, 90) });
console.log({ rotZ: v0.rotate(2, 90) });
// rotate v1 around v0 90 degrees
console.log({ rotV1AroundV0: Vector.rotateAroundVector(v1, v0, 90) });
// rotate around line
let lv0 = new Vector(-1, -3, 5);
let lv1 = new Vector(4, 3, 2);
let l0 = new Line(lv0, lv1);
console.log({ l0 });
console.log({ rotV0AroundLine: Vector.rotateAroundLine(v0, l0, 90) });
console.log({ rotV1AroundLine: Vector.rotateAroundLine(v1, l0, 90) });
console.log({ rotV0AroundLine: Vector.rotateAroundLine(v1, l0, -80) });
console.log({ rotV0AroundLine: Vector.rotateAroundLine(v1, l0, 80) });
