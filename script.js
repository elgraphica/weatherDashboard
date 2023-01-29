// 1. style HTML
// 2. trigger geocoding api when searching to find LAT and LON
// 3. call 5 day weather API after we have city LAT and LON value
// 4. put the response in HTML
// 5. put todays weather in container for todays weather
// 6. put 5 day focast weather in container for the forecast
// 7. add the input to local storage
// 8. populate history list from local storage when page loads

// .val() => get if no parameter passed e.g val()
//        => set if 1 parameter passed e.g val('input')

const apiKey = '996513822471b1a94113e31bc557ef81';

const userInput = $('#search-input').val();

$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const userInput = $('#search-input').val();

    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=&appid=' + apiKey;

    $.ajax({ url: queryUrl })
    .then(function(response) {
        console.log(response);

    const lat = response[0].lat;
    const lon = response[0].lon;

    console.log(lat, lon);

    const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

    $.ajax({ url: weatherQueryUrl })
    .then(function(weatherResponse) {
        console.log(weatherResponse);
    });

    });

});