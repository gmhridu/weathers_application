const apiKey = "7cb122e70b9998a13408629d1da6489c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Function to get weather by coordinates
async function getWeatherByCoordinates(lat, lon) {
  try {
    const response = await fetch(
      `${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
  }
}

// Function to get weather by city name
async function getWeatherByCity(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather by city:", error);
    displayError();
  }
}

// Function to display weather details
function displayWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

const weatherIcon = document.querySelector(".weather-icon");
weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

}

// Function to display error message
function displayError() {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

// Event listener for search button
const searchBtn = document.querySelector(".search button");
const searchBox = document.querySelector(".search input");
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

// Function to handle search when Enter key is pressed
function handleSearch(event) {
  if (event.key === 'Enter') {
    const city = searchBox.value.trim();
    if (city) {
      getWeatherByCity(city);
    }
  }
}

// Event listener for keydown on search input
searchBox.addEventListener('keydown', handleSearch);

// Get user's current location
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // document.getElementById(
    //   "location"
    // ).innerHTML= `Latitude: ${latitude}, Longitude: ${longitude}`;
    getWeatherByCoordinates(latitude, longitude);
  },
  (error) => {
    console.error("Error getting location:", error);
    displayError();
  }
);




