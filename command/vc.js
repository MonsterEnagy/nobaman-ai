var fs = require("fs");
var Discord = require("discord.js");
//  const VoiceText = require("voicetext");
const voiceText = require('@shooontan/voicetext');
module.exports.run = async (client, message , cooldown , yomiage) => {
if (!message.member.voiceChannel) {
    message.channel.send("まずボイスチャンネルに入りましょう");
    return;
  }
  if (cooldown.has(message.author.id)) {
    message.channel.send("処理が終わっていません。");
    return;
  }

  cooldown.add(message.author.id);
  var now = message.createdTimestamp;
  
  const apiKey = process.env.VTAPI;
const vt = voiceText(apiKey);
  //var voice = new VoiceText(process.env.VTAPI);
/*  
  voice
    .speaker(voice.SPEAKER.SHOW)
    .emotion(voice.EMOTION.HAPPINESS)
    .emotion_level(voice.EMOTION_LEVEL.HIGH)
    .volume(100)
    .speak(yomiage,   (e, buf) => {
      if (e) {
        console.error(e);
        return;
      }*/
    const text = yomiage;
  const speaker = 'show';
  const bf1 = await vt.mp3(text, speaker); // return Buffer
  const output1 = `${now}.mp3`;


       fs.writeFile(output1, bf1, 'binary', e => {
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
          const dispatcher = connection.playFile(`./${now}.mp3`);
          /*dispatcher.on("end", reason => {
            fs.unlinkSync(`./${now}.mp3`, err => {
              if (err) console.log(err);
            });
          });*/
        });
      });
  cooldown.delete(message.author.id);
};
