var s3 = 1.0 / Math.sqrt(3);
var pi = Math.PI;
var cos60 = Math.cos(60.0/pi);
var sin60 = Math.sin(60.0/pi);
var cos30 = Math.cos(30.0/pi);
var sin30 = Math.sin(30.0/pi);

var SquareVertex =
[
    {x:0, y:0, z:0},
    {x:0, y:1, z:0},
    {x:1, y:1, z:0},
    {x:1, y:0, z:0}
];

var SquareFaces =
[
    {a:0, b:1, c:2, i:0},
    {a:2, b:3, c:0, i:0}
];

var CubeVertex =
[
    {x:0, y:0, z:0},
    {x:0, y:0, z:1},
    {x:0, y:1, z:0},
    {x:0, y:1, z:1},
    {x:1, y:0, z:0},
    {x:1, y:0, z:1},
    {x:1, y:1, z:0},
    {x:1, y:1, z:1}
];

var CubeFaces =
[
    {a:0, b:1, c:2, i:0},
    {a:1, b:2, c:3, i:0},
    {a:4, b:5, c:6, i:1},
    {a:5, b:6, c:7, i:1},
    {a:0, b:1, c:5, i:2},
    {a:0, b:4, c:5, i:2},
    {a:2, b:3, c:7, i:3},
    {a:2, b:6, c:7, i:3},
    {a:1, b:3, c:7, i:4},
    {a:1, b:5, c:7, i:4},
    {a:0, b:2, c:6, i:5},
    {a:0, b:4, c:6, i:5}
];

var SphereVertex =
[
    {x:-s3,  y:-s3,  z:s3},
    {x:-s3,  y:s3,   z:s3},
    {x:s3,   y:s3,   z:s3},
    {x:s3,   y:-s3,  z:s3},
    {x:-s3,  y:-s3,  z:-s3},
    {x:-s3,  y:s3,   z:-s3},
    {x:s3,   y:s3,   z:-s3},
    {x:s3,   y:-s3,  z:-s3},

    {x:0,   y:0,   z:1},
    {x:-1,  y:0,   z:0},
    {x:0,   y:1,   z:0},
    {x:1,   y:0,   z:0},
    {x:0,   y:-1,  z:0},
    {x:0,   y:0,   z:-1}
];

var SphereFaces =
[
     // Front
    { a:0, b:1, c:8, i:1 },
    { a:1, b:2, c:8, i:2 },
    { a:2, b:3, c:8, i:3 },
    { a:3, b:0, c:8, i:4 },

    // Bottom
    { a:0, b:1, c:9, i:5 },
    { a:1, b:5, c:9, i:6 },
    { a:5, b:4, c:9, i:7 },
    { a:4, b:0, c:9, i:8 },

    // Right
    { a:1, b:2, c:10, i:9 },
    { a:2, b:6, c:10, i:10 },
    { a:6, b:5, c:10, i:11 },
    { a:5, b:1, c:10, i:12 },

    // Top
    { a:2, b:3, c:11, i:13 },
    { a:3, b:7, c:11, i:14 },
    { a:7, b:6, c:11, i:15 },
    { a:6, b:2, c:11, i:16 },

    // Left
    { a:0, b:3, c:12, i:17 },
    { a:3, b:7, c:12, i:18 },
    { a:7, b:4, c:12, i:19 },
    { a:4, b:0, c:12, i:20 },

    // Back
    { a:4, b:5, c:13, i:21 },
    { a:5, b:6, c:13, i:22 },
    { a:6, b:7, c:13, i:23 },
    { a:7, b:4, c:13, i:24 }
];

var CylinderVertex = [];
var CylinderFaces = [];
