const Logger = require('./Logger');

/**
 * @usage N/A
 * @does handels all Shortcuts
 */
module.exports = { //Redirects Shortcuts to Commands
    Shortcuts: function (message, commands, shortcut) {

        let command = '';

        switch (shortcut) {
            case 'a':
                command = 'ask';
                break;
            case 'd':
                message.content = 'dorime';
                command = 'play';
                break;
            case 'e':
                command = 'emoji';
                break;
            case 'j':
                command = 'jap';
                break;
            case 'p':
                command = 'play';
                break;
            case 's':
                command = 'stop';
                break;
            case 'w':
                command = 'weebiefy';
                break;
            default:
                message.channel.send('Command not Found, use !help for help');
                return;
        }
        
        try {
            commands[command][command](message);
        } catch (error) {
            Logger.log(error);
            message.channel.send('Command not Found, use !help for help');
        }
    }
}