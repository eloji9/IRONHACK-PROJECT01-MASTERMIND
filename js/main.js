$(document).ready(function(){

    var guess = 0;
    var selectedColor = "";
    var bGround = "rgba(0, 0, 0, 0) linear-gradient(grey, rgb(218, 243, 216)) repeat scroll 0% 0% / auto padding-box border-box";



    var tempRay = $(".guess-pegs");
    // console.log(tempRay);
    var guessBoxArray = [];
    for(var i = 9; i >= 0; i--){
        guessBoxArray.push(tempRay[i]);
    }

    for(var i = 0; i < 10; i++){
        var guessArray = guessBoxArray[i].getElementsByClassName("guess-peg");
        for(var j = 0; j < 4; j++){
            $(guessArray[j]).attr("id",`g-${i}-${j}`)
        }
    }

    $(".submit-btn").click(function(){
        $(".active").removeClass("active");
        guess++;
        for(var i = 0; i < 4; i++){
            $(`#g-${guess}-${i}`).addClass("active");
        }
    });

    $(".selector-inner").click(function(){
        $(".selector-outer").css("background-color","brown");
        var peg = ($(this).parent())[0];
        selectedColor =
        $(this).css("background-color");
        $(peg).css("background-color",selectedColor);
    });

    $('.guess-peg').click(function() {
        if ($(this).hasClass("active")){
            var number = parseInt($(this).css("border"));
            if(number === 1){
                $(this).css("background","none");
                $(this).css("background-color",selectedColor);
                $(this).css("border","2px solid white");
            } else {
                $(this).css("background",bGround);
                $(this).css("border","1px solid white");
            }
        }
    });


});