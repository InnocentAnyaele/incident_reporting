const pool = require('./database')
const queries = require('./queries')
const getWeatherReport = require('./weatherApi')


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
const postIncident = (req, res, next) => {
    let date = new Date()

// deconstructing request body
    const {client_id, incident_desc, city, country} = req.body

// validate the request body
    if (!validatePost(client_id, incident_desc, city, country)) {
        return res.status(500).send("Invalid input. client_id should be number. incident_desc, city, and country should be string.")
    }

    getWeatherReport(city)
    .then((response) => {
        let stored_object = {
            'client_id' : client_id,
            'incident_desc' : incident_desc,
            'city': city,
            'country': country,
            'date' : date,
            'weather_report': response}

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
    .catch((error) => {
        res.status(500).send(error)
    })



  


}


module.exports = {getALLIncidents, postIncident, validatePost}
