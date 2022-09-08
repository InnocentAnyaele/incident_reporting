// query to get all incidents
const getAllIncidents = "SELECT * FROM incidents"

// query to create incident table
const createIncidentTable = "CREATE TABLE incidents ( id SERIAL PRIMARY KEY, client_id INT, incident_desc TEXT, city VARCHAR(255), country VARCHAR(255), date DATE,weather_report JSON)"

// query to post incident to database
const postIncident = "INSERT INTO incidents (client_id, incident_desc, city, country, date, weather_report) VALUES ($1, $2, $3, $4, $5, $6)"


// INSERT INTO incidents (client_id, incident_desc, city, country, date, weather_report) VALUES (1, 'this is a test incident desc', 'Accra', 'Ghana', '2000-07-22', '[{"data": "this is test data"}]')


module.exports = {
    getAllIncidents, createIncidentTable, postIncident
}