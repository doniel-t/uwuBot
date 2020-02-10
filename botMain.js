const token = require('./Dependencies/botToken.json'); //Has DiscordToken under token.token
const Discord = require('discord.js');
const requireDir = require('require-dir');
const bot = new Discord.Client();
const Logger = require('./Logger.js');

const commands = requireDir('./Commands');

bot.on('message', (message) => { //Grab Message

    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    Logger.log(message);
    if (contentArgs[0].charAt(0) == '!') { //Call Method

        let command = contentArgs[0].substring(1);
        command = command.concat('.').concat(command);
        try {
            executeFunctionByName(command, commands, message); //Calls function
        } catch (error) {
            Logger.log(error);
            message.channel.send('Command not Found, use !help for help');
        }

        //So you have to call the .js and your function like the command you want to execute at.
        //Example !osurecent calls commands.osurecent.osurecent(message)
    }

    if (contentArgs[0].startsWith('@UwU_Bot')) {
        try {
            if (Logger.isAdmin(message)) {
                executeFunctionByName(contentArgs[1], Logger, message);
            } else {
                message.channel.send('You are not an Admin');
            }

        } catch (error) {
            Logger.log(error);
            message.channel.send('Not a admin command');
        }

    }

});

bot.login(token.token); //Starts Bot

function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}