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

//Complex shapes
function makeSphere(size, r, theta, orbit, w, deg, color) {
    var newFaces = SphereFaces.slice();
    var newVertex = SphereVertex.slice();
    addSphereFaces(newFaces, newVertex, deg);
    for (var n = 0; n < newVertex.length; n++) {
        var v = newVertex[n];
        var i = v.x * size;
        var j = v.y * size;
        var k = v.z * size;
        newVertex[n] = {x:i, y:j, z:k};
    }

    Objects.push({v:newVertex, f:newFaces, r:r, theta:theta, rev:orbit, w:w, c:color});
}

function addSphereFaces(newFaces, newVertex, deg) {
    for (var c = 0; c < deg; c++) {
        var length = newFaces.length; //newFaces.length increases over loop;
        for (var n = 0; n < length; n++) {
            var f = newFaces[0];
            var i = newVertex[f.a];
            var j = newVertex[f.b];
            var r2 = {x:(i.x+j.x), y:(i.y+j.y), z:(i.z+j.z)};
            var mag = (Math.sqrt(Math.pow(r2.x,2)+Math.pow(r2.y,2)+Math.pow(r2.z,2)));
            var r = {x:(r2.x/mag), y:(r2.y/mag), z:(r2.z/mag)};
            newVertex.push(r);
            newFaces.push({a:f.a, b:f.c, c:newVertex.length-1, i:2*n});
            newFaces.push({a:f.b, b:f.c, c:newVertex.length-1, i:2*n+1});
            newFaces.splice(0,1);
        }
    }
}

//From character
function makeSphereM(deg, d, p, o, color) {
    var newFaces = SphereFaces.slice();
    var newVertex = SphereVertex.slice();

    //Add faces
    for (var c = 0; c < deg; c++) {
        var length = newFaces.length; //newFaces.length increases over loop;
        for (var n = 0; n < length; n++) {
            var f = newFaces[0];
            var i = newVertex[f.a];
            var j = newVertex[f.b];
            var r = {x:(i.x+j.x), y:(i.y+j.y), z:(i.z+j.z)};
            var mag = (Math.sqrt(Math.pow(r.x,2)+Math.pow(r.y,2)+Math.pow(r.z,2)));
            r = {x:(r.x/mag), y:(r.y/mag), z:(r.z/mag)};
            newVertex.push(r);
            newFaces.push({a:f.a, b:f.c, c:newVertex.length-1, i:2*n});
            newFaces.push({a:f.b, b:f.c, c:newVertex.length-1, i:2*n+1});
            newFaces.splice(0,1);
        }
    }

    //Change size and position
    for (var n = 0; n < newVertex.length; n++) {
        var v = newVertex[n];
        newVertex[n] = {x:(v.x*d.x), y:(v.y*d.y), z:(v.z*d.z)};
    }

    var m = {x:0, y:0, z:0, xy:0, yz:0};
    var center = {x:0, y:0, z:0};
    Objects.push({v:newVertex, f:newFaces, center:center, p:p, o:o, m:m, color:color});
    return Objects[Objects.length-1];
}

function makeCylinderM(deg, d, p, o, color) {
    var newVertex = CylinderVertex.slice();
    var newFaces = CylinderFaces.slice();
    var v_num = 4*(deg+2);
    var step = 2*Math.PI/v_num;

    //Create points
    for (var n = 0; n < v_num; n++) {
        newVertex.push({x:Math.cos(n*step), y:Math.sin(n*step), z:n%2});
    }
    newVertex.push({x:0, y:0, z:0});
    newVertex.push({x:0, y:0, z:1});
    newVertex.push({x:0, y:0, z:.5});

    //Change size
    for (var n = 0; n < newVertex.length; n++) {
        var v = newVertex[n];
        newVertex[n] = {x:(v.x*d.x), y:(v.y*d.y), z:(v.z*d.z)};
    }

    //Make faces
    for (var n = 0; n < v_num; n++) {
        newFaces.push({a:n, b:(n+1)%v_num, c:(n+2)%v_num, i:1});
        newFaces.push({a:n, b:v_num + n%2, c:(n+2)%v_num, i:1});
    }

    var m = {x:0, y:0, z:0, xy:0, yz:0};
    Objects.push({v:newVertex, f:newFaces, bottom:newVertex[v_num], top:newVertex[v_num+1], center:newVertex[v_num+2], p:p, o:o, m:m, color:color});
    return Objects[Objects.length-1];
}

//From maze
// function makeSphere(deg, d, p, o, color) {
//     var newFaces = SphereFaces.slice();
//     var newVertex = SphereVertex.slice();
//
//     //Add faces
//     for (var c = 0; c < deg; c++) {
//         var length = newFaces.length; //newFaces.length increases over loop;
//         for (var n = 0; n < length; n++) {
//             var f = newFaces[0];
//             var i = newVertex[f.a];
//             var j = newVertex[f.b];
//             var r = {x:(i.x+j.x), y:(i.y+j.y), z:(i.z+j.z)};
//             var mag = (Math.sqrt(Math.pow(r.x,2)+Math.pow(r.y,2)+Math.pow(r.z,2)));
//             r = {x:(r.x/mag), y:(r.y/mag), z:(r.z/mag)};
//             newVertex.push(r);
//             newFaces.push({a:f.a, b:f.c, c:newVertex.length-1, i:2*n});
//             newFaces.push({a:f.b, b:f.c, c:newVertex.length-1, i:2*n+1});
//             newFaces.splice(0,1);
//         }
//     }
//
//     //Change size and position
//     for (var n = 0; n < newVertex.length; n++) {
//         var v = newVertex[n];
//         newVertex[n] = {x:(v.x*d.x), y:(v.y*d.y), z:(v.z*d.z)};
//     }
//
//     var m = {x:0, y:0, z:0, xz:0, yz:0};
//     var center = {x:0, y:0, z:0};
//     Objects.push({v:newVertex, f:newFaces, center:center, p:p, o:o, m:m, color:color});
//     return Objects[Objects.length-1];
// }
//
// function makeCylinderM(deg, d, p, o, color) {
//     var newVertex = CylinderVertex.slice();
//     var newFaces = CylinderFaces.slice();
//     var v_num = 4*(deg+2);
//     var step = 2*Math.PI/v_num;
//
//     //Create points
//     for (var n = 0; n < v_num; n++) {
//         newVertex.push({x:Math.cos(n*step), y:Math.sin(n*step), z:n%2});
//     }
//     newVertex.push({x:0, y:0, z:0});
//     newVertex.push({x:0, y:0, z:1});
//     newVertex.push({x:0, y:0, z:.5});
//
//     //Change size
//     for (var n = 0; n < newVertex.length; n++) {
//         var v = newVertex[n];
//         newVertex[n] = {x:(v.x*d.x), y:(v.y*d.y), z:(v.z*d.z)};
//     }
//
//     //Make faces
//     for (var n = 0; n < v_num; n++) {
//         newFaces.push({a:n, b:(n+1)%v_num, c:(n+2)%v_num, i:1});
//         newFaces.push({a:n, b:v_num + n%2, c:(n+2)%v_num, i:1});
//     }
//
//     var m = {x:0, y:0, z:0, xz:0, yz:0};
//     Objects.push({v:newVertex, f:newFaces, bottom:newVertex[v_num], top:newVertex[v_num+1], center:newVertex[v_num+2], p:p, o:o, m:m, color:color});
//     return Objects[Objects.length-1];
// }
