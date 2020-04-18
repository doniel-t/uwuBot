const requireDir = require('require-dir');
const commands = requireDir('.');
const Logger = require('./Logger');

/**
 * @usage N/A
 * @does handels all Shortcuts
 */
module.exports = { //Redirects Shortcuts to Commands
    a: function (message, bot) {
        call('ask', message, bot);
    },
    d: function (message, bot) {
        message.content = 'dorime';
        call('play', message, bot);
    },
    e: function (message, bot) {
        call('emoji', message, bot);
    },
    j: function (message, bot) {
        call('jap', message, bot);
    },
    p: function (message, bot) {
        call('play', message, bot);
    },
    s: function (message, bot) {
        call('stop', message, bot);
    },
    w: function (message, bot) {
        call('weebiefy', message, bot);
    }

}

function call(name, message, bot) {
    try {
        commands[name][name](message, bot);
    } catch (error) {
        Logger.log(error);
        message.channel.send('Command not Found, use !help for help');
    }
}