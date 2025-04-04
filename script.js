const cityInput = document.getElementById('cityInpt');
const temperatureMain = document.getElementById("temp");
const description = document.getElementById("description");
const imageMain = document.getElementById("image-main");

const API_KEY = '3d5ef43d79b14d1d887131525252503'

const weatherCodes = {
clear: [1000],
clouds: [1003, 1006, 1009],
mist: [1030, 1135, 1147],
rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
moderate_heavy_rain: [1186, 118, 1192, 1195, 1243, 1246],
snow: [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252,
1255, 1258, 1261, 1264, 1279, 1282],
thunder: [1087, 1279, 1282],
thunder_rain: [1273, 1276],
}

const getWeatherDetails = async (cityName) => {
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`;
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const current = {
            temp: data.current.temp_c,
            message: data.current.condition.text,
            image: Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code))
        }
        console.log(data);
        
        return current
        
    } catch (error) {
        console.error(error)
    }
}

cityInput.addEventListener("keyup", async  (e) => {
    const cityName = cityInput.value.trim().toUpperCase()
    if(e.key == 'Enter' && cityName){
        const atual = await getWeatherDetails(cityName);

        temperatureMain.textContent = `${atual.temp}`
        description.textContent = atual.message
        imageMain.src = `./assets/icons/${atual.image}.svg`
    }
})