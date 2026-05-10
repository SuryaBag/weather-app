const apiKey = "53ea3d5b62644e12c11590423335a8fb";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  } else {
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }

  let data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "assets/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "assets/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "assets/rain.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "assets/mist.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather("new york");
