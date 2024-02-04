import Point from "../point/index.js"
import Line from "../line/index.js";
import { lerp } from "../math/index.js";

const decimals = 15;
const rotMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];    // a 3x3 matrix

class Vector extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z)
    }
    // or normalize
    unit() {
        return new Vector(
            (this[0] / Vector.mag(this)),
            (this[1] / Vector.mag(this)),
            (this[2] / Vector.mag(this))
        )
        return false
    }
    static unit(p0) {
        if (!!p0 && p0 instanceof Vector) {
            return new Vector(
                (p0[0] / Vector.mag(p0)),
                (p0[1] / Vector.mag(p0)),
                (p0[2] / Vector.mag(p0))
            )
        }
        return false
    }
    // magnitude
    mag() {
        return Math.sqrt(
            (this[0] * this[0]) +
            (this[1] * this[1]) +
            (this[2] * this[2])
        )
        return false
    }
    static mag(p0) {
        if (!!p0 && p0 instanceof Vector) {
            return Math.sqrt(
                (p0[0] * p0[0]) +
                (p0[1] * p0[1]) +
                (p0[2] * p0[2])
            )
        }
        return false
    }
    // scale: multiply or divide by scalar
    scale(k = 1) {
        if (!isNaN(k)) {
            return new Vector(
                this[0] * k,
                this[1] * k,
                this[2] * k
            )
        }
        return false
    }
    static scale(p0, k = 1) {
        if (!!p0 && p0 instanceof Vector && !isNaN(k)) {
            return new Vector(
                p0[0] * k,
                p0[1] * k,
                p0[2] * k
            )
        }
        return false
    }
    // addition: vector - vector or a kind of scaler
    add(p1) {
        if (!!p1 && p1 instanceof Vector) {
            return new Vector(
                (this[0] + p1[0]),
                (this[1] + p1[1]),
                (this[2] + p1[2]),
            )
        } else if (!!p1 && !isNaN(p1)) {
            return new Vector(
                (this[0] + p1),
                (this[1] + p1),
                (this[2] + p1),
            )
        }
        return false
    }
    static add(p0, p1) {
        if (!!p0 && !!p1 && p0 instanceof Vector && p1 instanceof Vector) {
            return new Vector(
                (p0[0] + p1[0]),
                (p0[1] + p1[1]),
                (p0[2] + p1[2]),
            )
        } else if (!!p0 && !!p1 && p0 instanceof Vector && !isNaN(p1)) {
            return new Vector(
                (p0[0] + p1),
                (p0[1] + p1),
                (p0[2] + p1),
            )
        }
        return false
    }
    // subtraction: vector - vector or a scaler see above
    sub(p1) {
        if (!!p1 && p1 instanceof Vector) {
            return new Vector(
                (this[0] - p1[0]),
                (this[1] - p1[1]),
                (this[2] - p1[2]),
            )
        } else if (!!p1 && !isNaN(p1)) {
            return new Vector(
                (this[0] - p1),
                (this[1] - p1),
                (this[2] - p1),
            )
        }
        return false
    }
    static sub(p0, p1) {
        if (!!p0 && !!p1 && p0 instanceof Vector && p1 instanceof Vector) {
            return new Vector(
                (p0[0] - p1[0]),
                (p0[1] - p1[1]),
                (p0[2] - p1[2]),
            )
        } else if (!!p0 && !!p1 && p0 instanceof Vector && !isNaN(p1)) {
            return new Vector(
                (p0[0] - p1),
                (p0[1] - p1),
                (p0[2] - p1),
            )
        }
        return false
    }
    // normalize - unit vector
    norm() {
        let m = Vector.mag(this)
        if (m !== 0) {
            return new Vector(
                this[0] / m,
                this[1] / m,
                this[2] / m
            )
        }
        return false
    }
    static norm(p0) {
        if (!!p0 && p0 instanceof Vector) {
            let m = Vector.mag(p0)
            if (m !== 0) {
                return new Vector(
                    p0[0] / m,
                    p0[1] / m,
                    p0[2] / m
                )
            }
        }
        return false
    }
    // find direction
    direction() {
        if (this[0] == 0 && this[1] == 0 && this[2] == 0) return false
        let r = Vector.mag(this)
        if (r !== 0) {
            // get sigma first
            let sigma = NaN
            if (this[2] > 0) {
                sigma = Math.atan(
                    Math.sqrt(
                        (this[0] * this[0]) +
                        (this[1] * this[1])
                    ) / this[2]
                )
            } else if (this[2] < 0) {
                sigma = (
                    Math.atan(
                        Math.sqrt(
                            (this[0] * this[0]) +
                            (this[1] * this[1])
                        ) / this[2]
                    ) + Math.PI
                )
            } else if (this[2] == 0 && this[0] !== 0 && this[1] !== 0) {
                Math.PI * .5
            } else {
                sigma = NaN
            }
            // get phi next
            let phi = NaN
            if (this[0] > 0) {
                phi = Math.atan((this[1] / this[0]))
            } else if (this[0] < 0 && this[1] >= 0) {
                phi = Math.atan((this[1] / this[0])) + Math.PI
            } else if (this[0] < 0 && this[1] < 0) {
                phi = Math.atan((this[1] / this[0])) - Math.PI
            } else if (this[0] == 0 && this[1] > 0) {
                phi = Math.PI * .5
            } else if (this[0] == 0 && this[1] < 0) {
                phi = Math.PI * -.5
            }
            return { r, sigma, phi }
        }
        return false
    }
    static direction(p0) {
        if (!!p0 && p0 instanceof Vector) {
            if (p0[0] == 0 && p0[1] == 0 && p0[2] == 0) return false
            let r = Vector.mag(p0)
            if (r !== 0) {
                // get sigma first
                let sigma = NaN
                if (p0[2] > 0) {
                    sigma = Math.atan(
                        Math.sqrt(
                            (p0[0] * p0[0]) +
                            (p0[1] * p0[1])
                        ) / p0[2]
                    )
                } else if (p0[2] < 0) {
                    sigma = (
                        Math.atan(
                            Math.sqrt(
                                (p0[0] * p0[0]) +
                                (p0[1] * p0[1])
                            ) / p0[2]
                        ) + Math.PI
                    )
                } else if (p0[2] == 0 && p0[0] !== 0 && p0[1] !== 0) {
                    Math.PI * .5
                } else {
                    sigma = NaN
                }
                // get phi next
                let phi = NaN
                if (p0[0] > 0) {
                    phi = Math.atan((p0[1] / p0[0]))
                } else if (p0[0] < 0 && p0[1] >= 0) {
                    phi = Math.atan((p0[1] / p0[0])) + Math.PI
                } else if (p0[0] < 0 && p0[1] < 0) {
                    phi = Math.atan((p0[1] / p0[0])) - Math.PI
                } else if (p0[0] == 0 && p0[1] > 0) {
                    phi = Math.PI * .5
                } else if (p0[0] == 0 && p0[1] < 0) {
                    phi = Math.PI * -.5
                }
                return { r, sigma, phi }
            }
        }
        return false
    }
    // cross product
    cross(p1) {
        if (!!p1 && p1 instanceof Vector) {
            return new Vector(
                // x
                ((this[1] * p1[2]) - (p1[1] * this[2])),
                // y
                -((this[0] * p1[2]) - (p1[0] * this[2])),
                // z
                ((this[0] * p1[1]) - (p1[0] * this[1]))
            )
        }
        return false
    }
    static cross(p0, p1) {
        if (!!p0 && !!p1 && p0 instanceof Vector && p1 instanceof Vector) {
            return new Vector(
                // x
                ((p0[1] * p1[2]) - (p1[1] * p0[2])),
                // y
                -((p0[0] * p1[2]) - (p1[0] * p0[2])),
                // z
                ((p0[0] * p1[1]) - (p1[0] * p0[1]))
            )
        }
        return false
    }
    // dot product
    dot(p1) {
        if (!!p1  && p1 instanceof Vector) {
            return ((this[0] * p1[0]) + (this[1]*p1[1]) + (this[2]*p1[2]))
        }
        return false
    }
    static dot(p0, p1) {
        if (!!p0 && !!p1 && p0 instanceof Vector && p1 instanceof Vector) {
            return ((p0[0] * p1[0]) + (p0[1]*p1[1]) + (p0[2]*p1[2]))
        }
        return false
    }
    // distance
    dist(p1) {
        if (!!p1 && p1 instanceof Vector) {
        return Math.sqrt(
                (p1[0] - this[0]) * (p1[0] - this[0])
                +
                (p1[1] - this[1]) * (p1[1] - this[1])
                +
                (p1[2] - this[2]) * (p1[2] - this[2])
            )
        }
        return false
    }
    static dist(p0, p1) {
        if (!!p0 && !!p1 && p0 instanceof Vector && p1 instanceof Vector) {
        return Math.sqrt(
                (p1[0] - p0[0]) * (p1[0] - p0[0])
                +
                (p1[1] - p0[1]) * (p1[1] - p0[1])
                +
                (p1[2] - p0[2]) * (p1[2] - p0[2])
            )
        }
        return false
    }
    // is equal two vectors
    isEqualTo(p1) {
        return (this[0] === p1[0] && this[1] === p1[1] && this[2] === p1[2])
    }
    static isEqualTo(p0, p1) {
        return (p0[0] === p1[0] && p0[1] === p1[1] && p0[2] === p1[2])
    }
    // is linearly dependent of two vectors
    isLinearlyDependent (p1) {
        // Same
        if (this[0] === p1[0] && this[1] === p1[1] && this[2] === p1[2]) {
            return true
        }

        // Factors of each, if one of those can
        const dx = this[0] / p1[0]
        const dy = this[1] / p1[1]
        const dz = this[2] / p1[2]

        // All factors are the same
        if (dx === dy && dy === dz && dx === dz) {
            return true
        }

        // One factor can produce this vector
        if (p1.timesScalar(dx).isEqualTo(this) || p1.timesScalar(dy).isEqualTo(this) || p1.timesScalar(dz).isEqualTo(this)) {
            return true
        }

        return false
    }
    /**
     * @name isLinearlyDependent
     * @description Checks if b is multiple of this vector
     * @param {Vector} a
     * @param {Vector} b
     * @return {boolean}
     */
    static isLinearlyDependent (p0, p1) {
        // Same
        if (p0[0] === p1[0] && p0[1] === p1[1] && p0[2] === p1[2]) {
            return true
        }

        // Factors of each, if one of those can
        const dx = p0[0] / p1[0]
        const dy = p0[1] / p1[1]
        const dz = p0[2] / p1[2]

        // All factors are the same
        if (dx === dy && dy === dz && dx === dz) {
            return true
        }

        // One factor can produce this vector
        if (p1.scale(dx).isEqualTo(p0) || p1.scale(dy).isEqualTo(p0) || p1.scale(dz).isEqualTo(p0)) {
            return true
        }

        return false
    }
    // applyToTransformMatrix
    applyToTransformMatrix(m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]) {
        return new Vector(
            parseFloat(((m[0][0] * this[0]) + (m[1][0] * this[1]) + (m[2][0] * this[2])).toFixed(decimals)),
            parseFloat(((m[0][1] * this[0]) + (m[1][1] * this[1]) + (m[2][1] * this[2])).toFixed(decimals)),
            parseFloat(((m[0][2] * this[0]) + (m[1][2] * this[1]) + (m[2][2] * this[2])).toFixed(decimals))
        );
    }
    // rotate
    /**
     * @name rotate
     * @param {Number} axis: 0 = x, 1 = y, 2 = z
     * @param {Number} angle: 0..359.99999
     */
    rotate(axis = 0, angle = 0) {
        if (!!axis && !!angle) {
            if ((!isNaN(axis) && axis >= 0 && axis <= 2)) {
                let ang = (((angle % 360) + 360) % 360);    // oriented angle between 0..360
                ang = (ang / 180.0) * Math.PI;
                let sin = Math.sin(ang);
                let cos = Math.cos(ang);

                return this.applyToTransformMatrix([
                    // x component
                    [
                        (axis === 0 ? 1 : cos).toFixed(decimals),
                        (axis === 2 ? sin : 0).toFixed(decimals),
                        (axis === 1 ? -1 * sin : 0).toFixed(decimals)
                    ],
                    // y component
                    [
                        (axis === 2 ? -1 * sin : 0).toFixed(decimals),
                        (axis === 1 ? 1 : cos).toFixed(decimals),
                        (axis === 0 ? sin : 0).toFixed(decimals)
                    ],
                    // z component
                    [
                        (axis === 1 ? sin : 0).toFixed(decimals),
                        (axis === 0 ? 1 : cos).toFixed(decimals),
                        (axis === 2 ? 1 : cos).toFixed(decimals)
                    ]
                ]);
            }
        }
        return this
    }
    static rotate(v0 = new Vector, axis = 0, angle = 0) {
        if (!!v0 && v0 instanceof Vector && !!axis && !!angle) {
            if ((!isNaN(axis) && axis >= 0 && axis <= 2)) {
                let ang = (((angle % 360) + 360) % 360);    // oriented angle between 0..360
                ang = (ang / 180.0) * Math.PI;
                let sin = Math.sin(ang);
                let cos = Math.cos(ang);

                return v0.applyToTransformMatrix([
                    // x component
                    [
                        (axis === 0 ? 1 : cos).toFixed(decimals),
                        (axis === 2 ? sin : 0).toFixed(decimals),
                        (axis === 1 ? -1 * sin : 0).toFixed(decimals)
                    ],
                    // y component
                    [
                        (axis === 2 ? -1 * sin : 0).toFixed(decimals),
                        (axis === 1 ? 1 : cos).toFixed(decimals),
                        (axis === 0 ? sin : 0).toFixed(decimals)
                    ],
                    // z component
                    [
                        (axis === 1 ? sin : 0).toFixed(decimals),
                        (axis === 0 ? 1 : cos).toFixed(decimals),
                        (axis === 2 ? 1 : cos).toFixed(decimals)
                    ]
                ]);
            }
        }
        return v0
    }
    // rotate around vector
    /**
     * @name rotateAroundVector
     * @param {Vector} v
     * @param {Number} angle
     */
    rotateAroundVector(v = new Vector, angle = 0) {
        if (!!v && !!angle) {
            if (v instanceof Vector && !isNaN(angle)) {
                let ang = (((angle % 360) + 360) % 360);
                ang = (ang / 180.0) * Math.PI;
                let n1, n2, n3;
                n1 = v[0];
                n2 = v[1];
                n3 = v[2];
                let sin, cos;
                sin = Math.sin(ang);
                cos = Math.cos(ang);
                return this.applyToTransformMatrix([
                    [
                        (((n1 * n1) * (1 - cos)) + cos),
                        (((n2 * n1) * (1 - cos)) + (n3 * sin)),
                        (((n3 * n1) * (1 - cos)) - (n2 * sin))
                    ],
                    [
                        (((n1 * n2) * (1 - cos)) + (n3 * sin)),
                        (((n2 * n2) * (1 - cos)) + cos),
                        (((n3 * n2) * (1 - cos)) + (n1 * sin))
                    ],
                    [
                        (((n1 * n3) * (1 - cos)) + (n2 * sin)),
                        (((n2 * n3) * (1 - cos)) - (n1 * sin)),
                        (((n3 * n3) * (1 - cos)) + cos)
                    ]
                ]);
            }
        }
        return this;
    }
    static rotateAroundVector(v0 = new Vector, v = new Vector, angle = 0) {
        if (!!v0 && !!v && !!angle) {
            if (v0 instanceof Vector && v instanceof Vector && !isNaN(angle)) {
                let ang = (((angle % 360) + 360) % 360);
                ang = (ang / 180.0) * Math.PI;
                let n1, n2, n3;
                n1 = v[0];
                n2 = v[1];
                n3 = v[2];
                let sin, cos;
                sin = Math.sin(ang);
                cos = Math.cos(ang);
                return v0.applyToTransformMatrix([
                    [
                        (((n1 * n1) * (1 - cos)) + cos),
                        (((n2 * n1) * (1 - cos)) + (n3 * sin)),
                        (((n3 * n1) * (1 - cos)) - (n2 * sin))
                    ],
                    [
                        (((n1 * n2) * (1 - cos)) + (n3 * sin)),
                        (((n2 * n2) * (1 - cos)) + cos),
                        (((n3 * n2) * (1 - cos)) + (n1 * sin))
                    ],
                    [
                        (((n1 * n3) * (1 - cos)) + (n2 * sin)),
                        (((n2 * n3) * (1 - cos)) - (n1 * sin)),
                        (((n3 * n3) * (1 - cos)) + cos)
                    ]
                ]);
            }
            return v0;
        }
        return false;
    }
    // rotateAroundLine
    rotateAroundLine(l = new Line, angle = 0) {
        if (!!l && l instanceof Line && !!angle && !isNaN(angle)) {
            let n = Vector.norm(l.l);
            return this.sub(l.l0).rotateAroundVector(n, angle).add(l.l0);
        }
        return this;
    }
    static rotateAroundLine(l0 = new Vector, l = new Line, angle = 0) {
        if (!!l0 && l0 instanceof Vector && !!l && l instanceof Line && !!angle && !isNaN(angle)) {
            let n = Vector.norm(l.l);
            return l0.sub(l.l0).rotateAroundVector(n, angle).add(l.l0);
        }
        return l0;
    }
    // lerp3D
    lerp3D(v = new Vector, t = 1) {
        if (!!v && v instanceof Vector && !!t && !isNaN(t)) {
            return new Vector(
                lerp(this[0], v[0], t),
                lerp(this[1], v[1], t),
                lerp(this[2], v[2], t)
            )
        }
        return this;
    }
    static lerp3D(v0 = new Vector, v = new Vector, t = 1) {
        if (!!v0 && v0 instanceof Vector && !!v && v instanceof Vector && !!t && !isNaN(t)) {
            return new Vector(
                lerp(v0[0], v[0], t),
                lerp(v0[1], v[1], t),
                lerp(v0[2], v[2], t)
            )
        }
        return new Vector;
    }
}
//
export default Vector
