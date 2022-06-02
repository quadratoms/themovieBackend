require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
const cors = require('cors');
const express = require("express");
const serveStatic = require("serve-static")
const path = require('path');


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
app.use(serveStatic(path.join(__dirname, 'dist')));

app.use(express.static('public'))

app.get('*', function(req, res){
   res.redirect('/')
 });
// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
