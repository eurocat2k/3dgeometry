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
    // // closest distance between two 3D line segments
    // static distance(s1, s2) {
    //     if (!!s1 && !!s2 && s1 instanceof Segment && s2 instanceof Segment) {
    //         let s, t
    //         //     P1 = p1
    //         let P1 = s1.p0
    //         //     P2 = p3
    //         let P2 = s2.p0
    //         //     V1 = p2 - p1
    //         let V1 = Vector.sub(s1.p1, s1.p0)
    //         //     V2 = p4 - p3
    //         let V2 = Vector.sub(s2.p1, s2.p0)
    //         //     V21 = P2 - P1
    //         let V21 = Vector.sub(P2, P1)

    //         //     v22 = np.dot(V2, V2)
    //         let v22 = Vector.dot(V2, V2)
    //         //     v11 = np.dot(V1, V1)
    //         let v11 = Vector.dot(V1, V1)
    //         //     v21 = np.dot(V2, V1)
    //         let v21 = Vector.dot(V2, V1)
    //         //     v21_1 = np.dot(V21, V1)
    //         let v21_1 = Vector.dot(V21, V1)
    //         //     v21_2 = np.dot(V21, V2)
    //         let v21_2 = Vector.dot(V21, V2)
    //         //     denom = v21 * v21 - v22 * v11
    //         let denom = v21 * v21 - v22 * v11

    //         //     if np.isclose(denom, 0.):
    //         if (denom < Number.EPSILON) {
    //             //         s = 0.
    //             s = 0
    //             //         t = (v11 * s - v21_1) / v21
    //             t = ((v11 * s) - (v21_1 / v21))
    //         } else {
    //             //     else:
    //             //         s = (v21_2 * v21 - v22 * v21_1) / denom
    //             s = ((v21_1 * v21) - (v22 * (v21_1 / denom)))
    //             //         t = (-v21_1 * v21 + v11 * v21_2) / denom
    //             t = ((-v21_1 * v21) + ((v11 * v21_1) / denom))
    //         }
    //         //     s = max(min(s, 1.), 0.)
    //         s = Math.max(Math.min(s, 1.), .0)
    //         //     t = max(min(t, 1.), 0.)
    //         t = Math.max(Math.min(t, 1.), .0)

    //         //     p_a = P1 + s * V1
    //         let p_a = Vector.add(P1, Vector.scale(V1, s))
    //         //     p_b = P2 + t * V2
    //         let p_b = Vector.add(P2, Vector.scale(V2, t))
    //         //     return p_a, p_b
    //         return {PA: p_a, PB: p_b, dist: Vector.dist(p_a, p_b)}
    //     }
    //     return false
    // }
    // Paul Bourke's algorithm
    static intsect(s1, s2) {
        //
        let p1, p2, p3, p4;;    // line segment points
        let p13, p43, p21;    // vectors
        let d1343,d4321,d1321,d4343,d2121;
        let numer, denom;

        p1 = s1.p0
        p2 = s1.p1

        p3 = s2.p0
        p4 = s2.p1

        // p13.x = p1.x - p3.x;
        // p13.y = p1.y - p3.y;
        // p13.z = p1.z - p3.z;
        p13 = new Vector(
            (p1[0] - p3[0]),
            (p1[1] - p3[1]),
            (p1[2] - p3[2])
        )

        // p43.x = p4.x - p3.x;
        // p43.y = p4.y - p3.y;
        // p43.z = p4.z - p3.z;
        p43 = new Vector(
            (p4[0] - p3[0]),
            (p4[1] - p3[1]),
            (p4[2] - p3[2])
        )

        if (Math.abs(p43[0]) < Number.EPSILON && Math.abs(p43[1]) < Number.EPSILON && Math.abs(p43[2]) < Number.EPSILON)
            return (false);

        // p21.x = p2.x - p1.x;
        // p21.y = p2.y - p1.y;
        // p21.z = p2.z - p1.z;
        p21 = new Vector(
            (p2[0] - p1[0]),
            (p2[1] - p1[1]),
            (p2[2] - p1[2])
        )

        if (Math.abs(p21[0]) < Number.EPSILON && Math.abs(p21[1]) < Number.EPSILON && Math.abs(p21[2]) < Number.EPSILON)
            return(false);

        let _d1343 = Vector.dot(p13, p43)
        d1343 = p13[0] * p43[0] + p13[1] * p43[1] + p13[2] * p43[2];
        let _d4321 = Vector.dot(p43, p21)
        d4321 = p43[0] * p21[0] + p43[1] * p21[1] + p43[2] * p21[2];
        let _d1321 = Vector.dot(p13, p21)
        d1321 = p13[0] * p21[0] + p13[1] * p21[1] + p13[2] * p21[2];
        let _4343 = Vector.dot(p43, p43)
        d4343 = p43[0] * p43[0] + p43[1] * p43[1] + p43[2] * p43[2];
        let _d2121 = Vector.dot(p21, p21)
        d2121 = p21[0] * p21[0] + p21[1] * p21[1] + p21[2] * p21[2];

        denom = d2121 * d4343 - d4321 * d4321;
        if (Math.abs(denom) < Number.EPSILON)
            return(false);
        numer = d1343 * d4321 - d1321 * d4343;

        let mua = numer / denom;
        let mub = (d1343 + d4321 * mua) / d4343;

        // pa->x = p1.x + *mua * p21.x;
        // pa->y = p1.y + *mua * p21.y;
        // pa -> z = p1.z + * mua * p21.z;

        // pb->x = p3.x + *mub * p43.x;
        // pb->y = p3.y + *mub * p43.y;
        // pb->z = p3.z + *mub * p43.z;
        return {
            PA: new Vector(
                (p1[0] + (mua * p21[0])),
                (p1[1] + (mua * p21[1])),
                (p1[2] + (mua * p21[2]))
            ),
            PB: new Vector(
                (p3[0] + (mub * p43[0])),
                (p3[1] + (mub * p43[1])),
                (p3[2] + (mub * p43[2]))
            )
        }
    }

    // static intsect(s0, s1) {
    //     if (!!s0 && !!s1 && s0 instanceof Segment && s1 instanceof Segment) {
    //     // /**
    //     //  * Plucker Coordinates way
    //     //  * Given line segment P limited by points P1 and P2 and line segment Q limited by points Q1 and Q2.
    //     //  * The Plucker Coordinates of line P is given by a pair of 3d vectors (Pd, Pm):
    //     //  *
    //         //  *   Pd = P2 - P1
    //         let Pd = Vector.sub(s0.p1, s0.p0)
    //         let Qd = Vector.sub(s1.p1, s1.p0)
    //         //  *   Pm = P1 × P2
    //         let Pm = Vector.cross(s0.p0, s0.p1)
    //         let Qm = Vector.cross(s1.p0, s1.p1)
    //     //  *
    //     //  *   Where Pm is the cross-product of P1 and P2. The Plucker Coordinates (Qd, Qm)
    //     //  *   of line Q can be calculated in exactly the same way.
    //     //  *   The lines P and Q only can intersect if they are coplanar. The lines P and Q are coplanar iif:
    //     //  *
    //         //  *   Pd • Qm + Qd • Pm = 0
    //         let isCoPlanar = Vector.dot(Pd, Qm) + Vector.dot(Qd, Pm)
    //         // if (isCoPlanar) return false
    //     //  *
    //     //  *   Where (•) is the dot-product. Since machines have finite precision
    //     //  *   a robust test should check not for zero but for a small number.
    //     //  *   If Pd × Qd = 0 then lines are parallel(here 0 is the zero vector).
    //         let isParalell = Vector.cross(Pd, Qd)
    //     //  *   Again a robust test should be for instamce that the squared length of(Pd × Qd) is small.
    //     //  *   If the lines are not parallel then they are coplanar and their
    //     //  *   intersection (called "meet" in Plucker's jargon) will be the point:
    //     //  *
    //     //  *   x = ((Pm • N) Qd - (Qm • N) Pd - (Pm • Qd) N) / (Pd × Qd) • N
    //     //  *
    //     //  *   Where N is any coordinate axis vector (i.e., (1,0,0) or (0,1,0) or (0,0,1)),
    //     //  *   such that(Pd × Qd) • N is non - zero.
    //     //  *   If the neither P nor Q pass through the origin, then their Plucker coordinates Pm and Qm
    //     //  *   respectively will be non - zero and the following sinpler formula will work
    //     //  *
    //     //  *   x = Pm × Qm / Pd • Qm
    //         // let x = Vector.scale(Vector.cross(Pm, Qm), Vector.dot(Pd, Qm))
    //         let PmQm = Vector.cross(Pm, Qm)
    //         let PdQm = Vector.dot(Pd, Qm)
    //         let x = Vector.scale(PmQm, 1.0 / PdQm)

    //         console.log({ Pd, Pm, Qd, Qm, isCoPlanar, isParalell, PmQm, PdQm, x })

    //     //  */
    //     }
    //     return false
    // }

    // static segseg(s0, s1) {
    //     /**
    //      *Let's starting points are P0, Q0, and ending points are P1, Q1.
    //      * Direction vectors
    //      *
    //      * DP = P1 - P0
    //      * DQ = Q1 - Q0
    //      *
    //      * start difference vector
    //      *
    //      * PQ = Q0 - P0
    //      *
    //      * Segment in parametric form:
    //      *
    //      * P = P0 + t * DP
    //      * Q = Q0 + u * DQ
    //      *
    //      * Find values
    //      *
    //      * a = Dot(DP, DP)
    //      * b = Dot(DP, DQ)
    //      * c = Dot(DQ, DQ)
    //      * d = Dot(DP, PQ)
    //      * e = Dot(DQ, PQ)
    //      *
    //      * Find discriminant
    //      *
    //      * DD = a * c- b * b
    //      *
    //      * If DD = 0, then segments are parallel, and consider special case of (partial) coincidence, else
    //      * Find parameters for the closest points on lines
    //      *
    //      * tt = (b * e - c * d) / DD
    //      * uu = (a * e - b * d) / DD
    //      *
    //      * If any parameter is out of range 0..1, then segments don't intersect, else
    //      * Find distance between points
    //      *
    //      * P(tt) = P0 + tt * DP
    //      * Q(uu) = Q0 + uu * DQ
    //      * Dist = Length(Q(uu) - P(tt))
    //      *
    //      * If Dist is zero (or less than some small Epsilon value like 1.0E-12 due to numerical errors), then segments are intersect in this point P(tt)
    //      */
    //     if (!!s0 && !!s1 && s0 instanceof Segment && s1 instanceof Segment) {
    //     }
    //     return false
    // }
}

export default Segment
