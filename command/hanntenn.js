module.exports.run = (client, message, args) => {
  var fs = require("fs");
  var Canvas = require("canvas");
  const Discord = require("discord.js");
  module.exports.run = (client, message, args) => {
    var Image = Canvas.Image;

    var img = new Image();
    if (!args[0]) {
      img.src = message.attachments.first().url;
    } else {
      img.src = args[0];
    }
    img.onload = function() {
      var canvas = Canvas.createCanvas(img.width, img.height);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
        var src = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var dst = ctx.createImageData(canvas.width, canvas.height);

        //ネガポジ変換
        for (var i = 0; i < src.data.length; i=i+4) {
            dst.data[i]   = 255 - src.data[i];    //R
            dst.data[i+1] = 255 - src.data[i+1];  //G
            dst.data[i+2] = 255 - src.data[i+2];  //B
            dst.data[i+3] = src.data[i+3];        //A
        }
      ctx.putImageData(dst, 0, 0);
      const attachment = new Discord.Attachment(
        canvas.toBuffer(),
        "Color Inversion.png"
      );

      message.channel.send("色反転", attachment);
    };
  };
};
