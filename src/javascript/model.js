// Interface methods
function Init() {
    Objects = []
    CameraPos = {x:0, y:0, z:-100};
    CameraRot = {x:1, y:0, z:0};
    makeSolarSystem();
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

// Main();
