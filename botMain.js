const token = require('./Dependencies/botToken.json'); //Has DiscordToken under token.token
const Discord = require('discord.js');
const requireDir = require('require-dir');
const bot = new Discord.Client();
const Logger = require("./Commands/Logger.js");
const Admin = require('./Commands/Admin.js');
const BotID = require('./Dependencies/BotID.json');
const version = require('./Files/version.json');
const fs = require('fs');
const Settings = initsettings();
const commands = requireDir('./Commands');

bot.on('ready', () => { //At Startup
    bot.user.setPresence({ game: { name: 'on ' + version.version }, status: 'online' });
});

bot.on('message', (message) => { //When Message sent

    if (message.author.bot) { return; } //If Author is a Bot, return

    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    if (contentArgs[0].charAt(0) == '!') {

        let command = contentArgs[0].substring(1); //Get commandName

        if (!commands.play.playKey(message, bot)) { //Checks if command is shortcut for music and plays it

            if (command.length == 1) {  //Go to Shortcut for command
                command = 'Shortcuts.'.concat(command);
            } else {    //Normal Command
                command = command.concat('.').concat(command);
            }

            try {//Example !osurecent calls commands.osurecent.osurecent(message,bot)

                executeFunctionByName(command, commands, message, bot); //Calls function

            } catch (error) {
                Logger.log(error);
                message.channel.send('Command not Found, use !help for help');
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

    if (Settings.emojiDetection) { //Emoji detection in plain Text
        executeFunctionByName("emoji.emojiDetection", commands, message, bot);
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

function initsettings() {
    try {

        var set = require('./Files/local/settings.json'); //Test if settings.json is valid

    } catch (ignored) { //No settings.json

        try {
            try {   //Try to create the local Folder
                fs.mkdirSync('Files/local');
            } catch (ignored) { }

            fs.writeFileSync('Files/local/settings.json', JSON.stringify(require('./Files/initsettings.json'))); //Create settings.json
            return require('./Files/local/settings.json');

        } catch (error) {
            Logger.log(error);
            return undefined;
        }
    }

    var initset = require('./Files/initsettings.json');

    for (var setting in initset) { //Test for new Settings in initsettings.json
        if (set[setting] == undefined) {
            set[setting] = initset[setting];
        }
    }

    try { //Write new Settings into settings.json
        fs.writeFileSync('Files/local/settings.json', JSON.stringify(set));
    } catch (error) {
        Logger.log(error);
    }

    return set;
}
