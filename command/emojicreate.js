var fs = require("fs");
var Canvas = require("canvas");
const Discord = require("discord.js");
module.exports.run = (client, message, kekka) => {
var insertStr = function (str, index, insert) {
  return str.slice(0, index) + insert + str.slice(index, str.length);
}

 var setting = setting || {
    text: kekka,
    color: '#000',
    fontFamily: 'ComicSans'
  }

  const text_n = insertStr(setting.text, 2, '\n')

  const c = Canvas.createCanvas(128, 128)
  const ctx = c.getContext('2d')

  ctx.font = 'bold 45px ' + setting.fontFamily
  ctx.textAlign = 'center'
  ctx.fillStyle = setting.color
  ctx.fillText(text_n, 64, 56)

    const attachment = new Discord.Attachment(c.toBuffer(), "Emoji.png");

    message.channel.send("絵文字", attachment);
  };
