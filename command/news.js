  const request = require("request");
  const che = require("cheerio")
  const Discord = require("discord.js")
  
module.exports.run = (client , message , args) => {
  if(args[0]) {
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
  } else {
      var options = {
    url: 'https://www.gizmodo.jp/index.xml',
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var description = $(this).children("description").text()
  var link = $(this).children("link")
 let embed = new Discord.RichEmbed()
 .setAuthor('ギズモード・ジャパン')
 .setURL(link)
 .setTitle(name)
 .setDescription(description)
  message.channel.send(embed);
});
  })
  }
}