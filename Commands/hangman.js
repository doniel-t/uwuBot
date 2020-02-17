const Logger = require("./Logger.js");

var inputWord = "";
var ogMessage;
var hiddenMessage = "";
var hp = 7;
var dcBot;

module.exports = { //!hangman starts the game
    hangman: function (message, bot) {

        dcBot = bot;
        ogMessage = message;

        message.author.createDM().then(dmChannel => { //asks for word in private channel

            dmChannel.send("Send me a sentence or word!");
            const filter = m => m.author != ' '; //allows any word/sentence

            dmChannel.awaitMessages(filter, { max: 2, errors: ['time'] }).then(answer => { //ignores bots message and grabs user input

                var key = Array.from(answer.keys())[1]; //Gets UserMessage
                inputWord = answer.get(key).content.toLowerCase();

                hiddenMessage = inputWord.replace(/[^ ]/g, '-'); //replaces everything except spaces with -
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


var listener = function (inputLetter) { //Listens to all Messages

    if (inputLetter.channel == ogMessage.channel) {// Only Messages in Channel where !hangman was called

        if (inputLetter.content.length === 1) {// Only Message with one Character

            checkLetter(inputLetter.content);  //Test Character
            ogMessage.channel.send(hiddenMessage + " tries left" + hp);

            if (hp === 0) { //Losing Condition
                ogMessage.channel.send("You lose xD");
                dcBot.removeListener('message', listener);
            }

            if (hiddenMessage === inputWord) {  //When guessed Letter by Letter
                ogMessage.channel.send("You won!");
                dcBot.removeListener('message', listener);
            }
        }

        if (inputLetter.content === inputWord) {    //When whole Answer is given
            ogMessage.channel.send("You won!");
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


function replaceAt(string, index, replace) { //Replaces a Character in string at index with replace
    return string.substring(0, index) + replace + string.substring(index + 1);
}