/**
 * @usage !setAnnoy <@targeted_user> <#channel>
 * @does sets the parameters for the readToAnnoy command
 */
module.export = {

    setAnnoy: function(message){
        let fs = require('fs');
        let content = message.content.split(" ");
        if(content.length != 2) message.channel.send("invalid input");     
        if(this.getId(content[0], '@') === "" || this.getId(content[1], '#') === ""){
            message.channel.send("invalid input");
            return;
        } 
        let annoyObject = {
            userId: this.getId(content[0], '@'),
            channelId: this.getId(content[1], '#')
        }
        let data = JSON.stringify(annoyObject);
        fs.writeFile("files/toAnnoyData.json",data, (err) => { if (err) return console.log(err); });
    },

    getId: function(input, symbol){
        let output = "";
        if(input.startsWith('<'+ symbol) && input.endsWith('>')){
            output = input.slice(2, -1);
        }
        return output;
    }
}