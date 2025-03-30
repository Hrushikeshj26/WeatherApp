document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperatureDishplay = document.getElementById("temperature");
    const descriptionDishplay = document.getElementById("description");
    const humidityDisplay = document.getElementById("humidity");
    const windSpeedDisplay = document.getElementById("wind-speed");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "f72efddbf3815bf9593ecd847de8f97d";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;

        try{
           const weatherData = await fetchWeatherData(city);
           displayWeatherData(weatherData);
        }catch(error){
            showError()
        }


    })

    async function fetchWeatherData(city){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        console.log(typeof response);
        console.log(response);
        
        if(!response.ok) {
            console.log("Failed to fetch weather data");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        console.log(data);
        const {name, main, weather, wind} = data;
        cityName.textContent = `${name}`;
        temperatureDishplay.textContent = `Temperature : ${main.temp}°C`;
        descriptionDishplay.textContent = `Description : ${weather[0].description}`;
        humidityDisplay.textContent = `Humidity : ${main.humidity}%`;
        windSpeedDisplay.textContent = `Wind Speed : ${wind.speed} km/h`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');  
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})