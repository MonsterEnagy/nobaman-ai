const Discord = require("discord.js")
module.exports.run = async (client , message,  args) => {
  if(args.length > 21) return message.channel.send("20個までです")
  const index = [];
  for(var i= 0; args.length > i; i++) {
    const emoji = " 🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿".split(" ")

    index.push(emoji[i] + args[i])
  }
  let embed = new Discord.RichEmbed()
  .setTitle(index[0])
  .setDescription(index.slice(1).join("\n"))
message.channel.send(embed)
  .then(async msg => {
  const emoji = " 🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿".split(" ")
  for(var i= 1; index.length > i; i++) {
    await msg.react(emoji[i])
  }
})
}