module.exports.run = async (client , message) => {
    var result = [];
      const parser = require('xml2json');
   const request = require("request");
    var shuffle = require('shuffle-array');
    request({
    url : "http://24th.jp/test/quiz/api_quiz.php",
    method : "get",
      xml : true
    } , async (err , body) => {
      if(err) throw new Error()

      var body1 = parser.toJson(body.body);
      var body = JSON.parse(body1)
      var quiz = body.Result.quiz
          var anser = quiz.ans1
      var array = [quiz.ans1 , quiz.ans2 , quiz.ans3 , quiz.ans4];
      shuffle(array);
      var result = [];
      for(var i= 1,b = 0; i<=4; i++) {
        result.push(`${i}. ${array[(i - 1)]}`)
      }
const msg = await message.channel.send(quiz.quession +"\n"+ result.join("\n"))
msg.react("1⃣")
msg.react("2⃣")
msg.react("3⃣")
msg.react("4⃣")
 const filter = (reaction, user) => {
    return ['4⃣', '3⃣' , "2⃣" , "1⃣"].includes(reaction.emoji.name) && user.id === message.author.id;
};

      msg.awaitReactions(filter , {
    max: 1,
    time: 15 * 1000,
   errors: ['time']
  }).then(collected => {
    const reaction = collected.first();
    var anserbanngou1 = array.indexOf(anser);
    var anserbanngou = String((anserbanngou1 + 1));
    result.push(anserbanngou)
  if(reaction.emoji.name === "1⃣" && anserbanngou === "1") {
   return message.channel.send(`正解です！\n正解は、${anserbanngou}の${anser}でした！`)
  }  else if(reaction.emoji.name === "2⃣" && anserbanngou === "2") {
   return message.channel.send(`正解です！\n正解は、${anserbanngou}の${anser}でした！`)
  } else if(reaction.emoji.name === "3⃣" && anserbanngou === "3") {
       return message.channel.send(`正解です！\n正解は、${anserbanngou}の${anser}でした！`)
  } else if(reaction.emoji.name==="4⃣" && anserbanngou === "4"){
          return message.channel.send(`正解です！\n正解は、${anserbanngou}の${anser}でした！`)     
            }
             else{
    message.channel.send(`違います！！！正解は**${anserbanngou}の${anser}**でした！`);
  } 
}).catch(err => message.channel.send(`時間切れです！正解は**${result}の${anser}**でした!`))
      
            })
}