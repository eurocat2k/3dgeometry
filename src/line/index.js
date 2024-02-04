import Vector from "../vector";
class Line {
    /**
     * @constructor
     * @param {Vector} bL base vector
     * @param {Vector} dL direction vector
     */
    constructor(bL = new Vector, dL = new Vector) {
        this.l0 = bL
        this.l = Vector.sub(dL, bL)
        this.lPrime = dL
    }
    // rotate
    rotate(alpha = 0, betha = 0) {
        this.l = this.l.rotate(0, alpha);
        this.l = this.l.rotate(2, betha)
    }
    static rotate(l0, alpha = 0, betha = 0) {
        l0.l = l0.l.rotate(0, alpha);
        l0.l = l0.l.rotate(2, betha);
        return l0;
    }
    // rotate around another line
    rotateAroundLine(line = new Line, angle = 0) {
        if (!!line && line instanceof Line && !isNaN(angle)) {
            return new Line(
                this.l0.rotateAroundLine(line, angle),
                this.lPrime.rotateAroundLine(line, angle)
            );
        }
        return this;
    }
    static rotateAroundLine(line0 = new Line, line = new Line, angle = 0) {
        if (!!line0 && line0 instanceof Line && !!line && line instanceof Line && !isNaN(angle)) {
            return new Line(
                line0.l0.rotateAroundLine(line, angle),
                line0.lPrime.rotateAroundLine(line, angle)
            );
        }
        return line0;
    }
}

export default Line;
