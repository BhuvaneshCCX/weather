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
  const { temp_c } = data.current;
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".temp").innerText = temp_c + "°C";
  document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
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
