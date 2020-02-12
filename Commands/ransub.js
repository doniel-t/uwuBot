const Logger = require('../Admin.js');
const snoowrap = require('snoowrap');
const apiKey = require('../Dependencies/RedditAPI.json');
const redditAPI = new snoowrap({
    userAgent: 'my user-agent',
    clientId: apiKey.clientId,
    clientSecret: apiKey.clientSecret,
    username: apiKey.username,
    password: apiKey.password
});

module.exports = {

    ransub: function(message) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (contentArgs[1] === "" || contentArgs[1] == null) {
            redditAPI.getSubreddit('Random').getRandomSubmission().then(submission => {
                if (submission.permalink == undefined) {
                    message.channel.send('Reddit returned undefined (can happen for some subreddit`s, idk why)');
                } else {
                    message.channel.send("http://reddit.com" + submission.permalink);
                }
            });
        }

        redditAPI.getSubreddit(contentArgs[1]).getRandomSubmission().then(submission => {
            if (submission.permalink == undefined) {
                message.channel.send('Reddit returned undefined (can happen for some subreddit`s, idk why)');
            } else {
                message.channel.send("http://reddit.com" + submission.permalink);
            }

        }).catch(error => {
            Logger.log(error);
            message.channel.send("An Error occured");
        })
    }
}