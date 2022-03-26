const Logger = require('./Logger.js');

/**
 * @usage !ask <question>
 * @does will executed given Command
 * @Shortcut a
 */
module.exports = {
    ask: function(message) {
        const Answers = [
            "So it would seem.",
            "As I see it, yes.",
            "Don't count on it",
            "It is certain",
            "Affirmative",
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

        const aprilfoolsAnswers = [
            "Ey du Hurensohn",
            "I hope you lose your next 50/50",
            "XD IMAGINE THINKING THAT",
            "you are the bot now",
            "KEKW",
            "LMAO YOU STOOPID",
            "bruh fr?",
            "you are lowkey mid",
            "you are lowkey midly retarded",
            "deez nuts",
            "trump looking ass XD",
            "iq diff XD",
            "gura deadass dog tier",
            "your opinion is trash",
            "go cry in a corner fgt",
            "my man deadass thinks the sun is a planet",
            "fucking donkey",
            "monke brain ask",
            "??????",
            "L + Ratio",
            "No bitches ????",
            "didnt ask",
            "get gud",
            "try coping harder retard",
            "no parents ??",
            "4chan brain",
            "^ negativ iq",
            "small brain",
            "boomer brain XD",
            "tictactoe forehead",
            "no maidens??",
            "^ greentext vibes",
            "french",
            "..."
        ]

        let isAprilFools = () => {
            let aprilFoolsDay = {
                month: 3,
                date: 1
            };
            let now = new Date();
            return now.getMonth() == aprilFoolsDay.month && now.getDate() == aprilFoolsDay.date;
        };

        let messageSendFunc = (answerArray) => {
            message.channel.send(answerArray[Math.floor(Math.random() * answerArray.length)]);
        }

        try {
            isAprilFools() ? messageSendFunc(aprilfoolsAnswers) : messageSendFunc(Answers);
        }catch (err) {
            Logger.log(err);
            message.channel.send("There was a problem, please try again");
        }
    }
}
