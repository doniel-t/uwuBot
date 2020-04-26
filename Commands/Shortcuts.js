const requireDir = require('require-dir');
const commands = requireDir('.');
const Logger = require('./Logger');

/**
 * @usage N/A
 * @does handels all Shortcuts
 */
module.exports = { //Redirects Shortcuts to Commands
    a: function (message) {
        call('ask', message);
    },
    d: function (message) {
        message.content = 'dorime';
        call('play', message);
    },
    e: function (message) {
        call('emoji', message);
    },
    j: function (message) {
        call('jap', message);
    },
    p: function (message) {
        call('play', message);
    },
    s: function (message) {
        call('stop', message);
    },
    w: function (message) {
        call('weebiefy', message);
    }

}

function call(name, message) {
    try {
        commands[name][name](message);
    } catch (error) {
        Logger.log(error);
        message.channel.send('Command not Found, use !help for help');
    }
}