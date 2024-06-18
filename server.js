const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs')
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


require('dotenv').config();




const app = express();

// app.use(express.json);
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))
app.use(bodyparser.json({limit: '10mb'}))
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: 'false',
    saveUninitialized: true
}))



readdirSync('./Routes')
    .map((r)=>app.use('/api', require('./Routes/'+r)))

try {
    app.listen(process.env.PORT_RUN, () => {
        console.log(`Server is running on port ${process.env.PORT_RUN}`);
     });
 } catch (err) {
        console.error('Error connecting to the database:', err);
 };

 module.exports = app;

