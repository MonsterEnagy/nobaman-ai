
var fs = require('fs');
var Canvas = require('canvas');
    
module.exports.run = (client , message) => {
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
    img.src = message.attachments.first().url;
  
    var canvas = new Canvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
  
}