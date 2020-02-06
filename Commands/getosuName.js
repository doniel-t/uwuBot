module.exports = {
    getosuName: function (message) {       //Gives back a NameString 

        let contentArgs = message.content.split(" ");

        if (contentArgs[1] == null) {   //Hardcoded Names
            switch (message.author.username) {
                case "ackhack":         //Discordname
                    return "ackh4ck";   //osuname
                    break;
                case "Human Daniel":
                    return "daninator";
                    break;
                case "DragonHunter428":
                    return "DH428";
                    break;
                default:
                    return "No User given";
            }
        }
        else {
            return contentArgs[1];  //When Name given
        }
    }
}
