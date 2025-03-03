 const apiKey="94d72278382e31ea1f58c4fbeedfe3dc";
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(City){
        const response = await fetch(apiUrl + City + `&appid=${apiKey}`);
        if (response.status == 404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }else{ 
            var data = await response.json();

        document.querySelector(".City").innerHTML = data.name;
        document.querySelector(".Temperature").innerHTML =  Math.round(data.main.temp) + "°C";
        document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src="images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src="images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src="images/rain.png";
        }
         else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src="images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src="images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src="images/snow.png";
        }
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }    
    }
    searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
 });    
 searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value);
        }
    });
