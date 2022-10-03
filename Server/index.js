const express = require('express')
var http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoutes")
const groupRoute = require("./routes/groupRoutes")


const app = express()
const mongodbUrl = 'mongodb+srv://raghav005:Raghav2001@group-tracker.yzhwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology: true,

}).catch((error)=> console.log(error));

app.use('/api/user', userRoute);
app.use('/api/group', groupRoute);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(5000, () => {console.log(`server started at http://localhost:5000`)})