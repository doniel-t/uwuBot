module.exports = {
    getleagueName: function (message) {       //Gives back a NameString 

        let contentArgs = message.content.split(" ");

        if (contentArgs[1] == null) {   //Hardcoded Names
            switch (message.author.username) {

                case "ackhack":         //Discordname
                    return "ackhack";   //leaguename

                default:
                    return "No User given";
            }
        }
        else {
            return contentArgs[1];  //When Name given
        }
    }
}
