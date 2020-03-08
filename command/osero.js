const Discord = require("discord.js")
module.exports.run = (client , message , db , args) => {

 //0:　何もない, 1: 白, 2: 黒 
const json = db.get("osero").find({id : message.author.id})

if(!json) {
var playBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,2,1,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
] 
json.push({id : message.author.id, board : playBoard})
let embed = Discord.RichEmbed()
.setTitle("オセロがスタート！")
.setDescription(``)
message.channel.send(embed)
}
}