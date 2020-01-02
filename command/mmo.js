const Discord = require("discord.js")
/*
db {
mmo : [
  {
  "id" : "id",
  "hp" : 10
  "strong" : "1"
  "teki" : "teki",
  "url" : "tekiのurl"
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
      .push({id : message.author.id , teki : teki.name, url : teki.url, strong:1 , level: 1}).write()
          const tekihp = json.level + 3
    const tekistrong = json.strong - 6
      message.channel.send(Discord.RichEmbed()
                          .setTitle(`${teki.name}がやってきた！`)
                           .addField("HP" , tekihp)
                           .addField("攻撃力" , tekistrong)
                          .setImage(teki.url));
      tekihp - json.strong
      if(tekihp < 0) {
      json
      .assign({strong: json.strong + 1 , level: json.strong + 1 , hp : json.level + 5})
      .remove({teki : teki.name , url:teki.url}).write()
        return message.channel.send("倒しました！Lvがあがります!")
      }
      json.assign({hp : json.hp - tekistrong}).write()
      message.channel.send(`攻撃しました！敵ののこりHPは${tekihp}です。`)
      message.channel.send(`攻撃されました！あなたの残りHPは${json.hp}です。`)

    } else if(!json.teki){
      var strong = json.level + json.strong - Math.floor( Math.random() * 8 );
    } else {
      var strong = json.level + json.strong - Math.floor( Math.random() * 8 );
    }
  }
  db.write()
}