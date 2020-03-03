var fs = require("fs");
var Canvas = require("canvas");
const Discord = require("discord.js");
module.exports.run = (client, message, kekka) => {


 var setting = setting || {
    text: kekka,
    color: '#FFFFFF',
    fontFamily: 'ComicSans'
  }

  const text_n = setting.text

  const c = Canvas.createCanvas(1280 , 820)
  const ctx = c.getContext('2d')

  ctx.font = 'bold 45px ' + setting.fontFamily
  ctx.textAlign = 'center'
  ctx.fillStyle = setting.color
  ctx.fillText(text_n, 1280, 56)

    const attachment = new Discord.Attachment(c.toBuffer(), "Emoji.png");

    message.channel.send("絵文字", attachment);
  };
