
var fs = require('fs');
var Canvas = require('canvas');
const Discord = require("discord.js")
module.exports.run = async (client , message ,kekka , cooltime) => {
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

    var Image = Canvas.Image;
    
    var img = new Image;
img.src = result.data.items[0].link

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
      .setImage(result.data.items[0].link)
      message.channel.send(embed)
      message.channel.send("シンメトリー" , attachment)
    }
    setTimeout(function () {
      cooltime.splice(cooltime.indexOf(message.channel.id),1)
    } , 5000)
  }
}