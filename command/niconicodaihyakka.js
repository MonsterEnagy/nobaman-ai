const rp = require('request-promise');
const cheerio = require('cheerio');
module.exports.run = async (client,message,kekka)=> {
const options = {
  transform: (body) => {
    return cheerio.load(body);
  }
};
rp.get('https://dic.nicovideo.jp/a/' + encodeURIComponent(kekka),  options)
  .then(($) => {
  console.log($("page-menu"))
  //  return $('title').text();
  })/*.then((title) => {
    console.log(title);
  }).catch((error) => {
    console.error('Error:', error);
  });*/


}