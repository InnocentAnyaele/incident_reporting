const request = require('request')

// to get the weather data, according to the open weather docs
// we first need to get the longitude and the latitude from the city provided
// and feed it into the weather api


const getWeatherData = (location) => {

    geoLocationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.APIKEY}` 
    // weatherApi =   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.APIKEY}`

    request(geoLocationApi, {json: true}, (err, res, body) => {
        if (err) {
            return console.log(error)
        }
        console.log(res.statusCode)
        console.log(body)
        let lat = body[0].lat
        let lon = body[0].lon
        console.log("latitude " + lat)
        console.log("longitude " + lon)

    })

   
}   

getWeatherData('london')