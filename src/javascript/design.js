var ctx = $canvas.get(0).getContext("2d");
var x = $canvas.width/2;
var y = $canvas.height/2;
var drawInterval;

randomize();

function design() {
    var shape = getShape();
    if (shape === "circle"){
        drawCircle();
    } else if (shape === "square") {
        drawSquare();
    } else {
        drawBezier();
    }
    return false;
}

function randomize() {
    if (!$("#shapeLock:checked").length){
        setShape(Math.floor(Math.random()*document.getElementsByName('shape').length));
    }
    if (!$("#numLock:checked").length) $("#number").val(bellCurve(Math.random()));
    if (!$("#radiusLock:checked").length) $("#radius").val(Math.ceil(Math.random() * 100));
    if (!$("#lengthLock:checked").length) $("#length").val(Math.ceil(Math.random() * 100));
    if (!$("#colorLock:checked").length) $("#color").val(getRandomColor());
}

function contDesign() {
    var b = $("#contDraw");
    if (b.innerHTML === "Auto") {
        drawInterval = window.setInterval(function(){
            randomize();
            design();
        }, 1000);
        b.innerHTML = "Stop";
    } else {
        window.clearInterval(drawInterval);
        b.innerHTML = "Auto";
    }
}

function erase() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

function goBack(){
    window.clearInterval(drawInterval);
    window.parent.back();
}

function drawCircle() {
    var f = $("#number").val();
    var d = 2 * pi / f;
    var r = 2 * $("#radius").val();
    var l = $("#length").val() / 100 * pi;

    ctx.beginPath();
    ctx.arc(x,y,100,0,2*pi);
    ctx.strokeStyle = $("#color").val();
    ctx.stroke();

    ctx.strokeStyle = $("#color").val();
    for (n = 0; n < f; n++) {
        var i = r*Math.sin(d*n);
        var j = r*Math.cos(d*n);
        var s = pi/2-d*n;

        ctx.beginPath();
        ctx.arc(x+i,y+j,r,s-l,s+l);
        ctx.stroke();
    }
}

function drawSquare() {
    var f = $("#number").val();
    var d = 2 * pi / f;
    var r = 4 * $("#radius").val();
    var l = 2 * $("#length").val();

    ctx.strokeStyle = $("#color").val();
    for (n = 0; n < f; n++) {
        var i = r*Math.sin(d*n);
        var j = r*Math.cos(d*n);

        ctx.beginPath();
        ctx.rect(x+i-l/2,y+j-l/2,l,l);
        ctx.stroke();
    }
}

function drawBezier() {
    var f = $("#number").val();
    var d = 2 * pi / f;
    var r = 6 * $("#radius").val();
    var l = (4 * (50 - $("#length").val()));

    ctx.strokeStyle = $("#color").val();
    for (n = 0; n < f; n++) {
        var i1 = l * Math.sin(d*n);
        var j1 = l * Math.cos(d*n);
        var i2 = r * Math.sin(d*n);
        var j2 = r * Math.cos(d*n);
        var i3 = r * Math.sin(d*(n+1));
        var j3 = r * Math.cos(d*(n+1));
        var i4 = l * Math.sin(d*(n+1));
        var j4 = l * Math.cos(d*(n+1));

        ctx.beginPath();
        ctx.moveTo(x+i1,y+j1);
        ctx.bezierCurveTo(x+i2,y+j2,x+i3,y+j3,x+i4,y+j4);
        ctx.stroke();
    }
}

function getShape() {
    var s = document.getElementsByName('shape');
    for (var i = 0; i < s.length; i++){
        if (s[i].checked){
            return s[i].value;
        }
    }
}

function setShape(index) {
    var s = document.getElementsByName('shape');
    if (index >= 0 && index < s.length) s[index].checked = true;
}


function bellCurve(a) {
    a = a * 3 - 1;
    return Math.ceil((Math.pow(a,3) + 1) * 5 + 1);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function matchColor(){
    $("#color").style.color = $("#color").val();
}
