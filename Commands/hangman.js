const Logger = require("../Admin.js");

var inputWord = "";
var ogMessage;
var hiddenMessage = "";
var hp = 7;
var dcBot;

module.exports = { //!hangman starts the game
    hangman: function(message, bot) {
        dcBot = bot;
        ogMessage = message;
        message.author.createDM().then(dmChannel => { //asks for word in private channel
            dmChannel.send("Send me a sentence or word!");
            const filter = m => m.author != ' '; //allows any word/sentence
            dmChannel.awaitMessages(filter, { max: 2, errors: ['time'] }).then(answer => { // ignores bots message and grabs user input
                var key = Array.from(answer.keys())[1];
                inputWord = answer.get(key).content.toLowerCase();
                hiddenMessage = inputWord.replace(/[^ ]/g, '-'); // replaces everything except spaces with _
                message.channel.send(hiddenMessage);
            }).catch(error => {
                Logger.log(error);
            });
        }).catch(error => {
            Logger.log(error);
        });
        bot.on('message', listener);
    }
}



var listener = function(inputLetter) { //Controls game state
    if (inputLetter.channel == ogMessage.channel) {
        if (inputLetter.content.length === 1) {
            checkLetter(inputLetter.content);
            ogMessage.channel.send(hiddenMessage + " 11tries left" + hp);
            if (hp === 0) {
                ogMessage.channel.send("You lose xD " + inputWord);
                hp = 7;
                dcBot.removeListener('message', listener);
            }
            if (hiddenMessage === inputWord) {
                ogMessage.channel.send("You won! " + inputWord);
                hp = 7;
                dcBot.removeListener('message', listener);
            }
        }
        if (inputLetter.content === inputWord) {
            ogMessage.channel.send("You won! " + inputWord);
            hp = 7;
            dcBot.removeListener('message', listener);
        }
    }
}


function checkLetter(letter) { // checks if letter is in word
    if (inputWord.includes(letter)) {
        let index = 0;
        for (let char of inputWord) {
            if (char == letter) {
                hiddenMessage = replaceAt(hiddenMessage, index, letter);
            }
            index++;
        }
    } else {
        hp--;
    }
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}