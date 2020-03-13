const Logger = require("./Logger.js");

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
        var helpFile = require('../Files/helpFiles/help.json'); //Get File
        var helpMessage = '';

        for (var com in helpFile) {

            var comm = helpFile[com];
            helpMessage = helpMessage.concat("Command:   ").concat(com)
                .concat('\nUsage:           ').concat(comm.usage)
                .concat('\nDoes:             ').concat(comm.does);
            
            if (comm.hasOwnHelp) {
                helpMessage = helpMessage.concat('\nMore:            !help ' + com.toLocaleLowerCase() + ' for more info')
            }
            helpMessage = helpMessage.concat("\n-----------------------------------\n");

            if (helpMessage.length > 1500) {
                message.channel.send(helpMessage);
                helpMessage = '';
            }
        }
        if (helpMessage.length > 0) {
            message.channel.send(helpMessage);
        }
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in help.json");
    }
}

function musicHelp(message) { //prints all Shortcuts in MusicShortcut.json
    try {
        var musicShortcut = require('../Files/MusicShortcut.json'); //Get File
        var music = require('../Files/helpFiles/musicHelp.json');
        var helpMessage = '';

        for (var com in music) {

            var comm = music[com];
            helpMessage = helpMessage.concat("Command:   ").concat(com)
                .concat('\nUsage:           ').concat(comm.usage)
                .concat('\nDoes:             ').concat(comm.does)
                .concat("\n-----------------------------------\n");

            if (helpMessage.length > 1500) {
                message.channel.send(helpMessage);
                helpMessage = '';
            }
        }

        for (var com in musicShortcut) {
            helpMessage = helpMessage.concat("Shortcut:   ").concat(com).concat("\n-----------------------------------\n");
            if (helpMessage.length > 1500) {
                message.channel.send(helpMessage);
                helpMessage = '';
            }
        }

        if (helpMessage.length > 0) {
            message.channel.send(helpMessage);
        }
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in MusicShortcut.json orr musicHelp.json");
    }
}

function whatToDrawHelp(message) {
    try {
        var whatToDraw = require('../Files/helpFiles/whatToDrawHelp.json'); //Get File
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

        if (helpMessage.length > 0) {
            message.channel.send(helpMessage);
        }
    } catch (error) {
        Logger.log(error);
        message.channel.send("Error in whatToDrawHelp.json");
    }
}