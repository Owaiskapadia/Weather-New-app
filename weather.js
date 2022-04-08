
// Initializing the variables
let description= document.getElementById('description')
let src = document.getElementById("Src");
let search = document.getElementById("search");
let temperature = document.getElementById("temperature");
let speed = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let city = document.getElementById("city");
let container = document.querySelector(".container");
let apiKey = "3d3744059bac79f42495c1780f984a6d";
let feels= document.getElementById('feels')

// Function for getting current Location of the user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    city.innerText = "LOADING.....";
  }
}
// Callback Function of currentLocation 
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let data2 = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      add(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Function to add weather data content in the Card
const add = function (data) {
  console.log(data.weather[0].main);
  city.innerText = `Weather in ${data.name}`;
  temperature.innerText = `Temperature: ${parseInt(data.main.temp - 273)}°C`;
  feels.innerText = `Feels : ${parseInt(data.main.feels_like - 273)}°C`;
  description.innerText= `Descriptions: ${data.weather[0].main}`
  humidity.innerText = `Humidity: ${data.main.humidity}% `;
  speed.innerText = `Wind Speed: ${data.wind.speed} km/h`;
  container.style.backgroundImage = `url(https://source.unsplash.com/random/?${data.weather[0].main})`;
  console.log(container);
};

// Event Listener to get the current locations weather 
window.addEventListener("load", getLocation());

// Event Listener to get the required city's Weather
src.addEventListener("click", function () {
  let data1 = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=3d3744059bac79f42495c1780f984a6d`
  ).then((response) => 
  response.json()).then((data) =>
   {
      add(data);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
});
