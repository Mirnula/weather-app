let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let todayDate = document.querySelector(".todayDate");

todayDate.innerHTML = ` ${day}, ${hour}:${minutes} `;

function getCityTemp(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temperature = document.querySelector(".temperature");
  let myTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${myTemp}`;
  let description = document.querySelector(".description");
  let weatherDescription = response.data.weather[0].main;
  description.innerHTML = `${weatherDescription}`;
  let humidity = document.querySelector("#humidity");
  let getHumidity = response.data.main.humidity;
  humidity.innerHTML = `${getHumidity}`;
  let wind = document.querySelector("#wind");
  let getWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${getWind}`;
}
function searchCity(cityName) {
  let apiKey = `0163abee892c1733e53a43b6a0e7908a`;
  let apiBeggining = `https://api.openweathermap.org/data/2.5/weather?`;
  let unit = `metric`;
  let apiUrl = `${apiBeggining}q=${cityName}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(getCityTemp);
}

function submitCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city-input").value;
  searchCity(cityName);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

searchCity("Athens");

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `0163abee892c1733e53a43b6a0e7908a`;
  let apiBeggining = `https://api.openweathermap.org/data/2.5/weather?`;
  let unit = `metric`;
  let apiUrl = `${apiBeggining}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(getCityTemp);
}

function displayCurrentWeather(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currenButton = document.querySelector("#currentButton");
currenButton.addEventListener("click", displayCurrentWeather);
