# weather_air_quality_api
## Description
A weather and air quality small app, that works with geolocation, 2 apis , a node.js server and an internal database.

## Motivation
This app is to exercise the use of a node.js server, which can get information from third party APIs, display it in the browser and post it in a database. Also,it is very useful to use such a server to hide api_keys, which can sometimes be confidential, not exposing them in the source code.

## Technologies used
* [Node.js server](https://nodejs.org/en/)
* [Express (Node.js framework)](https://expressjs.com/)
* [NEDB (database)](https://www.npmjs.com/package/nedb)
* [Node-Fetch (for the fetch function)](https://www.npmjs.com/package/node-fetch)
* [Dotenv - (for environment variables, to hide the api key)](https://www.npmjs.com/package/dotenv)
* [NPM (to install the packages and run the start command)](https://www.npmjs.com/)
* [Leaflet (to render the map)](https://leafletjs.com/)
* [Dark Sky API](https://darksky.net/dev)
* [Open AQ](https://openaq.org/#/?_k=d2ir92)

## Future Features
* improve graphic design
* refactor code to be more modular
* improve documentation