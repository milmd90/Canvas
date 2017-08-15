// Interface functions
function Init() {
    CameraPos = {x:0, y:40, z:50};
    CameraRot = {x:0, y:0, z:0};
    CameraChange = {x:0, y:0, z:0};

    makeCharacter();
}

function RenderScene() {
    //Increment time
    TotalTime += .01;
    move();

    // Render the background
    RenderBackground(150,0,0);

    // Create an on-screen point list we will be working with
    var PointList = new Array();

    //For each object
    for (var n = 0; n < Objects.length; n++) {
        var CVertex = Objects[n].v;
        var CFaces  = Objects[n].f;
        var p       = Objects[n].p;
        var o       = Objects[n].o;
        var m       = Objects[n].m;
        var color   = Objects[n].color;

        // For each vertex point
        for (var i = 0; i < CVertex.length; i++) {
            // The resulting vertex point we are working on
            // Note that we are creating a new object, not making a copy-reference
            var WorkingVertex = { x:CVertex[i].x, y:CVertex[i].y, z:CVertex[i].z };

            // Apply object translation and rotation
            WorkingVertex = pointPosition(WorkingVertex, p, o, m);

            //Adjust for camera translation and rotation
            WorkingVertex = cameraRotate(WorkingVertex);

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
            RenderTriangle(PointA.x, PointA.y, PointB.x, PointB.y, PointC.x, PointC.y, 1, color);
        }
    }
}

// Character functions
function makeCharacter() {
    //Right arm
    makeSphereM(0,   {x:3, y:3, z:3},   {x:15, y:47, z:0},  {yz:0,  xy:0},   {R:100,G:100,B:100});//0
    makeCylinderM(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:.4},  {R:100,G:100,B:100});//1
    makeSphereM(0,   {x:3, y:3, z:3},   {x:0, y:0, z:0},    {yz:0,  xy:0},   {R:100,G:100,B:100});//2
    makeCylinderM(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:.8},  {R:100,G:100,B:100});//3
    makeCylinderM(2, {x:1, y:1, z:3},   {x:0, y:0, z:0},    {yz:.5, xy:.9},  {R:100,G:100,B:100});//4
    makeSphereM(1,   {x:4, y:5, z:8},   {x:0, y:0, z:0},    {yz:.5, xy:.9},  {R:100,G:100,B:100});//5

    //Left Arm
    makeSphereM(0,   {x:3, y:3, z:3},   {x:-15, y:47, z:0}, {yz:0,  xy:0},   {R:100,G:100,B:100});//6
    makeCylinderM(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:-.05},{R:100,G:100,B:100});//7
    makeSphereM(0,   {x:3, y:3, z:3},   {x:0, y:0, z:0},    {yz:0,  xy:0},   {R:100,G:100,B:100});//8
    makeCylinderM(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:0},   {R:100,G:100,B:100});//9
    makeCylinderM(2, {x:1, y:1, z:3},   {x:0, y:0, z:0},    {yz:.5, xy:0},   {R:100,G:100,B:100});//10
    makeSphereM(1,   {x:4, y:4, z:8},   {x:0, y:0, z:0},    {yz:.5, xy:0},   {R:100,G:100,B:100});//11

    //Body
    makeCylinderM(3, {x:15, y:5, z:50}, {x:0, y:50, z:0},   {yz:.5, xy:0},   {R:100,G:100,B:100});//12
    makeCylinderM(2, {x:3, y:3, z:12},  {x:0, y:0, z:0},    {yz:-.5, xy:0},  {R:100,G:100,B:100});//13
    makeSphereM(3,   {x:8, y:10, z:9},  {x:0, y:0, z:0},    {yz:0, xy:0},    {R:100,G:100,B:100});//14
}

function move() {
    //Update camera
    var Speed = .0001;
    CameraRot.x -= Speed * CameraChange.x;
    CameraRot.y += Speed * CameraChange.y;

    var s = {
        body:[12, 13, 14],
        left_arm: [6, 7, 8, 9, 10, 11],
        right_arm: [0, 1, 2, 3, 4, 5]
    };

    //Update movement vectors
    Objects[1].m.xy = .05 * Math.sin(3 * TotalTime);
    Objects[3].m.xy = .15 * Math.sin(3 * TotalTime - 1.5);
    Objects[4].m.xy = .1 * Math.sin(3 * TotalTime - 2);
    Objects[5].m.xy = Objects[4].m.xy;

    //Link objects
    //Right arm
    link(s.right_arm[1], s.right_arm[0], "center");
    link(s.right_arm[2], s.right_arm[1], "top");
    link(s.right_arm[3], s.right_arm[2], "center");
    link(s.right_arm[4], s.right_arm[3], "top");
    link(s.right_arm[5], s.right_arm[4], "top");

    //Left arm
    link(s.left_arm[1], s.left_arm[0], "center");
    link(s.left_arm[2], s.left_arm[1], "top");
    link(s.left_arm[3], s.left_arm[2], "center");
    link(s.left_arm[4], s.left_arm[3], "top");
    link(s.left_arm[5], s.left_arm[4], "top");

    //Head
    link(s.body[1], s.body[0], "bottom");
    link(s.body[2], s.body[1], "top");
}

function link(a, b, i) {
    var t;
    if (i === "bottom") {
        t = Objects[b].bottom;
    } else if (i === "top") {
        t = Objects[b].top;
    } else if (i === "center") {
        t = Objects[b].center;
    }
    Objects[a].p = pointPosition(t, Objects[b].p, Objects[b].o, Objects[b].m);
}

function pointPosition(v, p, o, m) {
    var t_y;
    var a = {x:0, y:0, z:0};

    t_y = v.y * Math.cos(o.yz * pi) - v.z * Math.sin(o.yz * pi);
    a.z = v.z * Math.cos(o.yz * pi) + v.y * Math.sin(o.yz * pi);
    a.x = v.x * Math.cos(o.xy * pi) - t_y * Math.sin(o.xy * pi);
    a.y = t_y * Math.cos(o.xy * pi) + v.x * Math.sin(o.xy * pi);

    t_y = a.y * Math.cos(m.yz * pi) - a.z * Math.sin(m.yz * pi);
    a.z = a.z * Math.cos(m.yz * pi) + a.y * Math.sin(m.yz * pi);
    a.x = a.x * Math.cos(m.xy * pi) - t_y * Math.sin(m.xy * pi);
    a.y = t_y * Math.cos(m.xy * pi) + a.x * Math.sin(m.xy * pi);

    var w = {x:a.x+p.x+m.x, y:a.y+p.y+m.y, z:a.z+p.z+m.z};
    return w;
}
