(function () {
    $('.canvasLoad').click(function () {
        var module = $(this).attr('id');
        $( ".submenu" ).load( module + '.html' );
    });
})();
