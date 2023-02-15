let weather = {
    apiKey: "4999544661c443baad8144328231302",
    fetchWeather: function(city) {
        fetch(
          "http://api.weatherapi.com/v1/current.json?key="+
          this.apiKey+
          "&q="+
          city+
          "&aqi=no"
        )
        .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
    },
  displayWeather: function (data){
  const { name } = data.location;
  const { temp_c, temp_f } = data.current;
  const { icon, text } = data.current.condition;
  const { localtime } = data.location;
  const { humidity } = data.current;
  const { wind_kph } = data.current;
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".temp").innerText = temp_c + "°C |";
  document.querySelector(".fahr").innerText = "| " + temp_f + "°F";
  document.querySelector(".localtime").innerText = localtime`` ;
  document.querySelector(".icon").src = icon ;
  document.querySelector(".description").innerText = text;
  document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + wind_kph + " km/h";
  document.body.style.backgroundImage ="url('https://source.unsplash.com/1280x655/?" + text + "')";
},
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Coimbatore");
