
const history = JSON.parse(localStorage.getItem('history')) || [];
const apiKey = '996513822471b1a94113e31bc557ef81';

const userInput = $('#search-input').val();

$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const userInput = $('#search-input').val();

    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;

    history.push(userInput);
    
    localStorage.setItem('history', JSON.stringify(history));

    $.ajax({ url: queryUrl })
    .then(function(response) {
        console.log(response);

    const lat = response[0].lat;
    const lon = response[0].lon;

    console.log(lat, lon);

    const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

    $.ajax({ url: weatherQueryUrl })
    .then(function(weatherResponse) {
        //Icon URL --> "http://openweathermap.org/img/w/" + iconcode + ".png"
        console.log(weatherResponse);

        const weatherList = weatherResponse.list;

        const today = weatherList[0]
        const todayTimeStamp = today.dt;
        console.log(today);

        for (let i = 1; i < weatherList.length; i += 8) {

            const weather = weatherList[i];
            const timestamp = weather.dt;
            console.log(weather);

        }
    });

    });

});

//ToDo
// 1 prepend the value to the list container
// 2 put today's weather in container---> today's weather
// 3 put 5 days forecast weather in container for the forecast
// 4 style HTML