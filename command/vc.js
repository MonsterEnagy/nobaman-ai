var fs = require("fs");
var Discord = require("discord.js");
module.exports.run = (client, message, yomiage) => {
  if (!message.member.voice.channel) {
    message.channel.send("まずボイスチャンネルに入りましょう");
    return;
  }
  const cooldown = new Set();
  if (cooldown.has(message.author.id)) {
    message.channel.send("処理が終わっていません。");
    return;
  }
  cooldown.add(message.author.id);
  const VoiceText = require("voicetext");
  var voice = new VoiceText(process.env.VTAPI);
  var now = message.createdTimestamp;
  voice
    .speaker(voice.SPEAKER.SHOW)
    .emotion(voice.EMOTION.HAPPINESS)
    .emotion_level(voice.EMOTION_LEVEL.HIGH)
    .volume(75)
    .speak(yomiage, (e, buf) => {
      if (e) {
        console.error(e);
        return;
      }

      fs.writeFile(`./vc/${now}.wav`, buf, "binary", e => {
        if (e) {
          console.error(e);
          return;
        }
        const vc = message.member.voice.channel;
        vc.join().then(connection => {
          if (e) {
            console.error(e);
            return;
          }
          const dispatcher = connection.play(`./vc/${now}.wav`);
          dispatcher.on("finish", reason => {
            fs.unlinkSync(`./vc/${now}.wav`, err => {
              if (err) console.log(err);
            });
          });
        });
      });
    });
  cooldown.delete(message.author.id);
};
