
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Canvas Sphere</title>
        <link href="resources/css/practice.css" rel="stylesheet" type="text/css"/>
        <script language="javascript" src="resources/javascript/main.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/shapes.js" type="text/javascript"></script>
        <script language="javascript" src="resources/javascript/model.js" type="text/javascript"></script>
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
    </body>
</html>