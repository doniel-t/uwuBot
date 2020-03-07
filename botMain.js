const token = require('./Dependencies/botToken.json'); //Has DiscordToken under token.token
const Discord = require('discord.js');
const requireDir = require('require-dir');
const bot = new Discord.Client();
const Logger = require("./Commands/Logger.js");
const Admin = require('./Commands/Admin.js');
const BotID = require('./Dependencies/BotID.json');
const version = require('./Files/version.json');
const Settings = require('./Files/settings.json');

const commands = requireDir('./Commands');

bot.on('ready', () => { //At Startup
    bot.user.setPresence({ game: { name: 'on ' + version.version }, status: 'online' });
});

bot.on('message', (message) => { //When Message sent

    if (message.author.bot) { return; } //If Author is Bot himself return

    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    if (contentArgs[0].charAt(0) == '!') { //Call Method

        let command = contentArgs[0].substring(1); //Get commandName

        if (command.length == 1) {  //Go to Shortcut
            command = 'Shortcuts.'.concat(command);
        } else {    //Normal Command
            command = command.concat('.').concat(command);
        }

        try {//Example !osurecent calls commands.osurecent.osurecent(message,bot)

            executeFunctionByName(command, commands, message, bot); //Calls function

        } catch (error) {//Checks if command is shortcut for music

            message.content = message.content.substring(1);
            if (!commands.play.playKey(message, bot)) {
                Logger.log(error);
                message.channel.send('Command not Found, use !help for help');
            }
        }
    }

    if (Settings.emojiDetection) { //Emoji detection in plain Text
        for (var word of contentArgs) { 
            let emoji = bot.emojis.find(e => e.name == word);
            if (emoji) {
                let sendMessage = message;
                sendMessage.content = '!e ' + emoji.name;
                executeFunctionByName("emoji.emoji", commands, sendMessage, bot);
            }
        }
    }

    if (contentArgs[0].startsWith(BotID.id)) { //AdminCommands
        try {
            if (Admin.isAdmin(message)) {
                executeFunctionByName(contentArgs[1], Admin, message);
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

function executeFunctionByName(functionName, context /*, args */) {    //Executes functionName at context with args
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}
