
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Canvas Cube</title>
        <link href="resources/css/practice.css" rel="stylesheet" type="text/css"/>
        <script language="javascript" src="resources/javascript/main.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/cube.js" type="text/javascript"></script>
    </head>
    
    <!-- When the body loads, let us call the main application entry point -->
    <body onload="Main()">
        
        <div style="text-align: center;">
        
            <!-- Title -->

            <!-- Canvas Content -->
            <canvas id="SampleCanvas" width="320" height="240">
                Sorry, but it looks like your browser does not support the Canvas tag.
            </canvas><br>

            <!-- FPS Counter-->
            Frames per Second: <input type="text" name="FPSTextBox" id="FPSTextBox" readonly="readonly" size="10" value="Calculating..."><br>

            <!-- Footer -->
            Source files: <a href="resources/javascript/main.js">main.js</a>, <a href="resources/javascript/cube.js">source.js</a><br>
        </div>
    </body>
</html>