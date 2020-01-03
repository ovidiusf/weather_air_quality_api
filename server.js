// Importing variables from node_modules
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

// starting the express server
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Starting server at port ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// loading the database
const database = new Datastore('database.db');
database.loadDatabase();

// GET request to receive the data from the internal DB
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

// POST Request to DB
app.post('/api', (request, response) => {
    // console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

// GET Request to receive the data from the 2 APIs
app.get('/weather/:latitudelongitude', async (request, response) => {
    const latlon = request.params.latitudelongitude.split(',');
    const latitude = latlon[0];
    const longitude = latlon[1];
    const api_key = process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${latitude},${longitude}/?units=si`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${latitude},${longitude}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    const final_data = {
        weather: weather_data,
        air_quality: aq_data
    };
    response.json(final_data);
});





