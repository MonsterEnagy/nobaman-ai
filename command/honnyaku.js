const request = require("request");
const Discord = require("discord.js");
const honnyaku = require("./honnyaku.js");
const LanguageTranslatorV3 = require("watson-developer-cloud/language-translator/v3");
function ja(client, message, text){
  var body1;
  request(
    {
      url: ` https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${encodeURIComponent(text)}&source=en&target=ja`,
      method: "get",
      json: true
    },
    (err, res, body) => {
      if (err) return console.error(err);
      console.log(body + "japanese")
      var body1 = body;
    }
  );
  return body1;
};

async function en(client, message, text) {
  request(
    {
      url: ` https://script.google.com/macros/s/AKfycbweJFfBqKUs5gGNnkV2xwTZtZPptI6ebEhcCU2_JvOmHwM2TCk/exec?text=${encodeURIComponent(text)}&source=ja&target=en`,
      method: "get",
      json: true
    },
    (err, res, body) => {
      if (err) return console.error(err);
         console.log(body + "english")
      return body;
    }
  );
};

async function channeltrans(client, message) {
  console.log(en(client , message , "これはペンです"))
  const languageTranslator = new LanguageTranslatorV3({
    iam_apikey: process.env.IBMapikey,
    url: "https://gateway.watsonplatform.net/language-translator/api/",
    version: "2020-03-02"
  });
  languageTranslator.identify(
    {
      text: message.content
    },
    function(err, language) {
      if (err) {
        console.log("error:", err);
      } else {
       const lang = JSON.stringify(language, null, 2)
       message.delete()
       if(language.languages[0].language === "ja") {
        var eng = en(client , message , message.content)
        var jap = message.content
       } else {
        var eng = message.content
        var jap = ja(client , message , message.content)
       }
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag , message.author.avatarURL)
        .addField("English(英語)" , eng)
        .addField("Japanese(日本)" , jap)
        .setFooter("原文" + language.languages[0].language)
        .setTimestamp()
        message.channel.send(embed);
     }
    }
  );
};

module.exports = {
  en,
  ja,
  channeltrans
}