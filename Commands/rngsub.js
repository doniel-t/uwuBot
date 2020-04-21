const WebSocket = require('ws');

/**
 * @usage !rngsub <optional:subreddit>
 * @does gives you a random Post (of the subreddit)
 */
module.exports = {

    rngsub: function (message) {
        
        let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        ws.on('error', function error(){
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request

            ws.send('RedditAPI ' + (contentArgs[1] || 'Random'));
        });

        ws.on('message', function incoming(data) { //Answer

            if (data == 'ERROR') {
                message.channel.send('An Error occured');
                return;
            }
            let submission = JSON.parse(data);
            message.channel.send(!submission.permalink ? 'Reddit returned undefined (Subreddit disabled random)' : "http://reddit.com" + submission.permalink);
        });
    }
}