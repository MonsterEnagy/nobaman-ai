module.exports.run = async (client, message, db) => {
  var result = [];
  const parser = require("xml2json");
  const request = require("request");
  const shuffle = require("array-shuffle");
  var json = db.get("mmo").find({ id: message.author.id });
  request(
    {
      url: "http://24th.jp/test/quiz/api_quiz.php",
      method: "get",
      xml: true
    },
    async (err, body) => {
      if (err) throw new Error();

      var body1 = parser.toJson(body.body);
      var body = JSON.parse(body1);
      var quiz = body.Result.quiz;
      var anser = quiz.ans1;
      var array = shuffle([quiz.ans1, quiz.ans2, quiz.ans3, quiz.ans4]);
      var result = [];
      for (var i = 1, b = 0; i <= 4; i++) {
        result.push(`${i}. ${array[i - 1]}`);
      }
      const msg = await message.channel.send(
        quiz.quession + "\n" + result.join("\n")
      );
      await msg.react("1⃣");
      await msg.react("2⃣");
      await msg.react("3⃣");
      await msg.react("4⃣");
      const filter = (reaction, user) => {
        return (
          ["4⃣", "3⃣", "2⃣", "1⃣"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      msg
        .awaitReactions(filter, {
          max: 1,
          time: 15 * 1000,
          errors: ["time"]
        })
        .then(collected => {
          const reaction = collected.first();
          var anserbanngou1 = array.indexOf(anser);
          var anserbanngou = String(anserbanngou1 + 1);
          if (reaction.emoji.name === "1⃣" && anserbanngou === "1") {
            result.push(anserbanngou);
            message.channel.send(
              `正解です！\n正解は、${anserbanngou}の${anser}でした！`
            );
            if (json) {
              json.assign({
                strong: json.value().strong + 1,
                level: json.value().level + 1,
                hp: json.value().level + 5
                
              });
              message.channel.send("レベルが上がりました！")
            }
          } else if (reaction.emoji.name === "2⃣" && anserbanngou === "2") {
            result.push(anserbanngou);
            message.channel.send(
              `正解です！\n正解は、${anserbanngou}の${anser}でした！`
            );
            if (json) {
              json.assign({
                strong: json.value().strong + 1,
                level: json.value().level + 1,
                hp: json.value().level + 5
              });
              message.channel.send("レベルが上がりました！")
            }
          } else if (reaction.emoji.name === "3⃣" && anserbanngou === "3") {
            result.push(anserbanngou);
            message.channel.send(
              `正解です！\n正解は、${anserbanngou}の${anser}でした！`
            );
            if (json) {
              json.assign({
                strong: json.value().strong + 1,
                level: json.value().level + 1,
                hp: json.value().level + 5
              });
              message.channel.send("レベルが上がりました！")
            }
          } else if (reaction.emoji.name === "4⃣" && anserbanngou === "4") {
            result.push(anserbanngou);
            message.channel.send(
              `正解です！\n正解は、${anserbanngou}の${anser}でした！`
            );
            if (json) {
              json.assign({
                strong: json.value().strong + 1,
                level: json.value().level + 1,
                hp: json.value().level + 5
              });
                            message.channel.send("レベルが上がりました！")
            }
          } else {
            message.channel.send(
              `違います！！！正解は**${anserbanngou}の${anser}**でした！`
            );
            if (json) {
              json.assign({
                strong: json.value().strong,
                level: json.value().level - 1,
                hp: json.value().level + json.value().strong
              });
                            message.channel.send("レベルが下がってしまいました。")
            }
          }
        })
        .catch(err => {

          message.channel.send(`時間切れです！正解は**${anser}**でした!`);
                  if (json) {
            json.assign({
              strong: json.value().strong,
              level: json.value().level - 1,
              hp: json.value().level + json.value().strong
            });
                                  message.channel.send("レベルが下がってしまいました。")
          }
        });
    }
  );
};
