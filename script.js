var key = c4ecf65965484e1b885ed4c23e413d46;
var weatherInfo = $("#weather-info");


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


$(document).on("submit", function (event) {
    event.preventDefault();

    var city = searchCityInput.val().trim();

    currentConditionsRequest(seachValue);
    searchHistoryList(searchValue);
    searchCityInput.val("");

});

searchCityButton.on("click", function (event) {
    event.preventDefault();

    var searchValue = searchCityInput.val().trim();

    currentConditionsRequest(searchValue);
    searchHistoryList(searchValue);
    searchCityInput.val("");

});

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
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + key + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("<p>" + response.weather[0].description + "</p>");
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + " MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;    

        $.ajax({
            url: uvQueryURL,
            method: "GET"

        }).then(function (response) {

            console.log(response);
            currentUVIndex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "," + countryCode + "&appid=" + key + "&units=imperial";

        $.ajax({
            url: forecastQueryURL,
            method: "GET"


        }).then(function (response) {

            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = i; i < response.list.length; i+=8) {

                var forecastDataString = moment(response.list[i].dt_txt).format("MM/DD/YYYY");
                console.log(forecastDataString);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");

                var forecastCard = $("<div>").addClass("card bg-primary text-white");   
                var forecastCardBody = $("<div>").addClass("card-body p-2");
                var forecastDate = $("<h5>").addClass("card-title").text(forecastDataString);
                var forecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                var forecastTemp = $("<p>").addClass("card-text forecast-temp").text("Temp: " + response.list[i].main.temp + " °F");    
                var forecastHumidity = $("<p>").addClass("card-text forecast-humidity").text("Humidity: " + response.list[i].main.humidity + "%");

                $("#five-day-forecast").append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);

                forecastIcon.attr("style", "height: 50px; width: 50px");
                forecastIcon.attr("alt", "weather icon");
                forecastCardBody.attr("style", "background-color: blue");
                forecastCardBody.attr("style", "color: white");
                forecastCardBody.attr("style", "border-radius: 5px");
                forecastCardBody.attr("style", "margin: 5px");
            }

        });
    });
}

function searchHistoryList(searchValue) {







    if (city) {
        getWeather(city);
        searchCityInput.val("");
    }
}





