import Vector from "../vector";
import Segment from "../segment";
import Line from "../line";
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

        if (Vector.isLinearlyDependent(r1, r2)) {
            throw new Error(`Plane cannot be created the two direction vectors are linearly dependent`)
        }
        this.n = Vector.cross(r1, r2)
        this.p0 = p0
    }
    // intersection with line segment
    intersectSegment(l = new Line) {
        let a = this.p0.sub(l.l0).scale(this.n)
        let b = l.l.scale(this.n);

        // if a == 0, line paralell. if b == 0, line is on the plane
        if (a === 0 || b === 0) {
            return null
        }

        let d = a / b;

        return l.l.scale(d).add(l.l0);
    }
}

export default Plane;
