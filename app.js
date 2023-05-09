const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "API_KEY"; // Add your api key here

  const url = "ADD URL HERE" + query + "&appid=" + apiKey; // add url at ADD URL HERE

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const degreesCelcius = temp - 273.15;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      //305.14K − 273.15 = 31.99°C

      res.write(
        `<h1> The temperature in ${query} is ${Math.floor(degreesCelcius)} degree celcius </h1>`
      );
      res.write(`<h4> The weather description is currently ${weatherDescription} </h4>`);
      res.write(`<img src="${imageURL}">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000 !");
});
