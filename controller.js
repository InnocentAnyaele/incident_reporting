const pool = require('./database')
const queries = require('./queries')




const getALLIncidents = (req, res) => {
    pool.query(queries.getAllIncidents, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const postIncident = (req, res) => {
    let todaysDate = new Date()
    console.log(todaysDate)

    const {client_id, incident_desc, city, country} = req.body

    // const weatherApi = require('./weatherApi')
    weatherApi = {
        data: 'this a test object'
    }

    console.log ({
        'client_id' : client_id,
        'incident_desc' : incident_desc,
        'city': city,
        'country': country,
        'date' : todaysDate,
        'weather_report': weather_report
    })

    // pool.query(queries.postIncident, [client_id, incident_desc, city, country, todaysDate, weatherApi], (error, results) => {
    //     if (error) throw error
    //     res.status(201).send('Incident added')
    //     console.log('Incident added')
    // })
}


module.exports = {getALLIncidents, postIncident}
