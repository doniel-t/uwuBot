const Logger = require("./Logger.js");
const helpFile = require('../Files/help.json');
const musicShortcut = require('../Files/MusicShortcut.json');

module.exports = {
    help: function (message) {
        switch (message.content.substring(6)) {
            case 'music':
                musichelp(message);
                break;
            default:
                normalhelp(message);
                break;
        }
    }
}

function normalhelp(message) { //prints all Commands in help.json
    try {
        var helpMessage = '';
        for (var com in helpFile) {
            var comm = helpFile[com];
            helpMessage = helpMessage.concat("Command:   ").concat(com)
                .concat('\nUsage:           ').concat(comm.usage)
                .concat('\nDoes:             ').concat(comm.does)
                .concat("\n-----------------------------------");
            if (helpMessage.length > 1500) {
                message.channel.send(helpMessage);
                helpMessage = '';
            }
        }
        message.channel.send(helpMessage);
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in help.json");
    }
}

function musichelp(message) { //prints all Shortcuts in MusicShortcut.json
    try {
        var helpMessage = '';
        for (var com in musicShortcut) {
            helpMessage = helpMessage.concat("Shortcut:   ").concat(com).concat("\n-----------------------------------\n");
        }
        message.channel.send(helpMessage);
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in MusicShortcut.json");
    }
}