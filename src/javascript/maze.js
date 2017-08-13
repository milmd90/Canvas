var Objects = [];
var Spin = [];

function Init() {
    Location = {x:3, y:0, r_x:1, r_y:0};
    Heading = {x:0, y:0};
    Dimension = {r_x:Maze.length, r_y:Maze[0].length, x:Maze[0][0].length, y:Maze[0][0][0].length};
    CameraPos = {x:-Dimension.r_x*Dimension.x/2, y:Dimension.r_y*Dimension.y/2, z:30};
    //CameraPos = {x:0, y:0, z:30};
    CameraRot = {x:0, y:0, z:0};
    WaitTime = 10;

    makeBoard();
}

var character;
function makeBoard() {
    //Clear board
    Objects = [];
    //Environment
    for (var r_x = 0; r_x < Dimension.r_x; r_x++) {
        for (var r_y = 0; r_y < Dimension.r_y; r_y++) {
            if (true||r_x === Location.r_x && r_y === Location.r_y) {
                makeFloor(r_x, r_y);
            } else {
                makeHiddenRoom(r_x, r_y);
            }
        }
    }

    //Character
    character = makeCylinder(3, {x:.5, y:.5, z:-1}, {x:Location.x+Location.r_x*Dimension.x, y:Location.y+Location.r_y*Dimension.y, z:0}, {yz:0, xz:0}, {R:255, G:255, B:255});

    //Orientation
    //makeSphere(1, {x:2, y:.01, z:.01}, {x:3, y:0, z:0}, {yz:0, xz:0}, {R:255, G:255, B:255});
    //makeSphere(1, {x:.01, y:1, z:.01}, {x:0, y:2, z:0}, {yz:0, xz:0}, {R:255, G:255, B:255});
    //makeSphere(1, {x:.01, y:.01, z:1}, {x:0, y:0, z:2}, {yz:0, xz:0}, {R:255, G:255, B:255});
}

function makeHiddenRoom(r_x, r_y) {
    var center = {x:(r_x+.5)*Dimension.x-.5, y:(r_y+.5)*Dimension.y-.5, z:0};
    var newFaces = CubeFaces.slice();
    var newVertex = CubeVertex.slice();

    for (var n = 0; n < newVertex.length; n++) {
        var v = newVertex[n];
        newVertex[n] = {x:(v.x-.5)*Dimension.x, y:(v.y-.5)*Dimension.y, z:v.z-1};
    }
    var o = {xz:0, yz:0};
    var m = {x:0, y:0, z:0, xz:0, yz:0};
    Objects.push({v:newVertex, f:newFaces, p:center, o:o, m:m, color:Colors[r_x][r_y]});
}

function makeFloor(r_x, r_y) {
    var room = Maze[r_x][r_y];
    for (var x = 0; x < room.length; x++) {
        for (var y = 0; y < room[x].length; y++) {
            var c_val = room[x][y];
            var c = findColor(c_val);
            var center = {x:r_x*Dimension.x+x-.5, y:r_y*Dimension.y+y-.5, z:0};
            var newVertex = SquareVertex.slice();
            var newFaces = SquareFaces.slice();
            var o = {xz:0, yz:0};
            var m = {x:0, y:0, z:0, xz:0, yz:0};
            Objects.push({v:newVertex, f:newFaces, p:center, o:o, m:m, color:c});
            //check if teleport
            for (var t = 0; t < TeleportMap.length; t++) {
                var tele = TeleportMap[t].s;
                if (tele.x === x && tele.y === y && tele.r_x === r_x && tele.r_y === r_y) {
                    tele = TeleportMap[t].e;
                    Spin.push(makeSphere(0, {x:.5, y:.5, z:.5}, {x:center.x, y:center.y, z:center.z-1}, o, Colors[tele.r_x][tele.r_y]));
                    break;
                }
                tele = TeleportMap[t].e;
                if (tele.x === x && tele.y === y && tele.r_x === r_x && tele.r_y === r_y) {
                    tele = TeleportMap[t].s;
                    Spin.push(makeSphere(0, {x:.5, y:.5, z:.5}, {x:center.x, y:center.y, z:center.z-1}, o, Colors[tele.r_x][tele.r_y]));
                    break;
                }
            }
        }
    }
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

    var m = {x:0, y:0, z:0, xz:0, yz:0};
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

    var m = {x:0, y:0, z:0, xz:0, yz:0};
    Objects.push({v:newVertex, f:newFaces, bottom:newVertex[v_num], top:newVertex[v_num+1], center:newVertex[v_num+2], p:p, o:o, m:m, color:color});
    return Objects[Objects.length-1];
}

