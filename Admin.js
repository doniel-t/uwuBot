const { spawn } = require('child_process');
const fs = require('fs');


module.exports = {
    log: function(error) {
        console.log(error);
        console.log('\n-------------------------------------------- \n\n');
    },

    getLogFile: function(message) {

        var logFile;
        let array = fs.readdirSync('.');
        for (var i = 0; i < array.length; i++) {
            if (array[i].endsWith('.log')) {
                logFile = array[i];
            }
        }
        if (logFile == null) {
            console.log("NO LOG FILE");
            message.channel.send("There is no LogFile");
        } else {
            message.channel.send("LogFile", { files: [logFile] });
        }


    },

    isAdmin: function(message) {
        if (Admins.includes(message.author.id)) {
            return true;
        } else {
            console.log(message.author.username + " executed an Admin command");
            return false;
        }
    },

    update: function(_message) {

        let pro = spawn('start', ['cmd.exe', '/c', 'Updater.bat'], { shell: true });

        pro.on('exit', m => {
            process.exit(0);
        })

    },

    stop: function(message) {
        if (stopvar) {
            process.exit(0);
        } else {
            message.channel.send("If you really want to stop the Bot call this function again within 10 sec");
            stopvar = true;
            setTimeout(function() { stopvar = false; }, 10000);
        }
    },

    restart: function(_message) {

        let pro2 = spawn('start', ['cmd.exe', '/c', 'run.bat'], { shell: true });

        pro2.on('exit', m => {
            process.exit(0);
        })

    },

    toggleneko: function(message) {

        spamneko = !spamneko;

        if (spamneko) {
            message.channel.send("Can spam now");
        } else {
            message.channel.send("Cant spam now");
        }
    },

    canspamneko: function() {
        return spamneko;
    }

}

var Admins = [ //Add DiscordID for AdminAccess
    '270929192399536138', //ackhack
    '222398053703876628' //Human Daniel
]

var spamneko = true;
var stopvar = false;