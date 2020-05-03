const Discord = require("discord.js")
module.exports.run = (client , message, args , db) => {
const emoji = [];
for(var i = 0; i < message.guild.channels.size; i++){
  message.channels.first(i)
}
message.channel.send(new Discord.RichEmbed()
.setTitle("設定するチャンネルを選ぶ！")
.addField()
)

}