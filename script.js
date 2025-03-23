// script.js
const apiKey = "94d72278382e31ea1f58c4fbeedfe3dc"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card"); // Get the card element
const weatherDiv = document.querySelector(".weather"); // Get the weather div
const errorDiv = document.querySelector(".error");
const backgroundContainer = document.querySelector(".background-container");

// Function to show the weather
function showWeather() {
    card.classList.add("show-weather");
}

// Function to hide the weather
function hideWeather() {
    card.classList.remove("show-weather");
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
        hideWeather(); // Hide the weather on error
    } else {
        var data = await response.json();

        document.querySelector(".City").innerHTML = data.name;
        document.querySelector(".Temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "images/thunder.png";
        }

        weatherDiv.style.display = "block";
        errorDiv.style.display = "none";
        showWeather(); // Show the weather on success

        // Get the main weather condition from the API response
        const weatherCondition = data.weather[0].main;

        // Update the background
        updateBackground(weatherCondition);
    }
}

function updateBackground(weatherCondition) {
    // Get the appropriate background URL from the mapping
    const backgroundUrl = weatherBackgrounds[weatherCondition] || weatherBackgrounds["default"];

    // Set the background image
    backgroundContainer.style.backgroundImage = `url(${backgroundUrl})`;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

const weatherBackgrounds = {
    "Clear": "images/clearsky.jpg", // Replace with your GIF URLs
    "Clouds": "images/cloudy.gif",
    "Rain": "images/rainy.gif",
    "Drizzle": "images/drizzle.gif", // You can use the same for similar conditions
    "Snow": "images/snowing.gif",
    "Thunderstorm": "images/thunderstorm.gif",
    "Mist": "images/mist.gif",
    // Add more as needed
    "default": "images/default.gif" // Default if no match
};

// Initially hide the weather
hideWeather();
