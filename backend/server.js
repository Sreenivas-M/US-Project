const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')


const PORT = process.env.PORT;

const userRoute = require('./routes/userRoute');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoute)

mongoose.connect(process.env.URL).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
});

app.listen(PORT, () => {console.log(`Server is running in ${PORT}`)})