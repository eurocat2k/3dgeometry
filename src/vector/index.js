import Point from "../point/index.js"

class Vector extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z)
    }
    // or normalize
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
    static dot(p0, p1) {
        if (!!p0 && !!p1 && p0 instanceof Vector && p1 instanceof Vector) {
            return ((p0[0] * p1[0]) + (p0[1]*p1[1]) + (p0[2]*p1[2]))
        }
        return false
    }
    // distance
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
}
//
export default Vector
