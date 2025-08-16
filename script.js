const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperatur = document.querySelector('.temp');
const disc = document.querySelector('.disc');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){  //async is a KeyWord use to show the function is Asynchronus :: Means Function turant khatam nahi hoga, Andar ka kuch ka kaam(Like API se data Lena) thoda time le sakta hai iss Liye "await" keyword ka bhi use karete hai. 
    const api_key = "4f2804c18a47519d1752897ca3d6a1c1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weather_data = await fetch(`${url}`).then(Response => Response.json()); // fetch() function API se Data lene ke liye hota hai
    //await :: Means Ruko jab tak data na mil jaaye
    //ye promis return karta hai jise hum .then se handle karte hai
    // .then((response) => response.json()) :: Raw data ko Json format me badlta hai(so we can use it as Object)

    if(weather_data.cod == 404){
       location_not_found.style.display = "flex";
       weather_body.style.display = "none";
        console.log("Error");
        return;
    }


    console.log(weather_data);

    location_not_found.style.display = 'none';
    weather_body.style.display = "flex";

    temperatur.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    disc.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png"
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png"
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png"
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png"
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png"
            break;
        // case 'Clouds':
        //     weather_img.src = "/assets/cloud.png"
        //     break;
    }
}



searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});