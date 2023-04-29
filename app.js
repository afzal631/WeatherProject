const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apikey = "19c5e22d94c8a2d410f927b827800d57&units";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "=" +
    unit +
    "";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      // console.log(JSON.parse(data));
      //         const obj={
      //             name:"afzal",
      //             age:22
      //         }
      //         console.log(JSON.stringify(obj));
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.feels_like;
      const description = wheatherData.weather[0].description;

      const icon = wheatherData.weather[0].icon; // fetching image
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // for sending data as response
      res.write(
        "<header style='background-color:black; color:white; text-align: center;margin: auto;'><h1>Live Weather App</h1></header><div style='margin:auto; width: 364px;border: 4px solid;border-radius: 5px;margin-top: 4rem;'><div style='text-align: center;'><h1>The tempreture in " +
          query +
          " is " +
          temp +
          " degrees celcius</h1>"
      );
      res.write("<p>The weather is currently " + description + " </p>");
      res.write("<img src=" + imageurl + "></div></div>");
      res.send(); //there can be only one .send  therefore we use .write and .send as combination
    });
  });
});

app.listen(3200, function () {
  console.log("server is running at 3200 port");
});
