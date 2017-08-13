<%-- 
    Document   : EasterEgg
    Created on : Dec 24, 2014, 11:11:02 AM
    Author     : xp0wm0
--%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    
    <body>
        <div id="div_main">
            <table id="egg" border="0">
                <tr>
                    <td colspan="7">Shape: </td> 
                    <td><input id="shapeLock" type="checkbox"></td>
                </tr><tr id="shapes">
                    <td colspan="2"><input type="radio" name="shape" value="circle">Circle</td>
                    <td colspan="2"><input type="radio" name="shape" value="square">Square</td>
                    <td colspan="2"><input type="radio" name="shape" value="bezier">Bezier</td>
                </tr><tr>
                    <td colspan="2">Number: </td> 
                    <td colspan="2">Radius: </td> 
                    <td colspan="2">Side Length: </td>
                    <td colspan="2">Color: </td>
                </tr><tr>
                    <td><input id="number" type="number" min="0" max="50" size=10 autocomplete="off"></td>
                    <td><input id="numLock" type="checkbox"></td>
                    <td><input id="radius" type="number" step="1" min="0" max="100" size=10 autocomplete="off"></td>
                    <td><input id="radiusLock" type="checkbox"></td>
                    <td><input id="length" type="number" step="1" min="0" max="100" size=10 autocomplete="off"></td>
                    <td><input id="lengthLock" type="checkbox"></td>
                    <td><input id="color" type="text" size=6 autocomplete="off" onkeypress="matchColor()"></td>
                    <td><input id="colorLock" type="checkbox"></td>
                </tr><tr>
                    <td colspan=8 class="center">
                        <button class="small" onclick="design()">Draw</button>
                        <button class="small" onclick="randomize()">Random</button>
                        <button class="small" id ="contDraw" onclick="contDesign()">Auto</button>
                        <button class="small" onclick="erase()">Clear</button>
                        <button class="small" onclick="goBack()">Back</button>
                    </td>
                </tr>
            </table><br>

            <canvas id="myCanvas" width="800" height="600"></canvas>

            <script>
                var c = document.getElementById("myCanvas");
                var ctx;
                var x = c.width/2;
                var y = c.height/2;
                var pi = Math.PI;
                randomize();
                var drawInterval;

                function design() {
                    c = document.getElementById("myCanvas");
                    ctx = c.getContext("2d");
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
                    if (!document.getElementById("shapeLock").checked){
                        setShape(Math.floor(Math.random()*document.getElementsByName('shape').length));
                    }
                    if (!document.getElementById("numLock").checked) document.getElementById("number").value = bellCurve(Math.random());
                    if (!document.getElementById("radiusLock").checked) document.getElementById("radius").value = Math.ceil(Math.random() * 100);
                    if (!document.getElementById("lengthLock").checked) document.getElementById("length").value = Math.ceil(Math.random() * 100);
                    if (!document.getElementById("colorLock").checked) {
                        var c = document.getElementById("color");
                        c.value = getRandomColor();
                        c.style.color = c.value;
                    }
                }

                function contDesign() {
                    var b = document.getElementById("contDraw");
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
                    var c = document.getElementById("myCanvas");
                    var ctx = c.getContext("2d");
                    ctx.clearRect(0, 0, document.getElementById("myCanvas").width, document.getElementById("myCanvas").height);
                }

                function goBack(){
                    window.clearInterval(drawInterval);
                    window.parent.back();
                }

                function drawCircle() {
                    var f = document.getElementById("number").value;
                    var d = 2 * pi / f;
                    var r = 2 * document.getElementById("radius").value;
                    var l = document.getElementById("length").value / 100 * pi;

                    ctx.beginPath();
                    ctx.arc(x,y,100,0,2*pi);
                    ctx.strokeStyle = document.getElementById("color").value;
                    ctx.stroke();

                    ctx.strokeStyle = document.getElementById("color").value;
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
                    var f = document.getElementById("number").value;
                    var d = 2 * pi / f;
                    var r = 4 * document.getElementById("radius").value;
                    var l = 2 * document.getElementById("length").value;

                    ctx.strokeStyle = document.getElementById("color").value;
                    for (n = 0; n < f; n++) {
                        var i = r*Math.sin(d*n);
                        var j = r*Math.cos(d*n);

                        ctx.beginPath();
                        ctx.rect(x+i-l/2,y+j-l/2,l,l);
                        ctx.stroke();
                    }
                }

                function drawBezier() {
                    var f = document.getElementById("number").value;
                    var d = 2 * pi / f;
                    var r = 6 * document.getElementById("radius").value;
                    var l = (4 * (50 - document.getElementById("length").value));

                    ctx.strokeStyle = document.getElementById("color").value;
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
                    for(var i = 0; i < s.length; i++){
                        if(s[i].checked){
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
                    document.getElementById("color").style.color = document.getElementById("color").value;
                }
            </script> 
        </div>
    </body>
</html>
