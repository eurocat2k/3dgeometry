import Vector from "../vector/index.js";

const EPSILON = 10e-9;
class Segment {
    constructor(p0 = new Vector, p1 = new Vector) {
        if (p0 instanceof Vector && p1 instanceof Vector) {
            this.p0 = p0
            this.p1 = p1
        } else if (p0 instanceof Vector) {
            this.p0 = p0
            this.p1 = new Vector
        } else if (p1 instanceof Vector) {
            this.p0 = new Vector
            this.p1 = p1
        } else {
            this.p0 = new Vector
            this.p1 = new Vector
        }
    }

    static intsect(s0, s1) {
        /**
         * Plucker Coordinates way
         * Given line segment P limited by points P1 and P2 and line segment Q limited by points Q1 and Q2.
         * The Plucker Coordinates of line P is given by a pair of 3d vectors (Pd, Pm):
         *
         *   Pd = P2 - P1
         *   Pm = P1 × P2
         *
         *   Where Pm is the cross-product of P1 and P2. The Plucker Coordinates (Qd, Qm) of line Q can be calculated in exactly the same way.
         *   The lines P and Q only can intersect if they are coplanar. The lines P and Q are coplanar iif:
         *
         *   Pd • Qm + Qd • Pm = 0
         *
         *   Where (•) is the dot-product. Since machines have finite precision a robust test should check not for zero but for a small number. If Pd × Qd = 0 then lines are parallel (here 0 is the zero vector). Again a robust test should be for instamce that the squared length of (Pd × Qd) is small.
         *   If the lines are not parallel then they are coplanar and their intersection (called "meet" in Plucker's jargon) will be the point:
         *
         *   x = ((Pm • N) Qd - (Qm • N) Pd - (Pm • Qd) N) / (Pd × Qd) • N
         *
         *   Where N is any coordinate axis vector (i.e., (1,0,0) or (0,1,0) or (0,0,1)), such that (Pd × Qd) • N is non-zero.
         *   If the neither P nor Q pass through the origin, then their Plucker coordinates Pm and Qm respectively will be non-zero and the following sinpler formula will work
         *
         *   x = Pm × Qm / Pd • Qm
         */
        if (!!s0 && !!s1 && s0 instanceof Segment && s1 instanceof Segment) {
            let Pd = Vector.sub(s0.p1, s0.p0)
            let Pm = Vector.cross(s0.p0, s0.p1)
            let Qd = Vector.sub(s1.p1, s1.p0)
            let Qm = Vector.cross(s1.p0, s1.p1)

            console.log({Pd, Pm, Qd, Qm})

            if (Vector.cross(Pd, Qd) <= Number.EPSILON) {
                return false
            }

            console.log({'Pd x Qd': Vector.cross(Pd, Qd)})
            console.log({'Pd . Qm': Vector.dot(Pd, Qm)})
            if (Vector.dot(Pd, Qm) > Number.EPSILON) {
                console.log({ 'Pd . Pm': Vector.dot(Pd, Pm) })
                console.log({ 'Qd . Qm': Vector.dot(Qd, Qm) })
                if (Vector.dot(Pd, Pm) + Vector.dot(Qd, Qm) == 0) {
                    // they intersect
                    console.log({ 'Pm x Qm': Vector.cross(Pm, Qm) })
                    console.log({'Pd .Qm': Vector.dot(Pd, Qm)})
                    return Vector.scale(Vector.cross(Pm, Qm), 1.0 / Vector.dot(Pd, Qm))
                }
            }
        }
        return false
    }

    static segseg(s0, s1) {
        /**
         *Let's starting points are P0, Q0, and ending points are P1, Q1.
         * Direction vectors
         *
         * DP = P1 - P0
         * DQ = Q1 - Q0
         *
         * start difference vector
         *
         * PQ = Q0 - P0
         *
         * Segment in parametric form:
         *
         * P = P0 + t * DP
         * Q = Q0 + u * DQ
         *
         * Find values
         *
         * a = Dot(DP, DP)
         * b = Dot(DP, DQ)
         * c = Dot(DQ, DQ)
         * d = Dot(DP, PQ)
         * e = Dot(DQ, PQ)
         *
         * Find discriminant
         *
         * DD = a * c- b * b
         *
         * If DD = 0, then segments are parallel, and consider special case of (partial) coincidence, else
         * Find parameters for the closest points on lines
         *
         * tt = (b * e - c * d) / DD
         * uu = (a * e - b * d) / DD
         *
         * If any parameter is out of range 0..1, then segments don't intersect, else
         * Find distance between points
         *
         * P(tt) = P0 + tt * DP
         * Q(uu) = Q0 + uu * DQ
         * Dist = Length(Q(uu) - P(tt))
         *
         * If Dist is zero (or less than some small Epsilon value like 1.0E-12 due to numerical errors), then segments are intersect in this point P(tt)
         */
        if (!!s0 && !!s1 && s0 instanceof Segment && s1 instanceof Segment) {
            let DP = Vector.sub(s0.p1, s0.p0)
            let DQ = Vector.sub(s1.p1, s1.p0)

            let PQ = Vector.sub(s1.p0, s0.p0)

            let a = Vector.dot(DP, DP)
            let b = Vector.dot(DP, DQ)
            let c = Vector.dot(DQ, DQ)
            let d = Vector.dot(DP, PQ)
            let e = Vector.dot(DQ, PQ)

            let DD = a * c - b * b

            if (DD <= Number.EPSILON) {
                // get distance of the end ponits each
                console.log('Paralell')
                return false
            }

            let tt = (b * e - c * d) / DD
            let uu = (a * e - b * d) / DD

            if (tt >= 0 && tt <= 1 || uu >= 0 && uu <= 1) {
                // there is an intersection
                let Ptt = Vector.add(s0.p0, (tt * DP))
                let Quu = Vector.add(s1.p0, (uu * DQ))
                let dist = Vector.dist(Quu, Ptt)
                return {
                    ptt: Ptt,
                    quu: Quu,
                    dist
                }
            }
        }
        return false
    }
}

export default Segment
