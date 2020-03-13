module.exports = {
    ask: function(message) {
        var Answers = [
            "So it would seem.",
            "As I see it, yes.",
            "Don't count on it",
            "It is certain",
            "It is decidedly so.",
            "Most likely",
            "My reply is no",
            "My sources say no.",
            "Outlook not so good",
            "Outlook good",
            "Signs point to yes",
            "Very doubtful.",
            "Without a doubt",
            "Yes.",
            "Yes - definitely.",
            "You may rely on it"
        ];
        try {
            message.channel.send(Answers[Math.floor(Math.random() * Answers.length)]);
        }catch (ignored) {
            message.channel.send("There was a problem, please try again");
        }
    }
}
