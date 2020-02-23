module.exports.run = async (client , message , kekka) => {
  const Discord = require("discord.js")
 
  const { google } = require('googleapis');
const customSearch = google.customsearch('v1');

const result = await customSearch.cse.list({
  cx: "017747817608970459373:tm6z5slxh6g",
  q: kekka,
  auth: "AIzaSyAG0L1cTYEh-5f7puZgGGdp_XxIWBKqATE",
  searchType: 'image',
  safe: 'high',
  num: 1, // max:10
  start:  1,
})
  let embed = new Discord.RichEmbed()
  .setImage(result.data.items[0].link)
  message.channel.send(embed)
}