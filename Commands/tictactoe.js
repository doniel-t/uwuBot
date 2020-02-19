module.exports = {
    tictactoe: function(message, bot) {
        tictactoe(message, bot);
    }
}

class Field {
    value;
    constructor() {
        this.value = '⬜';
    }
}

class Player {
    id;
    symbol;
    username;
    constructor(id, symbol, username) {
        this.id = id;
        this.symbol = symbol;
        this.username = username;
    }
}

var players = [];
var playerCount = 0;
var playerInput;
var gameField = [];
var xTurn;
var dcBot;

function tictactoe(message, bot) {
    gameField = []; // initializing game from start
    xTurn = true;
    playerCount = 0;
    dcBot = bot;
    playerInput = message;
    ogMessage = message;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameField.push(new Field());
        }
    }
    message.channel.send("Only two players can join!\nWrite join to join the game!");
    dcBot.on('message', listener); //TODO: Cant start game after finishing the first 
}

var listener = function(playerInput) { //Listens to all Messages and ends game
    if (playerCount < 2) {
        createPlayers(playerInput);
    }
    if (playerInput.channel == ogMessage.channel) { // Only Messages in Channel where !tictactoe was called
        if (playerInput.content.length != 3 && playerInput.author.bot == false && playerInput.content !== "join") {
            playerInput.channel.send("Your input was wrong! Try to use it like this \"x,y\"");
        }
        if (playerInput.content.length === 3 && playerInput.author.id == players[0].id && xTurn) { // Only Message with three Character 1,1
            fillFields(playerInput);
            xTurn = false;
            drawField();
        } else {
            if (playerInput.content.length === 3 && playerInput.author.id == players[1].id && xTurn == false) {
                fillFields(playerInput);
                xTurn = true;
                drawField();
            }
        }
    }
    checkGameState();
}

function checkGameState() { // checks end condition

    for (let i = 0; i <= 6; i += 3) { // checks every horizontal combination but the crosses for x and o
        if (gameField[i].value === '❌' && gameField[i + 1].value === '❌' && gameField[i + 2].value === '❌') {
            playerInput.channel.send(players[0].username + " won the game!");
            dcBot.removeListener('message', listener); // finish game 
        } else if (gameField[i].value === '⭕' && gameField[i + 1].value === '⭕' && gameField[i + 2].value === '⭕') {
            playerInput.channel.send(players[1].username + " won the game!");
            dcBot.removeListener('message', listener); // finish game 
        }
    }

    for (let i = 0; i < 3; i++) { // checks every vertical combination of o and x
        if (gameField[i].value === '❌' && gameField[i + 3].value === '❌' && gameField[i + 6].value === '❌') {
            playerInput.channel.send(players[0].username + " won the game!");
            dcBot.removeListener('message', listener); // finish game 
        } else if (gameField[i].value === '⭕' && gameField[i + 3].value === '⭕' && gameField[i + 6].value === '⭕') {
            playerInput.channel.send(players[1].username + " won the game!");
            dcBot.removeListener('message', listener); // finish game 
        }
    }

    //checks x diagonales

    if (gameField[0].value === '❌' && gameField[4].value === '❌' && gameField[8].value === '❌') {
        playerInput.channel.send(players[0].username + " won the game!");
        dcBot.removeListener('message', listener);
    }
    if (gameField[2].value === '❌' && gameField[4].value === '❌' && gameField[6].value === '❌') {
        playerInput.channel.send(players[0].username + " won the game!");
        dcBot.removeListener('message', listener);
    }

    // Checks o's diagonales
    if (gameField[0].value === '⭕' && gameField[4].value === '⭕' && gameField[8].value === '⭕') {
        playerInput.channel.send(players[1].username + " won the game!");
        dcBot.removeListener('message', listener);
    }
    if (gameField[2].value === '⭕' && gameField[4].value === '⭕' && gameField[6].value === '⭕') {
        playerInput.channel.send(players[1].username + " won the game!");
        dcBot.removeListener('message', listener);
    }

    /* Checks for ties! */
    let fieldString = "";
    for (let field of gameField) { // makes fieldValues as string
        fieldString = fieldString.concat(field.value);
    }
    if (!fieldString.includes("⬜")) { // if field is full stop the game
        playerInput.channel.send("Its a tie!");
        dcBot.removeListener('message', listener); // finish game 
    }
    fieldString = ""; // resets fieldString
}

