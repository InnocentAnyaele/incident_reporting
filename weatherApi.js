const request = require('request')

const getWeatherReport = (city) => {
    return new Promise(function (resolve, reject) {
// to get weather data, we must first get the latitude and longitude from the geolocationapi using the city provided
    let geoLocationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.APIKEY}` 
    
    request(geoLocationApi, {json: true}, (err, response, body) => {
        if (err) {
            reject('Could not retrieve geolocation data at this time')
            // return res.status(500).send("Could not retrieve geolocation data at this time")
        }
        if (body.length < 1) {
            return res.status(500).send("Invalid city")
        }
            console.log(response.statusCode)
            console.log(body)

            let lat = body[0].lat 
            let lon = body[0].lon 
            
            // get weather report using latitude and longitude from geolocation
                    let weatherApi =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.APIKEY}`
                    request(weatherApi, {json: true}, (err, response, body) => {
                        if (err) {
                            reject('Could not retrieve weather data at this time')
                            // return res.status(500).send("Could not retrieve weather data at this time")
                        }
                        let weather_report = body.weather[0]
                        resolve (weather_report)       
                    })

    })
    })
}

module.exports = getWeatherReport
