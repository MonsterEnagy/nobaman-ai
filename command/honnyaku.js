const request = require("request")
const Discord = require("discord.js")
const honnyaku = require("./honnyaku.js")
module.exports.ja = (client , message, text) => {
//
  request({
    url : `https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec?text=${encodeURIComponent(text)}&source=en&target=ja`,
    method : "get",
    json : true
  } , (err , res , body) => {
  if(err) return console.error(err)
    return body
  })
}

module.exports.en = (client , message, text) => {
  request({
    url : `https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec?text=${encodeURIComponent(text)}&source=ja&target=en`,
    method : "get",
    json : true
  } , (err , res , body) => {
    if(err) return console.error(err)
    return body;
  })
}

module.exports.channeltrans = (client , message) => {
  const text = message.content
    request({
    url : `https://api.apitore.com/api/22/langdetect/get?access_token=${process.env.apitore}&text=` + encodeURIComponent(message.content),
    method : "get",
    json : true
  } , (err , res , body) => {
    if(err) return console.error(err)
    console.log(body)
  })

}