require('dotenv').config({ path: './config.env' });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./database/db')
const { getRoutes } = require('./routes');
const cors = require('cors')

connectDB().then();

const app = express();
let http = require('http');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(cors())
app.use('/api', getRoutes());

app.get('/', (req, res) => {
  res.send('Api running');
});
let port = process.env.PORT || '3000';
app.set('port', port);

let server = http.createServer(app);
server.listen(port,() =>
    console.log(`Server listening at port ${port}`)
);
