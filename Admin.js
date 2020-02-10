var version = require('./Files/version.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    log: function (error) {
        console.log(error);
        console.log('\n-------------------------------------------- \n\n');
    },

    get: function (message) {
        message.channel.send("Clear Log manual", { files: ["./Bot.log"] });
    },

    isAdmin: function (message) {
        if (Admins.includes(message.author.id)) {
            return true;
        } else {
            console.log(message.author.username + " executed an Admin command");
            return false;
        }
    },

    searchUpdate: function (message) {

        var url = 'https://raw.githubusercontent.com/ackhack/uwuBot/master/Files/version.json';
        var jsonFile = new XMLHttpRequest();
        jsonFile.open("GET", url, true);
        jsonFile.send();

        var gitversion = '';

        jsonFile.onreadystatechange = function () {
            if (jsonFile.readyState == 4 && jsonFile.status == 200) {

                gitversion = JSON.parse(jsonFile.responseText);

                if (version.version == gitversion.version) {
                    message.channel.send('Bot is up to Date');
                } else {
                    Updateable = true;
                    message.channel.send('Run applyUpdate to Update');
                }
            }
        }
    },

    applyUpdate: function (message) {
        if (!Updateable) {
            message.channel.send('Please search for Update first');

        } else {
            //ADD UPDATER HERE
            Updateable = false;
        }

    }
}

var Admins = [              //Add DiscordID for AdminAccess
    '270929192399536138',   //ackhack
    '222398053703876628'    //Human Daniel
]

var Updateable = false;