let latitude, longitude;
const button = document.querySelector('#button');

const getPosition = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            let latitude, longitude, weather, air;
            latitude = position.coords.latitude.toFixed(2);
            longitude = position.coords.longitude.toFixed(2);
            document.getElementById('latitude').textContent = latitude;
            document.getElementById('longitude').textContent = longitude;
            const api_url = `weather/${latitude},${longitude}`;
            const response = await fetch(api_url);
            const json = await response.json();
            weather = json.weather.currently;

            document.getElementById('summary').textContent = weather.summary;
            document.getElementById('temperature').textContent = weather.temperature;
            try {
                air = json.air_quality.results[0].measurements[0];
                document.getElementById('aq_parameter').textContent = air.parameter;
                document.getElementById('aq_value').textContent = air.value;
                document.getElementById('aq_units').textContent = air.unit;
                document.getElementById('aq_date').textContent = air.lastUpdated;
                // console.log(json);
            } catch (error) {
                console.log(error);
                air = {value: -1};
                document.getElementById('aq_value').textContent = 'NO READING!';
            }
            const data = { latitude, longitude, weather, air };
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            // console.log(db_json);
        });
    } else {
        console.log('geolocation not available.')
    }
};

getPosition();






