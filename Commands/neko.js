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
    neko: function (message) {

        if (Math.random() <= 0.5) {

            redditAPI.getSubreddit("neko").getRandomSubmission().then(submission => {
                message.channel.send("http://reddit.com" + submission.permalink);

            }).catch(error => {
                Logger.log(error);
                message.channel.send("An Error occured");
            })
        } else {

            redditAPI.getSubreddit("nekomimi").getRandomSubmission().then(submission => {
                message.channel.send("http://reddit.com" + submission.permalink);

            }).catch(error => {
                Logger.log(error);
                message.channel.send("An Error occured");
            })
        }
    }
}