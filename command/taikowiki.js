const rp = require('request-promise');
const cheerio = require('cheerio');
module.exports.run = async (client,message,kekka)=> {
const url = "http://www.wikihouse.com/taiko/index.php?cmd=read&page=%C6%F1%B0%D7%C5%D9%C9%BD%2F%A4%AA%A4%CB%2F%A5%BF%A5%A4%A5%B3%A5%ED%A1%BC%A5%EB&word=%A5%BF%A5%A4%A5%B3%A5%ED%A1%BC%A5%EB"

    // httpリクエストを投げる
    const response = await rp({
      "uri": url,
      gzip: true 
    });
    let $ = cheerio.load(response);
    console.log("yeah")
    // 取得したいデータのタグを指定する
    let title = $('list1' , 'ul').text();
    console.log(title);

    return title;


}