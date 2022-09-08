const getAllIncidents = "SELECT * FROM incidents"

const createIncidentTable = "CREATE TABLE incidents ( id SERIAL PRIMARY KEY, client_id INT, incident_desc TEXT, city VARCHAR(255), country VARCHAR(255), date DATE,weather_report JSON)"

const postIncident = "INSERT INTO incidents (client_id, incident_desc, city, country, date, weather_report) VALUES ($1, $2, $3, $4 $5 $6)"

module.exports = {
    getAllIncidents, createIncidentTable, postIncident
}