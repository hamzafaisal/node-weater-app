const functions = require("./utils/functions");

const fs = require("fs");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

// PATH SETTING
app.use(express.static(path.join(__dirname, "../public")));

// TEMPLATE ENGINE SETTING
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App"
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    msg: "About Us"
  });
});

// ////////////////////////////////////////

app.get("/weather", (req, res) => {
  if (req.query.location) {
    functions.geocode(req.query.location, (error, data = []) => {
      functions.forecast(data[0], data[1], (error, data2) => {
        res.send({
          title: "Weather Report",
          forecast: `It is currently ${
            data2.currently.temperature
          } degrees in ${data[2]} with ${
            data2.currently.precipProbability
          }% chances of rain`,
          location: data[2]
        });
      });
    });
  } else {
    res.send("Enter Valid Address!");
  }
});

// ////////////////////////////////////////

app.get("*", (req, res) => {
  res.render("404", {
    error: "404 ERROR! Page Not Found..."
  });
});
app.listen(3000, () => console.log("http://localhost:3000/"));
