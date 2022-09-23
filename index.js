require('dotenv').config();
const express = require('express');
const app = express()
const PORT = process.env.PORT;
const cashFlowRouter = require('./router/cashFlowRouter');
const quotesRouter = require('./router/quotesRouter');
const tirRouter = require('./router/tirRouter');

// middlewares and config
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

// routers
app.use('/cashflow', cashFlowRouter);
app.use('/quotes', quotesRouter);
app.use('/tir', tirRouter)

// app running
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})