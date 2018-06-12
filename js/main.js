$(document).ready(function(){

    let selectedColor = "";
    // let bGround = "";


    $(".selector-inner").click(function(){
        $(".selector-outer").css("background-color","brown");
        let peg = ($(this).parent())[0];
        let selectedColor =
        $(this).css("background-color");
        $(peg).css("background-color",selectedColor);
        console.log(this);
    });

    console.log(selectedColor);

    $('.guess-peg').click(function() {
        console.log(this);
        // $(this).css('background', 'none');
        let selectedColor =
        $(this).css('background-color');
        // $(this).css('border', '2px solid white');
    });

});