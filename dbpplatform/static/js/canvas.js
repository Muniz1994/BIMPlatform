$(document).ready(function(){

    $('#three-canvas').css('width', '100%');
    $('#three-canvas').css('height', $('#viewer-container').width()/1.5);

    $(window).resize(function(){
        $('#three-canvas').height($('#viewer-container').width() / 1.5);
    });
  
}); 

