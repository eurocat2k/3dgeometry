
class Point extends Array {
    mag() {
        let p = this
        return Math.sqrt(
            (p[0] * p[0]) +
            (p[1] * p[1]) +
            (p[2] * p[2])
        )
    }
    static mag(p) {
        if (!!p && p instanceof Point) {
            return Math.sqrt(
                (p[0] * p[0]) +
                (p[1] * p[1]) +
                (p[2] * p[2])
            )
        }
    }
}

export default Point
