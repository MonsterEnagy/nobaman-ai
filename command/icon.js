module.exports.run = (client , message, args) => {
const Discord = require("discord.js")
const collection = client.users.get(args[0]) || message.mentions.users.first() || message.guild.users.find(m=>m.startsWith(args[0]))

}