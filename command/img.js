module.exports.run = async (client , message , kekka) => {
  const Discord = require("discord.js")
 
  const { google } = require('googleapis');
const customSearch = google.customsearch('v1');

const result = await customSearch.cse.list({
  cx: CSE_ID,
  q: kekka,
  auth: "AIzaSyAG0L1cTYEh-5f7puZgGGdp_XxIWBKqATE",
  searchType: 'image',
  safe: 'high',
  num: searchNum, // max:10
  start: startIndex + 1,
});
  if(results.length === 0) return message.channel.send("画像が見つかりませんでした")
    let embed = new Discord.RichEmbed()
    .setImage(results[0].url)
   message.channel.send(embed)
  }
}
}