const Discord = require('discord.js');
const requireDir = require('require-dir');
const bot = new Discord.Client();
const Logger = require("./Commands/Logger.js");
const Admin = require('./Commands/Admin.js');
const commands = requireDir('./Commands');
const fh = require('./Commands/FileHandler');

const { version } = require('./package.json');
var Settings = fh.getSettings();
var BotID;

bot.on('ready', () => { //At Startup
    bot.user.setPresence({ game: { name: 'on ' + version }, status: 'online' });

    let StandardChannel = bot.channels.get(fh.get('../Files/local/StandardChannel.json'));

    if (!StandardChannel) {

        for (let ch of bot.channels) {

            if (ch[1].type == 'text') {

                fh.write('../Files/local/StandardChannel.json', ch[1].id);
                StandardChannel = bot.channels.get(ch[1].id);
                break;
            }
        }
        StandardChannel.send('I have automatically picked this Channel as StandardChannel.\nYou can change it with setStandardChannel');
    }
    StandardChannel.send('I am now ready to use: Version ' + version);

    commands.league.checkForLOLGames(bot);
    commands.twitch.checkForStreams(bot);
    commands.Auto.goodbadBot(bot, true);
    BotID = '<@!' + bot.user.id + '>';
});

bot.on('message', (message) => { //When Message sent

    if (message.author.bot) { return; } //If Author is a Bot, return

    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    if (contentArgs[0].charAt(0) == '!') {

        let command = contentArgs[0].substring(1); //Get commandName

        if (command.length == 0) {
            message.channel.send('No Command entered');
            return;
        }

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

    if (contentArgs[0].startsWith('uwuadmin')) { //AdminCommands
        try {

            if (contentArgs[1] == undefined) {
                message.channel.send('No Command entered');
                return;
            }

            if (Admin.isAdmin(message)) {
                executeFunctionByName(contentArgs[1], Admin, message, bot);
            } else {
                message.channel.send('You are not an Admin');
            }

        } catch (error) {
            Logger.log(error);
            message.channel.send('Not a admin command');
        }
    }

    if (contentArgs[0].startsWith(BotID)) { //ChatBot
        commands.chat.chat(message);
    }

    if (Settings['emojiDetection']) { //Emoji detection in plain Text
        executeFunctionByName("emoji.emojiDetection", commands, message, bot);
    }
});

bot.login(fh.get('../Files/local/botToken.json').token).catch(err => {
    Logger.log('botToken.json is invalid: ' + err);
    return;
}); //Starts Bot

function executeFunctionByName(functionName, context /*, args */) {    //Executes functionName at context with args
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}