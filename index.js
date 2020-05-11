require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const router = require('./server/routes');
const {
  initDBConnection,
} = require('./server/database/database');

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};

const app = express();
app.use(compression({ filter: shouldCompress }));

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

/**
 * @todo add Static folder later
 */

app.use('/', router);

initDBConnection();

http.createServer(app).listen(process.env.HTTP_PORT, () => {
  console.log('http server created for port no:', process.env.HTTP_PORT);
});
https.createServer(app).listen(process.env.HTTPS_PORT, () => {
  console.log('https server created for port no:', process.env.HTTPS_PORT);
});
