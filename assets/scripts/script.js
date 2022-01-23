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
var forecastHumidity = document.querySelectorAll(".forecast-temp")


// Get current weather data for selected city
function getCurrentWeather() {
    // TODO: Retest when API key is activated
    // TODO: Validate that city is not required
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentWeather = data
            // TODO: Add icon field
            currentIcon.textContent = data.weather[0].icon
            currentTemp.textContent = "Temperature: " + data.main.temp + "F";
            currentWind.textContent = "Wind: " + data.wind.speed + "MPH";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            // UV data requires OneCallAPI
            // currentUvIndex.textContent = "UV Index: " + data.main.uv;
        })
}


// Get forecasted weather data for selected city
// TODO: To finish
function getForecastedWeather() {
    // var requestURL = "api.openweathermap.org/data/2.5/forecast/daily?q=" + chosenCity + "&appid=" + APIkey;

    // Set data on forecasted weather cards
    for (i = 0; i < forecastedDate.length; i++) {
        forecastedDate[i].textContent = moment().add('days', i).format("DD-MM-YYYY");
    }


    // fetch(requestURL)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data)
    //         forecastedWeather = data;
    //         console.log("Forecasted data: " + data)
    //         forecastIcon.textContent = "Icon here";
    //         forecastTemp.textContent = "Temp here";
    //         forecastWind.textContent = "Wind here";
    //         forecastHumidity.textContent = "Wind here";

            // TODO: Loop through data and set content for 5 days

            // TODO: Add icon field
            // TODO: Set content of forecasted temperature element
            // TODO: Set content of forecasted wind element
            // TODO: Set content of forecasted humidity element
        // })
}


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
    getForecastedWeather();
})


// Figure out what city was clicked on then call the function to get and render the data
citySearchList.addEventListener("click", function(event) {
    event.preventDefault();

    var citySearchItem = event.target;
    chosenCity = citySearchItem.getAttribute("id");

    // Render name of city on the page
    cityName.textContent = chosenCity;

    getCurrentWeather(); 
    getForecastedWeather();  
})


