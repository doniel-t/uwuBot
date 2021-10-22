/**
 * @usage !setAnnoy <@targeted_user> <#channel> || !setAnnoy <true | false>
 * @does  pings a user very time a message is posted in a specific channel
 */
module.exports = {
    switch: false,

    setAnnoy: function(message){
        let fs = require('fs');
        let content = message.content.split(" ");
        if(content.length === 2){
            try{
                this.switch = JSON.parse(content[1].toLowerCase());
                message.channel.send("annoy set to " + this.switch + "😎")
                return;
            }catch{
                this.switch = false;
                message.channel.send("annoy set to " + this.switch + "😎")
                return;
            }
        }

        if(content.length != 3) message.channel.send("invalid input");     
        if(this.getId(content[1], '@') === "" || this.getId(content[2], '#') === ""){
            message.channel.send("invalid input");
            return;
        } 
        let annoyObject = {
            userId: this.getId(content[1], '@'),
            channelId: this.getId(content[2], '#')
        }
        let data = JSON.stringify(annoyObject);
        fs.writeFile("./Files/toAnnoyData.json",data, (err) => { if (err) return console.log(err); });
    },

    getId: function(input, symbol){
        let output = "";
        if(input.startsWith('<'+ symbol) && input.endsWith('>')){
            if(symbol === '#') {output = input.slice(2, -1);}
            else{output = input.slice(3, -1);}
        }
        return output;
    },

    readToAnnoy: function(){
        var annoyObject ={};
        if(this.switch === true){
            let fs = require('fs');
            const data = fs.readFileSync('./Files/ToAnnoyData.json',{encoding:'utf8'});
            annoyObject = JSON.parse(data);
        } 
        return annoyObject;
    },
}