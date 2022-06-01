require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
const cors = require('cors');
const express = require("express");
const app = express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
// Middleware
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json({limit: '50mb'})); // parse json bodies in the request object
// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/movies", require("./routes/moviesRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.use(express.static('public'))

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
