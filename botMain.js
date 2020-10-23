const Discord = require('discord.js');
const requireDir = require('require-dir');
const Logger = require("./Commands/Logger.js");
const Admin = require('./Commands/Admin.js');
const fh = require('./Commands/FileHandler');
const { version } = require('./package.json');
const adminprefix = fh.get('../Files/local/adminprefix.json');

const debug = false; //true > no ready-message and BackgroundTasks
global.bot = new Discord.Client();
global.guilds = {};
global.wsip = fh.get('../Files/local/wsip.json'); //IP thats used for every WS-Call
var BotID;
var first = true;
var commands = requireDir('./Commands');

global.bot.on('error', err => { //ErrorHandling
    console.error('\nBot crashed, see LogFile for more info\n');
    Logger.log(err);
})

global.bot.on('ready', () => { //At Startup
    if (first) {
        first = false;
        init(); //inits some variables
    }
});

global.bot.on('message', (message) => { //When Message sent

    if (message.author.bot) { return; } //If Author is a Bot, return

    if (message.channel.type != 'text') { return; } //If Channel is not TextChannel, return

    let contentArgs = message.content.split(" "); //Split Message for simpler Access

    if (message.content.startsWith(global.guilds[message.guild.id]['prefix'])) {

        let command = message.content.substring(global.guilds[message.guild.id]['prefix'].length); //Get commandName

        if (command.indexOf(' ') > 0) {
            command = command.substring(0, command.indexOf(' '));
        }

        message.content = message.content.replace(global.guilds[message.guild.id]['prefix'], '!'); //Replacing Prefix for compability

        if (command.length == 0) {
            message.channel.send('No Command entered');
            return;
        }

        if (!commands.play.playKey(message)) { //Checks if command is shortcut for music and plays it

            try {//Example !osurecent calls commands.osurecent.osurecent(message)

                if (command.length == 1) {
                    commands['Shortcuts']['Shortcuts'](message, commands, command);
                } else {
                    commands[command][command](message);
                }

            } catch (error) {
                Logger.log(error);
                message.channel.send('Command not Found, use !help for help');
            }
        }
    }

    if (contentArgs[0].startsWith(adminprefix)) { //AdminCommands

        message.content = message.content.replace(adminprefix, 'uwuadmin'); //Replacing Prefix for compability

        try {

            if (!contentArgs[1]) {
                message.channel.send('No Command entered');
                return;
            }

            if (Admin.isAdmin(message)) {
                Admin[contentArgs[1]](message);
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

    if (global.guilds[message.guild.id]['settings']['emojiDetection']) { //Emoji detection in plain Text
        commands.emoji.emojiDetection(message);
    }
});

global.bot.login(fh.get('../Files/local/botToken.json').token).catch(err => {
    Logger.log('botToken.json is invalid: ' + err);
    return;
}); //Starts Bot

global.bot.on('guildCreate', guild => { //Joining a new Guild while bot is active
    serverJoin(guild);
})



function init() {

    fh.initSettings(); //Init Settings for all Guilds
    BotID = '<@!' + global.bot.user.id + '>'; //Get BotID

    global.bot.user.setPresence({ game: { name: 'on ' + version }, status: 'online' }); //Set Bot as online

    let names = fh.get('../Files/local/names.json');

    for (let guild of global.bot.guilds) {

        //Init Channels for all Guilds
        let Channels = fh.get('../Files/local/' + guild[0] + '/Channels.json');

        for (let channelname in Channels) {
            global.guilds[guild[0]][channelname] = Channels[channelname];
        }

        //Init StandardChannels for all Guilds
        let StandardChannel = commands.Channel.get('Standard', guild[1].id);

        if (!StandardChannel) { //AutoPick a StandardChannel if none is set

            for (let ch of guild[1].channels) {

                if (ch[1].type == 'text') {
                    commands.Channel.set('Standard', ch[1].id, guild[1].id);
                    StandardChannel = global.bot.channels.get(ch[1].id);
                    break;
                }
            }
            StandardChannel.send('I have automatically picked this Channel as StandardChannel.\nYou can change it with setStandardChannel');
        }

        //Init Prefix for all Guilds
        global.guilds[guild[0]]['prefix'] = fh.get('../Files/local/' + guild[0] + '/prefix.json');

        if (global.guilds[guild[0]]['prefix'] == '') {
            global.guilds[guild[0]]['prefix'] = '!';
        }

        //Init names.json
        for (let member of guild[1].members) {

            if (!names[member[1].user.id]) { //Create User
                names[member[1].user.id] = {};
            }

            if (!names[member[1].user.id]['guilds']) { //Create guilds Array
                names[member[1].user.id]['guilds'] = [guild[0]];

            } else {

                if (!names[member[1].user.id]['guilds'].includes(guild[0])) { //Add guildID to guilds Array
                    names[member[1].user.id]['guilds'].push(guild[0]);
                }
            }
        }

        //Init Admins
        let Admins = fh.get('../Files/local/' + guild[0] + '/Admins.json');
        global.guilds[guild[0]]['Admins'] = Admins;

        //Ready Message
        if (!debug) {
            console.error("YES");
            StandardChannel.send('I am now ready to use: Prefix \'' + global.guilds[guild[0]]['prefix'] + '\'');
        }
    }

    fh.write('names.json', names); //Write names back to names.json

    //Any Background tasks
    if (!debug) {
        commands.league.checkForLOLGames();
        commands.twitch.checkForStreams();
        commands.Auto.goodbadBot();
    }
}

function serverJoin(guild) {

    let names = fh.get('../Files/local/names.json');
    const initset = require('./Files/initsettings.json');

    global.guilds[guild.id] = {}; //Init global.guilds

    //Init settings
    fh.write('settings.json', initset, guild.id);
    global.guilds[guild.id]['settings'] = initset; //Init global.guilds.settings         

    //Set StandardChannel
    for (let ch of guild.channels) {

        if (ch[1].type == 'text') {
            commands.Channel.set('Standard', ch[1].id, guild.id);
            StandardChannel = global.bot.channels.get(ch[1].id);
            break;
        }
    }

    //Set Prefix
    fh.write('prefix.json', "!", guild.id);
    global.guilds[guild.id]['prefix'] = '!';

    //Add Members to names.json
    for (let member of guild.members) {

        if (!names[member[1].user.id]) { //Create User
            names[member[1].user.id] = {};
        }

        if (!names[member[1].user.id]['guilds']) { //Create guilds Array
            names[member[1].user.id]['guilds'] = [guild.id];

        } else {

            if (!names[member[1].user.id]['guilds'].includes(guild.id)) { //Add guildID to guilds Array
                names[member[1].user.id]['guilds'].push(guild.id);
            }
        }
    }
    fh.write('names.json', names); //Write names back to names.json

    //Init Admins
    fh.write('Admins.json', [guild.owner.id], guild.id);
    global.guilds[guild.id]['Admins'] = [guild.owner.id];

    //Ready
    commands.Channel.get('Standard', guild.id).send('Hello, this is the Standard-Channel of the Server, you can talk to me via !, use !help for help\n I have added '
        + guild.owner.user.username + ' as Admin on this Server');
}

module.exports = {
    reload: function () {
        try {
            let Path = '';
            for (let cmd in require.cache) { //Find absolutePath for uwuBot
                if (require.cache[cmd].id == '.') {
                    Path = require.cache[cmd].path;
                    break;
                }

            }

            if (Path.includes('/')) { //Win or Linux
                Path += '/Commands/';
            } else {
                Path += '\\Commands\\';
            }

            for (let cmd in commands) { //Remove modules from cache
                delete require.cache[Path + cmd + '.js'];
            }

            commands = {};

            commands = requireDir('./Commands'); //Reload commands var
            return "Reload Complete";
        } catch (err) {
            Logger.log(err);
            return 'Reload failed, check Log';
        }
    }
}