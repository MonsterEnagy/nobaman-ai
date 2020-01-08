
var fs = require('fs');
var Canvas = require('canvas');
const Discord = require("discord.js")
module.exports.run = (client , message ,args) => {
     /*   function draw(canvasName, source, reverse) {
            var canvas = document.getElementById(canvasName);
            if (!canvas || !canvas.getContext) { return false; }
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.src = source;
            img.onload = function () {
                var w = img.width;
                var h = img.height;

                var canvas = document.getElementById(canvasName);
                canvas.setAttribute('height', h);
                if (reverse) {
                    canvas.setAttribute('width', w * (1 - rate) * 2);
                    ctx.drawImage(img, w * rate, 0, w * (1 - rate), h, w * (1 - rate), 0, w * (1 - rate), h);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, w * rate, 0, w * (1 - rate), h, -w * (1 - rate), 0, w * (1 - rate), h);
                } else {
                    canvas.setAttribute('width', w * rate * 2);
                    ctx.drawImage(img, 0, 0, w * rate, h, 0, 0, w * rate, h);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, 0, 0, w * rate, h, -w * (rate * 2), 0, w * rate, h);
                }
            }
        }
*/
  
    var Image = Canvas.Image;
    
    var img = new Image;
  if(!args[0]) {
    img.src = message.attachments.first().url;
  } else {
    img.src = args[0]
  }
  if(args[1]) {
    if(args[1] === "1") {
    img.onload = function(){    
    var canvas = Canvas.createCanvas(img.width, img.height);
    //  canvas.setAttribute('height', img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const w = img.width
    const h = img.height
    const rate = 0.5
                                    
                    ctx.drawImage(img, 0, 0, w * rate, h, 0, 0, w * rate, h);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, 0, 0, w * rate, h, -w * (rate * 2), 0, w * rate, h);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'Symmetry.png');
      
      message.channel.send("シンメトリー" , attachment)
    }
    }
  }
    img.onload = function(){    
    var canvas = Canvas.createCanvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const w = img.width
    const h = img.height
    const rate = 0.5
                    // canvas.setAttribute('width', w * rate * 2);
                    ctx.drawImage(img, w * rate, 0, w * (1 - rate), h, w * (1 - rate), 0, w * (1 - rate), h);
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, w * rate, 0, w * (1 - rate), h, -w * (1 - rate), 0, w * (1 - rate), h);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'Symmetry.png');
      
      message.channel.send("シンメトリー" , attachment)
    }
}