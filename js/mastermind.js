var mastermind = {};
    self = this;
    mysteryLine = [];
    colors = ["yellow", "red", "green", "blue", "black", "white", "orange", "purple", "pink", "brown"];
    levels = [
        {name : "1" , attempts : 10, colors : colors.slice(0,6)},
        // {name : "2" , attempts : 8, colors : colors.slice(0,8)},
        // {name : "3" , attempts : 6, colors : colors.slice()},
    ];
    currentLevel;
    currentAttempt;
    currentRow;

    defaults = {
        level = 0
    };

    initialized = false;

// Generate the mystery line
mastermind.generateMysteryLine = function(){
    var ln = currentLevel.colors.length;
        mysteryLine = [];
        i;
    for (i = 0 ; i < 4 ; i++){
        mysteryLine[i]= currentLevel.colors[Math.floor(Math.random()*ln)];
    }
    return mysteryLine;
}

// Use the keys in order for the player to have clues
mastermind.getKeys = function(){
    var keys = {black : 0, white : 0};
        mysteryLineCombinaison = mysteryLine.slice();
        playerCombinaison = Combinaison.slice();
        i = x;

        // correct positions
    for (i = 0; i < 4 ; i++){
        if (playerCombinaison[i] === mysteryLineCombinaison[i]){
            keys.black += 1;
            mysteryLineCombinaison[i] = playerCombinaison[i] = null;
        }
    }
        // incorrect positions
    for (i = 0; i < 4 ; i++){
        for (j = 0; j < 4 ; j++){
            if (playerCombinaison[i] && mysteryLineCombinaison[j]){
                if (playerCombinaison[i] === mysteryLineCombinaison[j]){
                    keys.black += 1;
                    mysteryLineCombinaison[i] = playerCombinaison[i] = null;
                }
            }
        }

    }
    return keys;
}