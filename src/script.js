//display the current day, date and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours().toString();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes().toString();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDay = document.querySelector("#current-date");
function currentDate() {
  let fullDate = `${day}, ${date} of ${month} ${hours}:${minutes}`;
  return fullDate;
}
currentDay.innerHTML = currentDate();

//Current Weather Engine
const apiKey = "0022112d7af3f4e205706c3973aa66eb";
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchManual(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchManual);

search("Odesa");

//Weather according to my GEO
function showWeather(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute("src", `icons/${response.data.weather[0].icon}.svg`);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Engine to convert temperature to °F and backward
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

//FORECAST
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm next-days">
    <h6 class="weather-forecast-date">${formatDay(forecastDay.dt)}</h6>
   <img src="icons/${
     forecastDay.weather[0].icon
   }.svg" class="forecast-icon" id="icon" width="48" />
    <div>
    <span class="weather-forecast-temp-max">${Math.round(
      forecastDay.temp.max
    )}</span>° /
    <span class="weather-forecast-temp-min">${Math.round(
      forecastDay.temp.min
    )}</span>°
    </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}
