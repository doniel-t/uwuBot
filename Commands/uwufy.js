module.exports = {
    uwufy: function(message) { //uwu a Message
        // gets rid of <[userID]> => message.content = inputMessage of user
        let contentArgs = message.content.split(" "); //Split Message for simpler Access
        let returnString = "";
        let index = 0;
        for (let arg of contentArgs) {
            if (index != 0) {
                arg = uwufyS(arg);
                returnString += arg;
            }
            index++;
        }
        message.channel.send(returnString);
    }
}

function uwufyS(string) { //uwu a String
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
            case 'L':
                char = 'W';
                break;
            case 'R':
                char = 'W';
                break;
            case 'V':
                char = 'W';
                break;
        }
        uwuString += char;
    }
    return uwuString + " ";
}