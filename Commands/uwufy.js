
module.exports = {
    uwufyMessage: function(message, contentArgs) { //uwu a Message
        // gets rid of <[userID]> => message.content = inputMessage of user
        let returnString = "";
        let index = 0;
        if (message.author.bot) { return; } //No uwu if Author is Bot himself
        for (let arg of contentArgs) {
            if (index != 0) {
                arg = uwufy(arg);
                returnString += arg;
            }
            index++;
        }
        message.channel.send(returnString);
    }
}

function uwufy(string) { //uwu a String
    let uwuString = "";
    for (let char of string) {
        switch (char) {
            case 'l':
                char = 'w';
                break;
            case 'r':
                char = 'w';
                break;
            case 'v':
                char = 'w';
                break;
        }
        uwuString += char;
    }
    return uwuString + " ";
}