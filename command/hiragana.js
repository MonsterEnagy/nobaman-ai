module.exports.run = (client , message , kekka) => {
  const parser = require("xml2json");
  const request = require("request")
  request({
      url : `https://jlp.yahooapis.jp/JIMService/V1/conversion?appid=${process.env.yahooclientID}&sentence=${encodeURIComponent(kekka.trim())}`
    } ,(res , body) => {
    const json = JSON.parse(parser.toJson(body.body)).ResultSet.Result.SegmentList.Segment
    const result = [];
    const rei = [];
    for(var i = 0; json.length > i; i++) {
    console.dir(json[i].CandidateList["Candidate"])
      if(typeof json[i].CandidateList["Candidate"] === "string") {
        json[i].CandidateList["Candidate"] = [json[i].CandidateList["Candidate"]]
      } else if()
     result.push(`${json[i].SegmentText} => ${json[i].CandidateList["Candidate"].join(",")}\n`)
     rei.push()
   }
   message.channel.send(`\`${result.join("` `")}\`\n`)
  })
}