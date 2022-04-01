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
            "XD IMAGINE THINKING THAT",
            "you are the bot now",
            "KEKW",
            "LMAO YOU STOOPID",
            "bruh fr?",
            "you are lowkey mid",
            "you are lowkey mildly retarded",
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
            "...",
            "my man has 0 iq but still said facts",
            "facts",
            "trueeee",
            "factual",
            "decent iq moment",
            "first moment of enlightment",
            "sun reflects of yo big ass forehead",
            "nice guess lol",
            "toddler thought",
            "get some bitches",
            "copium",
            "bruh moment",
            "Didnt't ask + Ratio + cringe + you fell off + cope",
            "great argument! however, your mother",
            "*dies of cringe*",
            "dogshit opinion",
            "dogshit brain",
            "you are trolling, no?",
            "skill issue",
            "okaay..",
            "your sigma male card has been revoked",
            "we do a lil trolling",
            "problem?",
            "pathetic",
            "i think my brain just comitted suicide",
            "simp thought",
            "touch some grass",
            "go outside",
            "british teeth",
            "*leaves conversation*",
            "furry vibes",
            "incel moment",
            "commit hero",
            "fuck off twat",
            "discord mod vibes",
            "american brain XD",
            "XD",
            "go apply for ronald mcdonalds position",
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
