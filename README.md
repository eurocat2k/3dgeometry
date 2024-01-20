# 3D geometry
 3D geometry in JavaScript

## Vectors
![3D coordinate space](img/360px-3D_Spherical_2.svg.png)
> Figure 1: the 3D space

Our vector is an object which extends standard Array object - derived as [Point](point/index.js?plain=1#L2) from javascript, see [source](vector/index.js?plain=1#L3).

### Static methods

- [dist](vector/index.js#L157) - distance between two vectors
- [dot](vector/index.js#L150) - dot product
- [cross](vector/index.js#L136) - cross product
- [direction](vector/index.js#L89) - angle components of 3D vector see [Figure 1](README.md#L4) above
- [norm](vector/index.js#L75) - normalize vector
- [sub](vector/index.js#L58) - subtract
- [add](vector/index.js#L41) - addition
- [scale](vector/index.js#L30) - product or divide by scalar
- [mag](vector/index.js#L19) - magnitude
- [unit](vector/index.js#L8) - unit vector (*see norm*)

--------------------------------------------------------------------
