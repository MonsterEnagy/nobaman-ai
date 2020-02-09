const request = require("request")
module.exports.run = async (client,message,kekka)=> {
var options = {
  url: `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${encodeURIComponent(kekka)}&key=AIzaSyAG0L1cTYEh-5f7puZgGGdp_XxIWBKqATE`,
  method: 'get',
  json: true
} 
  request(options, function (error, response, body) {
    if(!body.items.length === 0) {
            message.channel.send('予期せぬエラーが発生しました。');
      return;
        } else {
          var kekka = 'https://www.youtube.com/watch?v=' + body["items"][0]["id"]["videoId"]
          message.channel.send(kekka);
        } 
  });
}
