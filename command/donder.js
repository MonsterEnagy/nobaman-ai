const Discord = require("discord.js")
const request = require("request")
module.exports.run = (client , message , args) => {
  const mail = process.env.donderid
  const pass = process.env.donderpass
  const url = "https://account.bandainamcoid.com/login.html?client_id=nbgi_taiko&customize_id=&redirect_uri=https://www.bandainamcoid.com/v2/oauth2/auth?back=v3&client_id=nbgi_taiko&scope=JpGroupAll&redirect_uri=https%3A%2F%2Fdonderhiroba.jp%2Flogin_process.php%3Finvite_code%3D%26abs_back_url%3D%26location_code%3D&text=&prompt=login"
  
  request({
    url : url,
    method : "post",
    json:true,
    headers : {
      "form-control _form-bkcolor" : mail,
      "pass" : pass
    }
  } , (err , response , body) => {
    console.log(err)
    console.log(body)
  })
}