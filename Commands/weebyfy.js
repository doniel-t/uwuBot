module.exports = {
    weebyfy: function(message) {
        let returnString = "";

        let words = message.content.split(' ');
        words.splice(0, 1);

        if (message.author.bot) { return; }
        for (let word of words) {
            let wordSplit = word.match(/.{1,2}/g);
            word = "";

            for (let part of wordSplit) {

                if (part.includes("l")) {
                    if (part == "ll") {
                        part = "uru";
                    } else {
                        part = part.replace("l", "uru");
                    }
                }
                word += part;
            }

            if (!word.endsWith('o')) {
                word += 'o';
            }
            returnString += word + " ";
        }
        message.channel.send(returnString);
    }
}