function createPlayers(playerInput) {
    if (playerInput.content == 'join' && playerCount == 0) {
        players.push(new Player(playerInput.author.id, '❌', playerInput.author.username));
        playerCount++;
        playerInput.channel.send(playerInput.author.username + (" Has ❌ as his symbol!"));
    } else
    if (playerInput.content == 'join' && playerCount == 1) {
        players.push(new Player(playerInput.author.id, '⭕', playerInput.author.username));
        playerCount++;
        playerInput.channel.send(playerInput.author.username + (" Has ⭕ as his symbol!"));
        drawField();
    }
}

function drawField() {
    let fieldMessage = "";
    var count = 0;
    for (let field of gameField) {
        if (count == 3) {
            fieldMessage += "\n";
            count = 0;
        }
        fieldMessage = fieldMessage.concat(field.value + " ");
        count++;
    }
    playerInput.channel.send(fieldMessage);
}

function fillFields(playerInput) {
    if (xTurn) {
        switch (playerInput.content) {
            case '1,1':
                if (gameField[0].value === '⬜') {
                    gameField[0].value = players[0].symbol;
                }
                break;
            case '1,2':
                if (gameField[3].value === '⬜') {
                    gameField[3].value = players[0].symbol;
                }
                break;
            case '1,3':
                if (gameField[6].value === '⬜') {
                    gameField[6].value = players[0].symbol;
                }
                break;
            case '2,1':
                if (gameField[1].value === '⬜') {
                    gameField[1].value = players[0].symbol;
                }
                break;
            case '2,2':
                if (gameField[4].value === '⬜') {
                    gameField[4].value = players[0].symbol;
                }
                break;
            case '2,3':
                if (gameField[7].value === '⬜') {
                    gameField[7].value = players[0].symbol;
                }
                break;
            case '3,1':
                if (gameField[2].value === '⬜') {
                    gameField[2].value = players[0].symbol;
                }
                break;
            case '3,2':
                if (gameField[5].value === '⬜') {
                    gameField[5].value = players[0].symbol;
                }
                break;
            case '3,3':
                if (gameField[8].value === '⬜') {
                    gameField[8].value = players[0].symbol;
                }
                break;
        }
    } else {
        switch (playerInput.content) {
            case '1,1':
                if (gameField[0].value === '⬜') {
                    gameField[0].value = players[1].symbol;
                }
                break;
            case '1,2':
                if (gameField[3].value === '⬜') {
                    gameField[3].value = players[1].symbol;
                }
                break;
            case '1,3':
                if (gameField[6].value === '⬜') {
                    gameField[6].value = players[1].symbol;
                }
                break;
            case '2,1':
                if (gameField[1].value === '⬜') {
                    gameField[1].value = players[1].symbol;
                }
                break;
            case '2,2':
                if (gameField[4].value === '⬜') {
                    gameField[4].value = players[1].symbol;
                }
                break;
            case '2,3':
                if (gameField[7].value === '⬜') {
                    gameField[7].value = players[1].symbol;
                }
                break;
            case '3,1':
                if (gameField[2].value === '⬜') {
                    gameField[2].value = players[1].symbol;
                }
                break;
            case '3,2':
                if (gameField[5].value === '⬜') {
                    gameField[5].value = players[1].symbol;
                }
                break;
            case '3,3':
                if (gameField[8].value === '⬜') {
                    gameField[8].value = players[1].symbol;
                }
                break;
        }
    }
}