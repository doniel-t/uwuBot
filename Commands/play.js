const Music = require('./Music.js');
const Shortcuts = require('../Files/MusicShortcut.json');

module.exports = {
    play: function (message, bot) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (Shortcuts[contentArgs[1]] != undefined) {
            if (contentArgs[2] != undefined) { //Handling with number
                message.content = contentArgs[1] + ' ' + contentArgs[2];
            } else {
                message.content = contentArgs[1];
            }
            this.playKey(message,bot);
            return;
        }
        
        Music.play(message, bot); //All Logic is in Music
    },

    playKey: function (message, bot) {

        var notShortcut = false;
        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (Shortcuts[contentArgs[0]] != undefined) {
            message.content = Shortcuts[contentArgs[0]];
        } else {
            notShortcut = true;
        }

        if (!notShortcut) { //Handling for botMain

            if (!isNaN(contentArgs[1])) {

                if (contentArgs[1] > 100) {
                    contentArgs[1] = 100;
                }

                for (let x = 0; x<contentArgs[1];x++) { //Plays Shortcut given amount of times
                    Music.play(message, bot); //All Logic is in Music
                }
            } else {
                Music.play(message, bot); //All Logic is in Music
            }
            
            return true;            
        } else {
            return false;
        }
    }
}
