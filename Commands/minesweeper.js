var dcbot;
var ogmessage;
var GameField;
var gamemessage;
var numberRevealed = 0;
var GameSize;
var GameBombs;
var isRunning = false;

module.exports = {
    minesweeper: function (message, bot) {
        minesweeper(message, bot);
    }
}

function minesweeper(message, bot) {    //Starts the Game
    dcbot = bot;
    ogmessage = message;
    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    if (contentArgs[1] == 'stop') { //StopFunction
        ogmessage.channel.send('Minesweeper was stopped');
        stop();
        return;
    }

    if (isRunning) { //Doesnt start a Game if one is already running
        ogmessage.channel.send('A Game is already running');
        return;
    }

    if (contentArgs.length == 1) {    //Start a Game with 5, 10 if no Size/Bombs are given
        message.content = '!minesweeper 5';
        minesweeper(message, bot);
        return;
    }
    if (contentArgs[1] > 9) {
        ogmessage.channel.send('Field too big, only a max of 9 is supported');
        return;
    }
    if (contentArgs[1] < 2) {
        ogmessage.channel.send('This FieldSize is not supported');
        return;
    }
    if (isNaN(contentArgs[1])) {
        ogmessage.channel.send('Please enter numbers');
        return;
    }
    if (contentArgs.length == 3) { //If a number of Bombs is given
        if (contentArgs[2] < 1) {
            ogmessage.channel.send('The Number of Bombs is not supported');
            return;
        }
        if (isNaN(contentArgs[2])) {
            ogmessage.channel.send('Please enter numbers');
            return;
        }
        if (contentArgs[2] >= contentArgs[1] * contentArgs[1]) {
            ogmessage.channel.send('Too Many Bombs');
            return;
        }

    } else {    //AutoAdd Bombs if none were given
        contentArgs[2] = contentArgs[1] * contentArgs[1] * 0.21;
    }

    randomize(contentArgs[1], contentArgs[2]); //Sets up GameField

    ogmessage.channel.send('Starting a Game of Minesweeper').then(gm => {
        gamemessage = gm;
        updateField(false);
    });

    bot.on('message', listener);
}

function randomize(size, nBombs) {  //Inits GameField

    isRunning = true;

    GameSize = size;
    GameBombs = nBombs;
    GameField = new Array();

    for (let i = 0; i < size; i++) {    //Creates GameField
        GameField[i] = new Array();
        for (let j = 0; j < size; j++) {
            GameField[i][j] = new Field();
        }
    }

    var setBombs = 0;

    while (setBombs < nBombs) {    //Plants Bombs in GameField

        let a = Math.floor(Math.random() * size);
        let b = Math.floor(Math.random() * size);

        if (!GameField[a][b].isBomb) {
            GameField[a][b].isBomb = true;
            setBombs++;
        }
    }

    for (let i = 0; i < size; i++) {    //Puts Number Values into Field

        for (let j = 0; j < size; j++) {

            if (!GameField[i][j].isBomb) {

                try {
                    if (GameField[i + 1][j].isBomb) {  //Checks Right
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i - 1][j].isBomb) {  //Checks Left
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i][j + 1].isBomb) {  //Checks Up
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i][j - 1].isBomb) {  //Checks Down
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i + 1][j + 1].isBomb) {  //Checks RightUp
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i - 1][j - 1].isBomb) {  //Checks LeftDown
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i - 1][j + 1].isBomb) {  //Checks LeftUp
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

                try {
                    if (GameField[i + 1][j - 1].isBomb) {  //Checks RightDown
                        GameField[i][j].points++;
                    }
                } catch (ignored) { };

            } else {
                GameField[i][j].points = 'x';  //Sets x if Field is a Bomb
            }
        }
    }
}

class Field {
    constructor() {
        this.isBomb = false;
        this.points = 0;
        this.isRevealed = false;
        this.checked = false;
    }
}

function letterToNumber(letter) {   //A->0 B->1 C->3
    let number = letter.toLowerCase().charCodeAt(0);
    if (number < 97 || number > 122) {
        return 'error'
    } else {
        return number - 97;
    }
}

