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
    res.send('This is an incident reporting service')
})

app.post('/api/postIncident/', controller.postIncident)
app.get('/api/getAllIncidents/', controller.getALLIncidents)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})