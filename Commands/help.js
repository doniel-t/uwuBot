module.exports = {
    help: function(message) {
        message.channel.send("List of current commands: \n"
            .concat("!padoru                                                             => writes padoru!\n")
            .concat("!ask <QUESTION>                                         => answers your question with 100% accuracy\n")
            .concat("!uwufy <MESSAGE>                                      => uwufies your message\n")
            .concat("!nhentai <optional: Number>                       => gives you a link to a random(or your chosen)nhentai hentai\n")
            .concat("!nhentaiprint <optional: Number>              => prints every page of a random(or your chosen) nhentai hentai\n")
            .concat("!osuplays <optional: osuName>                  => gives you your(or osuName's) 5 best osu plays\n")
            .concat("!osurecent <optional: osuName>                => gives you your (or osuName's) most recent play(passed or not passed\n")
            .concat("!leaguegetgame <optional: leagueName> => gives you your (or leagueName's) current league game\n")
            .concat("!poll <TITLE optional: option 1 ...>                => gives you a poll based on your TITLE (optional: with custom options)\n"));
    }
}