var listener = function (guess) {   //Processes Answers

    if (guess.content.length == 2) {

        let h = letterToNumber(guess.content.charAt(0));   //Get both Values
        let w = guess.content.charAt(1) - 1;

        if (!isNaN(h) && !isNaN(w)) { // If Both are Number

            if (h < GameSize && w < GameSize && w > -1) {  //Check for wrong Numbers

                if (!GameField[h][w].isRevealed) {

                    if (GameField[h][w].isBomb) {//GAME LOST

                        gamemessage.channel.send('You stepped on a Bomb');
                        stop();

                    } else {    //Reveal Field

                        revealField(h, w);
                        updateField(false);

                        if (numberRevealed == GameSize * GameSize - GameBombs) {   //GAME WON
                            gamemessage.channel.send('You won the Game');
                            stop();
                        }
                    }
                } else {//ALREADY CHECKED
                    ogmessage.channel.send('Already checked that Field').then(check => {
                        check.delete(1000);
                    })
                }
            }
        }
    }
}

function revealField(h, w) {    //Reveals a Field and if its 0 it reveals its Neighbours
    try {
        GameField[h][w].isRevealed = true;

        if (!GameField[h][w].checked) {
            GameField[h][w].checked = true;
            numberRevealed++;
            if (GameField[h][w].points == 0) {

                revealField(h + 1, w + 1);
                revealField(h + 1, w);
                revealField(h + 1, w - 1);
                revealField(h, w + 1);
                revealField(h, w - 1);
                revealField(h - 1, w + 1);
                revealField(h - 1, w);
                revealField(h - 1, w - 1);
            }
        }

    } catch (ignored) { }
}

function getIcon(FieldIcon, revAll) {   //Gets Icon to show in Message

    if (FieldIcon.isRevealed || revAll) {
        if (FieldIcon.isBomb) {
            return '💣';
        }
        return getEmoteNumber(FieldIcon.points);
    } else {
        return '⬜';
    }
}

function updateField(isFinished) {    //Updates the Message containing the GameField
    let FieldMessage = 'Minesweeper \n\n\n⬛';

    for (let i3 = 0; i3 < GameSize; i3++) { //First Row with A B C
        FieldMessage = FieldMessage.concat(getEmoteNumber(i3 + 1)).concat(' ');
    }
    FieldMessage = FieldMessage.concat('\n');

    for (let i1 = 0; i1 < GameSize; i1++) {

        var row = getEmoteLetter(i1); //Numbers on the Left
        for (let i2 = 0; i2 < GameSize; i2++) {
            row = row.concat(getIcon(GameField[i1][i2], isFinished)).concat(' ');
        }
        FieldMessage = FieldMessage.concat(row).concat('\n');
    }

    gamemessage.edit(FieldMessage);
}

function getEmoteNumber(number) { //Returns an Emoji
    switch (number) {
        case 0:
            return '0️⃣';
        case 1:
            return '1️⃣';
        case 2:
            return '2️⃣';
        case 3:
            return '3️⃣';
        case 4:
            return '4️⃣';
        case 5:
            return '5️⃣';
        case 6:
            return '6️⃣';
        case 7:
            return '7️⃣';
        case 8:
            return '8️⃣';
        case 9:
            return '9️⃣';
        case 10:
            return '0️⃣';

        default:
            return '👍';
    }
}

function getEmoteLetter(letter) { //Returns an Emoji
    switch (letter) {
        case 0:
            return '🇦';
        case 1:
            return '🇧';
        case 2:
            return '🇨';
        case 3:
            return '🇩';
        case 4:
            return '🇪';
        case 5:
            return '🇫';
        case 6:
            return '🇬';
        case 7:
            return '🇭';
        case 8:
            return '🇮';
        case 9:
            return '🇯';
        default:
            return '👍';
    }
}

function stop() {   //Stops the Game
    updateField(true);
    dcbot.removeListener('message', listener);
    dcbot = undefined;
    ogmessage = undefined;
    GameField = undefined;
    gamemessage = undefined;
    numberRevealed = 0;
    GameSize = undefined;
    GameBombs = undefined;
    isRunning = false;
}