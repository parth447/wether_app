const request = require('request')

const forecast = (lat, lang, callback) => {
    const url = 'https://api.darksky.net/forecast/1dd6fb5f033f298fe85e139f5e252937/' + lat + ',' + lang + '?units=si'
    request({url, json: true }, (error, response, body) => {

        if(error){
            callback('unable to connect to forcast services',undefined)
        }else if(response.body.error === 0){
            callback('unable to find location.Try another search.',undefined)
        }else{
            callback(undefined,"\n" + body.daily.data[0].summary + "\n its currently " + body.currently.temperature + " degree out.There is a " +
            body.currently.precipProbability + "% chance for rain."+"\n Today's high temperature is "+body.daily.data[0].temperatureHigh +" degree, and low temperature is "
            +body.daily.data[0].temperatureLow +" degree.") 
        }
    })
    console.log(url)
}

module.exports = forecast

