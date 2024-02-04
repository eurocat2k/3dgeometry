import Vector from "../vector";
class Plane {
    /**
     * @constructor
     * @param {Vector} oP center of the plane
     * @param {Vector} aP a vector of the plane from origin
     * @param {Vector} bP b vector of the plane from origin
     */
    constructor(oP = new Vector(0, 0, 0), aP = new Vector(1, 0, 0), bP = new Vector(0, 1, 0)) {
        const r1 = Vector.sub(aP, oP)
        const r2 = Vector.sub(bP, oP)
    }
}
