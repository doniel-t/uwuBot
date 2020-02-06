const token = require('./Dependencies/botToken.json'); //Has DiscordToken under token.token
const Discord = require('discord.js');
const bot = new Discord.Client();

const osuplays = require('./Commands/osuplays.js');
const osurecent = require('./Commands/osurecent.js');
const uwufy = require('./Commands/uwufy.js');
const padoru = require('./Commands/padoru.js');

bot.on('message', (message) => { //Grab Message

    let contentArgs = message.content.split(" "); //Split Message for simpler Access
    
    if (contentArgs[0] === "!padoru") {
        padoru.padoru(message);
    }
    if (contentArgs[0] === "!uwufy") {
        uwufy.uwufy(message, contentArgs);
    }
    if (contentArgs[0] === ('!osurecent')) { //Sends last played Map passed or unpassed
        osurecent.osurecent(message);
    }
    if (contentArgs[0] === '!osuplays') {   //Gets Top 5 Plays
        osuplays.osuplays(message);
    }

});

bot.login(token.token); //Starts Bot