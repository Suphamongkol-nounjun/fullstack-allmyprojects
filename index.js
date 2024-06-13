// const express = require('express');
// const cors = require('cors');
// const { pool } = require('./config/db');
// require('dotenv').config();

// const app = express();

// app.get('/attractions', (req, res, next) => {
//     pool.query('SELECT * FROM attractions', (err, rows, fields) => {
//         if (err) {
//             return next(err);
//         }
//         res.json(rows);
//     });
// });

// app.get('/helloworld', (req, res, next) => {
//     res.json({ msg: 'hello world' });
// });

// try {
//     app.listen(process.env.PORT_RUN, () => {
//         console.log(`Server is running on port ${process.env.PORT_RUN}`);
//      });
//  } catch (err) {
//         console.error('Error connecting to the database:', err);
//  };

