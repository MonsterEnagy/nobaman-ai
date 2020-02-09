const request = require("request")
module.exports.run = async (client,message,kekka)=> {
var options = {
  url: `https://dic.nicovideo.jp/a/${encodeURIComponent(kekka)}`,
  method: 'get',
  json: true
} 
 request(options, function (error, response, body) {
    console.log(body)

  });

}