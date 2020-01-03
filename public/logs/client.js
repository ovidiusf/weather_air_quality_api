// Making a map and tiles
const mymap = L.map('weather-map').setView([0, 0], 1.5);

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib3ZpZGl1ZiIsImEiOiJjazRyM2p6eTEyYW9zM21sZHdiMG41djFmIn0.Bgk2a-zI2sLPYJs7JK8AAw';

const tiles = L.tileLayer(tileUrl, {
    attribution: attribution,
    id: 'mapbox/streets-v11',
    accessToken: 'your.mapbox.access.token'
});

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        // randomized exact location of the marker to protect users
        latitude_changed = Math.round( item.latitude * 1e2 ) / 1e2 + Math.random() * 0.1;
        longitude_changed = Math.round( item.longitude * 1e2 ) / 1e2 +  Math.random() * 0.1;
        const marker = L.marker([latitude_changed, longitude_changed]).addTo(mymap);

        let txt = `The weather here at ${item.latitude}&deg;,
        ${item.longitude}&deg; is ${item.weather.summary} with
        a temperature of ${item.weather.temperature}&deg; C. `

        if (item.air.value < 0) {
            txt += "No air quality reading."
        } else {
            txt += `The concentration of
            particulate matter (${item.air.parameter}) is
            ${item.air.value} ${item.air.unit} last read on
            ${item.air.lastUpdated}`;
        }
        marker.bindPopup(txt);
    }
}

getData();

tiles.addTo(mymap);
