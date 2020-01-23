const fs = require("fs")
module.exports.run= async (client,message,db) => {
      console.log("通った")
  await message.channel.send("どんな単語を教えますか？\n`主語` `述語` `修飾語`")

const filter = m => message.channel.id === m.channel.id
// Errors: ['time'] treats ending because of the time limit as an error
message.channel.awaitMessages(filter, {
          max: 1,
          time: 15 * 1000,
          errors: ["time"]})
  .then(async collected => {

  if(collected.first().content === "主語") {
    await message.channel.send("主語モード")
    var mode = "syugo"
  }
    if(collected.first().content === "述語") {
    await  message.channel.send("述語モード")
    var mode = "jyutugo"
  }
    if(collected.first().content === "修飾語") {
    await  message.channel.send("修飾語モード")
    var mode = "syuusyokugo"
  }
   await   message.channel.send("単語を言ってください")
  message.channel.awaitMessages(filter, { max: 1,         time: 60 * 1000,
          errors: ['time']})
  .then(collected => {
    db["kotoba"][mode].push(collected.first().content)
    message.channel.send(`追加しました\`${collected.first().content}\``)
  })  .catch(collected => message.channel.send("キャンセル"));
/*  const kotoba = db.kotoba
  kotoba[mode].push()*/
})
  .catch(collected => message.channel.send("キャンセル"));
      fs.writeFile("./database/db.json", JSON.stringify(db), err => {
    if (err) console.log(err);
  });
  }