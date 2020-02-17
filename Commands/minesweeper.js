var dcbot;
var ogmessage;
var GameField;
var gamemessage;
var numberChecked = 0;
var GameSize;
var GameBombs;

module.exports = {
    minesweeper: function (message, bot) {
        minesweeper(message, bot);
    }
}

function minesweeper(message, bot) {    //Starts the Game
    dcbot = bot;
    ogmessage = message;
    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    randomize(contentArgs[1], contentArgs[2]); //Sets up GameField

    ogmessage.channel.send('Starting a Game of Minesweeper').then(gm => {
        gamemessage = gm;
        updateField(false);
    });

    bot.on('message', listener);
}

function randomize(size, nBombs) {  //Inits GameField

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

    while (setBombs != nBombs) {    //Plants Bombs in GameField

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
    }
}

function letterToNumber(letter) {   //A->0 B->1 C->3
    return letter.toLowerCase().charCodeAt(0) - 97;
}

function numberToLetter(number) {   //Reverse of letterToNumber
    return String.fromCharCode(65 + number);
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
                        updateField(true);
                        dcbot.removeListener('message', listener);
                        dcbot = undefined;
                        ogmessage = undefined;
                        GameField = undefined;
                        gamemessage = undefined;
                        numberChecked = 0;
                        GameSize = undefined;
                        GameBombs = undefined;

                    } else {    //Reveal Field

                        console.log(GameField[h][w].points);
                        GameField[h][w].isRevealed = true;
                        numberChecked++;

                        updateField(false);

                        if (numberChecked == GameSize * GameSize - GameBombs) {   //GAME WON

                            gamemessage.channel.send('You won the Game');
                            updateField(true);
                            dcbot.removeListener('message', listener);
                            dcbot = undefined;
                            ogmessage = undefined;
                            GameField = undefined;
                            gamemessage = undefined;
                            numberChecked = 0;
                            GameSize = undefined;
                            GameBombs = undefined;
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
        FieldMessage = FieldMessage.concat(getEmoteLetter(i3)).concat(' ');
    }
    FieldMessage = FieldMessage.concat('\n');

    for (let i1 = 0; i1 < GameSize; i1++) {

        var row = getEmoteNumber(i1 + 1); //Numbers on the Left
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