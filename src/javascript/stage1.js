var Level0 =
   [[-3, -3, -3, -1, -1, -1,  3],
    [-3, -2, -3, -1, -2, -2, -2],
    [-3, -2, -3, -1, -2, -2, -2],
    [-3, -2, -3, -1, -2, -1, -2],
    [-3, -2, -3, -1, -2, -1,  3],
    [-3, -2, -3, -1, -2, -1,  3],
    [-3,  1, -3,  1, -2, -2, -2]];

var Level1 =
   [[-3,  0, -3,  0, -2, -2, -2],
    [-3, -2, -3, -1, -2, -2, -2],
    [-3, -3, -3, -1, -2, -2, -2],
    [-1, -1, -1, -1, -1, -1,  4],
    [-3, -3, -3, -1, -2, -2, -2],
    [-3, -2, -3, -1, -2, -2, -2],
    [-3,  2, -3,  2, -2, -2, -2]];

var Level2 =
   [[-3,  1, -3,  1, -2, -2, -2],
    [-3, -2, -3, -1, -2, -1, -2],
    [-3, -2, -3, -1, -2, -1,  5],
    [-3, -2, -3, -1, -2, -1,  5],
    [-3, -2, -3, -1, -2, -2, -2],
    [-3, -2, -3, -1, -2, -2, -2],
    [-3, -3, -3, -1, -1, -1,  5]];

var Level3 =
   [[ 0, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -3],
    [-2, -2, -2, -2, -2, -2, -2],
    [ 0, -2, -2, -3, -2, -2, -2],
    [ 4, -3, -2, -2, -2,  4, -3]];

var Level4 =
   [[ 3, -2, -2, -2, -3,  3, -3],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -1, -2, -2, -2, -2, -1],
    [ 1, -2, -2, -2, -2, -2, -2],
    [-2, -2, -1, -2, -2, -1, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [ 5, -2, -2, -2, -2, -2, -2]];

var Level5 =
   [[ 4, -2, -2, -3, -2, -2, -2],
    [ 2, -2, -2, -2, -1, -2, -2],
    [-2, -2, -2, -3, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -3],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [ 2, -2, -2, -2, -2, -2, -2]];

var Level6 =
   [[-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-3, -1, -2, -2, -2, -1, -1],
    [-1, -1, -3,  7, -3, -1, -1]];

var Level7 =
   [[-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, 10],
    [-2, -2, -2, -3, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2]];

var Level8 =
   [[-2, -2, -2, -3, -2, -2, -2],
    [-1, -2, -1, -2, -2, -2, -2],
    [-1, -2, -2, -2, -3, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -1, -2, -2, -2],
    [-3, -3, -3, -3, -3, -3, -3],
    [-2, -2, -2, -2, -2, -2, -2]];

var Level9 =
   [[-2, -2, -2, -2, -3, -2, -2],
    [-3, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -3, -3, -2, -2, -3, -3],
    [-2, -3, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-3, -2, -2, -2, -2, -3, -2]];

var Level10 =
   [[-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -3],
    [-2, -2, -2, -2, -2, -2, -1],
    [-2, -2, -2, -2, -2, -2, -3],
    [-2, -2, -2, -2, -2, -2, -2],
    [-2, -2, -2, -2, -2, -2, -2]];

var Level11 =
   [[10, -2, -3, -2, -2, -2, 10],
    [-2, -2, -2, -2, -2, -2, -1],
    [-2, -2, -2, -2, -3, -2, -1],
    [-2, -2, -2, -2, -2, -2, -1],
    [-2, -2, -2, -2, -2, -2, -1],
    [-2, -2, -2, -2, -3, -2, -1],
    [-2, -2, -2, -2, -2, -2, -1]];

var Maze =
   [[Level0 ,Level3, Level6, Level9],
    [Level1 ,Level4, Level7, Level10],
    [Level2 ,Level5, Level8, Level11]];

var Colors =
   [//Rooms
    [{R:255, G:0  , B:127}, {R:255, G:127, B:0  }, {R:255, G:127, B:127}, {R:255, G:127, B:255}],
    [{R:0  , G:127, B:255}, {R:127, G:0  , B:255}, {R:127, G:127, B:255}, {R:127, G:255, B:255}],
    [{R:127, G:255, B:0  }, {R:0  , G:255, B:127}, {R:127, G:255, B:127}, {R:255, G:255, B:127}]];

var TeleportMap =
   [{s:{x:1, y:6, r_x:0, r_y:1}, e:{x:5, y:6, r_x:0, r_y:1}}];//2
