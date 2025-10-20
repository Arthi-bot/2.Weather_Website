const city_name = document.getElementById("search_input");
const apiKey = "7e1533669d4d00425ee338d01f152e8e";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const search_btn = document.getElementById("search_btn");

async function weather_details(city) {
    const weather_url_fetch = await fetch(apiUrl+city+`&appid=${apiKey}`)
    const weather_data = await weather_url_fetch.json()
    console.log(weather_data)
    if(weather_data.cod == 404){
        document.getElementById("details").classList.add("inactive");
        document.getElementById("details").classList.remove("active");
        document.getElementById("error").style.display = "block"
    }
    else{
        //left container details
        document.getElementById("details").classList.add("active");
        document.getElementById("details").classList.remove("inactive");
        document.getElementById("error").style.display = "none"
        var temperature = Math.round(weather_data.main.temp)
        document.getElementById("temp_value").innerHTML = temperature + `°C`
        const min_temp = Math.round(weather_data.main.temp_min) - 3
        const max_temp = Math.round(weather_data.main.temp_max) + 6
        document.getElementById("min_max_temp").innerHTML = `
        <p class="min_temp">Min: <span id="min_temp">${min_temp}</span>°C</p>-
        <p class="max_temp">Max: <span id="max_temp">${max_temp}</span>°C</p>`
        document.getElementById("description").innerHTML = weather_data.weather[0].description
        document.getElementById("place").innerHTML = `Loction:
            <p class="city_name" id="city_name">${weather_data.name},</p>
            <p class="country_name" id="country_name">${weather_data.sys.country}.</p>
        `
        if (weather_data.weather[0].main === "Clear"){
            document.getElementById("weather_img").innerHTML = `<div class="animation">
            <img src="Assets/weather_img/sun.png" alt="sun" class="sun">  
            </div>`
        }
        if (weather_data.weather[0].main === "Clouds"){
            document.getElementById("weather_img").innerHTML = `<div class="animation">
            <img src="Assets/weather_img/cloud.png" class="cloud">
            <img src="Assets/weather_img/sun.png" class="sun">
            <img src="Assets/weather_img/clouds.png" class="clouds">      
            </div>`
        }
        if (weather_data.weather[0].main === "Drizzle"){
            document.getElementById("weather_img").innerHTML = `<div class="animation animation_rain">
            <img src="Assets/weather_img/sun.png" class="drizzle_sun">
            <img src="Assets/weather_img/cloud.png" class="drizzle_cloud">  
            <div class="rain">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_2">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_2">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_2">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
            </div>
        </div>`
        }
        if (weather_data.weather[0].main === "Rain"){
            document.getElementById("weather_img").innerHTML = `<div class="animation animation_rain">
            <img src="Assets/weather_img/cloud.png" class="cloud_rain">  
            <div class="rain_only">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_2">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_2">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_2">
                <img src="Assets/weather_img/water_drop.png" class="rain_drop_1">
            </div>
        </div>
    </div>`
        }
        if (weather_data.weather[0].main === "Thunderstorm"){
            document.getElementById("weather_img").innerHTML = `<div class="animation animation_thunder">
            <img src="Assets/weather_img/rain_cloud.png" class="thunder_cloud">  
            <div class="thunder_div">
                <img src="Assets/weather_img/bolt.png" class="thunder">
            </div>
        </div>`
        }
        if (weather_data.weather[0].main === "Snow"){
            document.getElementById("weather_img").innerHTML = `<div class="animation animation_snow">
            <img src="Assets/weather_img/cloudy.png" class="snow_cloud">  
            <div class="snow">
                <img src="Assets/weather_img/snow.png" class="snow_drop_6">
                <img src="Assets/weather_img/snow.png" class="snow_drop_1">
                <img src="Assets/weather_img/snow.png" class="snow_drop_2">
                <img src="Assets/weather_img/snow.png" class="snow_drop_3">
                <img src="Assets/weather_img/snow.png" class="snow_drop_4">
                <img src="Assets/weather_img/snow.png" class="snow_drop_5">
            </div>
        </div>`
        }
        if (weather_data.weather[0].main === "Mist" || weather_data.weather[0].main === "Smoke" ||
            weather_data.weather[0].main === "Haze" || weather_data.weather[0].main === "Dust" ||
            weather_data.weather[0].main === "Sand" || weather_data.weather[0].main === "Fog" ||
            weather_data.weather[0].main === "Volcanic ash"
        ){
            document.getElementById("weather_img").innerHTML = `<div class="animation animation_mist">
            <img src="Assets/weather_img/rain_cloud.png" class="mist_cloud">  
            <div class="Mists">
                <img src="Assets/weather_img/mist.png" class="mist">
            </div>
        </div>`
        }
        
        //right container details
        var fahrenheit_temp = temperature*9/5+32
        document.getElementById("fahrenheit_value").innerHTML = fahrenheit_temp +`°F`
        document.getElementById("Feels_like_value").innerHTML = Math.round(weather_data.main.feels_like) + `°C`
        document.getElementById("Humidity_value").innerHTML = Math.round(weather_data.main.humidity) + `%`
        document.getElementById("Wind_speed_value").innerHTML = Math.round(weather_data.wind.speed) + `km/h`
        document.getElementById("Visibility_value").innerHTML = weather_data.visibility/1000 + `km`
        document.getElementById("Pressure_value").innerHTML = weather_data.main.pressure + `hPa`
        //sunrise
        const sunrise_time = new Date((weather_data.sys.sunrise + weather_data.timezone)*1000) //multiply values from seconds to milliseconds 
        const convert_sunrise_time = sunrise_time.toUTCString() //getting universal time 
        const sunrise_parts = convert_sunrise_time.split(" "); //split that universal time [day,date,time]
        const sunrise_time_split = sunrise_parts[4].split(":"); //split that array time into [hour,minute,seconds]
        const sunrise_time_only = sunrise_time_split[0]%12 //divide that array hour by 12 cuz to get 12hrs rotation time
        const sunrise_minute = Number(sunrise_time_split[1]) + 1 //convert that array minute object into number to add 1, cuz i don't want to show seconds in display
        const sunrise = String(sunrise_minute) //converting that sunrise_minute number to string to check condition
        const sunrise_legnth = sunrise.length === 1 ? 0 : '' //checking that string legnth is 1 or not, if it's 1 only return 0 as value, otherwise nothing
        const sunrise_value = `${sunrise_legnth}${sunrise_minute}` //that ternary condition with sunrise minute stored in one variable
        document.getElementById("sunrise_time").innerHTML = `${sunrise_time_only}:${sunrise_value}AM` //showing time in display

        //sunset
        const suuset_time = new Date((weather_data.sys.sunset + weather_data.timezone)*1000)
        const convert_sunset_time = suuset_time.toUTCString()
        const sunset_parts = convert_sunset_time.split(" "); 
        const sunset_time_split = sunset_parts[4].split(":");
        const sunset_time_only = sunset_time_split[0]%12
        const sunset_minute = Number(sunset_time_split[1])
        const sunset = String(sunset_minute)
        const sunset_legnth = sunset.length === 1 ? 0 : ''
        const sunset_value = `${sunset_legnth}${sunset_minute}`
        document.getElementById("sunset_time").innerHTML = `${sunset_time_only}:${sunset_value}PM`

    }
}
search_btn.addEventListener("click", async function weather_btn() {
    await weather_details(city_name.value);
    city_name.value = '';
})
city_name.addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        await weather_details(city_name.value);
        city_name.value = '';
    }
});
