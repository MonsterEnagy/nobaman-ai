module.exports.run = (client , message, args) => {
const Discord = require("discord.js")
const collection = client.users.get(args[0]) || message.mentions.users.first() || message.guild.members.find(m=>m.user.username.toLowerCase.startsWith(args[0])) || message.author
let embed = new Discord.RichEmbed()
.setTitle(collection.tag ||  collection.user.tag)
.setImage(collection.avatarURL || collection.user.avatarURL)
message.channel.send(embed)
}