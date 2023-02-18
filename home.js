document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      fetchWeather();
    }
  });

const fetchWeather = () => {
  var city = document.getElementById("input").value;
  navigator.geolocation.getCurrentPosition(async (location) => {
    var response;
    try {
      if (city === "") {
        response = await fetch(
          "https://api.weatherapi.com/v1/forecast.json?key=f233947edb16410c8b0122108231302&q=" +
            location.coords.latitude +
            "," +
            location.coords.longitude +
            "&aqi=no&days=8"
        );
      } else {
        response = await fetch(
          "https://api.weatherapi.com/v1/forecast.json?key=f233947edb16410c8b0122108231302&q=" +
            city +
            "&aqi=no&days=8"
        );
      }

      let data = await response.json();
      console.log(data);
      document.getElementById("localtime").innerHTML = data.location.localtime;
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const d = data.forecast.forecastday[0].date;
      const date = new Date(d);
      let day = weekday[date.getDay()];
      document.getElementById("day").innerHTML = day;
      document.querySelector(".icon").src = data.current.condition.icon;
      document.querySelector(".description").innerText =
        "Weather : " + data.current.condition.text;
      document.getElementById("city").innerHTML =
        data.location.name + " , " + data.location.tz_id;
      document.getElementById("temp").innerHTML =
        data.current.temp_c + "°C / " + data.current.temp_f + "°F";
      document.getElementById("humidity").innerHTML =
        "Humidity : " + data.current.humidity + "%";
      document.getElementById("wind").innerHTML =
        "Wind speed : " + data.current.wind_kph + " km/h";
      document.getElementById("wind-dir").innerHTML =
        "Wind direction : " + data.current.wind_dir;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1280x655/?" +
        data.current.condition.text +
        "')";
      const week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
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
    } catch (error) {
      alert("Invalid Location");
    }
  });
};

fetchWeather();
