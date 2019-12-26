module.exports.run = (client , message ,kekka) => {
  	        	const weather = require("weather-js");
	        	const Discord = require("discord.js")
        weather.find({search: kekka, degreeType: 'C'}, function(err, result) {
        	if (err) message.channel.send(err);
            if (result.length === 0) {
                message.channel.send('**場所を取得できませんでした**') 
                return; 
            }            
             var current = result[0].current;
            const embed = new Discord.RichEmbed()
                .setDescription('**' + current.skytext + '**') 
                .setAuthor(`${current.date}の${current.observationpoint}の天気`) 
                .setThumbnail(current.imageUrl)  
                .addField('温度',`${current.temperature}℃`)
                .addField('体感温度', `${current.feelslike}℃`)
                .addField('風',current.winddisplay)
                .addField('湿度', `${current.humidity}%`);
            message.channel.send(embed);
              });
}