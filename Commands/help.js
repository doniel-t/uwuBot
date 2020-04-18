const Logger = require("./Logger.js");
const fh = require('./FileHandler');
const annotations = require('annotations');
const requireDir = require('require-dir')

/**
 * @usage !help <optional: command>
 * @does gives you a list of commands to use
 */
module.exports = {
    help: function (message) {
        switch (message.content.substring(5)) {
            case 'music':
                musicHelp(message);
                break;
            case 'whatToDraw':
                whatToDrawHelp(message);
                break;
            case 'name':
                nameHelp(message);
                break;
            case 'admin':
                adminHelp(message);
                break;
            default:
                normalHelp(message);
                break;
        }
    }
}

function normalHelp(message) {

    try {
        var helpMessage = '';

        for (let command in requireDir('.')) {

            let res = annotations.getSync('./Commands/' + command + '.js');

            if (!res.module) {
                Logger.log('Error at' + command);
                message.channel.send("Error in help.js, check Log for Details");
            }

            if (command.charAt(0) == command.charAt(0).toLowerCase() || command == 'Admin') {

                if (res.module.usage && res.module.does) {

                    helpMessage = helpMessage.concat("Command:   ").concat(command)
                        .concat('\nUsage:           ').concat(res.module.usage)
                        .concat('\nDoes:             ').concat(res.module.does);

                    if (res.module.hasOwnHelp) {
                        helpMessage = helpMessage.concat('\nMore:            !help ' + command.toLocaleLowerCase() + ' for more info')
                    }

                    if (res.module.Shortcut) {
                        helpMessage = helpMessage.concat('\nShortcut:       !' + res.module.Shortcut)
                    }

                } else {
                    helpMessage = helpMessage.concat("Command:   ").concat(command)
                        .concat('\nUsage:           ').concat('N/A')
                        .concat('\nDoes:             ').concat('N/A');
                }

                helpMessage = helpMessage.concat("\n-----------------------------------\n");

                if (helpMessage.length > 1500) {
                    message.channel.send(helpMessage);
                    helpMessage = '';
                }
            }
        }

        if (helpMessage.length > 0) {
            message.channel.send(helpMessage);
        }

    } catch (error) {
        Logger.log(error)
    }
}

function musicHelp(message) { //prints all Shortcuts in MusicShortcut.json
    try {
        var musicShortcut = fh.get('../Files/MusicShortcut.json'); //Get File
        var music = fh.get('../Files/helpFiles/musicHelp.json');
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
        var whatToDraw = fh.get('../Files/helpFiles/whatToDrawHelp.json'); //Get File
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

function nameHelp(message) {
    try {
        var names = fh.get('../Files/helpFiles/nameHelp.json'); //Get File
        var helpMessage = '';

        for (var com in names) {
            var comm = names[com];
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
        message.channel.send("Error in nameHelp.json");
    }
}

function adminHelp(message) {
    
    try {
        let ans = annotations.getSync('./Commands/Admin.js');
        var helpMessage = '';

        for (let ann in ans) {

            if (Object.keys(ans[ann]).length == 0 || ann == 'module') {
                continue;
            }

            helpMessage = helpMessage.concat('\nCommand: ' + ann);

            for (let an in ans[ann]) {
                helpMessage = helpMessage.concat('\n' + an + ': ' + ans[ann][an]);
            }

            helpMessage = helpMessage.concat("\n-----------------------------------");

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
        message.channel.send("Error in Admin.js");
    } 
}