module.exports.run = (client , message , kekka) => {
  const Discord = require("discord.js")
  const gis = require("g-i-s");
  gis(kekka , logResults);

function logResults(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    let embed = new Discord.RichEmbed()
    .setImage(results[0].url)
   message.channel.send(embed)
  }
}
}