const citySearch = document.querySelector(".city-search");
const searchBtn = document.querySelector(".search-btn");
const API_KEY = "e50f769b7643f8271e8fbea05e829700";
const currentWeatherCard = document.querySelector(".current-weather");
const weatherCards = document.querySelector(".day-cards");



// function to create the day cards based on the information given by API 
const createDayCard = (pickedCity, weatherItem, index) => {

    if (index === 0) {
        return `<div class="details">
    <h2> ${pickedCity} (${weatherItem.dt_txt.split(' ')[0]})</h2>
    <h4>Temperature: ${(weatherItem.main.temp - 273.1)}°F</h4>
    <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
</div>`;
    } else {
        return `<li class="card">
    <h3>(${weatherItem.dt_txt.split(' ')[0]})</h3>
    <h4>Temperature: ${(weatherItem.main.temp - 273.1)}°F</h4>
    <h4>Wind: ${weatherItem.wind.speed} MPH</h4>
    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
</li>`
    }
}



//   function to get city location information 

const getWeatherInfo = (pickedCity, lat, lon) => {
    const FORECAST_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(FORECAST_API).then(res => res.json()).then(data => {
        const ForecastDays = [];
        console.log(data);

        const five_day_forecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt.text).getDate();
              ForecastDays.push(forecastDate);
         //if (ForecastDays.includes(forecastDate)) {
         //       return 
         //   }
        });
        citySearch.value = "";
        //weatherCards.innerHTML = "";
        //currentWeatherCard.innerHTML = "";


            // telling to put the information in every card that matches 
            console.log("five day forecast: ", five_day_forecast); 
        five_day_forecast.forEach(weatherItem => {
            weatherCards.appendChild(createDayCard(weatherItem));
            if (index === 0) {
                currentWeatherCard.appendChild(createDayCard(pickedCity, weatherItem, index));
                console.log("Weather Item: ", createDayCard(weatherItem));
                console.log("Picked City:", createDayCard(pickedCity, weatherItem, index));
            } else {
                weatherCards.appendChild(createDayCard(pickedCity, weatherItem, index));
                console.log("2:", createDayCard(pickedCity, weatherItem, index));
            }

        });


    }).catch(() => {
        alert("An error occured while finding the location");
    });
}
// get the city input from the user 
const getCity = () => {
    const pickedCity = citySearch.value.trim();
    if (!pickedCity) {
        return;
    };
    console.log(pickedCity);
    const GEO_API = `http://api.openweathermap.org/geo/1.0/direct?q=${pickedCity}&limit=5&appid=${API_KEY}`;
    fetch(GEO_API).then(res => res.json()).then(data => {
        if (!data.length) return alert(`No location found for ${pickedCity}`);
        const { name, lat, lon } = data[0];
         getWeatherInfo(name, lat, lon)
    }).catch(() => {
        alert("An error occured while finding the location");

    });
};



searchBtn.addEventListener("click", getCity);