var APIkey ="c4ecf65965484e1b885ed4c23e413d46";
var API_key = "c4ecf65965484e1b885ed4c23e413d46";
const API_KEY = "c4ecf65965484e1b885ed4c23e413d46";
var weatherContent = $("#weather-content");


var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var currentUVIndex = $("#current-uv-index");

// var temp;
// var weather;
// var icon;
// var humidity;
// var wind;

var searchHistoryList = $("#search-history-list");
var searchCityInput = $("#search-city-input");
var searchCityButton = $("#search-city-button");
var currentCity = $("#current-city");


var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var currentUVIndex = $("#current-uv-index");

var clearHistoryButton = $("#clear-history-button");

var weatherForecast = $("#weather-forecast");

var cityList = [];

var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

// var currentDate = moment().format("MM/DD/YYYY");
// $("#current-date").text("(" + currentDate + ")");

initailizeHistory();
showClear();


$(document).on("submit", function (event) {
    event.preventDefault();

    var city = searchCityInput.val().trim();

    currentConditionsRequest(seachValue);
    searchHistoryList(searchValue);
    searchCityInput.val("");

});

// searchCityButton.on("click", function (event) {
//     event.preventDefault();

// const API_key = "c4ecf65965484e1b885ed4c23e413d46";

const cityInput = document.querySelector("#search-city-input");

const getWeatherDetails = (cityName, lat, lon) => {
    const CURRENT_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_key}`;
    fetch(CURRENT_WEATHER_API_URL).then(res => res.json()).then(data => {
        console.log(data);
    }).catch(err => {
        console.error(err);
    });
}

const getCityCoordinates =() => {
    const cityName = cityInput.value.trim();
    if (cityName) return;

    // console.log(cityName);

    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json() ).then(data => {
    //     console.log(data);
    // }).catch(err => {
    //     console.error(err);
    // });
        if (data.length) return alert("No city found");
        
        const {name, lat, lon} = data[0];
        getWeatherDetails(name,lat,lon);
    });
        getCityCoordinates(cityName);
    } 
    
// searchCityButton.addEventListener("click", getCityCoordinates);

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistoryList(searchValue);
    searchCityInput.val("");




clearHistoryButton.on("click", function (event) {

    cityList = [];
    listArray();

    $(this).addClass("hide");

});

searchHistoryList.on("click", "li.city-btn", function (event) {
    event.preventDefault();
    var value = $(this).data(value);
    currentConditionsRequest(value);
    searchHistoryList(value);

});

function currentConditionsRequest(searchValue) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + API_key + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        currentCity.text(response.name);
        // currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("img src='https://openweathermap.org/img/w/" + response.weather[0].description +'>")');
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + " MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon;    

        $.ajax({
            url: uvURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);
            currentUVIndex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "," + countryCode + "&appid=" + API_key + "&units=imperial";

        $.ajax({
            url: forecastURL,
            method: "GET"


        }).then(function (response) {

            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {

                var forecastDataString = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDataString);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");

                var forecastCard = $("<div class='card'>");   
                var forecastCardBody = $("<div> class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");    
                var forecastHumidity = $("<p class='card-text mb-0>");

                $("#five-day-forecast").append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);

                forecastIcon.attr("src", "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}");

                // forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main);
                forecastDate.text(forecastDataString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
                forecastCardBody.attr("style", "background-color: darkgreen");
                forecastCardBody.attr("style", "color: white");
                forecastCardBody.attr("style", "border-radius: 5px");
                forecastCardBody.attr("style", "margin: 5px");
            }

        });
    });
}

function searchHistoryList(searchValue) {
    if (searchValue) {
        if (cityList.indexOf(searchValue) === -1) {
            cityList.push(searchValue);


            localStorage.setItem("cityList", JSON.stringify(cityList));
            listArray();
            clearHistoryButton.removeClass("hide");
            weatherContent.removeClass("hide");

        } else {
            var removeIndex = cityList.indexOf(searchValue);
            cityList.splice(removeIndex, 1);
            cityList.push(searchValue);

            listArray();
            clearHistoryButton.removeClass("hide");
            weatherContent.removeClass("hide");
        }
        }
    }

    function listArray() {
        searchHistoryList.empty();
        cityList.forEach(function (city) {
            var searchHistoryItem = $("<li class='list-group-item city-btn'>");
            searchhistoryItem.attr("data-value", city);
            searchHistoryItem.text(city);
            searchHistoryList.prepend(searchHistoryItem);
        }
        );

    localStorage.setItem("cities", JSON.stringify(cityList));
}

function initailizeHistory() {
    if (localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
        listArray();
        if (cityList.length > 0) {
            currentConditionsRequest(cityList[lastIndex]);
            weatherContent.removeClass("hide");
        }
    }
}

function showClear() {
    if (searchHistoryList.text() !== "") {
        clearHistoryButton.removeClass("hide");
    }
}


        
    






   




