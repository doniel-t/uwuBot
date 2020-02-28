const requireDir = require('require-dir');
const commands = requireDir('.');

module.exports = { //Redirects Shortcuts to Commands
    a: function(message, bot) {
        call('ask', message, bot);
    },
    d: function(message, bot) {
        call('dorime', message, bot);
    },
    e: function(message, bot) {
        call('emoji', message, bot);
    },
    j: function(message, bot) {
        call('jap', message, bot);
    },
    p: function(message, bot) {
        call('play', message, bot);
    },
    s: function(message, bot) {
        call('stop', message, bot);
    },
    w: function(message, bot) {
        call('weebyfy', message, bot);
    }

}

function call(name, message, bot) {
    command = name.concat('.').concat(name);
    try {
        executeFunctionByName(command, commands, message, bot); //Calls function
    } catch (error) {
        Logger.log(error);
        message.channel.send('Command not Found, use !help for help');
    }
}

function executeFunctionByName(functionName, context /*, args */ ) { //Executes functionName at context with args
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}