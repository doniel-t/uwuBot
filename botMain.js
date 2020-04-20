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

            try {//Example !osurecent calls commands.osurecent.osurecent(message,bot)

                if (command.length == 1) {
                    commands['Shortcuts'][command](message, bot);
                } else {
                    commands[command][command](message, bot);
                }

            } catch (error) {
                Logger.log(error);
                message.channel.send('Command not Found, use !help for help');
            }
        }
    }

    if (contentArgs[0].startsWith('uwuadmin')) { //AdminCommands
        try {

            if (!contentArgs[1]) {
                message.channel.send('No Command entered');
                return;
            }

            if (Admin.isAdmin(message)) {
                Admin[contentArgs[1]](message, bot);
            } else {
                Logger.log(message.author.username + " executed an Admin command");
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
        commands.emoji.emojiDetection(message, bot);
    }
});

bot.login(fh.get('../Files/local/botToken.json').token).catch(err => {
    Logger.log('botToken.json is invalid: ' + err);
    return;
}); //Starts Bot