const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3004;
const app = express();
// const http = require("http");

// const options = {
//   "method": "GET",
//   "hostname": "localhost",
//   "port": "3001",
//   "path": "/",
//   "headers": {
//     "Content-Type": "application/json",
//     "User-Agent": "Insomnia/2023.5.6",
//     "Content-Length": "0"
//   }
// };

// const req = http.request(options, function (res) {
//   const chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.end();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
