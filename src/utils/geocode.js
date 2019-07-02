const request = require('request')

const geocode = (address, callback) => {
    const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFydGgtIiwiYSI6ImNqd2RvN2s5YzExbjY0MG1naTBvcTR2MzkifQ.jFOHqA7zB-J4lZcMZaPVdw&limit=1'
    request({uri, json: true }, (error, response, body) => {
        if (error) {
                callback('unable to connect to location services',undefined)
        }else if(body.features.length ===0){
            callback('unable to find location.Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            })
        }
    })
}


module.exports = geocode