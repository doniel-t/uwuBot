const Music = require('./Music.js');
const fh = require('./FileHandler')
const Shortcuts = fh.get('../Files/MusicShortcut.json');

/**
 * @usage !play <Link>
 * @does plays the given Link (YT-Video,YT-Playlist)
 * @Shortcut p
 */
module.exports = {
    play: function (message) {

        let song = message.content.substring(message.content.indexOf(' ') + 1);

        if (Shortcuts[song] != undefined) {
            message.content = "!p " + Shortcuts[song];
        }
        
        console.log(message.content);

        Music.play(message); //All Logic is in Music
    },

    playKey: function (message) { //Handling for !<shortcut>

        message.content = message.content.substring(1); //Remove !

        let notShortcut = false;

        Shortcuts[message.content] ? message.content = "!p " + Shortcuts[message.content] : notShortcut = true;

        if (!notShortcut) { //Handling for botMain
            Music.play(message); //All Logic is in Music
            return true;            
        } else {
            return false;
        }
    }
}