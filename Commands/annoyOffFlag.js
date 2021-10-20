module.exports = {
    
    annoyOffFlag: function(message){
        let annoyFs = require("./Commands/setAnnoy");
        let content = message.conntent.split(" ")
        if(content != 2){
            message.channel.send("invalid input");
            return;
        }
        if(content[1] === 1){
             annoyFs.switch === false;+
             message.channel.send("annoy ofline");
             return;
        }else if(content[1] === 0) {
            annoyFs.switch === true;
            message.channel.send("annoy online");
            return;
        }
        message.channel.send("invalid input");
    }
}