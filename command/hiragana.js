module.exports.run = (client , message , kekka) => {
  const parser = require("xml2json");
  const request = require("request")
  request({
      url : `https://jlp.yahooapis.jp/JIMService/V1/conversion?appid=${process.env.yahooclientID}&sentence=${encodeURIComponent(kekka.trim())}`
    } ,(res , body) => {
    console.log(body.body)
    const json = JSON.parse(parser.toJson(body))
   console.log(json.Result)
  })
}