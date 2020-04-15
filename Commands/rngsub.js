const WebSocket = require('ws');

module.exports = {

    rngsub: function (message) {
        
        let ws = new WebSocket('ws://leftdoge.de:60001', { handshakeTimeout: 5000 }); //Connection to Server

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        ws.on('error', function error(){
            message.channel.send('Websocket-Server is unreachable');
        })

        ws.on('open', function open() { //Request

            if (contentArgs[1] === "" || contentArgs[1] == null) {  //Get Random Subreddit if none is given
                ws.send('RedditAPI Random');
            } else {
                ws.send('RedditAPI ' + contentArgs[1]);
            }
        });

        ws.on('message', function incoming(data) { //Answer

            if (data == 'ERROR') {
                message.channel.send('An Error occured');
                return;
            }
            let submission = JSON.parse(data);
            if (submission.permalink == undefined) {    //Can return Listing of Hot for some subreddit, dont know why
                message.channel.send('Reddit returned undefined (can happen for some subreddits)');
            } else {
                message.channel.send("http://reddit.com" + submission.permalink);
            }
        });
    }
}