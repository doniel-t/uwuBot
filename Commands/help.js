const Logger = require("./Logger.js");
const helpFile = require('../Files/helpFiles/help.json');
const musicShortcut = require('../Files/MusicShortcut.json');
const whatToDraw = require('../Files/helpFiles/whatToDrawHelp.json');

module.exports = {
    help: function (message) {
        switch (message.content.substring(6)) {
            case 'music':
                musicHelp(message);
                break;
            case 'whatToDraw':
                whatToDrawHelp(message);
                break;
            default:
                normalHelp(message);
                break;
        }
    }
}

function normalHelp(message) { //prints all Commands in help.json
    try {
        var helpMessage = '';
        for (var com in helpFile) {
            var comm = helpFile[com];
            helpMessage = helpMessage.concat("Command:   ").concat(com)
                .concat('\nUsage:           ').concat(comm.usage)
                .concat('\nDoes:             ').concat(comm.does)
                .concat("\n-----------------------------------\n");
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

function musicHelp(message) { //prints all Shortcuts in MusicShortcut.json
    try {
        var helpMessage = '';
        for (var com in musicShortcut) {
            helpMessage = helpMessage.concat("Shortcut:   ").concat(com).concat("\n-----------------------------------\n");
            if (helpMessage.length > 1500) {
                message.channel.send(helpMessage);
                helpMessage = '';
            }
        }
        message.channel.send(helpMessage);
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in MusicShortcut.json");
    }
}

function whatToDrawHelp(message) {
    try {
        var helpMessage = '';
        for (var com in whatToDraw) {
            var comm = whatToDraw[com];
            helpMessage = helpMessage.concat("Command:   ").concat(com)
            .concat('\nUsage:           ').concat(comm.usage)
            .concat('\nDoes:             ').concat(comm.does)
            .concat("\n-----------------------------------\n");
            if (helpMessage.length > 1500) {
                message.channel.send(helpMessage);
                helpMessage = '';
            }
        }
        message.channel.send(helpMessage);
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in whatToDrawHelp.json");
    }
}