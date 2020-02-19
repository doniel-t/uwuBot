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
var fieldMessage;
var sent = false;
var players = [];
var playerInput;
var gameField = [];
var xTurn;
var dcBot;
var ogMessage;
var isRunning;

function stop() {
    dcBot.removeListener('message', listener); // finish game 
    sent = false;
    isRunning = false;
    xTurn = true;
    playerInput = undefined;
    ogMessage = undefined;
}

function tictactoe(message, bot) {
    gameField = []; // initializing game from start
    players = [];
    xTurn = true;
    dcBot = bot;
    playerInput = message;
    ogMessage = message;

    if (isRunning) { //Doesnt start a Game if one is already running
        message.channel.send('A Game is already running');
        return;
    }
    isRunning = true;

    for (let i = 0; i < 9; i++) {
        gameField.push(new Field());
    }
    message.channel.send("Only two players can join!\nWrite join to join the game!");
    dcBot.on('message', listener);
}

var listener = function(playerInput) { //Listens to all Messages and ends game
    if (players.length < 2) {
        createPlayers(playerInput);
    }
    if (playerInput.channel == ogMessage.channel) { // Only Messages in Channel where !tictactoe was called
        if (playerInput.content.includes("stop")) {
            stop();
        } else {
            if (playerInput.content.length == 1 && playerInput.author.bot == false && playerInput.content !== "join") {
                try {
                    if (playerInput.author.id == players[0].id && xTurn) { // Only Message with three Character 1,1
                        fillFields(playerInput);
                        xTurn = false;
                        drawField();
                        checkGameState();
                    } else if (playerInput.author.id == players[1].id && xTurn == false) {
                        fillFields(playerInput);
                        xTurn = true;
                        drawField();
                        checkGameState();
                    }
                } catch (ignored) {
                    playerInput.channel.send("Try joining before writing something!");
                }
            }
        }
    }
}

function checkGameState() { // checks end condition

    for (let i = 0; i <= 6; i += 3) { // checks every horizontal combination but the crosses for x and o
        if (gameField[i].value === '❌' && gameField[i + 1].value === '❌' && gameField[i + 2].value === '❌') {
            playerInput.channel.send(players[0].username + " won the game!");
            stop();
        } else if (gameField[i].value === '⭕' && gameField[i + 1].value === '⭕' && gameField[i + 2].value === '⭕') {
            playerInput.channel.send(players[1].username + " won the game!");
            stop();
        }
    }

    for (let i = 0; i < 3; i++) { // checks every vertical combination of o and x
        if (gameField[i].value === '❌' && gameField[i + 3].value === '❌' && gameField[i + 6].value === '❌') {
            playerInput.channel.send(players[0].username + " won the game!");
            stop();
        } else if (gameField[i].value === '⭕' && gameField[i + 3].value === '⭕' && gameField[i + 6].value === '⭕') {
            playerInput.channel.send(players[1].username + " won the game!");
            stop();
        }
    }

    //checks x diagonales
    if (gameField[0].value === '❌' && gameField[4].value === '❌' && gameField[8].value === '❌') {
        playerInput.channel.send(players[0].username + " won the game!");
        stop();
    }
    if (gameField[2].value === '❌' && gameField[4].value === '❌' && gameField[6].value === '❌') {
        playerInput.channel.send(players[0].username + " won the game!");
        stop();
    }

    // Checks o's diagonales
    if (gameField[0].value === '⭕' && gameField[4].value === '⭕' && gameField[8].value === '⭕') {
        playerInput.channel.send(players[1].username + " won the game!");
        stop();
    }
    if (gameField[2].value === '⭕' && gameField[4].value === '⭕' && gameField[6].value === '⭕') {
        playerInput.channel.send(players[1].username + " won the game!");
        stop();
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
    if (playerInput.content == 'join' && players.length == 0) {
        players.push(new Player(playerInput.author.id, '❌', playerInput.author.username));
        playerInput.channel.send(playerInput.author.username + (" Has ❌ as his symbol!"));
    } else
    if (playerInput.content == 'join' && players.length == 1) {
        players.push(new Player(playerInput.author.id, '⭕', playerInput.author.username));
        playerInput.channel.send(playerInput.author.username + (" Has ⭕ as his symbol!"));
        drawField();
    }
}

async function drawField() {
    let messageContent = "";
    var count = 0;
    if (sent == false) { //draws the field a the first time
        for (let field of gameField) {
            if (count == 3) {
                messageContent += "\n";
                count = 0;
            }
            messageContent = messageContent.concat(field.value + " ");
            count++;
        }
        sent = true;
        fieldMessage = await playerInput.channel.send(messageContent);
    } else { // edits the field
        messageContent = "";
        for (let field of gameField) {
            if (count == 3) {
                messageContent += "\n";
                count = 0;
            }
            messageContent = messageContent.concat(field.value + " ");
            count++;
        }
        fieldMessage.edit(messageContent);
    }
}

function fillFields(playerInput) {
    if (xTurn) {
        if (gameField[parseInt(playerInput) - 1].value === '⬜') {
            gameField[parseInt(playerInput) - 1].value = players[0].symbol;
        } else {
            playerInput.channel.send("You lose your -1turn because you chose a tile that is already filled in pepega");
        }
    } else {
        if (gameField[parseInt(playerInput) - 1].value === '⬜') {
            gameField[parseInt(playerInput) - 1].value = players[1].symbol;
        } else {
            playerInput.channel.send("You lose your turn because you chose a tile that is already filled in pepega");
        }
    }
}