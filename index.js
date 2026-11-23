const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const movieRoutes = require('./routes/movie');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_STRING);

let db = mongoose.connection;

db.on('error', () => console.log("Database connection failed"));
db.once("open", () => console.log("Now connected to MongoDB Atlas"));

const corsOptions = {
    origin: ['http://localhost:8000', 'http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);


if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = { app, mongoose };