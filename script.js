var key = c4ecf65965484e1b885ed4c23e413d46;
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

var currentDate = moment().format("MM/DD/YYYY");
$("#current-date").text("(" + currentDate + ")");

initailize();
showClearHistoryButton();






$(document).ready(function() {
    $("#search-btn").click(function() {
        var searchTerm = $("#searchTerm").val();
        $("searchValue").val("");
        weatherFunction(searchTerm);
        weatherForecast(searchTerm);
    });
   
});

$(document).ready(function() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=" + key, function(data) {
        console.log(data);
        temp = data.main.temp;
        weather = data.weather[0].main;
        icon = data.weather[0].icon;
        humidity = data.main.humidity;
        wind = data.wind.speed;
        $("#temp").html(temp + "°C");
        $("#weather").html(weather);
        $("#icon").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
        $("#humidity").html(humidity + "%");
        $("#wind").html(wind + "m/s");
    });
    });

