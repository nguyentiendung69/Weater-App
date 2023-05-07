const apikey = "91f827737de3a965bef13f26a864b5b1";
const $$ = document.querySelector.bind(document);

const weatherData = $$('#weather-data');
const cityInput = $$('#city-input');
const form = $$('form');

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
})
async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response was not oke");
        }

        const data = await response.json();
        console.log(data)

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const feel = data.main.feels_like;
        const humidity = data.main.humidity;
        const windspeed = data.wind.speed;
        const details = [
            `Feels like: ${feel}`,
            `Humidity: ${humidity}`,
            `Wind speed: ${windspeed}`,
        ]

        weatherData.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        weatherData.querySelector('.temperature').textContent = `${temperature}°C`;
        weatherData.querySelector('.description').textContent = description;
        weatherData.querySelector('.details').innerHTML = details.map((detail)=>
            `<div>${detail}</div>`
    ).join("");

    } catch (error) {
        weatherDataEl.querySelector('.icon').innerHTML = "";
        weatherDataEl.querySelector('.temperature').textContent = "";
        weatherDataEl.querySelector('.description').textContent = "An error happend, please truy again";
        weatherDataEl.querySelector('.details').innerHTML = "";
    }
}