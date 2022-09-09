const pool = require('./database')
const queries = require('./queries')
const request = require('request')


// returns all incidents from the database
const getALLIncidents = (req, res, next) => {
    pool.query(queries.getAllIncidents, (error, results) => {
        if (error) {
            return res.status(500).send("Couldn't retrieve incidents at this time")
        }
        return res.status(200).json(results.rows)
    })
}



// function to validate the request body
const validatePost = (client_id, incident_desc, city, country) => {
    if (typeof client_id != "number" || typeof incident_desc != "string" || typeof city != "string" || typeof country != "string") {
        return false
    }
    return true
}




// retrives weather data from api and posts incidents to the database
const postIncident = async (req, res, next) => {
    let date = new Date()

// deconstructing request body
    const {client_id, incident_desc, city, country} = req.body


    if (!validatePost(client_id, incident_desc, city, country)) {
        return res.status(500).send("Invalid input. client_id should be number. incident_desc, city, and country should be string.")
    }

// to get weather data, we must first get the latitude and longitude from the geolocationapi using the city provided
    let geoLocationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.APIKEY}` 
    
    request(geoLocationApi, {json: true}, (err, response, body) => {
        if (err) {
            return res.status(500).send("Could not retrieve geolocation data at this time")
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
                            return res.status(500).send("Could not retrieve weather data at this time")
                        }
                        let weather_report = body.weather[0]
            
                        let stored_object = {
                            'client_id' : client_id,
                            'incident_desc' : incident_desc,
                            'city': city,
                            'country': country,
                            'date' : date,
                            'weather_report': weather_report
                        }
            
                        console.log(stored_object)
            
            // insert data stored object data into postgres database
                pool.query(queries.postIncident, [stored_object.client_id, stored_object.incident_desc, stored_object.city, stored_object.country, stored_object.date, stored_object.weather_report], (error, results) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).send("Failed to post incident")
                    }
                    else {
                        return res.status(201).send('Incident added')
                    }
                    
                })
            
                    })

        
    })


}


module.exports = {getALLIncidents, postIncident, validatePost}
