var CameraPos;
var CameraRot;
var CameraChange;
var RatioConst;
var speed;
var Objects;
var $canvas;
var timer;

$( document ).ready(function() {
    //Initialize variables
    $canvas = $("#SampleCanvas");

    //Initial module
    load('model', true);

    //Switch module on click
    $('.canvasLoad').click(function() {
        load($(this).attr('id'));
    });

    //Actions
    $canvas
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
    $canvas.bind(mousewheelevt, function(e){
        var evt = window.event || e; //equalize event object
        evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
        var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta; //check for detail first, because it is used by Opera and FF
        if (delta > 1) {
            CameraPos.z -= 3;
        } else {
            CameraPos.z += 3;
        }
    });
});

//Load module
function load(module, initial) {
    clean();

    //Files with html submenu
    switch (module) {
        case 'design':
            $( ".submenu" ).load( module + '.html', function () {
                console.log('Loaded '+module + '.html');
            } );
            break;
        default :
            $( ".submenu" ).empty();
    }

    //Files with js
    switch (module) {
        default:
            $.getScript( 'javascript/' + module + '.js' , function () {
                console.log('Loaded '+module + '.js');

                console.log('CameraPos '+JSON.stringify(CameraPos));
                console.log('CameraRot '+JSON.stringify(CameraRot));
                console.log('CameraChange '+JSON.stringify(CameraChange));
                console.log('RatioConst '+RatioConst);
                console.log('speed '+speed);

                Main();
            });
    }

    // Bind module specific actions
    switch (module) {
        case 'character':
            $('body').on('keydown keyup',function(e){
                if (e.type==="keydown") {
                    if (e.which===38) {
                        CameraPos.z -= 1;
                    } else if (e.which===40) {
                        CameraPos.z += 1;
                    }
                }
            });
            break;
        case 'maze':
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
            break;
    }
}

//clean
function clean() {
    $canvas.off('mousedown mouseup');
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    $canvas.unbind(mousewheelevt);
    $('body').off('keydown keyup');

    CameraPos = {x: 0, y: 0, z: 0};
    CameraRot = {x: 0, y: 0, z: 0};
    CameraChange = {x:0, y:0, z:0};
    RatioConst = 320;
    speed = 1;
    Objects = [];
    Spin = [];

    clearTimeout(timer);
}
