module.exports.run = (client , message , kekka) => {
  const parser = require("xml2json");
  const request = require("request")
  request({
      url : `https://jlp.yahooapis.jp/JIMService/V1/conversion?appid=${process.env.yahooclientID}&sentence=${encodeURIComponent(kekka.trim())}`
    } ,(res , body) => {
    const json = JSON.parse(parser.toJson(body.body)).ResultSet.Result.SegmentList.Segment
    const result = [];
   json.forEach(i => {
     result.push(`${json[i].SegmentText} => ${json[i].CandidateList}`)
   })
   message.channel.send(`\`${result.join("` `")}\`\n`)
  })
}