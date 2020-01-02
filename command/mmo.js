const Discord = require("discord.js")
/*
db {
mmo : [
  {
  "id" : "id",
  "strong" : "1"
  "teki" : "teki",
  "url" :
  "level" : "1"
  },
{

}
  ]
}

*/
module.exports.run = (client , message, db , args) => {
     var json = db
      .get("mmo")
      .find({ id: message.author.id })
     var tekijson = require("../database/teki.json");
  if(args[0] === "attack") {

    if(!json) {
      
      const tekidice = Math.floor( Math.random() * tekijson.length );
      const teki = tekijson[tekidice]
      json
      .push({id : message.author.id , teki : teki.name, url : teki.url, strong:"1" , level: "1"})
      
      message.channel.send(Discord.RichEmbed()
                          .setTitle(`${teki.name}がやってきた！`)
                          .setImage(teki.url));
    } else if(!json.teki){
      var strong = json.level + json.strong - Math.floor( Math.random() * 8 );
    } else {
      var strong = json.level + json.strong - Math.floor( Math.random() * 8 );
    }
  }
  db.write()
}