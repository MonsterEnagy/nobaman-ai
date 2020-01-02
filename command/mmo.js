const Discord = require("discord.js")
/*
db {
mmo : [
  {
  "id" : "id",
  "teki" : "teki"
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
      const teki = 
      json
      .push({})
    } else {
      
    }
  }
  db.write()
}