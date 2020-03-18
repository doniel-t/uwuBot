module.exports = {
    tictactoe: function(message, bot) {
        tictactoe(message, bot);
    }
}

var fieldMessage;
var players = [];
var ogMessage;
var gameField = [];
var xTurn = true;
var dcBot;
var isRunning = false;
var nTurns = 0;
const Emoji = ['❌', '⭕']

class Player {
    constructor(id, symbol, username) {
        this.id = id;
        this.symbol = symbol;
        this.username = username;
    }
}

function stop() {
    dcBot.removeListener('message', listener); // finish game 
    isRunning = false;
    xTurn = false;
    ogMessage = undefined;
    fieldMessage = undefined;
    players = [];
    gameField = [];
    dcBot = undefined;
    nTurns = 0;
}

function tictactoe(message, bot) {

    dcBot = bot;
    ogMessage = message;

    if (isRunning) { //Doesnt start a Game if one is already running
        message.channel.send('A Game is already running');
        return;
    }

    if (message.content.substring(10) == 'stop') { //Stops game
        message.channel.send('Stopped the Game of TictacToe');
        stop();
        return;
    }

    for (let i = 0; i < 9; i++) { //Inits GameField
        gameField.push('⬜');
    }

    isRunning = true;
    message.channel.send("Only two players can join!\nWrite join to join the game!");
    dcBot.on('message', listener);
}

var listener = function(input) { //Listens to all Messages and ends game
    if (players.length < 2 && input.content == "join") {
        createPlayers(input);
    }
    if (input.content.length == 1 && input.channel == ogMessage.channel && ogMessage.author.bot == false) { //Check for right format
        try { //checks if player tries to give input before they joined
            if ((input.author.id == players[0].id && xTurn) || (input.author.id == players[1].id && xTurn == false)) { //Player turn and message is from Player
                fillFields(input);
                drawField();
                checkGameState();
                xTurn = !xTurn;
            }
        } catch (ignored) { //runs if player gives wrong input (either didnt join -> NullPointerException) or input was not a number
            if (isRunning == true) input.channel.send("You didnt join or your input was not a number!");
        }
    }
}

function checkGameState() { // checks end condition
    nTurns++;

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i <= 6; i += 3) { // checks every horizontal combination
            if (gameField[i] === players[j].symbol && gameField[i + 1] === players[j].symbol && gameField[i + 2] === players[j].symbol) {
                ogMessage.channel.send(players[j].username + " won the game!");
                stop();
            }
        }
        for (let i = 0; i < 3; i++) { // checks every vertical combination
            if (gameField[i] === players[j].symbol && gameField[i + 3] === players[j].symbol && gameField[i + 6] === players[j].symbol) {
                ogMessage.channel.send(players[j].username + " won the game!");
                stop();
            }
        }
        //checks diagonales
        if (gameField[0] === players[j].symbol && gameField[4] === players[j].symbol && gameField[8] === players[j].symbol) {
            ogMessage.channel.send(players[j].username + " won the game!");
            stop();
        }
        if (gameField[2] === players[j].symbol && gameField[4] === players[j].symbol && gameField[6] === players[j].symbol) {
            ogMessage.channel.send(players[j].username + " won the game!");
            stop();
        }
    }

    if (nTurns == 9) { // if field is full stop the game
        ogMessage.channel.send("Its a tie!");
        stop();
    }
}

function createPlayers(playerm) { //Creates Player
    if (playerm.content == 'join' && players.length == 0) {
        players.push(new Player(playerm.author.id, Emoji[0], playerm.author.username));
        playerm.channel.send(playerm.author.username + (" Has " + Emoji[0] + " as his symbol!"));
    } else {
        players.push(new Player(playerm.author.id, Emoji[1], playerm.author.username));
        playerm.channel.send(playerm.author.username + (" Has " + Emoji[1] + " as his symbol!"));

        ogMessage.channel.send('Starting a Game of TicTacToe').then(m => {
            fieldMessage = m;
            drawField();
        });
    }
}

function drawField() { //Edits Message containing TicTacToe Field
    let messageContent = ''
        .concat(gameField[0]).concat(gameField[1]).concat(gameField[2]).concat('\n')
        .concat(gameField[3]).concat(gameField[4]).concat(gameField[5]).concat('\n')
        .concat(gameField[6]).concat(gameField[7]).concat(gameField[8]).concat('\n');

    fieldMessage.edit(messageContent);
}

function fillFields(fieldm) { //Writes x or o into gameField
    let int = 0;
    if (!xTurn) {
        int = 1;
    }
    if (gameField[parseInt(fieldm.content) - 1] === '⬜') {
        gameField[parseInt(fieldm.content) - 1] = players[int].symbol;
    } else {
        ogMessage.channel.send("You lose your turn because you chose a tile that is already filled in");
    }
}