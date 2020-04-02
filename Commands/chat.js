const cleverbot = require("cleverbot-free");
const fh = require('./FileHandler');
const { chatCalled } = require('./Auto');
var called = false;

module.exports = {
    chat: function (message) {

        var counter = fh.get('../Files/local/counter.json');

        chatCalled();

        let contentArgs = message.content.split(" "); //Split Message for simpler Access
        let msg = message.content.substring(contentArgs[0].length + 1);

        if (!contentArgs[1]) {
            message.channel.send('I can`t hear you.');
            return;
        }

        switch (msg.toLowerCase()) {
            case 'good bot':
                counter.good++;
                message.channel.send('Thanks 🙃');
                break;
            case 'bad bot':
                counter.bad++;
                message.channel.send('😞');
                break;
            default: //Normal Message
                cleverbot(msg).then(ans => {
                    message.channel.send(ans);
                });
                return;
        }

        fh.write('counter.json', counter); //Use return in switch to not get here
    }
}