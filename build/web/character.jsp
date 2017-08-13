
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Character</title>
        <link href="resources/css/practice.css" rel="stylesheet" type="text/css"/>
        <script src="resources/jQuery/jquery-1.11.2.min.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/main.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/shapes.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/character.js" type="text/javascript"></script>
    </head>
    
    <!-- When the body loads, let us call the main application entry point -->
    <body onload="Main()">
        
        <div style="text-align: center;">
        
            <!-- Title -->

            <!-- Canvas Content -->
            <canvas id="SampleCanvas" width="800" height="800">
                Sorry, but it looks like your browser does not support the Canvas tag.
            </canvas><br>

            <!-- FPS Counter-->
            Frames per Second: <input type="text" name="FPSTextBox" id="FPSTextBox" readonly="readonly" size="10" value="Calculating..."><br>
        </div>
        
        <script>
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
            </script>
    </body>
</html>