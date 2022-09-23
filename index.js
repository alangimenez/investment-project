require('dotenv').config();
const express = require('express');
const Quote = require('./models/quote');
const app = express()
const PORT = process.env.PORT;
const quotesRepository = require('./repository/daos/quotesDao')

app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
  res.json({"message": "Hello world"})
})

app.post('/', (req, res) => {
  console.log(req.body.quotes.length);
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  for (let i = 0; i < /* req.body.quotes.length*/ 5; i++) {
    let quote = new Quote(
      req.body.quotes[i].name,
      hoy.toLocaleDateString(),
      hoy.toLocaleTimeString(),
      parseFloat(req.body.quotes[i].value),
      parseFloat(req.body.quotes[i].lastPrice),
      parseFloat(req.body.quotes[i].volumen)
    )
    quotesRepository.subirInfo(quote);
  }
  res.json(req.body.quotes);

    // let quote = new Quote(req.body.bondName, req.body.date, req.body.time, req.body.lastPrice, req.body.closePrice, req.body.volume);
    // quotesRepository.subirInfo(quote);
    // res.json({"message": "Hello, World"})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})