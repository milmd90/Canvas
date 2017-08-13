
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Maze</title>
        <link href="resources/css/practice.css" rel="stylesheet" type="text/css"/>
        <script src="resources/jQuery/jquery-1.11.2.min.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/main.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/shapes.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/stage1.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/maze.js" type="text/javascript"></script>
    </head>
    
    <!-- When the body loads, let us call the main application entry point -->
    <body onload="Main()">
        
        <div style="text-align: center;">
            <!-- Canvas Content -->
            <canvas id="SampleCanvas" width="800" height="800">
                Sorry, but it looks like your browser does not support the Canvas tag.
            </canvas><br>

            <!-- FPS Counter-->
            Frames per Second: <input type="text" name="FPSTextBox" id="FPSTextBox" readonly="readonly" size="10" value="Calculating..."><br>
        </div>
        
        <script>
            $('body').on('keydown',function(e) {
                if (Heading.x === 0 && Heading.y === 0) {
                    if (e.which===37) {
                        Heading.x = -1;
                    } else if (e.which===38) {
                        Heading.y = 1;
                    } else if (e.which===39) {
                        Heading.x = 1;
                    } else if (e.which===40) {
                        Heading.y = -1;
                    }
                }
            });
        </script>
    </body>
</html>