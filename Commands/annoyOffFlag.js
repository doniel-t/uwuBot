/**
 * @usage !annoyOffFlag <1 for false | 0 for true>
 * @does de/aktivates the annoy command to reduce spam
 */

module.exports = {
    
    annoyOffFlag: function(message){
        let annoyFs = require("./setAnnoy");
        let content = message.content.split(" ")
        if(content.length != 2){
            message.channel.send("invalid input_0");
            return;
        }
        if(content[1] === "1"){
             annoyFs.switch = false;
             message.channel.send("annoy ofline");
             return;
        }else if(content[1] === "0") {
            annoyFs.switch = true;
            message.channel.send("annoy online");
            return;
        }
        message.channel.send("invalid input_1");
    }
}