var Objects = [];

function Init() {
    CameraPos = {x:0, y:40, z:150};
    CameraRot = {x:0, y:0, z:0};
    CameraChange = {x:0, y:0, z:0};

    makeCharacter();
}

function makeCharacter() {
    //Right arm
    makeSphere(0,   {x:3, y:3, z:3},   {x:15, y:47, z:0},  {yz:0,  xy:0},   {R:100,G:100,B:100});//0
    makeCylinder(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:.4},  {R:100,G:100,B:100});//1
    makeSphere(0,   {x:3, y:3, z:3},   {x:0, y:0, z:0},    {yz:0,  xy:0},   {R:100,G:100,B:100});//2
    makeCylinder(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:.8},  {R:100,G:100,B:100});//3
    makeCylinder(2, {x:1, y:1, z:3},   {x:0, y:0, z:0},    {yz:.5, xy:.9},  {R:100,G:100,B:100});//4
    makeSphere(1,   {x:4, y:5, z:8},   {x:0, y:0, z:0},    {yz:.5, xy:.9},  {R:100,G:100,B:100});//5

    //Left Arm
    makeSphere(0,   {x:3, y:3, z:3},   {x:-15, y:47, z:0}, {yz:0,  xy:0},   {R:100,G:100,B:100});//6
    makeCylinder(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:-.05},{R:100,G:100,B:100});//7
    makeSphere(0,   {x:3, y:3, z:3},   {x:0, y:0, z:0},    {yz:0,  xy:0},   {R:100,G:100,B:100});//8
    makeCylinder(2, {x:3, y:3, z:30},  {x:0, y:0, z:0},    {yz:.5, xy:0},   {R:100,G:100,B:100});//9
    makeCylinder(2, {x:1, y:1, z:3},   {x:0, y:0, z:0},    {yz:.5, xy:0},   {R:100,G:100,B:100});//10
    makeSphere(1,   {x:4, y:4, z:8},   {x:0, y:0, z:0},    {yz:.5, xy:0},   {R:100,G:100,B:100});//11

    //Body
    makeCylinder(3, {x:15, y:5, z:50}, {x:0, y:50, z:0},   {yz:.5, xy:0},   {R:100,G:100,B:100});//12
    makeCylinder(2, {x:3, y:3, z:12},  {x:0, y:0, z:0},    {yz:-.5, xy:0},  {R:100,G:100,B:100});//13
    makeSphere(3,   {x:8, y:10, z:9},  {x:0, y:0, z:0},    {yz:0, xy:0},    {R:100,G:100,B:100});//14
}

function makeSphere(deg, d, p, o, color) {
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

function makeCylinder(deg, d, p, o, color) {
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

function move() {
    //Update camera
    var speed = .0001;
    CameraRot.x -= speed * CameraChange.x;
    CameraRot.y += speed * CameraChange.y;

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

function cameraRotate(v){
    var cosX = Math.cos(CameraRot.x * pi);
    var cosY = Math.cos(CameraRot.y * pi);
    var cosZ = Math.cos(CameraRot.z * pi);
    var sinX = Math.sin(CameraRot.x * pi);
    var sinY = Math.sin(CameraRot.y * pi);
    var sinZ = Math.sin(CameraRot.z * pi);

    var Temp = v.z;
    v.z = -v.x * sinY - v.z * cosY;
    v.x = -v.x * cosY + Temp * sinY;

    Temp = v.z;
    v.z = -v.y * sinX + v.z * cosX;
    v.y = v.y * cosX + Temp * sinX;

    Temp = v.x;
    v.x = v.x * cosZ - v.y * sinZ;
    v.y = v.y * cosZ + Temp * sinZ;

    // Apply camera translation
    v.x -= CameraPos.x;
    v.y -= CameraPos.y;
    v.z -= CameraPos.z;
    return v;
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

$("#SampleCanvas")
    .mousedown(function(e) {
        var init_x = e.pageX;
        var init_y = e.pageY;

        $(window).mousemove(function(e) {
            CameraChange.x = e.pageY - init_y;
            CameraChange.y = e.pageX - init_x;
        });

        return false;
    })
    .mouseup(function() {
        $(window).unbind("mousemove");
        CameraChange.x = 0;
        CameraChange.y = 0;
        return false;
    });

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
$("#SampleCanvas").bind(mousewheelevt, function(e){
    var evt = window.event || e; //equalize event object
    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta; //check for detail first, because it is used by Opera and FF
    if (delta > 1) {
        CameraPos.z -= 3;
    } else {
        CameraPos.z += 3;
    }
});

$('body').on('keydown keyup',function(e){
    if (e.type==="keydown") {
        if (e.which===38) {
            CameraPos.z -= 1;
        } else if (e.which===40) {
            CameraPos.z += 1;
        }
    } else {
        //Do Nothing
    }
});
