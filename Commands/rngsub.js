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

    rngsub: function(message) {

        let contentArgs = message.content.split(" "); //Split Message for simpler Access

        if (contentArgs[1] === "" || contentArgs[1] == null) {  //Get Random Subreddit if none is given

            redditAPI.getSubreddit('Random').getRandomSubmission().then(submission => {

                if (submission.permalink == undefined) {    //Can return Listing of Hot for some subreddit, dont know why
                    message.channel.send('Reddit returned undefined (can happen for some subreddits)');
                } else {
                    message.channel.send("http://reddit.com" + submission.permalink);
                }

            }).catch(error => {
                Logger.log(error);
                message.channel.send("An Error occured");
            });

        } else {

            redditAPI.getSubreddit(contentArgs[1]).getRandomSubmission().then(submission => {

                if (submission.permalink == undefined) {    //Can return Listing of Hot for some subreddit, dont know why
                    message.channel.send('Reddit returned undefined (can happen for some subreddits)');
                } else {
                    message.channel.send("http://reddit.com" + submission.permalink);
                }

            }).catch(error => {
                Logger.log(error);
                message.channel.send("An Error occured");
            });
        }
    }
}