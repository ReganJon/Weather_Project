const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
//using body-parser module to access the body of the post requsest from html file
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){

        //Getting location or any other inputs from user to display the temperature of the user's location 
        const query = req.body.cityName;
        const apiKey = "58a2284630b8ff8e8c5ed18c627ca70e";
        const unit = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
        
        //Making GET requests with the "https" module
        https.get(url, function(response){
            console.log(response.statusCode);
    
            response.on("data", function(data){
                //converting data into JSON
                const weatherData = JSON.parse(data) 
    
                //Getting a particular data that we need from the JSON data
                const temp = weatherData.main.temp
                const description = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                //Adding image to the weather project based on icon
                const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    
                //res.send can be used only once inside this function so we used res write to display responses multiple times
                res.write("<p>The weather is currently " + description + "</p>");
                res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
                res.write("<img src=" + imageURL + ">");
                res.send() 
                //console.log(JSON.stringify(data)); To print object as string in same line with less space
            })
        })    
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});