function move() {
    for (var obj = 0; obj < Spin.length; obj++) {
        Spin[obj].m.xz += .01;
        Spin[obj].m.z = .5 * Math.sin(TotalTime) - 1;
    }

    if (Heading.x !== 0 || Heading.y !== 0) {
        var room = Maze[Location.r_x][Location.r_y];
        var dest = {x:(Location.x+Heading.x), y:(Location.y+Heading.y), r_x:Location.r_x, r_y:Location.r_y};

        //Check leave room
        if (dest.x < 0 || dest.x >= Dimension.x || dest.y < 0 || dest.y >= Dimension.y) {
            //Moving outside room
            //Check doorway
            var c_col = room[Location.x][Location.y];
            if (c_col >= 0) {
                var nextRoom = findRoom(c_col);
                //Through door
                if (nextRoom.x - Location.r_x === Heading.x && nextRoom.y - Location.r_y === Heading.y) {
                    room = Maze[nextRoom.x][nextRoom.y];
                    var num_x = Dimension.x;
                    dest.x = (dest.x+num_x)%num_x;
                    dest.r_x = nextRoom.x;
                    var num_y = Dimension.y;
                    dest.y = (dest.y+num_y)%num_y;
                    dest.r_y = nextRoom.y;
                    updateLocation(dest);
                    makeBoard();
                } else {
                    Heading = {x:0, y:0};
                }
            } else {
                Heading = {x:0, y:0};
            }
        } else {
            updateLocation(dest);
        }
    }
}

function updateLocation(dest) {
    var d_col = Maze[dest.r_x][dest.r_y][dest.x][dest.y];
    if (d_col !== -3) {
        Location.x = dest.x;
        Location.y = dest.y;
        Location.r_x = dest.r_x;
        Location.r_y = dest.r_y;
        if (d_col === -2) {
            //Ice
            wait(10);
        } else {
            //Path
            Heading={x:0, y:0};
        }
    } else {
        Heading={x:0, y:0};
    }
    checkTeleport();
    updateCharacter();
}

function updateCharacter() {
    character.p.x = (Location.r_x*Dimension.x+Location.x);
    character.p.y = (Location.r_y*Dimension.y+Location.y);
}

function checkTeleport() {
    for (var t = 0; t < TeleportMap.length; t++) {
        var c_t = TeleportMap[t].s;
        if (c_t.x === Location.x && c_t.y === Location.y && c_t.r_x === Location.r_x && c_t.r_y === Location.r_y) {
            wait(10);
            Location = {x:TeleportMap[t].e.x, y:TeleportMap[t].e.y, r_x:TeleportMap[t].e.r_x, r_y:TeleportMap[t].e.r_y};
            break;
        }
        c_t = TeleportMap[t].e;
        if (c_t.x === Location.x && c_t.y === Location.y && c_t.r_x === Location.r_x && c_t.r_y === Location.r_y) {
            wait(10);
            Location = {x:TeleportMap[t].s.x, y:TeleportMap[t].s.y, r_x:TeleportMap[t].s.r_x, r_y:TeleportMap[t].s.r_y};
            break;
        }
    }
}

function wait(t) {
    if (t < 0) {
        //Wait
    } else {
        wait(t-1);
    }
}

function findColor(c_val) {
    var c;
    if (c_val >= 0) {
        //Door colors
        var room = findRoom(c_val);
        c = Colors[room.x][room.y];
    } else {
        //Path colors
        if (c_val === -1) {
            c = {R:255, G:255, B:255};
        } else if (c_val === -2) {
            c = {R:100, G:100, B:100};
        } else if (c_val === -3) {
            c = {R:0,   G:0,   B:0};
        }
    }
    return c;
}

function findRoom(c_val) {
    return {y:c_val%(Dimension.x), x:Math.floor(c_val/Dimension.x)};
}

function pointPosition(v, p, o, m) {
    var t_y;
    var a = {x:0, y:0, z:0};

    t_y = v.y * Math.cos(o.yz * pi) + v.z * Math.sin(o.yz * pi);
    a.z = v.z * Math.cos(o.yz * pi) - v.y * Math.sin(o.yz * pi);
    a.x = v.x * Math.cos(o.xz * pi) - t_y * Math.sin(o.xz * pi);
    a.y = t_y * Math.cos(o.xz * pi) + v.x * Math.sin(o.xz * pi);

    t_y = a.y * Math.cos(m.yz * pi) + a.z * Math.sin(m.yz * pi);
    a.z = a.z * Math.cos(m.yz * pi) - a.y * Math.sin(m.yz * pi);
    a.x = a.x * Math.cos(m.xz * pi) - t_y * Math.sin(m.xz * pi);
    a.y = t_y * Math.cos(m.xz * pi) + a.x * Math.sin(m.xz * pi);

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
