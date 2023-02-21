function fetchWeather(city) {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=bb7d76519ca8447d86b50642231302&q=" +
      city +
      "&days=8&aqi=yes&alerts=yes"
  )
    .then((response) => response.json())
    .then((data) => {
      try {
        display(data);
      } catch (error) {
        alert("Enter the valid location");
      }
    });
}
function display(data) {
  console.log(data);
  const week = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  const isday = data.current.is_day;
  const code = data.current.condition.code;

  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" +
    data.current.condition.text +
    "')";

  document.getElementById("city").innerHTML =
    data.location.name + " , " + data.location.tz_id;
  document.getElementById("localtime").innerHTML = data.location.localtime;
  const d = data.forecast.forecastday[0].date;
  const date = new Date(d);
  let day = week[date.getDay()];
  document.getElementById("day").innerHTML = day;
  document.getElementById("temp").innerHTML =
    data.current.temp_c + "°C / " + data.current.temp_f + "°F";
  document.querySelector(".icon").src = data.current.condition.icon;
  document.querySelector(".description").innerText =
    "Weather : " + data.current.condition.text;
  document.getElementById("humidity").innerHTML =
    "Humidity : " + data.current.humidity + "%";
  document.getElementById("wind").innerHTML =
    "Wind speed : " + data.current.wind_kph + " km/h";
  document.getElementById("wind-dir").innerHTML =
    "Wind direction : " + data.current.wind_dir;

  let tags = "";
  data.forecast.forecastday.slice(1, 7).map((data) => {
    let d = new Date(data.date);
    console.log(week[d.getDay()], data.day.maxtemp_c, data.day.maxtemp_f);
    tags =
      tags +
      `<div class="forecast col-md-2 col-6">
                <div class="future">
                <div id="date1">${week[d.getDay()]}</div>
                <img src="${data.day.condition.icon}" />
                <div id="day1tempc">${data.day.maxtemp_c} °C</div>
                <div id="day1tempf">${data.day.maxtemp_f} °F</div>
                </div>
              </div>`;
  });
  document.getElementById("forecast").innerHTML = tags;
}
navigator.geolocation.getCurrentPosition((location) => {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=bb7d76519ca8447d86b50642231302&q=" +
      location.coords.latitude +
      "," +
      location.coords.longitude +
      "&days=7&aqi=yes"
  )
    .then((res) => res.json())
    .then((data) => {
      fetchWeather(data.location.name);
    });
});
fetchWeather("Maldives");
const autocomplete = (city) => {
  fetch(
    "https://api.weatherapi.com/v1/search.json?key=f7d63b9a0a45493e9cb52439231302&&q=" +
      city
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var populate = document.getElementById("populate");
      if (data) {
        let options = data.map((location, index) => {
          return ` <div style="cursor:pointer;" onclick="optionClicked('${
            location.name
          }')" class="d-grid ${
            data.length - 1 === index ? "" : "border-bottom"
          } py-1">
                            <span class="fs-low">
                                ${location.name}
                            </span>
                            <span class="base-text"> ${location.country}</span>
                        </div>`;
        });
        if (options.length > 0) {
          populate.setAttribute(
            "class",
            populate.getAttribute("class").replace(" d-none", "")
          );
        } else {
          populate.setAttribute(
            "class",
            `${populate.getAttribute("class").replace(" d-none", "")} d-none`
          );
        }
        populate.innerHTML = options.join("\n");
      }
    });
};
const optionClicked = (location) => {
  document.getElementById("input").value = location;
  var populate = document.getElementById("populate");
  populate.setAttribute(
    "class",
    `${populate.getAttribute("class").replace(" d-none", "")} d-none`
  );
  fetchWeather(location);
};

const search = () => {
  document.querySelector(".search-bar").addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      fetchWeather(event.target.value);
    } else {
      autocomplete(event.target.value);
    }
  });
};
