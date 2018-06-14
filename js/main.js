$(document).ready(function(){

    // $(".start-game").click(function(){
    //     $(".start").fadeOut(1200);
    // })

    // General variables
    var guess = 0;
    var selectedColor = "";
    var bGround = "rgba(0, 0, 0, 0) linear-gradient(grey, rgb(218, 243, 216)) repeat scroll 0% 0% / auto padding-box border-box";
    $(".submit-btn").hide();
    var clickCount = 0;
    var isSelected = false;
    var answerRay = makeAnswer();
    console.log(answerRay);
    var tempRay = $(".guess-pegs");
    var guessBoxArray = [];
    var nextGrade = $($(".first-grade")[0]).parent()[0];


    for(var i = 9; i >= 0; i--){
        guessBoxArray.push(tempRay[i]);
    }

    for(var i = 0; i < 10; i++){
        var guessArray = guessBoxArray[i].getElementsByClassName("guess-peg");
        for(var j = 0; j < 4; j++){
            $(guessArray[j]).attr("id",`g-${i}-${j}`)
        }
    }

    var masterGuessArray = [[-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1],
                            [-1,-1,-1,-1]];

    $(".submit-btn").click(function(){
        $(".active").removeClass("active");
        var gradRay = getGrade();
        checkWin(gradRay);
        // checkLose(gradRay);
        var gradeBox = getGradeBox();
        placePegs(gradRay, gradeBox);
        guess++;
        for(var i = 0; i < 4; i++){
            $(`#g-${guess}-${i}`).addClass("active");
        }
        $(".submit-btn").hide();
    });

    $(".inner-selector").click(function(){
        isSelected = true;
        $(".outer-selector").css("background","linear-gradient(#C95E56,#C0439A,#C95E56)");
        var peg = ($(this).parent())[0];
        selectedColor = $(this).css("background-color");
        $(peg).css("background","none");
        $(peg).css("background-color",selectedColor);
    });

    $('.guess-peg').click(function() {
        if (isSelected){
            if ($(this).hasClass("active")){
                var number = parseInt($(this).css("border"));
                if(number === 1){
                    $(this).css("background","none");
                    $(this).css("background-color",selectedColor);
                    $(this).css("border","2px solid white");
                    var coord = $(this).attr("id");
                    updateMasterArray(selectedColor, coord);
                    clickCount++;
                    if(clickCount === 4){
                        $(".submit-btn").show();
                        clickCount = 0;
                    };
                } else {
                    $(this).css("background",bGround);
                    $(this).css("border","1px solid white");
                    // updateMasterArray(selectedColor, coord);
                    clickCount--;
                }
            }
        }
    });

    function makeAnswer(){
        var ray = [];
        for(var i = 0; i < 4; i++){
            ray.push(Math.floor(Math.random() * 6));
        }
        return ray;
    }

    function updateMasterArray(col, xy) {
        var ray = xy.split('-');
        var x = ray[1];
        var y = ray[2];
        masterGuessArray[x][y] = makeColorANumber(col);
      }

    function makeColorANumber(col){
        if(col === 'rgb(255, 0, 0)') return 0;
        if(col === 'rgb(255, 255, 0)') return 1;
        if(col === 'rgb(0, 0, 255)') return 2;
        if(col === 'rgb(0, 128, 0)') return 3;
        if(col === 'rgb(0, 0, 0)') return 4;
        if(col === 'rgb(255, 255, 255)') return 5;
    }

    function getGrade(){
        var gradRay = [];
        var aRay = [];
        for (var i = 0; i < 4; i++){
            aRay.push(answerRay[i]);
        }



        // Give hints : black pegs
        for(var i = 0; i < 4; i++){
            if(masterGuessArray[guess][i] === aRay[i]){
                gradRay.push("black-peg");
                aRay[j]= -1;
                masterGuessArray[guess][i] = -2;
            }
        }

        // Give hints : white pegs
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(masterGuessArray[guess][i] === aRay[j]){
                    gradRay.push("white-peg");
                    aRay[i] = -1;
                    masterGuessArray[guess][i] = -2;
                }
            }
        }
        return gradRay;
    }

    function getGradeBox(){
        var activeGrade = nextGrade.getElementsByClassName("grade-pegs")[0];
        nextGrade = $(nextGrade).prev()[0];
        return activeGrade;
    }

    function placePegs(ray, box){
        var pegRay = box.getElementsByClassName("grade-peg");
        for (var i = 0; i < ray.length; i++){
            $(pegRay[i]).addClass(`${ray[i]}`);
        }
        $('.white-peg').css('background', 'none').css('background-color', 'white');
        $('.black-peg').css('background', 'none').css('background-color', 'black');
    };

    function checkWin(ray){
        var rayStr = ray.join();
        // if (($("div").hasClass("last-grade")) && (!(rayStr === "black-peg,black-peg,black-peg,black-peg"))){
        //     $(".lose").fadeIn(200);
        //     $("button").click(function(){
        //         document.location.reload();
        //         });
        //     } else if (rayStr === "black-peg,black-peg,black-peg,black-peg"){
        if (rayStr === "black-peg,black-peg,black-peg,black-peg"){
            $(".win").fadeIn(200);
            $(".answer-pegs").fadeIn(200);
            $("button").click(function(){
                document.location.reload();
                // $(".start").hide();
            });
        }
    };
});