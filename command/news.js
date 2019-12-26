module.exports.run = (client , message) => {
  const request = require("request");
  const che = require("cheerio")
  const Discord = require("discord.js")
  var options = {
    url: `http://www3.nhk.or.jp/rss/news/cat0.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);

$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.RichEmbed()
 .setTitle('NHKニュース')
 .setURL('http://www3.nhk.or.jp/news/')
 .addField(name,price)
  message.channel.send(embed);
});
  });
}