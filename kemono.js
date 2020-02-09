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
    kemono: function(message) {
        redditAPI.getSubreddit("kemono").getRandomSubmission().then(submission => {
            let link = submission.permalink;
            message.channel.send("http://reddit.com" + link);
        }).catch(error => {
            console.log("Something went wrong!");
        })
    }
}