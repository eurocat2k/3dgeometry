// 3D segments intersection
import fs from 'fs/promises'
import path from 'path'
import * as url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.dirname(__dirname);
import { getVersion } from './utils/version.js'
import Vector from './vector/index.js'
import Segment from './segment/index.js'
const title = '3D segments intersection'
let version = await getVersion(rootPath);
let p0 = new Vector(1, 2, 0);
let p1 = Vector.scale(new Vector(1, 1, -1), 5)
let q0 = new Vector(0, 3, 1)
let q1 = Vector.scale(new Vector(2, -1, 3),)

let len0 = Vector.dist(p0, p1);
let len1 = Vector.dist(q0, q1)
let mag00 = Vector.mag(p0)
let mag01 = Vector.mag(p1)
let mag10 = Vector.mag(q0)
let mag11 = Vector.mag(q1)
let u00 = Vector.unit(p0)
let u01 = Vector.unit(p1)
let u10 = Vector.unit(q0)
let u11 = Vector.unit(q1)


console.log({ u00, u01, u10, u11, mag00, mag01, mag10, mag11, len0, len1, dot0: Vector.dot(p0, p1), dot1: Vector.dot(q0, q1), cross0: Vector.cross(p0, p1), cross1: Vector.cross(q0, q1) })

let s0 = new Segment(p0, p1)
let s1 = new Segment(q0, q1)

console.log(Segment.intsect(s0, s1), Segment.segseg(s0, s1))


let v1 = new Vector(-1, 1, 1), v2 = new Vector(1, 1, 2)
console.log({
    v1,
    v2,
    cross: Vector.cross(v1, v2),
    dot: Vector.dot(v1, v2),
    add: Vector.sub(v1, v2),
    sub: Vector.add(v1, v2),
    scale1: Vector.scale(v1, 2),
    scale2: Vector.scale(v2, .5),
    mag1: Vector.mag(v1),
    mag2: Vector.mag(v2),
    comp: Vector.dot(Vector.cross(v1, v2), new Vector(2, 2, 1)),
    unit1: Vector.unit(v1),
    unit2: Vector.unit(v2),
    norm0: Vector.norm(v1),
    norm2: Vector.norm(v2),
    dir1: Vector.direction(v1),
    dir2: Vector.direction(v2)
})

let ll1 = Vector.direction(v1)
console.log({
    ll1,
    phi: (180.0 * ll1.phi) / Math.PI,
    sigma: (180.0 * ll1.sigma) / Math.PI
})
let ll2 = Vector.direction(v2)
console.log({
  ll2,
  phi: (180.0 * ll2.phi) / Math.PI,
  sigma: (180.0 * ll2.sigma) / Math.PI
})
