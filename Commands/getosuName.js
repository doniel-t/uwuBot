module.exports = {
    getosuName: function(message) {     //Hardcoded Names
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
}

