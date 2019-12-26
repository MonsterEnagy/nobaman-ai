module.exports.run = (client , message, args) => {
  const Discord = require("discord.js")
let user;
const id = client.users.get(args[0])
const name = client.users.find(m=>m.username === args.join(" "));
const mention = message.mentions.users.first()
 if(!args[0] && !message.mentions.user) {
user = client.users.get(message.author.id);
} else if(message.mentions.user) {
  user = mention
 } else if(name) {
   user = name
  } else if(id) {
    user = id 
    } else {
    var userCollection = message.guild.members.filter(m=> m.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase()))
 if(userCollection.size === 0) { return user = client.users.get(message.author.id) }
    var username = userCollection.first().user.username //引数がKoだとしたら -> Kotlinモンスター
    user = message.guild.members.find(m=>m.user.username === username).user
}
 if(user.avatarURL === null) {
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.username}`)
  .setImage(user.displayAvatarURL)
  message.channel.send(embed)
  } else {
  let embed = new Discord.RichEmbed()
  .setAuthor(`${user.username}`)
  .setImage(user.avatarURL)
  message.channel.send(embed)
 }
}