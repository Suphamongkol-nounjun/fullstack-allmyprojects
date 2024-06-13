const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs')
const bodyparser = require('body-parser')
require('dotenv').config();

const app = express();

app.use(cors())
app.use(bodyparser.json({limit: '10mb'}))


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

