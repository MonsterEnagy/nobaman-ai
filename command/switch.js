const Discord = require("discord.js")
module.exports.run = (client , message, args , db) => {
const result = [];
for(var i = 0; i < message.guild.channels.size; i++){
  if(i = 0){
    result.push(`${i}. ${message.guild.channels.first().name}`)
  } else {
    result.push(`${i}. ${message.guild.channels.first(i).name}`)
  }
}
message.channel.send(new Discord.RichEmbed()
.setTitle("設定するチャンネルを選ぶ！")
.addField(result.join("\n"))
)

}