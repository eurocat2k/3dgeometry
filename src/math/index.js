export function clamp(num, min, max) {
    if (!!num && !isNaN(num) && !!min && !isNaN(min) && !!max && !isNaN(max)) {
        return Math.max(min, Math.min(num, max));
    }
    return NaN;
}

export function lerp(a, b, t) {
    if (!!a && !isNaN(a) && !!b && !isNaN(b) && !!t && !isNaN(t)) {
        return a + (b - a) * t;
    }
    return NaN;
}
