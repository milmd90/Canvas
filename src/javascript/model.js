var speed = 1;
//var s3 = 1.0 / Math.sqrt(3);

var SolarSystem = [
    {n:"Sun",     s:76.70, r:0.0,  o:0, w:0, c:{R:255,G:255,B:0}},
    {n:"Mercury", s:0.267, r:1.9,  o:0, w:0, c:{R:255,G:0  ,B:0}},
    {n:"Venus",   s:0.664, r:3.6,  o:0, w:0, c:{R:0  ,G:255,B:0}},
    {n:"Earth",   s:0.669, r:5.0,  o:0, w:0, c:{R:0  ,G:0  ,B:255}},
    {n:"Mars",    s:0.371, r:7.6,  o:0, w:0, c:{R:255,G:0  ,B:0}},
    {n:"Jupiter", s:7.658, r:25.9, o:0, w:0, c:{R:255,G:50 ,B:0}},
    {n:"Saturn",  s:6.391, r:47.5, o:0, w:0, c:{R:255,G:100,B:0}},
    {n:"Uranus",  s:2.576, r:95.4, o:0, w:0, c:{R:0  ,G:255,B:255}},
    {n:"Neptune", s:2.494, r:150,  o:0, w:0, c:{R:0  ,G:255,B:255}}
];

/*
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

*/

function makeSphere(deg, d_x, d_y, d_z, p_x, p_y, p_z, color) {
    var newFaces = SphereFaces.slice();
    var newVertex = SphereVertex.slice();
    addSphereFaces(newFaces, newVertex, deg);
    for (var n = 0; n < newVertex.length; n++) {
        var v = newVertex[n];
        var i = v.x * d_x;
        var j = v.y * d_y;
        var k = v.z * d_z;
        newVertex[n] = {x:(i-p_x), y:(j-p_y), z:(k-p_z)};
    }

    Objects.push({v:newVertex, f:newFaces, color:color});
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

var Objects = [];

function Init() {
    CameraPos.z = -200;
    CameraRot = {x:1, y:0, z:0};
    makeSolarSystem();
}

function makeSolarSystem() {
    var m = SolarSystem[0].s;
    for (var i = 0; i < SolarSystem.length; i++) {
        var b = SolarSystem[i];
        var r = SolarSystem[i].r;
        if (i === 0) {o = 0;}
        else {o = 5*Math.sqrt(m/Math.pow(r,3));}
        makeSphere(Math.log(b.s+1)/Math.LN10, b.r, 0, speed*o, speed*b.w, Math.ceil(Math.log(b.s+1)/Math.LN10), b.c);
    }
}

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

function RenderScene() {
    //Increment time
    TotalTime += .01;

    // Render the background
    RenderBackground(0,0,0);//ContextHandle

    // Create an on-screen point list we will be working with
    var PointList = new Array();

    //For each object
    for (var n = 0; n < Objects.length; n++) {
        var CVertex = Objects[n].v;
        var CFaces  = Objects[n].f;
        var r       = Objects[n].r;
        var theta   = Objects[n].theta;
        var rev     = Objects[n].rev;
        var w       = Objects[n].w;
        var color   = Objects[n].c;

        // For each vertex point
        for (var i = 0; i < CVertex.length; i++) {
            // The resulting vertex point we are working on
            // Note that we are creating a new object, not making a copy-reference
            var WorkingVertex = { x:CVertex[i].x, y:CVertex[i].y, z:CVertex[i].z };

            // Adjust for object rotation
            var cos = Math.cos(w * TotalTime);
            var sin = Math.sin(w * TotalTime);
            var temp = {x:WorkingVertex.x, y:WorkingVertex.y};
            WorkingVertex.x = (temp.x*cos - temp.y*sin);
            WorkingVertex.y = (temp.x*sin + temp.y*cos);

            //Adjust for orbit
            var x = r * Math.cos(theta + rev * TotalTime);
            var y = r * Math.sin(theta + rev * TotalTime);
            WorkingVertex.x += x;
            WorkingVertex.y += y;

            //Adjust for camera rotation
            var cosX = Math.cos(CameraRot.x);
            var cosY = Math.cos(CameraRot.y);
            var cosZ = Math.cos(CameraRot.z);
            var sinX = Math.sin(CameraRot.x);
            var sinY = Math.sin(CameraRot.y);
            var sinZ = Math.sin(CameraRot.z);

            var Temp = WorkingVertex.z;
            WorkingVertex.z = -WorkingVertex.x * sinY - WorkingVertex.z * cosY;
            WorkingVertex.x = -WorkingVertex.x * cosY + Temp * sinY;

            Temp = WorkingVertex.z;
            WorkingVertex.z = -WorkingVertex.y * sinX + WorkingVertex.z * cosX;
            WorkingVertex.y = WorkingVertex.y * cosX + Temp * sinX;

            Temp = WorkingVertex.x;
            WorkingVertex.x = WorkingVertex.x * cosZ - WorkingVertex.y * sinZ;
            WorkingVertex.y = WorkingVertex.y * cosZ + Temp * sinZ;

            // Apply camera translation
            WorkingVertex.x -= CameraPos.x;
            WorkingVertex.y -= CameraPos.y;
            WorkingVertex.z -= CameraPos.z;

            // Convert from x,y,z to x,y
            // This is called a projection transform
            // We are projecting from 3D back to 2D
            var ScreenX = (RatioConst * (WorkingVertex.x)) / WorkingVertex.z;
            var ScreenY = (RatioConst * (WorkingVertex.y)) / WorkingVertex.z;

            // Save this on-screen position to render the line locations
            PointList[i] = {x:CenterX + ScreenX, y:CenterY + ScreenY};
        }

        // For each face
        for (var i = 0; i < CFaces.length; i++) {
            // Find the four points we are working on
            var PointA = PointList[CFaces[i].a];
            var PointB = PointList[CFaces[i].b];
            var PointC = PointList[CFaces[i].c];

            // Render the face by looking up our vertex list
            RenderFillTriangle(PointA.x, PointA.y, PointB.x, PointB.y, PointC.x, PointC.y, 1, color);
        }
    }
}

Main();
