module.export = {
    
    readToAnnoy: function(){
        let fs = require('fs');
        let annoyObject ={
            userId: null,
            channelId: null
        }
        fs.readFile('ToAnnoyData.json'), (err, data) =>{
            if(err) throw err;
            annoyObject = JSON.parse(data);
        }
        return annoyObject;
    }
}