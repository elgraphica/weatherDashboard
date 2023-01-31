
const history = JSON.parse(localStorage.getItem('history')) || [];
const apiKey = '996513822471b1a94113e31bc557ef81';

const userInput = $('#search-input').val();

//ToDo
// 1 prepend the value to the list container
// 4 style HTML

$('#search-form').on('submit', function(event) {
    event.preventDefault();
  
    const userInput = $('#search-input').val();
  
    const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
  
    history.push(userInput);
    
    localStorage.setItem('history', JSON.stringify(history));
  
    $.ajax({ url: queryUrl })
    .then(function(response) {
      console.log(response);
  
      const lat = response[0].lat;
      const lon = response[0].lon;
  
      console.log(lat, lon);
  
      const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey


      $('#search-form').on('submit', function(event) {
        event.preventDefault();
    
        const userInput = $('#search-input').val();
    
        // Add the latest search to the history list
        $('#history-list').prepend(`<li>${userInput}</li>`);
    
        // Clear search input
        $('#search-input').val('');
    
    });
  
      $.ajax({ url: weatherQueryUrl })
      .then(function(weatherResponse) {
        //Icon URL --> "http://openweathermap.org/img/w/" + iconcode + ".png"
        console.log(weatherResponse);
  
        const weatherList = weatherResponse.list;
  
        const today = weatherList[0];
  
        const iconCode = today.weather[0].icon;
        const cityName = weatherResponse.city.name;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        const temperature = today.main.temp;
        const weatherDescription = today.weather[0].description;
        const windSpeed = today.wind.speed;
        const humidity = today.main.humidity;
  
        $('#today').html(`
          <p>City: ${cityName}</p>
          <p>Date: ${formattedDate}</p>
          <img src="${iconUrl}" alt="Weather Icon">
          <p>${weatherDescription}</p>
          <p>Temperature: ${temperature} &#8451;</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <p>Humidity: ${humidity}%</p>
        `);
  
        $('#forecast').html('');
        for (let i = 1; i < weatherList.length; i += 8) {
            const weather = weatherList[i];
            const timestamp = weather.dt;
        
            const forecastIconCode = weather.weather[0].icon;
            const forecastIconUrl = "http://openweathermap.org/img/w/" + forecastIconCode + ".png";
            const forecastTemperature = weather.main.temp;
            const forecastWeatherDescription = weather.weather[0].description;
            const forecastWindSpeed = weather.wind.speed;
            const forecastHumidity = weather.main.humidity;
            const forecastDate = new Date(timestamp * 1000);
            const forecastFormattedDate = forecastDate.toLocaleDateString();
        
            $('#forecast').append(`
                <div class="forecast-card">
                    <p>Date: ${forecastFormattedDate}</p>
                    <img src="${forecastIconUrl}" alt="Weather Icon">
                    <p>${forecastWeatherDescription}</p>
                    <p>Temperature: ${forecastTemperature} &#8451;</p>
                    <p>Wind Speed: ${forecastWindSpeed} m/s</p>
                    <p>Humidity: ${forecastHumidity}%</p>
                </div>
            `);
        }

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