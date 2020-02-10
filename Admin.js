var version = require('./Files/version.json');

module.exports = {
    log: function(error) {
        console.log(error);
        console.log('\n-------------------------------------------- \n\n');
    },

    get: function(message) {
        message.channel.send("Clear Log manual", { files: ["./Bot.log"] });
    },

    isAdmin: function(message) {
        if (Admins.contains(message.author.id)) {   
            return true;
        } else {
            console.log(message.author.username + " executed an Admin command");
            return false;
        }
    },

    searchUpdate: function() {

        var url = 'https://raw.githubusercontent.com/ackhack/uwuBot/master/Files/version.json';
        var jsonFile = new XMLHttpRequest();
        jsonFile.open("GET",url,true);
        jsonFile.send();

        jsonFile.onreadystatechange = function() {
            if (jsonFile.readyState== 4 && jsonFile.status == 200) {
                console.log(jsonFile);
                console.log(jsonFile.responseText);
            }
         }

        console.log();

        if (version.version == gitversion) {
            message.channel.send('Bot is up to Date');
        } else {
            //RUN UPDATE HERE
        }
    }
}

var Admins = [              //Add DiscordID for AdminAccess
    '270929192399536138',   //ackhack
    '222398053703876628'    //Human Daniel
]