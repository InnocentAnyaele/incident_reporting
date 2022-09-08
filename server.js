const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const client = require('./database')
const controller = require('./controller')

client.connect(function(err) {
    if (err) throw err
    console.log('Connected')
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send("<p>This is an incident reporting service</p> <p> <b> '/api/getAllIncidents/' </b>to view all incidents. </p> <p> <b> '/api/postIncident/' </b> to post incident. (body -> client_id, incident_desc, city, country) </p>")
})

app.post('/api/postIncident/', controller.postIncident)
app.get('/api/getAllIncidents/', controller.getALLIncidents)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})