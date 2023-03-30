const express = require('express');
const User = require("./models/user.model");
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config.js");
const mongoose = require("mongoose");

const boydParser = require("body-parser");

const app = express();

app.use(boydParser.json());
app.use(boydParser.urlencoded({extended: true}));



mongoose.connect(dbConfig.DB_URL);

db = mongoose.connection;

db.on("error", () => {
    console.log("error while connecting to db");
})

db.once("open", () => {
    console.log("connected to MongoDB");

});


require("./routes/auth.routes")(app)
require("./routes/user.routes")(app)
require("./routes/ticket.routes")(app)

app.listen(serverConfig.PORT, () => {
    console.log(`Applications is started on port num:" ${serverConfig.PORT}`)
});
