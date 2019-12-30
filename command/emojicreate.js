
var fs = require('fs');
var Canvas = require('canvas');
const Discord = require("discord.js")
module.exports.run = (client , message ,args) => {

   var Image = Canvas.Image;
    
    var img = new Image;
  if(!args[0]) {
    img.src = message.attachments.first().url;
  } else {
    img.src = args[0]
  }
    img.onload = function(){    
    var canvas = Canvas.createCanvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const w = img.width
    const h = img.height
    const rate = 0.5
                    
                    ctx.drawImage(img, w * rate, 0, w * (1 - rate), h, w * (1 - rate), 0, w * (1 - rate), h);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, w * rate, 0, w * (1 - rate), h, -w * (1 - rate), 0, w * (1 - rate), h);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'Symmetry.png');
      
      message.channel.send("シンメトリー" , attachment)
    }

}