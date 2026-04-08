const apiKey = "0115f93e7ae335f622f16e198749ab90";
const input = document.getElementById("input_text");
const button = document.getElementById("input_btn");
const city = document.getElementById("city_name");
const temp = document.getElementById("temp");
const desc = document.getElementById("weather_desc");
const ico = document.getElementById("weather_ico");
const joke = document.getElementById("joke");

async function getWeather() {
    let city_input = input.value;
    let city_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_input}&appid=${apiKey}&units=metric&lang=pl`);
    let city_output = await city_data.json();
    city.textContent = city_output.name;
    temp.textContent =  `Temperatura: ${city_output.main.temp}`;
    desc.textContent = city_output.weather.map(zjawisko => zjawisko.description).join(", ");
    ico.src = `https://openweathermap.org/img/wn/${city_output.weather[0].icon}@2x.png`;
    console.log(city_output);
    console.log(`miasto: ${city_output.name}, pogoda: ${city_output.weather.map(zjawisko => zjawisko.description).join(", ")}, temperatura: ${city_output.main.temp}, odczuwalna: ${city_output.main.feels_like}`)

}

async function getJoke(){
    let response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    let data = await response.json();
    console.log(data);
    console.log(`the joke: ${data.joke}, the category: ${data.category}`);
    if(data.category === "Programming"){
        getJoke()
    }else{
        joke.textContent = data.joke;
    }};

button.addEventListener('click', function(){
    getJoke();
    getWeather();
})
input.addEventListener('keypress', function (event){
  if(event.key == "Enter"){
    getJoke();
    getWeather();
  }
})

