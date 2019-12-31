var fs = require("fs");
var Discord = require("discord.js");
module.exports.run = (client, message) => {
  if (!message.member.voiceChannel) {
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
    .speed(400)
    .volume(100)
    .speak(message.content, (e, buf) => {
      if (e) {
        console.error(e);
        return;
      }

      fs.writeFile(`./${now}.wav`, buf, "binary", e => {
        if (e) {
          console.error(e);
          return;
        }
        const vc = message.member.voiceChannel;
        vc.join().then(connection => {
          if (e) {
            console.error(e);
            return;
          }
          const dispatcher = connection.playFile(`./${now}.wav`);
          dispatcher.on("end", reason => {
            fs.unlinkSync(`./${now}.wav`, err => {
              if (err) console.log(err);
            });
          });
        });
      });
    });
  cooldown.delete(message.author.id);
};
