var ogmessage;
var gamemessage;
var isRunning = false;
var GameField;
var nSqaures = 0;
var maxSquare = 0;
var collector;

/**
 * @usage !2048 <optional: stop>
 * @does starts a Game of 2048 or stops it
 */
module.exports = {
    2048: function (message) {
        start(message);
    }
}

function start(message) {
    ogmessage = message;
    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    if (contentArgs[1] == 'stop') { //StopFunction
        ogmessage.channel.send('2048 was stopped');
        stop();
        return;
    }

    if (isRunning) { //Doesnt start a Game if one is already running
        ogmessage.channel.send('A Game is already running');
        return;
    }

    setUp(); //Init Game

    ogmessage.channel.send('Starting a Game of 2048').then(gm => {
        gamemessage = gm;
        addNumber();
        addNumber();
        updateField();
        collector = gamemessage.createReactionCollector(m => m.users.has(ogmessage.author.id));
        collector.on('collect', listener);
        messageReact();
    });
}

function stop() {   //Stops the Game
    collector.stop();
    collector = undefined;
    ogmessage = undefined;
    gamemessage = undefined;
    GameField = undefined;
    isRunning = false;
    nSqaures = 0;
    maxSquare = 0;
}

function setUp() {

    isRunning = true;

    GameField = [ //Init GameField
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
}

function updateField() {    //Updates the Message containing the GameField
    let FieldMessage = '2048 \n\n\n';

    for (let i1 = 0; i1 < 4; i1++) {

        var row = '';
        for (let i2 = 0; i2 < 4; i2++) {
            row = row.concat(getEmoteNumber(GameField[i1][i2])).concat(' ');
        }
        FieldMessage = FieldMessage.concat(row).concat('\n');
    }
    gamemessage.edit(FieldMessage);
}

function getEmoteNumber(number) { //Returns an Emoji
    let emojis = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];

    return emojis[number] || '⬜';
}

function addNumber() {  //Adds Number after Player moved

    while (true) {
        let a = Math.floor(Math.random() * 4);
        let b = Math.floor(Math.random() * 4);

        if (GameField[a][b] == 0) {
            GameField[a][b] = 1;
            nSqaures++;
            return;
        }
    }
}

function messageReact() {   //Process Message  
    gamemessage.react('⬆️');
    setTimeout(() => {  //Timeouts so Emojis are in same order
        gamemessage.react('⬇️');

        setTimeout(() => {
            gamemessage.react('⬅️');

            setTimeout(() => {
                gamemessage.react('➡️');
            }, 1000);
        }, 1000);
    }, 1000);
}

var listener = function (emoji) {   //Processes the Input of Player

    calcMove(emoji._emoji.name);

    if (nSqaures == 16) {   //Loss Check
        ogmessage.channel.send('Game Over, Field is full');
        stop();
        return;
    }

    if (maxSquare == 11) {    //Win Check
        ogmessage.channel.send('You won the Game');
        stop();
        return;
    }

    addNumber();
    updateField();
    gamemessage.clearReactions();   //Resets Reactions
    setTimeout(() => {
        messageReact();
    }, 100);
}

function calcMove(dir) {    //DOWN -> RIGHT
    switch (dir) { //CALC MOVE HERE DONT FORGET nSquares and maxSqaure
        case '⬆️': //up
            for (let x = 0; x < 4; x++) { //For all 3 rows
                for (let y = 0; y < 4; y++) {
                    if (GameField[y][x] != 0) {
                        let m = y;
                        while (m > 0) {  //Moves Square next is zero
                            if (GameField[m - 1][x] == 0) {
                                GameField[m - 1][x] = GameField[m][x];
                                GameField[m][x] = 0;
                                m--;
                            } else {    //Next Field isnt zero
                                if (GameField[m - 1][x] == GameField[m][x]) { //If its same merge
                                    GameField[m - 1][x]++; // += GameField[x][m];
                                    GameField[m][x] = 0;
                                    nSqaures--;
                                    if (GameField[m - 1][x] > maxSquare) {  //Set highest number for winning condition
                                        maxSquare = GameField[m - 1][x];
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case '⬇️': //down
            for (let x = 0; x < 4; x++) { //For all 3 rows
                for (let y = 3; y > -1; y--) {
                    if (GameField[y][x] != 0) {
                        let m = y;
                        while (m < 3) {  //Moves Square next is zero
                            if (GameField[m + 1][x] == 0) {
                                GameField[m + 1][x] = GameField[m][x];
                                GameField[m][x] = 0;
                                m++;
                            } else {    //Next Field isnt zero
                                if (GameField[m + 1][x] == GameField[m][x]) { //If its same merge
                                    GameField[m + 1][x]++; // += GameField[x][m];
                                    GameField[m][x] = 0;
                                    nSqaures--;
                                    if (GameField[m + 1][x] > maxSquare) {  //Set highest number for winning condition
                                        maxSquare = GameField[m + 1][x];
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case '⬅️': //left
            for (let x = 0; x < 4; x++) { //For all 3 rows
                for (let y = 0; y < 4; y++) {
                    if (GameField[x][y] != 0) {
                        let m = y;
                        while (m > 0) {  //Moves Square next is zero
                            if (GameField[x][m - 1] == 0) {
                                GameField[x][m - 1] = GameField[x][m];
                                GameField[x][m] = 0;
                                m--;
                            } else {    //Next Field isnt zero
                                if (GameField[x][m - 1] == GameField[x][m]) { //If its same merge
                                    GameField[x][m - 1]++; // += GameField[x][m];
                                    GameField[x][m] = 0;
                                    nSqaures--;
                                    if (GameField[x][m - 1] > maxSquare) {  //Set highest number for winning condition
                                        maxSquare = GameField[x][m - 1];
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case '➡️': //right
            for (let x = 0; x < 4; x++) { //For all 3 rows
                for (let y = 3; y > -1; y--) {
                    if (GameField[x][y] != 0) {
                        let m = y;
                        while (m < 4) {  //Moves Square next is zero
                            if (GameField[x][m + 1] == 0) {
                                GameField[x][m + 1] = GameField[x][m];
                                GameField[x][m] = 0;
                                m++;
                            } else {    //Next Field isnt zero
                                if (GameField[x][m + 1] == GameField[x][m]) { //If its same merge
                                    GameField[x][m + 1]++; // += GameField[x][m];
                                    GameField[x][m] = 0;
                                    nSqaures--;
                                    if (GameField[x][m + 1] > maxSquare) {  //Set highest number for winning condition
                                        maxSquare = GameField[x][m + 1];
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
            break;
        default:
            ogmessage.channel.send('Not a Command');
            break;
    }
}