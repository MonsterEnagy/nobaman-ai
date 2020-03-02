const request = require("request");
const Discord = require("discord.js");
const honnyaku = require("./honnyaku.js");
const LanguageTranslatorV3 = require("watson-developer-cloud/language-translator/v3");
module.exports.ja = (client, message, text) => {
  //
  request(
    {
      url: `https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec?text=${encodeURIComponent(
        text
      )}&source=en&target=ja`,
      method: "get",
      json: true
    },
    (err, res, body) => {
      if (err) return console.error(err);
      return body;
    }
  );
};

module.exports.en = (client, message, text) => {
  request(
    {
      url: `https://script.google.com/macros/s/AKfycbzZtvOvf14TaMdRIYzocRcf3mktzGgXvlFvyczo/exec?text=${encodeURIComponent(
        text
      )}&source=ja&target=en`,
      method: "get",
      json: true
    },
    (err, res, body) => {
      if (err) return console.error(err);
      return body;
    }
  );
};

module.exports.channeltrans = (client, message) => {
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
       if(lang[0].language === "ja") {
        var eng = honnyaku.en(client , message , message.content)
        var jap = honnyaku.ja(client , message , message.content)
       }
       }
    }
  );
};
