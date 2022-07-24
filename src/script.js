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

//add a search engine, when searching for a city
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityTemperature);

//Current Weather Engine
const apiKey = "0022112d7af3f4e205706c3973aa66eb";

function cityTemperature(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

//Weather according to my GEO
function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let desc = document.querySelector("#description");
  let hum = document.querySelector("#humidity");
  let wi = document.querySelector("#wind");
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  city.innerHTML = `${cityName}`;
  temp.innerHTML = `${temperature}`;
  desc.innerHTML = `${description}`;
  hum.innerHTML = `Humidity: ${humidity}%`;
  wi.innerHTML = `Wind: ${wind} km/h`;
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
