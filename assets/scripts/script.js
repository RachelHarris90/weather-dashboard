var APIkey = '588bf8445920a98ea52c44b062c393e0';

var typedCity = document.querySelector("#entered-city")
var enteredCity

var citySearchList = document.querySelector(".city-search-list")
var citySearchItem = document.querySelector(".list-group-item")
var selectedCity

var cityManualSearch = document.querySelector("#search-button")

// Get weather data for selected city
// TODO: pass in selected city name
function getWeatherSelected() {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + selectedCity + "&appid=" + APIkey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data)
        })
}

citySearchList.addEventListener("click", function(event) {
    event.preventDefault();
    var clickedCity = event.target;
    selectedCity = clickedCity.getAttribute("id");
    getWeatherData();
})

function getWeatherEntered() {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + enteredCity + "&appid=" + APIkey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data)
        })
}

cityManualSearch.addEventListener("click", function(event) {
    event.preventDefault();
    enteredCity = typedCity.value;
    console.log(enteredCity);
    getWeatherEntered();
})

// Loop through returned data and render on the page