
var fs = require('fs');
var Canvas = require('canvas');
const Discord = require("discord.js")
module.exports.run = (client , message ,kekka , cooltime) => {
  if(cooltime.includes(message.channel.id)) {
    message.delete(2000)
    message.channel.send("クールタイム中です。")
    .then(msg => msg.delete(2000))
  } else {
    cooltime.push(message.channel.id)
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
    const Discord = require("discord.js")
  const gis = require("g-i-s");
  gis(kekka , logResults);

function logResults(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    if(results.length === 0) return message.channel.send("画像が見つかりませんでした")



    var Image = Canvas.Image;
    
    var img = new Image;
img.src = results[0].url

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
      let embed = new Discord.RichEmbed()
      .setTitle("通常")
      .setImage(results[0].url)
      message.channel.send(embed)
      message.channel.send("シンメトリー" , attachment)
    }
    setTimeout(function () {
      cooltime.splice(cooltime.indexOf(message.channel.id),1)
    } , 20000)
  }
}
      }
}