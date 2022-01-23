var APIkey = '588bf8445920a98ea52c44b062c393e0';

// Search/select city elemenets
var typedCity = document.querySelector("#entered-city")
var citySearchList = document.querySelector(".city-search-list")
var citySearchItem = document.querySelector(".list-group-item")
var chosenCity
var cityManualSearchBtn = document.querySelector("#search-button")

// Saved cities
var savedCities = []

// Current weather list
var currentIcon = document.querySelector("#current-icon")
var currentTemp = document.querySelector("#current-temperature")
var currentWind = document.querySelector("#current-wind")
var currentHumidity = document.querySelector("#current-humidity")
var currentUvIndex = document.querySelector("#current-uv-index")

// Arrays for returned API data
var currentWeather = []
var forecastedWeather = []

// Header city and date
var cityName = document.querySelector("#city-name")
var currentDate = document.querySelector("#current-date")
currentDate.textContent = moment().format("DD-MM-YYYY");

// Forecasted weather card elements
var forecastedDate = document.querySelectorAll(".date")
var forecastIcon = document.querySelectorAll(".forecast-icon")
var forecastTemp = document.querySelectorAll(".forecast-temp")
var forecastWind = document.querySelectorAll(".forecast-wind")
var forecastHumidity = document.querySelectorAll(".forecast-humidity")

function getSavedCities() {
    savedCities = JSON.parse(localStorage.getItem("savedCities"));
}

// Get current weather data for selected city
function getCurrentWeather() {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    //Get data from the API
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            // Save the data into currentWeather variable
            currentWeather = data

            // Save the city, longatude and latitude to local storage
            savedCities = {
                cityName: currentWeather.name,
                currCityLon: currentWeather.coord.lon,
                currCityLat: currentWeather.coord.lat,
              };
            localStorage.setItem("savedCities", JSON.stringify(savedCities));

            // Set the content of the page from the API data
            currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + ".png");
            currentTemp.textContent = "Temperature: " + currentWeather.main.temp + "F";
            currentWind.textContent = "Wind: " + currentWeather.wind.speed + "MPH";
            currentHumidity.textContent = "Humidity: " + currentWeather.main.humidity + "%";
            // TODO: UV data requires OneCallAPI
            // 

            // Now that we have saved the city, longatude and latitude to local storage, we can get the forecasted weather
            getForecastedWeather();
        })
}


// Get forecasted weather data for selected city
// TODO: To finish
function getForecastedWeather() {
    // Get the longatude and latitude from local storage
    var savedCities = JSON.parse(localStorage.getItem("savedCities"));
    var currCityLat = savedCities.currCityLat
    console.log(currCityLat)
    var currCityLon = savedCities.currCityLon
    console.log(currCityLon)

    // 
    var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currCityLat + "&lon=" + currCityLon + "&appid=" + APIkey;

    // Set data on forecasted weather cards
    fetch(forecastWeatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Save forecast data to variable
            forecastedWeather = data;
            console.log(forecastedWeather)

            // Set today's UV index
            currentUvIndex.textContent = "UV Index: " + forecastedWeather.current.uvi;

            // Loop through to set the date and cooresponding forecast data
            for (i = 0; i < forecastedDate.length; i++) {
                forecastedDate[i].textContent = moment().add('days', i+1).format("DD-MM-YYYY");
                forecastedDate[i].setAttribute("id", forecastedWeather.daily[i].dt); 

                forecastIcon[i].setAttribute("src", "http://openweathermap.org/img/wn/" + forecastedWeather.daily[i].weather[0].icon + ".png");
                forecastTemp[i].textContent = "Temperature: " + forecastedWeather.daily[i].temp.day +  "F";
                forecastWind[i].textContent = "Wind: " + forecastedWeather.daily[i].wind_speed + "MPH";
                forecastHumidity[i].textContent = "Humidity: " + forecastedWeather.daily[i].humidity + "%";
        }
})}


// Figure out what city has been entered in the search input then call the function to get and render the data
cityManualSearchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Set variable based on what was entered
    chosenCity = typedCity.value;
    console.log(chosenCity);

    // Save name of city to list
    var li = document.createElement("li")
    li.setAttribute("class", "list-group-item")
    li.setAttribute("id", chosenCity)
    li.setAttribute("type", "button")
    li.textContent = chosenCity;
    citySearchList.appendChild(li);

    // Render name of city on the page
    cityName.textContent = chosenCity

    getCurrentWeather();
})


// Figure out what city was clicked on then call the function to get and render the data
citySearchList.addEventListener("click", function(event) {
    event.preventDefault();

    var citySearchItem = event.target;
    chosenCity = citySearchItem.getAttribute("id");

    // Render name of city on the page
    cityName.textContent = chosenCity;

    getCurrentWeather();  
})


