const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'quotes';

const quotesSchema = new Schema ({
    bondName: {type: String},
    date: {type: String},
    time: {type: String},
    lastPrice: {type: Number},
    closePrice: {type: Number},
    volume: {type: Number}
})

const Quotes = mongoose.model(coleccion, quotesSchema);

module.exports = Quotes;